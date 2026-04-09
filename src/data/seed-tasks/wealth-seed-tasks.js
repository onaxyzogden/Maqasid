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
        { title: 'List every active income source (employment, contracts, investments, side income)', done: false },
        { title: 'Research the Islamic ruling on each industry and revenue model involved', done: false },
        { title: 'Flag any source that involves riba, gharar, or haram products/services', done: false },
        { title: 'Consult a knowledgeable scholar or Islamic finance advisor on ambiguous cases', done: false },
        { title: 'Document findings and create an action plan for any flagged sources', done: false },
      ],
    },
    {
      title: 'Identify and exit any employment, contract, or investment that involves haram activity',
      priority: 'urgent', tags: ['halal-income', 'action'],
      description: 'Once haram income sources have been identified through your audit, take concrete steps to exit them. This may involve resigning from a position, terminating a contract, or liquidating an investment. Prioritise urgency while planning a realistic transition so you do not leave your dependants without provision.',
      subtasks: [
        { title: 'Rank flagged income sources by severity of haram involvement', done: false },
        { title: 'Draft an exit timeline for each haram source with realistic transition dates', done: false },
        { title: 'Identify halal replacement income to cover the gap before exiting', done: false },
        { title: 'Execute the exit — submit resignations, close accounts, or terminate contracts', done: false },
        { title: 'Verify that all replacement income is fully halal before relying on it', done: false },
      ],
    },
    {
      title: 'Learn the Islamic conditions for halal earnings — avoid riba, gharar, maysir, and oppression',
      priority: 'high', tags: ['fiqh', 'halal-income'],
      description: 'Study the foundational fiqh of earning in Islam so you can independently evaluate whether a transaction or business model is permissible. Understanding the prohibitions of riba (interest), gharar (excessive uncertainty), maysir (gambling), and zulm (oppression) equips you to make informed financial decisions for life.',
      subtasks: [
        { title: 'Study the Quranic verses on riba (2:275-280) and their tafsir', done: false },
        { title: 'Learn the definition and examples of gharar in contracts', done: false },
        { title: 'Understand maysir and how it differs from legitimate risk-taking in business', done: false },
        { title: 'Review the conditions that make a sale or contract valid in Islamic law', done: false },
        { title: 'Take notes and create a personal reference sheet of halal earning principles', done: false },
      ],
    },
    {
      title: 'Ensure your income consistently covers the fard needs of your dependants (nafaqah)',
      priority: 'high', tags: ['provision', 'obligation'],
      description: 'Nafaqah — providing food, shelter, clothing, and essential needs for your family — is a religious obligation before any discretionary spending or saving. Assess whether your current income reliably meets these baseline needs and identify any shortfalls that must be addressed immediately.',
      subtasks: [
        { title: 'List all dependants and their essential monthly needs (housing, food, clothing, medical)', done: false },
        { title: 'Calculate the total monthly nafaqah obligation in your currency', done: false },
        { title: 'Compare nafaqah total against your net monthly income', done: false },
        { title: 'Identify and close any gaps — adjust spending, increase income, or seek community support', done: false },
      ],
    },
    {
      title: 'Make tawbah and resolve any past haram earnings — consult a scholar if needed',
      priority: 'medium', tags: ['tawbah', 'purification'],
      description: 'If you have earned haram income in the past, sincere repentance (tawbah) is required alongside practical steps to purify your wealth. Scholars generally advise donating the haram portion to charity (not as sadaqah for reward, but to remove the impermissible funds). Seek specific guidance for your situation.',
      subtasks: [
        { title: 'Estimate the total amount of past haram earnings to the best of your ability', done: false },
        { title: 'Make sincere tawbah — regret, cease, and resolve not to return', done: false },
        { title: 'Consult a qualified scholar on how to dispose of the haram funds', done: false },
        { title: 'Donate the calculated haram amount to eligible charitable causes as purification', done: false },
        { title: 'Document the resolution for your own records and peace of mind', done: false },
      ],
    },
  ],
  wealth_earning_growth: [
    {
      title: 'Identify and develop a high-income skill aligned with your calling and halal principles',
      priority: 'high', tags: ['skill-building', 'income'],
      description: 'Invest in yourself by identifying a marketable skill that aligns with your God-given talents and serves a halal purpose. Whether it is software engineering, project management, medical expertise, or a trade, developing mastery in a high-value skill is one of the most reliable paths to increased halal provision.',
      subtasks: [
        { title: 'Assess your natural strengths, interests, and existing experience', done: false },
        { title: 'Research market demand and earning potential for 3-5 candidate skills', done: false },
        { title: 'Verify each candidate skill operates in a halal industry context', done: false },
        { title: 'Choose one skill and commit to a structured learning plan (course, mentor, project)', done: false },
        { title: 'Set a 90-day milestone to demonstrate measurable progress', done: false },
      ],
    },
    {
      title: 'Diversify income — build a second halal revenue stream (consulting, rentals, or business)',
      priority: 'high', tags: ['income', 'stability'],
      description: 'Relying on a single income source creates financial fragility. The Prophet (peace be upon him) encouraged trade and enterprise. Building a second halal revenue stream — whether through consulting, rental property, an online business, or partnership — provides resilience and increases your capacity for generosity.',
      subtasks: [
        { title: 'Brainstorm 5 potential secondary income ideas aligned with your skills', done: false },
        { title: 'Evaluate each idea for halal compliance, startup cost, and time commitment', done: false },
        { title: 'Select the most viable option and draft a simple business plan', done: false },
        { title: 'Launch a minimum viable version within 30 days', done: false },
        { title: 'Track revenue monthly and iterate based on results', done: false },
      ],
    },
    {
      title: 'Track your income and expenses monthly — use a simple halal-aware budgeting system',
      priority: 'medium', tags: ['budgeting', 'planning'],
      description: 'Consistent tracking of where your money comes from and where it goes is essential for intentional stewardship (khilafah) of wealth. A halal-aware budget explicitly accounts for zakah, sadaqah, and debt repayment as non-negotiable line items rather than afterthoughts.',
      subtasks: [
        { title: 'Choose a budgeting tool or spreadsheet and set it up with halal-aware categories', done: false },
        { title: 'Add dedicated line items for zakah, sadaqah, and debt repayment', done: false },
        { title: 'Enter all income and expenses for the current month as a baseline', done: false },
        { title: 'Schedule a monthly review session (e.g., first Friday of each month)', done: false },
        { title: 'Identify the top 3 areas where spending can be reduced or redirected', done: false },
      ],
    },
    {
      title: 'Negotiate a raise or contract rate increase aligned with your market value',
      priority: 'medium', tags: ['income', 'negotiation'],
      description: 'Being underpaid relative to your contribution is not humility — it is a missed opportunity to better provide for your family and community. Research your market value and advocate for fair compensation. The Prophet (peace be upon him) said: "Give the worker his wages before his sweat dries."',
      subtasks: [
        { title: 'Research salary benchmarks for your role, experience level, and location', done: false },
        { title: 'Document your key accomplishments and contributions over the past 6-12 months', done: false },
        { title: 'Prepare a clear, professional case for a specific raise or rate increase', done: false },
        { title: 'Schedule and conduct the negotiation conversation', done: false },
      ],
    },
  ],
  wealth_earning_excellence: [
    {
      title: 'Create ethical employment — hire and mentor someone, generating income for others',
      priority: 'medium', tags: ['employment', 'impact'],
      description: 'One of the highest forms of earning excellence is creating halal employment for others. By hiring even one person and paying them fairly and on time, you participate in circulating wealth through the community and fulfilling a prophetic standard of economic justice.',
      subtasks: [
        { title: 'Identify a role in your business or project that could be filled by a new hire', done: false },
        { title: 'Define fair compensation based on market rates and Islamic principles of just wages', done: false },
        { title: 'Recruit and hire a suitable candidate, prioritising trustworthiness and competence', done: false },
        { title: 'Establish a mentorship cadence — regular check-ins, skill development, and feedback', done: false },
        { title: 'Ensure wages are paid promptly and never delayed', done: false },
      ],
    },
    {
      title: 'Build a business that operates as an act of worship — clear mission, halal model, community benefit',
      priority: 'medium', tags: ['business', 'mission'],
      description: 'The ultimate expression of halal earning is a business that embodies your values: its mission serves a genuine need, its model is entirely halal, and its impact benefits the broader community. This is business as ibadah — where profit and purpose are inseparable.',
      subtasks: [
        { title: 'Write a mission statement that connects your business purpose to a Maqasid objective', done: false },
        { title: 'Audit the entire business model for halal compliance (revenue, marketing, contracts)', done: false },
        { title: 'Define at least one measurable community benefit the business delivers', done: false },
        { title: 'Establish an internal code of conduct rooted in Islamic business ethics', done: false },
        { title: 'Review quarterly whether the business is living up to its stated mission', done: false },
      ],
    },
    {
      title: 'Document and share your halal career or business journey to mentor others',
      priority: 'low', tags: ['mentorship', 'dawah'],
      description: 'Your experience navigating halal career and business decisions is valuable to others who are earlier in their journey. Documenting and sharing lessons — through writing, speaking, or one-on-one mentorship — is a form of sadaqah jariyah that multiplies the impact of your own learning.',
      subtasks: [
        { title: 'Outline the key turning points and decisions in your halal earning journey', done: false },
        { title: 'Choose a format for sharing (blog, podcast, community talk, or mentorship circle)', done: false },
        { title: 'Publish or present your first piece of content', done: false },
        { title: 'Offer direct mentorship to at least one person pursuing halal earning', done: false },
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
        { title: 'List every bank account, credit card, and financial product you currently hold', done: false },
        { title: 'Identify which ones generate or charge interest (riba)', done: false },
        { title: 'Research Islamic banking alternatives available in your region', done: false },
        { title: 'Open replacement accounts with Shariah-compliant institutions', done: false },
        { title: 'Transfer balances and close all riba-based accounts', done: false },
        { title: 'Set up direct deposits and autopayments on the new accounts', done: false },
      ],
    },
    {
      title: 'List all debts — prioritise eliminating high-interest consumer debt immediately',
      priority: 'urgent', tags: ['debt', 'riba'],
      description: 'Debt — especially interest-bearing debt — is a burden the Prophet (peace be upon him) sought refuge from. Create a complete inventory of all debts, then prioritise paying off the ones carrying the highest interest first, as continuing to pay riba compounds both the financial and spiritual harm.',
      subtasks: [
        { title: 'List every debt with creditor name, balance, interest rate, and minimum payment', done: false },
        { title: 'Sort debts by interest rate (highest first) to identify the most urgent', done: false },
        { title: 'Allocate maximum extra payments toward the highest-interest debt', done: false },
        { title: 'Contact creditors to negotiate rate reductions or early payoff terms', done: false },
        { title: 'Set a target date for becoming completely debt-free', done: false },
      ],
    },
    {
      title: 'Create a written monthly budget — income, fixed expenses, zakah allocation, and savings',
      priority: 'high', tags: ['budgeting', 'planning'],
      description: 'A written budget transforms vague financial intentions into a concrete plan. By explicitly allocating for zakah, debt repayment, essential expenses, and savings before discretionary spending, you ensure that your obligations to Allah and your family are met first.',
      subtasks: [
        { title: 'Calculate your total net monthly income from all halal sources', done: false },
        { title: 'List all fixed monthly expenses (rent, utilities, insurance, subscriptions)', done: false },
        { title: 'Add zakah allocation (set aside monthly even if paid annually)', done: false },
        { title: 'Define a savings target (minimum 10% of income)', done: false },
        { title: 'Allocate remaining funds to variable expenses and discretionary spending', done: false },
        { title: 'Write it down or enter it into a budgeting tool — make it tangible', done: false },
      ],
    },
    {
      title: 'Learn the basics of Islamic finance — riba prohibition, murabaha, musharakah, and ijara',
      priority: 'high', tags: ['islamic-finance', 'study'],
      description: 'Understanding Islamic financial instruments empowers you to make informed decisions about banking, investing, and purchasing. Learn how murabaha (cost-plus sale), musharakah (partnership), and ijara (leasing) provide halal alternatives to conventional interest-based products.',
      subtasks: [
        { title: 'Study the core prohibition of riba and why Islam forbids it', done: false },
        { title: 'Learn how murabaha (cost-plus financing) works and when it is appropriate', done: false },
        { title: 'Understand musharakah (equity partnership) and its profit/loss sharing model', done: false },
        { title: 'Learn the structure of ijara (Islamic leasing) and its common applications', done: false },
        { title: 'Compare at least two Islamic financial products available in your market', done: false },
      ],
    },
    {
      title: 'Build a 1-month emergency cash buffer as a starting safety net',
      priority: 'high', tags: ['emergency-fund', 'savings'],
      description: 'Having at least one month of essential expenses set aside protects you from being forced into haram borrowing during an unexpected hardship. This small buffer is the first step toward financial resilience and tawakkul grounded in practical preparation.',
      subtasks: [
        { title: 'Calculate your total essential monthly expenses (rent, food, utilities, transport)', done: false },
        { title: 'Open a separate halal savings account for your emergency fund', done: false },
        { title: 'Set up automatic transfers to build the buffer over 1-3 months', done: false },
        { title: 'Mark this fund as untouchable except for genuine emergencies', done: false },
      ],
    },
  ],
  wealth_financial_growth: [
    {
      title: 'Build a 6-month emergency fund in a halal, liquid account',
      priority: 'high', tags: ['emergency-fund', 'savings'],
      description: 'Expanding your emergency fund to cover six months of expenses provides genuine financial security. This cushion means you will never need to resort to riba-based loans in a crisis, and it gives you the freedom to make career and business decisions from a position of strength rather than desperation.',
      subtasks: [
        { title: 'Calculate your target amount (6 x monthly essential expenses)', done: false },
        { title: 'Identify the best halal liquid savings vehicle (Islamic savings account, money market)', done: false },
        { title: 'Set up a recurring automatic transfer toward the 6-month target', done: false },
        { title: 'Track progress monthly and adjust contributions if income changes', done: false },
        { title: 'Celebrate milestones (2-month, 4-month, 6-month) to maintain motivation', done: false },
      ],
    },
    {
      title: 'Open a Shariah-compliant investment account — research halal ETFs, sukuk, or Islamic funds',
      priority: 'high', tags: ['investing', 'halal'],
      description: 'Growing wealth beyond savings requires investment, and Islam encourages productive deployment of capital. Research Shariah-compliant options such as halal-screened equity ETFs, sukuk (Islamic bonds), and managed Islamic funds to put your money to work without compromising your principles.',
      subtasks: [
        { title: 'Research Shariah-compliant brokerage platforms available in your region', done: false },
        { title: 'Learn the screening criteria used to determine if a stock or fund is halal', done: false },
        { title: 'Compare at least 3 halal investment products (ETFs, sukuk, Islamic mutual funds)', done: false },
        { title: 'Open an account and make your first investment, even if small', done: false },
        { title: 'Set up regular contributions to build your portfolio over time', done: false },
      ],
    },
    {
      title: 'Set clear financial goals — 1-year, 5-year, and 10-year targets with milestones',
      priority: 'medium', tags: ['planning', 'goals'],
      description: 'Without clear goals, wealth accumulation becomes aimless. Define what you want to achieve financially at each time horizon — whether it is becoming debt-free, buying a home outright, funding your children\'s education, or reaching financial independence — and break each goal into measurable milestones.',
      subtasks: [
        { title: 'Write down your top financial goal for the next 12 months', done: false },
        { title: 'Define your 5-year financial vision (home ownership, business, investments)', done: false },
        { title: 'Articulate your 10-year legacy goal (financial independence, waqf, generational wealth)', done: false },
        { title: 'Break each goal into quarterly milestones with specific numbers', done: false },
        { title: 'Review and adjust goals every 6 months based on actual progress', done: false },
      ],
    },
    {
      title: 'Study a foundational personal finance book — filtered for Islamic compatibility (avoid riba-based advice)',
      priority: 'medium', tags: ['study', 'financial-literacy'],
      description: 'Many excellent personal finance books contain universal wisdom about budgeting, saving, and investing — but also include advice that assumes interest-based products are acceptable. Read with a critical Islamic lens: absorb the principles of discipline and wealth-building while filtering out anything involving riba.',
      subtasks: [
        { title: 'Choose a recommended book (e.g., The Richest Man in Babylon, filtered through Islamic principles)', done: false },
        { title: 'Read the book and take notes, flagging any advice that conflicts with Islamic finance', done: false },
        { title: 'For each flagged item, research the halal alternative', done: false },
        { title: 'Summarise 5 key takeaways that are compatible with your Islamic financial framework', done: false },
      ],
    },
  ],
  wealth_financial_excellence: [
    {
      title: 'Engage a qualified Islamic financial planner to optimise your asset allocation and estate plan',
      priority: 'medium', tags: ['planning', 'expert'],
      description: 'As your wealth grows in complexity, professional guidance becomes essential. A qualified Islamic financial planner can optimise your portfolio allocation, tax strategy, and estate plan while ensuring every element remains Shariah-compliant. This is an investment in the long-term integrity of your wealth.',
      subtasks: [
        { title: 'Research Islamic financial planners and advisors in your area or online', done: false },
        { title: 'Verify their qualifications (Islamic finance certification, regulatory credentials)', done: false },
        { title: 'Prepare a summary of your current financial position (assets, debts, income, goals)', done: false },
        { title: 'Schedule an initial consultation and discuss your objectives', done: false },
        { title: 'Implement their recommendations and schedule regular review meetings', done: false },
      ],
    },
    {
      title: 'Develop a multi-asset halal portfolio (equities, real estate, sukuk, gold)',
      priority: 'medium', tags: ['investing', 'diversification'],
      description: 'Diversification across asset classes reduces risk and increases resilience. A well-balanced halal portfolio might include Shariah-screened equities for growth, real estate for stability and rental income, sukuk for fixed-income exposure, and gold as a store of value — all within Islamic guidelines.',
      subtasks: [
        { title: 'Define your target asset allocation percentages across equity, real estate, sukuk, and gold', done: false },
        { title: 'Research and select specific halal instruments for each asset class', done: false },
        { title: 'Invest in at least two new asset classes you are not currently exposed to', done: false },
        { title: 'Rebalance your portfolio annually to maintain target allocations', done: false },
        { title: 'Monitor each asset class for ongoing Shariah compliance', done: false },
      ],
    },
    {
      title: 'Achieve full financial independence — passive income covers all living expenses without active work',
      priority: 'low', tags: ['financial-independence', 'goals'],
      description: 'Financial independence means your halal passive income (rental properties, business profits, investment returns) covers all living expenses without requiring active employment. This frees your time for worship, family, community service, and pursuing your highest-impact work — the ultimate expression of Hifz al-Mal.',
      subtasks: [
        { title: 'Calculate your financial independence number (annual expenses / expected return rate)', done: false },
        { title: 'Map out a realistic timeline to reach that number based on current savings rate', done: false },
        { title: 'Identify and build the passive income streams that will fund your independence', done: false },
        { title: 'Stress-test your plan against inflation, market downturns, and life changes', done: false },
        { title: 'Define what you will do with your time once financial independence is achieved', done: false },
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
        { title: 'Learn the Quranic inheritance shares for your specific family structure (4:11-12, 4:176)', done: false },
        { title: 'List all assets that will form part of your estate', done: false },
        { title: 'Consult a scholar or Islamic estate planner to draft the wasiyyah', done: false },
        { title: 'Include the optional bequest (up to 1/3) for charitable or non-heir purposes', done: false },
        { title: 'Have the will legally validated and witnessed according to local law', done: false },
        { title: 'Store the will securely and inform your executor of its location', done: false },
      ],
    },
    {
      title: 'Confirm all major assets (property, vehicles, accounts) have clear, legitimate title in your name',
      priority: 'high', tags: ['ownership', 'legal'],
      description: 'Clear ownership is a prerequisite for Islamic inheritance, zakah calculation, and lawful transaction. Verify that the title or registration for every major asset you own is properly documented, legally valid, and free from disputes or ambiguity.',
      subtasks: [
        { title: 'List all major assets: real estate, vehicles, bank accounts, investments, valuables', done: false },
        { title: 'Verify title documentation for each asset (deeds, registrations, account statements)', done: false },
        { title: 'Identify any assets with unclear, shared, or disputed ownership', done: false },
        { title: 'Take action to resolve any title issues (legal transfer, documentation, registration)', done: false },
      ],
    },
    {
      title: 'Learn the Islamic rules of ownership — what you can and cannot own, and your obligations as an owner',
      priority: 'high', tags: ['fiqh', 'ownership'],
      description: 'In Islam, ownership is a trust (amanah) — you are a steward, not an absolute owner. Study what categories of property and assets can be privately owned, the rights of others upon your wealth (zakah, nafaqah, community dues), and the prohibitions against hoarding (kanz) and monopoly (ihtikar).',
      subtasks: [
        { title: 'Study the concept of ownership as stewardship (khilafah) in Islamic law', done: false },
        { title: 'Learn what categories of property cannot be privately owned (e.g., public water sources)', done: false },
        { title: 'Understand the prohibition of hoarding (kanz) and its conditions', done: false },
        { title: 'Review the rights others have upon your wealth (zakah, nafaqah, debts)', done: false },
        { title: 'Summarise key ownership principles for personal reference', done: false },
      ],
    },
    {
      title: 'Identify any property or assets obtained through unclear or disputed means — resolve them',
      priority: 'high', tags: ['ownership', 'integrity'],
      description: 'Assets acquired through ambiguous transactions, family disputes, or informal arrangements may not be rightfully yours in the eyes of Shariah. Identify any such assets and take steps to clarify ownership — even if it means returning something to its rightful owner — as clean ownership is essential for barakah.',
      subtasks: [
        { title: 'Review how each major asset was acquired — purchase, gift, inheritance, or informal transfer', done: false },
        { title: 'Flag any asset where the acquisition method was unclear or potentially disputed', done: false },
        { title: 'Consult affected parties and, if needed, a scholar to determine rightful ownership', done: false },
        { title: 'Formalise ownership through proper documentation or return the asset if it is not yours', done: false },
      ],
    },
    {
      title: 'Ensure all contracts you have signed are free from gharar (ambiguity) and zulm (injustice)',
      priority: 'medium', tags: ['contracts', 'fiqh'],
      description: 'Islam requires that contracts be clear, fair, and free from excessive uncertainty. Review your active contracts — employment agreements, leases, business partnerships, service agreements — to ensure they do not contain hidden terms, unjust clauses, or ambiguity that could harm either party.',
      subtasks: [
        { title: 'Collect all active contracts you are party to (employment, lease, business, service)', done: false },
        { title: 'Review each contract for clarity of terms, obligations, and payment conditions', done: false },
        { title: 'Identify any clauses involving gharar (ambiguity) or zulm (unfair terms)', done: false },
        { title: 'Renegotiate or amend problematic clauses to achieve fairness and clarity', done: false },
        { title: 'Keep signed copies of all amended contracts for your records', done: false },
      ],
    },
  ],
  wealth_ownership_growth: [
    {
      title: 'Audit all business and personal contracts — add clarity, fairness, and Islamic compliance where missing',
      priority: 'high', tags: ['contracts', 'transparency'],
      description: 'As your financial affairs grow, so does the number of contracts governing them. Conduct a comprehensive audit of all active agreements to ensure they meet Islamic standards of transparency, mutual consent, and fairness. Update any that fall short.',
      subtasks: [
        { title: 'Create a master list of all active business and personal contracts', done: false },
        { title: 'Review each contract against Islamic contract principles (clarity, consent, no riba, no gharar)', done: false },
        { title: 'Flag contracts that need amendments for Islamic compliance', done: false },
        { title: 'Draft and propose amendments to the counterparties', done: false },
        { title: 'Establish a template for future contracts that embeds Islamic principles from the start', done: false },
      ],
    },
    {
      title: 'Research and purchase your first Shariah-compliant asset — property, gold, or halal equity',
      priority: 'medium', tags: ['investing', 'ownership'],
      description: 'Moving from saving to owning productive or appreciating assets is a key step in wealth growth. Research Shariah-compliant asset classes and make your first purchase — whether it is physical gold, a rental property financed through Islamic means, or halal equity shares.',
      subtasks: [
        { title: 'Compare asset classes (property, gold, halal equities) for accessibility and risk profile', done: false },
        { title: 'Verify the Shariah compliance of the specific asset or product you intend to purchase', done: false },
        { title: 'Determine your budget and financing method (savings, Islamic financing, partnership)', done: false },
        { title: 'Execute the purchase with proper documentation and contracts', done: false },
        { title: 'Set up a system to monitor the asset\'s performance and compliance over time', done: false },
      ],
    },
    {
      title: 'Establish proper business documentation — contracts, receipts, and records for all transactions',
      priority: 'medium', tags: ['business', 'integrity'],
      description: 'Allah commands in Surah Al-Baqarah (2:282) that debts and major transactions be written down. Proper documentation protects all parties, prevents disputes, and is a form of ihsan (excellence) in your financial dealings. Establish systems to record every significant transaction.',
      subtasks: [
        { title: 'Set up a filing system (digital or physical) for contracts, invoices, and receipts', done: false },
        { title: 'Ensure every transaction above a threshold amount has a written record', done: false },
        { title: 'Use standardised contract templates for recurring transaction types', done: false },
        { title: 'Back up all financial records securely (cloud storage or safe deposit)', done: false },
      ],
    },
    {
      title: 'Learn inheritance law (fara\'id) — know how your estate will be divided and plan accordingly',
      priority: 'medium', tags: ['faraid', 'estate'],
      description: 'The Islamic law of inheritance (fara\'id) is a precise system revealed in the Quran. Understanding how your estate will be divided among your heirs — and who qualifies as an heir — enables you to plan your wealth, make permissible bequests (wasiyyah), and avoid arrangements that conflict with divine decree.',
      subtasks: [
        { title: 'Study the fixed shares (furu\'d) assigned to each category of heir in the Quran', done: false },
        { title: 'Identify your current heirs and their respective shares based on your family structure', done: false },
        { title: 'Understand the rules of \'asbah (residual heirs) and hajb (exclusion)', done: false },
        { title: 'Learn the permissible scope of the optional bequest (wasiyyah — up to 1/3 to non-heirs)', done: false },
        { title: 'Apply this knowledge to update or create your Islamic will', done: false },
      ],
    },
  ],
  wealth_ownership_excellence: [
    {
      title: 'Establish a family trust or multi-generational estate plan with a qualified Islamic scholar and lawyer',
      priority: 'medium', tags: ['estate', 'legacy'],
      description: 'A well-structured estate plan that spans generations ensures your wealth continues to benefit your family and community long after you are gone. Working with both an Islamic scholar and a qualified lawyer ensures the plan is both Shariah-compliant and legally enforceable in your jurisdiction.',
      subtasks: [
        { title: 'Identify a lawyer experienced in estate planning and familiar with Islamic requirements', done: false },
        { title: 'Engage an Islamic scholar to advise on Shariah compliance of the trust structure', done: false },
        { title: 'Define the trust\'s objectives — protecting heirs, funding education, maintaining family property', done: false },
        { title: 'Draft the trust documents with both legal and Shariah review', done: false },
        { title: 'Execute the trust and transfer designated assets into it', done: false },
        { title: 'Schedule periodic reviews to update the trust as family circumstances change', done: false },
      ],
    },
    {
      title: 'Transfer assets to joint or trust ownership to protect heirs and avoid probate complications',
      priority: 'low', tags: ['estate', 'planning'],
      description: 'Probate processes can be lengthy, expensive, and may distribute assets contrary to Islamic law. Transferring assets into joint ownership or a trust structure during your lifetime can protect your heirs from these complications and ensure a smoother, Shariah-aligned transition.',
      subtasks: [
        { title: 'Identify assets that would benefit from joint or trust ownership', done: false },
        { title: 'Consult a lawyer on the probate laws in your jurisdiction and how trust structures interact with them', done: false },
        { title: 'Verify that the proposed transfer does not violate Islamic inheritance principles', done: false },
        { title: 'Execute the legal transfer of ownership with proper documentation', done: false },
      ],
    },
    {
      title: 'Set up a structured charitable ownership vehicle — waqf, foundation, or endowment',
      priority: 'low', tags: ['waqf', 'legacy'],
      description: 'A waqf is a permanent endowment in Islam — an asset whose principal is preserved while its returns benefit a designated cause indefinitely. Establishing a waqf or equivalent charitable vehicle is one of the most powerful forms of sadaqah jariyah, creating ongoing benefit that outlasts your lifetime.',
      subtasks: [
        { title: 'Study the fiqh of waqf — conditions, types, and management requirements', done: false },
        { title: 'Identify the asset(s) you will dedicate to the waqf (property, cash, investments)', done: false },
        { title: 'Define the beneficiaries and purpose of the waqf (education, masjid, community service)', done: false },
        { title: 'Engage a lawyer to establish the waqf with legal standing in your jurisdiction', done: false },
        { title: 'Appoint a trustworthy administrator (mutawalli) to manage the waqf', done: false },
        { title: 'Document the waqf deed and register it with relevant authorities', done: false },
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
        { title: 'Determine the current nisab threshold in your currency (gold or silver standard)', done: false },
        { title: 'List all zakatable assets: cash, savings, gold, silver, investments, trade goods', done: false },
        { title: 'Subtract any immediate debts that are due from your total zakatable wealth', done: false },
        { title: 'Calculate 2.5% of the net zakatable amount', done: false },
        { title: 'Record your hawl date and set a reminder for annual recalculation', done: false },
      ],
    },
    {
      title: 'Distribute zakah to eligible recipients immediately — do not delay beyond the hawl date',
      priority: 'urgent', tags: ['zakah', 'obligation'],
      description: 'Once your hawl date arrives and zakah is due, it must be distributed without unnecessary delay. The poor and needy have a right (haqq) to this portion of your wealth — withholding it is a serious sin. Identify eligible recipients and ensure the funds reach them promptly.',
      subtasks: [
        { title: 'Identify local eligible recipients from the eight categories in Surah At-Tawbah 9:60', done: false },
        { title: 'Research trustworthy zakah distribution organisations if distributing through an intermediary', done: false },
        { title: 'Distribute the full zakah amount within days of the hawl date', done: false },
        { title: 'Obtain receipts or confirmation of distribution for your records', done: false },
        { title: 'Make dua that Allah accepts your zakah and places barakah in your remaining wealth', done: false },
      ],
    },
    {
      title: 'Pay any outstanding zakah from previous years — make up missed obligations with a scholar\'s guidance',
      priority: 'urgent', tags: ['zakah', 'qada'],
      description: 'If you have missed zakah payments from previous years — whether due to ignorance, negligence, or miscalculation — the obligation remains as a debt to Allah. Calculate the estimated shortfall for each missed year and pay it as soon as possible, consulting a scholar for guidance on complex situations.',
      subtasks: [
        { title: 'Estimate your zakatable wealth for each year you may have missed', done: false },
        { title: 'Calculate the zakah owed for each missed year (2.5% of that year\'s zakatable wealth)', done: false },
        { title: 'Consult a scholar on the correct method if wealth records are incomplete', done: false },
        { title: 'Create a repayment schedule if the total outstanding amount is large', done: false },
        { title: 'Begin distributing the outstanding zakah immediately, starting with the oldest obligation', done: false },
      ],
    },
    {
      title: 'Establish a dedicated zakah account or envelope — separate and earmark zakah funds before spending',
      priority: 'high', tags: ['zakah', 'planning'],
      description: 'Mixing zakah funds with personal spending money risks accidental misuse. Set up a dedicated account, envelope, or digital category that holds your zakah funds separately. This makes distribution easier, tracking clearer, and ensures the funds are protected from personal spending.',
      subtasks: [
        { title: 'Open a separate savings account or create a dedicated digital envelope for zakah', done: false },
        { title: 'Set up automatic monthly transfers (1/12 of your estimated annual zakah)', done: false },
        { title: 'Label the account clearly so it is never confused with personal savings', done: false },
        { title: 'Review the balance quarterly to ensure it aligns with your expected zakah obligation', done: false },
      ],
    },
    {
      title: 'Learn the eight eligible recipients of zakah (Surah At-Tawbah 9:60) and identify local options',
      priority: 'medium', tags: ['zakah', 'fiqh'],
      description: 'Allah specified exactly eight categories of people eligible to receive zakah in Surah At-Tawbah 9:60. Knowing these categories — the poor, the needy, zakah administrators, those whose hearts are to be reconciled, slaves seeking freedom, debtors, in the cause of Allah, and the wayfarer — ensures your zakah reaches those truly entitled to it.',
      subtasks: [
        { title: 'Study each of the eight zakah recipient categories with their scholarly definitions', done: false },
        { title: 'Identify individuals or families in your local community who fall into eligible categories', done: false },
        { title: 'Research local and national organisations that distribute zakah to verified recipients', done: false },
        { title: 'Create a personal zakah distribution list with names or organisations for each category', done: false },
        { title: 'Prioritise local distribution where possible for direct community impact', done: false },
      ],
    },
  ],
  wealth_circulation_growth: [
    {
      title: 'Establish a regular sadaqah habit — automate a monthly charitable contribution, however small',
      priority: 'high', tags: ['sadaqah', 'habit'],
      description: 'The Prophet (peace be upon him) said the most beloved deeds to Allah are the most consistent, even if small. Automating a monthly sadaqah contribution — even a modest amount — builds the habit of generosity, purifies your wealth, and provides ongoing support to those in need.',
      subtasks: [
        { title: 'Choose a trusted charitable organisation or local cause to support regularly', done: false },
        { title: 'Decide on a monthly amount you can sustain comfortably (start small, increase over time)', done: false },
        { title: 'Set up an automatic recurring transfer or standing order', done: false },
        { title: 'Review and increase the amount annually as your income grows', done: false },
      ],
    },
    {
      title: 'Direct investment or purchasing power toward local Muslim businesses and ethical community ventures',
      priority: 'medium', tags: ['community', 'impact'],
      description: 'Wealth circulation within the community multiplies its impact. By intentionally directing your spending and investment toward local Muslim-owned businesses and ethical ventures, you help build a self-sustaining economic ecosystem that reduces dependency on external systems and strengthens communal bonds.',
      subtasks: [
        { title: 'Identify Muslim-owned and ethical businesses in your local area for common purchases', done: false },
        { title: 'Shift at least 3 regular purchases to local Muslim or ethical vendors', done: false },
        { title: 'Explore investment opportunities in community-based ventures (co-ops, local funds)', done: false },
        { title: 'Encourage family and friends to support the same businesses for compounding impact', done: false },
        { title: 'Track how much of your monthly spending stays within the Muslim community', done: false },
      ],
    },
    {
      title: 'Give interest-free loans (qard hasan) to family or community members in need',
      priority: 'medium', tags: ['qard-hasan', 'community'],
      description: 'Qard hasan — a beautiful loan given without any expectation of interest or profit — is one of the most praised financial acts in Islam. Allah describes it as "lending to Allah" (Quran 2:245). When a family or community member is in need, offering a qard hasan protects them from riba while earning immense reward.',
      subtasks: [
        { title: 'Determine how much you can lend without jeopardising your own financial obligations', done: false },
        { title: 'Identify a family or community member genuinely in need of an interest-free loan', done: false },
        { title: 'Document the loan terms clearly in writing (amount, repayment timeline) per Quran 2:282', done: false },
        { title: 'Disburse the loan with kindness and without making the recipient feel burdened', done: false },
        { title: 'Follow up gently on repayment, and be prepared to forgive if the borrower faces hardship', done: false },
      ],
    },
    {
      title: 'Research and identify a local sadaqah jariyah project to contribute to consistently',
      priority: 'medium', tags: ['sadaqah-jariyah', 'planning'],
      description: 'Sadaqah jariyah — ongoing charity — continues to benefit you after death. Projects like building a well, funding a school, planting trees, or supporting an Islamic education program generate continuous reward. Find a local project you believe in and commit to consistent contributions.',
      subtasks: [
        { title: 'Research local sadaqah jariyah opportunities (masjid construction, wells, schools, libraries)', done: false },
        { title: 'Evaluate the credibility and impact of each project', done: false },
        { title: 'Select one project and commit to a regular contribution amount and schedule', done: false },
        { title: 'Visit or engage with the project to see your contributions in action', done: false },
        { title: 'Share the opportunity with others to multiply the impact', done: false },
      ],
    },
  ],
  wealth_circulation_excellence: [
    {
      title: 'Formally establish or fund a waqf (endowment) — a permanent asset dedicated to ongoing benefit',
      priority: 'medium', tags: ['waqf', 'sadaqah-jariyah'],
      description: 'A waqf is the pinnacle of wealth circulation in Islam — a permanent endowment whose principal is preserved forever while its returns fund a designated cause. Historically, waqf funded hospitals, universities, and public infrastructure across the Muslim world. Establishing one is a legacy that transcends your lifetime.',
      subtasks: [
        { title: 'Determine the asset or capital you will dedicate to the waqf', done: false },
        { title: 'Define the beneficiaries and purpose (education, healthcare, masjid, community service)', done: false },
        { title: 'Engage an Islamic scholar to ensure the waqf structure meets fiqhi requirements', done: false },
        { title: 'Work with a lawyer to establish the waqf with legal standing', done: false },
        { title: 'Appoint a mutawalli (trustee) and define governance procedures', done: false },
        { title: 'Launch the waqf and begin generating returns for the designated cause', done: false },
      ],
    },
    {
      title: 'Create a family sadaqah fund — a shared pot your household contributes to and distributes together',
      priority: 'low', tags: ['sadaqah', 'family'],
      description: 'A family sadaqah fund transforms charity from an individual act into a household value. Everyone contributes — even children with small amounts — and the family decides together where to distribute. This builds generosity as a family identity and teaches children the joy and responsibility of giving.',
      subtasks: [
        { title: 'Propose the idea to your household and agree on a structure (jar, account, or digital pot)', done: false },
        { title: 'Set a regular contribution schedule — weekly or monthly from each family member', done: false },
        { title: 'Hold a monthly family meeting to decide where to distribute the funds', done: false },
        { title: 'Involve children in the decision-making to build their understanding of sadaqah', done: false },
        { title: 'Track contributions and distributions to celebrate the family\'s collective generosity', done: false },
      ],
    },
    {
      title: 'Build a legacy wealth strategy: 1/3 for heirs, 1/3 for charity, 1/3 reinvested in community impact',
      priority: 'low', tags: ['legacy', 'planning'],
      description: 'A comprehensive legacy strategy goes beyond a will — it is a deliberate plan for how your wealth will continue to serve after you. Inspired by the prophetic principle of the wasiyyah (up to 1/3 for charity), design a framework that balances provision for heirs, charitable endowment, and reinvestment in community-building ventures.',
      subtasks: [
        { title: 'Calculate your total projected estate value at current trajectory', done: false },
        { title: 'Allocate the Shariah-mandated inheritance shares for your heirs (minimum 2/3)', done: false },
        { title: 'Designate up to 1/3 for charitable causes via wasiyyah or waqf', done: false },
        { title: 'Identify community impact investments that align with your values and Maqasid', done: false },
        { title: 'Document the strategy in your estate plan and discuss it with key family members', done: false },
        { title: 'Review and update the strategy annually as your wealth and family circumstances evolve', done: false },
      ],
    },
  ],
};
