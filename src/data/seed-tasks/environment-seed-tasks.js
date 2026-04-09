// Seed tasks for Environment pillar submodules (Hifz al-Bi'ah).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const ENVIRONMENT_SEED_TASKS = {
  // ── RESOURCE CONSUMPTION (WATER & ENERGY) ──
  environment_resource_core: [
    {
      title: 'Audit household water usage — identify and fix all leaks, dripping taps, and wasteful habits',
      priority: 'urgent', tags: ['water', 'israf'],
      description: 'Conduct a thorough walk-through of every water outlet in your home to find leaks, dripping taps, and inefficient fixtures. The Prophet (peace be upon him) forbade wasting water even when performing wudu at a flowing river — this audit is the first step to honouring that principle in your daily life.',
      subtasks: [
        { title: 'Inspect all taps, toilets, and hose connections for leaks or drips', done: false },
        { title: 'Check water meter before and after a 2-hour no-use window to detect hidden leaks', done: false },
        { title: 'Replace worn washers, seals, or faulty valves on any leaking fixtures', done: false },
        { title: 'List all wasteful water habits (e.g., running tap while brushing teeth) and commit to stopping them', done: false },
        { title: 'Record current monthly water consumption as a baseline', done: false },
      ],
    },
    {
      title: 'Practise the Sunnah of wudu — use minimal water (3 scoops per limb), even at a running stream',
      priority: 'urgent', tags: ['wudu', 'sunnah'],
      description: 'The Prophet (peace be upon him) used to perform wudu with approximately one mudd of water (roughly 750ml). Training yourself to use minimal water during wudu builds the habit of mindful consumption that extends to every area of resource use.',
      subtasks: [
        { title: 'Study the hadith on the Prophet\'s wudu water usage (Bukhari & Muslim)', done: false },
        { title: 'Practise wudu with a small container instead of running water for one week', done: false },
        { title: 'Install a push-tap or sensor tap at your wudu station if possible', done: false },
        { title: 'Teach family members the Sunnah method and its environmental significance', done: false },
      ],
    },
    {
      title: 'Turn off all unused lights, appliances, and chargers — eliminate standby energy waste',
      priority: 'high', tags: ['energy', 'israf'],
      description: 'Standby power (phantom load) can account for 5-10% of household electricity consumption. Eliminating this waste is a direct application of the Quranic prohibition against israf — extravagance and needless consumption of resources entrusted to us.',
      subtasks: [
        { title: 'Walk through every room and unplug chargers and devices not in active use', done: false },
        { title: 'Install power strips with on/off switches for entertainment and office setups', done: false },
        { title: 'Set a nightly routine to power down all non-essential electronics before sleep', done: false },
        { title: 'Label switches clearly so family members can identify and turn off unused circuits', done: false },
        { title: 'Check that heating/cooling systems are off in unoccupied rooms', done: false },
      ],
    },
    {
      title: 'Learn the Quranic prohibition of israf (extravagance) and its application to resources',
      priority: 'medium', tags: ['israf', 'quran'],
      description: 'Allah says "Eat and drink, but do not be extravagant — He does not love the extravagant" (Al-A\'raf 7:31). Understanding israf as a comprehensive principle — not limited to food — reshapes how you view energy, water, materials, and time as amanah (trust).',
      subtasks: [
        { title: 'Read and reflect on Quran 7:31, 17:26-27, and 25:67 on moderation and waste', done: false },
        { title: 'Study Ibn Ashur\'s commentary on israf as a violation of the maqasid of wealth and environment', done: false },
        { title: 'Write a personal reflection on three areas where israf exists in your life', done: false },
        { title: 'Share key findings with your household to build a collective anti-waste ethic', done: false },
      ],
    },
    {
      title: 'Track monthly electricity and water bills — establish a baseline for reduction targets',
      priority: 'medium', tags: ['tracking', 'planning'],
      description: 'You cannot improve what you do not measure. Recording 3-6 months of utility data creates a reliable baseline so that future conservation efforts can be measured against real numbers rather than guesswork.',
      subtasks: [
        { title: 'Collect the last 3-6 months of electricity and water bills', done: false },
        { title: 'Create a simple spreadsheet or log tracking kWh and litres per month', done: false },
        { title: 'Calculate average monthly cost and consumption for each utility', done: false },
        { title: 'Identify the highest-consumption months and investigate the reasons', done: false },
        { title: 'Set a specific percentage reduction goal for the next quarter', done: false },
      ],
    },
  ],
  environment_resource_growth: [
    {
      title: 'Replace all incandescent bulbs with LED equivalents throughout the home',
      priority: 'high', tags: ['energy', 'efficiency'],
      description: 'LED bulbs use up to 80% less energy and last 15-25 times longer than incandescent bulbs. This single change can meaningfully reduce your electricity footprint and is one of the highest-return environmental investments for any household.',
      subtasks: [
        { title: 'Inventory all light fixtures and note bulb types and wattages', done: false },
        { title: 'Purchase LED replacements with equivalent lumens and appropriate colour temperature', done: false },
        { title: 'Replace all incandescent and CFL bulbs room by room', done: false },
        { title: 'Dispose of old bulbs properly — especially CFLs which contain mercury', done: false },
        { title: 'Compare next month\'s electricity bill to baseline to measure savings', done: false },
      ],
    },
    {
      title: 'Install water-saving aerators or low-flow showerheads in all taps and showers',
      priority: 'high', tags: ['water', 'efficiency'],
      description: 'Aerators mix air into the water stream, reducing flow by 30-50% without noticeably affecting water pressure. This is a low-cost, high-impact upgrade that directly reduces water waste in line with the khalifah responsibility over natural resources.',
      subtasks: [
        { title: 'Measure existing flow rates at each tap and showerhead (litres per minute)', done: false },
        { title: 'Purchase aerators and low-flow showerheads compatible with your fixtures', done: false },
        { title: 'Install the new fittings — most screw on without tools', done: false },
        { title: 'Re-measure flow rates after installation to confirm reduction', done: false },
      ],
    },
    {
      title: 'Set a household water and energy reduction target — aim for 20% less than current baseline',
      priority: 'medium', tags: ['planning', 'goals'],
      description: 'A clear, shared target turns individual conservation habits into a household commitment. The 20% target is ambitious but achievable for most homes through the combined effect of behavioural changes and efficiency upgrades already underway.',
      subtasks: [
        { title: 'Review your baseline data and calculate what a 20% reduction looks like in real numbers', done: false },
        { title: 'Hold a family meeting to agree on the target and discuss strategies', done: false },
        { title: 'Post the target visibly in the home (e.g., near the meter or on the fridge)', done: false },
        { title: 'Set monthly check-ins to review progress and adjust habits', done: false },
        { title: 'Celebrate milestones together when monthly targets are met', done: false },
      ],
    },
    {
      title: 'Research government rebates or community programmes for energy-efficient home upgrades',
      priority: 'low', tags: ['energy', 'planning'],
      description: 'Many governments and utility companies offer rebates, grants, or interest-free financing for energy-efficient appliances, insulation, and solar installations. Taking advantage of these programmes makes larger environmental investments financially accessible.',
      subtasks: [
        { title: 'Search your local government website for energy efficiency rebate programmes', done: false },
        { title: 'Contact your electricity provider about any available upgrade incentives', done: false },
        { title: 'Check for community or masjid-based group purchasing programmes', done: false },
        { title: 'Create a shortlist of eligible upgrades ranked by cost-benefit ratio', done: false },
      ],
    },
  ],
  environment_resource_excellence: [
    {
      title: 'Install solar panels or transition to a renewable energy provider for your home',
      priority: 'medium', tags: ['renewable', 'solar'],
      description: 'Transitioning to renewable energy is one of the most significant steps a household can take toward environmental stewardship. Solar panels also provide long-term financial savings and energy independence, aligning the maqasid of wealth preservation with environmental care.',
      subtasks: [
        { title: 'Get quotes from at least three solar installers and compare system sizes and costs', done: false },
        { title: 'Research available government rebates, feed-in tariffs, and financing options', done: false },
        { title: 'If solar is not feasible, research and switch to a certified renewable energy retailer', done: false },
        { title: 'Calculate expected payback period and annual carbon offset', done: false },
        { title: 'Schedule installation and arrange any required permits or inspections', done: false },
      ],
    },
    {
      title: 'Install a rainwater harvesting system for garden and non-potable household use',
      priority: 'low', tags: ['water', 'renewable'],
      description: 'Rainwater harvesting captures a free, clean resource that would otherwise run off into drains. Using collected rainwater for gardens, toilets, and laundry can reduce mains water consumption by 30-50%, embodying the khalifah principle of working with natural cycles rather than against them.',
      subtasks: [
        { title: 'Assess your roof area and local rainfall to estimate annual collection potential', done: false },
        { title: 'Choose an appropriate tank size and location (above-ground or underground)', done: false },
        { title: 'Install guttering, first-flush diverters, and filtration as needed', done: false },
        { title: 'Connect the system to garden irrigation and/or toilet cisterns', done: false },
        { title: 'Track water savings monthly and compare to mains usage baseline', done: false },
      ],
    },
    {
      title: 'Achieve net-zero or carbon-neutral household energy consumption — document and share your journey',
      priority: 'low', tags: ['net-zero', 'legacy'],
      description: 'Net-zero means your home generates as much clean energy as it consumes over a year. Documenting and sharing this journey creates a replicable model for other Muslim households and demonstrates that Islamic environmental stewardship is practical, not just aspirational.',
      subtasks: [
        { title: 'Calculate your total annual household carbon footprint (energy, transport, waste)', done: false },
        { title: 'Identify remaining emission sources after efficiency and renewable upgrades', done: false },
        { title: 'Offset residual emissions through verified carbon offset programmes or tree planting', done: false },
        { title: 'Document the full journey — costs, savings, challenges, and lessons learned', done: false },
        { title: 'Share findings with your community, masjid, or online platforms as a case study', done: false },
      ],
    },
  ],

  // ── WASTE & POLLUTION MANAGEMENT ──
  environment_waste_core: [
    {
      title: 'Set up a proper recycling system at home — label bins clearly for paper, plastic, glass, and metal',
      priority: 'high', tags: ['recycling', 'waste'],
      description: 'A clearly labelled recycling system removes the friction that causes recyclable materials to end up in landfill. Making recycling easy and visible for every household member is foundational to reducing waste as part of your environmental amanah.',
      subtasks: [
        { title: 'Research your local council\'s recycling categories and collection schedule', done: false },
        { title: 'Purchase or designate separate bins for each recyclable category', done: false },
        { title: 'Label each bin clearly with text and/or visual icons', done: false },
        { title: 'Place bins in accessible locations (kitchen, garage, or utility area)', done: false },
        { title: 'Brief all household members on what goes in each bin', done: false },
      ],
    },
    {
      title: 'Identify and safely dispose of all toxic household chemicals — paint, batteries, electronics',
      priority: 'urgent', tags: ['toxic-waste', 'safety'],
      description: 'Toxic household waste contaminates soil and water when disposed of improperly. Islam prohibits causing harm (la darar wa la dirar), and improper chemical disposal harms both the environment and neighbouring communities who share these resources.',
      subtasks: [
        { title: 'Survey your home for old paint, solvents, batteries, expired medications, and e-waste', done: false },
        { title: 'Research local hazardous waste collection points or drop-off events', done: false },
        { title: 'Safely transport and dispose of all identified toxic items', done: false },
        { title: 'Set up a small dedicated container for ongoing battery and e-waste collection', done: false },
      ],
    },
    {
      title: 'Stop littering and remove harmful waste from public spaces — "removing harm is sadaqah"',
      priority: 'high', tags: ['sadaqah', 'cleanliness'],
      description: 'The Prophet (peace be upon him) said that removing a harmful object from the road is a branch of faith and an act of charity. This task extends that hadith into a regular practice of picking up litter and keeping shared spaces clean as an act of worship.',
      subtasks: [
        { title: 'Carry a small bag when walking to collect litter you encounter', done: false },
        { title: 'Commit to never discarding waste outside of a proper bin', done: false },
        { title: 'Clean up the area around your home, street, or local masjid weekly', done: false },
        { title: 'Teach children the hadith and involve them in neighbourhood clean-ups', done: false },
        { title: 'Encourage neighbours to participate — lead by example', done: false },
      ],
    },
    {
      title: 'Learn Islamic principles of taharah (purity) and their extension to environmental cleanliness',
      priority: 'medium', tags: ['taharah', 'study'],
      description: 'Taharah in Islam is not limited to ritual purity — it extends to keeping one\'s surroundings, water sources, and shared spaces clean. Understanding this broader scope transforms environmental action from a secular obligation into an act of ibadah.',
      subtasks: [
        { title: 'Study the hadith "Cleanliness is half of faith" and its scholarly commentaries', done: false },
        { title: 'Read about the Prophet\'s prohibitions against polluting water sources and shade areas', done: false },
        { title: 'Research contemporary Islamic scholarship on environmental taharah', done: false },
        { title: 'Write a personal reflection connecting taharah to your environmental responsibilities', done: false },
      ],
    },
    {
      title: 'Reduce household food waste — plan meals, store correctly, and compost unavoidable scraps',
      priority: 'high', tags: ['food-waste', 'planning'],
      description: 'Roughly one-third of food produced globally is wasted. In Islam, food is a ni\'mah (blessing) and wasting it is a form of ingratitude and israf. Proper meal planning, storage, and composting address food waste at every stage.',
      subtasks: [
        { title: 'Plan weekly meals before grocery shopping to buy only what you need', done: false },
        { title: 'Learn proper food storage techniques to extend freshness (fridge zones, airtight containers)', done: false },
        { title: 'Implement a "first in, first out" system in your pantry and fridge', done: false },
        { title: 'Use leftover ingredients creatively — soups, stir-fries, smoothies', done: false },
        { title: 'Compost unavoidable food scraps (peels, cores, coffee grounds)', done: false },
      ],
    },
  ],
  environment_waste_growth: [
    {
      title: 'Eliminate single-use plastics — replace with reusable bags, bottles, containers, and cutlery',
      priority: 'high', tags: ['plastic', 'waste'],
      description: 'Single-use plastics persist in the environment for hundreds of years, harming wildlife and contaminating water. Switching to reusable alternatives is a practical expression of the khalifah principle — leaving the earth better than you found it.',
      subtasks: [
        { title: 'Audit your current single-use plastic consumption (bags, bottles, wraps, cutlery)', done: false },
        { title: 'Purchase durable reusable alternatives for each identified category', done: false },
        { title: 'Keep reusable bags in your car, office bag, and by the front door', done: false },
        { title: 'Carry a reusable water bottle and coffee cup daily', done: false },
        { title: 'Switch food storage from cling wrap to beeswax wraps or silicone lids', done: false },
      ],
    },
    {
      title: 'Start a home composting system for organic kitchen and garden waste',
      priority: 'medium', tags: ['composting', 'waste'],
      description: 'Composting transforms organic waste into nutrient-rich soil, closing the loop between consumption and regeneration. It reduces methane emissions from landfill and produces a valuable resource for gardens — turning waste into provision, a reflection of divine resourcefulness.',
      subtasks: [
        { title: 'Choose a composting method appropriate to your space (bin, tumbler, worm farm, or bokashi)', done: false },
        { title: 'Set up the system in a suitable outdoor or balcony location', done: false },
        { title: 'Learn the correct green-to-brown ratio for healthy composting', done: false },
        { title: 'Keep a small kitchen caddy for daily scraps to transfer to the compost', done: false },
        { title: 'Use finished compost in your garden or share with neighbours', done: false },
      ],
    },
    {
      title: 'Adopt a "buy less, buy better" purchasing philosophy — quality over quantity',
      priority: 'medium', tags: ['consumption', 'mindfulness'],
      description: 'Overconsumption is a root cause of waste. The Islamic principle of iqtisad (moderation in spending) encourages purchasing fewer, higher-quality items that last longer — reducing waste, saving money, and breaking the cycle of disposable culture.',
      subtasks: [
        { title: 'Before any non-essential purchase, apply a 48-hour waiting period to test genuine need', done: false },
        { title: 'Research product durability and repairability before buying', done: false },
        { title: 'Choose items with longer warranties and available spare parts', done: false },
        { title: 'Track your purchases for one month to identify patterns of impulse buying', done: false },
      ],
    },
    {
      title: 'Donate or responsibly rehome unwanted items instead of discarding them',
      priority: 'medium', tags: ['donation', 'circular'],
      description: 'Items you no longer need may still have years of useful life for someone else. Donating clothes, furniture, electronics, and household items extends their lifespan and benefits those in need — combining waste reduction with sadaqah.',
      subtasks: [
        { title: 'Sort through belongings room by room and set aside items in good condition you no longer use', done: false },
        { title: 'Research local charities, op-shops, and community groups that accept donations', done: false },
        { title: 'List higher-value items on free community marketplaces or buy-nothing groups', done: false },
        { title: 'Schedule a regular seasonal declutter to prevent accumulation', done: false },
      ],
    },
  ],
  environment_waste_excellence: [
    {
      title: 'Achieve a near-zero waste household — measure and document monthly waste output',
      priority: 'medium', tags: ['zero-waste', 'measurement'],
      description: 'Near-zero waste means diverting 90%+ of household waste from landfill through reduction, reuse, recycling, and composting. Measuring your actual waste output creates accountability and reveals where the last stubborn waste streams originate.',
      subtasks: [
        { title: 'Weigh your landfill-bound waste weekly for a full month to establish a baseline', done: false },
        { title: 'Categorise remaining waste to identify the largest non-recyclable streams', done: false },
        { title: 'Research alternatives or elimination strategies for each remaining waste category', done: false },
        { title: 'Set a monthly reduction target and track progress over six months', done: false },
        { title: 'Document your journey and share practical tips with your community', done: false },
      ],
    },
    {
      title: 'Advocate for better waste management in your workplace, masjid, or community organisation',
      priority: 'low', tags: ['advocacy', 'community'],
      description: 'Individual household changes are important but limited in scale. Advocating for systemic waste management improvements in organisations you belong to multiplies your impact and models Islamic environmental leadership in communal spaces.',
      subtasks: [
        { title: 'Audit the current waste management practices at your workplace or masjid', done: false },
        { title: 'Prepare a brief proposal with specific, actionable recommendations', done: false },
        { title: 'Present the proposal to management or the masjid committee', done: false },
        { title: 'Volunteer to help implement the changes if approved', done: false },
        { title: 'Track and report results to demonstrate the impact of improvements', done: false },
      ],
    },
    {
      title: 'Launch or join a community clean-up initiative — model Islamic environmental stewardship publicly',
      priority: 'low', tags: ['community', 'dawah'],
      description: 'Organising or joining community clean-ups is both an environmental act and a form of dawah — demonstrating that Islamic values produce people who care for public spaces. It builds bridges with neighbours and makes faith visible through service.',
      subtasks: [
        { title: 'Identify a local park, beach, or public area in need of a clean-up', done: false },
        { title: 'Partner with your masjid, Islamic centre, or local council to organise the event', done: false },
        { title: 'Promote the event through community channels and social media', done: false },
        { title: 'Provide supplies (gloves, bags, hi-vis vests) and coordinate volunteers on the day', done: false },
        { title: 'Document the effort with photos and a summary to inspire repeat events', done: false },
      ],
    },
  ],

  // ── ECOSYSTEM & BIODIVERSITY ──
  environment_ecosystem_core: [
    {
      title: 'Stop all unnecessary destruction of plants, trees, and local wildlife in your surroundings',
      priority: 'urgent', tags: ['biodiversity', 'khilafah'],
      description: 'The Prophet (peace be upon him) prohibited the unnecessary cutting of trees even in warfare. As khalifah (vicegerents) on earth, Muslims have a duty to protect plant and animal life from needless destruction — this is a baseline obligation, not an optional virtue.',
      subtasks: [
        { title: 'Assess your property for any ongoing harm to trees, plants, or animal habitats', done: false },
        { title: 'Stop using herbicides or pesticides that harm beneficial insects and soil life', done: false },
        { title: 'Protect nesting birds, beneficial insects, and small wildlife on your property', done: false },
        { title: 'Educate household members — especially children — about respecting living things', done: false },
      ],
    },
    {
      title: 'Eliminate cruelty to animals — learn Islamic rules on the rights of animals (huquq al-hayawan)',
      priority: 'urgent', tags: ['animals', 'fiqh'],
      description: 'Islam grants animals explicit rights — to be fed, not overburdened, not harmed for sport, and slaughtered mercifully. The Prophet cursed those who brand animals on the face and told of a woman who entered Hell for starving a cat. Animal welfare is a serious obligation.',
      subtasks: [
        { title: 'Study the hadith collections on animal rights (Bukhari, Muslim, Abu Dawud)', done: false },
        { title: 'Ensure any pets or animals in your care are properly fed, sheltered, and treated with kindness', done: false },
        { title: 'Avoid products tested on animals where alternatives exist', done: false },
        { title: 'Report any cases of animal cruelty you witness to appropriate authorities', done: false },
        { title: 'Teach children the Islamic ethic of rahma (mercy) toward all creatures', done: false },
      ],
    },
    {
      title: 'Plant at least one tree or native plant — follow the hadith "even if the Hour is near, plant it"',
      priority: 'high', tags: ['planting', 'sunnah'],
      description: 'The Prophet (peace be upon him) said: "If the Hour comes and one of you has a seedling in his hand, let him plant it." This hadith establishes planting as an act of faith and hope, regardless of whether you will personally benefit from the harvest.',
      subtasks: [
        { title: 'Research native trees and plants suited to your local climate and soil', done: false },
        { title: 'Choose a species that supports local wildlife (birds, pollinators, beneficial insects)', done: false },
        { title: 'Plant the tree or plant in your garden, balcony, or a community space', done: false },
        { title: 'Water and care for it regularly — set a reminder if needed', done: false },
        { title: 'Make du\'a that Allah places barakah in it and lets it benefit creation', done: false },
      ],
    },
    {
      title: 'Learn the Islamic concept of khilafah (vicegerency) — your role as caretaker of the earth',
      priority: 'medium', tags: ['khilafah', 'study'],
      description: 'Allah appointed humanity as khulafa (vicegerents) on earth (Quran 2:30), entrusted with its care — not its exploitation. Understanding khilafah reframes environmental action from optional activism to a core religious duty rooted in the covenant with Allah.',
      subtasks: [
        { title: 'Read and reflect on Quran 2:30, 6:165, and 33:72 on the trust of khilafah', done: false },
        { title: 'Study contemporary Islamic environmental ethics (e.g., Fazlun Khalid, Ibrahim Ozdemir)', done: false },
        { title: 'Reflect on how khilafah applies to your specific context — home, work, community', done: false },
        { title: 'Discuss the concept with family or a study circle to deepen collective understanding', done: false },
      ],
    },
    {
      title: 'Avoid purchasing products made from endangered species or illegal wildlife trade',
      priority: 'high', tags: ['biodiversity', 'ethics'],
      description: 'The illegal wildlife trade drives species toward extinction and violates the Islamic principle that every creature has its own community and purpose (Quran 6:38). Refusing to purchase these products removes demand and protects biodiversity as an act of amanah.',
      subtasks: [
        { title: 'Learn which common products may involve endangered species (ivory, certain woods, exotic skins)', done: false },
        { title: 'Check certifications (FSC for timber, MSC for seafood) when purchasing', done: false },
        { title: 'Avoid souvenirs or decorative items made from coral, shells, or animal parts', done: false },
        { title: 'Report suspicious wildlife trade products if encountered locally or online', done: false },
      ],
    },
  ],
  environment_ecosystem_growth: [
    {
      title: 'Plant native species in your garden, balcony, or community space to support local pollinators',
      priority: 'high', tags: ['planting', 'biodiversity'],
      description: 'Native plants provide the food and habitat that local pollinators — bees, butterflies, and birds — depend on. Exotic ornamentals often offer little ecological value. Choosing native species transforms your garden from a decorative space into a functioning ecosystem.',
      subtasks: [
        { title: 'Research native flowering plants for your region using a local plant database', done: false },
        { title: 'Plan a planting layout that provides year-round blooms for pollinators', done: false },
        { title: 'Source plants from native plant nurseries rather than generic garden centres', done: false },
        { title: 'Include a shallow water source for birds and insects', done: false },
        { title: 'Avoid pesticides and herbicides that harm the pollinators you are trying to attract', done: false },
      ],
    },
    {
      title: 'Reduce or eliminate red meat consumption 2–3 days per week — lower your land and water footprint',
      priority: 'medium', tags: ['diet', 'ecology'],
      description: 'Livestock farming is one of the largest drivers of deforestation, water use, and greenhouse gas emissions. The Prophet (peace be upon him) ate meat sparingly. Reducing red meat consumption honours the Sunnah of moderation while significantly lowering your environmental footprint.',
      subtasks: [
        { title: 'Designate 2-3 days per week as plant-based or poultry/fish-only meal days', done: false },
        { title: 'Learn to cook satisfying plant-based meals from diverse culinary traditions', done: false },
        { title: 'When buying meat, choose pasture-raised, ethical, and halal-tayyib sources', done: false },
        { title: 'Track your meat consumption for a month to see actual reduction', done: false },
      ],
    },
    {
      title: 'Participate in a local tree-planting, park restoration, or rewilding initiative',
      priority: 'medium', tags: ['restoration', 'community'],
      description: 'Joining organised restoration projects multiplies your impact far beyond what individual planting can achieve. These initiatives restore degraded land, sequester carbon, and rebuild ecosystems — and volunteering alongside others builds community bonds rooted in shared stewardship.',
      subtasks: [
        { title: 'Search for local tree-planting events through council, conservation groups, or masjid networks', done: false },
        { title: 'Register and attend at least one event this season', done: false },
        { title: 'Bring family or friends to make it a shared experience', done: false },
        { title: 'Follow up on the site to see how planted trees are progressing', done: false },
        { title: 'Consider committing to a regular volunteer schedule with the organisation', done: false },
      ],
    },
    {
      title: 'Learn about your local ecosystem — identify native species of birds, plants, and insects in your area',
      priority: 'low', tags: ['awareness', 'biodiversity'],
      description: 'You cannot protect what you do not know. Learning to identify the birds, plants, and insects around you builds ecological literacy and deepens your connection to the land you inhabit. The Quran repeatedly draws attention to the signs (ayat) in creation.',
      subtasks: [
        { title: 'Download a local species identification app (e.g., iNaturalist, Merlin, PlantNet)', done: false },
        { title: 'Take a weekly nature walk and identify at least 2-3 new species each time', done: false },
        { title: 'Keep a nature journal noting seasonal changes, migrations, and blooming patterns', done: false },
        { title: 'Visit a local nature reserve or botanical garden for guided learning', done: false },
      ],
    },
  ],
  environment_ecosystem_excellence: [
    {
      title: 'Fund or actively participate in a large-scale land rehabilitation or carbon sequestration project',
      priority: 'medium', tags: ['restoration', 'carbon'],
      description: 'Large-scale land rehabilitation — reforestation, wetland restoration, regenerative agriculture — sequesters significant carbon while rebuilding ecosystems. Contributing financially or physically to these projects extends your khalifah impact beyond your immediate surroundings to landscape-level restoration.',
      subtasks: [
        { title: 'Research verified reforestation and land rehabilitation projects (local and international)', done: false },
        { title: 'Evaluate projects for transparency, impact measurement, and alignment with Islamic values', done: false },
        { title: 'Commit to a recurring financial contribution or in-person volunteer schedule', done: false },
        { title: 'If possible, visit the project site to witness the impact firsthand', done: false },
        { title: 'Share the project with your network to multiply contributions', done: false },
      ],
    },
    {
      title: 'Establish a community food garden or urban farm on underused land',
      priority: 'low', tags: ['food-security', 'community'],
      description: 'Community food gardens transform neglected urban land into productive, biodiverse spaces that provide fresh food, build community, and reconnect people with the earth. The Prophet (peace be upon him) said whoever revives dead land, it belongs to them — this is ihya al-mawat in practice.',
      subtasks: [
        { title: 'Identify underused land — vacant lots, council land, masjid grounds, or school yards', done: false },
        { title: 'Seek permission from the landowner or council and establish a community group', done: false },
        { title: 'Design the garden layout with beds, composting, water access, and communal tools', done: false },
        { title: 'Recruit volunteers and allocate plots or shared responsibilities', done: false },
        { title: 'Host a planting day to launch the garden and celebrate with the community', done: false },
        { title: 'Establish an ongoing maintenance roster and seasonal planting calendar', done: false },
      ],
    },
    {
      title: 'Develop an Islamic environmental education programme for your masjid or school',
      priority: 'low', tags: ['education', 'dawah'],
      description: 'Most Islamic education programmes do not yet integrate environmental stewardship despite its strong Quranic and Prophetic foundations. Creating a structured programme fills this gap, raising a generation that sees caring for the earth as inseparable from their deen.',
      subtasks: [
        { title: 'Compile Quranic verses, hadith, and scholarly references on environmental stewardship', done: false },
        { title: 'Design an age-appropriate curriculum (children, youth, and adults)', done: false },
        { title: 'Include practical components — planting, clean-ups, composting — alongside textual study', done: false },
        { title: 'Pilot the programme with a small group and gather feedback', done: false },
        { title: 'Refine and offer it as a recurring programme at your masjid or school', done: false },
      ],
    },
  ],

  // ── ETHICAL SOURCING & CIRCULARITY ──
  environment_sourcing_core: [
    {
      title: 'Audit your main purchases — identify brands or suppliers tied to environmental exploitation or child labour',
      priority: 'urgent', tags: ['audit', 'ethics'],
      description: 'Every purchase is a vote for the supply chain behind it. Islam prohibits benefiting from dhulm (oppression), and buying from companies that exploit workers or destroy ecosystems makes you complicit. This audit reveals where your money is actually going.',
      subtasks: [
        { title: 'List your top 10-15 regular purchases by category (food, clothing, electronics, household)', done: false },
        { title: 'Research each brand\'s supply chain practices using ethical rating tools (e.g., Good On You, B Corp)', done: false },
        { title: 'Flag any brands linked to environmental destruction, child labour, or forced labour', done: false },
        { title: 'Identify ethical alternatives for the worst offenders', done: false },
        { title: 'Create a personal "do not buy" list and commit to transitioning away', done: false },
      ],
    },
    {
      title: 'Ensure all food purchases meet halal AND tayyib standards — pure in source, not just slaughter method',
      priority: 'urgent', tags: ['halal', 'tayyib'],
      description: 'Halal addresses the permissibility of slaughter, but tayyib addresses the wholesomeness of the entire chain — how the animal was raised, what it was fed, how workers were treated, and how the land was farmed. True Islamic food sourcing demands both dimensions.',
      subtasks: [
        { title: 'Research the farming practices behind your regular halal meat supplier', done: false },
        { title: 'Prioritise free-range, pasture-raised, and antibiotic-free halal meat sources', done: false },
        { title: 'Evaluate fruit and vegetable sources for pesticide use and farming ethics', done: false },
        { title: 'Switch to organic or sustainably farmed options for the "dirty dozen" produce items', done: false },
        { title: 'Visit a local halal farm or supplier to see conditions firsthand if possible', done: false },
      ],
    },
    {
      title: 'Stop buying fast fashion — commit to purchasing only what you need, with longer useful life',
      priority: 'high', tags: ['fashion', 'consumption'],
      description: 'Fast fashion is built on planned obsolescence, exploitative labour, and massive textile waste. The average garment is worn only 7 times before disposal. Committing to buy less and buy better aligns with the Islamic virtues of moderation, contentment (qana\'ah), and avoiding israf.',
      subtasks: [
        { title: 'Audit your wardrobe — identify items rarely worn and donate them responsibly', done: false },
        { title: 'Commit to a 30-day no-new-clothing challenge to reset purchasing habits', done: false },
        { title: 'Before any future clothing purchase, ask: "Do I need this, or do I want this?"', done: false },
        { title: 'Learn basic clothing repair — sewing buttons, hemming, patching', done: false },
      ],
    },
    {
      title: 'Learn the Islamic principle of tayyib (wholesome/pure) as applied to sourcing and consumption',
      priority: 'medium', tags: ['tayyib', 'study'],
      description: 'The Quran commands: "Eat of what is halal and tayyib" (2:168). Tayyib means wholesome, pure, and good — extending beyond ritual permissibility to encompass how things are produced, sourced, and their impact on health and environment. This principle is the Islamic foundation for ethical consumerism.',
      subtasks: [
        { title: 'Study Quran 2:168, 5:88, and 16:114 on the command to consume what is halal and tayyib', done: false },
        { title: 'Read scholarly discussion on the scope of tayyib beyond food (clothing, cosmetics, services)', done: false },
        { title: 'Identify three product categories where you can apply the tayyib standard more rigorously', done: false },
        { title: 'Discuss the tayyib principle with family to build shared awareness', done: false },
      ],
    },
    {
      title: 'Identify and switch to at least three ethical, local, or fair-trade alternatives for everyday purchases',
      priority: 'high', tags: ['fair-trade', 'local'],
      description: 'Switching even a few regular purchases to ethical alternatives sends a market signal and supports businesses that treat workers and the environment justly. Start with three items you buy frequently — coffee, tea, chocolate, cleaning products, or personal care — and scale from there.',
      subtasks: [
        { title: 'Identify three everyday products you buy most frequently', done: false },
        { title: 'Research fair-trade, local, or certified ethical alternatives for each', done: false },
        { title: 'Make the switch and compare quality and cost over one month', done: false },
        { title: 'If satisfied, add two more ethical swaps the following month', done: false },
        { title: 'Share your findings with friends and family to encourage collective switching', done: false },
      ],
    },
  ],
  environment_sourcing_growth: [
    {
      title: 'Shift grocery shopping toward local farmers\' markets, halal organic suppliers, or community-supported agriculture',
      priority: 'high', tags: ['local', 'food'],
      description: 'Buying local reduces transport emissions, supports small-scale farmers, and gives you direct knowledge of how your food is produced. Community-supported agriculture (CSA) models create direct farmer-consumer relationships rooted in mutual benefit and trust — values deeply aligned with Islamic commerce ethics.',
      subtasks: [
        { title: 'Find local farmers\' markets, organic co-ops, or CSA programmes in your area', done: false },
        { title: 'Visit at least two options and compare produce quality, variety, and pricing', done: false },
        { title: 'Commit to purchasing at least 50% of fresh produce from local sources', done: false },
        { title: 'Build relationships with farmers — ask about their growing practices', done: false },
        { title: 'Adjust meal planning to align with seasonal, locally available produce', done: false },
      ],
    },
    {
      title: 'Research and adopt a Shariah-compatible ethical investment screen — exclude harmful industries',
      priority: 'medium', tags: ['investing', 'ethics'],
      description: 'Ethical investment screening ensures your wealth does not fund industries that cause environmental destruction, exploit workers, or violate Islamic prohibitions. Combining Shariah compliance (no riba, gambling, alcohol) with environmental screening (no fossil fuels, deforestation, pollution) creates a comprehensive ethical framework.',
      subtasks: [
        { title: 'Review your current investments and superannuation for exposure to harmful industries', done: false },
        { title: 'Research Shariah-compliant ethical investment funds and platforms', done: false },
        { title: 'Define your personal screening criteria — what industries will you exclude?', done: false },
        { title: 'Transition at least one investment to a screened, ethical alternative', done: false },
        { title: 'Set a reminder to review your investment alignment annually', done: false },
      ],
    },
    {
      title: 'Build a capsule wardrobe — buy fewer, higher-quality, ethically made garments that last',
      priority: 'medium', tags: ['fashion', 'mindfulness'],
      description: 'A capsule wardrobe consists of a small number of versatile, high-quality pieces that mix and match across seasons. This approach reduces textile waste, saves money long-term, and frees mental energy from the cycle of trend-chasing — embodying the Prophetic simplicity in dress.',
      subtasks: [
        { title: 'Define your essential wardrobe categories (work, casual, formal, active, prayer)', done: false },
        { title: 'Select 25-35 core pieces in a cohesive colour palette that work together', done: false },
        { title: 'Donate or sell excess clothing responsibly', done: false },
        { title: 'When replacing items, invest in ethically made, durable garments', done: false },
        { title: 'Maintain the capsule by applying a "one in, one out" rule', done: false },
      ],
    },
    {
      title: 'Prioritise repair over replacement — fix electronics, clothing, and furniture before discarding',
      priority: 'medium', tags: ['repair', 'circular'],
      description: 'The throwaway culture encourages replacing items at the first sign of wear. Repairing extends product life, reduces waste, and saves money. The early Muslims were known for mending their clothing and maintaining their possessions with care — repair is a Sunnah-aligned habit.',
      subtasks: [
        { title: 'Find local repair services — tailors, cobblers, electronics repair shops, furniture restorers', done: false },
        { title: 'Learn basic repair skills: sewing, gluing, tightening, and simple electronics fixes', done: false },
        { title: 'Before discarding any broken item, get a repair quote first', done: false },
        { title: 'Attend a community repair cafe or watch repair tutorials for common fixes', done: false },
      ],
    },
  ],
  environment_sourcing_excellence: [
    {
      title: 'Invest in or co-found a business built on circular economy principles — closed-loop, zero-waste by design',
      priority: 'low', tags: ['circular-economy', 'business'],
      description: 'A circular economy business designs waste out of the system entirely — products are made to be reused, repaired, or recycled back into production. This represents the highest expression of Islamic environmental stewardship applied to commerce: generating halal profit while regenerating rather than depleting the earth.',
      subtasks: [
        { title: 'Study circular economy business models (product-as-service, take-back, remanufacturing)', done: false },
        { title: 'Identify a market gap where a circular model could work in your community', done: false },
        { title: 'Draft a basic business concept with circular principles embedded from day one', done: false },
        { title: 'Connect with existing circular economy networks, incubators, or Islamic finance providers', done: false },
        { title: 'Validate the concept with potential customers before investing capital', done: false },
        { title: 'Ensure the business model passes both Shariah compliance and environmental impact screening', done: false },
      ],
    },
    {
      title: 'Build a community purchasing collective to negotiate with ethical suppliers at scale',
      priority: 'low', tags: ['community', 'impact'],
      description: 'Individual ethical purchasing has limited negotiating power. A community purchasing collective pools buying power to access wholesale pricing from ethical suppliers, making halal-tayyib products affordable for everyone. This is a modern application of the Islamic principle of ta\'awun (mutual cooperation).',
      subtasks: [
        { title: 'Gauge interest among community members, masjid contacts, and neighbours', done: false },
        { title: 'Identify 3-5 ethical suppliers willing to offer bulk pricing (produce, cleaning, personal care)', done: false },
        { title: 'Set up a simple ordering and distribution system (shared spreadsheet, collection point)', done: false },
        { title: 'Run a pilot order with a small group to test logistics', done: false },
        { title: 'Scale gradually, adding more product categories and members over time', done: false },
      ],
    },
    {
      title: 'Publish a sourcing guide for your community — halal, tayyib, and environmentally responsible options',
      priority: 'low', tags: ['dawah', 'legacy'],
      description: 'A community sourcing guide compiles the research you have done into a shareable resource that helps others make ethical purchasing decisions without starting from scratch. This is sadaqah jariyah — ongoing charity through knowledge that continues to benefit others long after publication.',
      subtasks: [
        { title: 'Compile your vetted list of ethical suppliers, brands, and alternatives by category', done: false },
        { title: 'Include brief explanations of why each recommendation meets halal, tayyib, and environmental criteria', done: false },
        { title: 'Format the guide for easy use — digital PDF, website, or printed booklet', done: false },
        { title: 'Share with your masjid, Islamic centre, and community social media channels', done: false },
        { title: 'Commit to updating the guide at least annually as suppliers and options change', done: false },
      ],
    },
  ],
};
