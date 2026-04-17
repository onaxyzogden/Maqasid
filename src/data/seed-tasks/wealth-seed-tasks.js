// Seed tasks for Wealth pillar submodules (Hifz al-Mal).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const WEALTH_SEED_TASKS = {
  // ── EARNING & PROVISION (RIZQ) ──
  wealth_earning_core: [
    {
      title: 'Audit all income sources — confirm each is free from riba, haram industries, and deception',
      priority: 'urgent', tags: ['halal-income', 'audit'],
      description: 'Conduct a thorough review of every stream of income you receive — salary, freelance, investments, side ventures — and verify that none involve interest (riba), prohibited industries (alcohol, gambling, conventional insurance), or deceptive practices. This is the foundational step in purifying your wealth.',
      subtasks: [
        { title: 'List every active income source (employment, contracts, investments, side income)', done: false,
          description: `**Why does this matter?**

Before any income can be evaluated for halal compliance, it must first be visible. Many people have income streams they have not consciously catalogued — a forgotten investment account, a side gig paid in cash, or employer stock options with unclear underlying assets. Hifz al-Mal begins with complete awareness of what enters your possession, because what you do not see you cannot purify.

---

**How do I accomplish this?**

1. Open your bank statements for the last 3 months and note every deposit that is not a transfer between your own accounts.
2. List your primary employment income, including base salary, bonuses, commissions, and any equity compensation.
3. Add any freelance, consulting, or contract work — even irregular or one-time payments.
4. Include investment income: dividends, rental income, profit distributions, interest (even if unintentional).
5. Note any government benefits, grants, gifts, or informal income (e.g., cash payments for services).
6. Organize the list into a simple table with columns: Source Name, Type (employment/investment/business/other), Estimated Monthly Amount, and Industry.
7. Cross-check against your tax filings to ensure nothing is missed — your tax return often reveals sources you have forgotten.

Completion indicator: a single document listing every source of income, no matter how small, with no known gaps.` },
        { title: 'Research the Islamic ruling on each industry and revenue model involved', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (48:23)
**Arabic:** 
**Translation:** Such has been Allah’s rule that has passed on before, for yousg will never find any change in Allah’s rule.

**II. Sources from the Hadith**


### Sahih Bukhari 3493
Narrated Abu Huraira:Allah's Messenger (ﷺ) said, "You see that the people are of different natures. Those who were the best in the pre-Islamic period, are also the best in Islam if they comprehend religious knowledge. You see that the best amongst the people in this respect (i.e. ambition of ruling) are those who hate it most. And you see that the worst among people is the double faced (person) who appears to these with one face and to the others with another face (i.e a hypocrite)
*(Grade: Sahih)*

### Sahih Bukhari 3494
Narrated Abu Huraira:Allah's Messenger (ﷺ) said, "You see that the people are of different natures. Those who were the best in the pre-Islamic period, are also the best in Islam if they comprehend religious knowledge. You see that the best amongst the people in this respect (i.e. ambition of ruling) are those who hate it most. And you see that the worst among people is the double faced (person) who appears to these with one face and to the others with another face (i.e a hypocrite)
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

Not every industry or business model is automatically halal, even if the work itself seems harmless. A software developer writing code for a conventional insurance company, a delivery driver transporting alcohol, or a marketer promoting a gambling platform — each involves earning from a chain that includes haram activity. Understanding the scholarly rulings on the specific industries and revenue models in your income portfolio is essential to making an informed assessment rather than relying on assumptions.

---

**How do I accomplish this?**

1. Take your income source list and identify the industry each source operates in (e.g., fintech, food service, real estate, entertainment).
2. For each industry, research whether scholars have identified haram elements — start with well-known Islamic finance resources such as AAOIFI standards, IslamQA, or books like "The Lawful and the Prohibited in Islam" by Yusuf al-Qaradawi.
3. Examine the revenue model: does the business earn through direct sales, subscription, interest-based lending, advertising (and if so, what is being advertised), or commissions?
4. Pay special attention to mixed-revenue companies where a portion of income may come from haram sources (e.g., a tech company that also offers interest-based payment plans).
5. Note whether your role directly facilitates the haram element or is ancillary to it — scholars differ on this distinction, so record the nuance.
6. For each source, write a brief ruling summary: clearly halal, clearly haram, or ambiguous/needs scholarly consultation.

Completion indicator: every income source has a documented ruling status with references to the scholarly basis for that assessment.` },
        { title: 'Flag any source that involves riba, gharar, or haram products/services', done: false,
          description: `**Why does this matter?**

Riba (interest/usury), gharar (excessive uncertainty in contracts), and involvement with haram products are the three primary categories that invalidate earnings in Islamic law. Allah says: "Allah has permitted trade and forbidden riba" (Quran 2:275). Flagging these sources is the critical triage step — it separates the clean from the contaminated so you can take targeted action rather than being paralysed by vagueness.

---

**How do I accomplish this?**

1. Review your ruling summary from the previous step and mark any source rated "clearly haram" or "ambiguous" with a visible flag.
2. For riba specifically: check if any income involves lending at interest, earning interest on deposits, or working for institutions whose primary business is interest-based lending.
3. For gharar: examine contracts for excessive uncertainty — are deliverables, timelines, or payment terms vague to the point of being exploitative? Are you selling something you do not own or cannot deliver?
4. For haram products/services: verify that no income derives from alcohol, pork, gambling, pornography, conventional insurance, or weapons sold for oppression.
5. Create a "flagged sources" list with three columns: Source Name, Category of Violation (riba/gharar/haram product), and Severity (direct involvement vs. indirect/ancillary).
6. Prioritise direct involvement over indirect — a bank teller at a conventional bank has more direct riba involvement than a janitor at the same bank, though both warrant attention.

Completion indicator: a clear, prioritised list of every income source that has a potential or confirmed haram element, ready for scholarly consultation.` },
        { title: 'Consult a knowledgeable scholar or Islamic finance advisor on ambiguous cases', done: false,
          sources: `**I. Sources from the Hadith**


### Sahih Bukhari 6960
Narrated 'Abdullah: Nafi narrated to me that 'Abdullah said that Allah's Messenger (ﷺ) forbade the Shighar. I asked Nafi', "What is the Shighar?" He said, "It is to marry the daughter of a man and marry one's daughter to that man (at the same time) without Mahr (in both cases); or to marry the sister of a man and marry one's own sister to that man without Mahr." Some people said, "If one, by a trick, marries on the basis of Shighar, the marriage is valid but its condition is illegal." The same scholar said regarding Al-Mut'a, "The marriage is invalid and its condition is illegal." Some others said, "The Mut'a and the Shighar are permissible but the condition is illegal
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

Self-research is necessary but not sufficient. The Prophet (peace be upon him) said: "Ask the people of knowledge if you do not know" (Quran 16:43). Ambiguous cases — where the ruling is not clear-cut or where scholars differ — require consultation with someone trained in both fiqh al-muamalat (Islamic commercial law) and the realities of modern financial structures. Acting on incomplete understanding can lead to either unnecessary hardship (declaring halal things haram) or complacency (rationalising haram as acceptable).

---

**How do I accomplish this?**

1. Prepare your flagged sources list with all relevant details: industry, revenue model, your specific role, and the nature of the ambiguity.
2. Identify a qualified scholar or Islamic finance advisor — look for credentials in Islamic jurisprudence and practical experience with modern financial questions. Local imams may refer you to specialists.
3. If no local scholar is available, reputable online fatwa services (e.g., Darul Ifta, SeekersGuidance, Yaqeen Institute) can provide guidance, though personalised consultation is preferable.
4. Present each ambiguous case clearly: describe what the company does, how it earns revenue, what your role is, and what specific aspect you are uncertain about.
5. Ask for the ruling and the reasoning (daleel) behind it — understanding the logic helps you evaluate future situations independently.
6. Document the scholar's guidance with their name, date, and the specific question asked.
7. If scholars differ, follow the opinion of the scholar you trust most in knowledge and taqwa, and note the difference for your records.

Completion indicator: every ambiguous case has a documented scholarly ruling or a clear plan to obtain one within a specific timeframe.` },
        { title: 'Document findings and create an action plan for any flagged sources', done: false,
          description: `**Why does this matter?**

Knowledge without action is a proof against you on the Day of Judgement. The audit and consultation phases have given you clarity — now that clarity must be translated into a concrete, time-bound action plan. Documenting everything ensures accountability, prevents backsliding, and creates a reference you can return to when circumstances change or new income sources arise.

---

**How do I accomplish this?**

1. Create a final audit document with three sections: (a) Confirmed Halal Sources — no action needed, (b) Confirmed Haram Sources — exit required, (c) Conditionally Permissible — requires specific changes to remain halal.
2. For each haram source, write a one-paragraph action item: what needs to change, by when, and what the replacement plan is.
3. For conditionally permissible sources, document the specific conditions that must be maintained (e.g., "permissible as long as my role does not involve processing interest transactions directly").
4. Set deadlines for each action item — be realistic but urgent. The longer haram income continues, the more it contaminates your overall wealth.
5. Identify dependencies: do you need to find a new job before leaving the current one? Do you need to build savings before exiting an investment?
6. Share the plan with an accountability partner — a spouse, trusted friend, or the scholar you consulted — who can check in on your progress.
7. Schedule a follow-up review in 30, 60, and 90 days to assess progress against the plan.

Completion indicator: a written action plan with specific deadlines, assigned to yourself, with an accountability mechanism in place.` },
      ],
    },
    {
      title: 'Identify and exit any employment, contract, or investment that involves haram activity',
      priority: 'urgent', tags: ['halal-income', 'action'],
      description: 'Once haram income sources have been identified through your audit, take concrete steps to exit them. This may involve resigning from a position, terminating a contract, or liquidating an investment. Prioritise urgency while planning a realistic transition so you do not leave your dependants without provision.',
      subtasks: [
        { title: 'Rank flagged income sources by severity of haram involvement', done: false,
          description: `**Why does this matter?**

Not all haram involvement carries equal weight. A job where the core product is haram (e.g., manufacturing alcohol) is categorically different from a role where haram exposure is incidental (e.g., an IT technician at a company that occasionally processes interest-based transactions). Ranking by severity ensures you direct your most urgent energy toward the most serious violations first, rather than wasting time on edge cases while major haram income continues unchecked.

---

**How do I accomplish this?**

1. Retrieve your flagged sources list from the income audit.
2. Categorise each source into one of three severity tiers:
   - **Tier 1 (Direct/Primary):** The income itself is haram — e.g., working at a riba-based bank in a lending role, selling alcohol, or operating a gambling platform.
   - **Tier 2 (Facilitative):** Your role supports or enables a haram operation, even if your specific tasks are not haram — e.g., marketing for a conventional insurance company, accounting for a liquor distributor.
   - **Tier 3 (Incidental/Ancillary):** The haram element is a small fraction of the business or tangential to your role — e.g., a halal restaurant that serves non-halal soft drinks, or a tech company where 5% of revenue comes from a haram subsidiary.
3. Within each tier, rank by financial dependency — sources that represent a larger portion of your total income are harder to exit quickly and need more planning.
4. Assign a priority label: Exit Immediately (Tier 1, high severity), Exit Within 90 Days (Tier 2), and Transition Plan Required (Tier 3).
5. Write a brief justification for each ranking so you can revisit it if circumstances change.

Completion indicator: a prioritised, tiered list of all flagged sources with clear exit urgency labels.` },
        { title: 'Draft an exit timeline for each haram source with realistic transition dates', done: false,
          description: `**Why does this matter?**

Urgency without planning leads to financial crisis, which can push a person back into haram income out of desperation. The Prophet (peace be upon him) taught us to tie our camel and then trust in Allah — meaning practical preparation is part of tawakkul, not opposed to it. A realistic exit timeline balances the obligation to leave haram income swiftly with the responsibility to maintain nafaqah (provision) for your dependants during the transition.

---

**How do I accomplish this?**

1. For each flagged source, determine the minimum notice period or exit process required (e.g., 2 weeks for employment, 30 days for a lease, settlement period for investments).
2. Calculate your monthly financial exposure: how much income will you lose when each source is exited?
3. Estimate how long you can sustain yourself and your dependants from savings and remaining halal income after exiting each source.
4. Draft a timeline with specific dates:
   - Start date: when you begin the exit process (e.g., submit resignation, initiate account closure).
   - Completion date: when the last haram payment is received and the relationship is fully severed.
   - Buffer period: 1-2 months of overlap where replacement income is established before the exit is final.
5. Sequence the exits logically — do not exit all sources simultaneously if doing so would leave your family without provision. Exit Tier 1 sources first, then cascade.
6. Build in contingency: what happens if the replacement income takes longer than expected? Identify a backup plan (e.g., temporary freelance work, community support, reduced expenses).
7. Write the timeline as a simple Gantt-style list with dates, and share it with your accountability partner.

Completion indicator: a written, date-specific exit plan for every flagged source, with contingencies documented.` },
        { title: 'Identify halal replacement income to cover the gap before exiting', done: false,
          description: `**Why does this matter?**

Leaving haram income without a halal replacement is not piety — it is poor planning that endangers your family. Islam obligates the provider to ensure nafaqah is met, and creating a gap in provision is itself a harm to be avoided. The goal is not just to stop earning haram but to start earning halal, so that the transition is sustainable and permanent rather than a temporary burst of conviction followed by a return to the same haram sources out of necessity.

---

**How do I accomplish this?**

1. Calculate the exact monthly income gap each exit will create — this is your replacement target.
2. List your marketable skills, professional network, and any existing halal income streams that could be expanded.
3. Research halal employment opportunities in your field — many industries have fully halal employers even if your current employer is not.
4. Explore freelance, consulting, or contract work as a bridge income while you search for permanent halal employment.
5. Consider whether any passive income sources (halal investments, rental income, digital products) could partially fill the gap.
6. Evaluate Islamic microfinance or qard hasan (interest-free loan) options if you need short-term financial support during the transition.
7. Apply to at least 3 halal alternatives before submitting your exit from the haram source — having options reduces the pressure to stay.
8. Validate the halal status of each replacement using the same audit framework you applied to your current income.

Completion indicator: at least one viable halal replacement identified for each haram source being exited, with applications or arrangements in progress.` },
        { title: 'Execute the exit — submit resignations, close accounts, or terminate contracts', done: false,
          description: `**Why does this matter?**

Planning without execution is self-deception. Once the timeline is set and replacements are in motion, the actual exit must happen. Delay at this stage often comes from fear or attachment — both of which are natural but must be overcome with tawakkul. Allah promises: "Whoever fears Allah, He will make for him a way out, and provide for him from where he does not expect" (Quran 65:2-3). The exit is where your conviction meets reality.

---

**How do I accomplish this?**

1. Begin with your Tier 1 (highest severity) sources — these should be exited first regardless of financial comfort.
2. Submit formal resignation letters or account closure requests in writing — verbal agreements are insufficient and can be disputed.
3. For employment exits: maintain professionalism and fulfill your contractual notice period. Burning bridges is not from Islamic character, and your former employer may be a reference.
4. For investment exits: liquidate positions in haram stocks, funds, or instruments. If there are penalties for early withdrawal, weigh them against the ongoing sin of maintaining the investment.
5. For contract terminations: review the terms for early exit clauses. If penalties apply, consult your scholar on whether the penalty constitutes a permissible cost of leaving haram.
6. Keep copies of all correspondence, confirmations, and final statements for your records.
7. On the day each exit is complete, make du'a of gratitude and relief — this is an act of obedience to Allah that deserves recognition.

Completion indicator: every flagged haram source has been formally exited, with written confirmation of closure or termination.` },
        { title: 'Verify that all replacement income is fully halal before relying on it', done: false,
          description: `**Why does this matter?**

It would be tragic to exit one haram income source only to unknowingly enter another. The urgency of replacing lost income can create pressure to accept the first opportunity without proper vetting. Verification ensures that the replacement income genuinely meets the standards of halal earning — that you have not simply traded one problem for a different one. This step closes the loop on the entire exit process with confidence.

---

**How do I accomplish this?**

1. Apply the same audit framework from the initial income review to every new or expanded income source.
2. Research the industry, employer, or business model using the criteria established earlier: free from riba, gharar, maysir, and haram products.
3. Review your employment contract or business agreement for clauses that may involve haram elements (e.g., interest-based performance bonuses, non-compete clauses that force you into haram work).
4. If the replacement is self-employment or a new business, verify that your supply chain, marketing practices, and customer base are all halal-compliant.
5. Consult your scholar or Islamic finance advisor on any ambiguities — do not assume permissibility under pressure.
6. Monitor the first 3 months of the new income carefully for any haram elements that were not visible during initial evaluation.
7. Update your master income audit document to reflect the new portfolio of income sources, all verified as halal.

Completion indicator: every replacement income source has been vetted through the same halal audit process, with documented confirmation of compliance.` },
      ],
    },
    {
      title: 'Learn the Islamic conditions for halal earnings — avoid riba, gharar, maysir, and oppression',
      priority: 'high', tags: ['fiqh', 'halal-income'],
      description: 'Study the foundational fiqh of earning in Islam so you can independently evaluate whether a transaction or business model is permissible. Understanding the prohibitions of riba (interest), gharar (excessive uncertainty), maysir (gambling), and zulm (oppression) equips you to make informed financial decisions for life.',
      subtasks: [
        { title: 'Study the Quranic verses on riba (2:275-280) and their tafsir', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (2:275)
**Arabic:** 
**Translation:** Those who take ribā (usury or interest) will not stand but as stands the one whom the demon has driven crazy by his touch. That is because they have said: “Sale is but like ribā.’’, while Allah has permitted sale, and prohibited ribā. So, whoever receives an advice from his Lord and desists (from indulging in ribā), then what has passed is allowed for him, and his matter is up to Allah. As for the ones who revert back, those are the people of Fire. There they will remain forever.

**II. Sources from the Hadith**


### Sahih Bukhari 4540
Narrated \`Aisha:When the Verses of Surat-al-Baqara regarding usury (i.e. Riba) were revealed, Allah's Messenger (ﷺ) recited them before the people and then he prohibited the trade of alcoholic liquors
*(Grade: Sahih)*

### Sahih Bukhari 459
Narrated \`Aisha:When the verses of Surat "Al-Baqara"' about the usury Riba were revealed, the Prophet (ﷺ) went to the mosque and recited them in front of the people and then banned the trade of alcohol
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

The Quranic prohibition of riba is among the most emphatic in all of scripture — Allah declares war on those who persist in it (2:279), and the Prophet (peace be upon him) cursed the one who takes riba, the one who pays it, the one who records it, and the two witnesses to it. Studying these verses with their tafsir (exegesis) transforms riba from an abstract legal category into a deeply understood spiritual and economic harm. This understanding becomes your compass for every financial decision.

---

**How do I accomplish this?**

1. Read Surah al-Baqarah, verses 275-280, in Arabic with a trusted translation (e.g., Sahih International, Abdul Haleem, or Mustafa Khattab).
2. Study the tafsir of these verses from at least two classical sources — Ibn Kathir and al-Qurtubi are widely accessible and provide both linguistic and legal context.
3. Note the key distinctions the Quran makes: "Allah has permitted trade and forbidden riba" (2:275) — understand why trade involves mutual benefit and risk-sharing while riba guarantees profit to one party at the expense of another.
4. Study the hadith literature on riba, particularly the hadith of the six commodities (gold, silver, wheat, barley, dates, salt) which establishes the foundational rules for riba al-fadl (surplus riba) and riba al-nasiah (deferred riba).
5. Read a contemporary explanation of how these classical principles apply to modern banking, credit cards, and student loans — Mufti Taqi Usmani's "An Introduction to Islamic Finance" is an excellent resource.
6. Write a one-page summary in your own words: what is riba, why is it prohibited, and what are its modern manifestations.

Completion indicator: ability to explain the prohibition of riba to someone else, citing Quranic verses and scholarly reasoning, with a written summary for personal reference.` },
        { title: 'Learn the definition and examples of gharar in contracts', done: false,
          description: `**Why does this matter?**

Gharar — excessive uncertainty or ambiguity in contracts — is the second major prohibition in Islamic commercial law after riba. The Prophet (peace be upon him) forbade the sale of gharar (Muslim). Unlike riba, which is relatively easy to identify, gharar exists on a spectrum: minor uncertainty is tolerable and even unavoidable in trade, but excessive gharar invalidates a contract. Understanding where that line falls is essential for evaluating employment contracts, business agreements, and investment opportunities.

---

**How do I accomplish this?**

1. Study the linguistic meaning of gharar (deception, risk, uncertainty) and its technical definition in fiqh: a contract where the subject matter, price, or delivery is unknown or uncertain to a degree that could lead to dispute or injustice.
2. Learn the classical examples scholars use: selling fish still in the sea, selling fruit before it ripens, selling an unborn animal — each illustrates a different dimension of impermissible uncertainty.
3. Understand the three categories scholars identify: gharar fahish (excessive — invalidates the contract), gharar yasir (minor — tolerated), and gharar mutawassit (moderate — scholars differ).
4. Study modern applications: how does gharar apply to insurance contracts (the primary reason conventional insurance is prohibited), derivatives trading, futures contracts, and speculative investments?
5. Compare gharar with legitimate business risk — Islam encourages entrepreneurship and trade, which inherently involve risk. The distinction is between informed risk-sharing and exploitative uncertainty.
6. Review 3-5 real-world contract scenarios and practice identifying whether gharar is present and at what level.

Completion indicator: ability to evaluate a contract or transaction for gharar and articulate whether the uncertainty is minor (tolerable) or excessive (invalidating).` },
        { title: 'Understand maysir and how it differs from legitimate risk-taking in business', done: false,
          description: `**Why does this matter?**

Maysir (gambling) is prohibited in the Quran alongside intoxicants: "O you who believe, indeed intoxicants, gambling, sacrificing on stone alters, and divining arrows are but defilement from the work of Shaytan, so avoid it" (5:90). In modern finance, maysir manifests in ways far subtler than a casino — speculative day-trading, binary options, and certain derivative instruments can cross the line from legitimate risk into gambling. Understanding the distinction protects your investments and business ventures from falling into this category.

---

**How do I accomplish this?**

1. Study the Quranic verses on maysir (2:219, 5:90-91) and their tafsir to understand the spiritual and social harms gambling causes: enmity, distraction from remembrance of Allah, and unjust wealth transfer.
2. Learn the scholarly definition: maysir is a zero-sum transaction where one party's gain is entirely the other party's loss, based on chance rather than productive effort or exchange of real value.
3. Understand the key differentiator: legitimate business risk involves effort, skill, and the creation or exchange of real goods and services. Maysir involves pure speculation on outcomes with no underlying productive activity.
4. Study modern examples that scholars classify as maysir: lottery tickets, sports betting, speculative options trading where no actual asset is intended to be delivered, and certain cryptocurrency trading patterns.
5. Learn what is NOT maysir: starting a business (risk with effort and real value creation), investing in stocks for the long term (ownership of real companies), and agricultural ventures (risk inherent in nature, mitigated by effort).
6. Create a decision framework: when evaluating a financial opportunity, ask — does this involve productive effort or exchange of real value? Is one party's gain necessarily the other's loss? Is the outcome primarily determined by chance?

Completion indicator: a personal decision framework for distinguishing maysir from legitimate risk, with 5+ examples correctly classified.` },
        { title: 'Review the conditions that make a sale or contract valid in Islamic law', done: false,
          sources: `**I. Sources from the Hadith**


### Sahih Muslim 3777
A'isha (Allah be pjeased with her) reported that Barira came to her in order to seek her help in securing freedom, but she had (so far) paid nothing out of that sum stipulated in the contract. 'A'isba said to her. Go to your family (who owns you), and if they like that I should pay the amount (of the contract) on your behalf (for purchasing your freedom), then I shall have the right in your inheritance. (If they accepted it) I am prepared (to make this payment). Barira made a mention of that to the (members of) her family, but they refused and said:If she (Hadrat 'A'isha) wants to do good to You for the sake of Allah, she may do it, but the right of inheritance will be ours. She (Hadrat 'A'isha) made a mention of that to Allah's Messenger (ﷺ), and he said to her: Buy her, and emancipate her, for the right of inheritance vests with one who emancipates (the slave). Allah's Messenger, may peace be upon him) then stood up and said: What has happened to the people that they lay down conditions which are not (found) in the Book of Allah? And he who laid down a condition not found in the Book of Allah, that is not valid. even if it is laid down hundred times. The condition laid down by Allah is the most weighty and the most valid
*(Grade: Sahih)*

### Sahih Bukhari 2729
Narrated \`Urwa:Aisha said, "Barirah came to me and said, 'My people (masters) have written the contract for my emancipation for nine Awaq ) of gold) to be paid in yearly installments, one Uqiyya per year; so help me." Aisha said (to her), "If your masters agree, I will pay them the whole sum provided the Wala will be for me." Barirah went to her masters and told them about it, but they refused the offer and she returned from them while Allah's Messenger (ﷺ) was sitting. She said, "I presented the offer to them, but they refused unless the Wala' would be for them." When the Prophet (ﷺ) heard that and \`Aisha told him about It, he said to her, "Buy Barirah and let them stipulate that her Wala' will be for them, as the Wala' is for the manumitted." \`Aisha did so. After that Allah's Messenger (ﷺ) got up amidst the people, Glorified and Praised Allah and said, "What is wrong with some people who stipulate things which are not in Allah's Laws? Any condition which is not in Allah's Laws is invalid even if there were a hundred such conditions. Allah's Rules are the most valid and Allah's Conditions are the most solid. The Wala is for the manumitted
*(Grade: Sahih)*

### Sahih Bukhari 2563
Narrated Aisha:Barirah came (to \`Aisha) and said, "I have made a contract of emancipation with my masters for nine Uqiyas (of gold) to be paid in yearly installments. Therefore, I seek your help." \`Aisha said, "If your masters agree, I will pay them the sum at once and free you on condition that your Wala' will be for me." Barirah went to her masters but they refused that offer. She (came back) and said, "I presented to them the offer but they refused, unless the Wala' was for them." Allah's Messenger (ﷺ) heard of that and asked me about it, and I told him about it. On that he said, "Buy and manumit her and stipulate that the Wala' should be for you, as Wala' is for the liberator." \`Aisha added, "Allah's Messenger (ﷺ) then got up amongst the people, Glorified and Praised Allah, and said, 'Then after: What about some people who impose conditions which are not present in Allah's Laws? So, any condition which is not present in Allah's Laws is invalid even if they were one-hundred conditions. Allah's ordinance is the truth, and Allah's condition is stronger and more solid. Why do some men from you say, O so-and-so! manumit the slave but the Wala will be for me? Verily, the Wala is for the liberator
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

Islamic law does not only prohibit specific transaction types — it also prescribes positive conditions that must be met for any sale or contract to be valid. A transaction can be free from riba, gharar, and maysir but still be invalid if it fails to meet these conditions. Understanding the affirmative requirements of a halal contract gives you a complete framework for evaluating any financial arrangement, not just a list of things to avoid.

---

**How do I accomplish this?**

1. Study the five pillars of a valid sale (bay') in Islamic law: (a) the contracting parties must be legally competent, (b) the subject matter must exist and be owned by the seller, (c) the subject matter must be deliverable, (d) the price must be known and defined, and (e) mutual consent must be present without coercion.
2. Learn the concept of khiyar (option) — the right of either party to cancel or confirm a contract within a specified period. This includes khiyar al-majlis (option during the session), khiyar al-shart (stipulated option period), and khiyar al-ayb (option due to defect).
3. Review the prohibited contract combinations: two sales in one, a sale combined with a loan, and selling what you do not possess. Each of these invalidates an otherwise normal-looking transaction.
4. Study how these conditions apply to modern employment contracts: does your contract contain elements of coercion, undefined compensation, or terms that contradict Islamic principles?
5. Examine common freelance and business contracts through this lens: are deliverables clearly defined? Is payment specified? Is the timeline realistic and not designed to exploit?
6. Read a summary of contract law from a fiqh al-muamalat textbook — Wahbah al-Zuhayli's "Financial Transactions in Islamic Jurisprudence" is comprehensive.

Completion indicator: ability to evaluate an employment or business contract against the five conditions of validity and identify any deficiencies.` },
        { title: 'Take notes and create a personal reference sheet of halal earning principles', done: false,
          description: `**Why does this matter?**

Knowledge that is not organized and accessible is knowledge that fades. Creating a personal reference sheet transforms weeks of study into a practical tool you can consult in real time — when evaluating a job offer, reviewing a contract, or considering an investment. This reference becomes your personal halal earning constitution, grounded in the primary sources and scholarly guidance you have studied.

---

**How do I accomplish this?**

1. Organize your notes from the four preceding subtasks into a single document with clear sections: Riba, Gharar, Maysir, Valid Contract Conditions.
2. For each section, include: (a) the definition in one sentence, (b) the primary Quranic/hadith evidence, (c) 3-5 modern examples, and (d) a simple yes/no checklist for evaluation.
3. Add a "Quick Decision Framework" section at the top — a flowchart or checklist you can run through in under 5 minutes when evaluating any income opportunity:
   - Does this involve riba (giving or receiving interest)?
   - Does this involve gharar (excessive uncertainty in the contract)?
   - Does this involve maysir (gambling or pure speculation)?
   - Does the contract meet the five conditions of validity?
   - Is the product or service being sold halal?
4. Include a "Resources" section with the books, scholars, and websites you found most reliable during your study.
5. Format the document for quick reference — use bullet points, bold key terms, and keep it to 2-3 pages maximum.
6. Review and update the reference sheet every 6 months as your understanding deepens and new financial products emerge.
7. Share it with a trusted friend or family member who might benefit — teaching reinforces learning.

Completion indicator: a completed, printed or easily accessible reference document that covers all four categories with practical checklists.` },
      ],
    },
    {
      title: 'Ensure your income consistently covers the fard needs of your dependants (nafaqah)',
      priority: 'high', tags: ['provision', 'obligation'],
      description: 'Nafaqah — providing food, shelter, clothing, and essential needs for your family — is a religious obligation before any discretionary spending or saving. Assess whether your current income reliably meets these baseline needs and identify any shortfalls that must be addressed immediately.',
      subtasks: [
        { title: 'List all dependants and their essential monthly needs (housing, food, clothing, medical)', done: false,
          description: `**Why does this matter?**

Nafaqah — the obligation to provide for those under your care — is not a vague moral aspiration but a specific, quantifiable responsibility in Islamic law. A husband is obligated to provide for his wife, a father for his children, and in some cases, a person for their parents or other relatives. Before you can assess whether your income is sufficient, you must know exactly who depends on you and what they need. Vague awareness ("I take care of my family") is not the same as precise knowledge of the obligation.

---

**How do I accomplish this?**

1. List every person for whom you have a nafaqah obligation — spouse, children, elderly parents, and any other dependants as defined by your madhab (school of jurisprudence).
2. For each dependant, itemize their essential monthly needs across four categories:
   - **Housing:** rent or mortgage contribution, utilities, maintenance.
   - **Food:** groceries, household supplies, and reasonable dining needs.
   - **Clothing:** seasonal clothing, footwear, and essential personal items.
   - **Medical:** health insurance premiums, regular medications, dental care, and a provision for emergencies.
3. Include education costs for children if applicable — many scholars consider this part of nafaqah in the modern context.
4. Assess needs according to the standard of living appropriate to your means and social context — nafaqah is not about bare survival but dignified provision (ma'ruf).
5. Note any special needs: a child with a medical condition, an elderly parent requiring home care, or a spouse with specific health requirements.
6. Total each dependant's needs individually, then calculate the aggregate monthly obligation.

Completion indicator: a detailed, itemized list of every dependant and their monthly essential needs, with individual and aggregate totals.` },
        { title: 'Calculate the total monthly nafaqah obligation in your currency', done: false,
          description: `**Why does this matter?**

A precise number transforms nafaqah from an abstract obligation into a concrete financial target. Without this calculation, budgeting becomes guesswork, and it is easy to either underspend (neglecting dependants' rights) or overspend on non-essentials while essentials are strained. This number becomes the non-negotiable baseline of your budget — everything else (savings, investments, discretionary spending) comes after nafaqah is secured.

---

**How do I accomplish this?**

1. Take the itemized needs list from the previous step and assign a realistic monthly cost to each line item in your local currency.
2. Use actual figures wherever possible — check your bank statements for rent, utility bills, grocery receipts, and insurance premiums rather than estimating from memory.
3. For variable costs (groceries, clothing, medical), use a 3-month average to account for fluctuation.
4. Add a 10-15% buffer for unexpected essential expenses — a broken appliance, a medical co-pay, or a school fee that was not anticipated.
5. Sum all line items to arrive at your total monthly nafaqah obligation.
6. Distinguish between fixed nafaqah (rent, insurance — same every month) and variable nafaqah (groceries, clothing — fluctuates) so you can plan cash flow accordingly.
7. Record this figure prominently in your budgeting system — it is the first claim on your income, before savings, investments, or discretionary spending.

Completion indicator: a single, documented monthly figure representing your total nafaqah obligation, broken down into fixed and variable components.` },
        { title: 'Compare nafaqah total against your net monthly income', done: false,
          description: `**Why does this matter?**

The comparison between your nafaqah obligation and your net income reveals one of three realities: surplus (income exceeds nafaqah, allowing savings and generosity), balance (income just covers nafaqah, leaving no margin), or deficit (income falls short of nafaqah, requiring immediate action). Each reality demands a different response, and clarity here prevents both complacency and panic. This comparison is the financial equivalent of a medical diagnosis — it tells you what treatment is needed.

---

**How do I accomplish this?**

1. Calculate your net monthly income — total income minus taxes, mandatory deductions, and zakah (which is a prior claim on wealth, not discretionary charity).
2. Subtract your total monthly nafaqah obligation from your net income.
3. If the result is positive (surplus): determine how much surplus exists and allocate it intentionally — savings, debt repayment, sadaqah, and investment. A surplus without a plan becomes lifestyle inflation.
4. If the result is zero or near-zero (balance): identify which expenses could be reduced to create a margin. Living with zero buffer is unsustainable and one unexpected expense away from deficit.
5. If the result is negative (deficit): this is an urgent situation. Your dependants' rights are not being met, and immediate action is required — either increase income or reduce the nafaqah calculation to truly essential minimums while seeking additional provision.
6. Document the comparison in a simple table: Net Income | Nafaqah Total | Surplus/Deficit.
7. Review this comparison monthly, as both income and needs change over time.

Completion indicator: a documented comparison showing your net income against your nafaqah obligation, with a clear surplus or deficit figure and an initial response plan.` },
        { title: 'Identify and close any gaps — adjust spending, increase income, or seek community support', done: false,
          description: `**Why does this matter?**

If a gap exists between your income and your nafaqah obligation, it must be addressed with the same urgency as any other fard (obligatory) duty. The Prophet (peace be upon him) said: "It is sufficient sin for a person to neglect those whom he is responsible to feed" (Abu Dawud). Closing the gap is not optional — it is a religious obligation that may require difficult decisions: cutting discretionary spending, taking on additional halal work, or humbly seeking community support through zakah or qard hasan.

---

**How do I accomplish this?**

1. **Reduce discretionary spending first:** Review your budget for non-essential expenses — subscriptions, dining out, entertainment, luxury purchases. Redirect these funds toward nafaqah.
2. **Optimize essential costs:** Can you reduce housing costs by moving to a less expensive area? Can you lower food costs through meal planning and bulk purchasing without sacrificing nutrition?
3. **Increase income:** Refer to the earlier subtask on identifying halal replacement income. Additional work hours, freelance projects, or a second job may be necessary in the short term.
4. **Seek zakah eligibility:** If your income genuinely cannot cover essential nafaqah despite your best efforts, you may be eligible to receive zakah. Consult your local imam or Islamic community organization.
5. **Access qard hasan:** Some Islamic organizations and community funds offer interest-free loans for families in genuine need. This is a dignified, Shariah-compliant way to bridge a temporary gap.
6. **Engage family support:** In Islamic tradition, extended family members (parents, siblings, adult children) have mutual support obligations. If applicable, discuss the situation honestly with family.
7. **Set a 30-day action deadline:** Whatever combination of solutions you choose, implement the first concrete step within 30 days. Delay compounds the harm.
8. **Re-evaluate monthly:** As your income or family situation changes, repeat the nafaqah comparison to ensure the gap remains closed.

Completion indicator: a documented action plan addressing the income-nafaqah gap, with at least one concrete step taken within 30 days of identification.` },
      ],
    },
    {
      title: 'Make tawbah and resolve any past haram earnings — consult a scholar if needed',
      priority: 'medium', tags: ['tawbah', 'purification'],
      description: 'If you have earned haram income in the past, sincere repentance (tawbah) is required alongside practical steps to purify your wealth. Scholars generally advise donating the haram portion to charity (not as sadaqah for reward, but to remove the impermissible funds). Seek specific guidance for your situation.',
      subtasks: [
        { title: 'Estimate the total amount of past haram earnings to the best of your ability', done: false,
          description: `**Why does this matter?**

Purifying wealth requires knowing the scope of the contamination. If you earned haram income in the past — whether through riba-bearing accounts, employment in a prohibited industry, or transactions involving gharar or maysir — the first step toward resolution is quantifying what was earned through impermissible means. Without an honest estimate, any purification effort will be incomplete. Allah knows the exact amount even if you cannot reconstruct it perfectly, but your sincere effort to calculate demonstrates genuine commitment to repentance rather than superficial remorse.

---

**How do I accomplish this?**

1. Gather all available financial records for the period(s) when haram income was received — bank statements, pay stubs, tax returns, and investment account histories.
2. Identify each haram income source from your earlier audit and determine the date range during which you earned from it.
3. For employment in haram industries, calculate the total gross income received during that period. Some scholars distinguish between a role that is entirely haram (all income is tainted) and one where only a portion of duties involved haram (a percentage may be estimated).
4. For interest (riba) earned on savings or investments, extract the exact interest amounts from your bank or brokerage statements.
5. For ambiguous cases where exact figures are unavailable, make a conservative estimate — err on the side of overestimation rather than underestimation, as the goal is purification, not minimisation.
6. Sum all amounts into a single total. If the figure is large, do not despair — Allah's mercy is greater, and a plan to address it is what matters.
7. Document your methodology so you can explain your calculation to a scholar for validation.

Completion indicator: a documented total estimate of past haram earnings, with sources and methodology recorded, ready for scholarly review.` },
        { title: 'Make sincere tawbah — regret, cease, and resolve not to return', done: false,
          description: `**Why does this matter?**

Tawbah (repentance) is the spiritual foundation of wealth purification. Without it, donating haram funds is merely a financial transaction — with it, the act becomes a turning point in your relationship with Allah. The Prophet (peace be upon him) said: "The one who repents from sin is like the one who never sinned" (Ibn Majah). Sincere tawbah has three conditions: genuine regret for the action, immediately ceasing the haram behaviour, and firm resolve not to return to it. If the sin involved the rights of others, a fourth condition applies — restoring their rights. This is not a one-time verbal exercise but a transformation of orientation.

---

**How do I accomplish this?**

1. Set aside dedicated time for reflection and prayer — this is not something to rush through between tasks. Choose a quiet moment, ideally during the last third of the night or after a fard prayer.
2. Acknowledge the specific haram earnings to yourself with honesty — name each source and the reason it was impermissible. Vague regret is weaker than specific acknowledgment.
3. Feel genuine regret (nadam) — not just fear of consequences, but sorrow that you earned in a way that displeased your Creator. The Prophet (peace be upon him) said: "Regret is repentance" (Ahmad, Ibn Majah).
4. Confirm that you have ceased all haram earning activities. If any flagged sources remain active, the tawbah cannot be complete until you exit them.
5. Make a firm internal resolve (azm) never to return to haram income, even if financial pressure arises. Trust that Allah will provide halal alternatives: "Whoever fears Allah, He will make for him a way out" (Quran 65:2).
6. Perform two rak'at of salat al-tawbah and make du'a specifically for forgiveness regarding your financial dealings.
7. If your haram earnings harmed specific people (e.g., overcharging, deceptive sales), seek their forgiveness directly where possible.

Completion indicator: a sincere, specific repentance performed with all conditions met — regret felt, haram income ceased, and resolve firmly established.` },
        { title: 'Consult a qualified scholar on how to dispose of the haram funds', done: false,
          description: `**Why does this matter?**

The disposal of haram earnings is a nuanced fiqhi matter where scholars offer different guidance depending on the nature of the haram, whether the funds are still identifiable, and the circumstances of the earner. Some scholars advise donating the entire amount to charity without expecting reward, while others distinguish between riba income (which must be given away entirely) and income from employment in a haram industry (where some portion may be retained for work actually performed). Acting without scholarly guidance risks either retaining wealth you should have purified or disposing of wealth you were entitled to keep. This is a matter where personal research is not sufficient — expert guidance is essential.

---

**How do I accomplish this?**

1. Prepare a clear summary of your situation: the types of haram income earned, the estimated total amount, the period during which it was earned, and your current financial circumstances.
2. Identify a scholar qualified in fiqh al-muamalat (Islamic commercial jurisprudence) — not every imam has specialised knowledge in financial rulings. Look for scholars affiliated with Islamic finance certification bodies or universities with Islamic economics programmes.
3. If no local scholar is available, reputable online services such as Darul Ifta, SeekersGuidance, or the Islamic Fiqh Academy provide fatwa services, though personalised consultation is always preferable.
4. Present your case honestly and completely — withholding details compromises the quality of the guidance you receive.
5. Ask specifically: (a) Must the full amount be disposed of, or only a portion? (b) What are the permissible channels for disposal? (c) Does this count as sadaqah (earning reward) or merely ridding yourself of haram (no reward expected)?
6. Document the scholar's ruling, their reasoning, and any conditions they attach to the disposal method.
7. If you receive conflicting opinions from different scholars, follow the one whose knowledge and taqwa you trust most, and document your reasoning for the choice.

Completion indicator: a documented scholarly ruling on the disposal method for your specific haram earnings, with clear instructions you can act on.` },
        { title: 'Donate the calculated haram amount to eligible charitable causes as purification', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (57:18)
**Arabic:** 
**Translation:** Indeed, charitable men and charitable women1 who have loaned Allah a good loan—it will be multiplied for them, and for them is a noble reward.`,
          description: `**Why does this matter?**

Once the amount is calculated and the scholar has provided guidance, the funds must actually leave your possession. Haram wealth sitting in your account — even if you intend to donate it — continues to mix with your halal earnings and undermines the purity of your overall financial position. Most scholars agree that haram funds should be given to public welfare causes (infrastructure, sanitation, education for the poor) rather than to mosque construction or Quran printing, because the giver does not earn the reward of sadaqah for disposing of what was never rightfully theirs. The act is one of purification (takhallus), not generosity (ihsan).

---

**How do I accomplish this?**

1. Confirm the exact amount to be donated based on your calculation and the scholar's guidance.
2. Identify eligible charitable channels — most scholars recommend general welfare causes rather than religious institutions. Examples include: feeding the poor, providing clean water, funding medical care for the needy, and supporting orphans.
3. If the scholar specified particular types of recipients or causes, follow that guidance precisely.
4. Donate the full amount without delay. If the total is too large to give at once without jeopardising your nafaqah obligations, create a structured disbursement schedule and follow it strictly.
5. Do not expect or seek reward for this donation — it is not sadaqah but purification. Approach it with humility and gratitude that Allah has guided you to this step.
6. Obtain receipts or confirmation of each donation for your records and accountability.
7. Make du'a that Allah accepts your tawbah and places barakah in your remaining, purified wealth.
8. If the haram funds were invested and generated returns, consult your scholar on whether the returns must also be donated — most scholars say yes, as profit from haram capital inherits its ruling.

Completion indicator: the full calculated haram amount has been donated to eligible causes, with receipts or confirmations documented.` },
        { title: 'Document the resolution for your own records and peace of mind', done: false,
          description: `**Why does this matter?**

Documenting the entire process — from estimation through tawbah, scholarly consultation, and donation — serves multiple purposes. It provides closure, giving you confidence that the matter has been handled thoroughly. It creates a reference in case similar questions arise in the future or if your financial situation is questioned. It also serves as a personal reminder of the seriousness of halal earning, reinforcing your resolve to maintain purity in all future income. The Quran itself emphasises documentation in financial matters: "O you who believe, when you contract a debt for a specified term, write it down" (2:282).

---

**How do I accomplish this?**

1. Create a single document titled "Wealth Purification Record" with the following sections:
   - **Background:** A brief narrative of what haram income was earned, why, and for how long.
   - **Estimation:** The methodology used to calculate the total amount, with supporting figures.
   - **Tawbah:** The date and manner of your repentance, noting the conditions fulfilled.
   - **Scholarly Consultation:** The scholar consulted, the question asked, the ruling received, and the date.
   - **Disposition:** Where the funds were donated, the amounts, dates, and any receipts.
2. Include copies or references to any supporting documents — bank statements, scholar correspondence, donation receipts.
3. Store the document securely — this is private and sensitive. A password-protected file or a locked physical folder is appropriate.
4. Share the existence (not necessarily the contents) of this document with your accountability partner or executor, so it can be referenced if needed.
5. Write a brief personal reflection at the end: what you learned, how this experience will shape your future financial decisions, and a du'a for continued guidance.
6. Close the document with a clear statement: "This matter is resolved to the best of my ability and knowledge, with reliance on Allah's mercy and forgiveness."

Completion indicator: a complete, securely stored record of the entire wealth purification process, from estimation through final donation.` },
      ],
    },
  ],
  wealth_earning_growth: [
    {
      title: 'Identify and develop a high-income skill aligned with your calling and halal principles',
      priority: 'high', tags: ['skill-building', 'income'],
      description: 'Invest in yourself by identifying a marketable skill that aligns with your God-given talents and serves a halal purpose. Whether it is software engineering, project management, medical expertise, or a trade, developing mastery in a high-value skill is one of the most reliable paths to increased halal provision.',
      subtasks: [
        { title: 'Assess your natural strengths, interests, and existing experience', done: false,
          description: `**Why does this matter?**

Allah has given every person a unique combination of fitrah (natural disposition), talents, and life experience. Identifying these is not a secular self-help exercise — it is an act of recognising the gifts Allah has already placed in you and aligning your earning strategy with them. A person who builds a career on their genuine strengths earns more effectively, sustains effort longer, and experiences their work as meaningful rather than draining. The Prophet (peace be upon him) said: "Everyone is facilitated toward that for which they were created" (Bukhari). Starting with self-assessment prevents the common mistake of chasing trendy skills that do not suit your disposition.

---

**How do I accomplish this?**

1. List 5-10 activities where you consistently perform well and receive positive feedback — from work, volunteer roles, hobbies, or family responsibilities.
2. Identify patterns: are you strongest in analytical thinking, creative work, interpersonal communication, physical craftsmanship, or technical problem-solving?
3. Review your professional history and note which roles or projects energised you versus which ones depleted you — energy patterns reveal natural alignment.
4. Ask 3 people who know you well (a colleague, a family member, and a friend) what they see as your strongest abilities. External perspectives often reveal blind spots.
5. List your existing certifications, education, and technical skills — these are assets that reduce the time needed to reach proficiency in a related field.
6. Note any skills you have been meaning to develop but have not yet pursued — sometimes an unfulfilled interest signals a latent strength.
7. Compile your findings into a one-page "Strengths Profile" with three sections: Natural Talents, Acquired Skills, and Areas of Interest.

Completion indicator: a written strengths profile that clearly identifies your top 3-5 natural abilities and areas of existing competence.` },
        { title: 'Research market demand and earning potential for 3-5 candidate skills', done: false,
          description: `**Why does this matter?**

A skill is only high-income if the market values it. Many talented people remain underpaid because they invested deeply in skills with limited market demand or failed to position existing skills in high-value contexts. Researching market demand ensures your development effort targets skills where employers, clients, or customers are actively willing to pay premium rates. This is not about chasing money for its own sake — it is about being strategic with the time and effort Allah has given you so that your provision (rizq) is maximised for the benefit of your family and community.

---

**How do I accomplish this?**

1. Based on your strengths profile, identify 3-5 specific skills that align with your natural abilities and could command high compensation (e.g., cloud architecture, medical specialisation, skilled trades like welding or electrical work, project management, data analysis).
2. Research salary data for each skill using platforms like Glassdoor, LinkedIn Salary Insights, PayScale, or industry-specific surveys in your region.
3. Examine job posting volumes — a skill with many open positions signals strong demand; few postings may indicate a saturated or declining market.
4. Look at freelance and consulting rates for each skill on platforms like Upwork, Toptal, or industry-specific marketplaces to assess independent earning potential.
5. Identify growth trends: is demand for this skill increasing or declining over the next 5-10 years? Industry reports from McKinsey, the World Economic Forum, or sector-specific bodies provide this data.
6. Talk to at least one professional currently earning well in each candidate field — their firsthand experience is more valuable than any report.
7. Create a comparison table: Skill | Average Salary | Freelance Rate | Job Demand | Growth Trend | Alignment with Strengths.

Completion indicator: a documented comparison of 3-5 candidate skills with market data, earning potential, and alignment scores for each.` },
        { title: 'Verify each candidate skill operates in a halal industry context', done: false,
          description: `**Why does this matter?**

A high-income skill deployed in a haram industry is a contradiction of purpose. Software engineering pays well, but building platforms for gambling or riba-based lending negates the benefit. Before committing months or years to developing a skill, you must verify that the industries and roles where this skill is most commonly applied are halal or at minimum have substantial halal employment options. This step prevents the painful situation of investing heavily in a skill only to discover that the best-paying opportunities require compromising your principles.

---

**How do I accomplish this?**

1. For each candidate skill, list the top 5 industries where it is most commonly employed (e.g., software engineering is used in fintech, healthcare, e-commerce, defence, and entertainment).
2. Evaluate each industry against the halal criteria you established in the core earning audit: free from riba, gharar, maysir, haram products, and oppression.
3. Identify which industries are clearly halal (e.g., halal food production, Islamic fintech, education, healthcare), which are clearly haram (e.g., conventional banking core operations, alcohol manufacturing, gambling platforms), and which are mixed.
4. For mixed industries, assess whether halal roles are readily available or whether most positions require some haram involvement.
5. Research whether Islamic or ethical alternatives exist within the field — for example, Islamic finance companies need the same technical skills as conventional banks but operate within halal frameworks.
6. Eliminate any candidate skill where the overwhelming majority of high-paying opportunities are in haram sectors with no viable halal alternatives.
7. Update your comparison table with a "Halal Viability" column rating each skill as High, Medium, or Low based on the availability of halal employment.

Completion indicator: each candidate skill has a documented halal viability assessment, and any skill with low halal viability has been flagged or eliminated.` },
        { title: 'Choose one skill and commit to a structured learning plan (course, mentor, project)', done: false,
          description: `**Why does this matter?**

Scattered learning across multiple skills produces mediocrity in all of them. Excellence — ihsan — requires focused commitment to mastery of one thing at a time. The Prophet (peace be upon him) said: "Allah loves that when one of you does a deed, he does it with ihsan (excellence)" (al-Bayhaqi). Choosing one skill and committing to a structured plan transforms aspiration into action. The plan must include formal learning (to build foundational knowledge), mentorship (to accelerate growth through experienced guidance), and practical application (to convert knowledge into demonstrable competence).

---

**How do I accomplish this?**

1. Review your comparison table and select the skill that scores highest across all criteria: alignment with strengths, market demand, earning potential, growth trend, and halal viability.
2. If two skills score similarly, choose the one that excites you more — sustained motivation over months of learning requires genuine interest.
3. Identify the best learning pathway: a formal course (university, bootcamp, or online programme), a professional certification, or a structured self-study curriculum with reputable resources.
4. Find a mentor — someone currently working at a high level in the skill you are developing. Reach out through professional networks, LinkedIn, or community connections. Offer to buy them coffee or lunch in exchange for guidance.
5. Define a practical project you will complete during the learning phase — employers and clients care about demonstrated ability more than certificates. The project should be substantial enough to showcase competence.
6. Create a weekly schedule that allocates specific hours to learning. Treat these hours as non-negotiable appointments with your future provision.
7. Set a budget for the learning investment — courses, books, tools, and mentorship may cost money. This is an investment in your earning capacity and a legitimate use of funds.
8. Write a one-page learning plan with: Skill Selected, Learning Resources, Mentor (if secured), Project Description, Weekly Time Commitment, and Target Completion Date.

Completion indicator: a written learning plan with a specific skill selected, resources identified, and a weekly schedule committed to.` },
        { title: 'Set a 90-day milestone to demonstrate measurable progress', done: false,
          description: `**Why does this matter?**

Open-ended learning without milestones drifts into passive consumption — watching tutorials, reading books, but never applying. A 90-day milestone creates urgency and accountability, forcing you to produce tangible evidence of progress that can be evaluated objectively. Ninety days is long enough to achieve meaningful competence in a focused skill area but short enough to maintain intensity. This milestone also serves as a decision point: after 90 days, you can assess whether this skill path is genuinely viable or whether a course correction is needed before more time is invested.

---

**How do I accomplish this?**

1. Define a specific, measurable outcome for day 90 — not "learn Python" but "build and deploy a functional web application using Python and Django" or "complete three paid freelance projects in data analysis."
2. Break the 90 days into three 30-day phases:
   - **Days 1-30 (Foundation):** Complete the core learning material — finish the course, read the foundational texts, set up your tools and environment.
   - **Days 31-60 (Application):** Begin the practical project. Apply what you learned in Phase 1 to real or simulated problems. Seek feedback from your mentor.
   - **Days 61-90 (Demonstration):** Complete and polish the project. Create a portfolio piece, case study, or credential that demonstrates your new competence to potential employers or clients.
3. Set weekly check-in points — every Sunday, review what you accomplished that week versus your plan. Adjust the following week if you are behind.
4. Share your milestone with your accountability partner (spouse, mentor, trusted friend) so someone other than yourself is tracking your progress.
5. At day 90, conduct an honest evaluation: Did you hit the milestone? What did you learn about your aptitude for this skill? Is this the right path forward, or should you pivot?
6. If the milestone is met, celebrate — then immediately set the next 90-day milestone to continue building toward mastery and income generation.

Completion indicator: a clearly defined, measurable 90-day milestone written down and shared with an accountability partner, with weekly checkpoints scheduled.` },
      ],
    },
    {
      title: 'Diversify income — build a second halal revenue stream (consulting, rentals, or business)',
      priority: 'high', tags: ['income', 'stability'],
      description: 'Relying on a single income source creates financial fragility. The Prophet (peace be upon him) encouraged trade and enterprise. Building a second halal revenue stream — whether through consulting, rental property, an online business, or partnership — provides resilience and increases your capacity for generosity.',
      subtasks: [
        { title: 'Brainstorm 5 potential secondary income ideas aligned with your skills', done: false,
          description: `**Why does this matter?**

The companions of the Prophet (peace be upon him) were traders, farmers, craftsmen, and soldiers — many held multiple roles simultaneously. Diversifying income is not greed; it is prudent stewardship that protects your family from the vulnerability of a single income source. If your primary job is lost or reduced, a second stream keeps nafaqah flowing without interruption. Brainstorming multiple ideas before committing to one ensures you explore the full landscape of possibility rather than jumping at the first thought that comes to mind.

---

**How do I accomplish this?**

1. Review your strengths profile and professional experience — what knowledge or skills do you possess that others would pay for outside your primary employment?
2. Consider consulting or freelancing in your professional domain — if you are a skilled accountant, engineer, designer, or developer, there are clients willing to pay for project-based work.
3. Explore physical asset-based income: rental property, equipment leasing, or vehicle rental — these generate income with effort front-loaded in acquisition and setup.
4. Think about digital products: online courses, templates, e-books, or software tools that leverage your expertise and can be sold repeatedly with minimal ongoing effort.
5. Evaluate service-based side businesses: tutoring, coaching, consulting, home repair, catering, or other services aligned with skills you already have.
6. Write down at least 5 ideas without filtering — at this stage, quantity matters more than quality. You will evaluate feasibility in the next step.
7. For each idea, write one sentence describing the offering and who would pay for it.

Completion indicator: a list of at least 5 secondary income ideas, each with a brief description of the offering and target customer.` },
        { title: 'Evaluate each idea for halal compliance, startup cost, and time commitment', done: false,
          description: `**Why does this matter?**

Not every good idea is a viable one, and not every viable idea is halal. Evaluation prevents you from investing time, money, and energy into a venture that either violates Islamic principles, requires capital you do not have, or demands more hours than your primary responsibilities (employment and family) allow. A structured evaluation turns a brainstorm list into a ranked shortlist of realistic options, each vetted against the criteria that matter most for sustainable, halal income generation.

---

**How do I accomplish this?**

1. Create an evaluation table with columns: Idea Name, Halal Status, Startup Cost, Monthly Time Required, Revenue Potential, and Overall Score.
2. **Halal compliance:** Apply your halal earning framework to each idea. Does the product or service involve anything haram? Does the business model involve riba, gharar, or maysir? Would marketing or sales require deception? Rate as: Clearly Halal, Needs Verification, or Potentially Problematic.
3. **Startup cost:** Estimate the minimum upfront investment needed — equipment, software, licensing, inventory, marketing. Distinguish between ideas that can start with under \$500 versus those requiring thousands.
4. **Time commitment:** Estimate the weekly hours required to launch and then to maintain. Be honest about your available time — overcommitting leads to burnout and harms both your primary job and family responsibilities.
5. **Revenue potential:** Based on your market research, estimate realistic monthly revenue after the first 3-6 months. Avoid inflated projections — use conservative figures.
6. Score each idea on a 1-5 scale across all four criteria and calculate a weighted total (weight halal compliance heaviest).
7. Eliminate any idea rated "Potentially Problematic" on halal grounds — no amount of revenue justifies haram earning.

Completion indicator: a completed evaluation table with all 5 ideas scored, ranked, and any haram-adjacent options eliminated.` },
        { title: 'Select the most viable option and draft a simple business plan', done: false,
          description: `**Why does this matter?**

Selection without a plan is just enthusiasm. A simple business plan — even a one-page version — forces you to think through the critical elements: who will pay you, what you will deliver, how you will reach customers, and what it will cost. This is not about creating a formal document for investors; it is about clarity of intention and action. The Prophet (peace be upon him) said: "Actions are judged by intentions" (Bukhari and Muslim). A plan makes your intention specific, actionable, and accountable rather than a vague aspiration to "start something on the side."

---

**How do I accomplish this?**

1. Select the idea that scored highest in your evaluation, ensuring it is rated Clearly Halal.
2. Write a one-page business plan with the following sections:
   - **Value Proposition:** What exactly are you offering, and why would someone pay for it? Be specific — "I help small business owners set up their bookkeeping systems" is better than "I do consulting."
   - **Target Customer:** Who is your ideal buyer? Define them by demographics, need, and where they can be found.
   - **Revenue Model:** How will you charge — per project, hourly, subscription, per unit? What is your target price point?
   - **Marketing Strategy:** How will customers find you? Start with the lowest-cost channels: word of mouth, social media, community networks, mosque bulletin boards.
   - **Startup Costs:** Itemise every cost needed to launch — tools, software, website, initial inventory, marketing materials.
   - **First 90-Day Goals:** What specific revenue and customer milestones will you target in the first 3 months?
3. Keep the plan to one page maximum — brevity forces clarity and prevents overthinking.
4. Share the plan with a trusted friend or mentor for feedback before proceeding.
5. Set a specific launch date — commitment to a date prevents indefinite planning.

Completion indicator: a one-page business plan for your selected secondary income idea, reviewed by at least one trusted person, with a launch date set.` },
        { title: 'Launch a minimum viable version within 30 days', done: false,
          description: `**Why does this matter?**

Perfectionism kills more business ideas than competition does. A minimum viable version — the simplest form of your offering that delivers real value to a real customer — gets you into the market, generating feedback and revenue, faster than months of preparation ever could. The first sale, even if small, is transformative: it proves the concept, builds confidence, and begins the cycle of learning and improvement. Umar ibn al-Khattab (may Allah be pleased with him) said: "No one of you should refrain from seeking provision and say, 'O Allah provide for me,' for the sky does not rain gold and silver." Launch is where tawakkul meets effort.

---

**How do I accomplish this?**

1. Strip your business plan down to the absolute minimum needed for a first customer: what is the simplest version of your offering that still delivers genuine value?
2. **Week 1:** Set up the operational basics — create a simple website or social media page, register the business if legally required, open a separate bank account for business income, and prepare your initial offering.
3. **Week 2:** Build or prepare the actual product or service. If it is a service, define your process and create a simple proposal template. If it is a product, produce or acquire the first batch.
4. **Week 3:** Begin outreach. Tell everyone in your network what you are offering. Contact 10 potential customers directly. Post on relevant social media groups. Offer a discounted or free trial to your first 2-3 customers in exchange for testimonials.
5. **Week 4:** Secure and deliver your first sale or engagement. Focus on delivering exceptional quality to this first customer — their feedback and referral are worth more than the revenue.
6. Document every lesson from the launch month: what worked, what did not, what surprised you, and what customers actually want versus what you assumed they wanted.
7. Do not wait for everything to be perfect — launch with "good enough" and improve based on real market feedback.

Completion indicator: at least one paying customer or completed engagement within 30 days of starting the launch process.` },
        { title: 'Track revenue monthly and iterate based on results', done: false,
          description: `**Why does this matter?**

A business that does not track its numbers is a hobby. Monthly revenue tracking transforms your secondary income from a sporadic side effort into a managed financial asset that grows intentionally over time. Tracking reveals whether your business is progressing, stagnating, or declining — and iteration based on real data (not feelings) allows you to course-correct before problems compound. The Quranic injunction to write down transactions (2:282) applies here: what is measured can be managed, and what is managed can grow.

---

**How do I accomplish this?**

1. Set up a simple tracking system — a spreadsheet is sufficient. Track monthly: gross revenue, direct costs, net profit, number of customers or projects, and hours invested.
2. Calculate your effective hourly rate (net profit divided by hours invested) — this reveals whether the venture is worth your time relative to your primary income. If your side business earns less per hour than your day job, you need to either raise prices or find efficiencies.
3. At the end of each month, conduct a 30-minute review:
   - What was the best source of customers this month?
   - What took the most time for the least return?
   - What feedback did customers provide?
   - What one change would have the biggest impact next month?
4. Iterate based on findings: adjust pricing, refine your offering, double down on the marketing channel that works best, and eliminate activities that consume time without generating revenue.
5. Set a quarterly revenue target that increases by 10-20% each quarter — sustainable growth is better than dramatic spikes followed by crashes.
6. If revenue stalls for three consecutive months despite active iteration, conduct a deeper review: is the market viable? Is your offering competitive? Should you pivot to a different idea from your original brainstorm list?
7. Reinvest a portion of profits (10-20%) back into the business to fund growth — better tools, marketing, training, or hiring help.

Completion indicator: a monthly tracking system in place with at least one month of data recorded and a review completed with at least one actionable change identified.` },
      ],
    },
    {
      title: 'Track your income and expenses monthly — use a simple halal-aware budgeting system',
      priority: 'medium', tags: ['budgeting', 'planning'],
      description: 'Consistent tracking of where your money comes from and where it goes is essential for intentional stewardship (khilafah) of wealth. A halal-aware budget explicitly accounts for zakah, sadaqah, and debt repayment as non-negotiable line items rather than afterthoughts.',
      subtasks: [
        { title: 'Choose a budgeting tool or spreadsheet and set it up with halal-aware categories', done: false,
          description: `**Why does this matter?**

Most conventional budgeting tools and frameworks are designed around categories that do not reflect Islamic financial priorities. They track entertainment and dining but have no concept of zakah, sadaqah, or Islamic financing payments. A halal-aware budgeting system makes your religious financial obligations visible alongside your worldly expenses, ensuring they receive the priority they deserve rather than being treated as optional afterthoughts. The tool itself does not matter — what matters is that your financial framework reflects your values.

---

**How do I accomplish this?**

1. Choose your budgeting medium based on your comfort level: a spreadsheet (Google Sheets or Excel) for maximum flexibility, a budgeting app (YNAB, Mint, or similar) for convenience, or even a paper ledger if you prefer the tactile approach.
2. Set up the following halal-aware income categories: Primary Employment, Secondary Income, Investment Returns, Rental Income, Gifts/Inheritance, and Other Halal Income.
3. Set up expense categories that reflect Islamic priorities in this order:
   - **Obligatory (fard):** Zakah, nafaqah (dependant provision), debt repayment.
   - **Essential:** Housing, food, utilities, transportation, medical, education.
   - **Recommended:** Sadaqah, Islamic learning, community contributions.
   - **Discretionary:** Entertainment, dining out, hobbies, personal purchases.
4. Add a "Savings and Investment" category separate from expenses — this is wealth being preserved and grown, not consumed.
5. Create a clear visual distinction between the obligation tier and the discretionary tier — colour coding, bold headers, or separate sections.
6. If using an app, customise the category names to match the framework above. Most apps allow custom categories.
7. Test the setup by entering a few sample transactions to ensure the categories cover your typical spending without overlap or gaps.

Completion indicator: a budgeting system set up and ready for data entry, with halal-aware categories that prioritise Islamic financial obligations.` },
        { title: 'Add dedicated line items for zakah, sadaqah, and debt repayment', done: false,
          description: `**Why does this matter?**

Zakah is not optional charity — it is a right that the poor have upon your wealth, as binding as any bill. Sadaqah, while voluntary, is a pillar of Muslim financial life that brings barakah and purifies wealth. Debt repayment is an obligation the Prophet (peace be upon him) took so seriously that he initially refrained from praying janazah for someone who died in debt until the debt was settled. By creating dedicated, non-negotiable line items for these three categories, you ensure they are funded before discretionary spending erodes the resources available for them.

---

**How do I accomplish this?**

1. **Zakah line item:** Calculate your estimated annual zakah obligation and divide by 12. Enter this as a fixed monthly allocation, even if you pay zakah annually in a lump sum. Setting aside monthly prevents the shock of a large annual payment and ensures funds are always available.
2. **Sadaqah line item:** Decide on a minimum monthly sadaqah amount. Start with whatever you can sustain comfortably — even a small, consistent amount is beloved to Allah. The Prophet (peace be upon him) said: "The most beloved deeds to Allah are those done consistently, even if they are small" (Bukhari).
3. **Debt repayment line item:** If you carry any debts, list the total minimum payments required across all debts as a single line item. Then add an "extra payment" sub-item for any amount above the minimum you are directing toward accelerated payoff.
4. Place all three line items in the "Obligatory" tier of your budget — above housing, food, and discretionary spending. This visual placement reinforces their priority.
5. Set up automatic transfers for each: zakah savings to a dedicated account, sadaqah to your chosen charity, and debt payments on their due dates.
6. Never borrow from these line items to cover discretionary spending. If money is tight, reduce discretionary expenses first.

Completion indicator: three dedicated, funded line items in your budget for zakah, sadaqah, and debt repayment, with automatic transfers or payment schedules configured.` },
        { title: 'Enter all income and expenses for the current month as a baseline', done: false,
          description: `**Why does this matter?**

A budget without data is a theory. Entering your actual income and expenses for the current month establishes a factual baseline — the real picture of where your money comes from and where it goes. Most people are surprised by the results: subscriptions they forgot about, spending categories that are much larger than they assumed, and income that is less (or occasionally more) than they thought. This baseline is the foundation upon which all future financial decisions are made. Without it, you are budgeting against assumptions rather than reality.

---

**How do I accomplish this?**

1. Gather all financial records for the current month: bank statements, credit card statements, cash receipts, and any digital payment records (PayPal, Venmo, mobile payments).
2. Enter every income transaction into the appropriate halal-aware category. If a source is new, create a sub-category rather than forcing it into an ill-fitting one.
3. Enter every expense transaction, categorising each one according to your halal-aware framework: obligatory, essential, recommended, or discretionary.
4. For cash expenses where you do not have receipts, estimate as accurately as possible. Going forward, track cash spending in real time using a note-taking app on your phone.
5. Do not judge or edit as you enter — the goal is an accurate picture, not a flattering one. If you spent excessively on dining out, record it honestly.
6. After all entries are complete, generate a summary: total income, total expenses, and the difference (surplus or deficit). Then view the breakdown by category.
7. Highlight any surprises — categories where spending was significantly higher or lower than you expected. These surprises are the most valuable data points for future budgeting.

Completion indicator: a complete month of actual income and expenses entered into your budgeting system, with category totals calculated and surprises identified.` },
        { title: 'Schedule a monthly review session (e.g., first Friday of each month)', done: false,
          description: `**Why does this matter?**

A budget that is created once and never reviewed is a budget that fails. Monthly review transforms budgeting from a one-time exercise into an ongoing practice of financial stewardship (khilafah). The review session is where you confront reality, celebrate progress, identify problems early, and make adjustments before small issues become crises. Scheduling it on a specific recurring date — such as the first Friday of each month — removes the decision fatigue of "when should I do this?" and makes it a habit rather than an intention.

---

**How do I accomplish this?**

1. Choose a specific, recurring date and time for your monthly review. The first Friday of each month after Jumu'ah prayer is a natural option — you are already in a reflective state, and the day carries barakah.
2. Block 30-60 minutes on your calendar and treat it as a non-negotiable appointment. If you have a spouse or financial partner, make it a joint session.
3. Create a standard review agenda you follow each month:
   - Enter any transactions not yet recorded.
   - Compare actual spending versus planned budget for each category.
   - Check zakah savings — are you on track for your annual obligation?
   - Review debt repayment progress — did you make at least the minimum plus extra?
   - Identify the biggest variance: where did you overspend or underspend, and why?
   - Set any adjustments for the coming month.
4. Keep a brief written record of each review session — 3-5 bullet points capturing key findings and decisions. Over time, this creates a financial journal that reveals patterns.
5. If you miss a scheduled review, do it within 3 days — do not let one missed session become a pattern of abandonment.
6. After 3 months of consistent reviews, evaluate whether the cadence and format are working or need adjustment.

Completion indicator: a recurring calendar appointment set for monthly budget review, with a standard agenda prepared and the first review session completed.` },
        { title: 'Identify the top 3 areas where spending can be reduced or redirected', done: false,
          description: `**Why does this matter?**

Every dirham saved from wasteful spending is a dirham that can be directed toward provision, debt freedom, investment, or generosity. Allah says: "Eat and drink, but do not be excessive — indeed, He does not like those who are excessive" (Quran 7:31). Identifying the top 3 reduction areas focuses your effort on the changes with the greatest financial impact rather than trying to cut everything simultaneously, which is unsustainable. Most people find that a small number of categories account for a disproportionate share of unnecessary spending.

---

**How do I accomplish this?**

1. Review your baseline month of data and sort all discretionary spending categories from highest to lowest.
2. For each of the top 5 discretionary categories, ask: "Does this spending genuinely serve my well-being and my family's needs, or has it become habitual, excessive, or driven by social pressure?"
3. Identify the top 3 categories where you could realistically reduce spending by 20-50% without meaningful harm to your quality of life. Common candidates include: dining out, subscriptions and memberships, impulse purchases, entertainment, and branded items where generic alternatives exist.
4. For each identified area, define a specific, measurable reduction target: "Reduce dining out from \$400/month to \$250/month" rather than "eat out less."
5. Determine where the freed-up funds will go — the redirection is as important as the reduction. Options include: increasing zakah savings, accelerating debt repayment, building the emergency fund, or increasing sadaqah.
6. Implement the changes for one month and then evaluate: was the reduction sustainable? Did it cause genuine hardship or merely mild inconvenience? Adjust as needed.
7. Resist the temptation to redirect savings toward other discretionary categories — the goal is to channel funds toward higher-priority uses, not to swap one indulgence for another.

Completion indicator: three specific spending categories identified for reduction, with measurable targets and a defined redirection plan for the freed funds.` },
      ],
    },
    {
      title: 'Negotiate a raise or contract rate increase aligned with your market value',
      priority: 'medium', tags: ['income', 'negotiation'],
      description: 'Being underpaid relative to your contribution is not humility — it is a missed opportunity to better provide for your family and community. Research your market value and advocate for fair compensation. The Prophet (peace be upon him) said: "Give the worker his wages before his sweat dries."',
      subtasks: [
        { title: 'Research salary benchmarks for your role, experience level, and location', done: false,
          description: `**Why does this matter?**

You cannot negotiate effectively without data. Asking for a raise based on feelings ("I feel underpaid") is far weaker than presenting market evidence ("The median salary for this role in this city with my experience level is X, and I am currently at Y"). Salary benchmarking grounds your request in objective reality, making it a professional conversation about fair compensation rather than an emotional plea. It also protects you from asking for too little — many Muslims, out of misplaced modesty, undervalue their contribution and accept less than the market rate, which harms their ability to provide for family and community.

---

**How do I accomplish this?**

1. Identify your exact job title, or the closest standard equivalent, as used in salary databases. "Senior Software Engineer" is searchable; "Tech Lead / Full Stack Guy" is not.
2. Use at least 3 salary data sources to triangulate your market value:
   - **Glassdoor or LinkedIn Salary Insights:** Provides self-reported salary ranges by title, company, and location.
   - **PayScale or Salary.com:** Offers more granular filtering by experience, education, and skills.
   - **Industry-specific surveys:** Many professional associations publish annual compensation reports.
3. Filter by your specific location — salaries vary dramatically by geography. Remote work has complicated this, but local cost of living still matters.
4. Filter by experience level — entry-level, mid-career, and senior rates differ significantly. Use the bracket that matches your actual years of relevant experience.
5. Note the 25th, 50th (median), and 75th percentile figures. Your target should be at or above the median unless you are new to the role.
6. If you are a freelancer or contractor, research hourly or project rates on platforms like Upwork, Toptal, or through industry contacts.
7. Document your findings in a brief summary with sources cited — you may share this data during the negotiation.

Completion indicator: a documented salary benchmark for your role with data from at least 3 sources, showing median and upper-range figures for your experience level and location.` },
        { title: 'Document your key accomplishments and contributions over the past 6-12 months', done: false,
          description: `**Why does this matter?**

Employers and clients pay for value delivered, not time served. Your accomplishments over the past 6-12 months are the evidence that you deserve increased compensation — but if you cannot articulate them clearly, your manager or client will not do it for you. Most professionals significantly undercount their contributions because they move on to the next task without recording what they achieved. Documenting your impact in specific, quantifiable terms transforms your raise request from "I work hard" to "I delivered measurable results that exceeded expectations."

---

**How do I accomplish this?**

1. Review the last 6-12 months of your work chronologically — check project records, emails, performance reviews, and any task management systems for evidence of what you delivered.
2. For each significant contribution, write a brief statement using the format: "Accomplished [specific result] by [what you did], resulting in [measurable impact]."
3. Quantify wherever possible: revenue generated, costs saved, time reduced, customers served, projects completed, problems resolved. Numbers are more persuasive than adjectives.
4. Include contributions beyond your job description — mentoring colleagues, leading initiatives, representing the team in cross-functional meetings, or solving problems outside your scope.
5. Note any positive feedback you received — from managers, clients, colleagues, or stakeholders. Direct quotes are powerful evidence.
6. Identify any instances where you went above and beyond or handled crisis situations — these demonstrate reliability and commitment that justifies premium compensation.
7. Organise the accomplishments into 3-5 themes (e.g., "revenue growth," "operational efficiency," "team development") for a structured presentation.
8. Keep this document updated going forward — add accomplishments monthly so you are never caught unprepared for a compensation conversation.

Completion indicator: a documented list of 5-10 key accomplishments from the past 6-12 months, with quantified impact where possible, organised by theme.` },
        { title: 'Prepare a clear, professional case for a specific raise or rate increase', done: false,
          description: `**Why does this matter?**

Walking into a compensation conversation without a prepared case is like entering a court without evidence. Your case must weave together market data, your accomplishments, and a specific request into a coherent narrative that makes saying "yes" easy for the decision-maker. The request must be specific — "I am requesting a 15% increase to bring my compensation to the market median" is actionable; "I would like more money" is not. Preparation also builds your confidence, which directly affects how your request is received. The Prophet (peace be upon him) taught us to be clear and direct in our dealings.

---

**How do I accomplish this?**

1. Combine your salary benchmark data and accomplishments document into a single presentation — this can be a brief document, a slide deck, or even structured talking points.
2. Open with your value proposition: a 2-3 sentence summary of your role, tenure, and the impact you have delivered.
3. Present your market data: show where your current compensation falls relative to the benchmark, highlighting any gap between your pay and the median or upper range.
4. Walk through your top 3-5 accomplishments with quantified impact — connect each to a business outcome the decision-maker cares about.
5. State your specific request: the exact salary, rate, or percentage increase you are seeking, and why that number is justified by the data.
6. Anticipate objections and prepare responses:
   - "Budget is tight" — acknowledge constraints while reaffirming that market competitiveness affects retention.
   - "We will review later" — request a specific date and interim steps.
   - "Your performance needs improvement in X area" — acknowledge and redirect to overall contribution.
7. Practice delivering the case aloud at least twice — to a mirror, a spouse, or a trusted friend. Rehearsal reduces nervousness and sharpens your delivery.

Completion indicator: a prepared, rehearsed case for a specific raise amount, combining market data and accomplishments, with responses to likely objections.` },
        { title: 'Schedule and conduct the negotiation conversation', done: false,
          description: `**Why does this matter?**

Preparation without action is self-deception. The conversation itself is where your case meets reality, and delaying it indefinitely — out of fear, discomfort, or "waiting for the right time" — means you continue to be underpaid while the evidence of your value ages. Scheduling the conversation commits you to a date and creates external accountability. The negotiation itself is a legitimate, professional act — advocating for fair compensation is not arrogance; it is responsible stewardship of your earning capacity for the sake of your family and community.

---

**How do I accomplish this?**

1. Request a dedicated meeting with your manager or client — do not ambush them in a casual conversation or squeeze it into a busy meeting. Frame it professionally: "I would like to schedule 30 minutes to discuss my compensation and growth trajectory."
2. Choose the timing strategically: after a successful project delivery, during a formal review cycle, or when you have recent evidence of strong performance. Avoid periods of company-wide budget cuts or layoffs unless your situation is urgent.
3. Open the conversation by expressing gratitude for the opportunity and your commitment to the role — this sets a collaborative rather than adversarial tone.
4. Present your case as prepared: market data, accomplishments, and specific request. Be confident but not aggressive. Speak factually and let the evidence carry the weight.
5. Listen actively to the response. If the answer is yes, confirm the details in writing. If it is a partial yes, clarify what is being offered and whether there is a path to the full request.
6. If the answer is no, ask for specific feedback: "What would I need to demonstrate for this increase to be approved?" and "When can we revisit this conversation?" Get a committed timeline.
7. Follow up with an email summarising the conversation and any agreed-upon next steps — this creates a written record and demonstrates professionalism.
8. Regardless of outcome, maintain your performance standards and continue documenting accomplishments. One conversation is rarely the last word.

Completion indicator: the negotiation conversation conducted, with outcome documented and next steps agreed upon in writing.` },
      ],
    },
  ],
  wealth_earning_excellence: [
    {
      title: 'Create ethical employment — hire and mentor someone, generating income for others',
      priority: 'medium', tags: ['employment', 'impact'],
      description: 'One of the highest forms of earning excellence is creating halal employment for others. By hiring even one person and paying them fairly and on time, you participate in circulating wealth through the community and fulfilling a prophetic standard of economic justice.',
      subtasks: [
        { title: 'Identify a role in your business or project that could be filled by a new hire', done: false,
          description: `**Why does this matter?**

Creating halal employment for others is one of the most impactful forms of wealth stewardship in Islam. When you hire someone, you do not merely exchange money for labour — you provide a family with rizq, dignity, and stability. The ripple effects extend far beyond your business: the employee pays rent, feeds children, gives sadaqah, and participates in the economy. But hiring prematurely or for the wrong role wastes resources and can harm both your business and the employee. Identifying the right role first ensures that the position is genuine, sustainable, and beneficial to all parties.

---

**How do I accomplish this?**

1. Audit your current workload and business operations: which tasks consistently consume your time but do not require your unique expertise? These are prime delegation candidates.
2. Identify bottlenecks: where is growth being constrained because you cannot do everything yourself? A hire in this area directly increases your capacity to serve customers and generate revenue.
3. Distinguish between tasks that need a full-time employee versus those that could be handled by a part-time worker, contractor, or virtual assistant. Start with the level of commitment your business can sustain.
4. Write a brief role description: what the person would do daily, what skills they need, and what success looks like in the first 90 days.
5. Estimate the revenue impact of the hire — will this person directly generate income (e.g., a salesperson) or free you to generate more income (e.g., an administrative assistant)?
6. Verify that your business can sustain the compensation for at least 6 months even in a slow period — hiring someone and then being unable to pay them is a harm to be avoided.
7. Consider whether the role could be filled by someone in your community who is currently seeking work — creating opportunity locally multiplies the community benefit.

Completion indicator: a clearly defined role with a description, required skills, expected impact, and confirmed financial sustainability for at least 6 months.` },
        { title: 'Define fair compensation based on market rates and Islamic principles of just wages', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (49:9)
**Arabic:** 
**Translation:** If two parties among the Believers fall into a quarrel, make ye peace between them: but if one of them transgresses beyond bounds against the other, then fight ye (all) against the one that transgresses until it complies with the command of Allah; but if it complies, then make peace between them with justice, and be fair: for Allah loves those who are fair (and just).`,
          description: `**Why does this matter?**

The Prophet (peace be upon him) said: "Give the worker his wages before his sweat dries" (Ibn Majah). This hadith establishes not only the timing of payment but the principle that wages must be fair — sufficient for the worker to live with dignity. Underpaying an employee because you have bargaining power is a form of zulm (oppression) that the Quran explicitly condemns. At the same time, overpaying beyond your means can threaten the sustainability of the position itself. Fair compensation balances market reality with Islamic justice, ensuring the worker is neither exploited nor the business endangered.

---

**How do I accomplish this?**

1. Research the market rate for the role in your location using the same salary benchmarking tools recommended earlier (Glassdoor, PayScale, industry surveys).
2. Determine the range: what is the 25th percentile (entry-level), median (experienced), and 75th percentile (highly skilled) for this role?
3. Consider the cost of living in your area — a market-rate salary that does not cover basic nafaqah in your city is not truly fair, regardless of what databases say.
4. If hiring within the Muslim community, be especially mindful of the trust placed in you — a brother or sister accepting a role from a fellow Muslim expects Islamic ethics, not exploitation.
5. Factor in benefits beyond base salary: health coverage, flexible hours, remote work options, professional development support, and time off for Islamic holidays and prayers.
6. Determine whether you will structure compensation as salary, hourly, or project-based. Each has different implications for both parties.
7. Set the compensation at or above the market median for the role — paying at the bottom of the range signals that you value cost savings over people, which contradicts the prophetic standard.
8. Document the compensation structure clearly so there is no ambiguity — the employment contract should specify amount, payment schedule, and any conditions.

Completion indicator: a documented compensation package at or above market median, with payment terms clearly defined and aligned with Islamic principles of fair wages.` },
        { title: 'Recruit and hire a suitable candidate, prioritising trustworthiness and competence', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (28:26)
**Arabic:** 
**Translation:** One of the two women said: O my father! Hire him! For the best (man) that thou canst hire in the strong, the trustworthy.`,
          description: `**Why does this matter?**

The Quran provides the hiring criteria directly: when advising her father to hire Musa (peace be upon him), one of the daughters of Shu'ayb said, "Indeed, the best one you can hire is the strong and the trustworthy" (Quran 28:26). Strength (quwwah) refers to competence and capability for the specific role, while trustworthiness (amanah) refers to integrity, reliability, and moral character. Both are essential — a competent person without integrity can cause great harm, and a trustworthy person without competence cannot fulfil the role. Prioritising these two qualities over nepotism, convenience, or surface impressions ensures you hire someone who will genuinely contribute.

---

**How do I accomplish this?**

1. Post the role description through channels most likely to reach qualified candidates: professional networks, community boards, Islamic professional associations, and relevant job platforms.
2. Screen applications for the two primary criteria: evidence of competence (relevant experience, skills, portfolio, or references) and indicators of trustworthiness (consistency in career history, quality of references, and character assessment).
3. Conduct structured interviews with at least 3 candidates. Prepare the same questions for each to enable fair comparison. Include both technical/skill questions and situational questions that reveal character and work ethic.
4. Check references thoroughly — ask former employers or colleagues specifically about reliability, honesty, and how the candidate handled disagreements or mistakes.
5. If the candidate is from your personal network or community, maintain professional standards anyway. Nepotistic hiring that bypasses evaluation harms both the business and the hired individual.
6. Make the offer clearly and professionally, with a written employment agreement that specifies role, compensation, expectations, and terms.
7. Provide a structured onboarding experience — the first week sets the tone for the entire employment relationship. Ensure the new hire has the tools, information, and support needed to succeed.

Completion indicator: a suitable candidate hired through a fair, structured process, with a signed employment agreement and onboarding plan in place.` },
        { title: 'Establish a mentorship cadence — regular check-ins, skill development, and feedback', done: false,
          description: `**Why does this matter?**

Hiring someone and then leaving them to figure things out on their own is not leadership — it is neglect. Islamic leadership (ri'ayah) requires active care for those under your authority. The Prophet (peace be upon him) said: "Each of you is a shepherd, and each of you is responsible for his flock" (Bukhari and Muslim). A mentorship cadence ensures your employee grows in skill and confidence, which benefits both their career and your business. It also builds a relationship of trust and mutual respect that reflects the Islamic ideal of an employer-employee bond — one rooted in justice, care, and shared purpose.

---

**How do I accomplish this?**

1. Schedule a weekly or biweekly one-on-one meeting with your employee — 30 minutes is sufficient for most roles. This is non-negotiable and should not be the first thing cancelled when you are busy.
2. Use a consistent structure for check-ins:
   - **Progress:** What did you accomplish since our last meeting?
   - **Blockers:** What is preventing you from making progress?
   - **Support:** How can I help you succeed this week?
   - **Development:** What skill or knowledge area do you want to grow in?
3. Provide feedback regularly and constructively. Praise specific behaviours ("Your report was thorough and well-organised") rather than generic compliments ("Good job"). Address issues promptly and privately rather than letting them accumulate.
4. Invest in their skill development — allocate a small budget for courses, books, or conference attendance. The return on investment in human development consistently exceeds the cost.
5. Set quarterly development goals together — what will this person be able to do in 3 months that they cannot do today? Make growth visible and celebrated.
6. Model Islamic work ethics in your own behaviour — punctuality, honesty, keeping commitments, and treating all people with dignity. Your example teaches more than any formal mentorship session.
7. At 6 months and 12 months, conduct a more formal review: assess performance, discuss career aspirations, and adjust compensation if warranted.

Completion indicator: a recurring check-in schedule established, with at least one month of consistent meetings completed and development goals set.` },
        { title: 'Ensure wages are paid promptly and never delayed', done: false,
          description: `**Why does this matter?**

The Prophet (peace be upon him) said: "Give the worker his wages before his sweat dries" (Ibn Majah). This hadith is not merely about speed — it establishes a principle that withholding earned wages is a form of oppression. Allah says: "There are three people whom I will oppose on the Day of Judgement: a man who gave his word and then betrayed it, a man who sold a free person and consumed his price, and a man who hired a worker, benefited from his work, and then did not pay him his wages" (Bukhari). Prompt payment is a non-negotiable Islamic obligation that reflects your integrity as an employer and your fear of Allah in financial dealings.

---

**How do I accomplish this?**

1. Establish a fixed payment schedule from day one — specify in the employment agreement whether wages are paid weekly, biweekly, or monthly, and on which exact date.
2. Set up automated payroll processing so that payments are triggered without manual intervention. Human forgetfulness or busyness should never cause a delay in someone else's livelihood.
3. Maintain a dedicated payroll reserve — keep at least one month's payroll in a separate account so that cash flow fluctuations in your business never affect your ability to pay on time.
4. If cash flow is genuinely constrained and a delay is unavoidable, communicate proactively with the employee before the payment date — not after. Explain the situation honestly and provide a specific date for payment.
5. Never prioritise your own discretionary spending, business expansion, or reinvestment over employee wages. Wages are a debt you owe the moment work is performed — they come before profit.
6. Track payment history meticulously — maintain records of every payment date, amount, and method. This protects both you and the employee in case of any dispute.
7. At year-end, review your payment track record: were any payments late? If so, identify the root cause and fix the system to prevent recurrence.
8. If you pay contractors or freelancers, the same principle applies — their invoices should be settled within the agreed terms, not stretched indefinitely.

Completion indicator: an automated payroll system in place with a dedicated reserve, every payment made on or before the scheduled date, and a clean payment record maintained.` },
      ],
    },
    {
      title: 'Build a business that operates as an act of worship — clear mission, halal model, community benefit',
      priority: 'medium', tags: ['business', 'mission'],
      description: 'The ultimate expression of halal earning is a business that embodies your values: its mission serves a genuine need, its model is entirely halal, and its impact benefits the broader community. This is business as ibadah — where profit and purpose are inseparable.',
      subtasks: [
        { title: 'Write a mission statement that connects your business purpose to a Maqasid objective', done: false,
          description: `**Why does this matter?**

A business without a mission beyond profit is a machine — efficient perhaps, but soulless. Islam teaches that every action can be an act of worship when performed with the right intention and in alignment with divine guidance. The Maqasid al-Shariah (the higher objectives of Islamic law) provide a framework for connecting your business to something greater: preserving faith, life, intellect, family, wealth, the environment, or the ummah. A mission statement grounded in a Maqasid objective transforms your business from a mere income source into a vehicle for fulfilling your covenant with Allah as a khalifah (steward) on earth.

---

**How do I accomplish this?**

1. Reflect on the fundamental need your business serves — not the product or service itself, but the deeper human need it addresses. A tutoring business serves Hifz al-Aql (preservation of intellect). A halal food company serves Hifz al-Nafs (preservation of life). A financial planning service serves Hifz al-Mal (preservation of wealth).
2. Identify which of the Seven Maqasid your business most directly supports. Most businesses will align primarily with one or two.
3. Draft a mission statement that explicitly names the Maqasid connection. Format: "[Business name] exists to [what you do] in order to [Maqasid objective it serves], because [why this matters from an Islamic worldview]."
4. Keep it to 1-3 sentences — brevity forces clarity. If you cannot express your mission concisely, you do not yet understand it well enough.
5. Test the statement against reality: does your daily business operation actually advance this mission, or is it aspirational language disconnected from practice?
6. Share the draft with a trusted advisor, mentor, or scholar for feedback — does the Maqasid connection feel authentic or forced?
7. Finalise the statement and display it prominently — in your workspace, on your website, and in your employee handbook. A mission that is not visible is not guiding anything.

Completion indicator: a written mission statement that authentically connects your business purpose to a specific Maqasid objective, reviewed by at least one trusted person.` },
        { title: 'Audit the entire business model for halal compliance (revenue, marketing, contracts)', done: false,
          description: `**Why does this matter?**

A halal mission statement means nothing if the business model underneath it contains haram elements. Halal compliance is not just about the product — it extends to how revenue is generated, how customers are marketed to, how contracts are structured, and how suppliers are treated. A business can sell a perfectly halal product but use deceptive marketing, riba-based financing, or exploitative supplier contracts that invalidate the Islamic integrity of the entire operation. A comprehensive audit ensures that every layer of the business reflects the values declared in your mission.

---

**How do I accomplish this?**

1. **Revenue audit:** Examine every revenue stream. Is income generated through direct sales, subscriptions, advertising, commissions, or other models? Verify that none involve riba, gharar, or maysir. If you earn through advertising, review what is being advertised.
2. **Marketing audit:** Review all marketing materials, practices, and channels. Islamic marketing ethics prohibit: deception (najash), exaggeration that misleads (ghish), exploiting emotions or insecurities, and targeting vulnerable populations. Ensure your marketing is truthful, transparent, and dignified.
3. **Contract audit:** Review all active contracts — with employees, suppliers, customers, and partners. Check for clarity of terms, absence of riba-based penalties, fairness to both parties, and compliance with the conditions of a valid Islamic contract.
4. **Supply chain audit:** Where do your materials, products, or services originate? Are your suppliers engaged in practices that conflict with Islamic values (e.g., exploitative labour, environmental destruction)?
5. **Financial operations audit:** How are business funds held and managed? Are operating accounts interest-free? Is business financing structured through halal instruments?
6. Document findings in a compliance report with three categories: Compliant, Needs Amendment, and Non-Compliant. Create an action plan for each item in the latter two categories.
7. Schedule this audit annually — business models evolve, new partnerships form, and compliance requires ongoing vigilance.

Completion indicator: a documented halal compliance audit covering revenue, marketing, contracts, supply chain, and financial operations, with an action plan for any non-compliant elements.` },
        { title: 'Define at least one measurable community benefit the business delivers', done: false,
          description: `**Why does this matter?**

The Prophet (peace be upon him) said: "The best of people are those who are most beneficial to people" (al-Tabarani). A business that serves only its owner's financial interests, even if entirely halal, misses the higher calling of khilafah. Defining a measurable community benefit forces you to think beyond profit and articulate how your business actively improves the lives of people around it. "Measurable" is the key word — vague claims of community benefit ("we help people") are not accountability; specific, trackable metrics ("we provide free tutoring to 20 students per quarter") create genuine commitment.

---

**How do I accomplish this?**

1. Identify the community your business is best positioned to serve — this might be your local neighbourhood, the Muslim community, a specific professional group, or an underserved population.
2. Brainstorm 3-5 potential benefits your business could deliver:
   - **Direct service:** Pro bono work, free products for those in need, skills training for unemployed community members.
   - **Employment:** Hiring from within the community, especially youth, recent graduates, or those transitioning from haram employment.
   - **Education:** Sharing expertise through workshops, content, or mentorship programmes.
   - **Economic circulation:** Sourcing from local or Muslim-owned suppliers to keep wealth circulating within the community.
3. Select the one benefit that is most natural to your business operations — it should feel like an extension of what you already do, not a completely separate charity initiative.
4. Define a measurable metric: "We will provide [specific benefit] to [specific number of people] per [time period]."
5. Integrate the benefit into your business operations so it happens systematically, not sporadically. If it depends on you remembering to do it, it will not last.
6. Track and report on the metric quarterly — hold yourself accountable to the commitment as rigorously as you track revenue.
7. Share the results with your team, customers, and community — this is not boasting but modelling Islamic business values for others.

Completion indicator: one community benefit defined with a specific, measurable metric, integrated into business operations, and tracked quarterly.` },
        { title: 'Establish an internal code of conduct rooted in Islamic business ethics', done: false,
          description: `**Why does this matter?**

As your business grows beyond yourself, the values that govern it must be codified — otherwise, they exist only in your head and die the moment you are not present. An internal code of conduct rooted in Islamic business ethics ensures that every team member, contractor, or partner understands the ethical standards the business operates by. It creates a shared language for resolving disputes, making difficult decisions, and holding each other accountable. Without it, each person defaults to their own ethical framework, which may not align with your Islamic vision for the business.

---

**How do I accomplish this?**

1. Study the key principles of Islamic business ethics and select 5-7 that are most relevant to your business:
   - **Sidq (truthfulness):** All communications — internal and external — must be honest and accurate.
   - **Amanah (trustworthiness):** Commitments must be honoured; confidential information must be protected.
   - **Adl (justice):** Fair treatment of all stakeholders — employees, customers, suppliers, and competitors.
   - **Ihsan (excellence):** Strive for the highest quality in every deliverable and interaction.
   - **Shura (consultation):** Major decisions should involve relevant team members and stakeholders.
   - **Wafa (fulfilment of contracts):** Every agreement must be honoured in letter and spirit.
2. For each principle, write 2-3 practical behavioural expectations that make the principle concrete. For example, under Sidq: "We do not exaggerate product capabilities in marketing materials."
3. Include a section on prohibited behaviours: bribery, deception, backbiting about colleagues or competitors, discrimination, and any form of riba or gharar in business dealings.
4. Add a conflict resolution process rooted in Islamic principles: start with private conversation, escalate to mediation (shura), and seek external arbitration if needed.
5. Present the code to your team, discuss it openly, and invite questions and feedback. A code that is imposed without buy-in will be ignored.
6. Have every team member acknowledge the code in writing — not as a legal formality but as a shared commitment.
7. Review and update the code annually, incorporating lessons from ethical challenges encountered during the year.

Completion indicator: a written code of conduct with 5-7 Islamic business principles, practical behavioural expectations, and team acknowledgment.` },
        { title: 'Review quarterly whether the business is living up to its stated mission', done: false,
          description: `**Why does this matter?**

Mission drift is the silent killer of purpose-driven businesses. The pressures of daily operations, revenue targets, and market competition gradually pull a business away from its stated values unless there is a structured, recurring mechanism to check alignment. A quarterly review creates a formal pause where you step back from operations and honestly assess: is this business still doing what it says it does? Are the Maqasid objectives being served, or have they become decorative words on a wall? This review is an act of muhasabah (self-accounting) applied to the business as a whole.

---

**How do I accomplish this?**

1. Schedule a quarterly mission review — a dedicated 60-90 minute session, separate from operational or financial reviews. If you have a team, include key members.
2. Structure the review around four questions:
   - **Mission alignment:** Did our actions this quarter directly advance the Maqasid objective in our mission statement? Cite specific examples.
   - **Community benefit:** Did we meet our measurable community benefit target? If not, why? What will change next quarter?
   - **Ethical compliance:** Were there any incidents where our code of conduct was tested or violated? How were they handled?
   - **Team culture:** Does the team feel that the business operates according to its stated values? Anonymous feedback can reveal gaps that open discussion may miss.
3. Compare this quarter's findings to the previous quarter — is the trend improving, stable, or declining?
4. Identify one specific action item for the coming quarter that will strengthen mission alignment. One focused improvement is more effective than a list of aspirations.
5. Document the review findings in a brief report — this creates an institutional record of your commitment to values-driven operation.
6. If the review reveals significant drift, do not rationalise it. Acknowledge the gap honestly, identify the root cause, and take corrective action before the next quarter.
7. Celebrate genuine wins — when the business lives up to its mission, acknowledge it with gratitude to Allah and recognition of the team's contribution.

Completion indicator: first quarterly mission review completed, with findings documented, one improvement action identified, and the next review date scheduled.` },
      ],
    },
    {
      title: 'Document and share your halal career or business journey to mentor others',
      priority: 'low', tags: ['mentorship', 'dawah'],
      description: 'Your experience navigating halal career and business decisions is valuable to others who are earlier in their journey. Documenting and sharing lessons — through writing, speaking, or one-on-one mentorship — is a form of sadaqah jariyah that multiplies the impact of your own learning.',
      subtasks: [
        { title: 'Outline the key turning points and decisions in your halal earning journey', done: false,
          description: `**Why does this matter?**

Your journey toward halal earning is not just a personal story — it is a case study that others can learn from. Every person who has navigated the tension between financial pressure and Islamic principles has accumulated wisdom that cannot be found in textbooks. The turning points — the moment you decided to leave a haram job, the struggle of finding halal alternatives, the unexpected barakah that followed tawakkul — are the most valuable parts of your experience. Outlining these moments transforms scattered memories into a structured narrative that can genuinely help someone else who is earlier in the same journey.

---

**How do I accomplish this?**

1. Set aside 30-60 minutes for uninterrupted reflection. Begin with du'a asking Allah to help you remember accurately and to make your experience beneficial for others.
2. Create a chronological timeline of your financial life, noting key moments:
   - When did you first become aware of the distinction between halal and haram income?
   - What was the first concrete action you took to change your earning behaviour?
   - What was the hardest decision you faced — leaving a job, exiting an investment, turning down a lucrative but haram opportunity?
   - What unexpected challenges arose during your transition?
   - What unexpected blessings (barakah) did you experience after committing to halal earning?
3. For each turning point, note three elements: the situation, the decision you made, and the outcome.
4. Identify the emotional arc — where did you feel fear, doubt, relief, gratitude? Honest emotional content resonates more deeply than polished advice.
5. Note the people who helped you — scholars, mentors, family members, friends. Acknowledging their role honours them and shows others that this journey is not solitary.
6. Highlight lessons that are transferable — insights that apply broadly rather than only to your specific circumstances.
7. Organise the outline into 5-7 key turning points, each with a brief summary that could be expanded into a full narrative.

Completion indicator: a written outline of 5-7 key turning points in your halal earning journey, each with situation, decision, outcome, and transferable lesson.` },
        { title: 'Choose a format for sharing (blog, podcast, community talk, or mentorship circle)', done: false,
          description: `**Why does this matter?**

The best content in the world is useless if it never reaches the people who need it. Choosing the right format for sharing your halal earning journey is not about your personal preference — it is about matching your strengths and available time with the medium that will reach your intended audience most effectively. A skilled writer might choose a blog; a charismatic speaker might choose a podcast or community talk; someone who values deep personal connection might choose a mentorship circle. The format must be sustainable — a single burst of content that is never followed up provides far less value than consistent, modest output over time.

---

**How do I accomplish this?**

1. Assess your communication strengths honestly:
   - Are you a strong writer who can craft compelling narratives? Consider a blog, newsletter, or social media series.
   - Are you comfortable speaking and enjoy conversation? Consider a podcast, YouTube channel, or community talk.
   - Do you prefer deep, personal interaction? Consider a mentorship circle or small group format.
2. Consider your available time realistically:
   - A blog post might take 2-4 hours to write and edit.
   - A podcast episode might take 1-2 hours to record plus editing time.
   - A community talk might take 2-3 hours to prepare plus the event itself.
   - A mentorship circle might require 1-2 hours per week on an ongoing basis.
3. Identify where your target audience already gathers — are they on social media, at the masjid, in professional associations, or in online forums? Go where they are rather than expecting them to find you.
4. Start with a single format and commit to a minimum of 3 pieces of content before evaluating. One blog post or one talk is not enough to build an audience or assess whether the format works.
5. Consider collaborating with someone who has complementary skills — a writer and a speaker can create both written and audio content from the same material.
6. Set a sustainable cadence: monthly is better than weekly if weekly will burn you out within two months.

Completion indicator: one sharing format selected based on honest assessment of strengths, audience, and available time, with a commitment to produce at least 3 pieces of content.` },
        { title: 'Publish or present your first piece of content', done: false,
          description: `**Why does this matter?**

The gap between planning to share and actually sharing is where most knowledge dies. Publishing your first piece of content — however imperfect — breaks the barrier of inaction and initiates a feedback loop that no amount of preparation can replicate. You will learn more from one published blog post or one delivered talk than from months of planning. The Prophet (peace be upon him) said: "Convey from me, even if it is a single verse" (Bukhari). You do not need to be a scholar or a polished speaker to share your lived experience — authenticity and sincerity are more impactful than perfection.

---

**How do I accomplish this?**

1. Select one turning point from your outline that you feel most comfortable sharing — start with a story you can tell naturally and with genuine emotion.
2. Draft the content in your chosen format:
   - **Blog post:** Write 800-1500 words telling the story, the lesson, and practical advice for someone in a similar situation. Include a clear takeaway.
   - **Podcast/video:** Outline key talking points, record a 15-20 minute episode, and edit minimally. Authenticity matters more than production quality.
   - **Community talk:** Prepare a 15-minute presentation with a clear structure: the problem, your experience, the lesson, and practical steps the audience can take.
   - **Mentorship circle:** Prepare a facilitation guide with discussion questions based on your experience, and schedule the first session.
3. Get feedback from one trusted person before publishing — a spouse, friend, or mentor. Ask specifically: "Is this clear? Is it helpful? Would you want to read/hear more?"
4. Publish or present without waiting for it to be perfect. Set a specific date and honour it.
5. Share the content through your networks — social media, community chat groups, mosque bulletin, or professional connections.
6. After publishing, reflect on the experience: what felt natural? What was harder than expected? What would you do differently next time?
7. Commit to a date for your second piece of content — momentum is built through consistency, not through a single brilliant piece.

Completion indicator: one piece of content published or presented to an audience, with feedback received and a date set for the next piece.` },
        { title: 'Offer direct mentorship to at least one person pursuing halal earning', done: false,
          description: `**Why does this matter?**

Content reaches many but transforms few. Direct mentorship — one person guiding another through the specific challenges of their situation — is the most powerful form of knowledge transfer. The scholarly tradition of Islam is built on silsila (chains of personal transmission), not mass publication. When you mentor someone navigating the transition to halal earning, you provide what no blog post or podcast can: personalised guidance, emotional support during difficult decisions, accountability, and the assurance that someone who has walked this path believes they can do it too. This is sadaqah jariyah — if the person you mentor goes on to earn halal and mentor others, the reward multiplies indefinitely.

---

**How do I accomplish this?**

1. Identify a potential mentee — this might be someone who reached out after your content, a community member you know is struggling with haram income, a younger professional entering the workforce, or someone who has expressed interest in halal business.
2. Have an initial conversation to understand their specific situation: What are their current income sources? What challenges do they face in transitioning to halal earning? What is their knowledge level regarding Islamic finance principles?
3. Establish the mentorship structure: how often will you meet (biweekly or monthly is sustainable), for how long (30-60 minutes), and through what medium (in person, phone, or video call)?
4. Set clear expectations: you are sharing your experience and providing guidance, not making decisions for them. They must do the work — your role is to illuminate the path, not walk it for them.
5. Draw from your own journey: share the relevant turning points, the mistakes you made, the resources that helped, and the principles that guided your decisions.
6. Be honest about what you do not know — if they face a fiqhi question beyond your knowledge, refer them to a qualified scholar rather than guessing.
7. Celebrate their progress and support them through setbacks. The transition to halal earning often involves financial sacrifice, career disruption, and social pressure — your encouragement may be the difference between persistence and giving up.
8. After 3-6 months, evaluate the mentorship: has the person made meaningful progress? Is the relationship still beneficial to both parties? Adjust or conclude as appropriate.

Completion indicator: an active mentorship relationship with at least one person, with regular meetings established and at least one month of consistent engagement completed.` },
      ],
    },
  ],

  
// ── FINANCIAL LITERACY & MANAGEMENT ──
  wealth_financial_core: [
    {
      title: 'Close all interest-bearing (riba) accounts and migrate to Islamic or interest-free alternatives',
      priority: 'urgent', tags: ['riba', 'banking'],
      description: 'Riba is among the most severely prohibited transactions in Islam — Allah and His Messenger declared war against it (Quran 2:279). Audit every bank account, credit card, and financial product you hold, and migrate to Shariah-compliant or at minimum interest-free alternatives as urgently as possible.',
      subtasks: [
        { title: 'List every bank account, credit card, and financial product you currently hold', done: false,
          description: `**Why does this matter?**

You cannot eliminate riba from your financial life if you do not know where it exists. Many people hold accounts they have forgotten about — old savings accounts, store credit cards, employer retirement funds with conventional investments. A complete inventory is the essential first step because hidden accounts continue accumulating sin and financial harm even when ignored. The Prophet (peace be upon him) taught that a believer is not bitten from the same hole twice — awareness prevents repeated harm.

---

**How do I accomplish this?**

1. **Check your records.** Go through bank statements, emails, and postal mail from the last 12 months to identify every financial institution you interact with.

2. **Pull your credit report.** In many countries you can obtain a free credit report that lists all open accounts and credit lines in your name.

3. **List employer-linked products.** Check for workplace retirement accounts (401k, pension), stock purchase plans, or insurance policies with cash value components.

4. **Include informal arrangements.** Note any personal loans given or received, outstanding debts to family or friends, and any installment payment plans.

5. **Create a master spreadsheet.** For each account record: institution name, account type, current balance, interest rate (if any), and monthly fees.

6. **Benchmark:** This step is complete when you can confidently say you have identified every single financial product tied to your name.` },
        { title: 'Identify which ones generate or charge interest (riba)', done: false,
          description: `**Why does this matter?**

Not every financial product involves riba in an obvious way. Some accounts market themselves as "fee-based" but embed interest in their structure. Others may appear halal on the surface but invest underlying deposits in interest-bearing instruments. Carefully classifying each account ensures you do not accidentally retain a riba-tainted product while believing you have cleaned your finances. Allah warns in Surah al-Baqarah (2:275) that those who consume riba will stand like one driven to madness — clarity here is a spiritual necessity.

---

**How do I accomplish this?**

1. **Review each account's terms and conditions.** Look specifically for any mention of interest rates, APR, APY, or finance charges.

2. **Check savings and current accounts.** Even basic bank accounts sometimes pay or charge interest — verify whether yours do.

3. **Examine credit cards.** All conventional credit cards charge interest on carried balances. Even if you pay in full monthly, the underlying contract is riba-based according to most scholars.

4. **Investigate investment accounts.** Check whether your retirement fund or brokerage account holds bonds, money market funds, or other interest-bearing instruments.

5. **Mark each product clearly.** In your master spreadsheet, flag every account as either "riba-involved" or "riba-free" with a brief note explaining why.

6. **Consult if uncertain.** For any product you cannot classify, seek guidance from a knowledgeable Islamic finance professional or scholar.

7. **Benchmark:** Complete when every account in your inventory has a clear riba classification with supporting reasoning.` },
        { title: 'Research Islamic banking alternatives available in your region', done: false,
          description: `**Why does this matter?**

Eliminating riba is only possible if you have viable alternatives ready. Moving away from conventional banking without knowing where to go can leave you unbanked or tempted to return. Islamic banking has expanded significantly worldwide, but the quality and availability of products vary greatly by region. Thorough research now saves you from rushing into a poorly structured "Islamic" product that may not actually be Shariah-compliant in substance.

---

**How do I accomplish this?**

1. **Search for Islamic banks and credit unions.** Look for fully Islamic institutions first, as they are more likely to have genuine Shariah compliance across all products.

2. **Check conventional banks with Islamic windows.** Many major banks offer Islamic product lines — evaluate these, but be more scrutinous about their Shariah board and actual structure.

3. **Evaluate online Islamic banking options.** Digital-first Islamic banks are growing; they may offer better rates and accessibility than local options.

4. **Verify Shariah compliance.** Check whether the institution has an independent Shariah supervisory board and publishes its rulings. A product labeled "Islamic" without scholarly oversight should be treated with caution.

5. **Compare product features.** For each alternative, note: account types offered, fees, ATM access, mobile banking, minimum balances, and customer service quality.

6. **Ask the community.** Reach out to your local Muslim community or online Islamic finance forums for firsthand experiences with specific institutions.

7. **Benchmark:** Complete when you have identified at least one Shariah-compliant alternative for every riba-based product you currently hold.` },
        { title: 'Open replacement accounts with Shariah-compliant institutions', done: false,
          description: `**Why does this matter?**

Having the replacement accounts open and operational before closing your riba-based ones prevents any gap in your financial infrastructure. You need somewhere for your salary to land, your bills to be paid from, and your savings to be held. Opening these accounts is the bridge between your current riba-entangled state and a clean financial life. Every day you delay is another day riba accumulates on your record.

---

**How do I accomplish this?**

1. **Prioritise by urgency.** Open the checking/current account first, since it handles daily transactions. Savings and investment accounts can follow.

2. **Gather required documents.** Most banks require government ID, proof of address, and sometimes proof of income. Prepare these in advance to avoid delays.

3. **Apply in person or online.** Many Islamic banks now offer digital onboarding — complete the application and fund the account with a small initial deposit.

4. **Request all necessary features.** Ensure you have a debit card, online banking access, mobile app, and cheque book if needed.

5. **Test the account.** Make a small transaction, set up online access, and verify that bill pay and transfer features work correctly before migrating your full financial life.

6. **Benchmark:** Complete when you have functioning Shariah-compliant accounts that can replace every riba-based account on your list.` },
        { title: 'Transfer balances and close all riba-based accounts', done: false,
          description: `**Why does this matter?**

This is the decisive action — the moment you sever your ties with riba. Transferring balances and formally closing accounts ensures no residual interest accrues and no dormant account re-activates without your knowledge. The Prophet (peace be upon him) said that the one who consumes riba, the one who pays it, the one who records it, and the two witnesses are all equally cursed (Sahih Muslim). Closing these accounts removes you from every link in that chain.

---

**How do I accomplish this?**

1. **Transfer funds first.** Move all balances from riba-based accounts to your new Shariah-compliant accounts. Verify the transfers have cleared before proceeding.

2. **Redirect all incoming payments.** Update your employer payroll, any government benefits, and recurring income sources to deposit into the new accounts.

3. **Pay off and close credit cards.** Pay the full outstanding balance on each conventional credit card, then call to formally close the account. Request written confirmation of closure.

4. **Close bank accounts in person or in writing.** Some institutions require a signed closure request. Obtain a final statement showing zero balance and account closed status.

5. **Follow up after 30 days.** Check your credit report or contact each institution to confirm the accounts appear as closed and carry no residual balance.

6. **Benchmark:** Complete when every riba-based account is formally closed and you hold written or digital confirmation of each closure.` },
        { title: 'Set up direct deposits and autopayments on the new accounts', done: false,
          description: `**Why does this matter?**

The migration is not truly complete until your entire financial ecosystem — income, bills, subscriptions, and savings — flows through your new halal accounts. Failing to redirect autopayments can result in missed bills, late fees, or even accidental reopening of closed accounts. This final step locks in your riba-free financial infrastructure and makes it your permanent default.

---

**How do I accomplish this?**

1. **List all autopayments and subscriptions.** Review the last three months of your old account statements to catch every recurring charge — utilities, insurance, streaming services, gym memberships, loan payments.

2. **Update each one.** Log into each service provider and update your payment method to your new Shariah-compliant account or debit card.

3. **Set up direct deposit.** Provide your new account details to your employer, clients, or any other sources of regular income.

4. **Automate savings.** Set up a recurring transfer from your checking account to your halal savings account, ideally timed for the day after your salary arrives.

5. **Automate zakah set-asides.** If you set aside zakah monthly, automate that transfer too so it never gets skipped.

6. **Monitor for one full billing cycle.** Watch your new account for 30 days to confirm all payments are processing correctly and no charges are still hitting old accounts.

7. **Benchmark:** Complete when you have gone one full month with all income, bills, and savings flowing exclusively through your Shariah-compliant accounts.` },
      ],
    },
    {
      title: 'List all debts — prioritise eliminating high-interest consumer debt immediately',
      priority: 'urgent', tags: ['debt', 'riba'],
      description: 'Debt — especially interest-bearing debt — is a burden the Prophet (peace be upon him) sought refuge from. Create a complete inventory of all debts, then prioritise paying off the ones carrying the highest interest first, as continuing to pay riba compounds both the financial and spiritual harm.',
      subtasks: [
        { title: 'List every debt with creditor name, balance, interest rate, and minimum payment', done: false,
          description: `**Why does this matter?**

You cannot fight an enemy you cannot see. Many people underestimate their total debt because they avoid looking at the full picture. The Prophet (peace be upon him) used to seek refuge from being overwhelmed by debt (Sahih al-Bukhari), and the first step to escaping that burden is confronting the reality with complete honesty. A comprehensive debt inventory reveals the true scope of what you owe and forms the foundation for a strategic payoff plan.

---

**How do I accomplish this?**

1. **Gather all loan and credit documents.** Pull up statements for every mortgage, car loan, student loan, personal loan, credit card, medical bill, and buy-now-pay-later arrangement.

2. **Check your credit report.** This catches debts you may have forgotten — old accounts, collections, or co-signed obligations.

3. **Include informal debts.** Money owed to family members, friends, or community members is a debt in Islam even without a written contract. The Prophet (peace be upon him) emphasised that the soul of the believer is held hostage by their debt until it is paid off (Sunan al-Tirmidhi).

4. **Record details for each debt.** Create a table with columns: creditor name, original amount, current balance, interest rate (APR), minimum monthly payment, and due date.

5. **Calculate your total debt.** Sum all balances to see the full number. This may be uncomfortable, but it is essential.

6. **Benchmark:** Complete when you have a single document listing every debt you owe with all relevant details, and the total matches what your credit report and records confirm.` },
        { title: 'Sort debts by interest rate (highest first) to identify the most urgent', done: false,
          description: `**Why does this matter?**

From both a financial and Islamic perspective, the debts carrying the highest interest rates are the most harmful. Every month they remain unpaid, they generate more riba — compounding both the financial cost and the spiritual weight. Sorting by interest rate ensures your limited extra payment capacity is directed where it eliminates the most riba in the least time. This is not merely a financial optimisation; it is a prioritisation of spiritual harm reduction.

---

**How do I accomplish this?**

1. **Sort your debt inventory by interest rate.** Place the highest-rate debt at the top and the lowest (or zero-interest) at the bottom.

2. **Identify the worst offenders.** Credit cards often carry 18-30% APR — these are almost certainly your most urgent targets.

3. **Flag riba-bearing vs. riba-free debts.** A qard hasan (interest-free loan) from a family member is still a debt obligation, but it does not compound — it can be lower priority in payoff order.

4. **Note minimum payments for all debts.** You must continue paying minimums on every debt to avoid default, but all extra capacity goes to the top of the list.

5. **Calculate the monthly riba cost of each debt.** Multiply balance by monthly interest rate to see exactly how much riba you are generating each month — this creates urgency and clarity.

6. **Benchmark:** Complete when your debts are ranked from highest to lowest interest rate and you can clearly see which ones are generating the most riba monthly.` },
        { title: 'Allocate maximum extra payments toward the highest-interest debt', done: false,
          description: `**Why does this matter?**

The avalanche method — paying minimums on all debts while directing every extra dollar to the highest-interest one — is the mathematically optimal strategy for minimising total interest paid. In an Islamic context, this means minimising total riba generated before you can eliminate it entirely. Every extra payment you make is not just a financial decision but an act of purification, actively reducing the riba flowing through your accounts.

---

**How do I accomplish this?**

1. **Calculate your total available payment capacity.** Take your monthly income, subtract essential expenses and savings minimums — what remains is your debt repayment budget.

2. **Pay minimum amounts on all debts.** This keeps every account current and avoids penalties or default.

3. **Direct all remaining funds to the highest-interest debt.** Even an extra 50 or 100 per month can dramatically accelerate payoff and reduce total riba.

4. **Find additional payment sources.** Consider selling unused items, taking on halal side work, or temporarily reducing discretionary spending to increase your debt attack fund.

5. **Make payments as soon as funds are available.** Interest accrues daily on most debts — paying mid-month rather than waiting for the due date reduces total interest.

6. **When the top debt is paid off, roll its entire payment into the next one.** This creates a snowball of increasing payment power as each debt falls.

7. **Benchmark:** Complete when you have a specific monthly payment plan that allocates maximum extra funds to your highest-interest debt while maintaining minimums on all others.` },
        { title: 'Contact creditors to negotiate rate reductions or early payoff terms', done: false,
          description: `**Why does this matter?**

Many people do not realise that interest rates and payoff terms are often negotiable. A single phone call can sometimes reduce your rate by several percentage points or secure a lump-sum settlement for less than the full balance. From an Islamic perspective, any reduction in the riba rate — even if you cannot eliminate it immediately — reduces the ongoing spiritual and financial harm. The goal is to exit riba as quickly as possible, and negotiation accelerates that exit.

---

**How do I accomplish this?**

1. **Call each creditor directly.** Ask to speak with the retention or hardship department, as they have more authority to offer concessions than frontline agents.

2. **Request a rate reduction.** State that you are committed to paying off your debt and ask if they can lower your interest rate. Mention competing offers if you have any.

3. **Ask about early payoff settlements.** Some creditors will accept a lump-sum payment for less than the full balance, especially on older debts. Ask what they would accept to consider the account paid in full.

4. **Explore balance transfer options.** If a Shariah-compliant institution offers zero-interest balance transfer promotions, this can be a tool to reduce riba while you pay down principal.

5. **Get everything in writing.** Any agreed-upon rate reduction or settlement terms must be documented before you make payment.

6. **Be persistent but respectful.** If the first agent says no, call back another day or escalate to a supervisor. Different agents have different authority levels.

7. **Benchmark:** Complete when you have contacted every creditor on your list and documented the outcome of each negotiation — whether successful or not.` },
        { title: 'Set a target date for becoming completely debt-free', done: false,
          description: `**Why does this matter?**

A goal without a deadline is just a wish. Setting a specific target date for becoming debt-free transforms your payoff plan from an indefinite burden into a finite mission with a visible finish line. The Prophet (peace be upon him) taught us to tie our camel and then place our trust in Allah — setting a date is tying the camel, while trusting that Allah will help you reach it is tawakkul. This date becomes your north star, guiding every financial decision.

---

**How do I accomplish this?**

1. **Use your debt inventory and payment plan.** Based on your current extra payment capacity and the balances remaining, calculate how many months it will take to pay off each debt sequentially.

2. **Add up the total timeline.** Starting from the highest-interest debt and rolling payments forward, determine the month and year you will make your final debt payment.

3. **Write the date down.** Place it somewhere visible — on your wall, in your phone, on your budget spreadsheet. Make it concrete and real.

4. **Work backwards to set milestones.** If your target is 36 months away, set quarterly checkpoints: "By Month 9, credit card paid off. By Month 18, car loan paid off."

5. **Build in accountability.** Share your goal with a trusted friend, spouse, or mentor who can check in on your progress and encourage you during difficult months.

6. **Revisit and adjust quarterly.** Life changes — income may increase or decrease, unexpected expenses may arise. Adjust the date if needed, but never abandon the goal.

7. **Benchmark:** Complete when you have a specific, realistic target date for being completely debt-free, with interim milestones written down and shared with an accountability partner.` },
      ],
    },
    {
      title: 'Create a written monthly budget — income, fixed expenses, zakah allocation, and savings',
      priority: 'high', tags: ['budgeting', 'planning'],
      description: 'A written budget transforms vague financial intentions into a concrete plan. By explicitly allocating for zakah, debt repayment, essential expenses, and savings before discretionary spending, you ensure that your obligations to Allah and your family are met first.',
      subtasks: [
        { title: 'Calculate your total net monthly income from all halal sources', done: false,
          description: `**Why does this matter?**

A budget built on inaccurate income figures is doomed to fail. You need to know exactly what comes in each month — after taxes, deductions, and any irregular income is averaged — to create a plan that actually works. This step also forces you to confront whether all your income sources are genuinely halal. The Prophet (peace be upon him) said that every body nourished by haram will be more deserving of the Fire (Sunan al-Tirmidhi) — your budget must start with clean earnings.

---

**How do I accomplish this?**

1. **Start with your primary employment income.** Use your net (after-tax) pay, not gross. Check your most recent payslip for the exact figure.

2. **Add any secondary halal income.** Freelance work, rental income, business profits, side projects — include everything, but verify each source is halal.

3. **Average irregular income.** If any source varies month to month, take the average of the last 6-12 months to get a reliable baseline. Budget based on the conservative average, not the best month.

4. **Exclude one-time windfalls.** Gifts, tax refunds, and bonuses should not be part of your base monthly budget — treat them as separate allocation decisions.

5. **Audit for haram income.** If any income involves riba, gambling, or prohibited industries, flag it and develop a plan to replace it with a halal alternative.

6. **Benchmark:** Complete when you have a single, accurate net monthly income figure that reflects only halal sources and accounts for variability in irregular income.` },
        { title: 'List all fixed monthly expenses (rent, utilities, insurance, subscriptions)', done: false,
          description: `**Why does this matter?**

Fixed expenses are your financial commitments — they come due every month regardless of how much you earn or spend otherwise. Knowing this number tells you your absolute floor: the minimum you must earn to keep your household running. Many people are surprised to discover how much of their income is consumed by fixed costs, especially subscriptions they have forgotten about. Islam teaches moderation (wasatiyyah) in spending, and this inventory reveals where you stand.

---

**How do I accomplish this?**

1. **List housing costs.** Rent or mortgage payment, property tax, homeowner's or renter's insurance, HOA fees.

2. **List utilities.** Electricity, gas, water, internet, phone — use averages if they fluctuate seasonally.

3. **List insurance premiums.** Health, auto, life, and any other insurance you carry.

4. **List debt payments.** Minimum payments on all debts (these are fixed obligations until the debt is paid off).

5. **List subscriptions.** Go through your bank and credit card statements for the last three months to catch every recurring charge — streaming services, software, gym memberships, app subscriptions, meal kits.

6. **Cancel what you do not use.** If you find subscriptions you forgot about or rarely use, cancel them immediately. This is low-hanging fruit for freeing up budget capacity.

7. **Total your fixed expenses.** Sum everything to see what portion of your income is already spoken for before you spend a single discretionary dollar.

8. **Benchmark:** Complete when you have an accurate total of all fixed monthly expenses and have cancelled any unnecessary subscriptions.` },
        { title: 'Add zakah allocation (set aside monthly even if paid annually)', done: false,
          description: `**Why does this matter?**

Zakah is not optional charity — it is a pillar of Islam, a right that the poor hold over your wealth. By setting aside your zakah obligation monthly rather than scrambling to calculate and pay it once a year, you ensure the funds are always available and the obligation never catches you off guard. This practice also purifies your wealth continuously throughout the year, as the very word "zakah" means purification and growth (Quran 9:103).

---

**How do I accomplish this?**

1. **Estimate your annual zakah obligation.** If you do not yet know your exact nisab status, estimate conservatively. Zakah is 2.5% of your net wealth above the nisab threshold held for one lunar year.

2. **Divide by 12.** Take your estimated annual zakah and divide it into monthly set-asides. For example, if your estimated annual zakah is 2,400, set aside 200 per month.

3. **Create a dedicated zakah holding account or envelope.** Keep these funds separate from your regular savings so they are not accidentally spent.

4. **Treat this allocation as non-negotiable.** In your budget, zakah should come before discretionary spending — it is a debt owed to the ummah, not a donation you make when convenient.

5. **Reconcile at your zakah anniversary date.** When your annual zakah calculation date arrives, compare what you set aside against your actual obligation. Top up or redistribute any excess.

6. **Benchmark:** Complete when your monthly budget includes a fixed zakah set-aside line item and you have a designated holding account for these funds.` },
        { title: 'Define a savings target (minimum 10% of income)', done: false,
          description: `**Why does this matter?**

Saving is not merely a financial strategy — it is an expression of responsible stewardship (amanah) over the wealth Allah has entrusted to you. Without a defined savings target, spending naturally expands to consume all available income (Parkinson's Law). Setting a minimum of 10% creates a structural discipline that builds your emergency fund, investment capital, and long-term security. The Prophet (peace be upon him) advised moderation and planning, not living at the edge of one's means.

---

**How do I accomplish this?**

1. **Start with 10% as a floor.** Calculate 10% of your net monthly income. This is your minimum savings target — aim higher if your fixed expenses allow it.

2. **Prioritise by goal.** Direct savings toward your most urgent goal first: emergency fund, then debt payoff acceleration, then investment, then large purchases.

3. **Automate the transfer.** Set up an automatic transfer that moves your savings amount out of your checking account the day after payday. What you do not see, you do not spend.

4. **Treat savings as a bill.** In your budget, savings is not what is left over — it is a fixed expense that gets paid before discretionary spending.

5. **Increase incrementally.** Each time your income rises, increase your savings percentage by at least half the raise. If you get a 6% raise, save at least 3% more.

6. **Benchmark:** Complete when you have a specific savings percentage (at least 10%) written into your budget as a non-negotiable line item with automatic transfers configured.` },
        { title: 'Allocate remaining funds to variable expenses and discretionary spending', done: false,
          description: `**Why does this matter?**

After fulfilling your obligations — fixed expenses, zakah, savings, and debt payments — what remains is your true discretionary budget. Allocating this intentionally prevents the common trap of overspending on non-essentials and then being unable to meet obligations. Islam teaches that extravagance (israf) is prohibited (Quran 7:31), while measured enjoyment of Allah's blessings is encouraged. This step helps you find the balance between enjoying your wealth and protecting it.

---

**How do I accomplish this?**

1. **Calculate your discretionary remainder.** Total income minus fixed expenses, zakah, savings, and debt payments equals what you have to work with.

2. **Categorise variable expenses.** Groceries, fuel, clothing, dining out, entertainment, gifts, personal care — create categories that match your actual spending patterns.

3. **Assign realistic amounts.** Review the last three months of actual spending in each category to set amounts that are achievable, not aspirational.

4. **Build in a personal allowance.** Give yourself a guilt-free spending amount for small pleasures. Overly restrictive budgets fail because they are unsustainable.

5. **Include a buffer for the unexpected.** Allocate 3-5% of your income to a "miscellaneous" category for minor unplanned expenses that do not warrant touching your emergency fund.

6. **Benchmark:** Complete when every dollar of your income is assigned to a specific category, with the total allocations exactly equaling your total net income — a true zero-based budget.` },
        { title: 'Write it down or enter it into a budgeting tool — make it tangible', done: false,
          description: `**Why does this matter?**

A budget that exists only in your head is not a budget — it is a vague intention. Writing it down or entering it into a tool transforms it into a binding commitment you can track, review, and adjust. Research consistently shows that people who write down their financial plans are dramatically more likely to follow through. In Islamic tradition, Allah commands the writing down of debts and transactions (Quran 2:282) — your budget is a contract with yourself about how you will steward your wealth.

---

**How do I accomplish this?**

1. **Choose your format.** Options include a simple spreadsheet, a dedicated budgeting app (YNAB, EveryDollar, or a halal-focused alternative), a notebook, or even a whiteboard you see daily.

2. **Enter all categories and amounts.** Transfer everything from the previous steps: income, fixed expenses, zakah, savings, debt payments, and discretionary allocations.

3. **Verify it balances.** Total income minus total allocated expenses should equal zero. If there is a surplus, assign it to savings or debt payoff. If there is a deficit, adjust discretionary categories until it balances.

4. **Set up tracking.** Whether digital or manual, establish a system for recording actual spending against your budget throughout the month.

5. **Schedule a weekly check-in.** Set a recurring 15-minute appointment with yourself (or your spouse) to review spending against the budget mid-month and course-correct if needed.

6. **Review and revise monthly.** At the end of each month, compare actual vs. planned, identify patterns, and adjust next month's budget accordingly.

7. **Benchmark:** Complete when your budget is documented in a tangible format, you have a tracking method in place, and you have scheduled your first weekly check-in.` },
      ],
    },
    {
      title: 'Learn the basics of Islamic finance — riba prohibition, murabaha, musharakah, and ijara',
      priority: 'high', tags: ['islamic-finance', 'study'],
      description: 'Understanding Islamic financial instruments empowers you to make informed decisions about banking, investing, and purchasing. Learn how murabaha (cost-plus sale), musharakah (partnership), and ijara (leasing) provide halal alternatives to conventional interest-based products.',
      subtasks: [
        { title: 'Study the core prohibition of riba and why Islam forbids it', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (2:275)
**Arabic:** 
**Translation:** Those who take ribā (usury or interest) will not stand but as stands the one whom the demon has driven crazy by his touch. That is because they have said: “Sale is but like ribā.’’, while Allah has permitted sale, and prohibited ribā. So, whoever receives an advice from his Lord and desists (from indulging in ribā), then what has passed is allowed for him, and his matter is up to Allah. As for the ones who revert back, those are the people of Fire. There they will remain forever.

### Ayah (3:104)
**Arabic:** 
**Translation:** Let there arise out of you a group of people inviting to all that is good (Islâm), enjoining Al-Ma‘rûf (i.e. Islâmic Monotheism and all that Islâm orders one to do) and forbidding Al-Munkar (polytheism and disbelief and all that Islâm has forbidden). And it is they who are the successful.

**II. Sources from the Hadith**


### Sahih Bukhari 4513
Narrated Nafi\`:During the affliction of Ibn Az-Zubair, two men came to Ibn \`Umar and said, "The people are lost, and you are the son of \`Umar, and the companion of the Prophet, so what forbids you from coming out?" He said, "What forbids me is that Allah has prohibited the shedding of my brother's blood." They both said, "Didn't Allah say, 'And fight them until there is no more affliction?" He said "We fought until there was no more affliction and the worship is for Allah (Alone while you want to fight until there is affliction and until the worship becomes for other than Allah." Narrated Nafi\` (through another group of sub-narrators): A man came to Ibn \`Umar and said, "O Abu \`Abdur Rahman! What made you perform Hajj in one year and Umra in another year and leave the Jihad for Allah' Cause though you know how much Allah recommends it?" Ibn \`Umar replied, "O son of my brother! Islam is founded on five principles, i.e. believe in Allah and His Apostle, the five compulsory prayers, the fasting of the month of Ramadan, the payment of Zakat, and the Hajj to the House (of Allah)." The man said, "O Abu \`Abdur Rahman! Won't you listen to what Allah has mentioned in His Book: 'If two groups of believers fight each other, then make peace between them, but if one of them transgresses beyond bounds against the other, then you all fight against the one that transgresses. (49.9) and:--"And fight them till there is no more affliction (i.e. no more worshiping of others along with Allah)." Ibn \`Umar said, "We did it, during the lifetime of Allah's Messenger (ﷺ) when Islam had only a few followers. A man would be put to trial because of his religion; he would either be killed or tortured. But when the Muslims increased, there was no more afflictions or oppressions." The man said, "What is your opinion about \`Uthman and \`Ali?" Ibn \`Umar said, "As for \`Uthman, it seems that Allah has forgiven him, but you people dislike that he should be forgiven. And as for \`Ali, he is the cousin of Allah's Messenger (ﷺ) and his son-in-law." Then he pointed with his hand and said, "That is his house which you see
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

Understanding why riba is prohibited — not just that it is prohibited — transforms your compliance from reluctant avoidance into principled conviction. Riba creates wealth without productive effort, shifts risk unfairly onto borrowers, and widens inequality — outcomes fundamentally opposed to Islamic economic justice. Allah devoted some of the strongest language in the entire Quran to condemning riba (2:275-279), and the Prophet (peace be upon him) counted it among the seven destructive sins. Deep understanding of the reasoning makes you a more informed consumer and protector of your wealth.

---

**How do I accomplish this?**

1. **Read the primary Quranic passages.** Study Surah al-Baqarah 2:275-281 and Surah Aal-Imran 3:130 with a reliable tafsir (exegesis) to understand the context and severity of the prohibition.

2. **Study the relevant ahadith.** The Prophet (peace be upon him) cursed the one who consumes riba, the one who pays it, the one who records it, and the two witnesses (Sahih Muslim). Understand the breadth of who is implicated.

3. **Learn the economic rationale.** Study how riba creates systemic risk, encourages debt-driven consumption, and separates returns from productive activity — the very dynamics that cause financial crises.

4. **Understand what constitutes riba.** Learn the distinction between riba al-nasiah (interest on loans) and riba al-fadl (unequal exchange of same-type commodities), as both are prohibited.

5. **Read an introductory text.** Books such as "Introduction to Islamic Finance" by Mufti Taqi Usmani provide accessible scholarly treatment of the topic.

6. **Benchmark:** Complete when you can explain to someone else, in your own words, both the theological and economic reasons why Islam prohibits riba.` },
        { title: 'Learn how murabaha (cost-plus financing) works and when it is appropriate', done: false,
          description: `**Why does this matter?**

Murabaha is the most widely used Islamic financing structure in the world, powering everything from home purchases to business equipment acquisition. Understanding how it works — the bank purchases an asset and sells it to you at a disclosed markup payable in instalments — allows you to evaluate whether a specific murabaha product is genuinely Shariah-compliant or merely a relabelled interest loan. This knowledge protects you from predatory "Islamic" products that use the terminology without the substance.

---

**How do I accomplish this?**

1. **Learn the basic structure.** In a murabaha transaction, the financier buys the asset, takes ownership (and risk, however briefly), then sells it to you at cost plus an agreed-upon profit margin. The total price is fixed and paid in instalments.

2. **Understand the key conditions.** The asset must be real and identifiable, the seller must own it before selling, the cost and markup must both be disclosed, and the price once agreed cannot increase for late payment.

3. **Compare with conventional loans.** In a conventional loan, the bank lends money and charges interest. In murabaha, the bank engages in a genuine sale transaction — the distinction is critical, though in practice some implementations blur this line.

4. **Learn about common criticisms.** Some scholars and economists argue that certain murabaha implementations are too similar to conventional lending. Understanding these critiques makes you a more discerning consumer.

5. **Identify when murabaha is appropriate.** It works well for purchasing specific assets (cars, equipment, property) but is not suitable for general-purpose cash financing.

6. **Benchmark:** Complete when you can diagram a murabaha transaction, explain its conditions of validity, and identify at least one common way it can be improperly structured.` },
        { title: 'Understand musharakah (equity partnership) and its profit/loss sharing model', done: false,
          description: `**Why does this matter?**

Musharakah represents the ideal of Islamic finance — genuine risk-sharing between capital providers. Unlike debt-based structures where the borrower bears all the risk, musharakah distributes both profits and losses according to agreed ratios. This is the model the Prophet (peace be upon him) and his companions practised in their commercial dealings. Understanding musharakah opens your eyes to what Islamic finance aspires to be at its best, and helps you evaluate partnership-based investment opportunities.

---

**How do I accomplish this?**

1. **Learn the basic concept.** Musharakah (from "sharikah" — partnership) means two or more parties contribute capital to a joint venture and share profits according to pre-agreed ratios, while losses are shared in proportion to capital contributed.

2. **Understand diminishing musharakah.** This modern adaptation is widely used for home financing: you and the bank jointly purchase a property, and you gradually buy out the bank's share through additional payments until you own it outright.

3. **Study the profit/loss distribution rules.** Profit ratios can be negotiated freely, but loss must be borne in proportion to capital contribution — a partner cannot be shielded from loss on their invested capital.

4. **Compare with conventional equity.** Musharakah shares similarities with conventional equity partnerships but adds Shariah requirements: the business must be halal, and the partnership terms must be transparent.

5. **Explore real-world applications.** Look at how Islamic banks use musharakah for home financing, business funding, and project finance in your region.

6. **Benchmark:** Complete when you can explain the difference between musharakah and murabaha, describe how diminishing musharakah works for home ownership, and articulate the profit/loss sharing principles.` },
        { title: 'Learn the structure of ijara (Islamic leasing) and its common applications', done: false,
          sources: `**I. Sources from the Hadith**


### Sahih Bukhari 3654
Narrated Abu Sa\`id Al-Khudri:Allah's Messenger (ﷺ) addressed the people saying, "Allah has given option to a slave to choose this world or what is with Him. The slave has chosen what is with Allah." Abu Bakr wept, and we were astonished at his weeping caused by what the Prophet (ﷺ) mentioned as to a Slave ( of Allah) who had been offered a choice, (we learned later on) that Allah's Messenger (ﷺ) himself was the person who was given the choice, and that Abu Bakr knew best of all of us. Allah's Messenger (ﷺ) added, "The person who has favored me most of all both with his company and wealth, is Abu Bakr. If I were to take a Khalil other than my Lord, I would have taken Abu Bakr as such, but (what relates us) is the Islamic brotherhood and friendliness. All the gates of the Mosque should be closed except the gate of Abu Bakr
*(Grade: Sahih)*

### Sahih Bukhari 1643
Narrated \`Urwa:I asked \`Aisha : "How do you interpret the statement of Allah,. : Verily! (the mountains) As-Safa and Al-Marwa are among the symbols of Allah, and whoever performs the Hajj to the Ka\`ba or performs \`Umra, it is not harmful for him to perform Tawaf between them (Safa and Marwa.) (2.158). By Allah! (it is evident from this revelation) there is no harm if one does not perform Tawaf between Safa and Marwa." \`Aisha said, "O, my nephew! Your interpretation is not true. Had this interpretation of yours been correct, the statement of Allah should have been, 'It is not harmful for him if he does not perform Tawaf between them.' But in fact, this divine inspiration was revealed concerning the Ansar who used to assume Ihram for worshipping an idol called "Manat" which they used to worship at a place called Al-Mushallal before they embraced Islam, and whoever assumed Ihram (for the idol), would consider it not right to perform Tawaf between Safa and Marwa. When they embraced Islam, they asked Allah's Messenger (ﷺ) regarding it, saying, "O Allah's Apostle! We used to refrain from Tawaf between Safa and Marwa." So Allah revealed: 'Verily; (the mountains) As-Safa and Al-Marwa are among the symbols of Allah.' " Aisha added, "Surely, Allah's Apostle set the tradition of Tawaf between Safa and Marwa, so nobody is allowed to omit the Tawaf between them." Later on I (\`Urwa) told Abu Bakr bin \`Abdur-Rahman (of \`Aisha's narration) and he said, 'I have not heard of such information, but I heard learned men saying that all the people, except those whom \`Aisha mentioned and who used to assume Ihram for the sake of Manat, used to perform Tawaf between Safa and Marwa. When Allah referred to the Tawaf of the Ka\`ba and did not mention Safa and Marwa in the Qur'an, the people asked, 'O Allah's Messenger (ﷺ)! We used to perform Tawaf between Safa and Marwa and Allah has revealed (the verses concerning) Tawaf of the Ka\`ba and has not mentioned Safa and Marwa. Is there any harm if we perform Tawaf between Safa and Marwa?' So Allah revealed: "Verily As-Safa and Al- Marwa are among the symbols of Allah." Abu Bakr said, "It seems that this verse was revealed concerning the two groups, those who used to refrain from Tawaf between Safa and Marwa in the Pre- Islamic Period of ignorance and those who used to perform the Tawaf then, and after embracing Islam they refrained from the Tawaf between them as Allah had enjoined Tawaf of the Ka\`ba and did not mention Tawaf (of Safa and Marwa) till later after mentioning the Tawaf of the Ka\`ba
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

Ijara (Islamic leasing) is a critical tool for accessing expensive assets — vehicles, equipment, property — without conventional interest-based financing. In an ijara arrangement, the financier retains ownership of the asset and leases it to you for agreed payments. Understanding this structure helps you evaluate Islamic auto financing, equipment leasing, and some home financing products. It also illustrates a core Islamic principle: returns must be tied to ownership and the risk that comes with it.

---

**How do I accomplish this?**

1. **Learn the basic structure.** The financier purchases the asset and retains ownership, then leases it to you for a fixed rental payment over an agreed term. The lessor bears the risks of ownership (major maintenance, insurance, obsolescence).

2. **Understand ijara wa iqtina (lease-to-own).** In this common variation, you agree to purchase the asset at the end of the lease term — often for a nominal amount — combining lease and eventual ownership transfer.

3. **Know the key conditions.** The asset must exist and be identifiable, the rental amount and lease term must be specified upfront, and the lessor must bear the responsibility for major repairs and structural defects (since they own the asset).

4. **Compare with conventional leasing.** The structures are similar in form, but Islamic ijara requires the lessor to genuinely bear ownership risk — if the asset is destroyed, the lessor absorbs the loss, not the lessee.

5. **Identify common applications.** Car financing, equipment leasing, and some property financing schemes use ijara structures. Check what is available from Islamic financial institutions in your area.

6. **Benchmark:** Complete when you can explain how ijara differs from a conventional lease, describe the ijara wa iqtina variation, and identify which financial needs in your life could potentially be met through ijara.` },
        { title: 'Compare at least two Islamic financial products available in your market', done: false,
          description: `**Why does this matter?**

Theory without application is incomplete. Comparing real Islamic financial products in your market transforms your academic knowledge into practical decision-making capability. This exercise also reveals the gap between ideal Islamic finance theory and actual product offerings — some products are robustly structured, while others are arguably conventional products with Islamic labelling. Developing your ability to evaluate real products protects your wealth and your deen.

---

**How do I accomplish this?**

1. **Select a financial need.** Choose something relevant to your current situation: a savings account, home financing, auto financing, or an investment product.

2. **Identify at least two Islamic products.** Search Islamic banks, conventional banks with Islamic windows, and fintech platforms offering Shariah-compliant solutions for your chosen need.

3. **Compare the structures.** For each product, determine: What Islamic contract is it based on (murabaha, musharakah, ijara, wakalah)? Who bears the major risks? How is the "profit rate" determined?

4. **Compare the costs.** Calculate the total cost of each product over its full term. Include all fees, not just the headline rate.

5. **Check the Shariah governance.** Does the institution have an independent Shariah board? Are their rulings published? Have any credible scholars raised concerns about the product?

6. **Make a recommendation to yourself.** Based on your comparison, which product would you choose and why? Document your reasoning.

7. **Benchmark:** Complete when you have a written comparison of at least two real Islamic financial products, including structure analysis, cost comparison, and your assessment of which is more genuinely Shariah-compliant.` },
      ],
    },
    {
      title: 'Build a 1-month emergency cash buffer as a starting safety net',
      priority: 'high', tags: ['emergency-fund', 'savings'],
      description: 'Having at least one month of essential expenses set aside protects you from being forced into haram borrowing during an unexpected hardship. This small buffer is the first step toward financial resilience and tawakkul grounded in practical preparation.',
      subtasks: [
        { title: 'Calculate your total essential monthly expenses (rent, food, utilities, transport)', done: false,
          description: `**Why does this matter?**

You cannot build a meaningful emergency fund without knowing precisely what "one month of survival" costs. Guessing leads to either under-saving (leaving you vulnerable) or over-estimating (making the goal feel unattainable and discouraging action). Essential expenses are the non-negotiable costs your household must cover to maintain basic dignity and function — shelter, food, utilities, and transport. Knowing this number transforms an abstract goal into a concrete, achievable target. The Prophet (peace be upon him) praised practical preparation alongside tawakkul.

---

**How do I accomplish this?**

1. **List your fixed essential costs.** Start with rent or mortgage, then add utilities (electricity, gas, water, internet), basic insurance premiums, and any essential debt minimum payments.

2. **Calculate food costs.** Review the last three months of grocery spending and average it. Exclude dining out and luxury items — this is your survival-level food budget.

3. **Add transport costs.** Include fuel, public transit passes, car insurance, and basic maintenance. If you could temporarily reduce transport (work from home, carpool), note both the current and minimum figures.

4. **Include medical essentials.** Any recurring prescriptions, insurance co-pays, or mandatory health costs that cannot be deferred.

5. **Exclude discretionary spending.** Entertainment, subscriptions, dining out, clothing, and gifts are not essential for a one-month emergency calculation.

6. **Total the figure.** This is your emergency buffer target — the minimum amount needed to keep your household running for one month with no income.

7. **Benchmark:** Complete when you have a specific dollar (or local currency) figure for one month of essential expenses, broken down by category and verified against recent actual spending.` },
        { title: 'Open a separate halal savings account for your emergency fund', done: false,
          description: `**Why does this matter?**

Keeping your emergency fund in the same account as your daily spending is a recipe for accidental depletion. Human psychology makes it easy to dip into accessible funds for non-emergencies. A separate account creates a psychological and practical barrier that protects the fund. Equally important, the account must be halal — free from interest (riba). If your emergency fund earns riba, you are building your safety net on a foundation of sin, which contradicts the very purpose of financial resilience rooted in tawakkul and obedience to Allah.

---

**How do I accomplish this?**

1. **Research halal savings options.** Look for Islamic banks, credit unions, or fintech platforms that offer Shariah-compliant savings accounts in your region.

2. **Prioritise liquidity.** Your emergency fund must be accessible within 1-2 business days. Avoid products with lock-in periods, withdrawal penalties, or complex redemption processes.

3. **Compare features.** Evaluate account fees, minimum balance requirements, mobile banking access, and whether the institution offers a profit-sharing (mudarabah) or fee-based (wakalah) structure.

4. **Open the account.** Complete the application with required documents (ID, proof of address). Fund it with even a small initial deposit to activate it.

5. **Label it clearly.** Name the account "Emergency Fund" or "Tawakkul Buffer" in your banking app so its purpose is unmistakable every time you see it.

6. **Do not link a debit card.** If possible, avoid attaching a debit card or easy-access payment method to this account — friction protects the fund.

7. **Benchmark:** Complete when you have a functioning, separate, halal savings account dedicated exclusively to your emergency fund, with online access configured.` },
        { title: 'Set up automatic transfers to build the buffer over 1-3 months', done: false,
          description: `**Why does this matter?**

Relying on willpower to manually transfer money into savings each month is unreliable — life gets busy, unexpected expenses appear, and the transfer gets postponed indefinitely. Automation removes the decision from the equation entirely. By setting up a recurring transfer timed to your payday, the money moves before you have a chance to spend it. This "pay yourself first" principle is one of the most effective personal finance habits, and it aligns with the Islamic emphasis on disciplined stewardship (amanah) of wealth rather than leaving provision to chance.

---

**How do I accomplish this?**

1. **Divide your target by your timeline.** If your one-month essential expenses are 3,000 and you want to build the buffer in 3 months, you need to transfer 1,000 per month. Adjust the timeline if the monthly amount is too large for your current budget.

2. **Set the transfer date.** Schedule it for the day after your salary or primary income arrives. If you are paid bi-weekly, split the transfer into two smaller amounts aligned with each paycheck.

3. **Use your bank's auto-transfer feature.** Log into your banking app and create a recurring transfer from your checking account to your emergency fund account.

4. **Start immediately.** Do not wait for the "perfect" month — there will always be competing expenses. Even if your first transfer is smaller than planned, beginning builds momentum.

5. **Protect the transfer.** Treat this automatic transfer as a non-negotiable bill. Adjust discretionary spending to accommodate it, not the other way around.

6. **Track progress visually.** Create a simple tracker (paper or digital) showing your target and current balance. Watching the fund grow reinforces the habit.

7. **Benchmark:** Complete when you have an active automatic transfer schedule that will fully fund your one-month emergency buffer within your chosen timeline.` },
        { title: 'Mark this fund as untouchable except for genuine emergencies', done: false,
          description: `**Why does this matter?**

An emergency fund that gets raided for non-emergencies is not an emergency fund — it is a second spending account. The entire purpose of this buffer is to stand between you and haram borrowing when genuine hardship strikes: job loss, medical crisis, urgent home repair, or a sudden family need. Without clear rules about what constitutes a "genuine emergency," the fund will be gradually eroded by expenses that feel urgent in the moment but are not truly emergencies. Establishing firm boundaries protects both your financial resilience and your ability to avoid riba-based debt in a crisis.

---

**How do I accomplish this?**

1. **Define "genuine emergency" in writing.** An emergency is an unexpected, urgent expense that threatens your basic needs or safety — job loss, medical emergency, essential home or car repair, or a family crisis. Sales, vacations, and planned purchases are not emergencies.

2. **Write down your rules.** Create a short document or note titled "Emergency Fund Rules" that lists what qualifies and what does not. Review it before any withdrawal.

3. **Add friction to withdrawals.** If your bank allows it, require a secondary approval step or a 24-hour cooling period before emergency fund withdrawals. This gives you time to reconsider impulsive decisions.

4. **Establish a replenishment rule.** If you do use the fund for a genuine emergency, commit to rebuilding it to full capacity before resuming any discretionary spending increases.

5. **Share the rules with your spouse or accountability partner.** Having someone who knows the rules and can challenge a questionable withdrawal adds an extra layer of protection.

6. **Benchmark:** Complete when you have written emergency fund rules defining what qualifies as a genuine emergency, shared them with an accountability partner, and committed to the replenishment protocol.` },
      ],
    },
  ],
  wealth_financial_growth: [
    {
      title: 'Build a 6-month emergency fund in a halal, liquid account',
      priority: 'high', tags: ['emergency-fund', 'savings'],
      description: 'Expanding your emergency fund to cover six months of expenses provides genuine financial security. This cushion means you will never need to resort to riba-based loans in a crisis, and it gives you the freedom to make career and business decisions from a position of strength rather than desperation.',
      subtasks: [
        { title: 'Calculate your target amount (6 x monthly essential expenses)', done: false,
          description: `**Why does this matter?**

A six-month emergency fund is the threshold at which financial security becomes genuine. One month covers a brief disruption; six months covers a job loss, a health crisis, or a major life transition without forcing you into riba-based borrowing. Calculating the exact target prevents two common mistakes: aiming too low (leaving you exposed) or treating the goal as so vague that you never commit to it. This number becomes your financial north star — every surplus dollar has a clear destination until you reach it.

---

**How do I accomplish this?**

1. **Start with your one-month essential expenses figure.** If you completed the one-month emergency buffer, you already have this number. If not, calculate it now: rent, food, utilities, transport, insurance, and essential debt payments.

2. **Multiply by six.** This is your target emergency fund balance. Write it down prominently.

3. **Subtract what you already have saved.** If your one-month buffer is already built, your remaining target is five times your monthly essentials.

4. **Consider household-specific risks.** If you are the sole earner, self-employed, or in a volatile industry, consider targeting 8-12 months instead of six. Adjust the multiplier accordingly.

5. **Account for inflation.** Revisit your essential expenses figure every six months and update the target if costs have risen meaningfully.

6. **Benchmark:** Complete when you have a specific, written target amount for your six-month emergency fund based on current essential expenses, with your existing savings subtracted to show the remaining gap.` },
        { title: 'Identify the best halal liquid savings vehicle (Islamic savings account, money market)', done: false,
          description: `**Why does this matter?**

A six-month emergency fund is a significant sum that deserves more thoughtful placement than a basic checking account. At the same time, it must remain liquid — accessible within days, not locked away in long-term investments. Finding the right halal vehicle means your fund is protected from riba, somewhat shielded from inflation, and instantly available when you need it. Placing a large sum in a conventional interest-bearing account contradicts the very purpose of building financial resilience within Islamic principles.

---

**How do I accomplish this?**

1. **Research Islamic savings accounts.** Many Islamic banks offer savings accounts structured on mudarabah (profit-sharing) or wakalah (agency) models. These provide modest returns without riba.

2. **Explore Islamic money market funds.** Some Shariah-compliant funds invest in short-term halal instruments and offer higher returns than savings accounts while maintaining reasonable liquidity.

3. **Evaluate commodity murabaha deposits.** Some Islamic institutions offer short-term deposits based on commodity trading structures. These can offer better returns but verify the genuineness of the underlying transactions.

4. **Compare key factors.** For each option, evaluate: Shariah board credentials, liquidity (how quickly can you access the funds?), fees, minimum balance requirements, and historical profit rates.

5. **Prioritise access over returns.** This is an emergency fund, not an investment. A slightly lower return with same-day access is better than a higher return locked for 90 days.

6. **Avoid gold or equities for this purpose.** While halal, these are too volatile for an emergency fund — their value may drop precisely when you need the money most.

7. **Benchmark:** Complete when you have selected a specific halal liquid savings vehicle for your emergency fund, based on a documented comparison of at least two options.` },
        { title: 'Set up a recurring automatic transfer toward the 6-month target', done: false,
          description: `**Why does this matter?**

Building a six-month fund is a marathon, not a sprint — it may take 12-24 months of consistent saving. Without automation, the monthly transfer competes with every other spending impulse and will eventually be skipped. Automation converts your intention into a system that operates regardless of your mood, busyness, or the temptation of that month's sales. The Prophet (peace be upon him) taught that the most beloved deeds to Allah are those done consistently, even if small (Sahih al-Bukhari). A small automated transfer every month is more powerful than sporadic large deposits.

---

**How do I accomplish this?**

1. **Determine your monthly contribution.** Divide your remaining target by your desired timeline. If you need to save 15,000 over 18 months, that is roughly 835 per month.

2. **Be realistic but ambitious.** If the monthly amount strains your budget excessively, extend the timeline. If it feels comfortable, shorten it. The transfer should be challenging but sustainable.

3. **Schedule it for payday.** Set the automatic transfer to execute the day after your salary arrives, before discretionary spending begins.

4. **Set up the transfer in your banking app.** Create a recurring transfer from your primary checking account to your designated emergency fund account.

5. **Add windfalls to the plan.** Commit to depositing at least 50% of any unexpected income (tax refunds, bonuses, gifts) directly into the emergency fund to accelerate progress.

6. **Do not reduce the transfer.** If your income decreases, reduce discretionary spending before reducing your emergency fund contribution.

7. **Benchmark:** Complete when you have an active automatic recurring transfer configured in your banking app, with a clear projected date for reaching your six-month target.` },
        { title: 'Track progress monthly and adjust contributions if income changes', done: false,
          description: `**Why does this matter?**

A plan without monitoring is a plan without accountability. Monthly tracking reveals whether you are on pace to hit your target, exposes months where the transfer was missed or reduced, and gives you the data to adjust course when your income or expenses change. Financial circumstances are not static — raises, job changes, new expenses, or windfalls all affect your trajectory. Regular review ensures your emergency fund plan adapts to reality rather than becoming an outdated commitment you eventually abandon.

---

**How do I accomplish this?**

1. **Schedule a monthly check-in.** Set a recurring calendar reminder — ideally the same day each month — to review your emergency fund balance.

2. **Record the balance.** In a simple spreadsheet or notebook, log the date, current balance, contribution made, and percentage of target reached.

3. **Compare against your plan.** Are you on track, ahead, or behind? If behind, identify why — was a transfer missed, or did an unexpected withdrawal occur?

4. **Adjust for income changes.** If you received a raise, increase your contribution by at least half the raise amount. If income decreased, find other budget cuts before reducing the contribution.

5. **Recalculate the target if expenses changed.** If your essential monthly expenses have increased (new rent, new family member), update the six-month target accordingly.

6. **Celebrate progress.** Note when you cross each month's threshold — reaching three months of expenses is a significant psychological milestone that deserves acknowledgment.

7. **Benchmark:** Complete when you have a tracking system in place, have recorded at least one month's data, and have a process for adjusting contributions when circumstances change.` },
        { title: 'Celebrate milestones (2-month, 4-month, 6-month) to maintain motivation', done: false,
          description: `**Why does this matter?**

Building a six-month emergency fund is one of the longest-duration financial goals most people pursue. Without recognition of progress along the way, the journey feels endless and motivation fades. Celebrating milestones is not frivolity — it is a deliberate psychological strategy that reinforces the behaviour you want to sustain. Islam encourages gratitude (shukr) for every blessing, and each milestone reached is a blessing of discipline and provision from Allah worth acknowledging.

---

**How do I accomplish this?**

1. **Define your milestones in advance.** Write down the dollar amounts that correspond to 2 months, 4 months, and 6 months of essential expenses. Post them somewhere visible.

2. **Plan modest rewards.** Decide in advance how you will celebrate each milestone — a special meal with your family, a small personal treat, a day off for rest and gratitude. Keep celebrations proportionate and halal.

3. **Make shukr at each milestone.** When you reach a milestone, offer prayers of gratitude. You have done something most people never accomplish — you have created genuine financial resilience through disciplined obedience.

4. **Share the achievement.** Tell your spouse, accountability partner, or a trusted friend. Their encouragement amplifies the motivational effect.

5. **Document your journey.** Write a brief note about how it felt to reach each milestone — what sacrifices you made, what you learned, how your mindset shifted. This becomes a personal testimony you can revisit during difficult months.

6. **At the 6-month milestone, reassess.** Once you reach full funding, decide whether to maintain at six months or continue building toward greater security. Then redirect your automatic transfers toward your next financial goal.

7. **Benchmark:** Complete when you have written milestone targets posted visibly, planned celebrations for each, and committed to making shukr and sharing progress at each stage.` },
      ],
    },
    {
      title: 'Open a Shariah-compliant investment account — research halal ETFs, sukuk, or Islamic funds',
      priority: 'high', tags: ['investing', 'halal'],
      description: 'Growing wealth beyond savings requires investment, and Islam encourages productive deployment of capital. Research Shariah-compliant options such as halal-screened equity ETFs, sukuk (Islamic bonds), and managed Islamic funds to put your money to work without compromising your principles.',
      subtasks: [
        { title: 'Research Shariah-compliant brokerage platforms available in your region', done: false,
          description: `**Why does this matter?**

You cannot invest in halal assets if you do not have access to a platform that supports them. The brokerage platform is the gateway to your entire investment life — it determines what products you can access, what fees you pay, and whether the infrastructure itself is Shariah-compliant. Some conventional brokerages offer halal-screened funds, while dedicated Islamic platforms provide end-to-end compliance. Choosing the right platform now prevents the frustration of opening an account only to discover it does not support the investments you need.

---

**How do I accomplish this?**

1. **Search for dedicated Islamic brokerage platforms.** Companies like Wahed Invest, Saturna Capital (Amana Funds), and others offer fully Shariah-compliant investment services. Check which ones serve your country.

2. **Check conventional brokerages for halal options.** Major platforms like Interactive Brokers, Fidelity, or local equivalents may offer access to halal ETFs and funds even if the platform itself is not Islamic.

3. **Evaluate key factors.** For each platform, assess: available halal products, account fees, minimum investment requirements, mobile app quality, regulatory standing, and customer support.

4. **Verify Shariah governance.** Does the platform have a Shariah advisory board? Are the screening methodologies published and transparent?

5. **Check for retirement account options.** If your jurisdiction offers tax-advantaged retirement accounts (IRA, TFSA, ISA), verify whether the platform supports halal investments within those account types.

6. **Read community reviews.** Seek feedback from Muslim investors in online forums and communities about their experience with specific platforms.

7. **Benchmark:** Complete when you have identified at least two viable Shariah-compliant brokerage platforms, compared their features, and selected one to open an account with.` },
        { title: 'Learn the screening criteria used to determine if a stock or fund is halal', done: false,
          description: `**Why does this matter?**

Not every publicly traded company is permissible to invest in. Islamic stock screening applies both qualitative and quantitative filters to determine whether a company's business activities, debt levels, and revenue composition meet Shariah standards. Understanding these criteria empowers you to evaluate any investment independently rather than relying solely on labels. A company labeled "halal" by one screening methodology may not pass another — informed investors can assess the reasoning and make their own judgments with scholarly guidance.

---

**How do I accomplish this?**

1. **Learn the qualitative (business activity) screen.** Companies whose primary business involves alcohol, gambling, conventional financial services, pork, weapons, tobacco, or adult entertainment are excluded outright.

2. **Understand the quantitative (financial ratio) screens.** Most methodologies set thresholds for: total debt to total assets (typically must be below 30-33%), interest-bearing cash and investments to total assets, and revenue from impermissible activities (typically must be below 5%).

3. **Study the major screening methodologies.** The AAOIFI standard, the Dow Jones Islamic Market Index methodology, and the MSCI Islamic Index methodology each apply slightly different thresholds. Know the differences.

4. **Learn about purification.** Even compliant companies may earn a small percentage of revenue from impermissible sources. Investors must "purify" this portion by donating it to charity. Learn how to calculate and execute purification.

5. **Use screening tools.** Platforms like Islamicly, Zoya, or Musaffa provide real-time Shariah screening for thousands of stocks. Familiarise yourself with at least one tool.

6. **Benchmark:** Complete when you can explain the qualitative and quantitative screening criteria, name at least two major screening methodologies, and use a screening tool to check whether a specific stock is halal.` },
        { title: 'Compare at least 3 halal investment products (ETFs, sukuk, Islamic mutual funds)', done: false,
          description: `**Why does this matter?**

Different halal investment products serve different purposes — equities offer growth, sukuk provide stability, and diversified Islamic funds offer convenience. Comparing at least three products forces you to understand the landscape and make a deliberate choice rather than defaulting to whatever is most marketed. Each product has different risk profiles, fee structures, and underlying methodologies. A 30-minute comparison now could save you thousands in unnecessary fees or protect you from a product that does not truly serve your financial goals.

---

**How do I accomplish this?**

1. **Select one product from each major category.** Choose at least one halal equity ETF (e.g., SPUS, HLAL, ISDU), one sukuk fund, and one diversified Islamic mutual fund for comparison.

2. **Compare returns.** Look at historical performance over 1-year, 3-year, and 5-year periods. Remember that past performance does not guarantee future results, but it reveals consistency.

3. **Compare fees.** Check the expense ratio (annual management fee), trading commissions, and any entry or exit fees. Even small fee differences compound significantly over decades.

4. **Assess the Shariah governance.** Who is on the Shariah board? How frequently is the portfolio screened? What happens when a holding fails screening?

5. **Evaluate the underlying holdings.** Review the top 10 holdings of each product. Do they align with your values beyond basic Shariah compliance? Are they concentrated in a single sector?

6. **Consider your goals.** Match products to your timeline: growth-oriented equity ETFs for long-term goals, sukuk for near-term stability, diversified funds for balanced exposure.

7. **Benchmark:** Complete when you have a written comparison of at least three halal investment products covering returns, fees, Shariah governance, and suitability for your goals.` },
        { title: 'Open an account and make your first investment, even if small', done: false,
          description: `**Why does this matter?**

Knowledge without action is incomplete. The gap between "planning to invest" and "actually investing" is where most people stall — indefinitely. Making your first investment, even if it is a modest amount, breaks the psychological barrier and transforms you from someone who studies investing into someone who invests. The actual amount matters far less than the act of beginning. The Prophet (peace be upon him) said the most beloved deeds to Allah are those done consistently, even if small (Sahih al-Bukhari). A small first investment made today is worth more than a large investment perpetually planned for tomorrow.

---

**How do I accomplish this?**

1. **Open the account on your chosen platform.** Complete the registration, identity verification, and any required documentation. This may take a few days for processing.

2. **Fund the account.** Transfer an initial amount you are comfortable with — even 50 or 100 is sufficient to begin. This is not about the amount; it is about establishing the habit.

3. **Select your first investment.** Based on your earlier research, choose one halal product that aligns with your long-term goals. A diversified halal equity ETF is often a sensible starting point.

4. **Execute the purchase.** Place the order through your platform. Take a moment to acknowledge that you have just taken a meaningful step toward growing your wealth in a halal manner.

5. **Understand what you own.** After purchasing, review what companies or instruments your investment holds. This deepens your connection to your portfolio and builds knowledge.

6. **Benchmark:** Complete when you have an open, funded investment account and have executed your first purchase of a Shariah-compliant investment product.` },
        { title: 'Set up regular contributions to build your portfolio over time', done: false,
          description: `**Why does this matter?**

Consistent, regular investing — known as dollar-cost averaging — is one of the most powerful wealth-building strategies available. By investing a fixed amount at regular intervals regardless of market conditions, you buy more units when prices are low and fewer when prices are high, naturally averaging your cost over time. This removes the impossible task of trying to "time the market" and replaces it with disciplined, automated consistency. In an Islamic framework, this systematic approach reflects the principle of taking practical means (tying the camel) while trusting in Allah's provision (tawakkul).

---

**How do I accomplish this?**

1. **Determine your monthly investment amount.** After your budget covers essentials, zakah, savings, and debt payments, allocate a fixed amount for investment. Even a small amount compounds significantly over years.

2. **Set up automatic contributions.** Most brokerage platforms allow recurring deposits. Schedule them for the same day each month, ideally soon after payday.

3. **Enable automatic investment.** If your platform supports it, configure the deposited funds to automatically purchase your chosen halal investment product without manual intervention.

4. **Increase contributions with income.** Each time your income rises, direct at least a portion of the increase to your investment contributions. Lifestyle inflation is the enemy of wealth building.

5. **Do not interrupt during market dips.** When markets decline, your regular contribution buys more units at lower prices — this is the power of dollar-cost averaging. Stopping contributions during dips is the worst possible response.

6. **Review quarterly, not daily.** Check your portfolio performance once per quarter. Daily checking creates anxiety and tempts impulsive decisions.

7. **Benchmark:** Complete when you have automatic recurring contributions configured on your brokerage platform, investing in your chosen halal product on a fixed monthly schedule.` },
      ],
    },
    {
      title: 'Set clear financial goals — 1-year, 5-year, and 10-year targets with milestones',
      priority: 'medium', tags: ['planning', 'goals'],
      description: 'Without clear goals, wealth accumulation becomes aimless. Define what you want to achieve financially at each time horizon — whether it is becoming debt-free, buying a home outright, funding your children\'s education, or reaching financial independence — and break each goal into measurable milestones.',
      subtasks: [
        { title: 'Write down your top financial goal for the next 12 months', done: false,
          description: `**Why does this matter?**

A twelve-month goal is close enough to feel urgent and far enough to accomplish something meaningful. Without a clearly articulated short-term financial goal, your daily and monthly financial decisions lack direction — you save "some," spend "less," and invest "eventually." Writing the goal down activates a different level of psychological commitment. Studies consistently show that people who write specific goals are far more likely to achieve them. In Islam, intention (niyyah) precedes action — writing your financial goal is formalising your niyyah for how you will steward your wealth this year.

---

**How do I accomplish this?**

1. **Reflect on your most pressing financial need.** Is it completing your emergency fund? Paying off a specific debt? Saving for a home down payment? Starting a halal investment portfolio? Choose the single goal that would most improve your financial position.

2. **Make it specific and measurable.** "Save more money" is not a goal. "Save 12,000 in my emergency fund by December 31" is a goal. Include the exact amount and deadline.

3. **Verify it is achievable.** Back-calculate: can you realistically reach this number in 12 months given your current income and expenses? Adjust if needed, but do not make it easy — stretch yourself.

4. **Write it in a prominent place.** Post it on your wall, set it as your phone wallpaper, or write it on the first page of your financial journal. You should see this goal regularly.

5. **Connect it to your deen.** Write one sentence explaining how achieving this goal serves your obligations — nafaqah, zakah readiness, debt freedom, or building capacity for generosity.

6. **Benchmark:** Complete when you have a single, specific, measurable 12-month financial goal written down and posted where you will see it regularly.` },
        { title: 'Define your 5-year financial vision (home ownership, business, investments)', done: false,
          description: `**Why does this matter?**

Five years is the horizon where transformational financial change becomes possible — paying off all debt, purchasing a home, building a business to profitability, or growing an investment portfolio to a meaningful size. Without a five-year vision, each year's goals feel disconnected from a larger trajectory. This vision provides the "why" behind daily financial discipline: you are not just saving 500 a month, you are building toward a home for your family or a business that creates halal employment. The Quran reminds us that Allah does not change the condition of a people until they change what is within themselves (13:11) — this vision is the change within.

---

**How do I accomplish this?**

1. **Envision your financial life in five years.** Where do you want to live? Do you own or rent? What does your business look like? How large is your investment portfolio? What is your annual income?

2. **Identify 2-3 major financial milestones.** These might include: owning a home outright or with Islamic financing, reaching a specific net worth, launching a profitable halal business, or achieving a particular passive income level.

3. **Attach numbers to each milestone.** "Own a home" becomes "Purchase a 300,000 home with a 60,000 down payment saved by Year 3, financed through diminishing musharakah."

4. **Map the milestones to a timeline.** Which milestone comes first? What must happen in Years 1-2 to enable what you want in Years 3-5?

5. **Ensure Islamic alignment.** Every milestone should be achievable through halal means. If a goal requires riba-based financing, redesign the path to use Islamic alternatives, even if it takes longer.

6. **Benchmark:** Complete when you have 2-3 specific, numbered five-year financial milestones mapped to a timeline, with Islamic compliance verified for each path.` },
        { title: 'Articulate your 10-year legacy goal (financial independence, waqf, generational wealth)', done: false,
          description: `**Why does this matter?**

Ten-year goals transcend personal comfort and enter the realm of legacy — what will your wealth accomplish beyond sustaining your household? This is where Hifz al-Mal reaches its highest expression: building something that outlasts you. Whether it is financial independence that frees your time for worship and service, a waqf that benefits the ummah for generations, or generational wealth that protects your descendants from poverty and haram dependency, the ten-year goal connects your daily financial habits to an eternal purpose. The Prophet (peace be upon him) said that when a person dies, their deeds end except for three — and ongoing charity (sadaqah jariyah) is one of them.

---

**How do I accomplish this?**

1. **Ask the legacy question.** If you achieved everything in your five-year plan, what would you build next? What would you want your wealth to accomplish after your lifetime?

2. **Consider financial independence.** Calculate the point at which passive halal income covers all your living expenses. What would you do with your time if work were optional?

3. **Consider a waqf.** A permanent Islamic endowment — property, fund, or institution — whose returns serve a cause you care about indefinitely. What cause would you choose?

4. **Consider generational wealth.** What financial infrastructure would protect your children and grandchildren — education funds, family businesses, property portfolios?

5. **Write a legacy statement.** In 2-3 sentences, describe what your wealth will have accomplished ten years from now. Make it vivid and personally meaningful.

6. **Work backwards.** What must your five-year milestones produce to make the ten-year goal achievable? Adjust earlier goals if needed.

7. **Benchmark:** Complete when you have a written ten-year legacy goal with a clear connection to your Islamic values, and your shorter-term goals logically build toward it.` },
        { title: 'Break each goal into quarterly milestones with specific numbers', done: false,
          description: `**Why does this matter?**

A 12-month goal without interim checkpoints is a goal you will not track until it is too late to course-correct. Quarterly milestones transform a distant target into a series of near-term commitments, each one achievable and measurable. This structure mirrors the Islamic practice of regular self-accounting (muhasabah) — just as a believer examines their spiritual state regularly, a responsible steward examines their financial progress at defined intervals. Quarterly reviews also create natural decision points where you can accelerate, adjust, or seek help.

---

**How do I accomplish this?**

1. **Take each goal and divide by four.** If your 12-month goal is to save 12,000, your quarterly milestones are 3,000 at Q1, 6,000 at Q2, 9,000 at Q3, and 12,000 at Q4.

2. **Account for non-linear progress.** Some quarters may have higher expenses (holidays, annual bills). Adjust milestones to reflect reality — perhaps 2,500 in Q4 and 3,500 in Q1.

3. **Apply to five-year goals.** Break annual targets into quarterly checks. "Save 60,000 for a down payment in 5 years" becomes "save 3,000 per quarter" with cumulative targets at each checkpoint.

4. **Write milestones as "By [date], I will have [specific number]."** This format creates clarity and accountability. Vague milestones like "making progress" are worthless.

5. **Put milestone dates in your calendar.** Schedule quarterly financial review sessions — 30-60 minutes dedicated to comparing actual results against targets.

6. **Benchmark:** Complete when every financial goal (1-year, 5-year, 10-year) has been broken into quarterly milestones with specific numbers and review dates scheduled in your calendar.` },
        { title: 'Review and adjust goals every 6 months based on actual progress', done: false,
          description: `**Why does this matter?**

No financial plan survives contact with reality unchanged. Income fluctuates, expenses surprise, opportunities emerge, and circumstances shift. A semi-annual review ensures your goals remain relevant, achievable, and aligned with your current situation. Without regular adjustment, you risk either chasing an outdated goal or abandoning planning altogether when the original targets no longer fit. The practice of regular review is itself an act of stewardship — it demonstrates that you are actively managing the wealth Allah has entrusted to you, not setting it on autopilot and hoping for the best.

---

**How do I accomplish this?**

1. **Schedule two review sessions per year.** Block 1-2 hours at the six-month and twelve-month marks of your planning cycle. Treat these as non-negotiable appointments.

2. **Gather your data.** Bring your budget actuals, savings balances, investment portfolio statements, debt balances, and milestone tracker to the review.

3. **Compare actual vs. planned.** For each goal, calculate whether you are ahead, on track, or behind. Quantify the gap in dollars and months.

4. **Diagnose the variance.** If behind, identify the root cause — was it income, expenses, an emergency withdrawal, or inconsistent contributions? If ahead, understand what accelerated progress.

5. **Adjust the plan.** Update milestone targets, contribution amounts, or timelines based on current reality. A revised plan is infinitely better than an abandoned one.

6. **Revisit the goals themselves.** Has your situation changed enough that a goal should be replaced entirely? Have new opportunities or obligations emerged?

7. **Document the review.** Write a brief summary of findings and adjustments. This creates a record of your financial journey and helps identify long-term patterns.

8. **Benchmark:** Complete when you have conducted your first semi-annual review, documented findings and adjustments, and updated your milestone tracker accordingly.` },
      ],
    },
    {
      title: 'Study a foundational personal finance book — filtered for Islamic compatibility (avoid riba-based advice)',
      priority: 'medium', tags: ['study', 'financial-literacy'],
      description: 'Many excellent personal finance books contain universal wisdom about budgeting, saving, and investing — but also include advice that assumes interest-based products are acceptable. Read with a critical Islamic lens: absorb the principles of discipline and wealth-building while filtering out anything involving riba.',
      subtasks: [
        { title: 'Choose a recommended book (e.g., The Richest Man in Babylon, filtered through Islamic principles)', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (90:17)
**Arabic:** 
**Translation:** Then he became one of those who believed (in the Islamic Monotheism) and recommended one another to perseverance and patience, and (also) recommended one another to pity and compassion.`,
          description: `**Why does this matter?**

The world's best personal finance wisdom is largely found in books written outside an Islamic framework. Dismissing all of it would mean ignoring centuries of practical knowledge about budgeting, saving, investing, and building wealth. The key is to approach these resources with a discerning Islamic lens — extracting the universal principles of discipline and stewardship while filtering out anything that normalises riba or contradicts Shariah. Choosing the right book to start with sets the tone for a lifelong practice of learning from diverse sources while remaining anchored in your principles.

---

**How do I accomplish this?**

1. **Consider classic recommendations.** "The Richest Man in Babylon" by George S. Clason teaches timeless saving and investing principles through parables. "The Psychology of Money" by Morgan Housel explores behavioural insights. "Your Money or Your Life" by Vicki Robin challenges consumption habits.

2. **Check for Islamic personal finance books.** Works such as "Personal Finance" by Shazia Hussain (Islamic perspective) or publications by ISRA (International Shari'ah Research Academy) may provide finance education already filtered for compliance.

3. **Evaluate the book's core thesis.** Does the book primarily teach discipline and mindset (highly transferable) or does it centre on specific products like 401k optimisation or mortgage strategies (requiring heavy filtering)?

4. **Ask trusted community members.** Seek recommendations from financially literate Muslims who have read widely and can point you to the most beneficial starting book.

5. **Commit to one book.** Do not spend weeks deciding — choose one, commit to reading it within 30 days, and apply the critical Islamic lens as you go.

6. **Benchmark:** Complete when you have selected a specific personal finance book and set a 30-day deadline to finish reading it.` },
        { title: 'Read the book and take notes, flagging any advice that conflicts with Islamic finance', done: false,
          description: `**Why does this matter?**

Passive reading creates passive knowledge that fades quickly. Active reading — taking notes, questioning advice, and flagging conflicts — transforms a book into a personalised financial education. The flagging exercise is particularly critical: it trains your mind to automatically detect riba-normalising assumptions in financial advice, a skill you will use for the rest of your life. Every financial article, podcast, and conversation you encounter will contain similar assumptions, and this practice builds your filter.

---

**How do I accomplish this?**

1. **Set up a note-taking system.** Use a notebook, digital document, or app with two sections: "Key Insights" and "Islamic Conflicts."

2. **Read actively.** After each chapter, write 2-3 key takeaways in your own words. This forces comprehension rather than passive consumption.

3. **Flag riba-based advice immediately.** Any advice that assumes interest-bearing savings accounts, conventional mortgages, credit card reward optimisation, or bond investing should be flagged.

4. **Flag lifestyle assumptions.** Some books assume insurance structures, retirement account types, or tax strategies that may not apply in your jurisdiction or Islamic framework.

5. **Note universally applicable wisdom.** Principles like "pay yourself first," "avoid lifestyle inflation," "invest consistently," and "live below your means" are fully compatible with Islamic finance.

6. **Mark questions for further research.** If you are unsure whether a piece of advice conflicts with Islamic principles, mark it with a question mark for later investigation.

7. **Benchmark:** Complete when you have finished reading the book with notes on key insights and a clear list of flagged items that conflict with Islamic financial principles.` },
        { title: 'For each flagged item, research the halal alternative', done: false,
          description: `**Why does this matter?**

Identifying conflicts is only half the work — finding halal alternatives completes the picture and makes the knowledge actionable. For every piece of riba-based advice you flagged, there exists an Islamic alternative, though it may require different structures, longer timelines, or creative approaches. This research exercise builds your personal Islamic finance toolkit — a growing library of halal solutions you can apply whenever conventional advice points toward haram. Over time, you will develop an instinctive ability to translate any financial strategy into its Islamic equivalent.

---

**How do I accomplish this?**

1. **List all flagged items.** Transfer your flagged conflicts into a clean list, each one stated as a specific piece of advice (e.g., "Use a high-yield savings account" or "Take out a 30-year fixed mortgage").

2. **Research one at a time.** For each item, search for the Islamic alternative: "halal alternative to savings accounts" becomes Islamic mudarabah savings; "halal alternative to mortgage" becomes diminishing musharakah or ijara wa iqtina.

3. **Use reliable sources.** Consult Islamic finance textbooks, fatwa databases (like IslamQA or Darul Ifta), and reputable Islamic finance websites for each alternative.

4. **Note the trade-offs.** Halal alternatives sometimes come with higher costs, fewer options, or longer timelines. Document these honestly — awareness of trade-offs prepares you for reality.

5. **Seek scholarly confirmation.** For complex alternatives (investment structures, financing arrangements), verify with a qualified scholar or Islamic finance professional.

6. **Benchmark:** Complete when every flagged conflict has a documented halal alternative, including the source of your information and any trade-offs noted.` },
        { title: 'Summarise 5 key takeaways that are compatible with your Islamic financial framework', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (3:104)
**Arabic:** 
**Translation:** Let there arise out of you a group of people inviting to all that is good (Islâm), enjoining Al-Ma‘rûf (i.e. Islâmic Monotheism and all that Islâm orders one to do) and forbidding Al-Munkar (polytheism and disbelief and all that Islâm has forbidden). And it is they who are the successful.`,
          description: `**Why does this matter?**

Distilling an entire book into five actionable takeaways forces you to identify the highest-value insights and commit them to memory. These five principles become part of your permanent financial operating system — mental shortcuts that guide daily decisions without requiring you to re-read the book. By filtering for Islamic compatibility, you create a personalised wisdom set that is both practically powerful and spiritually clean. This summary also becomes a resource you can share with family members or friends who may not read the full book but can benefit from its best ideas.

---

**How do I accomplish this?**

1. **Review your notes.** Go through all the key insights you recorded during reading. Identify the ones that resonated most strongly and have the most practical application to your life.

2. **Select five that are Islamically compatible.** Each takeaway must be implementable without any compromise of Islamic principles. If a principle requires modification to be halal, include the modified version.

3. **Write each takeaway as an actionable statement.** Not "saving is important" but "automate a minimum 10% savings transfer on payday before any discretionary spending."

4. **Connect each to an Islamic principle.** Link each takeaway to a relevant concept: amanah (stewardship), tawakkul (reliance on Allah with effort), wasatiyyah (moderation), or shukr (gratitude for provision).

5. **Post them visibly.** Write your five takeaways on a card or note and place it where you review your finances — near your budget, on your desk, or in your financial journal.

6. **Teach one to someone else.** Sharing a takeaway with your spouse, child, or friend deepens your own understanding and multiplies the benefit.

7. **Benchmark:** Complete when you have five written, Islamically-compatible takeaways from the book, each connected to an Islamic principle, posted visibly, and at least one shared with another person.` },
      ],
    },
  ],
  wealth_financial_excellence: [
    {
      title: 'Engage a qualified Islamic financial planner to optimise your asset allocation and estate plan',
      priority: 'medium', tags: ['planning', 'expert'],
      description: 'As your wealth grows in complexity, professional guidance becomes essential. A qualified Islamic financial planner can optimise your portfolio allocation, tax strategy, and estate plan while ensuring every element remains Shariah-compliant. This is an investment in the long-term integrity of your wealth.',
      subtasks: [
        { title: 'Research Islamic financial planners and advisors in your area or online', done: false,
          description: `**Why does this matter?**

As your wealth grows beyond basic budgeting and emergency savings into complex territory — multiple investment accounts, business assets, real estate, estate planning, and multi-generational wealth transfer — professional guidance becomes not a luxury but a necessity. A qualified Islamic financial planner brings expertise you cannot reasonably develop on your own: deep knowledge of Shariah-compliant instruments, tax optimisation within halal boundaries, and estate structures that satisfy both Islamic law and civil law. The cost of mistakes at this level — a poorly structured investment, a non-compliant product, an invalid estate plan — far exceeds the cost of professional advice.

---

**How do I accomplish this?**

1. **Search for certified Islamic financial planners.** Look for professionals holding CIFP (Certified Islamic Finance Professional), CIFE, or equivalent credentials from recognised institutions like INCEIF or AAOIFI.

2. **Check online platforms.** Some Islamic financial advisory firms operate entirely online, expanding your options beyond your local area. Firms like Azzad Asset Management, Javelin Wealth, or regional equivalents may serve your jurisdiction.

3. **Ask your community.** Inquire at your local masjid, Islamic centre, or Muslim professional networks for recommendations. Personal referrals from satisfied clients are invaluable.

4. **Evaluate their model.** Fee-only advisors (who charge for advice rather than earning commissions on products they sell) tend to offer more impartial guidance. Understand how each advisor is compensated.

5. **Shortlist 2-3 candidates.** Narrow your search to a manageable number for deeper evaluation in the next step.

6. **Benchmark:** Complete when you have identified 2-3 potential Islamic financial planners or advisory firms, with notes on their credentials, service model, and compensation structure.` },
        { title: 'Verify their qualifications (Islamic finance certification, regulatory credentials)', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (4:94)
**Arabic:** 
**Translation:** O you who believe! When you go (to fight) in the Cause of Allâh, verify (the truth), and say not to anyone who greets you (by embracing Islâm): "You are not a believer"; seeking the perishable goods of the worldly life. There are much more profits and booties with Allâh. Even as he is now, so were you yourselves before till Allâh conferred on you His Favours (i.e. guided you to Islâm), therefore, be cautious in discrimination. Allâh is Ever Well-Aware of what you do.`,
          description: `**Why does this matter?**

The Islamic finance industry, while growing, is not uniformly regulated. Some advisors market themselves as "Islamic" or "halal" without formal training in Islamic jurisprudence of finance, recognised certifications, or regulatory oversight. Entrusting your wealth to an unqualified advisor risks both financial loss and inadvertent engagement with non-compliant products. Verification protects you from well-intentioned but unqualified practitioners and from outright fraud. In Islam, verifying the trustworthiness and competence of those you delegate to is an act of prudence, not suspicion.

---

**How do I accomplish this?**

1. **Check Islamic finance credentials.** Look for certifications from recognised bodies: CIFP from INCEIF, Islamic finance qualifications from AAOIFI, or equivalent programmes from reputable institutions.

2. **Verify regulatory registration.** In most jurisdictions, financial advisors must be registered with a regulatory authority (SEC, FCA, ASIC, etc.). Confirm your candidate's registration and check for any disciplinary history.

3. **Ask about their Shariah advisory process.** How do they determine whether a product is compliant? Do they consult with a Shariah board, rely on third-party screening, or make their own judgments?

4. **Request references.** Ask for 2-3 client references, particularly clients with similar financial situations to yours. Speaking with existing clients reveals the real experience.

5. **Assess their knowledge in conversation.** During an initial call, ask specific questions about Islamic finance structures (mudarabah, musharakah, ijara). A qualified advisor will explain these clearly and confidently.

6. **Benchmark:** Complete when you have verified the credentials and regulatory standing of each shortlisted advisor, spoken with at least one client reference, and assessed their Islamic finance knowledge firsthand.` },
        { title: 'Prepare a summary of your current financial position (assets, debts, income, goals)', done: false,
          description: `**Why does this matter?**

An advisor can only help you if they understand where you are starting from. A well-prepared financial summary demonstrates that you are a serious, organised client and enables the advisor to provide relevant, specific guidance from the first meeting rather than spending expensive consultation time gathering basic information. This summary is also a powerful exercise in self-awareness — compiling everything in one document often reveals strengths, vulnerabilities, and opportunities you had not noticed when your finances existed as scattered mental notes.

---

**How do I accomplish this?**

1. **List all assets with current values.** Cash and savings, investments (with current market value), real estate (estimated value), vehicles, gold, business equity, and any other significant assets.

2. **List all debts with details.** For each debt: creditor, outstanding balance, monthly payment, interest rate (if any — flag riba-bearing debts), and expected payoff date.

3. **Summarise your income.** Net monthly income from all halal sources, noting which are stable (salary) and which are variable (freelance, business profits).

4. **State your financial goals.** Include your 1-year, 5-year, and 10-year goals as defined in your goal-setting work. Be specific with numbers and timelines.

5. **Note your zakah status.** Include your last zakah calculation date, estimated annual obligation, and how you currently distribute it.

6. **Include your risk profile.** How much investment volatility can you tolerate? What is your investment timeline? Are you aggressive, moderate, or conservative?

7. **Organise into a clean document.** A 2-3 page PDF or spreadsheet that the advisor can review before your meeting.

8. **Benchmark:** Complete when you have a comprehensive financial summary document covering assets, debts, income, goals, zakah status, and risk profile, ready to share with your advisor.` },
        { title: 'Schedule an initial consultation and discuss your objectives', done: false,
          description: `**Why does this matter?**

The initial consultation is a two-way evaluation. You are assessing whether this advisor understands your values, communicates clearly, and can serve your specific needs. They are assessing whether they can genuinely help you. This meeting sets the foundation for what may become a multi-year professional relationship governing the most important financial decisions of your life. Coming prepared with clear objectives and specific questions maximises the value of this meeting and helps both parties determine whether the relationship is a good fit.

---

**How do I accomplish this?**

1. **Send your financial summary in advance.** Share the document you prepared at least 48 hours before the meeting so the advisor can review it and come prepared with relevant observations.

2. **Prepare your questions.** Write down 5-7 specific questions: How do you ensure Shariah compliance? What is your fee structure? How often will we meet? What is your approach to asset allocation? How do you handle estate planning for Muslims?

3. **State your objectives clearly.** At the start of the meeting, explain your primary financial goals and any specific concerns — riba elimination, estate compliance with fara'id, tax-efficient halal investing.

4. **Listen for alignment.** Does the advisor demonstrate genuine understanding of Islamic finance principles? Do they ask thoughtful follow-up questions? Do they push back constructively or simply agree with everything?

5. **Discuss next steps.** If the meeting goes well, ask about onboarding: what information they need, what their planning process looks like, and when you can expect an initial recommendations report.

6. **Take notes during and after.** Document key points discussed, advice given, and your overall impression. Compare notes across advisors if you consulted multiple candidates.

7. **Benchmark:** Complete when you have conducted the initial consultation, evaluated the advisor's fit, and either engaged them or decided to consult the next candidate on your shortlist.` },
        { title: 'Implement their recommendations and schedule regular review meetings', done: false,
          description: `**Why does this matter?**

Professional advice without implementation is wasted money and missed opportunity. Many people pay for financial planning but then procrastinate on executing the recommendations — accounts remain unopened, rebalancing is postponed, and estate documents go unsigned. The value of professional guidance is realised only through action. Equally important, your financial plan is not a one-time document — it requires regular review as your circumstances, the economy, and Islamic finance options evolve. Scheduled review meetings create accountability and ensure your plan stays current.

---

**How do I accomplish this?**

1. **Review the recommendations carefully.** Read your advisor's report thoroughly. Ensure you understand every recommendation and the reasoning behind it. Ask for clarification on anything unclear.

2. **Prioritise by impact and urgency.** Some recommendations (closing a riba-bearing account, updating your will) should be executed immediately. Others (portfolio rebalancing, long-term asset allocation shifts) can follow a phased timeline.

3. **Create an implementation checklist.** Turn each recommendation into a specific action item with a deadline. Check them off as you complete them.

4. **Report back to your advisor.** As you implement each item, confirm with your advisor that it was executed correctly. They can verify that accounts are set up properly and documents are valid.

5. **Schedule review meetings.** Establish a regular cadence — quarterly for the first year, then semi-annually once your plan is stable. Put these in your calendar as recurring appointments.

6. **Come to reviews prepared.** Bring updated financial statements, note any life changes (new income, new family member, major purchase), and prepare questions about market developments.

7. **Benchmark:** Complete when you have implemented at least the highest-priority recommendations and scheduled your first regular review meeting with your advisor.` },
      ],
    },
    {
      title: 'Develop a multi-asset halal portfolio (equities, real estate, sukuk, gold)',
      priority: 'medium', tags: ['investing', 'diversification'],
      description: 'Diversification across asset classes reduces risk and increases resilience. A well-balanced halal portfolio might include Shariah-screened equities for growth, real estate for stability and rental income, sukuk for fixed-income exposure, and gold as a store of value — all within Islamic guidelines.',
      subtasks: [
        { title: 'Define your target asset allocation percentages across equity, real estate, sukuk, and gold', done: false,
          description: `**Why does this matter?**

Asset allocation — how you divide your investments across different categories — is the single most important decision in portfolio management, more impactful than picking individual stocks or timing the market. Different asset classes behave differently under various economic conditions: equities grow fastest but are volatile, real estate provides stability and rental income, sukuk offer steady returns with lower risk, and gold serves as a store of value during uncertainty. Without a defined allocation, your portfolio drifts based on which investment you happened to buy last, leaving you over-concentrated and exposed to avoidable risk.

---

**How do I accomplish this?**

1. **Assess your risk tolerance.** Are you young with decades to invest (higher equity allocation) or nearing retirement with income needs (higher sukuk and real estate)? Your timeline and temperament determine your starting point.

2. **Study common allocation models.** A moderate halal portfolio might target: 50% Shariah-screened equities, 20% real estate (REITs or direct property), 20% sukuk, and 10% gold. Aggressive investors shift more toward equities; conservative investors shift toward sukuk and real estate.

3. **Consider your existing exposure.** If you already own your home, you have significant real estate exposure — your investment portfolio may need less. If your income is already volatile (business owner), you may want more stability in your investments.

4. **Set specific percentages.** Write down your target allocation with exact percentages that sum to 100%. This becomes your investment policy statement.

5. **Discuss with your advisor.** If you have engaged an Islamic financial planner, review your proposed allocation with them for expert input.

6. **Benchmark:** Complete when you have a written target asset allocation with specific percentages for each asset class, justified by your risk tolerance, timeline, and existing financial position.` },
        { title: 'Research and select specific halal instruments for each asset class', done: false,
          description: `**Why does this matter?**

Your asset allocation defines the strategy; specific instruments execute it. Within each asset class, there are multiple halal options with different characteristics, fees, and compliance standards. Selecting the right instrument for each category ensures your portfolio is not just theoretically diversified but practically optimised. A poorly chosen instrument — one with excessive fees, weak Shariah governance, or poor liquidity — can undermine an otherwise sound allocation strategy. This research step is where your general knowledge of Islamic finance becomes specific, actionable, and portfolio-ready.

---

**How do I accomplish this?**

1. **For equities: select a halal ETF or fund.** Compare options like SPUS, HLAL, ISDU, or regional equivalents. Evaluate expense ratios, tracking error, Shariah board composition, and purification methodology.

2. **For real estate: choose your vehicle.** Options include direct property investment, Islamic REITs (if available in your market), real estate crowdfunding platforms with Shariah compliance, or real estate funds offered by Islamic banks.

3. **For sukuk: identify accessible products.** Sovereign sukuk, corporate sukuk, or sukuk funds offered through your brokerage platform. Evaluate the issuer's credit quality, the sukuk structure (ijara, mudarabah, wakalah), and the yield.

4. **For gold: decide on physical vs. digital.** Physical gold (coins, bars) offers tangible ownership but requires secure storage. Gold ETFs or digital gold platforms offer convenience but verify the backing and Shariah compliance.

5. **Create a comparison matrix.** For each asset class, compare 2-3 options across: fees, Shariah governance, liquidity, minimum investment, and historical performance.

6. **Select one instrument per asset class.** Make your choice based on the comparison, prioritising Shariah compliance and low fees over headline returns.

7. **Benchmark:** Complete when you have selected a specific halal instrument for each asset class in your allocation, with documented reasoning for each choice.` },
        { title: 'Invest in at least two new asset classes you are not currently exposed to', done: false,
          description: `**Why does this matter?**

Most people concentrate their wealth in one or two asset classes by default — typically cash savings and perhaps their home. True diversification requires deliberately investing in asset classes you are not yet exposed to, which means stepping outside your comfort zone. This discomfort is productive: it builds your knowledge, reduces portfolio concentration risk, and opens pathways to returns you would otherwise miss entirely. The Quran teaches that Allah provides from sources one does not expect (65:3) — diversification is the financial expression of this trust, spreading your seeds across multiple fields rather than gambling everything on one harvest.

---

**How do I accomplish this?**

1. **Identify your gaps.** Review your current holdings and your target allocation. Which asset classes have zero or minimal representation? These are your immediate priorities.

2. **Start with the more accessible option.** If you have never held equities, a halal ETF purchase through an online brokerage may be simpler to start with than direct real estate investment.

3. **Begin with a modest amount.** You do not need to reach your target allocation immediately. Invest enough to gain exposure and experience — you can increase your position over time.

4. **Educate yourself on the new asset class.** Before investing, spend a few hours understanding how the asset class works, what drives its returns, and what risks are specific to it.

5. **Execute the investment.** Open the necessary accounts, fund them, and make the purchase. Do not let analysis paralysis delay this step — the learning you gain from owning an asset is deeper than any theoretical study.

6. **Document the experience.** Note what you learned, what surprised you, and how the process compared to your expectations. This journal becomes a resource for future investment decisions.

7. **Benchmark:** Complete when you have made investments in at least two asset classes that were previously absent from your portfolio, with documentation of each purchase.` },
        { title: 'Rebalance your portfolio annually to maintain target allocations', done: false,
          description: `**Why does this matter?**

Over time, different asset classes grow at different rates, causing your portfolio to drift from its target allocation. If equities surge, they may grow from your target of 50% to 65% of your portfolio — leaving you over-concentrated in volatile assets. Rebalancing is the disciplined practice of selling what has grown beyond its target and buying what has fallen below, systematically enforcing the "buy low, sell high" principle. Without annual rebalancing, your portfolio gradually becomes a reflection of market momentum rather than your deliberate risk strategy.

---

**How do I accomplish this?**

1. **Set an annual rebalancing date.** Choose a specific date each year — your birthday, the Islamic new year, or any memorable date — as your annual portfolio review and rebalancing day.

2. **Calculate current allocations.** Log into each account and record the current market value of each asset class. Calculate the percentage each represents of your total portfolio.

3. **Compare to targets.** Identify which asset classes are over-weight (above target) and which are under-weight (below target).

4. **Determine if rebalancing is needed.** A common threshold is 5 percentage points — if any asset class has drifted more than 5 points from its target, rebalancing is warranted.

5. **Execute the rebalance.** Sell portions of over-weight asset classes and use the proceeds to buy under-weight ones. Alternatively, direct new contributions entirely toward under-weight classes until balance is restored.

6. **Consider tax implications.** In some jurisdictions, selling assets triggers taxable events. Understand the tax consequences before rebalancing and consider rebalancing through new contributions when possible.

7. **Benchmark:** Complete when you have conducted your first annual portfolio review, compared current allocations to targets, and executed any necessary rebalancing trades.` },
        { title: 'Monitor each asset class for ongoing Shariah compliance', done: false,
          description: `**Why does this matter?**

Shariah compliance is not a one-time certification — it requires ongoing vigilance. Companies that were halal when you invested may later take on excessive debt, enter prohibited industries, or change their revenue composition in ways that violate screening criteria. Sukuk issuers may restructure in non-compliant ways. Real estate investments may involve tenants in haram businesses. Continuous monitoring protects your portfolio from gradually drifting into non-compliance while you assume everything remains as it was when you first invested.

---

**How do I accomplish this?**

1. **Subscribe to screening updates.** If you use a halal screening service (Islamicly, Zoya, Musaffa), enable notifications for changes in the compliance status of your holdings.

2. **Review your equity holdings quarterly.** Check whether any stocks in your halal ETF or fund have been removed for non-compliance. Review the fund manager's quarterly compliance report if published.

3. **Monitor sukuk terms.** Ensure the sukuk you hold have not been restructured. Check for any news about the issuer's financial health or compliance status.

4. **Verify real estate compliance.** If you hold rental property, ensure tenants are not operating haram businesses. If you hold a REIT, review the underlying properties periodically.

5. **Calculate and distribute purification.** If any of your halal investments earned impermissible income (most screening standards allow up to 5%), calculate the purification amount and donate it to charity. This is obligatory, not optional.

6. **Stay informed.** Follow reputable Islamic finance publications and scholars for updates on compliance methodologies, new fatwas, and emerging issues in Islamic investment.

7. **Benchmark:** Complete when you have established a monitoring system for each asset class, set up screening notifications, and distributed any required purification amounts.` },
      ],
    },
    {
      title: 'Achieve full financial independence — passive income covers all living expenses without active work',
      priority: 'low', tags: ['financial-independence', 'goals'],
      description: 'Financial independence means your halal passive income (rental properties, business profits, investment returns) covers all living expenses without requiring active employment. This frees your time for worship, family, community service, and pursuing your highest-impact work — the ultimate expression of Hifz al-Mal.',
      subtasks: [
        { title: 'Calculate your financial independence number (annual expenses / expected return rate)', done: false,
          description: `**Why does this matter?**

Financial independence is not a vague aspiration — it is a specific number. Your "FI number" is the amount of invested capital needed to generate enough passive income to cover all your living expenses indefinitely, without requiring active employment. Knowing this number transforms financial independence from a dream into a measurable target you can plan toward with precision. Without calculating it, you are driving toward a destination without knowing how far away it is, making it impossible to estimate when you will arrive or whether your current pace is sufficient.

---

**How do I accomplish this?**

1. **Calculate your annual expenses.** Take your monthly essential and discretionary spending (from your budget) and multiply by 12. Include zakah, as this obligation does not disappear in retirement.

2. **Add a comfort margin.** Your FI number should cover not just survival but a dignified, comfortable life. Add 10-20% above bare necessities for quality of life, unexpected expenses, and generosity.

3. **Determine your expected halal return rate.** Research historical returns for your target portfolio allocation. A diversified halal portfolio might conservatively return 5-7% annually. Use the conservative end for planning safety.

4. **Apply the formula.** FI Number = Annual Expenses / Expected Return Rate. For example, if your annual expenses are 60,000 and you expect 5% returns, your FI number is 60,000 / 0.05 = 1,200,000.

5. **Alternatively, use the "25x rule."** A simpler approach: multiply your annual expenses by 25 (which assumes a 4% withdrawal rate). This is slightly more conservative and widely used.

6. **Write the number down.** This is your ultimate financial target. It may seem large, but compound growth makes seemingly impossible numbers achievable over time.

7. **Benchmark:** Complete when you have calculated your specific FI number using your actual expenses and a conservative halal return rate, documented with the supporting calculations.` },
        { title: 'Map out a realistic timeline to reach that number based on current savings rate', done: false,
          description: `**Why does this matter?**

Knowing your FI number without knowing when you will reach it is like knowing the distance to your destination but not your speed. Mapping a realistic timeline reveals whether your current savings rate will get you there in 10 years, 20 years, or 40 years — and what changes could accelerate the journey. This exercise often produces a powerful motivational insight: relatively modest increases in savings rate can shave years off the timeline. It also provides honest clarity — if the timeline is 30+ years, you may need to fundamentally increase your income or reduce your expenses rather than relying solely on incremental saving.

---

**How do I accomplish this?**

1. **Determine your current invested assets.** Sum everything you have already invested in halal instruments — this is your starting point, not zero.

2. **Calculate your annual investment contributions.** How much are you currently investing per year after all other obligations? Be honest about the actual number, not the aspirational one.

3. **Use a compound growth calculator.** Input your starting balance, annual contribution, and expected return rate. Many free online calculators can project when you will reach your FI number.

4. **Run multiple scenarios.** Calculate the timeline at your current savings rate, then at 25% higher, and 50% higher. See how dramatically increased contributions compress the timeline.

5. **Factor in income growth.** If you expect your income to grow over time (career progression, business growth), model a scenario where contributions increase by a conservative percentage annually.

6. **Accept the result honestly.** If the timeline is longer than you hoped, use it as motivation to increase income or reduce expenses. If it is shorter than expected, verify your assumptions are conservative enough.

7. **Benchmark:** Complete when you have a specific projected date for reaching financial independence based on current savings rate, plus alternative scenarios showing how changes would accelerate the timeline.` },
        { title: 'Identify and build the passive income streams that will fund your independence', done: false,
          description: `**Why does this matter?**

Financial independence is sustained by passive income — money that flows to you without daily active effort. The quality, diversity, and reliability of your passive income streams determine whether your independence is robust or fragile. A single stream (e.g., only rental income) leaves you vulnerable to a single point of failure. Multiple halal passive income streams — rental property, investment dividends, business profits from a manager-run enterprise, sukuk returns — create the resilience needed to sustain independence through economic cycles and personal circumstances.

---

**How do I accomplish this?**

1. **Inventory your current passive income.** List any income you currently receive without active daily work: investment dividends, rental income, business profit distributions, royalties, or profit-sharing returns.

2. **Identify gaps relative to your FI expenses.** How much of your annual expense target is already covered by existing passive income? The gap is what you need to build.

3. **Evaluate potential streams.** Consider: rental property (requires capital and management), dividend-paying halal equities (requires portfolio size), sukuk yields (requires significant capital), business income from a hired manager (requires business development), or digital assets that generate revenue.

4. **Prioritise by feasibility and return.** Rank each potential stream by how accessible it is given your current resources, skills, and timeline. Start building the most feasible one first.

5. **Build incrementally.** You do not need all streams operational at once. Add one every 1-2 years, gradually increasing your passive income until it crosses the threshold of covering all expenses.

6. **Ensure Shariah compliance for each stream.** Every passive income source must be halal — no riba, no haram tenants, no prohibited business activities.

7. **Benchmark:** Complete when you have identified at least three specific passive income streams you will build, with a phased timeline for developing each one.` },
        { title: 'Stress-test your plan against inflation, market downturns, and life changes', done: false,
          description: `**Why does this matter?**

Every financial plan works on paper. The question is whether it survives reality — inflation that erodes purchasing power, market crashes that slash portfolio values, health crises that spike expenses, or family changes that reshape your obligations. Stress-testing your FI plan against these scenarios before they happen reveals vulnerabilities and gives you time to build defences. The wisest traveller prepares for storms, not just fair weather. Tawakkul (reliance on Allah) does not mean ignoring foreseeable risks — it means preparing thoroughly and then trusting that Allah will see you through what you cannot foresee.

---

**How do I accomplish this?**

1. **Test against inflation.** Recalculate your FI number assuming your annual expenses increase by 3-4% per year. Does your investment return rate still exceed your expense growth? If not, your purchasing power erodes over time.

2. **Test against a major market downturn.** What happens if your portfolio drops 30-40% in the first year of independence (the "sequence of returns risk")? Would your passive income still cover expenses, or would you need to sell assets at a loss?

3. **Test against a health crisis.** What if a major medical expense consumes six months of living costs? Does your emergency fund and insurance coverage handle this, or does it derail your independence?

4. **Test against family changes.** What if you need to support an aging parent, a child's education costs spike, or your family size increases? How does your FI number change?

5. **Build contingencies.** For each vulnerability identified, develop a mitigation strategy: higher emergency fund, insurance coverage, a more conservative withdrawal rate, or a willingness to take on part-time halal work during downturns.

6. **Benchmark:** Complete when you have stress-tested your FI plan against at least four scenarios (inflation, market downturn, health crisis, family change) and developed a mitigation strategy for each identified vulnerability.` },
        { title: 'Define what you will do with your time once financial independence is achieved', done: false,
          description: `**Why does this matter?**

Financial independence is not the destination — it is the vehicle that enables the destination. Without a clear vision of how you will spend your time when work becomes optional, many people who achieve FI find themselves directionless, purposeless, or even depressed. In Islam, time is an amanah (trust) from Allah, and wasting it is a form of ingratitude. Financial independence should liberate your time for higher purposes: deeper worship, service to the ummah, mentorship, knowledge-seeking, family presence, and work that you choose for its impact rather than its paycheck. Defining this vision now infuses your financial journey with meaning.

---

**How do I accomplish this?**

1. **Reflect on your deepest aspirations.** If money were no concern, how would you spend your days? What problems would you solve? What knowledge would you pursue? What relationships would you deepen?

2. **Categorise your time vision.** Divide your ideal post-FI life into domains: worship and spiritual development, family and relationships, community service and dawah, knowledge and skill-building, creative work or passion projects, and health and well-being.

3. **Assign rough time allocations.** How many hours per week would you dedicate to each domain? This transforms a vague vision into a tangible weekly structure.

4. **Identify purpose-driven work.** Financial independence does not require you to stop working — it allows you to choose work based on impact and meaning rather than salary. What would you do if you were paid nothing?

5. **Connect to your legacy goal.** Review your 10-year legacy goal. How does financial independence enable it? Ensure your time vision actively builds toward the legacy you defined.

6. **Write a "post-FI mission statement."** In 2-3 sentences, describe the life you will live when financial independence is achieved. This becomes the motivational anchor for the years of disciplined saving and investing ahead.

7. **Benchmark:** Complete when you have a written post-FI vision covering how you will allocate your time across worship, family, community service, and purpose-driven work, connected to your legacy goal.` },
      ],
    },
  ],

  
// ── OWNERSHIP & RIGHTS ──
  wealth_ownership_core: [
    {
      title: 'Draft an Islamic Will (Wasiyyah) — ensure your estate distributes according to Quran 4:11–12',
      priority: 'urgent', tags: ['wasiyyah', 'estate'],
      description: 'Every Muslim with assets must have a valid Islamic will. Without one, secular probate law may distribute your estate in a way that violates the Quranic inheritance shares (fara\'id). A wasiyyah ensures your wealth passes to the right people in the right proportions as commanded by Allah.',
      subtasks: [
        { title: 'Learn the Quranic inheritance shares for your specific family structure (4:11-12, 4:176)', done: false,
          sources: `**I. Sources from the Hadith**


### Sahih Bukhari 6736
Narrated Huzail bin Shirahbil:Abu Musa was asked regarding (the inheritance of) a daughter, a son's daughter, and a sister. He said, "The daughter will take one-half and the sister will take one-half. If you go to Ibn Mas\`ud, he will tell you the same." Ibn Mas\`ud was asked and was told of Abu Musa's verdict. Ibn Mas\`ud then said, "If I give the same verdict, I would stray and would not be of the rightly-guided. The verdict I will give in this case, will be the same as the Prophet (ﷺ) did, i.e. one-half is for daughter, and one-sixth for the son's daughter, i.e. both shares make two-thirds of the total property; and the rest is for the sister." Afterwards we cams to Abu Musa and informed him of Ibn Mas\`ud's verdict, whereupon he said, "So, do not ask me for verdicts, as long as this learned man is among you
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

The Quranic inheritance shares are not suggestions — they are divine commands with precise fractions assigned to specific relatives. Without understanding these shares as they apply to your particular family structure (spouse, parents, children, siblings), you cannot draft a valid wasiyyah or ensure your estate will be distributed as Allah decreed. Every family configuration produces a different calculation, so generic knowledge is not enough.

---

**How do I accomplish this?**

1. **Read the primary verses.** Study Surah An-Nisa 4:11-12 and 4:176 carefully, noting which relatives receive which fractions (e.g., daughters, parents, spouses).

2. **Map your family tree.** Write out every living relative who could qualify as an heir under Islamic law — spouse, children, parents, siblings, grandparents.

3. **Apply the shares to your structure.** Using a fara'id reference or calculator, determine who inherits what fraction given your specific family configuration.

4. **Note edge cases.** Understand how shares shift when certain relatives are present or absent (e.g., a mother's share changes depending on whether the deceased has children).

5. **Consult a knowledgeable source.** If your family structure is complex (e.g., multiple marriages, orphaned grandchildren), seek scholarly guidance to verify your calculations.

6. **Benchmark:** You have completed this step when you can state, for your current family structure, the exact Quranic share each heir would receive.` },
        { title: 'List all assets that will form part of your estate', done: false,
          description: `**Why does this matter?**

An Islamic will can only distribute what it accounts for. If assets are missing from your estate inventory — whether a forgotten savings account, a piece of jewellery, or a share in a family property — those assets risk being distributed by secular default rules rather than Quranic shares. A complete and honest inventory is the foundation upon which the entire wasiyyah rests.

---

**How do I accomplish this?**

1. **Categorise your assets.** Create sections for: real estate, vehicles, bank accounts, investment accounts, retirement funds, business interests, precious metals, valuable personal property, and digital assets.

2. **Include debts and liabilities.** Islamic law requires debts to be settled before inheritance distribution, so list all outstanding debts (mortgage, loans, credit).

3. **Note jointly held assets.** Identify which assets are solely yours versus jointly owned, as only your share enters the estate.

4. **Record approximate values.** You do not need professional appraisals at this stage, but reasonable estimates help the estate planner structure the wasiyyah.

5. **Include non-obvious assets.** Life insurance payouts, intellectual property, pending receivables, and digital accounts (cryptocurrency, domain names) are often overlooked.

6. **Update regularly.** Treat this as a living document — review it annually or whenever you acquire or dispose of a significant asset.

7. **Benchmark:** You have completed this step when you have a single document listing every asset and liability you own, categorised and roughly valued.` },
        { title: 'Consult a scholar or Islamic estate planner to draft the wasiyyah', done: false,
          description: `**Why does this matter?**

While understanding inheritance shares is your personal responsibility, the actual drafting of a wasiyyah requires expertise in both Islamic jurisprudence and the legal framework of your jurisdiction. A scholar ensures Shariah compliance — correct share allocation, valid bequest conditions — while an estate planner ensures the document will be enforceable in court. Without both, your will may be either Islamically invalid or legally unenforceable.

---

**How do I accomplish this?**

1. **Find a qualified advisor.** Look for an Islamic estate planner or a scholar with specific training in fara'id. Many Islamic finance organisations maintain referral lists.

2. **Prepare your materials.** Bring your family tree, asset inventory, and any existing secular will or estate documents to the consultation.

3. **Discuss your bequest intentions.** If you wish to allocate the optional one-third (wasiyyah) to charity or non-heirs, discuss this with the scholar to ensure it is structured correctly.

4. **Address jurisdiction-specific issues.** Ask how your country's probate law interacts with Islamic inheritance — some jurisdictions recognise Islamic wills, others require supplementary legal structures.

5. **Review the draft carefully.** Before signing, ensure every share matches what the Quran prescribes for your family structure and that no heir is unlawfully excluded or favoured.

6. **Benchmark:** You have completed this step when you hold a professionally drafted wasiyyah that has been reviewed for both Shariah compliance and legal validity.` },
        { title: 'Include the optional bequest (up to 1/3) for charitable or non-heir purposes', done: false,
          description: `**Why does this matter?**

The Prophet (peace be upon him) permitted a bequest of up to one-third of the estate for purposes beyond the fixed Quranic shares — charitable causes, non-heir relatives in need, or community projects. This is one of the few areas where you have discretionary control over your estate distribution. Using it wisely is a final act of sadaqah and strategic generosity that can generate ongoing reward (sadaqah jariyah) after your death.

---

**How do I accomplish this?**

1. **Understand the limits.** The bequest (wasiyyah) cannot exceed one-third of the net estate (after debts). The Prophet (peace be upon him) told Sa'd ibn Abi Waqqas: "One-third, and one-third is much."

2. **Identify worthy causes.** Consider: supporting a masjid, funding education for orphans, endowing a waqf, assisting non-heir relatives who are in financial need, or supporting Islamic institutions.

3. **Do not bequeath to heirs.** A bequest to someone who already receives a Quranic share is invalid unless all other heirs consent. Direct your bequest to non-heirs or charitable purposes.

4. **Be specific.** Vague bequests ("give some to charity") create disputes. Name the organisations, individuals, or causes and specify amounts or percentages.

5. **Consult your scholar.** Have the bequest clause reviewed for Shariah compliance before incorporating it into the wasiyyah.

6. **Benchmark:** You have completed this step when your wasiyyah includes a clearly defined bequest clause that allocates up to one-third of your estate to specific non-heir beneficiaries or charitable causes.` },
        { title: 'Have the will legally validated and witnessed according to local law', done: false,
          description: `**Why does this matter?**

A wasiyyah that is Islamically sound but legally unrecognised in your jurisdiction is effectively unenforceable. If your will does not meet local requirements for validity — proper witnessing, notarisation, or registration — a court may disregard it and apply default probate rules, potentially overriding the Quranic shares you intended. Legal validation is the bridge between divine law and practical enforcement.

---

**How do I accomplish this?**

1. **Research your jurisdiction's requirements.** Wills typically require a minimum number of witnesses (usually two), specific signing procedures, and sometimes notarisation. Some jurisdictions require registration with a court or government body.

2. **Choose appropriate witnesses.** Witnesses should be adults of sound mind who are not beneficiaries of the will. In Islamic tradition, trustworthy witnesses are preferred.

3. **Sign in the presence of witnesses.** All parties — testator and witnesses — should sign the document together, with each person seeing the others sign.

4. **Notarise if required.** In some jurisdictions, notarisation adds an extra layer of legal protection and makes the will harder to contest.

5. **Obtain legal counsel.** Have a lawyer in your jurisdiction confirm that the document meets all formal requirements for enforceability.

6. **Benchmark:** You have completed this step when your wasiyyah has been signed, witnessed, and (if required) notarised in full compliance with your jurisdiction's legal requirements.` },
        { title: 'Store the will securely and inform your executor of its location', done: false,
          description: `**Why does this matter?**

A perfectly drafted wasiyyah is useless if no one can find it when it is needed. If your executor does not know the will exists or cannot access it, your estate will be distributed by default legal rules — not by your Islamic instructions. Secure storage protects the document from loss, damage, or tampering, while informing your executor ensures it will be acted upon promptly.

---

**How do I accomplish this?**

1. **Choose secure storage.** Options include a fireproof safe at home, a bank safe deposit box, or your lawyer's office. Each has trade-offs: a home safe is accessible but vulnerable to disaster, while a bank box may be sealed upon death pending legal process.

2. **Create certified copies.** Make at least two copies — one for your executor, one for your lawyer or a trusted family member. Mark the original clearly.

3. **Appoint your executor.** Choose someone trustworthy (amin), capable, and willing. Inform them clearly that they have been named executor and explain their responsibilities.

4. **Provide access instructions.** Tell your executor exactly where the original is stored, how to access it (keys, passwords, legal procedures), and who else has copies.

5. **Review periodically.** Each time you update the wasiyyah, ensure the new version replaces the old in all storage locations and that your executor is informed of changes.

6. **Benchmark:** You have completed this step when your executor can tell you, without prompting, where your will is stored and how to access it.` },
      ],
    },
    {
      title: 'Confirm all major assets (property, vehicles, accounts) have clear, legitimate title in your name',
      priority: 'high', tags: ['ownership', 'legal'],
      description: 'Clear ownership is a prerequisite for Islamic inheritance, zakah calculation, and lawful transaction. Verify that the title or registration for every major asset you own is properly documented, legally valid, and free from disputes or ambiguity.',
      subtasks: [
        { title: 'List all major assets: real estate, vehicles, bank accounts, investments, valuables', done: false,
          description: `**Why does this matter?**

You cannot confirm ownership of assets you have not identified. A comprehensive inventory is the starting point for verifying that every significant thing you own is properly documented in your name. This list also serves as the foundation for zakah calculation, estate planning, and financial clarity — all of which depend on knowing exactly what you possess.

---

**How do I accomplish this?**

1. **Create categories.** Organise your list into: real estate (land, homes, commercial property), vehicles (cars, motorcycles), financial accounts (bank, brokerage, retirement), investments (stocks, bonds, mutual funds, crypto), and valuables (gold, jewellery, art, collectibles).

2. **Walk through each category systematically.** For each, list every item with its approximate value and where the ownership documentation is held.

3. **Include overlooked assets.** Think about digital assets, intellectual property, business equity, life insurance policies, and any assets held in trust or on behalf of others.

4. **Note joint ownership.** For any asset held jointly with a spouse, family member, or business partner, record the co-owner and the nature of the arrangement.

5. **Benchmark:** You have completed this step when you have a single, organised document listing every major asset you own or co-own, with approximate values and documentation locations noted.` },
        { title: 'Verify title documentation for each asset (deeds, registrations, account statements)', done: false,
          description: `**Why does this matter?**

Possessing an asset is not the same as having clear, documented title to it. Without proper documentation — deeds, vehicle registrations, account statements showing your name — you may face legal challenges, inheritance complications, or disputes. In Islamic law, clear ownership is a prerequisite for valid transactions, zakah obligations, and inheritance distribution.

---

**How do I accomplish this?**

1. **Gather existing documents.** For each asset on your list, locate the title deed, registration certificate, account statement, or purchase agreement that proves your ownership.

2. **Check that names match.** Verify that the name on the document matches your legal name exactly. Discrepancies (maiden names, misspellings, outdated addresses) can cause legal issues.

3. **Confirm currency.** Ensure documents are up to date — vehicle registrations renewed, property tax records current, investment account statements recent.

4. **Identify gaps.** For any asset where you cannot locate documentation or the documentation is incomplete, flag it for resolution.

5. **Create a documentation index.** Record where each document is stored (physical location or digital folder) so you or your heirs can find them quickly.

6. **Benchmark:** You have completed this step when every asset on your inventory has corresponding, current documentation that clearly shows you as the legal owner.` },
        { title: 'Identify any assets with unclear, shared, or disputed ownership', done: false,
          description: `**Why does this matter?**

Assets with ambiguous ownership are a source of potential injustice (zulm). If you claim ownership of something that is rightfully shared or belongs to someone else, you carry that burden. Conversely, if an asset you legitimately own is not properly documented, your heirs may lose it. Identifying these grey areas now prevents disputes, protects relationships, and ensures your financial affairs are clean before Allah.

---

**How do I accomplish this?**

1. **Review your asset list with honesty.** For each item, ask: "Is my ownership of this undisputed and clearly documented?"

2. **Flag common problem areas.** Family property passed down informally, assets purchased with mixed funds, business assets used personally, gifts where ownership was never formally transferred, and inherited items that were never legally re-titled.

3. **Consider shared assets.** Joint bank accounts, co-owned property, or business partnerships where ownership percentages were never formalised.

4. **Ask affected parties.** If a family member or business partner might have a legitimate claim to an asset, have an honest conversation about it.

5. **Document your findings.** Create a separate list of all flagged assets with a brief note explaining the nature of the ambiguity.

6. **Benchmark:** You have completed this step when you have a clear list of every asset whose ownership is not fully documented, shared without formal agreement, or potentially disputed.` },
        { title: 'Take action to resolve any title issues (legal transfer, documentation, registration)', done: false,
          description: `**Why does this matter?**

Identifying unclear ownership is only half the work — the other half is resolving it. Leaving title issues unresolved means you may be benefiting from something that is not fully yours, or that your heirs will face costly legal battles to establish their rights. The Prophet (peace be upon him) warned against consuming the rights of others. Resolving these matters is an act of justice and a protection for your family.

---

**How do I accomplish this?**

1. **Prioritise by impact.** Start with high-value assets (real estate, major investments) and those most likely to cause family disputes.

2. **Determine the correct resolution.** Options include: formal legal transfer to your name, creating a written co-ownership agreement, returning the asset to its rightful owner, or registering an asset that was never properly registered.

3. **Engage professional help.** For real estate title issues, consult a property lawyer. For business ownership disputes, consult a commercial lawyer. For inherited assets, you may need both a scholar and a lawyer.

4. **Document every resolution.** Keep written records of all transfers, agreements, and resolutions — signed by all relevant parties.

5. **Update your asset inventory.** Once resolved, update your master asset list to reflect the corrected ownership status.

6. **Benchmark:** You have completed this step when every flagged asset from the previous step has been resolved with proper documentation, and no asset in your inventory has disputed or unclear title.` },
      ],
    },
    {
      title: 'Learn the Islamic rules of ownership — what you can and cannot own, and your obligations as an owner',
      priority: 'high', tags: ['fiqh', 'ownership'],
      description: 'In Islam, ownership is a trust (amanah) — you are a steward, not an absolute owner. Study what categories of property and assets can be privately owned, the rights of others upon your wealth (zakah, nafaqah, community dues), and the prohibitions against hoarding (kanz) and monopoly (ihtikar).',
      subtasks: [
        { title: 'Study the concept of ownership as stewardship (khilafah) in Islamic law', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (3:79)
**Arabic:** 
**Translation:** It is not (possible) for any human being to whom Allâh has given the Book and Al-Hukm (the knowledge and understanding of the laws of religion) and Prophethood to say to the people: "Be my worshippers rather than Allâh’s." On the contrary (he would say): "Be you Rabbâniyyûn (learned men of religion who practise what they know and also preach others), because you are teaching the Book, and you are studying it."

### Ayah (5:44)
**Arabic:** 
**Translation:** It was We who revealed the law (to Moses): therein was guidance and light. By its standard have been judged the Jews, by the prophets who bowed (as in Islam) to Allah's will, by the rabbis and the doctors of law: for to them was entrusted the protection of Allah's book, and they were witnesses thereto: therefore fear not men, but fear me, and sell not my signs for a miserable price. If any do fail to judge by (the light of) what Allah hath revealed, they are (no better than) Unbelievers.

**II. Sources from the Hadith**


### Sahih Bukhari 2946
Narrated Abu Huraira:Allah's Apostle said, " I have been ordered to fight with the people till they say, 'None has the right to be worshipped but Allah,' and whoever says, 'None has the right to be worshipped but Allah,' his life and property will be saved by me except for Islamic law, and his accounts will be with Allah, (either to punish him or to forgive him)
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

The Islamic conception of ownership is fundamentally different from the Western notion of absolute private property. In Islam, all wealth belongs to Allah, and humans are stewards (khulafa) entrusted with managing it according to divine guidance. Understanding this transforms how you relate to your possessions — from "this is mine to do with as I please" to "this is a trust I will be questioned about." This shift in mindset is the foundation of all Islamic financial ethics.

---

**How do I accomplish this?**

1. **Study the Quranic basis.** Read verses establishing Allah's ultimate ownership of all things (e.g., 24:33 — "Give them from the wealth of Allah which He has given you") and human stewardship (2:30 — khalifah on earth).

2. **Understand istikhlaf.** Study the concept of istikhlaf (vicegerency) — that wealth is temporarily placed in your hands and you will be questioned about how you earned, spent, and preserved it.

3. **Read scholarly commentary.** Explore how classical scholars like Al-Ghazali (Ihya Ulum al-Din, Book on Wealth) and Ibn Khaldun discussed the relationship between ownership and social responsibility.

4. **Reflect on practical implications.** How does stewardship change your spending decisions, your attitude toward luxury, your willingness to share?

5. **Benchmark:** You have completed this step when you can articulate, in your own words, how Islamic stewardship differs from absolute ownership and what obligations it places on you.` },
        { title: 'Learn what categories of property cannot be privately owned (e.g., public water sources)', done: false,
          description: `**Why does this matter?**

Islamic law recognises categories of property that belong to the community and cannot be privately monopolised. The Prophet (peace be upon him) said: "People are partners in three things: water, pasture, and fire" (Abu Dawud). Understanding these categories prevents you from inadvertently claiming private ownership over resources that are communal rights, and helps you advocate for just resource distribution in your community.

---

**How do I accomplish this?**

1. **Study the hadith on shared resources.** Begin with the hadith on water, pasture, and fire — understand these as categories (essential shared resources), not an exhaustive list.

2. **Learn the fiqhi classifications.** Islamic jurists classify property into: privately ownable, state-owned (bayt al-mal), communal (public goods), and unownable (e.g., air, sunlight). Study how each category is defined.

3. **Understand modern applications.** Scholars have extended these principles to public utilities, natural resources, and infrastructure. How do these principles apply to water rights, mineral resources, or public land in your context?

4. **Examine monopoly (ihtikar).** Learn how the prohibition of monopolising essential goods connects to the concept of communal property — both protect the community from exploitation.

5. **Benchmark:** You have completed this step when you can list the major categories of non-private property in Islamic law and explain the reasoning behind each classification.` },
        { title: 'Understand the prohibition of hoarding (kanz) and its conditions', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (9:35)
**Arabic:** 
**Translation:** On the Day when that (Al-Kanz: money, gold and silver the Zakât of which has not been paid) will be heated in the Fire of Hell and with it will be branded their foreheads, their flanks, and their backs, (and it will be said unto them): "This is the treasure which you hoarded for yourselves. Now taste of what you used to hoard."`,
          description: `**Why does this matter?**

Allah warns in Surah At-Tawbah (9:34-35) against those who hoard gold and silver and do not spend in His way — promising a painful punishment. However, "hoarding" in Islamic law has specific conditions: it does not mean merely saving money, but rather accumulating wealth while refusing to pay zakah and withholding it from beneficial circulation. Understanding this distinction prevents both extremes — reckless spending out of fear of hoarding, or complacent accumulation without fulfulling obligations.

---

**How do I accomplish this?**

1. **Read the primary text.** Study Surah At-Tawbah 9:34-35 and its tafsir (exegesis) to understand the specific context and conditions of the warning.

2. **Distinguish kanz from saving.** Learn the scholarly distinction: wealth on which zakah is paid is not kanz, even if it is large. Kanz specifically refers to wealth withheld from its obligatory dues.

3. **Study the economic rationale.** Islam encourages wealth circulation (tadawul) to prevent economic stagnation. Hoarding removes money from productive use and harms the community.

4. **Examine your own wealth.** Ask: Am I paying zakah on all eligible assets? Am I withholding wealth from legitimate obligations (nafaqah, debts, community needs)? Am I letting money sit idle when it could be productively invested?

5. **Benchmark:** You have completed this step when you can clearly explain what constitutes kanz versus legitimate saving in Islamic law, and have verified that your own wealth does not fall into the prohibited category.` },
        { title: 'Review the rights others have upon your wealth (zakah, nafaqah, debts)', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (16:71)
**Arabic:** 
**Translation:** And Allâh has preferred some of you above others in wealth and properties. Then, those who are preferred will by no means hand over their wealth and properties to those (slaves) whom their right hands possess, so that they may be equal with them in respect thereof. Do they then deny the Favour of Allâh?`,
          description: `**Why does this matter?**

In Islam, your wealth is not exclusively yours. Allah has placed rights within it that belong to others — the poor (through zakah), your dependents (through nafaqah), your creditors (through debt repayment), and your community (through general obligations). Failing to honour these rights means you are withholding what does not belong to you, regardless of how much you have earned through your own effort. Recognising these obligations reframes wealth as a shared trust.

---

**How do I accomplish this?**

1. **Map your obligatory dues.** List every category of financial obligation you bear: zakah on savings, investments, and business assets; nafaqah for spouse, children, and dependent parents; outstanding debts to creditors.

2. **Understand zakah in detail.** Learn the nisab threshold, the 2.5% rate on savings, and the varying rates for other asset types (agricultural produce, livestock, minerals). Know when your zakah year begins.

3. **Review nafaqah obligations.** Islamic law obligates you to provide for your wife, children, and in some cases elderly parents and other relatives. Understand the scope and standard of provision required.

4. **Prioritise debt repayment.** The Prophet (peace be upon him) treated debt with extreme seriousness. Review all outstanding debts and create a plan to settle them.

5. **Consider voluntary obligations.** Beyond the mandatory rights, there are recommended acts of generosity — sadaqah, lending without interest (qard hasan), and supporting community institutions.

6. **Benchmark:** You have completed this step when you can list every financial right others have upon your wealth, confirm whether you are fulfilling each one, and identify any gaps.` },
        { title: 'Summarise key ownership principles for personal reference', done: false,
          description: `**Why does this matter?**

Knowledge that is not consolidated is easily forgotten. After studying the various dimensions of Islamic ownership — stewardship, communal property, hoarding, and the rights of others — you need a concise personal reference document that captures the principles most relevant to your life. This becomes a practical guide you can consult when making financial decisions, evaluating new opportunities, or teaching your family.

---

**How do I accomplish this?**

1. **Review your notes.** Go through everything you learned in the previous subtasks and identify the core principles that most affect your day-to-day financial life.

2. **Organise by theme.** Group principles into categories such as: foundational beliefs (stewardship, ultimate divine ownership), prohibitions (hoarding, monopoly, riba), obligations (zakah, nafaqah, debts), and communal rights.

3. **Write concisely.** For each principle, write one to three sentences capturing the essence — what the principle is, its basis in Quran or Sunnah, and how it applies to you specifically.

4. **Include practical checkpoints.** Add questions you can ask yourself before major financial decisions: "Am I fulfilling all rights upon this wealth? Is this transaction free from ambiguity and injustice? Does this serve my role as a steward?"

5. **Store it accessibly.** Keep this reference where you will actually use it — in your financial planning folder, your personal knowledge base, or printed near your workspace.

6. **Benchmark:** You have completed this step when you have a concise, well-organised document summarising Islamic ownership principles that you can reference without needing to re-study the original sources.` },
      ],
    },
    {
      title: 'Identify any property or assets obtained through unclear or disputed means — resolve them',
      priority: 'high', tags: ['ownership', 'integrity'],
      description: 'Assets acquired through ambiguous transactions, family disputes, or informal arrangements may not be rightfully yours in the eyes of Shariah. Identify any such assets and take steps to clarify ownership — even if it means returning something to its rightful owner — as clean ownership is essential for barakah.',
      subtasks: [
        { title: 'Review how each major asset was acquired — purchase, gift, inheritance, or informal transfer', done: false,
          description: `**Why does this matter?**

The legitimacy of your ownership begins at the point of acquisition. In Islamic law, how you obtained an asset matters as much as whether you currently possess it. An asset acquired through a valid sale, a genuine gift (hibah), or proper inheritance is halal to own. But assets obtained through unclear informal transfers, family pressure, or ambiguous arrangements may carry unresolved rights of others. Tracing the acquisition history of each asset is the first step in ensuring your wealth is clean.

---

**How do I accomplish this?**

1. **Use your asset inventory.** Take the master list of assets you compiled earlier and add a column for "How Acquired."

2. **Categorise each acquisition.** For every asset, note whether it was: purchased (from whom, when, at what price), received as a gift (from whom, under what circumstances), inherited (through which estate, was fara'id applied), or transferred informally (verbal agreement, family arrangement).

3. **Gather supporting evidence.** For purchases, locate receipts or contracts. For gifts, recall whether conditions were attached. For inheritances, check whether the estate was distributed according to Islamic law.

4. **Be honest with yourself.** If you are unsure how an asset came to you, or if the transaction involved pressure, ambiguity, or informal handshakes without documentation, mark it for further review.

5. **Benchmark:** You have completed this step when every asset on your list has a documented acquisition method, and any asset with an unclear or questionable acquisition is flagged for the next step.` },
        { title: 'Flag any asset where the acquisition method was unclear or potentially disputed', done: false,
          description: `**Why does this matter?**

Self-honesty is the core of this exercise. Flagging assets with unclear acquisition is not an accusation of wrongdoing — it is an act of taqwa (God-consciousness). The Prophet (peace be upon him) said: "Leave that which makes you doubt for that which does not make you doubt" (Tirmidhi). By explicitly identifying grey areas, you create a clear path to resolution rather than living with lingering uncertainty about whether your wealth is truly halal.

---

**How do I accomplish this?**

1. **Review the flagged items from the previous step.** Any asset marked as "unclear" or "informal" deserves closer examination.

2. **Apply specific criteria.** Flag an asset if: you cannot prove how it came to you, another family member might have a legitimate claim, the original transaction involved no written agreement, the inheritance was distributed without consulting fara'id, or the gift had conditions that were never formalised.

3. **Include emotionally difficult cases.** Sometimes the most disputed assets are within families — a parent's house, a shared business, land passed down verbally. Do not avoid these because they are uncomfortable.

4. **Assess the severity.** For each flagged asset, note whether the issue is minor (e.g., missing paperwork for a legitimate purchase) or major (e.g., a family property where multiple siblings have unresolved claims).

5. **Create a resolution priority list.** Rank flagged assets by value and severity of the dispute to guide your next steps.

6. **Benchmark:** You have completed this step when you have a clear, prioritised list of every asset with ownership ambiguity, along with a brief description of what makes each one unclear.` },
        { title: 'Consult affected parties and, if needed, a scholar to determine rightful ownership', done: false,
          description: `**Why does this matter?**

Ownership disputes cannot be resolved in isolation. If another person has a potential claim to an asset, justice (adl) requires that you involve them in the resolution. A scholar provides the Islamic legal framework to determine rightful ownership, while the affected parties provide the facts. Resolving these matters through consultation rather than unilateral decisions protects relationships and ensures the outcome is just in the sight of Allah.

---

**How do I accomplish this?**

1. **Approach affected parties with sincerity.** Frame the conversation as a desire to ensure everyone's rights are honoured, not as a legal confrontation. Use the language of islah (reconciliation).

2. **Present the facts neutrally.** Share what you know about the asset's history and why you believe the ownership is unclear. Listen to the other party's perspective.

3. **Seek scholarly guidance when needed.** If the parties cannot agree, or if the issue involves inheritance law or complex transactions, consult a qualified scholar who can apply the relevant fiqh rulings.

4. **Consider mediation.** For family disputes, a neutral third party (such as a respected community elder or imam) can facilitate a fair resolution without damaging relationships.

5. **Document the outcome.** Whatever is decided — whether you retain ownership, share it, or return it — put the agreement in writing and have all parties sign.

6. **Benchmark:** You have completed this step when every flagged asset has been discussed with the relevant parties, a determination of rightful ownership has been made, and the outcome is documented.` },
        { title: 'Formalise ownership through proper documentation or return the asset if it is not yours', done: false,
          description: `**Why does this matter?**

The resolution determined in the previous step must be acted upon — not merely agreed to in principle. If an asset is rightfully yours, formalise it with proper legal documentation so there is no future ambiguity. If an asset is not rightfully yours, returning it is not a loss — it is an act of justice that purifies your remaining wealth and earns reward from Allah. The Prophet (peace be upon him) said: "Whoever has wronged his brother, let him seek his pardon today before there will be no dinar or dirham" (Bukhari).

---

**How do I accomplish this?**

1. **For assets confirmed as yours.** Obtain proper title documentation — deeds, registration, formal transfer agreements — and update your asset inventory accordingly.

2. **For assets to be returned.** Arrange a fair and dignified transfer. If the asset is physical property, coordinate the handover. If financial, arrange the transfer of funds. Document everything.

3. **For shared assets.** Draft a formal co-ownership agreement specifying each party's share, rights, responsibilities, and procedures for future sale or transfer.

4. **Engage legal professionals.** For high-value assets (real estate, business equity), use a lawyer to ensure transfers and title changes are legally binding.

5. **Update your financial records.** Adjust your asset inventory, zakah calculations, and estate plan to reflect the corrected ownership status.

6. **Benchmark:** You have completed this step when every disputed asset has been either formally documented in your name with proper title, or returned to its rightful owner with a documented transfer, and your financial records are updated accordingly.` },
      ],
    },
    {
      title: 'Ensure all contracts you have signed are free from gharar (ambiguity) and zulm (injustice)',
      priority: 'medium', tags: ['contracts', 'fiqh'],
      description: 'Islam requires that contracts be clear, fair, and free from excessive uncertainty. Review your active contracts — employment agreements, leases, business partnerships, service agreements — to ensure they do not contain hidden terms, unjust clauses, or ambiguity that could harm either party.',
      subtasks: [
        { title: 'Collect all active contracts you are party to (employment, lease, business, service)', done: false,
          description: `**Why does this matter?**

You cannot evaluate what you have not gathered. Many people operate under contracts they have never re-read since signing — employment agreements with restrictive clauses, leases with penalty terms, service agreements with auto-renewal traps. In Islamic law, every contract is a covenant (aqd) that carries moral weight. The first step toward ensuring your contractual life is free from gharar and zulm is to assemble every active agreement in one place so nothing is overlooked.

---

**How do I accomplish this?**

1. **List every contractual relationship.** Think broadly: employment contracts, rental or lease agreements, business partnership agreements, freelance or consulting contracts, insurance policies, subscription services, loan agreements, and any verbal agreements that govern ongoing obligations.

2. **Locate the physical or digital documents.** For each relationship, find the signed contract. Check email archives, filing cabinets, cloud storage, and employer portals.

3. **Note verbal agreements.** If any arrangement operates on a handshake or verbal understanding without written terms, add it to the list and flag it — verbal contracts are valid in Islam but are difficult to enforce and prone to dispute.

4. **Organise by category.** Group contracts into: employment, housing, business, financial services, and personal services. This makes the review process in the next step more systematic.

5. **Record key details.** For each contract, note: the counterparty, the start date, the term or renewal date, and the core obligation on each side.

6. **Benchmark:** You have completed this step when you have a single master list of every active contract you are party to, with the actual documents accessible for review.` },
        { title: 'Review each contract for clarity of terms, obligations, and payment conditions', done: false,
          description: `**Why does this matter?**

A contract that is unclear in its terms is a breeding ground for disputes and potential injustice. The Prophet (peace be upon him) emphasised clarity in transactions — both parties must know exactly what they are agreeing to. Reviewing each contract for clarity ensures that you understand your obligations, the other party's obligations, payment conditions, penalties, and exit terms. If you do not understand what you have agreed to, you cannot fulfil it with integrity.

---

**How do I accomplish this?**

1. **Read each contract in full.** Do not skim. Pay particular attention to sections on: scope of work or service, payment terms and schedule, penalties for late payment or breach, termination and renewal conditions, and dispute resolution mechanisms.

2. **Check for vague language.** Flag any clause that uses imprecise terms like "reasonable effort," "as needed," "to be determined," or "at the discretion of" without clear definitions. These are potential sources of gharar.

3. **Verify payment clarity.** Ensure that every payment obligation specifies: the exact amount or calculation method, the currency, the due date, the payment method, and consequences of non-payment.

4. **Assess mutual understanding.** For each contract, ask: "Could the other party interpret this clause differently than I do?" If yes, the clause needs clarification.

5. **Note your findings.** Create a simple review sheet for each contract listing: clauses that are clear, clauses that are ambiguous, and clauses that may be unfair.

6. **Benchmark:** You have completed this step when you have reviewed every active contract and documented which clauses are clear and which need attention.` },
        { title: 'Identify any clauses involving gharar (ambiguity) or zulm (unfair terms)', done: false,
          description: `**Why does this matter?**

Gharar (excessive uncertainty) and zulm (injustice or oppression) are two of the primary reasons a contract can be problematic in Islamic law. Gharar occurs when essential terms are left undefined — creating a situation where one party may be unknowingly disadvantaged. Zulm occurs when terms are clear but fundamentally unfair — one-sided penalty clauses, exploitative pricing, or terms that strip one party of reasonable rights. Identifying these issues is the prerequisite for correcting them.

---

**How do I accomplish this?**

1. **Apply the gharar test.** For each flagged clause from your review, ask: "Does this clause leave a material aspect of the agreement undefined or uncertain?" If either party cannot determine what they owe or are owed, gharar is present.

2. **Apply the zulm test.** Ask: "Does this clause impose a disproportionate burden on one party?" Look for: excessive penalties, one-sided termination rights, clauses that waive your rights without compensation, and automatic price escalation without limits.

3. **Check for hidden terms.** Some contracts bury onerous terms in fine print, appendices, or referenced documents. Ensure you have read every document the contract incorporates by reference.

4. **Assess power imbalance.** Contracts with large institutions (banks, employers, landlords) often contain standard terms that heavily favour the institution. Identify these even if they seem "normal" — normalcy does not equal justice.

5. **Consult if needed.** If you are uncertain whether a clause constitutes gharar or zulm, consult a knowledgeable person — a lawyer, a scholar, or someone experienced in the relevant industry.

6. **Benchmark:** You have completed this step when every problematic clause across all your active contracts has been identified and categorised as involving gharar, zulm, or both.` },
        { title: 'Renegotiate or amend problematic clauses to achieve fairness and clarity', done: false,
          description: `**Why does this matter?**

Identifying problems without resolving them leaves you operating under unjust or ambiguous terms. Islam teaches that both parties to a contract should be satisfied (taradi) and that fairness should be actively pursued, not merely wished for. Renegotiating problematic clauses is an act of islah (rectification) that protects your rights, respects the counterparty, and brings your contractual life into alignment with Islamic principles.

---

**How do I accomplish this?**

1. **Prioritise by severity.** Start with clauses that involve the greatest financial exposure or the most serious Islamic violations (e.g., riba-based penalties before vague service terms).

2. **Prepare your position.** For each problematic clause, draft the specific language you would prefer. Be ready to explain why the change is fair to both parties — not just to you.

3. **Approach the counterparty respectfully.** Frame the conversation around mutual benefit and clarity, not as an accusation. Many counterparties will agree to reasonable amendments, especially when you demonstrate that the current terms are ambiguous or one-sided.

4. **Document all amendments formally.** Any agreed change should be captured in a written amendment or addendum signed by both parties. Verbal agreements to "ignore" a clause are unreliable.

5. **Know your alternatives.** If a counterparty refuses to amend a seriously unjust clause, consider whether continuing the relationship is appropriate. Some contracts may need to be terminated rather than amended.

6. **Benchmark:** You have completed this step when every clause you identified as involving gharar or zulm has been either amended, renegotiated, or — if the counterparty refused — you have made an informed decision about continuing the relationship.` },
        { title: 'Keep signed copies of all amended contracts for your records', done: false,
          description: `**Why does this matter?**

Allah commands the documentation of agreements in Surah Al-Baqarah (2:282): "O you who believe, when you contract a debt for a specified term, write it down." This principle extends to all significant contracts. Amendments that exist only as verbal agreements or email threads are fragile — they can be denied, forgotten, or lost. Keeping signed copies of all amended contracts is both an Islamic obligation of diligence and a practical safeguard against future disputes.

---

**How do I accomplish this?**

1. **Collect all amendment documents.** For every contract you renegotiated, gather the signed amendment, addendum, or restated agreement.

2. **Pair amendments with originals.** Store each amendment alongside its original contract so the complete agreement can be understood as a whole.

3. **Use a consistent filing system.** Whether digital or physical, organise by category (employment, housing, business) and include the date of the amendment for easy reference.

4. **Create backup copies.** Store digital copies in a secure cloud service and keep physical copies in a safe or filing cabinet. Ensure at least one backup exists in a separate location.

5. **Inform relevant parties.** If a family member, business partner, or executor needs to know about these contracts (e.g., for estate planning), ensure they know where to find them.

6. **Schedule periodic reviews.** Set a reminder — annually or at each contract renewal date — to review your contracts again, as circumstances and terms may change over time.

7. **Benchmark:** You have completed this step when every amended contract is filed with its original, backed up securely, and accessible to anyone who may need it.` },
      ],
    },
  ],
  wealth_ownership_growth: [
    {
      title: 'Audit all business and personal contracts — add clarity, fairness, and Islamic compliance where missing',
      priority: 'high', tags: ['contracts', 'transparency'],
      description: 'As your financial affairs grow, so does the number of contracts governing them. Conduct a comprehensive audit of all active agreements to ensure they meet Islamic standards of transparency, mutual consent, and fairness. Update any that fall short.',
      subtasks: [
        { title: 'Create a master list of all active business and personal contracts', done: false,
          description: `**Why does this matter?**

As your financial life matures, contracts multiply — vendor agreements, partnership deeds, employment contracts, lease renewals, service-level agreements, and more. Without a centralised inventory, it is easy to lose track of what you have agreed to, when obligations are due, and which agreements may contain terms that conflict with Islamic principles. A master list is the foundation of proactive contract governance and responsible stewardship (khilafah) of your commitments.

---

**How do I accomplish this?**

1. **Survey all domains of your life.** Systematically think through: business partnerships, client contracts, employment agreements, rental and lease agreements, insurance policies, subscription services, financial products, and any informal arrangements that carry obligations.

2. **Create a structured register.** For each contract, record: the counterparty name, the type of agreement, the date signed, the term or expiration date, the core obligation on each side, and where the signed document is stored.

3. **Include personal contracts.** Do not overlook personal agreements — gym memberships, phone contracts, utility agreements, and any personal loans or guarantees you have made.

4. **Flag contracts without written documentation.** If any arrangement is based on a verbal agreement, note it separately — these need to be formalised to meet the Quranic standard of documentation (2:282).

5. **Benchmark:** You have completed this step when you have a single, comprehensive register listing every active contract — business and personal — with key details and document locations recorded.` },
        { title: 'Review each contract against Islamic contract principles (clarity, consent, no riba, no gharar)', done: false,
          description: `**Why does this matter?**

Islamic contract law is built on principles that protect both parties: clarity of terms (bayyan), mutual consent (taradi), absence of interest (riba), and absence of excessive uncertainty (gharar). A contract that violates any of these principles is deficient from a Shariah perspective, regardless of whether it is legally enforceable in secular courts. Reviewing your contracts against these principles reveals where your financial commitments may be at odds with your faith.

---

**How do I accomplish this?**

1. **Apply the four-principle checklist.** For each contract, evaluate: (a) Are all terms clearly defined with no material ambiguity? (b) Did both parties enter freely with informed consent? (c) Does any clause involve interest-based charges or penalties? (d) Are there terms that create excessive uncertainty about obligations or outcomes?

2. **Pay special attention to financial clauses.** Late payment penalties structured as interest, variable pricing without defined limits, and automatic renewal at undisclosed rates are common sources of riba and gharar in modern contracts.

3. **Check consent conditions.** Were you pressured into signing? Were material terms changed after initial agreement? Were important clauses buried in fine print? Genuine consent requires knowledge and freedom.

4. **Note the severity of each finding.** Distinguish between minor technical issues (e.g., slightly vague service description) and major violations (e.g., explicit riba-based penalty clauses).

5. **Document your review.** For each contract, produce a brief assessment noting which principles are satisfied and which are violated, with specific clause references.

6. **Benchmark:** You have completed this step when every contract on your master list has been assessed against all four Islamic contract principles and findings are documented.` },
        { title: 'Flag contracts that need amendments for Islamic compliance', done: false,
          description: `**Why does this matter?**

Not every imperfection in a contract requires the same urgency of response. Some issues are minor and can be addressed at renewal, while others — particularly those involving riba or significant zulm — demand immediate attention. Flagging and prioritising contracts that need amendments creates a clear action plan, preventing you from being overwhelmed while ensuring the most serious violations are addressed first.

---

**How do I accomplish this?**

1. **Categorise findings by severity.** Create three tiers: (a) Critical — contracts involving riba or serious injustice that must be addressed immediately; (b) Important — contracts with gharar or unfair terms that should be amended at the next opportunity; (c) Minor — contracts with small ambiguities that can be clarified at renewal.

2. **Consider practical constraints.** Some contracts (e.g., employment agreements) may be harder to amend than others (e.g., vendor agreements). Note the degree of leverage you have in each relationship.

3. **Identify contracts to exit.** If a contract is fundamentally structured around haram principles (e.g., a conventional interest-bearing loan), amendment may not be sufficient — you may need to plan an exit rather than a modification.

4. **Create a prioritised action list.** Order the flagged contracts by severity and feasibility, creating a clear sequence of which to address first.

5. **Benchmark:** You have completed this step when you have a prioritised list of every contract requiring amendment or exit, categorised by severity, with a clear rationale for each flag.` },
        { title: 'Draft and propose amendments to the counterparties', done: false,
          description: `**Why does this matter?**

Identifying problems is intellectual work; proposing solutions is the act of stewardship. Drafting specific amendments demonstrates professionalism and good faith, making counterparties far more likely to agree. In Islamic commercial ethics, both parties to a contract should actively seek fairness — the Prophet (peace be upon him) praised those who are easy-going in their buying, selling, and settling of debts (Bukhari). Proposing clear amendments embodies this ethic.

---

**How do I accomplish this?**

1. **Draft specific replacement language.** For each flagged clause, write the exact wording you would prefer. Vague requests like "make it fairer" are unlikely to succeed — specific proposals get specific responses.

2. **Explain the mutual benefit.** Frame each amendment as beneficial to both parties. Removing gharar protects the counterparty too. Replacing riba-based penalties with fixed, proportionate charges is simpler to administer.

3. **Choose the right communication channel.** For formal business contracts, a written proposal (letter or email) is appropriate. For personal arrangements, a face-to-face conversation may be more effective.

4. **Be prepared to negotiate.** The counterparty may accept, counter-propose, or decline. Know your minimum acceptable terms before the conversation begins.

5. **Engage legal support for complex contracts.** For high-value or legally complex agreements, have a lawyer review your proposed amendments to ensure they are properly structured.

6. **Document every response.** Whether the counterparty accepts, modifies, or rejects your proposal, keep a written record of the exchange.

7. **Benchmark:** You have completed this step when you have formally proposed amendments to every flagged contract and received a response from each counterparty.` },
        { title: 'Establish a template for future contracts that embeds Islamic principles from the start', done: false,
          description: `**Why does this matter?**

Auditing and amending contracts after the fact is corrective work. The superior approach is to build Islamic principles into your contracts from the beginning, so that every new agreement you enter is born compliant. A well-designed contract template saves time, reduces risk, and communicates your values to counterparties before a single negotiation begins. It is an expression of ihsan (excellence) in your business dealings.

---

**How do I accomplish this?**

1. **Identify the contract types you use most frequently.** Common categories include: service agreements, partnership agreements, employment contracts, sale contracts, and consulting agreements.

2. **Build Islamic principles into the template structure.** Include: a basmala or ethical preamble, clear definitions of all key terms, explicit mutual consent clauses, payment terms free from riba, dispute resolution through mediation before litigation, and a termination clause that protects both parties fairly.

3. **Include a Shariah compliance clause.** Add a clause stating that the agreement is intended to comply with Islamic commercial principles and that any ambiguity should be resolved in favour of fairness and transparency.

4. **Have the template reviewed.** Ask a lawyer to ensure legal enforceability and a knowledgeable person to verify Shariah alignment.

5. **Use it consistently.** Make the template your default starting point for every new agreement. Adapt it as needed for specific situations, but do not abandon its core principles.

6. **Benchmark:** You have completed this step when you have at least one reusable contract template that embeds Islamic principles and has been reviewed for both legal and Shariah compliance.` },
      ],
    },
    {
      title: 'Research and purchase your first Shariah-compliant asset — property, gold, or halal equity',
      priority: 'medium', tags: ['investing', 'ownership'],
      description: 'Moving from saving to owning productive or appreciating assets is a key step in wealth growth. Research Shariah-compliant asset classes and make your first purchase — whether it is physical gold, a rental property financed through Islamic means, or halal equity shares.',
      subtasks: [
        { title: 'Compare asset classes (property, gold, halal equities) for accessibility and risk profile', done: false,
          description: `**Why does this matter?**

Not all Shariah-compliant assets are equal in terms of accessibility, risk, liquidity, and growth potential. Property requires significant capital and management but offers tangible ownership and rental income. Gold provides a store of value and is highly liquid but generates no yield. Halal equities can offer growth and dividends but require ongoing screening for compliance. Understanding these trade-offs allows you to make an informed first purchase that matches your financial capacity and risk tolerance.

---

**How do I accomplish this?**

1. **Research each asset class.** Study the basics of real estate investment, gold ownership (physical and allocated), and Shariah-compliant equities (screened stocks, Islamic ETFs, halal mutual funds).

2. **Evaluate accessibility.** How much capital does each require to enter? Property may need tens of thousands; gold can be purchased in small quantities; equities can be bought in fractional shares.

3. **Assess risk and volatility.** Property values are generally stable but illiquid. Gold fluctuates with global markets. Equities offer higher potential returns but with higher short-term volatility.

4. **Consider liquidity.** How quickly can you convert the asset to cash if needed? Gold and equities are highly liquid; property is not.

5. **Factor in ongoing management.** Property requires maintenance, tenant management, and insurance. Gold requires secure storage. Equities require periodic compliance screening.

6. **Benchmark:** You have completed this step when you can articulate the advantages, disadvantages, capital requirements, and risk profile of at least three Shariah-compliant asset classes and have identified which best suits your current situation.` },
        { title: 'Verify the Shariah compliance of the specific asset or product you intend to purchase', done: false,
          description: `**Why does this matter?**

An asset class being "generally halal" does not mean every product within it is permissible. A property purchased through a conventional mortgage involves riba. An equity fund marketed as "Islamic" may use screening criteria that are too lenient. Gold futures may involve gharar. You must verify the specific product or asset you intend to buy — not just the category — to ensure it genuinely complies with Shariah principles.

---

**How do I accomplish this?**

1. **Identify the specific product.** Whether it is a particular property, a gold dealer, or an Islamic fund, determine exactly what you plan to purchase and from whom.

2. **Check the financing structure.** If you are using financing to acquire the asset, verify it is structured Islamically — murabaha, ijarah, or musharakah rather than conventional interest-bearing debt.

3. **For equities, check the screening methodology.** Islamic equity funds should screen for: business activity (no haram industries), financial ratios (debt-to-assets, interest income), and purification requirements. Ask which screening standard they follow (AAOIFI, DJIM, S&P Shariah).

4. **For gold, verify physical backing.** Ensure you are purchasing actual gold (physical bars, coins, or allocated accounts) rather than gold derivatives, futures, or paper gold that may involve gharar.

5. **Seek a compliance opinion.** If the product documentation is unclear, consult an Islamic finance professional or a scholar specialising in contemporary financial transactions.

6. **Benchmark:** You have completed this step when you have written confirmation or strong evidence that the specific asset or product you intend to purchase is Shariah-compliant, including its financing structure.` },
        { title: 'Determine your budget and financing method (savings, Islamic financing, partnership)', done: false,
          description: `**Why does this matter?**

Purchasing an asset without a clear budget and financing plan can lead to overextension, debt stress, or reliance on impermissible financing. Islam encourages measured financial planning — the Prophet (peace be upon him) warned against taking on debt unnecessarily. Whether you fund your purchase from savings, through an Islamic financing arrangement, or via a partnership (musharakah), the method must be halal, sustainable, and proportionate to your overall financial position.

---

**How do I accomplish this?**

1. **Assess your available capital.** Review your savings and determine how much you can allocate to this purchase without compromising your nafaqah obligations, emergency reserves, or zakah payments.

2. **Evaluate Islamic financing options.** If your savings are insufficient, research Islamic financing products available in your jurisdiction: murabaha (cost-plus sale), ijarah (lease-to-own), diminishing musharakah (declining partnership). Understand the terms, costs, and obligations of each.

3. **Consider partnership structures.** If you cannot fund the purchase alone, a musharakah (partnership) with a trusted partner — where both contribute capital and share risk — is a Shariah-compliant alternative to borrowing.

4. **Calculate the total cost of ownership.** Include: purchase price, financing costs (if applicable), ongoing maintenance, insurance, taxes, and any management fees. Ensure the total is sustainable within your income.

5. **Set a firm budget ceiling.** Determine the maximum you will spend, including financing costs, and commit to not exceeding it.

6. **Benchmark:** You have completed this step when you have a documented budget for the asset purchase, a confirmed halal financing method (or confirmation that you will use savings), and evidence that the purchase will not strain your financial obligations.` },
        { title: 'Execute the purchase with proper documentation and contracts', done: false,
          description: `**Why does this matter?**

The moment of transaction is where theory meets reality. A purchase executed without proper documentation — clear contracts, receipts, transfer records — creates the very ambiguity (gharar) that Islam seeks to eliminate. Proper execution also protects your rights as a buyer, establishes clear title for inheritance purposes, and fulfils the Quranic command to document significant financial transactions (2:282).

---

**How do I accomplish this?**

1. **Prepare all documentation in advance.** Before the transaction date, ensure you have: a purchase agreement or sale contract, financing documents (if applicable), identification and legal requirements, and payment method ready.

2. **Review the final terms.** Before signing, read every document one final time. Confirm that the price, payment schedule, asset description, and conditions match what was agreed.

3. **Ensure mutual consent.** Both parties should sign freely and with full understanding. If anything is unclear, ask before signing — not after.

4. **Complete the payment properly.** Use traceable payment methods (bank transfer, certified cheque) rather than cash for large transactions. Obtain a receipt for every payment.

5. **Transfer title formally.** For property, register the deed. For gold, obtain a certificate of authenticity and proof of ownership. For equities, confirm the shares appear in your brokerage account.

6. **Store all documents securely.** File the purchase agreement, payment receipts, title documents, and any financing agreements in your organised financial records system.

7. **Benchmark:** You have completed this step when the asset is purchased, title is in your name, all payments are documented, and every relevant document is securely filed.` },
        { title: 'Set up a system to monitor the asset\'s performance and compliance over time', done: false,
          description: `**Why does this matter?**

Purchasing a Shariah-compliant asset is not a one-time event — it is the beginning of an ongoing stewardship responsibility. An equity fund that is halal today may change its holdings tomorrow. A rental property must be managed according to fair dealing principles. Gold must be stored securely and accounted for in zakah calculations. Without a monitoring system, you risk unknowingly holding a non-compliant asset or mismanaging a trust that Allah has placed in your care.

---

**How do I accomplish this?**

1. **Define what to monitor.** For each asset type: equities — check compliance screening updates and dividend purification; property — track rental income, maintenance costs, and tenant relations; gold — verify secure storage and current market value for zakah.

2. **Set a review frequency.** Monthly for actively traded assets (equities). Quarterly for property. Annually for gold and other stable stores of value.

3. **Track financial performance.** Record: income generated (rent, dividends), expenses incurred (maintenance, fees), capital appreciation or depreciation, and net return.

4. **Monitor Shariah compliance.** For equities, check whether the fund or stock still passes Islamic screening criteria. For property, ensure your lease terms and tenant dealings remain fair. For financing arrangements, verify you are meeting repayment terms as agreed.

5. **Include the asset in your zakah calculations.** Ensure the asset is properly valued and included in your annual zakah assessment according to its category.

6. **Benchmark:** You have completed this step when you have a documented monitoring schedule, a simple tracking system (spreadsheet or ledger), and have completed your first review cycle for the purchased asset.` },
      ],
    },
    {
      title: 'Establish proper business documentation — contracts, receipts, and records for all transactions',
      priority: 'medium', tags: ['business', 'integrity'],
      description: 'Allah commands in Surah Al-Baqarah (2:282) that debts and major transactions be written down. Proper documentation protects all parties, prevents disputes, and is a form of ihsan (excellence) in your financial dealings. Establish systems to record every significant transaction.',
      subtasks: [
        { title: 'Set up a filing system (digital or physical) for contracts, invoices, and receipts', done: false,
          description: `**Why does this matter?**

Allah commands the documentation of financial dealings in the longest verse of the Quran (2:282), emphasising that written records protect the rights of all parties and prevent disputes. A filing system is the infrastructure that makes this command practical. Without one, documents are scattered across drawers, email threads, and phone photos — making it impossible to retrieve a contract when you need it, verify a payment, or prove ownership during an inheritance process.

---

**How do I accomplish this?**

1. **Choose your system.** Decide between digital (cloud folders like Google Drive, Dropbox, or a dedicated accounting tool), physical (filing cabinet with labelled folders), or a hybrid of both. Digital is recommended for searchability and backup, but physical originals should be retained for critical documents.

2. **Create a folder structure.** Organise by category: Contracts, Invoices (Issued), Invoices (Received), Receipts, Tax Documents, Banking Statements, Insurance, and Miscellaneous. Within each, organise by year.

3. **Establish naming conventions.** Use a consistent format such as: YYYY-MM-DD_CounterpartyName_DocumentType (e.g., 2026-03-15_AcmeCorp_ServiceAgreement.pdf). This makes documents easy to find without opening them.

4. **Digitise physical documents.** Scan or photograph all existing paper documents and file the digital copies alongside the originals. Use a scanning app that produces searchable PDFs.

5. **Set a filing habit.** Commit to filing every new document within 48 hours of receiving it. A system is only useful if it is maintained.

6. **Benchmark:** You have completed this step when you have a functioning filing system with all existing financial documents organised, and a clear process for filing new documents as they arrive.` },
        { title: 'Ensure every transaction above a threshold amount has a written record', done: false,
          description: `**Why does this matter?**

The Quranic command to document transactions (2:282) is not limited to formal contracts — it applies to any significant financial dealing. A verbal agreement for a large purchase, an informal loan to a friend, or a cash payment for services can all become sources of dispute without written evidence. Setting a threshold amount and ensuring every transaction above it is documented is a practical application of this divine guidance that protects everyone involved.

---

**How do I accomplish this?**

1. **Set your threshold.** Choose an amount that is meaningful in your financial context. A common approach is to document any transaction exceeding one day's earnings, or a fixed amount (e.g., \$100, \$500) depending on your income level.

2. **Define what constitutes a "written record."** At minimum: the date, the parties involved, the amount, what was exchanged (goods, services, loan), the terms (payment schedule, delivery date), and signatures or acknowledgment from both parties.

3. **Use simple tools for informal transactions.** For personal transactions (loans to family, private sales), a brief written note signed by both parties is sufficient. A text message or email confirmation also serves as basic documentation.

4. **Issue or request invoices for business transactions.** For every business payment you make or receive above the threshold, ensure an invoice or receipt exists. Use invoicing software or a simple template.

5. **Include charitable transactions.** Document significant sadaqah and zakah payments — not for worldly reward, but for accurate financial tracking and to prevent disputes about whether obligations were met.

6. **Benchmark:** You have completed this step when you have defined your transaction threshold, documented all recent transactions above it, and established a habit of recording every future transaction that exceeds the threshold.` },
        { title: 'Use standardised contract templates for recurring transaction types', done: false,
          description: `**Why does this matter?**

If you regularly engage in the same types of transactions — client work, product sales, partnership agreements, rental arrangements — drafting a new contract from scratch each time is inefficient and error-prone. Standardised templates ensure that Islamic principles (clarity, consent, no riba, no gharar) are embedded in every agreement by default, rather than being an afterthought. Templates also project professionalism and demonstrate that your business dealings are governed by consistent ethical standards.

---

**How do I accomplish this?**

1. **Identify your recurring transaction types.** Review your business activities and list the types of agreements you enter repeatedly — service contracts, sales agreements, consulting engagements, lease agreements, partnership terms.

2. **Draft a template for each type.** Each template should include: a clear description of the transaction, defined obligations for both parties, payment terms and schedule, delivery or performance timeline, termination and dispute resolution clauses, and an Islamic compliance statement.

3. **Build in Islamic safeguards.** Include standard clauses that: prohibit riba-based charges, define all material terms clearly to avoid gharar, require mutual consent, and specify fair remedies for breach.

4. **Have templates reviewed.** Ask a lawyer to verify legal enforceability and a knowledgeable advisor to check Shariah alignment. This one-time investment saves repeated review costs.

5. **Store templates accessibly.** Keep them in your filing system where they are easy to access, duplicate, and customise for each new transaction.

6. **Benchmark:** You have completed this step when you have at least one standardised contract template for each recurring transaction type, reviewed for both legal validity and Islamic compliance, and stored in your filing system.` },
        { title: 'Back up all financial records securely (cloud storage or safe deposit)', done: false,
          description: `**Why does this matter?**

Financial records are irreplaceable — a fire, a hard drive failure, or a theft can destroy years of documentation in an instant. Without backups, you lose the ability to prove ownership, enforce contracts, calculate zakah accurately, or distribute your estate according to your wishes. Secure backup is an act of prudent stewardship (khilafah) that protects not only your interests but those of everyone who depends on your financial records — your family, your business partners, and your heirs.

---

**How do I accomplish this?**

1. **Follow the 3-2-1 rule.** Keep three copies of important records, on two different types of media, with one copy stored off-site. For example: original documents at home, digital copies in cloud storage, and a backup on an external hard drive stored elsewhere.

2. **Choose a secure cloud service.** Use a reputable cloud storage provider with encryption, two-factor authentication, and a strong privacy policy. Avoid free tiers for sensitive financial data if they lack adequate security.

3. **Consider a physical safe deposit box.** For critical originals — property deeds, wills, trust documents — a bank safe deposit box provides fire and theft protection that home storage cannot match.

4. **Encrypt sensitive files.** Financial records stored digitally should be encrypted, especially if they contain account numbers, personal identification, or business-sensitive information.

5. **Automate the backup process.** Set up automatic cloud synchronisation for your digital filing system so new documents are backed up without manual intervention.

6. **Test your backups.** Periodically verify that you can actually access and open your backed-up files. A backup you cannot restore is not a backup.

7. **Benchmark:** You have completed this step when all your financial records exist in at least two secure locations, your backup process is automated or scheduled, and you have verified that the backups are accessible and complete.` },
      ],
    },
    {
      title: 'Learn inheritance law (fara\'id) — know how your estate will be divided and plan accordingly',
      priority: 'medium', tags: ['faraid', 'estate'],
      description: 'The Islamic law of inheritance (fara\'id) is a precise system revealed in the Quran. Understanding how your estate will be divided among your heirs — and who qualifies as an heir — enables you to plan your wealth, make permissible bequests (wasiyyah), and avoid arrangements that conflict with divine decree.',
      subtasks: [
        { title: 'Study the fixed shares (furu\'d) assigned to each category of heir in the Quran', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (6:136)
**Arabic:** 
**Translation:** Out of what Allah hath produced in abundance in tilth and in cattle, they assigned Him a share: they say, according to their fancies: "This is for Allah, and this" - for our "partners"! but the share of their" partners "reacheth not Allah, whilst the share of Allah reacheth their "partners"! evil (and unjust) is their assignment!

### Ayah (4:11)
**Arabic:** 
**Translation:** Allâh commands you as regards your children’s (inheritance): to the male, a portion equal to that of two females; if (there are) only daughters, two or more, their share is two-thirds of the inheritance; if only one, her share is a half. For parents, a sixth share of inheritance to each if the deceased left children; if no children, and the parents are the (only) heirs, the mother has a third; if the deceased left brothers (or sisters), the mother has a sixth. (The distribution in all cases is) after the payment of legacies he may have bequeathed or debts. You know not which of them, whether your parents or your children, are nearest to you in benefit; (these fixed shares) are ordained by Allâh. And Allâh is Ever All-Knower, All-Wise.

**II. Sources from the Hadith**


### Sahih Bukhari 218
Narrated Ibn \`Abbas:The Prophet (ﷺ) once passed by two graves and said, "These two persons are being tortured not for a major sin (to avoid). One of them never saved himself from being soiled with his urine, while the other used to go about with calumnies (to make enmity between friends)." The Prophet (ﷺ) then took a green leaf of a date-palm tree, split it into (pieces) and fixed one on each grave. They said, "O Allah's Apostle! Why have you done so?" He replied, "I hope that their punishment might be lessened till these (the pieces of the leaf) become dry." (See the footnote of Hadith)
*(Grade: Sahih)*

### Sahih Muslim 3770
Ibn Umar (Allah be pleased with them) reported Allah's Messenger may peace be upon him) as saying:If anyone emancipates his share ina slave and has enough money to pay the full price for him, a fair price for the slave should be fixed, his partners given their shares, and the slave be thus emancipated, otherwise he is emancipated only to the extent of the first man's share
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

The Quranic inheritance shares are among the most precise and detailed rulings in all of Islamic law. Allah Himself prescribed exact fractions — half, quarter, eighth, two-thirds, one-third, one-sixth — for specific categories of heirs, and concluded with: "These are the limits set by Allah" (4:13). Understanding these shares is not optional knowledge for a Muslim with wealth; it is the foundation upon which your entire estate plan must rest. Without this knowledge, you cannot evaluate whether your will is valid, whether an inheritance was distributed correctly, or whether your heirs are receiving their God-given rights.

---

**How do I accomplish this?**

1. **Study the primary verses.** Read Surah An-Nisa 4:11, 4:12, and 4:176 slowly and carefully. These three verses contain the majority of inheritance rulings. Use a reliable tafsir to understand the context and application.

2. **Learn the heir categories.** Identify the categories of heirs who receive fixed shares: daughters, sons, wife/wives, husband, mother, father, full sisters, paternal sisters, maternal siblings. Note which share each receives under different family configurations.

3. **Understand how shares interact.** The presence or absence of certain heirs changes others' shares. For example, a mother receives one-third if the deceased has no children, but one-sixth if children exist.

4. **Use a fara'id reference.** Obtain a reliable fara'id textbook or reference chart that maps out the shares visually. Many Islamic universities publish free resources on this topic.

5. **Work through examples.** Practice calculating shares for different hypothetical family structures until the system becomes intuitive.

6. **Benchmark:** You have completed this step when you can correctly identify the Quranic share for each category of heir under at least three different family configurations without consulting a reference.` },
        { title: 'Identify your current heirs and their respective shares based on your family structure', done: false,
          description: `**Why does this matter?**

Theoretical knowledge of fara'id becomes personally meaningful only when you apply it to your own family. Your specific family structure — whether you have a spouse, children (sons and daughters), living parents, siblings — determines exactly who inherits and what fraction each receives. This exercise transforms abstract fractions into real numbers that directly affect your loved ones, making your estate planning concrete and actionable rather than hypothetical.

---

**How do I accomplish this?**

1. **Map your current family tree.** List every living relative who qualifies as an Islamic heir: spouse, sons, daughters, father, mother, full brothers, full sisters, paternal half-brothers, paternal half-sisters, maternal half-siblings.

2. **Apply the Quranic shares.** Using what you learned in the previous step, determine the share each heir would receive if you were to pass away today. Start with the fixed-share heirs (ashab al-furud), then determine the residual heirs ('asbah).

3. **Calculate in real terms.** Take your approximate net estate value (assets minus debts, after any bequest) and calculate the actual monetary amount each heir would receive. This makes the abstract shares tangible.

4. **Account for the bequest.** Remember that the Quranic shares apply to the estate after debts are settled and any bequest (up to one-third to non-heirs) is deducted.

5. **Note how shares would change.** Consider how the distribution would shift if your family structure changes — for example, if a parent passes away, or if you have additional children.

6. **Benchmark:** You have completed this step when you can state, for your current family structure, exactly who your Islamic heirs are and the precise fraction and approximate monetary value each would receive.` },
        { title: 'Understand the rules of \'asbah (residual heirs) and hajb (exclusion)', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (4:176)
**Arabic:** 
**Translation:** People ask you to pronounce a ruling concerning inheritance from those who have left behind no lineal heirs (kalalah). Say: 'Allah pronounces for you the ruling: should a man die childless but have a sister, she shall have one half of what he has left behind; and should the sister die childless, his brother shall inherit her. And if the heirs are two sisters, they shall have two-thirds of what he has left behind. And if the heirs are sisters and brothers, then the male shall have the share of two females. Allah makes (His commandments) clear to you lest you go astray. Allah has full knowledge of everything.

**II. Sources from the Hadith**


### Sahih Bukhari 4580
Narrated Ibn \`Abbas:Regarding the Verse: "To everyone, We have appointed heirs." (4.33) 'Mawali' means heirs. And regarding:-- "And those to whom your right hands have pledged." When the Emigrants came to Medina, an Emigrant used to be the heir of an Ansari with the exclusion of the latter's relatives, and that was because of the bond of brotherhood which the Prophet (ﷺ) had established between them (i.e. the Emigrants and the Ansar). So when the Verses:-- "To everyone We have appointed heirs." was revealed, (the inheritance through bond of brotherhood) was cancelled. Ibn \`Abbas then said: "And those to whom your right hands have pledged." is concerned with the covenant of helping and advising each other. So allies are no longer to be the heir of each other, but they can bequeath each other some of their property by means of a will
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

The fara'id system is not simply a list of fractions — it is a dynamic system where the presence of certain heirs affects the shares of others, and where some heirs can be entirely excluded (hajb) by closer relatives. The concept of 'asbah (residual heirs who receive whatever remains after fixed shares are distributed) is essential for completing any inheritance calculation. Without understanding these rules, you may incorrectly assume a relative will inherit when they are actually excluded, or miscalculate the residual share.

---

**How do I accomplish this?**

1. **Learn the concept of 'asbah.** Residual heirs receive whatever remains of the estate after the fixed-share heirs (ashab al-furud) have taken their portions. The primary residual heir is the son; in his absence, other male relatives inherit as 'asbah in a specific order.

2. **Study hajb (exclusion).** Hajb means that a closer heir blocks a more distant one from inheriting. For example, a son excludes a grandson. A father excludes brothers. Understanding who blocks whom is critical for accurate calculations.

3. **Distinguish partial from total exclusion.** Some heirs are only partially blocked — their share is reduced but not eliminated. For example, the mother's share is reduced from one-third to one-sixth when the deceased has children, but she is never fully excluded.

4. **Work through complex scenarios.** Practice cases involving: a deceased with both sons and daughters (sons as 'asbah, daughters receiving their fixed shares), a deceased with no children (siblings may become heirs), and scenarios where grandparents and siblings interact.

5. **Consult a reference.** The rules of hajb can be intricate. Use a fara'id textbook that includes a hajb chart showing which heirs exclude which.

6. **Benchmark:** You have completed this step when you can correctly determine who inherits and who is excluded in at least three complex family scenarios involving both fixed-share and residual heirs.` },
        { title: 'Learn the permissible scope of the optional bequest (wasiyyah — up to 1/3 to non-heirs)', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (4:33)
**Arabic:** 
**Translation:** And to everyone, We have appointed heirs of that (property) left by parents and relatives. To those also with whom you have made a pledge (brotherhood), give them their due portion (by Wasiyyah - will). Truly, Allâh is Ever a Witness over all things.

### Ayah (4:12)
**Arabic:** 
**Translation:** And youpl get one-half of what your spouses have left if theyhave no children. Yet if they have children, then you get one-fourth of what they have left, after(fulfilling) any bequest they may bequeath and(paying off) any debt. And they get one-fourth of what you have left if you have no children. Yet if you have children, then they get one-eighth of what you have left, after(fulfilling) any bequest you may bequeath and(paying off) any debt. And if a man or a woman is to be inherited by a non-lineal heir while having a brother or sister, then each of them gets one-sixth. But if they are more than that, then they share one-third, after(fulfilling) any bequest that may be bequeathed3 and(paying off) any debt, without any harm(to anyone). (This is) an injunction from Allah, for Allah is All-Knowing, Clement.`,
          description: `**Why does this matter?**

The wasiyyah (bequest) is the one area of Islamic inheritance where you have discretionary control. While the Quranic shares are fixed and immutable, you may allocate up to one-third of your net estate to non-heirs — charitable causes, friends in need, community institutions, or relatives who are not Islamic heirs. Understanding the scope and limits of this option allows you to maximise your charitable impact and provide for people who would otherwise receive nothing, while staying within the boundaries Allah has set.

---

**How do I accomplish this?**

1. **Study the hadith basis.** The Prophet (peace be upon him) permitted Sa'd ibn Abi Waqqas to bequeath up to one-third, saying: "One-third, and one-third is much" (Bukhari and Muslim). Understand this as the upper limit.

2. **Know who cannot receive a bequest.** A bequest to someone who is already a Quranic heir is invalid unless all other heirs consent. The bequest is specifically for non-heirs.

3. **Explore worthy causes.** Consider: waqf (endowment) for a masjid or school, support for orphans, assistance for non-heir relatives who are in financial need, contributions to Islamic institutions, or funding for beneficial community projects.

4. **Understand the calculation.** The one-third is calculated from the net estate after debts are settled — not from the gross estate. This means debts are paid first, then the bequest is taken, then the remaining two-thirds (or more) is distributed according to Quranic shares.

5. **Be specific in your bequest.** Vague instructions create disputes. Name the beneficiaries, specify amounts or percentages, and state the purpose clearly.

6. **Benchmark:** You have completed this step when you understand the limits and conditions of the wasiyyah, can calculate the maximum bequest amount from your estate, and have identified specific causes or individuals you wish to benefit.` },
        { title: 'Apply this knowledge to update or create your Islamic will', done: false,
          sources: `**I. Sources from the Hadith**


### Sahih Bukhari 3
Narrated 'Aisha (the mother of the faithful believers):The commencement of the Divine Inspiration to Allah's Messenger (ﷺ) was in the form of good dreams which came true like bright daylight, and then the love of seclusion was bestowed upon him. He used to go in seclusion in the cave of Hira where he used to worship (Allah alone) continuously for many days before his desire to see his family. He used to take with him the journey food for the stay and then come back to (his wife) Khadija to take his food likewise again till suddenly the Truth descended upon him while he was in the cave of Hira. The angel came to him and asked him to read. The Prophet (ﷺ) replied, "I do not know how to read." The Prophet (ﷺ) added, "The angel caught me (forcefully) and pressed me so hard that I could not bear it any more. He then released me and again asked me to read and I replied, 'I do not know how to read.' Thereupon he caught me again and pressed me a second time till I could not bear it any more. He then released me and again asked me to read but again I replied, 'I do not know how to read (or what shall I read)?' Thereupon he caught me for the third time and pressed me, and then released me and said, 'Read in the name of your Lord, who has created (all that exists), created man from a clot. Read! And your Lord is the Most Generous." (96.1, 96.2, 96.3) Then Allah's Messenger (ﷺ) returned with the Inspiration and with his heart beating severely. Then he went to Khadija bint Khuwailid and said, "Cover me! Cover me!" They covered him till his fear was over and after that he told her everything that had happened and said, "I fear that something may happen to me." Khadija replied, "Never! By Allah, Allah will never disgrace you. You keep good relations with your kith and kin, help the poor and the destitute, serve your guests generously and assist the deserving calamity-afflicted ones." Khadija then accompanied him to her cousin Waraqa bin Naufal bin Asad bin 'Abdul 'Uzza, who, during the pre-Islamic Period became a Christian and used to write the writing with Hebrew letters. He would write from the Gospel in Hebrew as much as Allah wished him to write. He was an old man and had lost his eyesight. Khadija said to Waraqa, "Listen to the story of your nephew, O my cousin!" Waraqa asked, "O my nephew! What have you seen?" Allah's Messenger (ﷺ) described whatever he had seen. Waraqa said, "This is the same one who keeps the secrets (angel Gabriel) whom Allah had sent to Moses. I wish I were young and could live up to the time when your people would turn you out." Allah's Messenger (ﷺ) asked, "Will they drive me out?" Waraqa replied in the affirmative and said, "Anyone (man) who came with something similar to what you have brought was treated with hostility; and if I should remain alive till the day when you will be turned out then I would support you strongly." But after a few days Waraqa died and the Divine Inspiration was also paused for a while
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

Knowledge of fara'id without action is incomplete stewardship. The entire purpose of studying inheritance law is to ensure your estate will be distributed as Allah commanded — and this requires a properly drafted, legally valid Islamic will. If you already have a wasiyyah, your deepened knowledge may reveal errors or gaps that need correction. If you do not yet have one, this is the moment to create it. Every day that passes without a valid will is a day your estate is at risk of being distributed contrary to divine law.

---

**How do I accomplish this?**

1. **Review your existing will (if you have one).** Compare its provisions against what you have learned about fara'id, 'asbah, hajb, and the permissible scope of bequests. Are the shares correct for your current family structure? Are any heirs missing or incorrectly included?

2. **If you do not have a will, draft one now.** Use the knowledge from this study to create a wasiyyah that specifies: your heirs and their Quranic shares, your bequests (up to one-third to non-heirs), your debts and how they should be settled, and your chosen executor.

3. **Engage professional help.** Consult an Islamic estate planner or a scholar with fara'id expertise to review your draft. For legal enforceability, involve a lawyer familiar with your jurisdiction's probate laws.

4. **Ensure the will reflects your current situation.** Heirs change — children are born, parents pass away, marriages end. Your will must reflect your family structure as it is today, not as it was when you first drafted it.

5. **Execute and store the will properly.** Sign it with the required witnesses, notarise if your jurisdiction requires it, and store it securely while informing your executor of its location.

6. **Benchmark:** You have completed this step when you have a current, reviewed Islamic will that accurately reflects your family structure, correctly applies Quranic inheritance shares, and is both Shariah-compliant and legally enforceable.` },
      ],
    },
  ],
  wealth_ownership_excellence: [
    {
      title: 'Establish a family trust or multi-generational estate plan with a qualified Islamic scholar and lawyer',
      priority: 'medium', tags: ['estate', 'legacy'],
      description: 'A well-structured estate plan that spans generations ensures your wealth continues to benefit your family and community long after you are gone. Working with both an Islamic scholar and a qualified lawyer ensures the plan is both Shariah-compliant and legally enforceable in your jurisdiction.',
      subtasks: [
        { title: 'Identify a lawyer experienced in estate planning and familiar with Islamic requirements', done: false,
          description: `**Why does this matter?**

A multi-generational estate plan sits at the intersection of Islamic law and secular legal systems. Most estate planning lawyers are unfamiliar with fara'id, waqf structures, or the prohibition against bequeathing to heirs beyond their Quranic shares. Conversely, a scholar who knows Shariah may not understand the trust laws, tax implications, or probate procedures of your jurisdiction. Finding a lawyer who has experience with Islamic estate planning — or at minimum is willing to learn and collaborate with a scholar — is essential for creating a plan that is both enforceable and compliant.

---

**How do I accomplish this?**

1. **Search within the Islamic finance ecosystem.** Islamic finance organisations, halal investment firms, and Muslim professional networks often maintain referral lists of lawyers experienced in Islamic estate planning.

2. **Ask your local Muslim community.** Imams, community leaders, and families who have gone through the estate planning process can recommend lawyers they have worked with.

3. **Evaluate candidates.** When interviewing potential lawyers, ask: Have you drafted estate plans that incorporate Islamic inheritance shares? Are you familiar with the structure of a waqf? Can you work collaboratively with an Islamic scholar to ensure Shariah compliance?

4. **Assess jurisdictional knowledge.** The lawyer must understand how trusts, wills, and estate structures work in your specific jurisdiction — state or national laws vary significantly.

5. **Verify credentials and references.** Check their standing with the relevant bar association and ask for references from Muslim clients they have served.

6. **Benchmark:** You have completed this step when you have identified and engaged a qualified estate planning lawyer who either has direct Islamic estate experience or has agreed to collaborate with an Islamic scholar throughout the process.` },
        { title: 'Engage an Islamic scholar to advise on Shariah compliance of the trust structure', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (26:197)
**Arabic:** 
**Translation:** Is it not a sign to them that the learned scholars (like ‘Abdullâh bin Salâm رضي الله عنه who embraced Islâm) of the Children of Israel knew it (as true)?`,
          description: `**Why does this matter?**

A trust structure that is legally sound but Islamically non-compliant defeats the purpose of this entire exercise. Common trust mechanisms — such as giving the settlor full discretionary control over distributions, or structuring the trust to circumvent Quranic inheritance shares — may be perfectly legal but impermissible in Shariah. An Islamic scholar ensures that the trust respects the fixed shares, does not deprive any heir of their right, and operates within the boundaries of what Allah has permitted.

---

**How do I accomplish this?**

1. **Find a scholar with relevant expertise.** Not every scholar is qualified to advise on trust structures. Look for someone with training in Islamic finance (fiqh al-mu'amalat), particularly in inheritance law (fara'id) and endowment law (waqf).

2. **Brief the scholar on your intentions.** Explain what you are trying to achieve: multi-generational wealth protection, ensuring Shariah-compliant distribution, funding education or charitable purposes, and maintaining family assets.

3. **Ask the scholar to review trust structures for compliance.** Key questions include: Does the trust respect the Quranic inheritance shares when distributions are made? Does the trust impermissibly delay heirs from receiving their shares? Does the structure involve any element of riba or gharar?

4. **Facilitate collaboration with the lawyer.** The scholar and lawyer should communicate directly to resolve conflicts between legal requirements and Shariah principles. This collaboration is the core of the process.

5. **Obtain a written opinion.** Ask the scholar to provide a written Shariah compliance opinion on the proposed trust structure for your records.

6. **Benchmark:** You have completed this step when you have a qualified scholar actively advising on the trust structure, in communication with your lawyer, and prepared to issue a compliance opinion.` },
        { title: 'Define the trust\'s objectives — protecting heirs, funding education, maintaining family property', done: false,
          description: `**Why does this matter?**

A trust without clear objectives is a legal shell without purpose. The objectives determine every structural decision — what assets go into the trust, who benefits, when and how distributions are made, and how the trust terminates. In an Islamic context, objectives must be framed within the values of stewardship (khilafah), inter-generational responsibility, and the balance between protecting heirs and enabling generosity. Vague objectives like "take care of the family" are insufficient — they invite disputes and give future trustees too much discretionary power.

---

**How do I accomplish this?**

1. **Identify your primary goals.** Common Islamic estate objectives include: ensuring every heir receives their Quranic share without delay, protecting assets from mismanagement by minors or financially inexperienced heirs, funding children's and grandchildren's education, maintaining family property (such as a home or business) across generations, and establishing an ongoing charitable component (sadaqah jariyah).

2. **Prioritise and rank.** Not all objectives carry equal weight. Decide which are essential (e.g., Quranic share compliance) versus aspirational (e.g., funding a family scholarship endowment).

3. **Consider contingencies.** What happens if a beneficiary predeceases you? What if the family property becomes a financial burden? What if a future generation wants to sell a maintained asset? Build objectives that account for foreseeable changes.

4. **Consult your family.** Discuss your intentions with your spouse and adult children. Their input may reveal needs or concerns you have not considered.

5. **Document the objectives formally.** Write them down in a structured document that your lawyer and scholar can reference when drafting the trust.

6. **Benchmark:** You have completed this step when you have a written, prioritised list of trust objectives that has been reviewed with your family and is ready to guide the legal drafting process.` },
        { title: 'Draft the trust documents with both legal and Shariah review', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (2:283)
**Arabic:** 
**Translation:** And if you are on a journey and do not find a scribe to write the document then resort to taking pledges in hand. But if any of you trusts another, let him who is trusted, fulfil the trust and fear Allah, his Lord. And do not conceal what you have witnessed, for whoever conceals it, his heart is sinful. Allah has full knowledge of all that you do.`,
          description: `**Why does this matter?**

The trust document is the binding instrument that will govern your wealth for generations. Every clause matters — from the definition of beneficiaries to the powers of the trustee, from distribution schedules to termination conditions. A document reviewed only by a lawyer may be legally valid but Islamically deficient. A document reviewed only by a scholar may be Shariah-compliant but legally unenforceable. Both reviews are essential, and ideally, the two professionals should collaborate on the same draft rather than reviewing independently.

---

**How do I accomplish this?**

1. **Have the lawyer draft the initial document.** Based on your stated objectives, the lawyer should produce a trust deed that addresses: the settlor's intentions, the trust assets, the named beneficiaries, the trustee's powers and limitations, distribution rules, and termination conditions.

2. **Submit the draft for Shariah review.** The scholar should examine: whether distribution rules respect Quranic shares, whether the trustee has powers that could override Islamic obligations (e.g., withholding an heir's share indefinitely), whether any clause involves riba, gharar, or other prohibited elements, and whether the charitable component (if any) is structured as a valid sadaqah or waqf.

3. **Iterate until both are satisfied.** It is common for the lawyer and scholar to go through two or three revision cycles. Legal requirements and Shariah principles may conflict in specific areas — the resolution should be documented.

4. **Review the final draft personally.** Before signing, read the entire document yourself. Ensure you understand every clause and that it reflects your intentions.

5. **Benchmark:** You have completed this step when you have a finalised trust document that has been approved by both your lawyer and your Islamic scholar, and that you personally understand and agree with.` },
        { title: 'Execute the trust and transfer designated assets into it', done: false,
          description: `**Why does this matter?**

A trust document that is signed but unfunded is a legal fiction — it governs nothing. The trust only becomes operative when assets are actually transferred into it. This step is where your planning becomes reality: property deeds are re-titled, investment accounts are transferred, and the trust begins to function as the vehicle for your multi-generational estate plan. Failing to fund the trust is one of the most common estate planning mistakes, rendering years of planning worthless.

---

**How do I accomplish this?**

1. **Identify which assets will be transferred.** Based on your trust objectives and the advice of your lawyer and scholar, determine which assets belong in the trust. Not all assets need to be in the trust — some may be better left outside for tax or practical reasons.

2. **Execute the legal transfer.** For each asset: re-title real estate through a deed transfer, change the registration on investment accounts, update bank account ownership, and transfer business interests through the appropriate legal mechanism.

3. **Ensure each transfer is properly documented.** Obtain confirmation from each institution (bank, brokerage, land registry) that the asset is now held in the name of the trust.

4. **Update insurance and beneficiary designations.** Life insurance policies, retirement accounts, and other assets with beneficiary designations should be updated to align with the trust structure.

5. **Verify zakah treatment.** Discuss with your scholar how zakah applies to assets held in trust. The obligation may still fall on you as the settlor, depending on the trust structure.

6. **Benchmark:** You have completed this step when every designated asset has been legally transferred into the trust, confirmed by the relevant institutions, and your financial records reflect the new ownership structure.` },
        { title: 'Schedule periodic reviews to update the trust as family circumstances change', done: false,
          description: `**Why does this matter?**

A trust created today reflects your family structure, financial position, and intentions as they are now. But families grow and change — children marry, grandchildren are born, parents pass away, assets appreciate or depreciate, tax laws change, and your own priorities evolve. A trust that is never reviewed becomes progressively misaligned with reality. Periodic reviews ensure the trust continues to serve its purpose and remains compliant with both the law and Shariah as circumstances change.

---

**How do I accomplish this?**

1. **Set a regular review schedule.** At minimum, review the trust annually. Many estate planners recommend a comprehensive review every three to five years, with interim reviews triggered by significant life events.

2. **Define trigger events.** In addition to scheduled reviews, the trust should be reviewed whenever: a beneficiary is born or dies, you marry or divorce, you acquire or dispose of a significant asset, tax or estate laws change in your jurisdiction, or your financial situation changes materially.

3. **Involve your advisory team.** Each review should involve your lawyer (for legal compliance), your scholar (for Shariah compliance), and your trustee (for operational feedback).

4. **Update heir calculations.** Any change in family structure may alter Quranic inheritance shares. Recalculate the fara'id each time the family tree changes and ensure the trust distributions remain aligned.

5. **Document every review.** Keep a written record of what was reviewed, what changes were made, and the rationale for each decision. This creates an audit trail for future trustees and heirs.

6. **Communicate with beneficiaries.** When changes are made, inform affected family members. Transparency prevents surprises and disputes.

7. **Benchmark:** You have completed this step when you have a documented review schedule, a list of trigger events, and have completed your first review with your lawyer and scholar.` },
      ],
    },
    {
      title: 'Transfer assets to joint or trust ownership to protect heirs and avoid probate complications',
      priority: 'low', tags: ['estate', 'planning'],
      description: 'Probate processes can be lengthy, expensive, and may distribute assets contrary to Islamic law. Transferring assets into joint ownership or a trust structure during your lifetime can protect your heirs from these complications and ensure a smoother, Shariah-aligned transition.',
      subtasks: [
        { title: 'Identify assets that would benefit from joint or trust ownership', done: false,
          description: `**Why does this matter?**

Not every asset benefits equally from being placed in joint or trust ownership. Some assets — like the family home or a business — may be better protected through a trust to ensure continuity and avoid forced sale during probate. Others — like a personal savings account — may be simpler to leave in individual ownership with a clear will. Identifying which assets genuinely benefit from restructured ownership prevents unnecessary complexity and ensures you focus your legal and financial resources where they will have the greatest protective effect for your heirs.

---

**How do I accomplish this?**

1. **Review your asset inventory.** Go through every significant asset and evaluate: What would happen to this asset if I passed away tomorrow under current ownership? Would it be frozen during probate? Could it be subject to forced sale? Would my heirs face delays in accessing it?

2. **Prioritise assets with high probate risk.** Real estate, business interests, and large investment accounts are commonly delayed or complicated by probate. These are strong candidates for trust ownership.

3. **Consider assets with operational continuity needs.** A family business or rental property needs ongoing management. If ownership freezes during probate, the business may suffer or tenants may be left without a responsible landlord.

4. **Evaluate joint ownership candidates.** Some assets (e.g., a joint bank account with a spouse) may be simpler to restructure as joint ownership rather than placing them in a trust. Joint ownership allows the surviving owner to continue using the asset without interruption.

5. **Assess the costs and complexity.** Transferring ownership has legal costs, potential tax implications, and administrative overhead. Weigh these against the benefits for each asset.

6. **Benchmark:** You have completed this step when you have a categorised list of assets, clearly marking which ones would benefit from trust ownership, which from joint ownership, and which are best left in individual ownership with a clear will.` },
        { title: 'Consult a lawyer on the probate laws in your jurisdiction and how trust structures interact with them', done: false,
          description: `**Why does this matter?**

Probate laws vary dramatically between jurisdictions — what works in one country or state may be irrelevant or even counterproductive in another. Some jurisdictions have streamlined probate processes that make trusts unnecessary for smaller estates. Others have lengthy, expensive probate procedures that make trust ownership highly advantageous. Understanding your specific jurisdiction's laws ensures you are solving a real problem rather than adding unnecessary legal complexity based on generic advice.

---

**How do I accomplish this?**

1. **Find a probate-experienced lawyer in your jurisdiction.** General practice lawyers may not have deep knowledge of estate and probate law. Seek a specialist.

2. **Ask specific questions.** How long does probate typically take in this jurisdiction? What are the costs (court fees, executor fees, legal fees)? Can certain assets bypass probate (e.g., jointly held property, assets with designated beneficiaries)? How do trusts interact with the probate process here — do they fully avoid it?

3. **Understand tax implications.** In some jurisdictions, transferring assets into a trust triggers capital gains tax or transfer duties. In others, trusts receive favourable tax treatment. Know the financial impact before proceeding.

4. **Discuss Islamic-specific concerns.** Ask whether the trust structure can accommodate Quranic inheritance shares. Some trust laws give trustees discretionary power that may conflict with the fixed shares prescribed by Allah.

5. **Get a written summary.** Ask the lawyer to provide a brief written overview of the probate process, trust benefits, and costs specific to your jurisdiction and estate size.

6. **Benchmark:** You have completed this step when you have a clear, written understanding of how probate works in your jurisdiction, the specific advantages and costs of trust structures, and any tax implications of asset transfers.` },
        { title: 'Verify that the proposed transfer does not violate Islamic inheritance principles', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (2:235)
**Arabic:** 
**Translation:** There is no blame upon you whether you hint at a marriage proposal to such women or keep the proposal hidden in your hearts. Allah knows that you will think of them in that connection. But do not make any secret engagement with them and speak openly in an honourable manner. Do not resolve on the marriage tie until the ordained term has come to its end. Know well that Allah knows even what is in your hearts. So, have fear of Him and know well that Allah is All-Forgiving, All-Forbearing.

**II. Sources from the Hadith**


### Sahih Bukhari 1643
Narrated \`Urwa:I asked \`Aisha : "How do you interpret the statement of Allah,. : Verily! (the mountains) As-Safa and Al-Marwa are among the symbols of Allah, and whoever performs the Hajj to the Ka\`ba or performs \`Umra, it is not harmful for him to perform Tawaf between them (Safa and Marwa.) (2.158). By Allah! (it is evident from this revelation) there is no harm if one does not perform Tawaf between Safa and Marwa." \`Aisha said, "O, my nephew! Your interpretation is not true. Had this interpretation of yours been correct, the statement of Allah should have been, 'It is not harmful for him if he does not perform Tawaf between them.' But in fact, this divine inspiration was revealed concerning the Ansar who used to assume Ihram for worshipping an idol called "Manat" which they used to worship at a place called Al-Mushallal before they embraced Islam, and whoever assumed Ihram (for the idol), would consider it not right to perform Tawaf between Safa and Marwa. When they embraced Islam, they asked Allah's Messenger (ﷺ) regarding it, saying, "O Allah's Apostle! We used to refrain from Tawaf between Safa and Marwa." So Allah revealed: 'Verily; (the mountains) As-Safa and Al-Marwa are among the symbols of Allah.' " Aisha added, "Surely, Allah's Apostle set the tradition of Tawaf between Safa and Marwa, so nobody is allowed to omit the Tawaf between them." Later on I (\`Urwa) told Abu Bakr bin \`Abdur-Rahman (of \`Aisha's narration) and he said, 'I have not heard of such information, but I heard learned men saying that all the people, except those whom \`Aisha mentioned and who used to assume Ihram for the sake of Manat, used to perform Tawaf between Safa and Marwa. When Allah referred to the Tawaf of the Ka\`ba and did not mention Safa and Marwa in the Qur'an, the people asked, 'O Allah's Messenger (ﷺ)! We used to perform Tawaf between Safa and Marwa and Allah has revealed (the verses concerning) Tawaf of the Ka\`ba and has not mentioned Safa and Marwa. Is there any harm if we perform Tawaf between Safa and Marwa?' So Allah revealed: "Verily As-Safa and Al- Marwa are among the symbols of Allah." Abu Bakr said, "It seems that this verse was revealed concerning the two groups, those who used to refrain from Tawaf between Safa and Marwa in the Pre- Islamic Period of ignorance and those who used to perform the Tawaf then, and after embracing Islam they refrained from the Tawaf between them as Allah had enjoined Tawaf of the Ka\`ba and did not mention Tawaf (of Safa and Marwa) till later after mentioning the Tawaf of the Ka\`ba
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

Some trust and joint ownership structures, while legally advantageous, can inadvertently violate Islamic inheritance rules. For example, placing all assets in joint ownership with one child effectively disinherits other heirs. Creating an irrevocable trust that distributes equally among children ignores the Quranic rule that a son receives twice the share of a daughter. Any ownership restructuring must be evaluated through the lens of fara'id to ensure no heir is deprived of their God-given right and no Quranic boundary is crossed.

---

**How do I accomplish this?**

1. **Present the proposed structure to your Islamic scholar.** Share the specific details: which assets are being transferred, to what type of ownership (joint, trust), who the named beneficiaries are, and how distributions will work.

2. **Check against Quranic shares.** Will the trust or joint ownership structure result in each heir receiving their correct Quranic share upon your death? If the trust distributes equally rather than according to fara'id, it needs restructuring.

3. **Evaluate timing of distributions.** Islamic law generally requires that heirs receive their shares without unreasonable delay after debts and bequests are settled. A trust that holds assets indefinitely (e.g., until the youngest heir reaches age 40) may be problematic.

4. **Assess the trustee's discretionary power.** If the trustee has the power to withhold or redirect distributions, this could override the Quranic shares. Ensure the trust deed limits discretion to administrative matters, not to the allocation of shares.

5. **Obtain a Shariah compliance opinion.** Ask the scholar to confirm in writing that the proposed ownership restructuring does not violate Islamic inheritance principles.

6. **Benchmark:** You have completed this step when your Islamic scholar has reviewed the proposed transfers, confirmed they do not violate fara'id or other Shariah principles, and provided a written compliance opinion.` },
        { title: 'Execute the legal transfer of ownership with proper documentation', done: false,
          description: `**Why does this matter?**

Planning and verification are meaningless without execution. Until assets are actually transferred — deeds re-titled, accounts restructured, ownership certificates updated — your heirs remain exposed to the very probate complications you set out to avoid. Execution is the bridge between intention and protection. It must be done properly, with full legal documentation, to ensure the transfers are recognised by courts, financial institutions, and government registries.

---

**How do I accomplish this?**

1. **Work with your lawyer to prepare transfer documents.** Each asset type requires specific legal instruments: property requires a deed transfer, investment accounts require account re-registration forms, vehicles require title transfers, and business interests require partnership or shareholder agreement amendments.

2. **Execute transfers in the correct order.** Your lawyer may recommend a specific sequence to minimise tax events or administrative complications. Follow their guidance on timing.

3. **File with relevant authorities.** Property transfers must be recorded with the land registry. Vehicle transfers must be filed with the motor vehicle authority. Business ownership changes may need to be filed with corporate registries.

4. **Obtain confirmation from each institution.** For every transferred asset, obtain written confirmation that the new ownership (trust or joint) is recorded in the institution's records. Do not assume the transfer is complete until confirmed.

5. **Update your personal financial records.** Adjust your asset inventory, zakah calculations, and insurance policies to reflect the new ownership structure.

6. **Inform your executor.** Ensure the person responsible for administering your estate understands the new ownership structure and knows which assets are in trust, which are jointly held, and which remain in individual ownership.

7. **Benchmark:** You have completed this step when every planned transfer has been legally executed, confirmed by the relevant institutions, and reflected in your personal financial records and estate plan.` },
      ],
    },
    {
      title: 'Set up a structured charitable ownership vehicle — waqf, foundation, or endowment',
      priority: 'low', tags: ['waqf', 'legacy'],
      description: 'A waqf is a permanent endowment in Islam — an asset whose principal is preserved while its returns benefit a designated cause indefinitely. Establishing a waqf or equivalent charitable vehicle is one of the most powerful forms of sadaqah jariyah, creating ongoing benefit that outlasts your lifetime.',
      subtasks: [
        { title: 'Study the fiqh of waqf — conditions, types, and management requirements', done: false,
          description: `**Why does this matter?**

A waqf is one of the most powerful financial instruments in Islamic civilisation — a permanent endowment whose principal is preserved while its returns serve a designated purpose indefinitely. Historically, waqf institutions funded mosques, hospitals, schools, water fountains, and even animal shelters across the Muslim world. But a waqf has specific fiqhi conditions: it must be irrevocable, the asset must be productive or income-generating, and the purpose must be charitable. Understanding these conditions before you establish a waqf prevents costly mistakes and ensures your endowment will function as intended.

---

**How do I accomplish this?**

1. **Study the classical definition.** A waqf is the dedication of an asset by its owner for a charitable purpose in perpetuity. The principal (ayn) is preserved and cannot be sold, gifted, or inherited, while the income (ghalah) is directed to the stated purpose.

2. **Learn the conditions of validity.** The asset must be: owned outright by the endower, capable of generating benefit or income, clearly defined, and dedicated irrevocably. The purpose must be charitable or beneficial in the sight of Shariah.

3. **Understand the types of waqf.** Waqf khayri (public charitable waqf), waqf ahli or dhurri (family waqf benefiting descendants before eventually reverting to charity), and waqf mushtarak (mixed waqf serving both family and public). Each has different rules and implications.

4. **Study management requirements.** A waqf requires a mutawalli (administrator) who manages the asset, distributes income, and ensures the endowment's purpose is fulfilled. The mutawalli has fiduciary obligations and cannot use the waqf for personal benefit.

5. **Read about modern waqf structures.** Contemporary scholars and institutions have developed cash waqf, investment waqf, and corporate waqf models that make endowment accessible even without owning physical property.

6. **Benchmark:** You have completed this step when you can explain the conditions, types, and management requirements of a waqf, and have identified which type best suits your intentions and resources.` },
        { title: 'Identify the asset(s) you will dedicate to the waqf (property, cash, investments)', done: false,
          description: `**Why does this matter?**

The choice of asset determines the waqf's viability, income potential, and longevity. A waqf dedicated with an unproductive asset will generate no benefit. A waqf funded with an asset you cannot truly afford to part with will strain your own financial obligations. The asset must be something you own outright, that can generate sustainable income, and that you can irrevocably dedicate without compromising your family's nafaqah, your zakah obligations, or your debts. This decision requires both generosity and wisdom.

---

**How do I accomplish this?**

1. **Review your asset portfolio.** Identify which assets are surplus to your needs — beyond what is required for nafaqah, emergency reserves, zakah, and debt obligations.

2. **Evaluate income-generating potential.** A rental property generates monthly income. An investment portfolio generates dividends and capital gains. Cash can be invested to generate returns. Choose an asset (or combination) that will produce reliable income for the waqf's beneficiaries.

3. **Consider longevity.** A waqf is intended to be permanent. A depreciating asset (like a vehicle) is a poor choice. Real estate, diversified investments, or a cash endowment invested in Shariah-compliant instruments are more appropriate for long-term sustainability.

4. **Assess legal transferability.** Ensure the asset can be legally and irrevocably dedicated. Some assets (e.g., jointly owned property, assets with liens) may have restrictions that need to be resolved before endowment.

5. **Start with what is feasible.** You do not need to endow a building or a million-dollar portfolio. Many scholars support cash waqf, where even a modest sum is invested and the returns are directed to charity. Begin where you can and grow the endowment over time.

6. **Benchmark:** You have completed this step when you have identified specific assets for the waqf, confirmed they are surplus to your obligations, capable of generating income, and legally transferable.` },
        { title: 'Define the beneficiaries and purpose of the waqf (education, masjid, community service)', done: false,
          description: `**Why does this matter?**

The purpose (masraf) of the waqf is its soul — it determines who benefits and how, for potentially centuries to come. A vague purpose like "for good causes" invites mismanagement and disputes among future administrators. A well-defined purpose — "to fund scholarships for orphans in this city" or "to maintain this masjid and its programmes" — provides clear direction and accountability. The purpose must be charitable in the sight of Shariah and specific enough to guide the mutawalli's decisions without being so rigid that it becomes impractical as circumstances change.

---

**How do I accomplish this?**

1. **Reflect on your values and priorities.** What causes are closest to your heart? Education, healthcare, mosque support, feeding the poor, supporting new Muslims, environmental conservation, or something else? The waqf should reflect a cause you care deeply about, as it will carry your legacy.

2. **Assess community needs.** Look at what your local Muslim community or broader society needs most. A waqf that fills a genuine gap will have greater impact than one that duplicates existing services.

3. **Define beneficiaries clearly.** Specify who benefits: students of a particular school, worshippers at a named masjid, orphans in a defined region, or a specific category of people in need. Avoid overly broad designations.

4. **Include flexibility clauses.** While the purpose should be specific, include provisions for what happens if the original purpose becomes unfulfillable (e.g., "if the named school closes, the income shall support Islamic education at the nearest equivalent institution"). Classical scholars called this the doctrine of "closest purpose" (aqrab al-maqasid).

5. **Consult with potential beneficiary institutions.** If you intend to support a masjid or school, discuss the endowment with their leadership to ensure the income will be used effectively.

6. **Benchmark:** You have completed this step when you have a written statement defining the waqf's purpose, its beneficiaries, and contingency provisions, reviewed by someone knowledgeable in waqf law.` },
        { title: 'Engage a lawyer to establish the waqf with legal standing in your jurisdiction', done: false,
          description: `**Why does this matter?**

A waqf that exists only as a personal intention or a verbal declaration has no legal protection. Without formal legal standing, the asset could be claimed by heirs, seized by creditors, or simply neglected after your death. Establishing the waqf through proper legal channels — whether as a registered charitable trust, a foundation, or a statutory endowment — ensures it will be recognised, protected, and enforceable under the laws of your jurisdiction, giving it the institutional permanence that the concept of waqf demands.

---

**How do I accomplish this?**

1. **Research available legal structures.** Depending on your jurisdiction, a waqf may be structured as: a charitable trust, a registered foundation, a nonprofit corporation, or (in some Muslim-majority countries) a formally registered waqf. Each has different registration requirements, tax treatment, and governance rules.

2. **Find a lawyer with nonprofit or trust experience.** The lawyer does not need to be Muslim, but should understand irrevocable charitable trusts and be willing to structure the entity to accommodate the waqf's Islamic requirements.

3. **Provide the lawyer with your waqf specifications.** Share: the asset being endowed, the stated purpose, the named beneficiaries, the desired governance structure, and the Shariah compliance requirements identified by your scholar.

4. **Review the legal documents.** Ensure the founding documents include: irrevocability (the endowment cannot be reclaimed), the specific charitable purpose, governance and succession provisions for the mutawalli, accounting and reporting requirements, and the flexibility clause for changed circumstances.

5. **Register with relevant authorities.** File the waqf entity with the appropriate government body — charity commission, corporate registry, or waqf board — to obtain formal legal standing.

6. **Benchmark:** You have completed this step when the waqf has been formally established as a legal entity in your jurisdiction, with all founding documents executed and filed.` },
        { title: 'Appoint a trustworthy administrator (mutawalli) to manage the waqf', done: false,
          description: `**Why does this matter?**

The mutawalli is the guardian of the waqf — the person (or institution) responsible for preserving the endowed asset, managing its income, and distributing benefits to the designated beneficiaries. A poorly chosen mutawalli can mismanage the asset, divert funds, or neglect the waqf's purpose entirely. History is full of waqf endowments that collapsed not because the asset failed, but because the administrator was untrustworthy, incompetent, or absent. Choosing the right mutawalli is arguably the most consequential decision in establishing a waqf.

---

**How do I accomplish this?**

1. **Define the required qualities.** The mutawalli must be: trustworthy (amin), competent in financial management, committed to the waqf's purpose, and available to fulfil the role's ongoing responsibilities. Ideally, they should also understand basic Islamic principles related to charitable endowments.

2. **Consider individuals and institutions.** An individual mutawalli (a family member, a respected community leader) offers personal accountability. An institutional mutawalli (a waqf foundation, a community organisation, a professional trustee company) offers continuity beyond any individual's lifetime.

3. **Plan for succession.** The mutawalli will not serve forever. Define how the next mutawalli will be appointed — by the current mutawalli, by a board, by the beneficiary institution, or by a court. This succession plan is critical for the waqf's long-term viability.

4. **Define the mutawalli's responsibilities.** Spell out: asset maintenance and preservation, income collection and distribution, financial record-keeping and reporting, compliance with the waqf deed's terms, and accountability to beneficiaries and any oversight body.

5. **Set compensation terms.** Islamic law permits the mutawalli to receive reasonable compensation for their work. Define this in the waqf deed to avoid future disputes.

6. **Benchmark:** You have completed this step when you have appointed a mutawalli (or institutional administrator), defined their responsibilities and compensation, established a succession plan, and formalised everything in the waqf deed.` },
        { title: 'Document the waqf deed and register it with relevant authorities', done: false,
          description: `**Why does this matter?**

The waqf deed (waqfiyyah) is the founding document that defines everything: the endowed asset, the purpose, the beneficiaries, the mutawalli, the governance rules, and the conditions of operation. In Islamic history, waqf deeds were meticulously documented and publicly recorded to ensure transparency and permanence. A well-drafted, properly registered waqf deed is the single document that transforms a generous intention into a legally protected, perpetually operating charitable institution.

---

**How do I accomplish this?**

1. **Draft the waqf deed comprehensively.** The document should include: the full legal name of the endower (waqif), a detailed description of the endowed asset, the stated charitable purpose, the named beneficiaries or categories of beneficiaries, the appointed mutawalli and succession provisions, governance and accountability requirements, conditions for the use of income, the flexibility clause for changed circumstances, and a declaration of irrevocability.

2. **Have the deed reviewed by both your lawyer and scholar.** The lawyer ensures legal enforceability; the scholar ensures Shariah compliance. Both should sign off before finalisation.

3. **Execute the deed formally.** Sign the waqf deed in the presence of witnesses. In many jurisdictions, notarisation adds legal weight and protection.

4. **Register with government authorities.** Depending on your jurisdiction, register the waqf with: the charity commission, the corporate registry, the waqf board (in Muslim-majority countries), or the relevant tax authority for charitable status.

5. **Distribute certified copies.** Provide certified copies to: the mutawalli, your personal estate files, the beneficiary institution (if applicable), and your lawyer for safekeeping.

6. **Announce the waqf appropriately.** While humility in charity is valued, a waqf benefits from public knowledge — it encourages others and establishes community accountability. Consider informing your local community or mosque.

7. **Benchmark:** You have completed this step when the waqf deed is executed, registered with relevant authorities, distributed to all necessary parties, and the waqf is fully operational with income flowing to its stated beneficiaries.` },
      ],
    },
  ],

  
// ── CIRCULATION & IMPACT ──
  wealth_circulation_core: [
    {
      title: 'Calculate your zakah precisely — nisab, hawl, and applicable categories (cash, gold, trade goods)',
      priority: 'urgent', tags: ['zakah', 'fard'],
      description: 'Zakah is the third pillar of Islam and a fard obligation on every Muslim whose wealth exceeds the nisab threshold for one lunar year (hawl). Calculating it precisely — across all zakatable assets including cash, gold, silver, trade inventory, and investments — ensures you fulfil this pillar correctly.',
      subtasks: [
        { title: 'Determine the current nisab threshold in your currency (gold or silver standard)', done: false,
          description: `**Why does this matter?**

The nisab is the minimum wealth threshold that triggers the zakah obligation. Without knowing the current nisab in your local currency, you cannot determine whether zakah is even due on your wealth. The nisab is tied to the value of gold (85 grams) or silver (595 grams), and because commodity prices fluctuate, the monetary equivalent changes regularly. Using an outdated or incorrect nisab figure could lead you to either pay zakah when it is not yet obligatory or, worse, neglect an obligation that has already become binding.

---

**How do I accomplish this?**

1. **Choose the gold or silver standard.** The majority of scholars recommend using the silver standard as it results in a lower threshold, making zakah due on more people — which is more cautious and beneficial to the poor. Consult your local scholarly authority for guidance on which standard to follow.

2. **Look up today's market price.** Check a reliable commodities source for the current price per gram of gold (85g) or silver (595g) in your local currency.

3. **Calculate the nisab value.** Multiply the per-gram price by the relevant weight (85g for gold, 595g for silver).

4. **Record and date the figure.** Write down the nisab amount and the date you calculated it, since you will need to reference this on your hawl date.

5. **Set a reminder to recheck.** Precious metal prices shift — recalculate the nisab each time your hawl date approaches so your zakah calculation uses current values.

6. **Benchmark:** You have completed this step when you can state the exact nisab amount in your currency as of today and know which standard (gold or silver) you are following.` },
        { title: 'List all zakatable assets: cash, savings, gold, silver, investments, trade goods', done: false,
          description: `**Why does this matter?**

Zakah applies not just to the cash in your wallet but to a broad range of wealth categories. Many Muslims unknowingly under-pay zakah because they only calculate on bank balances while overlooking gold jewellery beyond personal use, investment portfolios, business inventory, and receivable debts. A comprehensive asset listing ensures nothing zakatable is missed and that you fulfil the obligation completely — because on the Day of Judgement, every dirham of unpaid zakah will be accounted for.

---

**How do I accomplish this?**

1. **List all cash and bank balances.** Include current accounts, savings accounts, and any cash held at home or in safes.

2. **Catalogue gold and silver.** Weigh all gold and silver you own, distinguishing personal-use jewellery (which some scholars exempt) from items held as stores of value.

3. **Value your investments.** Include stocks, mutual funds, and retirement accounts that are accessible. Use the market value on your hawl date.

4. **Assess trade goods and business inventory.** If you own a business, include the current market value of goods held for sale — not fixed assets like equipment or premises.

5. **Include receivable debts.** Money owed to you that you reasonably expect to collect is zakatable according to the majority of scholars.

6. **Exclude personal-use items.** Your home, car, clothing, and household furniture are not zakatable.

7. **Compile everything into a single document or spreadsheet.** Having one clear record makes the subtraction and calculation steps straightforward.

8. **Benchmark:** You have completed this step when you have a single, dated list of every zakatable asset you own with its current value.` },
        { title: 'Subtract any immediate debts that are due from your total zakatable wealth', done: false,
          sources: `**I. Sources from the Hadith**


### Sahih Bukhari 2287
Narrated Abu Huraira:The Prophet (ﷺ) said, "Procrastination (delay) in paying debts by a wealthy man is injustice. So, if your debt is transferred from your debtor to a rich debtor, you should agree
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

Islam does not require you to pay zakah on wealth that is effectively owed to others. Debts that are immediately due — such as outstanding bills, loan repayments falling within the current period, and credit card balances — reduce your net zakatable wealth. Failing to account for these debts could mean you overpay (which is permissible but may strain your finances unnecessarily), while ignoring the deduction principle misrepresents your actual financial standing before Allah. The goal is precision and justice — zakah is calculated on what you truly own free and clear.

---

**How do I accomplish this?**

1. **List all debts currently due.** Include rent, utility bills, credit card balances, loan instalments due this month, and any personal debts you are obligated to repay now.

2. **Distinguish immediate from long-term debts.** Most scholars hold that only the portion of debt due within the current year (or the current instalment) is deductible — not the entire principal of a long-term loan. Consult a scholar if your situation is complex.

3. **Subtract the total from your zakatable asset list.** Take the total from your asset inventory and deduct the sum of immediately due debts.

4. **Compare the net figure to the nisab.** If the result is below the nisab threshold, zakah is not currently due — but continue tracking for next year.

5. **Document the deduction clearly.** Record which debts you subtracted and their amounts so you can revisit this if questioned or for next year's reference.

6. **Benchmark:** You have completed this step when you have a net zakatable wealth figure with all qualifying deductions accounted for and documented.` },
        { title: 'Calculate 2.5% of the net zakatable amount', done: false,
          description: `**Why does this matter?**

The rate of 2.5% (one-fortieth) on most categories of wealth is a divinely prescribed proportion — not a suggestion or a guideline. Calculating this figure precisely ensures you pay exactly what is due: not so little that you fall short of the obligation, and not so much that you treat zakah as an informal charity rather than a structured pillar of Islam. This is the culmination of the previous steps — the number you arrive at here is the actual amount you must distribute to eligible recipients.

---

**How do I accomplish this?**

1. **Take your net zakatable wealth figure.** This is the number from the previous step — total zakatable assets minus immediately due debts.

2. **Multiply by 0.025.** This gives you exactly 2.5% of your net zakatable wealth. For example, if your net zakatable wealth is \$40,000, your zakah is \$1,000.

3. **Handle different asset categories separately if needed.** Agricultural produce, livestock, and mineral extraction have different rates (5%, 10%, or 20% depending on the category). If you hold these, calculate them at their specific rates rather than the standard 2.5%.

4. **Round up, not down.** When in doubt, round the zakah amount up slightly. It is better to give a little extra than to risk falling short of an obligation.

5. **Record the final zakah amount clearly.** Write it alongside the date, the asset breakdown, and the deductions — this becomes your zakah record for the year.

6. **Benchmark:** You have completed this step when you have a single, precise monetary figure representing your total zakah obligation for this hawl period.` },
        { title: 'Record your hawl date and set a reminder for annual recalculation', done: false,
          description: `**Why does this matter?**

The hawl — the lunar year that must pass over wealth exceeding the nisab — is the temporal trigger for zakah. Without a fixed hawl date, you risk either forgetting the obligation entirely or calculating at inconsistent intervals. Many Muslims lose track of when their wealth first exceeded nisab, leading to years of uncertainty and potential missed payments. Establishing and recording your hawl date transforms zakah from a vague annual intention into a precise, scheduled obligation.

---

**How do I accomplish this?**

1. **Determine when your wealth first exceeded the nisab.** If you know the approximate date, use that as your hawl start. If you are unsure, consult a scholar — many recommend picking a fixed Islamic calendar date (such as 1st Ramadan) and using it consistently going forward.

2. **Convert to both Hijri and Gregorian calendars.** Zakah is technically based on the lunar year (approximately 354 days), which is shorter than the solar year. Using the Hijri date ensures precision; having the Gregorian equivalent helps with practical scheduling.

3. **Set a recurring annual reminder.** Use your phone, calendar app, or task system to alert you at least two weeks before your hawl date — giving you time to gather asset information and calculate.

4. **Create a simple zakah log.** A spreadsheet or notebook where you record each year's hawl date, asset total, deductions, and zakah paid. This becomes invaluable if you ever need to verify past payments.

5. **Benchmark:** You have completed this step when you have a recorded hawl date, a recurring reminder set, and a log template ready for annual use.` },
      ],
    },
    {
      title: 'Distribute zakah to eligible recipients immediately — do not delay beyond the hawl date',
      priority: 'urgent', tags: ['zakah', 'obligation'],
      description: 'Once your hawl date arrives and zakah is due, it must be distributed without unnecessary delay. The poor and needy have a right (haqq) to this portion of your wealth — withholding it is a serious sin. Identify eligible recipients and ensure the funds reach them promptly.',
      subtasks: [
        { title: 'Identify local eligible recipients from the eight categories in Surah At-Tawbah 9:60', done: false,
          description: `**Why does this matter?**

Allah did not leave zakah distribution to personal preference — He specified exactly eight categories of eligible recipients in Surah At-Tawbah 9:60. Distributing zakah to someone outside these categories does not fulfil the obligation. By identifying real people and causes in your local community that match these categories, you ensure your zakah reaches those with a divinely established right to it, and you build direct, personal connections with the people your wealth is meant to serve.

---

**How do I accomplish this?**

1. **Review the eight categories.** The poor (fuqara), the needy (masakin), zakah administrators, those whose hearts are to be reconciled, those in bondage, debtors, in the cause of Allah (fi sabilillah), and the stranded traveller (ibn al-sabil).

2. **Ask your local imam or masjid.** They often know community members facing financial hardship who would qualify as fuqara or masakin.

3. **Check with community organisations.** Food banks, refugee assistance groups, and Islamic relief organisations often serve people in multiple eligible categories.

4. **Look within your extended family.** Zakah can be given to relatives (other than those you are obligated to support), and doing so carries double reward — charity and maintaining kinship ties.

5. **Verify eligibility respectfully.** You do not need to interrogate recipients, but confirm through reasonable means that they fall within the eligible categories.

6. **Benchmark:** You have completed this step when you have identified at least two to three specific individuals or organisations locally that serve verified eligible zakah recipients.` },
        { title: 'Research trustworthy zakah distribution organisations if distributing through an intermediary', done: false,
          description: `**Why does this matter?**

Not everyone has direct access to all eight categories of zakah recipients, especially categories like those in bondage or stranded travellers. Trustworthy zakah organisations bridge this gap — they have the infrastructure to verify eligibility, reach underserved populations, and distribute funds efficiently. However, not all organisations are equal in transparency or Shariah compliance. Choosing poorly could mean your zakah funds are misallocated, delayed, or used for administrative overhead beyond what is permissible.

---

**How do I accomplish this?**

1. **Start with well-known Islamic charities.** Organisations with established reputations, published annual reports, and scholarly oversight are safer starting points.

2. **Check for Shariah advisory boards.** A credible zakah organisation should have a qualified Islamic scholar or committee overseeing its fund allocation to ensure compliance with fiqhi rules.

3. **Review financial transparency.** Look for published annual reports showing what percentage of funds reach recipients versus administrative costs. The lower the overhead, the more of your zakah reaches those entitled to it.

4. **Ask about distribution timelines.** Your zakah should be distributed promptly — organisations that pool funds for months before distributing may not align with the urgency of the obligation.

5. **Verify they distinguish zakah from sadaqah.** A trustworthy organisation keeps zakah funds in a separate, restricted account and only distributes them to eligible categories.

6. **Seek recommendations from scholars you trust.** Local or national scholars often endorse specific organisations they have vetted personally.

7. **Benchmark:** You have completed this step when you have identified at least one organisation you trust to distribute zakah on your behalf, with evidence of their Shariah compliance and financial transparency.` },
        { title: 'Distribute the full zakah amount within days of the hawl date', done: false,
          description: `**Why does this matter?**

Once the hawl passes and zakah becomes due, it is no longer your money — it belongs to the eligible recipients. Delaying distribution without valid reason is a form of withholding what others are owed. The scholars emphasise that zakah should be paid promptly, and some hold that unnecessary delay is sinful. The urgency also reflects the reality that the poor and needy cannot wait — their needs are immediate, and your obligation is time-sensitive.

---

**How do I accomplish this?**

1. **Prepare before the hawl date.** If you have already identified recipients and calculated your amount, distribution should be straightforward on the day itself.

2. **Distribute in person where possible.** Direct, personal distribution strengthens community bonds and allows you to see the impact of your zakah firsthand.

3. **Transfer to organisations immediately.** If using an intermediary, make the transfer on or within days of the hawl date — do not wait for a "convenient time."

4. **Distribute the full amount.** Do not hold back a portion "just in case." The entire calculated zakah must be distributed. If you want to give more, that becomes voluntary sadaqah.

5. **Diversify if possible.** Consider splitting your zakah across multiple recipient categories or individuals to maximise its reach across the eight eligible groups.

6. **Benchmark:** You have completed this step when the full zakah amount has left your possession and reached eligible recipients or a verified distribution organisation within a few days of your hawl date.` },
        { title: 'Obtain receipts or confirmation of distribution for your records', done: false,
          description: `**Why does this matter?**

Keeping records of your zakah distribution is a practical safeguard, not a spiritual requirement. Records protect you from uncertainty in future years — you will never wonder whether you actually paid or how much you gave. They also help if you need to consult a scholar about past obligations, claim tax deductions where applicable, or verify that an intermediary organisation actually distributed your funds. The Quran itself emphasises documenting financial transactions (2:282), and zakah is among the most significant financial acts a Muslim undertakes.

---

**How do I accomplish this?**

1. **Request receipts from organisations.** Any reputable zakah distribution organisation will provide a receipt or confirmation of your contribution.

2. **For direct distribution, record the details yourself.** Note the date, amount, recipient (a general description is sufficient — you need not record names if you want to preserve dignity), and the category they fall under.

3. **Store records alongside your zakah log.** Keep everything in one place — your hawl date, asset calculations, deductions, and distribution confirmations.

4. **Photograph or scan physical receipts.** Paper receipts fade and get lost. A digital backup ensures permanence.

5. **Review records at the next hawl date.** Before calculating next year's zakah, review last year's records to confirm everything was completed and to identify any lessons for improvement.

6. **Benchmark:** You have completed this step when you have a dated record of every zakah distribution you made this year, stored in a reliable location alongside your zakah calculation records.` },
        { title: 'Make dua that Allah accepts your zakah and places barakah in your remaining wealth', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (30:39)
**Arabic:** 
**Translation:** Whatever Ribā (increased amount) you give, so that it may increase in the wealth of the people, it does not increase with Allah; and whatever Zakāh you give, seeking Allah’s pleasure with it, (it is multiplied by Allah, and) it is such people who multiply (their wealth in real terms.)`,
          description: `**Why does this matter?**

Zakah is an act of worship, not merely a financial transaction. Like salah and fasting, its acceptance depends on sincerity (ikhlas) and proper intention (niyyah). Making dua after distributing zakah is the spiritual seal on the act — it expresses your awareness that the ability to give was itself from Allah, that acceptance is in His hands alone, and that you seek His barakah in what remains. The Prophet (peace be upon him) would make dua for those who brought their zakah, saying "Allahumma salli 'alayhi" — O Allah, bless them.

---

**How do I accomplish this?**

1. **Make your intention clear before distributing.** Silently affirm in your heart that this payment is zakah for the sake of Allah, fulfilling your obligation.

2. **After distribution, raise your hands in dua.** Ask Allah to accept your zakah, to purify your wealth and soul through it, and to place barakah in what remains.

3. **Ask Allah to benefit the recipients.** Pray that the funds meet their genuine needs and lift them from hardship.

4. **Recite relevant Quranic supplications.** "Rabbana taqabbal minna, innaka Anta al-Sami' al-'Alim" — Our Lord, accept from us, indeed You are the All-Hearing, the All-Knowing (2:127).

5. **Avoid self-congratulation.** The Quran warns against invalidating charity through reminders and harm (2:264). Let the act be between you and Allah, and move forward with humility.

6. **Benchmark:** You have completed this step when you have made sincere dua for acceptance after your zakah distribution, without publicising or dwelling on the act.` },
      ],
    },
    {
      title: 'Pay any outstanding zakah from previous years — make up missed obligations with a scholar\'s guidance',
      priority: 'urgent', tags: ['zakah', 'qada'],
      description: 'If you have missed zakah payments from previous years — whether due to ignorance, negligence, or miscalculation — the obligation remains as a debt to Allah. Calculate the estimated shortfall for each missed year and pay it as soon as possible, consulting a scholar for guidance on complex situations.',
      subtasks: [
        { title: 'Estimate your zakatable wealth for each year you may have missed', done: false,
          description: `**Why does this matter?**

You cannot repay what you cannot quantify. Estimating your zakatable wealth for each missed year is the necessary first step in clearing this debt to Allah. Even if your records are imperfect, a reasonable estimate based on your income trajectory, savings patterns, and major financial events is far better than ignoring the obligation altogether. The scholars agree that a sincere, good-faith estimate fulfils the requirement when exact records are unavailable.

---

**How do I accomplish this?**

1. **Identify the years in question.** Determine when your wealth first exceeded the nisab and count forward to identify each year you may have missed zakah.

2. **Reconstruct your financial history.** Review old bank statements, tax returns, employment records, and any financial documents that indicate your approximate wealth at the end of each year.

3. **Account for major financial events.** Did you buy a home, receive an inheritance, start a business, or take on significant debt? These events shift your zakatable wealth substantially.

4. **Use conservative estimates.** When uncertain, estimate higher rather than lower — it is safer to overpay slightly than to underpay on a fard obligation.

5. **Organise estimates by year.** Create a simple table: Year | Estimated Zakatable Wealth | Estimated Zakah Due (2.5%).

6. **Benchmark:** You have completed this step when you have a year-by-year estimate of your zakatable wealth for every year you suspect was missed, documented in a single reference.` },
        { title: 'Calculate the zakah owed for each missed year (2.5% of that year\'s zakatable wealth)', done: false,
          description: `**Why does this matter?**

Each missed year carries its own independent zakah obligation — you cannot simply calculate once and multiply. Your wealth likely varied year to year due to income changes, expenses, debts, and investments. Calculating each year separately ensures accuracy and prevents you from either overpaying unnecessarily or underpaying and leaving the obligation partially unfulfilled. This methodical approach also gives you a clear total that you can plan to repay.

---

**How do I accomplish this?**

1. **Take each year's estimated zakatable wealth from your reconstruction.** Work through one year at a time, starting from the earliest missed year.

2. **Apply the 2.5% rate to each year's figure.** For example, if you estimate your zakatable wealth was \$20,000 in a given year, the zakah for that year is \$500.

3. **Handle compounding correctly.** There is scholarly discussion on whether unpaid zakah from previous years reduces the base for subsequent years. The safer opinion is to calculate each year on the full estimated wealth for that year. Consult a scholar if the amounts are significant.

4. **Sum the total outstanding.** Add up the zakah owed across all missed years to arrive at your total outstanding zakah debt.

5. **Document the calculation clearly.** Record each year's figure and the total — this becomes your repayment target and your reference if you consult a scholar.

6. **Benchmark:** You have completed this step when you have a clear, documented total of all outstanding zakah owed across every missed year.` },
        { title: 'Consult a scholar on the correct method if wealth records are incomplete', done: false,
          description: `**Why does this matter?**

Zakah is a pillar of Islam with detailed fiqhi rulings, and situations involving missed years, incomplete records, and complex assets often require scholarly guidance to resolve correctly. Well-intentioned guesswork can lead to errors — paying on the wrong asset categories, using incorrect nisab standards, or miscalculating compounding effects. A qualified scholar can provide a ruling tailored to your specific circumstances, give you certainty that your repayment plan is valid, and ease the anxiety that often accompanies this process.

---

**How do I accomplish this?**

1. **Prepare your documentation first.** Bring your year-by-year estimates, your current financial situation, and a summary of what you know and do not know. Scholars can advise much more effectively when you come prepared.

2. **Find a scholar qualified in Islamic finance.** Not every imam specialises in zakah rulings — seek someone with training in fiqh al-mu'amalat (Islamic commercial law) or who has studied zakah in depth.

3. **Ask specific questions.** Rather than "what do I owe?", ask: "Given these estimates and gaps, what method should I use to calculate? Should I use gold or silver nisab? How do I handle years where I have no records?"

4. **Request a written summary of their guidance.** This protects you from forgetting details and gives you a reference document for your repayment plan.

5. **Follow the ruling with confidence.** Once a qualified scholar has reviewed your situation and given guidance, act on it without excessive second-guessing — sincerity and effort are what Allah requires.

6. **Benchmark:** You have completed this step when you have received and documented specific scholarly guidance on your outstanding zakah situation.` },
        { title: 'Create a repayment schedule if the total outstanding amount is large', done: false,
          description: `**Why does this matter?**

If the total outstanding zakah is substantial — which is common when multiple years have been missed — trying to pay it all at once may be financially destabilising. A structured repayment schedule allows you to clear the debt systematically without compromising your current obligations to family, creditors, or this year's zakah. The scholars generally permit spreading makeup zakah payments over time when the total is large, provided you are genuinely committed to completing the repayment and are paying as quickly as your circumstances allow.

---

**How do I accomplish this?**

1. **Start with your total outstanding figure.** This is the sum from your year-by-year calculations or the figure confirmed by a scholar.

2. **Assess your current financial capacity.** Determine how much you can allocate to outstanding zakah each month beyond your current year's zakah and living expenses.

3. **Prioritise this year's zakah first.** Current-year zakah takes precedence — do not delay it in favour of past obligations.

4. **Set a realistic but ambitious timeline.** If you owe \$5,000 in outstanding zakah and can pay \$500/month, plan for 10 months. Aim to clear the debt as quickly as possible without causing hardship.

5. **Distribute on a regular schedule.** Treat each monthly payment like a bill — set up reminders or automatic transfers to maintain consistency.

6. **Track payments against the total.** Maintain a running balance so you always know how much remains.

7. **Benchmark:** You have completed this step when you have a written repayment schedule with monthly amounts, target dates, and a system for tracking progress toward clearing the full outstanding balance.` },
        { title: 'Begin distributing the outstanding zakah immediately, starting with the oldest obligation', done: false,
          description: `**Why does this matter?**

Planning without action is meaningless — the obligation is not fulfilled until the funds actually reach eligible recipients. Starting with the oldest obligation is both a scholarly recommendation and a practical principle: those debts have been outstanding the longest and represent the most urgent moral liability. Every day that passes with known, unpaid zakah is a day the rights of the poor remain unfulfilled. Beginning immediately, even with a partial payment, demonstrates sincerity and sets the repayment process in motion.

---

**How do I accomplish this?**

1. **Make your first payment today.** Even if it is a small portion of the total, distributing something immediately breaks the inertia and establishes the habit.

2. **Start with the earliest missed year.** Allocate your first payments to the oldest outstanding zakah, then work forward chronologically.

3. **Distribute to the same eligible categories as regular zakah.** Outstanding zakah follows the same rules — it must go to the eight categories specified in Surah At-Tawbah 9:60.

4. **Record each payment meticulously.** Note the date, amount, which year's obligation it clears, and who received it. This keeps your running balance accurate.

5. **Maintain your current-year zakah alongside repayments.** Do not pause current obligations while repaying past ones — both run in parallel.

6. **Celebrate milestones.** When you clear a full year's outstanding zakah, acknowledge it with gratitude to Allah — this is a significant spiritual achievement.

7. **Benchmark:** You have completed this step when you have made your first distribution payment toward outstanding zakah and have a system in place for continued regular payments.` },
      ],
    },
    {
      title: 'Establish a dedicated zakah account or envelope — separate and earmark zakah funds before spending',
      priority: 'high', tags: ['zakah', 'planning'],
      description: 'Mixing zakah funds with personal spending money risks accidental misuse. Set up a dedicated account, envelope, or digital category that holds your zakah funds separately. This makes distribution easier, tracking clearer, and ensures the funds are protected from personal spending.',
      subtasks: [
        { title: 'Open a separate savings account or create a dedicated digital envelope for zakah', done: false,
          description: `**Why does this matter?**

When zakah funds sit in the same account as everyday spending money, they become vulnerable to accidental use. A forgotten grocery run, an unexpected bill, or a moment of impulse can erode funds that belong to the poor. Separating zakah into its own account or digital envelope creates a psychological and practical boundary — the money is no longer "yours" in any discretionary sense. This separation mirrors the Quranic principle that within your wealth is a known right (haqq ma'lum) for the needy (70:24-25). A dedicated vessel for that right ensures it is honoured.

---

**How do I accomplish this?**

1. **Choose a method that fits your banking setup.** Many banks allow free secondary savings accounts. Alternatively, budgeting apps like YNAB or GoodBudget offer digital envelope features where you can earmark a portion of your balance without opening a new account.

2. **Open the account or create the envelope today.** Do not wait for the next zakah cycle — set it up now so the infrastructure is ready.

3. **Name it explicitly.** Title it "Zakah Fund" or "Zakah — Do Not Touch" so there is zero ambiguity about its purpose when you glance at your accounts.

4. **Ensure the account is interest-free.** If using a conventional bank, choose an account that does not accrue interest, or arrange to purge any interest earned. An Islamic bank is preferable if available.

5. **Test the setup.** Transfer a token amount into the account to confirm everything works — transfers in, transfers out (for distribution), and visibility in your budgeting system.

6. **Benchmark:** You have completed this step when you have a clearly labelled, interest-free account or digital envelope dedicated exclusively to zakah funds.` },
        { title: 'Set up automatic monthly transfers (1/12 of your estimated annual zakah)', done: false,
          description: `**Why does this matter?**

Paying the full zakah amount in one lump sum at the hawl date can feel financially stressful, which sometimes leads to delay or underpayment. By dividing your estimated annual zakah into twelve monthly portions and automating the transfer, you spread the obligation across the year and ensure the full amount is ready when the hawl arrives. This approach transforms zakah from a once-a-year scramble into a steady, disciplined practice — much like how consistent acts of worship are more beloved to Allah than sporadic bursts.

---

**How do I accomplish this?**

1. **Estimate your annual zakah.** Use last year's calculation as a baseline, or make a conservative estimate based on your current assets. You can adjust later.

2. **Divide by twelve.** If your estimated annual zakah is \$1,200, your monthly transfer is \$100.

3. **Set up the automatic transfer.** Configure a recurring monthly transfer from your primary account to your dedicated zakah account on a fixed date — ideally right after payday.

4. **Build in a buffer.** Consider rounding up slightly (e.g., \$110 instead of \$100) to account for asset growth during the year. Any surplus can become voluntary sadaqah.

5. **Review the estimate quarterly.** If your income or assets change significantly, adjust the monthly amount so the fund stays aligned with your actual obligation.

6. **Benchmark:** You have completed this step when an automatic monthly transfer is active and your zakah fund is growing steadily toward the full annual obligation.` },
        { title: 'Label the account clearly so it is never confused with personal savings', done: false,
          description: `**Why does this matter?**

Human memory is fallible, and financial accounts can blur together over time — especially if you have multiple savings accounts, emergency funds, and investment pots. An unlabelled or generically named zakah account risks being mistaken for personal savings during a financial crunch, leading to accidental misuse of funds that belong to the poor. A clear, unmistakable label is a simple safeguard that costs nothing but prevents a serious error. It also serves as a daily reminder of your commitment to this pillar every time you check your balances.

---

**How do I accomplish this?**

1. **Rename the account in your banking app.** Most banks allow custom account nicknames. Change it from "Savings Account 2" to "ZAKAH FUND — Sacred" or a similarly clear label.

2. **Add a note or description if available.** Some banking platforms let you add a memo to the account. Include a reminder like "For eligible recipients only — Surah At-Tawbah 9:60."

3. **Label it in your budgeting tool as well.** If you use a spreadsheet or budgeting app alongside your bank, ensure the label matches so there is no discrepancy.

4. **Inform household members.** If anyone else in your household has access to your accounts, make sure they know this account is strictly for zakah and is not available for household spending.

5. **Consider a visual cue.** Some banking apps allow colour-coding accounts. Assign a distinct colour to your zakah fund to make it stand out at a glance.

6. **Benchmark:** You have completed this step when your zakah account is clearly labelled across all platforms where it appears, and anyone who sees it would immediately know its purpose.` },
        { title: 'Review the balance quarterly to ensure it aligns with your expected zakah obligation', done: false,
          description: `**Why does this matter?**

A zakah fund that runs on autopilot without periodic review may drift out of alignment with your actual obligation. Your income might increase, you might acquire new zakatable assets, or commodity prices might shift the nisab threshold — all of which affect how much zakah you owe. Quarterly reviews catch these changes early, allowing you to adjust your monthly contributions so the fund holds the correct amount when the hawl date arrives. Without this check, you could reach your hawl date and discover a significant shortfall or surplus that disrupts your distribution plans.

---

**How do I accomplish this?**

1. **Set a quarterly reminder.** Choose four dates spread evenly through the year — ideally at the end of each financial quarter or at the start of each Islamic season.

2. **Check the current balance against projections.** Compare what is in the zakah account with what you expect to owe. If you estimated \$1,200 annually, you should have approximately \$300 by the end of the first quarter.

3. **Reassess your zakatable assets.** Have you acquired new investments, received a windfall, or paid off significant debts? Any of these changes your zakatable base.

4. **Adjust the monthly transfer if needed.** Increase or decrease the automatic transfer to align the fund with your updated estimate.

5. **Check the nisab.** Review current gold or silver prices to confirm the nisab threshold has not changed significantly since your last check.

6. **Document the review.** Note the date, current balance, any adjustments made, and the reason. This creates a paper trail that makes your annual zakah calculation faster and more accurate.

7. **Benchmark:** You have completed this step when you have reviewed your zakah fund balance against your current obligation estimate and made any necessary adjustments to your monthly transfer.` },
      ],
    },
    {
      title: 'Learn the eight eligible recipients of zakah (Surah At-Tawbah 9:60) and identify local options',
      priority: 'medium', tags: ['zakah', 'fiqh'],
      description: 'Allah specified exactly eight categories of people eligible to receive zakah in Surah At-Tawbah 9:60. Knowing these categories — the poor, the needy, zakah administrators, those whose hearts are to be reconciled, slaves seeking freedom, debtors, in the cause of Allah, and the wayfarer — ensures your zakah reaches those truly entitled to it.',
      subtasks: [
        { title: 'Study each of the eight zakah recipient categories with their scholarly definitions', done: false,
          description: `**Why does this matter?**

The eight categories of zakah recipients are not merely a list — they are a divine allocation framework. Each category addresses a distinct form of human vulnerability, from material poverty to spiritual alienation to displacement. Understanding the scholarly definitions of each category prevents you from distributing zakah based on emotional impulse or personal preference rather than divine instruction. A donor who truly understands the categories can identify recipients others overlook, such as debtors drowning in obligations or travellers stranded far from home.

---

**How do I accomplish this?**

1. **Read Surah At-Tawbah 9:60 with its tafsir.** Study a reliable commentary (Ibn Kathir, Al-Qurtubi, or a contemporary equivalent) to understand each category in its Quranic context.

2. **Learn the definitions of al-fuqara (the poor) and al-masakin (the needy).** Scholars distinguish between them — generally, the fuqara have almost nothing while the masakin have some means but not enough to meet basic needs.

3. **Understand the remaining six categories.** Zakah administrators ('amilin), those whose hearts are to be reconciled (mu'allafat al-qulub), those in bondage (fi al-riqab), debtors (al-gharimin), in the cause of Allah (fi sabilillah), and the wayfarer (ibn al-sabil).

4. **Note scholarly differences.** Some categories have broad interpretations (fi sabilillah) while others are narrowly defined. Knowing these differences helps you make informed decisions.

5. **Take notes for personal reference.** Create a one-page summary you can revisit each year when planning your zakah distribution.

6. **Benchmark:** You have completed this step when you can define all eight categories from memory and explain the scholarly distinctions between them.` },
        { title: 'Identify individuals or families in your local community who fall into eligible categories', done: false,
          description: `**Why does this matter?**

Zakah is most impactful when it reaches people you can see, know, and follow up with. Local distribution creates direct accountability — you witness whether the funds alleviate hardship, and the recipient benefits from a personal connection rather than an anonymous transfer. The Prophet (peace be upon him) generally instructed that zakah be collected and distributed within the same community before being sent elsewhere. Identifying real people in your area who qualify also deepens your awareness of the struggles around you, which is itself a spiritual benefit.

---

**How do I accomplish this?**

1. **Start with your masjid.** Speak with the imam or community outreach committee — they often know families facing financial hardship who are too dignified to ask publicly.

2. **Look within your extended family.** Zakah to relatives who qualify carries double reward — the reward of charity and the reward of maintaining kinship ties. Note that you cannot give zakah to those you are obligated to support (spouse, parents, children).

3. **Connect with community social workers.** Local Islamic centres, food pantries, and refugee resettlement organisations interact with eligible recipients daily.

4. **Be observant in your daily life.** The neighbour who lost a job, the single mother struggling with bills, the international student stranded without funds — eligible recipients are often closer than you think.

5. **Respect dignity.** You do not need to interrogate potential recipients. Discreet inquiry through trusted intermediaries is sufficient and preserves the recipient's honour.

6. **Benchmark:** You have completed this step when you have identified at least three specific individuals or families in your local community who fall into eligible zakah categories.` },
        { title: 'Research local and national organisations that distribute zakah to verified recipients', done: false,
          description: `**Why does this matter?**

Some zakah categories — such as those in bondage, debtors with overwhelming obligations, or travellers stranded in distant lands — may not be easily reachable through personal networks. Organisations with dedicated infrastructure can verify eligibility at scale, reach underserved populations, and distribute funds efficiently across multiple categories simultaneously. However, not all organisations handle zakah with the required Shariah rigour, so research is essential to ensure your funds are distributed correctly and reach those with a genuine right to them.

---

**How do I accomplish this?**

1. **Compile a candidate list.** Start with well-known Islamic relief organisations in your country, then add local community foundations and masjid-run zakah programs.

2. **Check for a Shariah advisory board.** A credible organisation should have qualified scholars overseeing zakah fund allocation to ensure it reaches only eligible categories.

3. **Review financial transparency reports.** Look for published annual reports showing the ratio of funds distributed versus administrative overhead. Lower overhead means more reaches recipients.

4. **Ask about fund segregation.** Verify that the organisation keeps zakah funds separate from general sadaqah donations, with distinct accounting for each.

5. **Seek personal recommendations.** Ask scholars, community leaders, and trusted friends which organisations they have vetted and used for their own zakah.

6. **Test with a small contribution first.** Before committing your full zakah through an organisation, make a smaller contribution and observe their communication, receipting, and follow-up.

7. **Benchmark:** You have completed this step when you have a vetted shortlist of at least two organisations — one local and one national — that you trust to distribute zakah to verified recipients.` },
        { title: 'Create a personal zakah distribution list with names or organisations for each category', done: false,
          description: `**Why does this matter?**

A prepared distribution list eliminates the last-minute scramble that often accompanies zakah season. When the hawl date arrives, you should not be searching for recipients — you should be distributing. A well-maintained list also helps you diversify your zakah across multiple categories rather than defaulting to the same recipient every year. By mapping specific names or organisations to each of the eight categories, you ensure broader coverage of the divine framework and avoid neglecting categories that receive less public attention, such as debtors or wayfarers.

---

**How do I accomplish this?**

1. **Create a simple document or spreadsheet.** List all eight categories as rows, with columns for recipient name, contact method, estimated allocation, and notes.

2. **Fill in what you know.** From your earlier research, assign individuals or organisations to each category where you have identified eligible recipients.

3. **Mark gaps.** If you have no recipients identified for certain categories (e.g., ibn al-sabil or mu'allafat al-qulub), note the gap so you can actively seek them out or designate an organisation that serves those groups.

4. **Decide on allocation percentages.** You are not required to split zakah equally across all eight categories — prioritise based on local need and scholarly guidance. But having a rough allocation prevents over-concentration in one category.

5. **Update the list annually.** Circumstances change — a family that needed zakah last year may have become self-sufficient, while new needs may have arisen.

6. **Benchmark:** You have completed this step when you have a documented distribution list covering at least four of the eight categories, with specific names or organisations assigned to each.` },
        { title: 'Prioritise local distribution where possible for direct community impact', done: false,
          description: `**Why does this matter?**

The prophetic principle of zakah distribution emphasises locality — the Prophet (peace be upon him) instructed Mu'adh ibn Jabal to collect zakah from the wealthy of Yemen and distribute it among their poor. Local distribution keeps wealth circulating within your community, strengthens social bonds between givers and recipients, and allows you to witness the tangible impact of your obligation. It also addresses the needs closest to you first, which is a principle of Islamic priority (al-aqrabun awla bil-ma'ruf). While international causes are valid, neglecting local poverty while sending funds abroad can leave your own neighbours in hardship.

---

**How do I accomplish this?**

1. **Assess local needs first.** Before looking at national or international causes, genuinely evaluate the poverty, debt, and hardship within your immediate community.

2. **Allocate a majority locally.** Consider distributing at least 60-70% of your zakah to local recipients, with the remainder going to broader causes if local needs are met.

3. **Engage directly where possible.** Personal delivery of zakah — done with dignity and discretion — creates human connection and allows you to understand the recipient's situation more fully.

4. **Coordinate with your masjid.** Many masjids have internal zakah funds for community members. Contributing to these ensures local distribution with institutional oversight.

5. **Supplement with national or international causes.** For categories that are difficult to fill locally (e.g., those in bondage or large-scale disaster relief), reputable national organisations bridge the gap.

6. **Revisit the balance annually.** Local needs shift — a community that was well-served last year may face new challenges, or new families may have moved in who need support.

7. **Benchmark:** You have completed this step when you have deliberately prioritised local recipients in your zakah distribution plan and can articulate why you have allocated funds the way you have.` },
      ],
    },
  ],
  wealth_circulation_growth: [
    {
      title: 'Establish a regular sadaqah habit — automate a monthly charitable contribution, however small',
      priority: 'high', tags: ['sadaqah', 'habit'],
      description: 'The Prophet (peace be upon him) said the most beloved deeds to Allah are the most consistent, even if small. Automating a monthly sadaqah contribution — even a modest amount — builds the habit of generosity, purifies your wealth, and provides ongoing support to those in need.',
      subtasks: [
        { title: 'Choose a trusted charitable organisation or local cause to support regularly', done: false,
          description: `**Why does this matter?**

Consistent sadaqah requires a consistent recipient. Without a deliberate choice of where your charity goes, monthly giving becomes reactive — driven by whichever fundraiser appears in your feed rather than by strategic, sustained impact. Choosing a trusted organisation or local cause in advance means your contributions compound over time in a single direction, building something meaningful rather than scattering small amounts across dozens of unrelated appeals. It also ensures your money reaches genuine need rather than being consumed by overhead or mismanagement.

---

**How do I accomplish this?**

1. **Reflect on what matters most to you.** Do you feel drawn to feeding the hungry, educating children, supporting orphans, building masjids, or serving refugees? Your sadaqah should align with causes that resonate with your values and the Maqasid.

2. **Research candidate organisations.** Look for published financial reports, Shariah advisory oversight, and a track record of transparent operations. Ask trusted community members for recommendations.

3. **Consider local causes.** A neighbourhood food bank, a struggling family you know, or your masjid's community fund can all be excellent recipients. Local giving lets you see the impact firsthand.

4. **Verify the organisation distinguishes sadaqah from zakah.** This ensures your voluntary charity is used appropriately and not mixed with obligatory funds.

5. **Start with one.** You can diversify later, but beginning with a single trusted recipient simplifies the setup and builds the habit faster.

6. **Benchmark:** You have completed this step when you have selected one specific organisation or local cause you trust, and you can explain why you chose them.` },
        { title: 'Decide on a monthly amount you can sustain comfortably (start small, increase over time)', done: false,
          description: `**Why does this matter?**

The Prophet (peace be upon him) taught that the most beloved deeds to Allah are the most consistent, even if small. A monthly sadaqah amount that strains your budget will not last — you will skip months, feel resentment, and eventually abandon the habit. Conversely, an amount so small you never notice it may not cultivate the spiritual awareness that giving is meant to produce. The right amount sits in a sweet spot: noticeable enough to remind you of your dependence on Allah, comfortable enough to sustain for years.

---

**How do I accomplish this?**

1. **Review your monthly budget.** After accounting for necessities (nafaqah), zakah savings, debt repayment, and a reasonable emergency buffer, identify what remains as discretionary income.

2. **Start with 1-3% of your net income.** This is a manageable starting point for most people. If your net monthly income is \$4,000, begin with \$40-\$120 per month.

3. **Test the amount for one month.** Live with it before committing to automation. Did it cause hardship? Did you barely notice it? Adjust accordingly.

4. **Plan for annual increases.** Commit now to raising the amount by a fixed percentage (e.g., 10%) each year, or whenever you receive a raise or windfall. Growth should be built into the plan from the start.

5. **Remember that sadaqah extinguishes sin and invites barakah.** The amount is less important than the consistency and sincerity behind it.

6. **Benchmark:** You have completed this step when you have chosen a specific monthly sadaqah amount that you are confident you can sustain for at least twelve months.` },
        { title: 'Set up an automatic recurring transfer or standing order', done: false,
          description: `**Why does this matter?**

Automation removes the single biggest threat to consistent charity: forgetfulness. When sadaqah depends on you remembering to transfer funds manually each month, it competes with every other demand on your attention — and charity rarely wins that contest. An automatic transfer ensures the money moves on schedule regardless of how busy, distracted, or financially anxious you feel in any given month. It also mirrors the discipline of obligatory worship — salah is not optional when you feel like it, and your sadaqah habit should operate with similar reliability.

---

**How do I accomplish this?**

1. **Log into your banking platform.** Navigate to the recurring transfers or standing orders section.

2. **Set the recipient.** Enter the bank details or payment reference for the organisation or individual you chose in the previous step.

3. **Enter the monthly amount.** Use the figure you decided on — and consider rounding up slightly for ease.

4. **Choose a transfer date.** Ideally one or two days after your salary deposits, so the funds are available and the sadaqah leaves before you have a chance to spend it.

5. **Set the recurrence to monthly with no end date.** You can always cancel or adjust later, but starting without an end date reinforces the permanence of the habit.

6. **Confirm the first transfer executes successfully.** Check your account after the first scheduled date to verify the money moved correctly.

7. **Benchmark:** You have completed this step when a recurring automatic transfer is active and has successfully executed at least once.` },
        { title: 'Review and increase the amount annually as your income grows', done: false,
          description: `**Why does this matter?**

A sadaqah habit that never grows stagnates spiritually and practically. As Allah increases your provision, your generosity should expand proportionally — this is both gratitude (shukr) in action and a safeguard against the attachment to wealth that can harden the heart. The Companions would increase their giving as their circumstances improved, and some — like Abu Bakr (may Allah be pleased with him) — gave everything they had. While that level is not expected of everyone, a deliberate annual increase ensures your charity grows with you rather than becoming a rounding error in an expanding budget.

---

**How do I accomplish this?**

1. **Set an annual review date.** Choose a fixed date — perhaps the anniversary of when you started, or the beginning of Ramadan — to evaluate your sadaqah amount.

2. **Compare your current income to last year's.** If your income increased by 15%, consider increasing your sadaqah by at least the same percentage.

3. **Factor in lifestyle inflation.** If your expenses have grown but your giving has not, your charity has effectively decreased in relative terms. Adjust to maintain or increase the proportion.

4. **Consider one-time boosts.** When you receive a bonus, tax refund, or unexpected windfall, add a one-time sadaqah contribution on top of your regular amount.

5. **Update the automatic transfer.** Log into your banking platform and adjust the recurring amount to reflect the new figure.

6. **Benchmark:** You have completed this step when you have reviewed your sadaqah amount at least once since starting and have either increased it or confirmed it remains appropriate relative to your current income.` },
      ],
    },
    {
      title: 'Direct investment or purchasing power toward local Muslim businesses and ethical community ventures',
      priority: 'medium', tags: ['community', 'impact'],
      description: 'Wealth circulation within the community multiplies its impact. By intentionally directing your spending and investment toward local Muslim-owned businesses and ethical ventures, you help build a self-sustaining economic ecosystem that reduces dependency on external systems and strengthens communal bonds.',
      subtasks: [
        { title: 'Identify Muslim-owned and ethical businesses in your local area for common purchases', done: false,
          description: `**Why does this matter?**

Every purchase is a vote for the kind of economy you want to exist. When Muslim consumers default to large chains and anonymous online retailers, wealth flows out of the community permanently. But when you intentionally identify and patronise Muslim-owned businesses — the halal butcher, the Muslim-owned accounting firm, the sister's catering company — that money circulates within the ummah, creating jobs, funding families, and building economic resilience. This is wealth circulation in its most practical, everyday form: using your purchasing power as an instrument of community building.

---

**How do I accomplish this?**

1. **Audit your regular purchases.** List the goods and services you buy most frequently — groceries, clothing, haircuts, car maintenance, professional services, dining out.

2. **Search for Muslim-owned alternatives.** Ask at your masjid, check local Muslim business directories, search social media groups, and ask friends for recommendations.

3. **Evaluate quality and value fairly.** Supporting Muslim businesses does not mean accepting inferior products or inflated prices. Seek businesses that deliver genuine value — your patronage should be sustainable, not charitable.

4. **Include ethical non-Muslim businesses.** Where no Muslim-owned option exists, prioritise businesses with ethical practices — fair wages, honest dealings, environmental responsibility — as these align with Islamic commercial values.

5. **Build a personal directory.** Create a simple list on your phone of Muslim-owned businesses by category so you can reference it quickly when making purchasing decisions.

6. **Benchmark:** You have completed this step when you have identified at least five Muslim-owned or ethical businesses in your area that serve your common purchasing needs.` },
        { title: 'Shift at least 3 regular purchases to local Muslim or ethical vendors', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (3:177)
**Arabic:** 
**Translation:** Those who purchase Unbelief at the price of faith,- not the least harm will they do to Allah, but they will have a grievous punishment.`,
          description: `**Why does this matter?**

Identification without action changes nothing. The real impact comes when you deliberately redirect spending from default vendors to community businesses — and do so consistently. Even shifting three regular purchases creates a meaningful income stream for those businesses over time. If one hundred families in a community each redirect three purchases, the cumulative economic impact is transformative. This is the multiplier effect of intentional circulation: small individual changes aggregate into community-level economic strength.

---

**How do I accomplish this?**

1. **Pick three high-frequency purchases.** Choose items or services you buy weekly or monthly — groceries, coffee, haircuts, cleaning supplies, or professional services. High frequency means high cumulative impact.

2. **Make the switch deliberately.** Visit the Muslim-owned or ethical alternative and make your first purchase. Note the experience — quality, price, convenience.

3. **Commit to consistency.** It takes about four to six weeks to rewire a purchasing habit. Set reminders if needed, and resist the pull of old defaults during the adjustment period.

4. **Accept minor inconveniences gracefully.** The Muslim butcher might be ten minutes farther than the supermarket. The community bookshop might not have next-day delivery. These small sacrifices are part of the investment.

5. **Provide constructive feedback.** If a business can improve, tell them directly and kindly. Your feedback as a loyal customer is more valuable than silent abandonment.

6. **Benchmark:** You have completed this step when three of your regular purchases are consistently going to Muslim-owned or ethical vendors and you have maintained this for at least one month.` },
        { title: 'Explore investment opportunities in community-based ventures (co-ops, local funds)', done: false,
          description: `**Why does this matter?**

Spending supports existing businesses, but investment builds new ones. Community-based ventures — cooperative businesses, local Islamic investment funds, community land trusts, and shared enterprises — allow Muslims to pool capital and create institutions that serve the ummah for generations. Historically, the Muslim world thrived on such collective economic structures. Today, exploring these opportunities reconnects you with a proven model of wealth circulation that builds communal assets rather than enriching distant shareholders.

---

**How do I accomplish this?**

1. **Research existing community investment vehicles.** Look for Islamic credit unions, halal investment clubs, community development funds, or cooperative businesses in your area.

2. **Attend community business forums.** Many Muslim communities host entrepreneurship events, networking nights, or investment pitch sessions. These are excellent places to discover opportunities.

3. **Evaluate opportunities with Islamic finance principles.** Any investment must be free from riba, gharar, and haram industries. Apply the same scrutiny you would to any personal investment.

4. **Start with a small allocation.** You do not need to invest heavily from the outset. Begin with an amount you can afford to have tied up for an extended period, and increase as you gain confidence in the venture.

5. **Consider forming an investment circle.** If no formal vehicle exists, gather three to five trusted community members and explore launching a small cooperative fund with clear Shariah-compliant terms.

6. **Benchmark:** You have completed this step when you have identified at least one community-based investment opportunity, evaluated it against Islamic finance principles, and either invested or have a clear plan to do so.` },
        { title: 'Encourage family and friends to support the same businesses for compounding impact', done: false,
          description: `**Why does this matter?**

One customer switching to a Muslim-owned business is helpful. Ten customers switching is transformative. The compounding effect of community-wide patronage can turn a struggling halal shop into a thriving enterprise, a part-time tutor into a full Islamic school, or a home-based caterer into a restaurant. By encouraging your family and friends to join you, you multiply the impact of your individual decision many times over — and you model a communal ethic of mutual support that strengthens social bonds alongside economic ones. The Prophet (peace be upon him) said that the one who guides to good receives the reward of the one who acts on it.

---

**How do I accomplish this?**

1. **Share your experience naturally.** When a family member asks where you bought something, mention the Muslim-owned business and why you chose it. Authentic enthusiasm is more persuasive than lectures.

2. **Bring people along.** Invite friends to eat at the Muslim-owned restaurant, shop at the community market, or visit the halal butcher with you. First-hand experience converts people faster than recommendations alone.

3. **Use social media thoughtfully.** A genuine review or recommendation post can reach dozens of people in your network. Highlight specific products or services rather than making generic appeals.

4. **Organise group purchases.** For items bought in bulk — meat, grains, event catering — coordinate group orders through the Muslim vendor. Volume gives them better margins and gives your group better prices.

5. **Frame it as mutual aid, not obligation.** People respond to positive framing. Emphasise the quality, the relationship, and the community benefit rather than guilt or duty.

6. **Benchmark:** You have completed this step when at least two family members or friends have started patronising a Muslim-owned or ethical business based on your recommendation.` },
        { title: 'Track how much of your monthly spending stays within the Muslim community', done: false,
          description: `**Why does this matter?**

What gets measured gets managed. Without tracking, your commitment to community-directed spending remains a vague intention rather than a quantifiable practice. Knowing that 15% of your monthly spending stays within the Muslim community — and watching that number climb to 25% and then 35% — provides concrete motivation and reveals where further shifts are possible. It also gives you data to share when encouraging others, transforming anecdotal enthusiasm into evidence-based advocacy for community economic development.

---

**How do I accomplish this?**

1. **Review your monthly bank or credit card statements.** Go through each transaction and flag purchases made at Muslim-owned or community businesses.

2. **Calculate the percentage.** Divide the total spent at community businesses by your total monthly spending. This is your community circulation rate.

3. **Set a baseline and a target.** If you are currently at 10%, aim for 20% within six months. Incremental targets keep the goal achievable and motivating.

4. **Use a simple tracking method.** A spreadsheet column, a budgeting app tag, or even a tally on paper. The method matters less than consistency.

5. **Review monthly and identify opportunities.** Each month, look at your non-community spending and ask: could any of these purchases have gone to a Muslim-owned or ethical alternative?

6. **Celebrate progress.** When your community circulation rate increases, acknowledge it as a tangible contribution to the ummah's economic health.

7. **Benchmark:** You have completed this step when you have tracked your community spending for at least one full month and established a baseline percentage with a clear target for improvement.` },
      ],
    },
    {
      title: 'Give interest-free loans (qard hasan) to family or community members in need',
      priority: 'medium', tags: ['qard-hasan', 'community'],
      description: 'Qard hasan — a beautiful loan given without any expectation of interest or profit — is one of the most praised financial acts in Islam. Allah describes it as "lending to Allah" (Quran 2:245). When a family or community member is in need, offering a qard hasan protects them from riba while earning immense reward.',
      subtasks: [
        { title: 'Determine how much you can lend without jeopardising your own financial obligations', done: false,
          description: `**Why does this matter?**

Qard hasan is an act of immense virtue, but it must not come at the expense of your own fard obligations. If lending money means you cannot pay your rent, feed your family, or meet your zakah obligation, the loan becomes a source of harm rather than benefit. Islam does not ask you to impoverish yourself to help others — it asks you to give from what you can genuinely spare. Calculating your lending capacity before committing ensures you help others from a position of stability, not desperation.

---

**How do I accomplish this?**

1. **Review your current financial position.** List your monthly income, essential expenses (nafaqah), zakah savings, debt obligations, and emergency fund status.

2. **Identify your surplus.** After all obligations are met, determine how much liquid capital you have that is not earmarked for any immediate or near-term need.

3. **Apply a conservative threshold.** Do not lend more than you could afford to lose entirely. While qard hasan expects repayment, the borrower may face genuine hardship, and you should be prepared for that possibility.

4. **Consider the timeframe.** A \$1,000 loan repaid in three months is very different from \$1,000 repaid over two years. Factor in how long you can have the money inaccessible.

5. **Protect your emergency fund.** Never lend from your emergency reserves. An unexpected expense on your end should not force you to pressure the borrower for early repayment.

6. **Benchmark:** You have completed this step when you have a clear maximum lending amount that does not compromise any of your financial obligations or emergency preparedness.` },
        { title: 'Identify a family or community member genuinely in need of an interest-free loan', done: false,
          description: `**Why does this matter?**

The purpose of qard hasan is to protect a fellow Muslim from resorting to riba-based borrowing when they face a legitimate financial need. Identifying the right recipient means finding someone whose need is genuine, whose character is trustworthy, and whose situation would genuinely benefit from a temporary loan rather than a gift. Lending to someone who does not truly need it wastes your capital, while ignoring someone drowning in need when you have capacity to help is a missed opportunity for immense reward — Allah describes qard hasan as "lending to Him" (Quran 2:245).

---

**How do I accomplish this?**

1. **Listen for need in your circles.** Pay attention at family gatherings, community events, and masjid conversations. People often hint at financial stress without asking directly — a lost job, an unexpected medical bill, a car breakdown.

2. **Ask trusted intermediaries.** Your imam, a community elder, or a mutual friend may know someone in need who is too proud to ask. Approaching through an intermediary also preserves the recipient's dignity.

3. **Prioritise those at risk of riba.** If a brother or sister is about to take out a conventional interest-bearing loan because they see no alternative, your qard hasan literally saves them from sin. This is the highest-impact scenario.

4. **Assess character reasonably.** You are not conducting a credit check, but basic trustworthiness matters. Is this person known for honesty and responsibility? Have they repaid obligations in the past?

5. **Be proactive, not passive.** Do not wait for someone to ask. Offering a qard hasan before someone resorts to haram borrowing is more impactful and more in the spirit of brotherhood.

6. **Benchmark:** You have completed this step when you have identified a specific person whose genuine financial need could be addressed by an interest-free loan within your lending capacity.` },
        { title: 'Document the loan terms clearly in writing (amount, repayment timeline) per Quran 2:282', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (2:282)
**Arabic:** 
**Translation:** O ye who believe! When ye contract a debt for a fixed term, record it in writing. Let a scribe record it in writing between you in (terms of) equity. No scribe should refuse to write as Allah hath taught him, so let him write, and let him who incurreth the debt dictate, and let him observe his duty to Allah his Lord, and diminish naught thereof. But if he who oweth the debt is of low understanding, or weak, or unable himself to dictate, then let the guardian of his interests dictate in (terms of) equity. And call to witness, from among your men, two witnesses. And if two men be not (at hand) then a man and two women, of such as ye approve as witnesses, so that if the one erreth (through forgetfulness) the other will remember. And the witnesses must not refuse when they are summoned. Be not averse to writing down (the contract) whether it be small or great, with (record of) the term thereof. That is more equitable in the sight of Allah and more sure for testimony, and the best way of avoiding doubt between you; save only in the case when it is actual merchandise which ye transfer among yourselves from hand to hand. In that case it is no sin for you if ye write it not. And have witnesses when ye sell one to another, and let no harm be done to scribe or witness. If ye do (harm to them) lo! it is a sin in you. Observe your duty to Allah. Allah is teaching you. And Allah is knower of all things.

**II. Sources from the Hadith**


### Sahih Bukhari 2291
Narrated Abu Huraira: The Prophet (ﷺ) said, "An Israeli man asked another Israeli to lend him one thousand Dinars. The second man required witnesses. The former replied, 'Allah is sufficient as a witness.' The second said, 'I want a surety.' The former replied, 'Allah is sufficient as a surety.' The second said, 'You are right,' and lent him the money for a certain period. The debtor went across the sea. When he finished his job, he searched for a conveyance so that he might reach in time for the repayment of the debt, but he could not find any. So, he took a piece of wood and made a hole in it, inserted in it one thousand Dinars and a letter to the lender and then closed (i.e. sealed) the hole tightly. He took the piece of wood to the sea and said. 'O Allah! You know well that I took a loan of one thousand Dinars from so-and-so. He demanded a surety from me but I told him that Allah's Guarantee was sufficient and he accepted Your guarantee. He then asked for a witness and I told him that Allah was sufficient as a Witness, and he accepted You as a Witness. No doubt, I tried hard to find a conveyance so that I could pay his money but could not find, so I hand over this money to You.' Saying that, he threw the piece of wood into the sea till it went out far into it, and then he went away. Meanwhile he started searching for a conveyance in order to reach the creditor's country. One day the lender came out of his house to see whether a ship had arrived bringing his money, and all of a sudden he saw the piece of wood in which his money had been deposited. He took it home to use for fire. When he sawed it, he found his money and the letter inside it. Shortly after that, the debtor came bringing one thousand Dinars to him and said, 'By Allah, I had been trying hard to get a boat so that I could bring you your money, but failed to get one before the one I have come by.' The lender asked, 'Have you sent something to me?' The debtor replied, 'I have told you I could not get a boat other than the one I have come by.' The lender said, 'Allah has delivered on your behalf the money you sent in the piece of wood. So, you may keep your one thousand Dinars and depart guided on the right path
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

Allah commands in the longest verse of the Quran (2:282): "When you contract a debt for a specified term, write it down." This is not a mere suggestion — it is divine instruction to protect both lender and borrower from disputes, misunderstandings, and damaged relationships. Verbal agreements between friends or family members are the single most common source of financial conflict in communities. A written document — even a simple one — provides clarity, accountability, and peace of mind for both parties. It is an act of justice, not distrust.

---

**How do I accomplish this?**

1. **Write a simple loan agreement.** It does not need to be a formal legal contract. A clear document stating the lender, borrower, amount, date, and repayment terms is sufficient.

2. **Specify the repayment timeline.** Will the borrower repay in full by a certain date, or in monthly instalments? Be explicit to avoid ambiguity.

3. **State that no interest or additional amount is due.** Make it clear in writing that this is a qard hasan — the borrower repays exactly what was borrowed, nothing more.

4. **Include what happens if the borrower cannot repay on time.** The Quran instructs: "If the debtor is in hardship, then grant respite until a time of ease" (2:280). Document this flexibility.

5. **Have both parties sign and date the document.** If possible, have a witness sign as well, following the Quranic guidance in the same verse.

6. **Give a copy to each party.** Both lender and borrower should retain the agreement for reference.

7. **Benchmark:** You have completed this step when you have a signed, written loan agreement that both parties understand and retain copies of.` },
        { title: 'Disburse the loan with kindness and without making the recipient feel burdened', done: false,
          description: `**Why does this matter?**

The manner of giving is as important as the gift itself. A qard hasan delivered with condescension, reluctance, or constant reminders of your generosity undermines its spiritual value and damages the recipient's dignity. The Quran explicitly warns against invalidating charity through mann (reminders of favour) and adha (causing hurt) in 2:264. The same principle applies to loans — the way you hand over the money sets the tone for the entire relationship. A loan given with warmth and ease makes the borrower feel supported; one given with hesitation and lectures makes them feel like a burden.

---

**How do I accomplish this?**

1. **Choose a private setting.** Disburse the loan in a one-on-one conversation, not in front of others. Protecting the borrower's dignity is paramount.

2. **Be warm and matter-of-fact.** Hand over the funds with a smile and a simple statement: "This is between us and Allah. Take your time." Avoid lengthy preambles about sacrifice or difficulty.

3. **Do not attach unsolicited advice.** Unless the borrower asks, do not lecture them on how to spend the money or how they got into this situation. You are a lender, not a financial counsellor.

4. **Use a discreet transfer method.** A bank transfer may be more dignified than handing over physical cash, as it avoids the visual weight of counting bills in front of someone.

5. **Make dua for them.** Pray that Allah eases their hardship and makes the loan a means of relief. This reframes the act in your own heart as worship, not favour.

6. **Benchmark:** You have completed this step when you have disbursed the loan privately, kindly, and without any words or actions that could burden or embarrass the recipient.` },
        { title: 'Follow up gently on repayment, and be prepared to forgive if the borrower faces hardship', done: false,
          description: `**Why does this matter?**

The post-disbursement period is where most qard hasan arrangements either strengthen or fracture relationships. Following up on repayment is your right as a lender, but the manner must reflect prophetic character — patient, gentle, and merciful. The Quran commands granting respite to those in genuine hardship (2:280) and praises those who forgive the debt entirely as an act of charity. Being prepared for both outcomes — repayment and forgiveness — protects you from resentment and protects the borrower from undue pressure during difficult times.

---

**How do I accomplish this?**

1. **Wait until the agreed date before following up.** Do not ask about repayment before the term is due — this creates unnecessary anxiety for the borrower.

2. **Send a gentle, private reminder.** When the due date approaches, a simple message is sufficient: "Assalamu alaikum, I hope you are well. Just a reminder that the repayment date we agreed on is approaching. Let me know how things stand."

3. **Listen to their situation.** If they ask for an extension, hear them out with an open heart. Assess whether the hardship is genuine before deciding how to proceed.

4. **Grant extensions willingly.** If the borrower is struggling, extend the deadline without hesitation or resentment. The Quran's instruction to grant respite is clear and unconditional.

5. **Consider forgiving the debt.** If the borrower's hardship is severe, forgiving the loan is one of the most rewarded acts in Islam. The Prophet (peace be upon him) said that whoever gives respite to one in difficulty or forgives the debt, Allah will shade them on the Day of Judgement.

6. **Never publicise the loan or the struggle.** Whether repaid or forgiven, the details remain between you, the borrower, and Allah.

7. **Benchmark:** You have completed this step when you have either received full repayment or made a deliberate, peaceful decision to extend or forgive — without resentment or damage to the relationship.` },
      ],
    },
    {
      title: 'Research and identify a local sadaqah jariyah project to contribute to consistently',
      priority: 'medium', tags: ['sadaqah-jariyah', 'planning'],
      description: 'Sadaqah jariyah — ongoing charity — continues to benefit you after death. Projects like building a well, funding a school, planting trees, or supporting an Islamic education program generate continuous reward. Find a local project you believe in and commit to consistent contributions.',
      subtasks: [
        { title: 'Research local sadaqah jariyah opportunities (masjid construction, wells, schools, libraries)', done: false,
          description: `**Why does this matter?**

Sadaqah jariyah — ongoing charity — is unique among good deeds because its reward continues flowing to you even after death. The Prophet (peace be upon him) said: "When a person dies, their deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for them." Researching local opportunities ensures your contributions fund projects with lasting, tangible impact rather than one-time consumption. A well that provides water for decades, a school that educates generations, or a masjid that hosts worship for centuries — these are investments in your akhirah.

---

**How do I accomplish this?**

1. **Survey your local community's needs.** What infrastructure is lacking? Does the masjid need expansion? Is there no Islamic school in your area? Are clean water projects needed in underserved neighbourhoods?

2. **Ask your masjid leadership.** Imams and board members often know about planned construction projects, expansion efforts, or community initiatives that need funding.

3. **Check Islamic organisations' project lists.** Many relief organisations maintain portfolios of sadaqah jariyah projects — wells, school buildings, medical clinics — with specific funding targets and progress tracking.

4. **Consider knowledge-based projects.** Funding the printing of Islamic books, sponsoring a student of knowledge, or supporting a free online educational platform all qualify as sadaqah jariyah through beneficial knowledge.

5. **Compile a shortlist of three to five projects.** Include the project name, organisation behind it, estimated cost, current funding status, and the type of ongoing benefit it will generate.

6. **Benchmark:** You have completed this step when you have a shortlist of local or accessible sadaqah jariyah projects with enough detail to evaluate them in the next step.` },
        { title: 'Evaluate the credibility and impact of each project', done: false,
          description: `**Why does this matter?**

Not all sadaqah jariyah projects deliver on their promises. Some are poorly managed, some never reach completion, and some are outright fraudulent. Because the defining feature of sadaqah jariyah is lasting benefit, a failed project means your contribution produced no ongoing reward. Evaluating credibility and projected impact before committing protects both your money and your akhirah investment. A well-evaluated project gives you confidence that your charity will generate continuous good, insha'Allah, for years or decades to come.

---

**How do I accomplish this?**

1. **Verify the organisation's track record.** Have they completed similar projects before? Can you see photos, testimonies, or reports from past completions?

2. **Check financial transparency.** Does the organisation publish audited financial statements? What percentage of donations reaches the project versus administrative costs?

3. **Assess the ongoing benefit mechanism.** A well provides water indefinitely with minimal maintenance. A school requires ongoing operational funding. Understand what makes the benefit "ongoing" and whether the infrastructure for sustainability exists.

4. **Ask about maintenance and governance.** Who will maintain the masjid after it is built? Who operates the school? Sadaqah jariyah only continues if the asset remains functional.

5. **Seek independent references.** Talk to donors who contributed to previous projects by the same organisation. Were they satisfied with the outcome?

6. **Visit if possible.** For local projects, a site visit reveals more than any report. See the progress, meet the team, and assess the seriousness of the effort firsthand.

7. **Benchmark:** You have completed this step when you have evaluated each project on your shortlist for credibility, transparency, and sustainable impact, and can rank them with confidence.` },
        { title: 'Select one project and commit to a regular contribution amount and schedule', done: false,
          description: `**Why does this matter?**

Research without commitment is procrastination dressed as diligence. The spiritual and practical benefits of sadaqah jariyah only begin when funds actually flow to a project. Selecting one project and committing to a regular contribution schedule transforms your intention into a structured, ongoing act of worship. Regularity also helps projects plan their budgets and timelines — your consistent support may be the difference between a project that finishes on schedule and one that stalls halfway.

---

**How do I accomplish this?**

1. **Choose the project that best combines credibility, impact, and personal resonance.** You will sustain contributions more easily to a cause that genuinely moves you.

2. **Determine a monthly contribution amount.** This should be separate from your zakah and regular sadaqah. Even a small amount — \$20 or \$50 per month — compounds into significant impact over years.

3. **Set up a recurring payment.** Automate the contribution just as you did with regular sadaqah. Consistency is the hallmark of beloved deeds.

4. **Specify your contribution as sadaqah jariyah.** Many organisations allow you to designate your donation type. Ensure your funds go to the ongoing-benefit project, not the general fund.

5. **Set a review date.** After six months or one year, evaluate whether the project is progressing as expected and whether you want to continue, increase, or redirect your contributions.

6. **Benchmark:** You have completed this step when you have selected a specific sadaqah jariyah project and have an active, recurring contribution flowing to it.` },
        { title: 'Visit or engage with the project to see your contributions in action', done: false,
          description: `**Why does this matter?**

Seeing your sadaqah jariyah in action — the well being dug, the school walls rising, the students learning — transforms charity from an abstract financial transaction into a lived spiritual experience. Engagement deepens your emotional connection to the project, increases your motivation to continue contributing, and provides firsthand verification that the funds are being used as intended. It also allows you to make dua at the site, to witness the barakah of your wealth in motion, and to carry that experience as a source of gratitude and humility.

---

**How do I accomplish this?**

1. **Visit local projects in person.** If the project is in your area, schedule a visit. Walk the site, meet the workers or beneficiaries, and see the progress with your own eyes.

2. **Request updates from the organisation.** For remote projects, ask for periodic photo and video updates, progress reports, or beneficiary testimonials.

3. **Attend completion ceremonies.** Many organisations hold events when a well is opened, a school is inaugurated, or a masjid begins hosting prayers. Attending connects you to the fruit of your contribution.

4. **Engage with beneficiaries if possible.** Hearing a student describe what the school means to them, or seeing a family draw clean water for the first time, is an experience no receipt can replicate.

5. **Document the experience for your own reflection.** Take notes or photos (with permission) to remind yourself of the impact during moments when generosity feels difficult.

6. **Benchmark:** You have completed this step when you have directly witnessed or received verified evidence of your sadaqah jariyah contribution producing tangible, ongoing benefit.` },
        { title: 'Share the opportunity with others to multiply the impact', done: false,
          description: `**Why does this matter?**

The Prophet (peace be upon him) said: "Whoever guides someone to goodness will have a reward like the one who acts upon it." Sharing a verified sadaqah jariyah opportunity with others does not diminish your reward — it multiplies it. Every person who contributes because of your recommendation generates ongoing reward for them and additional reward for you as the one who guided them. This cascading effect means a single shared recommendation can fund an entire project and generate reward for dozens of people across generations.

---

**How do I accomplish this?**

1. **Share from personal experience.** People trust recommendations backed by genuine involvement. Describe what you have seen, why you chose this project, and what impact it is making.

2. **Use multiple channels.** Mention the project in conversation at the masjid, share it in family group chats, post about it on social media, or present it at a community gathering.

3. **Provide specific details.** Vague appeals generate vague responses. Share the project name, the organisation, the funding goal, and exactly how people can contribute.

4. **Make it easy to act.** Include a direct link, a phone number, or an account number. The fewer steps between hearing about the project and contributing, the more people will follow through.

5. **Follow up with those who expressed interest.** A gentle follow-up a week later can convert interest into action for people who intended to contribute but got distracted.

6. **Celebrate collective milestones.** When the project reaches a funding goal or completes a phase, share the news with everyone who contributed. Collective celebration reinforces the communal nature of the effort.

7. **Benchmark:** You have completed this step when you have shared the sadaqah jariyah opportunity with at least five people and at least one person has contributed as a result.` },
      ],
    },
  ],
  wealth_circulation_excellence: [
    {
      title: 'Formally establish or fund a waqf (endowment) — a permanent asset dedicated to ongoing benefit',
      priority: 'medium', tags: ['waqf', 'sadaqah-jariyah'],
      description: 'A waqf is the pinnacle of wealth circulation in Islam — a permanent endowment whose principal is preserved forever while its returns fund a designated cause. Historically, waqf funded hospitals, universities, and public infrastructure across the Muslim world. Establishing one is a legacy that transcends your lifetime.',
      subtasks: [
        { title: 'Determine the asset or capital you will dedicate to the waqf', done: false,
          description: `**Why does this matter?**

A waqf is not a donation — it is a permanent endowment. The asset you dedicate is locked in perpetuity: its principal can never be sold, gifted, or inherited, while its returns fund the designated cause indefinitely. This permanence means the choice of asset is critical. An asset that depreciates, generates no income, or requires constant maintenance may become a burden rather than a benefit. Conversely, a well-chosen asset — productive land, a rental property, a diversified investment portfolio — can fund a cause for centuries, as the historical awqaf of the Muslim world demonstrated.

---

**How do I accomplish this?**

1. **Assess your total wealth.** Understand what you own — real estate, cash, investments, land, business assets — and what portion you can permanently allocate without compromising your family's financial security.

2. **Prioritise income-generating assets.** The ideal waqf asset produces regular returns: rental property, agricultural land, shares in a halal business, or a diversified Islamic investment fund.

3. **Consider cash waqf.** If you lack physical assets, a cash waqf invested in Shariah-compliant instruments can generate returns just as effectively. Many contemporary scholars endorse this model.

4. **Evaluate long-term sustainability.** Will the asset maintain its value and income-generating capacity for decades? Property in a growing area may appreciate; property in a declining area may not.

5. **Ensure the asset is unencumbered.** A waqf asset must be free from debt, liens, and disputes. You cannot endow something you do not fully own.

6. **Consult your family.** While the decision is yours, transparency with your heirs about which assets are being endowed prevents future disputes.

7. **Benchmark:** You have completed this step when you have identified a specific asset or capital amount for the waqf, confirmed it is unencumbered, and assessed its long-term income-generating potential.` },
        { title: 'Define the beneficiaries and purpose (education, healthcare, masjid, community service)', done: false,
          description: `**Why does this matter?**

The purpose of a waqf is its soul — it determines who benefits, for how long, and in what way. A vaguely defined purpose leads to mission drift, disputes among trustees, and eventual misuse of funds. A precisely defined purpose ensures the waqf serves your intended cause faithfully across generations, even when you are no longer alive to oversee it. Historically, the most enduring awqaf were those with crystal-clear mandates: "to fund the education of orphans in this city" or "to maintain this masjid and provide for its imam."

---

**How do I accomplish this?**

1. **Identify the need you want to address permanently.** What cause keeps you up at night? What gap in your community would persist without deliberate, sustained funding?

2. **Align with the Maqasid al-Shariah.** The strongest waqf purposes map directly to the preservation of faith, life, intellect, family, or wealth. Education preserves intellect; healthcare preserves life; a masjid preserves faith.

3. **Be specific in your definition.** "Supporting education" is vague. "Providing scholarships for Muslim students from low-income families in [city] to attend university" is actionable and verifiable.

4. **Consider multiple tiers if appropriate.** Some awqaf define a primary purpose and a secondary purpose in case the primary becomes obsolete. For example: "to fund this masjid; if the masjid is no longer operational, to fund the nearest Islamic school."

5. **Research the beneficiary population.** Understand the size of the need, existing services, and where your waqf can make the most incremental impact rather than duplicating what already exists.

6. **Write a formal purpose statement.** This will become the cornerstone of your waqf deed. It should be clear enough that a stranger reading it in fifty years would know exactly what the waqf is for.

7. **Benchmark:** You have completed this step when you have a written purpose statement that is specific, aligned with the Maqasid, and addresses a genuine, persistent need.` },
        { title: 'Engage an Islamic scholar to ensure the waqf structure meets fiqhi requirements', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (26:197)
**Arabic:** 
**Translation:** Is it not a sign to them that the learned scholars (like ‘Abdullâh bin Salâm رضي الله عنه who embraced Islâm) of the Children of Israel knew it (as true)?`,
          description: `**Why does this matter?**

A waqf is a Shariah instrument with specific fiqhi conditions that vary across the four madhhabs. These include rules about irrevocability, the types of assets that can be endowed, the rights of beneficiaries, and the permissible scope of the trustee's authority. A waqf that violates these conditions may be invalid from an Islamic legal perspective, meaning the intended perpetual reward may not materialise. Engaging a scholar ensures your waqf is structurally sound, spiritually valid, and protected from challenges based on Islamic jurisprudence.

---

**How do I accomplish this?**

1. **Find a scholar with expertise in Islamic endowments.** This is a specialised area of fiqh — not every imam or community scholar will have deep knowledge of waqf law. Look for someone trained in fiqh al-mu'amalat or awqaf specifically.

2. **Present your proposed asset and purpose.** Share the details from your previous steps so the scholar can evaluate the structure against fiqhi requirements.

3. **Ask about key conditions.** Is the asset type you have chosen valid for waqf? Are your proposed beneficiaries permissible? Does your purpose statement satisfy the requirement of public benefit (or permissible private benefit, in the case of family awqaf)?

4. **Discuss irrevocability.** Most scholars hold that a waqf is irrevocable once established. Ensure you understand and accept this before proceeding.

5. **Clarify the madhhab you are following.** Rules differ between Hanafi, Maliki, Shafi'i, and Hanbali schools on certain waqf matters. The scholar should advise consistently within one framework.

6. **Request written guidance.** A written fatwa or advisory document from the scholar protects you and future trustees against disputes over the waqf's Islamic validity.

7. **Benchmark:** You have completed this step when you have received written scholarly confirmation that your proposed waqf structure meets the fiqhi requirements of your chosen madhhab.` },
        { title: 'Work with a lawyer to establish the waqf with legal standing', done: false,
          description: `**Why does this matter?**

A waqf that is valid in Islamic law but invisible to the secular legal system is vulnerable. Without legal standing, the asset can be seized by creditors, claimed by heirs who contest the endowment, or simply lost in the bureaucratic gaps between Islamic and civil law. Establishing the waqf as a legally recognised entity — typically a charitable trust, foundation, or incorporated body — protects it from all of these threats. The legal structure also enables the waqf to open bank accounts, enter contracts, receive donations, and operate transparently within the regulatory framework of your jurisdiction.

---

**How do I accomplish this?**

1. **Find a lawyer experienced in charitable trusts or endowments.** Ideally, seek one who has worked with Islamic endowments before. If none is available locally, a charitable trust or foundation lawyer can adapt.

2. **Share your Islamic scholar's guidance.** The lawyer needs to understand the irrevocability requirement, the beneficiary restrictions, and the governance structure that Islamic law demands.

3. **Choose the appropriate legal vehicle.** Depending on your jurisdiction, this might be a charitable trust, a foundation, a non-profit corporation, or a specific waqf registration if your country recognises it.

4. **Draft the waqf deed.** This document should incorporate both the Islamic purpose statement and the legal requirements for charitable entities in your jurisdiction.

5. **Register the entity with relevant authorities.** This may include charity commissions, tax authorities, or land registries depending on the asset type.

6. **Ensure tax-exempt status if available.** In many jurisdictions, charitable endowments qualify for tax exemptions that maximise the funds available for beneficiaries.

7. **Benchmark:** You have completed this step when the waqf has been legally established, registered, and has a deed that satisfies both Islamic and civil legal requirements.` },
        { title: 'Appoint a mutawalli (trustee) and define governance procedures', done: false,
          description: `**Why does this matter?**

The mutawalli is the guardian of the waqf — the person or body responsible for managing the asset, generating returns, and distributing them to beneficiaries according to the waqf deed. A waqf with no trustee is an orphaned institution; a waqf with a corrupt or incompetent trustee is worse, because the asset cannot be recovered once mismanaged. Defining clear governance procedures — who decides, how they are accountable, and how successors are chosen — is what ensures the waqf outlasts any single individual and serves its purpose for generations.

---

**How do I accomplish this?**

1. **Choose a mutawalli with the right qualities.** Islamic scholars emphasise trustworthiness (amanah), competence in financial management, and commitment to the waqf's purpose. This can be an individual, a committee, or an institutional trustee.

2. **Consider institutional trusteeship.** For longevity, an institution (such as a community foundation or Islamic trust body) may be more reliable than an individual, as it survives beyond any one person's lifetime.

3. **Define the mutawalli's powers and limitations.** What can they do independently (routine management, distribution) and what requires board approval (major asset decisions, amendments to distribution policy)?

4. **Establish accountability mechanisms.** Require annual financial reports, independent audits, and beneficiary feedback. Transparency protects the waqf from both intentional misuse and well-meaning incompetence.

5. **Plan for succession.** How will the next mutawalli be chosen when the current one steps down or passes away? Define the selection process in the governance document to prevent disputes.

6. **Document everything in the waqf deed.** Governance procedures should be part of the legal founding document, not informal understandings.

7. **Benchmark:** You have completed this step when a mutawalli has been formally appointed and a governance document detailing their powers, accountability, and succession process has been incorporated into the waqf deed.` },
        { title: 'Launch the waqf and begin generating returns for the designated cause', done: false,
          description: `**Why does this matter?**

All the planning, legal work, and scholarly consultation culminate in this moment — the waqf becomes operational and begins generating benefit. Until the asset is actually transferred, the trust activated, and returns flowing to beneficiaries, the waqf exists only on paper. Launching is the transition from intention to impact, from potential reward to actual, ongoing sadaqah jariyah. Every day the waqf operates is a day its returns reach those in need and its reward accumulates for you — in this life and, insha'Allah, beyond it.

---

**How do I accomplish this?**

1. **Transfer the asset formally.** Execute the legal transfer of the designated asset into the waqf entity. This is the irrevocable step — once transferred, the asset belongs to the waqf permanently.

2. **Activate income generation.** If the asset is rental property, secure tenants. If it is an investment portfolio, confirm it is deployed in Shariah-compliant instruments. If it is land, begin the planned agricultural or commercial use.

3. **Make the first distribution.** As soon as returns are generated, distribute them to the designated beneficiaries. The first distribution is a milestone — it proves the waqf works.

4. **Announce the waqf to the community if appropriate.** Public awareness can attract additional contributions and inspire others to establish their own awqaf. The Prophet (peace be upon him) praised Umar's waqf publicly as a model.

5. **Establish a monitoring rhythm.** Set quarterly or semi-annual reviews where the mutawalli reports on asset performance, returns generated, and distributions made.

6. **Make dua for acceptance and barakah.** Ask Allah to bless the waqf, multiply its benefit, and make it a source of ongoing reward for you and everyone who contributed to its establishment.

7. **Benchmark:** You have completed this step when the waqf asset has been transferred, returns are being generated, and the first distribution to beneficiaries has been made.` },
      ],
    },
    {
      title: 'Create a family sadaqah fund — a shared pot your household contributes to and distributes together',
      priority: 'low', tags: ['sadaqah', 'family'],
      description: 'A family sadaqah fund transforms charity from an individual act into a household value. Everyone contributes — even children with small amounts — and the family decides together where to distribute. This builds generosity as a family identity and teaches children the joy and responsibility of giving.',
      subtasks: [
        { title: 'Propose the idea to your household and agree on a structure (jar, account, or digital pot)', done: false,
          description: `**Why does this matter?**

A family sadaqah fund only works if the entire household is invested in the idea. Imposing it unilaterally turns a beautiful act of communal worship into an obligation that breeds resentment. When you propose the idea collaboratively — explaining its purpose, inviting input on the structure, and letting everyone shape how it works — you create shared ownership. The structure itself matters too: a physical jar on the kitchen counter makes charity visible and tangible, especially for young children, while a digital account offers convenience and tracking for older family members.

---

**How do I accomplish this?**

1. **Choose the right moment.** Bring it up during a relaxed family meal or gathering — not during a rushed morning or tense moment. The idea should feel inviting, not administrative.

2. **Explain the concept simply.** "We are going to create a shared pot that we all contribute to, and every month we will decide together where to give it." Keep it accessible for all ages.

3. **Share the Islamic motivation.** Mention that the Prophet (peace be upon him) praised consistent charity and that family-based generosity builds bonds and barakah in the household.

4. **Let the family choose the format.** A glass jar on the shelf? A dedicated bank account? A digital savings pot? Let the household vote — ownership of the decision increases commitment.

5. **Agree on basic rules together.** How much does each person contribute? Is it mandatory or voluntary? Who manages the pot? Keep rules simple and flexible.

6. **Name the fund.** Letting the family — especially children — name the fund gives it identity and makes it feel real.

7. **Benchmark:** You have completed this step when your household has agreed to participate in a family sadaqah fund and has chosen a structure that everyone is comfortable with.` },
        { title: 'Set a regular contribution schedule — weekly or monthly from each family member', done: false,
          description: `**Why does this matter?**

Regularity transforms a one-time idea into an embedded family practice. Without a set schedule, contributions become sporadic — happening enthusiastically for a week, then forgotten for months. A fixed rhythm — whether weekly pocket-money contributions from children or monthly deposits from adults — creates a habit loop that becomes as natural as other household routines. It also teaches every family member, regardless of age, that charity is not an occasional luxury but a consistent responsibility woven into everyday life.

---

**How do I accomplish this?**

1. **Set contribution amounts appropriate to each person.** Adults might contribute a fixed dollar amount; children might contribute a percentage of their allowance or pocket money. The amounts should be meaningful but not burdensome.

2. **Choose a frequency.** Weekly contributions keep the practice visible and build habits faster, especially for children. Monthly may work better for adults tying contributions to payday.

3. **Pick a specific day.** "Every Friday after Jumu'ah" or "the first of every month" — a fixed day eliminates the "I'll do it later" drift.

4. **Make the act physical if possible.** Having children physically place coins or notes into a jar creates a sensory experience that reinforces the habit far more than an invisible bank transfer.

5. **Lead by example.** As the initiator, ensure your contributions are visible and consistent. If family members see you contributing reliably, they will follow.

6. **Benchmark:** You have completed this step when every participating family member has made at least two contributions on the agreed schedule.` },
        { title: 'Hold a monthly family meeting to decide where to distribute the funds', done: false,
          description: `**Why does this matter?**

The distribution meeting is where the family sadaqah fund comes alive. It is not just a financial decision — it is a monthly tarbiyah (character-building) session disguised as a family conversation. When the household sits together to discuss who needs help, which causes matter, and how their collective wealth can make a difference, every member — especially children — develops empathy, awareness of the world, and a sense of agency. The meeting also ensures the fund is actually distributed rather than accumulating indefinitely, which defeats its purpose.

---

**How do I accomplish this?**

1. **Schedule a fixed monthly date.** Consistency matters — the same day each month, perhaps the first weekend or the last Friday, so everyone can plan around it.

2. **Start with basmala and a short reminder.** Frame the meeting as an act of worship. A brief hadith about charity sets the tone.

3. **Review the fund balance.** How much has been collected? This gives the family a concrete number to work with and a sense of collective accomplishment.

4. **Invite suggestions from everyone.** Each family member — including young children — should be encouraged to propose a recipient or cause. Discussion teaches critical thinking about need and impact.

5. **Decide together.** You might vote, rotate who chooses each month, or reach consensus. The method matters less than the sense of shared decision-making.

6. **Execute the distribution immediately after the meeting.** Make the transfer, deliver the envelope, or arrange the handover. Delay between decision and action weakens the practice.

7. **Benchmark:** You have completed this step when you have held at least one family distribution meeting and successfully delivered the funds to the chosen recipient.` },
        { title: 'Involve children in the decision-making to build their understanding of sadaqah', done: false,
          description: `**Why does this matter?**

Children who participate in charitable decision-making grow into adults who give naturally. If charity is something parents do silently while children are uninvolved, the next generation inherits wealth without inheriting generosity. By involving children — letting them suggest recipients, count the money, deliver the aid, and see the impact — you are building the foundation of a lifelong sadaqah practice. The Prophet (peace be upon him) trained children in worship from a young age; financial worship deserves the same attention.

---

**How do I accomplish this?**

1. **Give children age-appropriate roles.** A five-year-old can drop coins in the jar and help count them. A ten-year-old can research a cause and present it to the family. A teenager can manage the fund's simple accounting.

2. **Let them propose recipients.** When a child says "my classmate's family is having a hard time" or "I want to help the animals at the shelter," take their suggestions seriously. Their empathy is often more instinctive than adults'.

3. **Explain the Islamic framework at their level.** "Allah loves people who share" for young children. "The Prophet said charity does not decrease wealth" for older ones. "Sadaqah extinguishes sin as water extinguishes fire" for teenagers.

4. **Take them along for distribution when possible.** Delivering food to a family, visiting a local charity, or handing an envelope to someone in need makes the experience real and memorable.

5. **Celebrate their generosity.** Acknowledge when a child contributes from their own savings or suggests a thoughtful recipient. Positive reinforcement builds the habit.

6. **Benchmark:** You have completed this step when each child in the household has actively participated in at least one distribution decision and can articulate in their own words why sadaqah matters.` },
        { title: 'Track contributions and distributions to celebrate the family\'s collective generosity', done: false,
          description: `**Why does this matter?**

Tracking transforms scattered acts of kindness into a documented legacy of generosity. When a family can look back and see that they collectively gave \$2,400 over the past year — feeding twelve families during Ramadan, sponsoring a student's tuition, and contributing to a masjid expansion — the cumulative picture is far more powerful than any individual gift. This record becomes a source of family pride, a motivator to continue and increase, and a tangible inheritance of values that children carry into their own households. It also ensures accountability — every dollar collected is accounted for and distributed.

---

**How do I accomplish this?**

1. **Create a simple family sadaqah ledger.** A notebook, spreadsheet, or note on a shared family device. Columns: date, contributor, amount in, recipient, amount out, running balance.

2. **Record every contribution.** Even small amounts matter — a child's \$2 contribution should be logged just as carefully as a parent's \$100.

3. **Record every distribution.** Note who received the funds, the approximate amount, and what it was intended for.

4. **Review the ledger together periodically.** At the end of Ramadan, at year's end, or during a family gathering — look back at the totals together. Let the numbers tell the story of your family's collective generosity.

5. **Set annual goals.** Based on last year's giving, can the family aim to give 10% more this year? Goals channel motivation and give the fund a sense of forward momentum.

6. **Keep the ledger as a family treasure.** Years from now, this record will be a testament to the values your household lived by — a legacy far richer than any financial inheritance.

7. **Benchmark:** You have completed this step when you have a functioning tracking system with at least three months of recorded contributions and distributions.` },
      ],
    },
    {
      title: 'Build a legacy wealth strategy: 1/3 for heirs, 1/3 for charity, 1/3 reinvested in community impact',
      priority: 'low', tags: ['legacy', 'planning'],
      description: 'A comprehensive legacy strategy goes beyond a will — it is a deliberate plan for how your wealth will continue to serve after you. Inspired by the prophetic principle of the wasiyyah (up to 1/3 for charity), design a framework that balances provision for heirs, charitable endowment, and reinvestment in community-building ventures.',
      subtasks: [
        { title: 'Calculate your total projected estate value at current trajectory', done: false,
          description: `**Why does this matter?**

You cannot design a legacy without knowing what you are working with. Projecting your estate value — based on current assets, income trajectory, savings rate, and expected liabilities — gives you the raw material for strategic allocation. Without this number, your legacy plan is guesswork. With it, you can make precise decisions about how much goes to heirs, how much funds charitable causes, and how much can be reinvested in community impact. The exercise also often reveals gaps — insufficient life insurance, unproductive assets, or debts that could consume the estate — that need to be addressed now.

---

**How do I accomplish this?**

1. **List all current assets.** Include real estate, investments, business equity, savings, retirement accounts, life insurance payouts, and any other wealth you own.

2. **List all current liabilities.** Include mortgage balances, business debts, personal loans, and any other obligations that would be settled from your estate.

3. **Calculate current net worth.** Assets minus liabilities gives your baseline estate value today.

4. **Project forward.** Based on your current savings rate, investment returns, and income trajectory, estimate where your net worth will be in 10, 20, and 30 years. Use conservative assumptions.

5. **Factor in life insurance.** If you hold a takaful or conventional life insurance policy, include the payout amount in your projected estate.

6. **Account for major future expenses.** Children's education, wedding costs, and potential healthcare needs will reduce the estate. Subtract realistic estimates.

7. **Benchmark:** You have completed this step when you have a documented projected estate value at three future time horizons (10, 20, and 30 years) based on conservative assumptions.` },
        { title: 'Allocate the Shariah-mandated inheritance shares for your heirs (minimum 2/3)', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (4:11)
**Arabic:** 
**Translation:** Allâh commands you as regards your children’s (inheritance): to the male, a portion equal to that of two females; if (there are) only daughters, two or more, their share is two-thirds of the inheritance; if only one, her share is a half. For parents, a sixth share of inheritance to each if the deceased left children; if no children, and the parents are the (only) heirs, the mother has a third; if the deceased left brothers (or sisters), the mother has a sixth. (The distribution in all cases is) after the payment of legacies he may have bequeathed or debts. You know not which of them, whether your parents or your children, are nearest to you in benefit; (these fixed shares) are ordained by Allâh. And Allâh is Ever All-Knower, All-Wise.

### Ayah (4:176)
**Arabic:** 
**Translation:** People ask you to pronounce a ruling concerning inheritance from those who have left behind no lineal heirs (kalalah). Say: 'Allah pronounces for you the ruling: should a man die childless but have a sister, she shall have one half of what he has left behind; and should the sister die childless, his brother shall inherit her. And if the heirs are two sisters, they shall have two-thirds of what he has left behind. And if the heirs are sisters and brothers, then the male shall have the share of two females. Allah makes (His commandments) clear to you lest you go astray. Allah has full knowledge of everything.

**II. Sources from the Hadith**


### Sahih Bukhari 4580
Narrated Ibn \`Abbas:Regarding the Verse: "To everyone, We have appointed heirs." (4.33) 'Mawali' means heirs. And regarding:-- "And those to whom your right hands have pledged." When the Emigrants came to Medina, an Emigrant used to be the heir of an Ansari with the exclusion of the latter's relatives, and that was because of the bond of brotherhood which the Prophet (ﷺ) had established between them (i.e. the Emigrants and the Ansar). So when the Verses:-- "To everyone We have appointed heirs." was revealed, (the inheritance through bond of brotherhood) was cancelled. Ibn \`Abbas then said: "And those to whom your right hands have pledged." is concerned with the covenant of helping and advising each other. So allies are no longer to be the heir of each other, but they can bequeath each other some of their property by means of a will
*(Grade: Sahih)*

### Sahih Bukhari 2292
Narrated Sa\`id bin Jubair:Ibn \`Abbas said, "In the verse: To every one We have appointed ' (Muwaliya Muwaliya means one's) heirs (4.33).' (And regarding the verse) 'And those with whom your right hands have made a pledge.' Ibn \`Abbas said, "When the emigrants came to the Prophet (ﷺ) in Medina, the emigrant would inherit the Ansari while the latter's relatives would not inherit him because of the bond of brotherhood which the Prophet established between them (i.e. the emigrants and the Ansar). When the verse: 'And to everyone We have appointed heirs' (4.33) was revealed, it canceled (the bond (the pledge) of brotherhood regarding inheritance)." Then he said, "The verse: To those also to whom your right hands have pledged, remained valid regarding cooperation and mutual advice, while the matter of inheritance was excluded and it became permissible to assign something in one's testament to the person who had the right of inheriting before
*(Grade: Sahih)*`,
          description: `**Why does this matter?**

Islamic inheritance law (ilm al-fara'id) is not optional — it is a divine command with precisely calculated shares for each eligible heir. The Quran devotes detailed verses (4:11-12, 4:176) to specifying exactly who inherits and how much. Deviating from these shares — whether by favouring one child over another, disinheriting a relative, or leaving inheritance to personal preference — violates a direct commandment. Understanding and allocating these shares correctly is one of the most consequential financial responsibilities a Muslim carries, because errors affect not only your akhirah but the rights and livelihoods of your family after you are gone.

---

**How do I accomplish this?**

1. **Study the basic rules of Islamic inheritance.** Learn the categories of heirs (ashab al-furud, asabat, dhawi al-arham) and their Quran-specified shares.

2. **Identify your current heirs.** List your spouse, children, parents, siblings, and any other relatives who would inherit under Islamic law based on your current family structure.

3. **Calculate each heir's share.** Use the Quranic formulas or an Islamic inheritance calculator to determine the exact fraction each heir receives. Note that shares shift based on which heirs survive you.

4. **Allocate at least 2/3 of your projected estate to these shares.** Islamic law mandates that the fara'id shares take precedence — you can only exercise discretion over up to 1/3 through the wasiyyah.

5. **Consult a scholar of ilm al-fara'id.** Inheritance calculations can become complex, especially with multiple categories of heirs. A specialist ensures accuracy.

6. **Document the allocation.** Write it into your estate plan so executors know exactly how to distribute.

7. **Benchmark:** You have completed this step when you have a documented breakdown of each heir's Shariah-mandated share based on your current family structure, verified by a scholar or reliable inheritance calculator.` },
        { title: 'Designate up to 1/3 for charitable causes via wasiyyah or waqf', done: false,
          sources: `**I. Sources from the Quran**


### Ayah (57:18)
**Arabic:** 
**Translation:** Indeed, charitable men and charitable women1 who have loaned Allah a good loan—it will be multiplied for them, and for them is a noble reward.`,
          description: `**Why does this matter?**

The wasiyyah — your Islamic will's charitable bequest — is the portion of your estate where you have discretionary authority. The Prophet (peace be upon him) told Sa'd ibn Abi Waqqas that one-third is the maximum, and "one-third is a lot." This is your opportunity to extend your impact beyond death: funding education, endowing a masjid, supporting orphans, or any cause that serves the Maqasid. Without a deliberate wasiyyah designation, this portion defaults to inheritance shares — missing the chance for ongoing reward (sadaqah jariyah) that could benefit you in the grave.

---

**How do I accomplish this?**

1. **Decide how much of the 1/3 to allocate.** You do not have to use the full third — but consider the immense value of ongoing charity versus additional wealth for heirs who may already be provided for.

2. **Choose the causes.** Align with your lifelong priorities. If you spent your life supporting education, designate your wasiyyah for scholarships. If you built a community, fund its institutions.

3. **Consider establishing a waqf.** A portion of your wasiyyah can seed a permanent endowment that generates returns indefinitely — combining the wasiyyah with sadaqah jariyah for maximum perpetual impact.

4. **Name specific organisations or projects.** Vague instructions like "give to charity" create confusion for executors. Be specific: "Allocate \$50,000 to [Organisation] for their water well program."

5. **Ensure the wasiyyah does not benefit an heir.** Islamic law prohibits bequeathing additional wealth to someone who already receives a fara'id share, unless all other heirs consent.

6. **Include the wasiyyah in your formal will.** Work with your lawyer to integrate it into the legal estate document alongside the Shariah inheritance allocations.

7. **Benchmark:** You have completed this step when you have a documented wasiyyah allocation specifying exact amounts or percentages for named charitable causes, integrated into your estate plan.` },
        { title: 'Identify community impact investments that align with your values and Maqasid', done: false,
          description: `**Why does this matter?**

A truly comprehensive legacy strategy goes beyond distributing wealth after death — it deploys wealth during your lifetime in ways that generate compounding community benefit. Impact investments — halal businesses that employ community members, affordable housing developments, Islamic education institutions, or agricultural co-operatives — produce financial returns while simultaneously advancing the Maqasid. By identifying and allocating capital to these ventures now, you build community infrastructure that outlasts you, generates ongoing returns for your estate, and demonstrates that profit and purpose are not mutually exclusive in Islamic economics.

---

**How do I accomplish this?**

1. **Map your values to the Maqasid.** Which of the seven Maqasid (Faith, Life, Intellect, Family, Wealth, Environment, Ummah) do you feel most called to serve through your wealth?

2. **Research existing impact vehicles.** Look for Islamic impact funds, community development financial institutions (CDFIs), Muslim-led social enterprises, and cooperative ventures in your area or network.

3. **Evaluate each opportunity rigorously.** Apply the same due diligence as any investment — financial viability, management quality, risk profile — plus Shariah compliance and measurable community impact.

4. **Allocate a portion of your portfolio.** Start with 5-10% of your investable assets directed toward community impact investments, and increase as you gain confidence and identify strong opportunities.

5. **Measure impact alongside returns.** Track not only financial performance but also jobs created, families served, students educated, or whatever metric corresponds to the investment's purpose.

6. **Benchmark:** You have completed this step when you have identified at least two community impact investment opportunities that are Shariah-compliant, financially viable, and aligned with your chosen Maqasid priorities.` },
        { title: 'Document the strategy in your estate plan and discuss it with key family members', done: false,
          description: `**Why does this matter?**

An undocumented strategy dies with you. An undiscussed strategy surprises your family at their most vulnerable moment. Your legacy wealth plan must be written into a legally binding estate document and communicated to the people who will be affected by it — your spouse, adult children, appointed trustees, and executors. Documentation ensures your wishes are enforceable; discussion ensures they are understood, respected, and not contested. The Quran emphasises witnessing and documentation for financial agreements (2:282), and your estate plan is the most consequential financial document you will ever produce.

---

**How do I accomplish this?**

1. **Work with a lawyer to draft or update your will.** Incorporate the Shariah inheritance allocations, wasiyyah, waqf designations, and any impact investment instructions into a single, legally binding document.

2. **Include clear executor instructions.** Your executor should know exactly what to do — which assets go where, which organisations to contact, and who the mutawalli of any waqf is.

3. **Schedule a family meeting.** Sit with your spouse and adult children (if applicable) and walk them through the plan. Explain the Islamic rationale, the specific allocations, and what you expect of them.

4. **Address concerns honestly.** Family members may have questions about why a third goes to charity or how inheritance shares work. Answer with patience and scholarly references.

5. **Store the document securely.** Keep the original with your lawyer, a certified copy at home, and inform your executor where to find it. Consider a fireproof safe or secure digital backup.

6. **Benchmark:** You have completed this step when your legacy strategy is documented in a legally binding estate plan and at least one key family member has been briefed on its contents.` },
        { title: 'Review and update the strategy annually as your wealth and family circumstances evolve', done: false,
          description: `**Why does this matter?**

Life does not stand still, and neither should your legacy plan. Marriages, births, deaths, divorces, business successes, and financial setbacks all change the landscape of your estate. An inheritance plan drafted five years ago may allocate shares to heirs who no longer exist or omit new family members who have arrived since. Annual review ensures your plan remains accurate, Shariah-compliant, and reflective of your current reality. It also provides an opportunity to reassess your charitable allocations and community investments in light of changing needs and opportunities.

---

**How do I accomplish this?**

1. **Set a fixed annual review date.** Choose a meaningful date — the beginning of Muharram, your birthday, or the anniversary of when the plan was first created.

2. **Review family changes.** Has anyone been born, died, married, or divorced since the last review? These events directly affect inheritance shares.

3. **Reassess your estate value.** Update your projected estate value based on current assets, liabilities, and financial trajectory.

4. **Recalculate inheritance shares if needed.** If your family structure has changed, the fara'id shares must be recalculated by a scholar or reliable tool.

5. **Review your wasiyyah and waqf allocations.** Are the designated causes still active and impactful? Have new opportunities emerged that better serve the Maqasid?

6. **Update the legal documents.** Any changes must be reflected in the formal estate plan to be enforceable. File amended documents with your lawyer.

7. **Communicate changes to affected parties.** If you have adjusted shares, added beneficiaries, or changed executors, inform the relevant people so there are no surprises.

8. **Benchmark:** You have completed this step when you have completed at least one annual review of your legacy strategy and updated the estate plan to reflect any changes in your wealth or family circumstances.` },
      ],
    },
  ],
};
