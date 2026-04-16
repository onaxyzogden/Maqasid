// Seed tasks for Life pillar submodules (Hifz al-Nafs).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.

export const LIFE_SEED_TASKS = {
  // ── PHYSICAL HEALTH ──
  life_physical_core: [
    {
      title: 'Audit your diet — eliminate haram and doubtful (mashbuh) consumables',
      priority: 'urgent', tags: ['diet', 'halal'],
      description: 'Conduct a thorough review of everything you consume — food, drink, supplements, and medications — to ensure nothing haram or doubtful enters your body. The Prophet (SAW) said that a body nourished by haram will not enter Jannah; this audit is the foundation of physical tayyib living.',
      subtasks: [
        { title: 'List all regularly consumed foods, drinks, and supplements', done: false,
          description: `**Why does this matter?**

Taking inventory is the essential first step — you cannot purify what you have not examined. The Prophet (SAW) warned that a body nourished by haram will not enter Jannah, making this audit a matter of spiritual and physical well-being.

---

**How do I accomplish this?**

Open your pantry, fridge, and supplement shelf. Write down every item you regularly consume — food, drinks, snacks, vitamins, and medications. Include brand names so you can research their halal certification status in the next step. A simple spreadsheet or notes app works well for this.` },
        { title: 'Research halal certification status of each brand and product', done: false,
          description: `**Why does this matter?**

Not all products labelled "halal" meet rigorous certification standards, and many everyday items contain hidden haram ingredients like gelatin, alcohol-based flavourings, or animal-derived additives. Verifying each product protects your body and your deen.

---

**How do I accomplish this?**

Go through your inventory list one item at a time. Check packaging for recognised halal certification logos (IFANCA, HFA, MUI, etc.). For unlabelled items, search the manufacturer's website or contact them directly. Use apps like Halal Check or ScanHalal to speed up the process. Mark each item as halal, haram, or mashbuh (doubtful).` },
        { title: 'Identify and flag mashbuh (doubtful) items for further investigation', done: false,
          description: `**Why does this matter?**

The Prophet (SAW) said: "Leave that which makes you doubt for that which does not make you doubt." Doubtful items sit in a grey zone that requires deeper investigation — ignoring them risks normalising consumption of what may be haram.

---

**How do I accomplish this?**

Review every item you marked as mashbuh in the previous step. Research the specific doubtful ingredient — is it plant-derived or animal-derived? Contact the manufacturer for clarification. Consult a knowledgeable scholar or halal certification body if the answer remains unclear. Until resolved, treat the item as avoidable.` },
        { title: 'Find halal-certified alternatives for any haram or doubtful items', done: false,
          description: `**Why does this matter?**

Removing haram items without replacing them leads to gaps that tempt you back to old habits. Having a halal-certified alternative ready for every removed item makes the transition sustainable and enjoyable rather than restrictive.

---

**How do I accomplish this?**

For each item flagged as haram or unresolved mashbuh, search for a halal-certified equivalent at your local grocery store or online halal retailers. Read reviews to find options that match your taste preferences. Stock up on the replacements before discarding the originals so there is no gap in your routine.` },
        { title: 'Update your grocery list and meal plan to reflect the audit results', done: false,
          description: `**Why does this matter?**

An audit is only as valuable as the lasting change it produces. Updating your grocery list and meal plan locks in the results of your research so that every future shopping trip automatically reinforces your commitment to tayyib living.

---

**How do I accomplish this?**

Rewrite your standard grocery list, replacing any removed items with their halal alternatives. Adjust your weekly meal plan to incorporate the new ingredients. Save this as your default shopping template — digital lists in a notes app or grocery app make it easy to reuse each week. Review and update quarterly as new products become available.` },
      ],
    },
    {
      title: 'Establish a consistent sleep schedule of 7–8 hours aligned with Fajr',
      priority: 'high', tags: ['sleep', 'sunnah'],
      description: 'Design your sleep rhythm around the Prophetic pattern — early to bed after Isha, rising before Fajr. Consistent sleep is the single most impactful health habit, affecting mood, cognitive function, immune strength, and spiritual energy for ibadah.',
      subtasks: [
        { title: 'Calculate your ideal bedtime based on local Fajr time and 7-8 hour target', done: false,
          description: `**Why does this matter?**

Without a calculated bedtime, sleep becomes reactive rather than intentional. Working backwards from Fajr ensures you wake rested for the most blessed part of the day, rather than dragging through prayer in a fog of sleep deprivation.

---

**How do I accomplish this?**

Look up your local Fajr time (it shifts seasonally). Subtract 7.5 to 8 hours — that is your target bedtime. For example, if Fajr is at 5:30 AM, you should be asleep by 9:30-10:00 PM. Write this bedtime down and set it as a daily alarm on your phone.` },
        { title: 'Set a consistent wind-down alarm 30 minutes before bedtime', done: false,
          description: `**Why does this matter?**

Your body cannot switch from stimulation to sleep instantly. A wind-down buffer signals your nervous system to begin producing melatonin, making it dramatically easier to fall asleep at your target time rather than lying awake.

---

**How do I accomplish this?**

Set a recurring alarm 30 minutes before your calculated bedtime. When it goes off, stop all work and stimulating activity. Use this window for calm activities — wudu, reading Quran, light stretching, or quiet conversation. Consistency is key: keep this alarm even on weekends.` },
        { title: 'Remove screens and blue light from the bedroom after Isha', done: false,
          description: `**Why does this matter?**

Blue light from phones, tablets, and screens suppresses melatonin production by up to 50%, delaying sleep onset and reducing sleep quality. The bedroom should be a sanctuary for rest, not a second office or entertainment centre.

---

**How do I accomplish this?**

After Isha prayer, place your phone on a charger outside the bedroom or across the room. If you use your phone as an alarm, switch to a simple alarm clock instead. Remove or cover any screens in the bedroom. If you must use a device, enable night mode and keep brightness at minimum. Replace screen time with a physical book or dhikr.` },
        { title: 'Practise the Sunnah sleep etiquettes — wudu, right side, sleeping duas', done: false,
          description: `**Why does this matter?**

The Prophet (SAW) had a complete bedtime routine that combines spiritual protection with physical relaxation. Sleeping in wudu, on the right side, and with the prescribed duas turns every night into an act of worship and improves sleep posture.

---

**How do I accomplish this?**

Make wudu before getting into bed. Lie on your right side as the Prophet (SAW) instructed. Recite the sleeping duas — blow into your palms and recite the three Quls, then wipe over your body. Recite Ayat al-Kursi and the dua "Bismika Allahumma amutu wa ahya." Keep a small card with these duas by your bed until they are memorised.` },
        { title: 'Track your sleep consistency for 14 days and adjust as needed', done: false,
          description: `**Why does this matter?**

What gets measured gets managed. Two weeks of data reveals your actual sleep patterns versus your intended ones, exposing the specific nights or habits that disrupt your rhythm so you can address them directly.

---

**How do I accomplish this?**

Use a simple sleep log — note your bedtime, wake time, and how rested you feel (1-10 scale) each morning. A notebook or basic spreadsheet works fine; a sleep tracking app adds detail. After 14 days, review the data: identify your worst nights, look for patterns (late screen use, caffeine, stress), and adjust your routine to address the weakest links.` },
      ],
    },
    {
      title: 'Begin a daily walk after Fajr or Asr (minimum 20 minutes)',
      priority: 'high', tags: ['exercise', 'sunnah'],
      description: 'Walking is the most accessible form of movement and carries immense physical and mental benefit. Scheduling it after Fajr or Asr ties it to an existing anchor, builds consistency, and provides time for reflection, dhikr, or beneficial audio content.',
      subtasks: [
        { title: 'Choose a safe and pleasant walking route near your home or mosque', done: false,
          description: `**Why does this matter?**

A pre-selected route removes the daily decision of "where should I go?" which is one of the top reasons people skip walks. A pleasant environment also makes the habit intrinsically rewarding, increasing the likelihood you will stick with it.

---

**How do I accomplish this?**

Scout 2-3 routes near your home or mosque that are safe, well-lit, and enjoyable. Aim for a loop that takes 20-30 minutes at a comfortable pace. Consider parks, quiet neighbourhood streets, or paths near your masjid. Walk each candidate route once to test it, then pick your favourite as your default. Having a backup route prevents weather or construction from becoming an excuse.` },
        { title: 'Set a daily reminder tied to your Fajr or Asr prayer time', done: false,
          description: `**Why does this matter?**

Habit stacking — attaching a new behaviour to an existing one — is the most reliable way to build consistency. Since you already pray Fajr or Asr daily, anchoring your walk to that prayer creates an automatic trigger that requires no willpower.

---

**How do I accomplish this?**

Set a phone reminder for 5-10 minutes after your chosen prayer time (e.g., "Walk now" at Fajr + 10 min). Lay out your walking shoes and clothes the night before if walking after Fajr. The key is removing friction — when the reminder fires, you should be able to walk out the door within two minutes.` },
        { title: 'Prepare a playlist of Quran recitation, lectures, or dhikr for the walk', done: false,
          description: `**Why does this matter?**

Pairing physical movement with beneficial audio transforms a simple walk into a multi-layered act of self-improvement. Quran recitation nourishes the soul, lectures build knowledge, and dhikr keeps your tongue moist with the remembrance of Allah — all while your body gets the exercise it needs.

---

**How do I accomplish this?**

Download 3-5 episodes of your favourite Islamic lecture series or Quran recitation to your phone for offline access. Organise them into a dedicated "Walk" playlist. Rotate between Quran days and lecture days to keep it fresh. Wireless earbuds make this seamless. Alternatively, some days walk in silence and use the time for personal dua and reflection.` },
        { title: 'Track your daily walks for the first 21 days to build the habit', done: false,
          description: `**Why does this matter?**

Research shows it takes an average of 21-66 days to form a new habit. Tracking creates accountability and a visible streak that motivates you to maintain consistency during the critical early period when the habit is most fragile.

---

**How do I accomplish this?**

Use a simple habit tracker — a checkbox on your calendar, a streak app, or a tally in your journal. Record whether you walked each day, the duration, and a brief note on how you felt. After 21 days, review your streak: if you hit 18+ days, the habit is forming well. If you missed several days, identify the pattern (which days, what interfered) and adjust your schedule accordingly.` },
      ],
    },
    {
      title: 'Book an annual comprehensive health screening',
      priority: 'high', tags: ['health', 'prevention'],
      description: 'The body is an amanah (trust) from Allah. Preventive health screenings catch issues early when they are most treatable. A comprehensive check-up covers blood work, cardiovascular markers, vision, dental health, and age-appropriate screenings.',
      subtasks: [
        { title: 'Research clinics or doctors that offer comprehensive health panels', done: false,
          description: `**Why does this matter?**

Not all clinics offer the same depth of screening. A comprehensive panel covering blood work, cardiovascular markers, metabolic health, and age-appropriate tests gives you a complete picture rather than a superficial snapshot that misses early warning signs.

---

**How do I accomplish this?**

Search for clinics near you that offer "executive health panels" or "comprehensive wellness screenings." Compare what is included — at minimum, look for complete blood count, lipid panel, metabolic panel, thyroid, vitamin D, and HbA1c. Check reviews, insurance coverage, and whether the doctor spends time explaining results. Ask your community for recommendations as well.` },
        { title: 'Schedule the appointment and note any fasting requirements for blood work', done: false,
          description: `**Why does this matter?**

Many blood tests require 8-12 hours of fasting for accurate results. Scheduling without knowing this can lead to wasted appointments, inaccurate readings, and the need to return — costing time and delaying your health insights.

---

**How do I accomplish this?**

Call the clinic and confirm which tests require fasting and for how long. Schedule a morning appointment so the fasting period overlaps with sleep. Mark the appointment on your calendar with a note: "No food or drink (except water) after [time]." If you are already fasting for Sunnah Mondays/Thursdays, consider scheduling the screening on one of those days.` },
        { title: 'Prepare a list of current symptoms, medications, and family health history', done: false,
          description: `**Why does this matter?**

Doctors make better diagnostic decisions when they have complete context. Walking in prepared with your health history prevents the common problem of forgetting to mention something important during the brief appointment window.

---

**How do I accomplish this?**

Create a one-page document listing: (1) any current symptoms or concerns, no matter how minor, (2) all medications, supplements, and vitamins you take with dosages, (3) family health history — conditions in parents, siblings, and grandparents such as diabetes, heart disease, cancer, or hypertension. Bring a printed copy or have it on your phone to hand to the doctor.` },
        { title: 'Attend the screening and obtain a copy of all results', done: false,
          description: `**Why does this matter?**

Having your own copy of results empowers you to track changes over time, seek second opinions, and take ownership of your health data. Relying solely on the doctor to hold your records leaves you passive in your own healthcare.

---

**How do I accomplish this?**

Attend the appointment on time with your prepared health summary. Ask the clinic if results will be available through an online patient portal or if you need to request a printed copy. Ensure you receive the full lab report with reference ranges, not just a verbal summary. Save a digital copy in a dedicated "Health Records" folder you can reference annually.` },
        { title: 'Review results with the doctor and create an action plan for any flagged areas', done: false,
          description: `**Why does this matter?**

Raw lab numbers are meaningless without interpretation. A doctor can explain what is normal, what is borderline, and what requires immediate action — turning data into a concrete plan that actually improves your health outcomes.

---

**How do I accomplish this?**

Schedule a follow-up consultation (in-person or phone) to review the results with your doctor. Prepare questions for any values outside the normal range. Ask: "What lifestyle changes would improve this?" and "When should I retest?" Write down the action items during the appointment. For any flagged areas, create specific tasks with deadlines — for example, "Retest vitamin D in 3 months after supplementation."` },
      ],
    },
    {
      title: 'Identify and remove harmful substances — tobacco, alcohol, processed foods',
      priority: 'urgent', tags: ['diet', 'tayyib'],
      description: 'Allah commands us to consume what is tayyib (pure and wholesome) and forbids what harms. Tobacco, alcohol, and heavily processed foods damage the body and dull the mind. Removing them is both a health imperative and an act of obedience.',
      subtasks: [
        { title: 'Honestly inventory all harmful substances you currently consume', done: false,
          description: `**Why does this matter?**

Honesty with yourself is the prerequisite for change. Many people underestimate how much harm they consume because they avoid looking closely. A frank inventory — without judgement — gives you a clear baseline to work from.

---

**How do I accomplish this?**

Sit down privately and list every substance you consume that you know is harmful or suspect might be. Include tobacco, vaping, alcohol, energy drinks, excessive caffeine, heavily processed snacks, fast food frequency, and any recreational substances. Note how often you consume each one (daily, weekly, occasionally). Be honest — this list is for you, not for anyone else.` },
        { title: 'Set a firm quit date for any addictive substances (tobacco, vaping, etc.)', done: false,
          description: `**Why does this matter?**

A quit date transforms a vague intention into a commitment. Research shows that people who set a specific date are significantly more likely to follow through than those who say "someday." It also gives you time to prepare mentally and practically.

---

**How do I accomplish this?**

Choose a date within the next 2-4 weeks — close enough to maintain urgency but far enough to prepare. Write it down and tell at least one person. Mark it on your calendar. Use the days before to gradually reduce intake if possible, research cessation methods, and remove triggers from your environment. Make dua for strength and renew your intention that this is an act of obedience to Allah.` },
        { title: 'Identify processed foods in your pantry and find whole-food replacements', done: false,
          description: `**Why does this matter?**

Ultra-processed foods are engineered to be addictive, containing excessive sugar, seed oils, and artificial additives that cause inflammation, weight gain, and chronic disease. Replacing them with whole foods is one of the highest-impact health changes you can make.

---

**How do I accomplish this?**

Go through your pantry and fridge. Any item with more than 5 ingredients or ingredients you cannot pronounce is likely ultra-processed. Common culprits: sugary cereals, packaged snacks, instant noodles, soft drinks, and ready meals. For each one, find a whole-food alternative — for example, replace packaged granola bars with dates and nuts, replace soft drinks with water infused with fruit. Make the swap gradual if needed, one category per week.` },
        { title: 'Seek support — accountability partner, counsellor, or cessation programme', done: false,
          description: `**Why does this matter?**

Overcoming harmful habits alone is significantly harder than with support. The Prophet (SAW) emphasised the importance of good companionship, and an accountability partner or professional can provide the encouragement, structure, and expertise you need during difficult moments.

---

**How do I accomplish this?**

Choose at least one form of support: (1) an accountability partner — a trusted friend or family member you check in with weekly, (2) a professional counsellor or therapist experienced in habit change or addiction, or (3) a structured programme like a smoking cessation clinic. For Islamic-specific support, look for Muslim counsellors or community programmes. Be upfront about your goals and ask them to check on your progress regularly.` },
        { title: 'Remove harmful items from your home environment entirely', done: false,
          description: `**Why does this matter?**

Willpower is a finite resource, but environment design is permanent. If harmful items are physically present in your home, you will eventually consume them during a moment of weakness. Removing them eliminates the option entirely.

---

**How do I accomplish this?**

Go through your home — kitchen, bedroom, car, desk, and any hidden stashes. Collect every harmful item you committed to eliminating: cigarettes, vaping devices, alcohol, junk food, and anything else on your inventory. Dispose of them completely — do not "save them for guests" or hide them "just in case." Inform household members of your decision and ask for their support in keeping the home free of these items.` },
      ],
    },
  ],
  life_physical_growth: [
    {
      title: 'Establish 3×/week strength or resistance training routine',
      priority: 'high', tags: ['exercise', 'fitness'],
      description: 'The strong believer is better and more beloved to Allah than the weak believer. Strength training preserves muscle mass, strengthens bones, boosts metabolism, and builds the physical resilience needed to serve your family, community, and deen actively.',
      subtasks: [
        { title: 'Choose a programme suited to your level (bodyweight, gym, or home equipment)', done: false,
          description: `**Why does this matter?**

Starting with a programme matched to your current fitness level prevents injury and builds confidence. A programme too advanced leads to burnout; one too easy yields no results. The right starting point ensures sustainable progress.

---

**How do I accomplish this?**

Honestly assess your current level: Can you do 10 push-ups? Have you trained before? Based on your answer, choose one path: (1) Complete beginner — start with a bodyweight programme, (2) Some experience — a basic gym programme like StrongLifts 5x5 or GZCLP, (3) Home equipment — a dumbbell or resistance band programme. Pick one and commit for at least 8 weeks before switching.` },
        { title: 'Schedule three specific days and times per week for training', done: false,
          description: `**Why does this matter?**

Vague intentions like "I will train this week" almost never materialise. Specific, time-blocked sessions treat training as a non-negotiable appointment — the same way you would never skip a prayer time.

---

**How do I accomplish this?**

Open your weekly calendar and identify three days with at least a 60-minute window. Common splits: Monday/Wednesday/Friday or Saturday/Tuesday/Thursday. Block these times as recurring appointments. Choose times that do not conflict with prayer, work, or family obligations. Lay out your training clothes the night before and treat the session as immovable.` },
        { title: 'Learn proper form for foundational movements (squat, push, pull, hinge)', done: false,
          description: `**Why does this matter?**

Proper form prevents injury and ensures the target muscles are actually doing the work. Training with poor form builds bad patterns that become harder to correct over time and can lead to chronic joint or back problems.

---

**How do I accomplish this?**

Focus on four foundational patterns: squat (goblet squat or bodyweight squat), push (push-up or bench press), pull (row or pull-up), and hinge (deadlift or hip hinge). Watch 2-3 reputable tutorial videos for each movement. Film yourself performing the movement and compare to the tutorials. If possible, book one session with a qualified trainer for in-person feedback on your form.` },
        { title: 'Track workouts and progressive overload in a training log', done: false,
          description: `**Why does this matter?**

Progressive overload — gradually increasing weight, reps, or sets — is the fundamental driver of strength gains. Without tracking, you cannot ensure you are actually progressing rather than repeating the same effort week after week.

---

**How do I accomplish this?**

Use a simple training log — a notebook, spreadsheet, or app like Strong or JEFIT. For every session, record the exercise, sets, reps, and weight used. Each week, aim to add a small increment — 1-2 extra reps, or 1-2 kg more weight. Review your log weekly to confirm you are progressing. If a lift stalls for more than two weeks, adjust your approach.` },
        { title: 'Evaluate progress and adjust the programme every 4-6 weeks', done: false,
          description: `**Why does this matter?**

Your body adapts to training stimuli over time. What challenged you in week one becomes routine by week six. Regular evaluation ensures you continue making progress rather than plateauing, and catches any exercises causing discomfort.

---

**How do I accomplish this?**

Every 4-6 weeks, review your training log and ask: Am I still progressing on key lifts? Am I recovering well between sessions? Do I have any persistent aches? Based on your answers, make targeted adjustments — swap a stale exercise, increase training volume slightly, or add a deload week if fatigued. Small, intentional tweaks are more effective than a completely new programme.` },
      ],
    },
    {
      title: 'Track daily water intake (target 2–3 litres)',
      priority: 'medium', tags: ['hydration', 'health'],
      description: 'Proper hydration is essential for cognitive function, digestion, joint health, and energy levels. The Prophet (SAW) advised drinking in three sips and not breathing into the vessel. Building a hydration habit supports every other health goal.',
      subtasks: [
        { title: 'Get a reusable water bottle with volume markings', done: false,
          description: `**Why does this matter?**

You cannot manage what you cannot measure. A bottle with volume markings gives you instant visual feedback on how much you have consumed, removing the guesswork that leads most people to chronically under-hydrate.

---

**How do I accomplish this?**

Purchase a 1-litre reusable water bottle with clear volume markings on the side. Stainless steel or BPA-free plastic both work well. Aim to finish the bottle 2-3 times per day. Keep it visible on your desk or counter as a constant reminder. If you prefer, add time markers to the bottle with tape to pace your intake throughout the day.` },
        { title: 'Set hydration reminders at key intervals throughout the day', done: false,
          description: `**Why does this matter?**

Thirst is a lagging indicator — by the time you feel thirsty, you are already mildly dehydrated. Regular reminders ensure you drink proactively and consistently rather than playing catch-up in the evening.

---

**How do I accomplish this?**

Set phone reminders at natural anchor points: after Fajr, mid-morning, after Dhuhr, mid-afternoon, and after Maghrib. Each reminder is a cue to drink a full glass (250ml). Alternatively, use a hydration app that sends periodic notifications. After two weeks, the habit typically becomes automatic and you can reduce the reminders.` },
        { title: 'Track daily intake using a simple app or tally method for two weeks', done: false,
          description: `**Why does this matter?**

Two weeks of tracking reveals your actual hydration pattern — most people discover they drink far less than they assumed. The data also shows which times of day you consistently miss, allowing you to target those gaps specifically.

---

**How do I accomplish this?**

Choose a tracking method: a tally on a sticky note (one mark per glass), a free hydration app, or a simple note in your phone. Record every glass or bottle you finish throughout the day. At the end of two weeks, calculate your daily average. If it is below 2 litres, identify the low-intake periods and add a reminder or routine to address them.` },
        { title: 'Adjust intake based on activity level, climate, and fasting days', done: false,
          description: `**Why does this matter?**

A flat 2-litre target ignores the reality that your body needs more water on hot days, training days, and when you are breaking a fast. Adjusting intake to your actual circumstances prevents both dehydration and the false confidence of hitting a static number.

---

**How do I accomplish this?**

On training days, add 500ml-1L extra around your workout. In hot weather, increase your baseline by 500ml. On fasting days, front-load hydration at suhoor and rehydrate generously at iftar — aim for 1.5L between iftar and sleep. Monitor your urine colour as a simple gauge: pale yellow means well-hydrated, dark yellow means you need more.` },
      ],
    },
    {
      title: 'Explore the Sunnah of intermittent fasting (Monday/Thursday) as a health practice',
      priority: 'medium', tags: ['fasting', 'sunnah'],
      description: 'Fasting on Mondays and Thursdays is a confirmed Sunnah with extraordinary health benefits — improved insulin sensitivity, cellular repair (autophagy), mental clarity, and weight management. It combines spiritual reward with measurable physical benefit.',
      subtasks: [
        { title: 'Research the health science behind intermittent fasting and autophagy', done: false,
          description: `**Why does this matter?**

Understanding the science strengthens your motivation and helps you optimise your fasting practice. When you know that autophagy (cellular cleanup) peaks during extended fasts and that insulin sensitivity improves measurably, fasting shifts from pure willpower to informed strategy.

---

**How do I accomplish this?**

Read or watch 2-3 reputable sources on intermittent fasting science. Focus on understanding: what happens to your body at 12, 16, and 24 hours of fasting, how autophagy works, and the metabolic benefits of regular fasting cycles. Take notes on the key benefits to revisit when motivation dips.` },
        { title: 'Start with one day per week (Monday or Thursday) and build up', done: false,
          description: `**Why does this matter?**

Jumping straight to two fasting days per week often leads to burnout, especially if you are not accustomed to fasting outside Ramadan. Starting with one day builds your tolerance gradually and lets you work out the practical logistics before doubling the commitment.

---

**How do I accomplish this?**

Pick either Monday or Thursday — whichever fits your schedule better. Make the niyyah (intention) the night before. For your first few fasts, keep your schedule light and avoid intense training. Eat a balanced suhoor with protein, healthy fats, and complex carbs to sustain you. After 4 consistent weeks of one day, you are ready to add the second day.` },
        { title: 'Plan suhoor and iftar meals that are nutritionally balanced', done: false,
          description: `**Why does this matter?**

Poor meal choices at suhoor and iftar can negate the health benefits of fasting. A sugary suhoor causes an energy crash by mid-morning, while an iftar of fried foods and sweets spikes blood sugar and leaves you sluggish. Strategic nutrition amplifies every benefit of the fast.

---

**How do I accomplish this?**

For suhoor: include slow-digesting protein (eggs, Greek yoghurt), complex carbs (oats, whole grain bread), healthy fats (avocado, nuts), and plenty of water. For iftar: break with dates and water as per the Sunnah, then eat a balanced meal with protein, vegetables, and whole grains. Prepare these meals in advance so you are not making poor choices when hungry.` },
        { title: 'Track energy levels, mood, and focus on fasting vs. non-fasting days', done: false,
          description: `**Why does this matter?**

Subjective tracking reveals how fasting actually affects your daily performance. Many people discover that their focus and energy are better on fasting days once adapted — data that reinforces the habit and helps you schedule demanding work strategically.

---

**How do I accomplish this?**

Create a simple daily log with three ratings (1-10): energy, mood, and focus. Fill it in at the same time each day — mid-afternoon works well. After 4 weeks, compare your fasting-day averages to your non-fasting-day averages. Look for patterns: do you crash in the afternoon on fasting days? Is your morning focus sharper? Use these insights to adjust meal timing and activity scheduling.` },
        { title: 'Gradually add the second day once the first is consistent', done: false,
          description: `**Why does this matter?**

Adding the second fasting day completes the Sunnah practice and doubles the health benefits. Doing so only after the first day is established ensures the habit is sustainable rather than a burst of enthusiasm that fades within weeks.

---

**How do I accomplish this?**

Once you have fasted consistently on your chosen day for at least 4 weeks with manageable energy levels, add the second day (Monday if you started with Thursday, or vice versa). Keep your suhoor and iftar templates the same. Monitor your energy and recovery — if two days feels too demanding initially, alternate weeks (both days one week, one day the next) until your body fully adapts.` },
      ],
    },
    {
      title: 'Prepare a home emergency medical kit (first aid, medications, contacts)',
      priority: 'medium', tags: ['safety', 'preparation'],
      description: 'Being prepared for medical emergencies is part of responsible stewardship over your household. A well-stocked, accessible first aid kit can prevent minor injuries from becoming serious and buy critical time in emergencies.',
      subtasks: [
        { title: 'Purchase a comprehensive first aid kit or assemble one from a checklist', done: false,
          description: `**Why does this matter?**

In a medical emergency, every second counts. Having a pre-stocked kit means you are not scrambling to find bandages or antiseptic while someone is bleeding. A comprehensive kit covers the most common household injuries and stabilises situations until professional help arrives.

---

**How do I accomplish this?**

Either purchase a pre-assembled first aid kit rated for household use (available at pharmacies and online) or assemble one using a Red Cross checklist. At minimum, include: adhesive bandages, sterile gauze, medical tape, antiseptic wipes, antibiotic ointment, scissors, tweezers, disposable gloves, a thermometer, and an instant cold pack. Store everything in a clearly labelled, waterproof container.` },
        { title: 'Add household-specific medications (prescriptions, allergy meds, pain relief)', done: false,
          description: `**Why does this matter?**

A generic first aid kit does not account for your family's specific needs. If someone in your household has allergies, asthma, diabetes, or takes daily prescriptions, having those medications accessible in an emergency could be life-saving.

---

**How do I accomplish this?**

Review the medical needs of every household member. Add a backup supply of critical prescriptions (with doctor approval), antihistamines for allergic reactions, an EpiPen if prescribed, pain relievers (paracetamol, ibuprofen), anti-diarrhoeal medication, and any other household-specific needs. Label each medication clearly with the name, dosage, and expiration date.` },
        { title: 'Include an emergency contacts card (doctor, hospital, poison control, family)', done: false,
          description: `**Why does this matter?**

In a crisis, stress impairs memory. Even phone numbers you know by heart can vanish under pressure. A physical emergency contacts card inside the kit ensures anyone — including babysitters, guests, or older children — can quickly reach the right people.

---

**How do I accomplish this?**

Write or print a card with: your family doctor's phone number, the nearest hospital emergency department, poison control hotline, local ambulance number, and 2-3 emergency family contacts. Laminate it if possible for durability. Place one copy inside the first aid kit and tape another to the inside of a kitchen cabinet. Update it whenever a number changes.` },
        { title: 'Store the kit in an accessible, known location and inform all household members', done: false,
          description: `**Why does this matter?**

A first aid kit hidden in a closet nobody can find is useless in an emergency. Accessibility and awareness are just as important as the contents — every household member should be able to locate and open the kit within 30 seconds.

---

**How do I accomplish this?**

Choose a central, accessible location — a kitchen cabinet, hallway closet, or bathroom shelf at an easy-to-reach height. Avoid locations that are locked, high up, or in a room that is frequently occupied. Walk every household member to the kit and show them where it is and what is inside. For children, teach them how to find it and call for help.` },
        { title: 'Set a 6-month reminder to check expiration dates and restock supplies', done: false,
          description: `**Why does this matter?**

Medications expire, bandages degrade, and supplies get used without being replaced. A kit that has not been checked in years may fail you when it matters most. Regular maintenance keeps the kit reliable and ready.

---

**How do I accomplish this?**

Set a recurring calendar reminder every six months — a good anchor is the start of Ramadan and six months after. When the reminder fires, open the kit and check every item: discard expired medications and replace them, restock any used bandages or supplies, and verify the emergency contacts card is current. The entire check takes less than 15 minutes.` },
      ],
    },
  ],
  life_physical_excellence: [
    {
      title: 'Implement a nutrient-timing protocol (pre/post workout, suhoor/iftar optimisation)',
      priority: 'medium', tags: ['nutrition', 'performance'],
      description: 'Nutrient timing optimises when you eat specific macronutrients to maximise energy, recovery, and body composition. For Muslims, this also means strategically planning suhoor and iftar nutrition during Ramadan and voluntary fasts for sustained performance.',
      subtasks: [
        { title: 'Learn the basics of macronutrient timing (protein, carbs, fats) around training', done: false,
          description: `**Why does this matter?**

Eating the right macronutrient at the right time can significantly improve workout performance and recovery. Carbohydrates before training fuel intensity; protein after training accelerates muscle repair. Without this knowledge, your nutrition may be working against your training efforts.

---

**How do I accomplish this?**

Study the three key windows: (1) Pre-workout (1-2 hours before) — focus on easily digestible carbs and moderate protein, (2) Post-workout (within 1 hour after) — prioritise protein with some carbs for recovery, (3) General meals — balanced macros spread throughout the day. Read 2-3 articles from reputable sports nutrition sources to understand the principles before designing your own templates.` },
        { title: 'Design a pre-workout and post-workout meal template', done: false,
          description: `**Why does this matter?**

Having a meal template eliminates daily decision-making about what to eat around training. When the template is dialled in, you show up to every workout properly fuelled and recover optimally afterward — consistency that compounds into visible results over months.

---

**How do I accomplish this?**

Create two simple templates. Pre-workout (1-2 hours before): pick 2-3 go-to meals — for example, oats with banana and honey, or rice with chicken. Post-workout (within 60 minutes): pick 2-3 protein-rich options — for example, a protein shake with fruit, or eggs with toast. Write these on a card and keep it on your fridge. Rotate between options to prevent boredom while maintaining nutritional consistency.` },
        { title: 'Create an optimised suhoor meal plan for fasting days (slow-digesting, hydrating)', done: false,
          description: `**Why does this matter?**

Suhoor is your fuel tank for the entire fasting day. A poorly planned suhoor — or skipping it entirely — leads to energy crashes, poor focus, and unnecessary suffering. The Prophet (SAW) emphasised the barakah of suhoor, and optimising it honours both the spiritual and physical dimensions of fasting.

---

**How do I accomplish this?**

Design 3-4 rotating suhoor meals built around slow-digesting foods: complex carbs (oats, whole grain bread), protein (eggs, Greek yoghurt, cheese), healthy fats (avocado, nuts, olive oil), and hydrating foods (cucumber, watermelon). Drink at least 500ml of water at suhoor. Avoid high-sugar and high-salt foods that spike thirst. Prep ingredients the night before so suhoor takes under 10 minutes.` },
        { title: 'Create an optimised iftar meal plan (quick energy, then balanced nutrition)', done: false,
          description: `**Why does this matter?**

The way you break your fast determines how quickly your body recovers and how well you perform for Maghrib and Isha prayers. Overeating heavy, fried food at iftar causes sluggishness, bloating, and defeats the health benefits of the fast.

---

**How do I accomplish this?**

Follow the Sunnah two-phase approach: Phase 1 — break with dates and water to restore blood sugar gently. Phase 2 — after Maghrib prayer, eat a balanced meal with protein, vegetables, and complex carbs. Design 5-7 rotating iftar menus to cover the week. Keep portions moderate — you can eat again before bed if needed. Prep meals in advance to avoid the temptation of ordering takeaway when hungry.` },
        { title: 'Test and refine the protocol over 30 days, tracking energy and recovery', done: false,
          description: `**Why does this matter?**

Nutrition science provides general principles, but your body is unique. A 30-day test period reveals what actually works for you — which meal timing gives you peak energy, which foods sit well before training, and how your recovery responds to post-workout nutrition changes.

---

**How do I accomplish this?**

Follow your nutrient-timing templates consistently for 30 days. Each day, rate your workout energy (1-10), recovery quality (1-10), and any digestive comfort issues. At day 15 and day 30, review your data and make adjustments: swap foods that cause discomfort, shift meal timing if energy dips at certain points, and fine-tune portion sizes. The goal is a personalised protocol you can sustain long-term.` },
      ],
    },
    {
      title: 'Learn and practise an active Sunnah sport (swimming, archery, or horse riding)',
      priority: 'low', tags: ['sunnah', 'fitness'],
      description: 'Umar (RA) said: "Teach your children swimming, archery, and horse riding." These sports build confidence, discipline, and physical capability. Pursuing them honours the Sunnah and develops skills that connect you to a tradition of strength and readiness.',
      subtasks: [
        { title: 'Research local facilities or clubs offering swimming, archery, or horse riding', done: false,
          description: `**Why does this matter?**

Knowing what is available locally turns an aspiration into a concrete plan. Many people assume these sports are inaccessible, but most cities have swimming pools, archery ranges, and equestrian centres within reasonable distance — you just need to find them.

---

**How do I accomplish this?**

Search online for swimming pools, archery clubs, and horse riding stables within 30 minutes of your home. Check community centres, university facilities, and parks departments — they often offer affordable options. Read reviews, compare prices, and note beginner-friendly options. If Muslim-specific facilities exist (women-only swimming sessions, for example), prioritise those.` },
        { title: 'Enrol in a beginner course or find an experienced instructor', done: false,
          description: `**Why does this matter?**

Proper instruction from the start prevents bad habits, reduces injury risk, and accelerates your learning curve dramatically. Self-teaching swimming, archery, or horse riding is not only slower but potentially dangerous.

---

**How do I accomplish this?**

Contact the facility you identified and ask about beginner courses — most offer structured multi-week programmes. If group classes are unavailable, book private lessons with a certified instructor. For swimming, look for adult beginner classes if you are not yet confident in water. Commit to at least 8 sessions before evaluating whether to continue or switch to a different sport.` },
        { title: 'Commit to a regular practice schedule (weekly minimum)', done: false,
          description: `**Why does this matter?**

Skill development requires consistent repetition. Practising once a month yields almost no improvement, while weekly sessions create a compounding learning curve. A fixed schedule also signals to yourself and your family that this is a priority, not a hobby you will drop.

---

**How do I accomplish this?**

Block one specific day and time per week for your chosen sport — treat it like an appointment you cannot cancel. If possible, find a training partner for mutual accountability. Start with one session per week; add a second session once the first is firmly established. Keep your gear ready to go so logistics never become an excuse to skip.` },
        { title: 'Set a 90-day proficiency goal for your chosen sport', done: false,
          description: `**Why does this matter?**

A specific proficiency goal gives your practice direction and a measurable finish line. Without it, you risk drifting through sessions without clear progress, which erodes motivation over time.

---

**How do I accomplish this?**

Define a concrete, testable goal for 90 days out. For swimming: "Swim 500 metres continuously without stopping." For archery: "Consistently hit the target ring at 18 metres." For horse riding: "Confidently walk, trot, and canter independently." Write your goal down, share it with your instructor, and review progress monthly. Adjust if needed at the 45-day mark.` },
        { title: 'Consider involving family members to make it a shared Sunnah practice', done: false,
          description: `**Why does this matter?**

The hadith about teaching children swimming, archery, and horse riding is fundamentally about family development. Practising together builds bonds, creates shared memories, and fulfils the Prophetic instruction to raise physically capable, confident children.

---

**How do I accomplish this?**

Invite your spouse or children to join you for a session. Many facilities offer family packages or parent-child classes. Start with the most accessible option — a family swim session is easier to arrange than horse riding for young children. If family members are hesitant, let them watch you first, then invite them to try. Even if they choose a different sport, the culture of physical activity in your household grows.` },
      ],
    },
    {
      title: 'Develop a peak-performance body composition target and 90-day plan',
      priority: 'low', tags: ['fitness', 'planning'],
      description: 'Moving beyond basic health to peak physical performance is a form of ihsan (excellence) in stewardship of the body. Setting a clear body composition target with a structured plan brings intentionality and measurement to your physical development.',
      subtasks: [
        { title: 'Measure current body composition (weight, body fat %, key measurements)', done: false,
          description: `**Why does this matter?**

You need a precise starting point to set a realistic target and track meaningful progress. Scale weight alone is misleading — two people at the same weight can look completely different based on muscle-to-fat ratio. Body composition measurement gives you the full picture.

---

**How do I accomplish this?**

Weigh yourself first thing in the morning after using the bathroom. Measure body fat percentage using a skinfold caliper, bioimpedance scale, or DEXA scan (most accurate). Take key body measurements with a tape measure: chest, waist, hips, arms, and thighs. Record everything in a spreadsheet or journal. Take front, side, and back photos in consistent lighting — these are often more telling than numbers.` },
        { title: 'Set a realistic 90-day target based on your goals and starting point', done: false,
          description: `**Why does this matter?**

Unrealistic targets lead to extreme measures (crash diets, overtraining) that are unsustainable and often harmful. A realistic target based on your actual starting point keeps you motivated with achievable milestones while protecting your health.

---

**How do I accomplish this?**

Use evidence-based benchmarks: healthy fat loss is 0.5-1 kg per week; muscle gain for beginners is roughly 1-2 kg per month. Based on your starting measurements and goal (fat loss, muscle gain, or recomposition), calculate what is achievable in 90 days. Write your target as a specific number: "Reach 18% body fat" or "Add 3 kg of lean mass." Share the target with your training partner or coach for accountability.` },
        { title: 'Design or select a training programme aligned with the target', done: false,
          description: `**Why does this matter?**

Different body composition goals require different training approaches. A fat-loss goal benefits from a combination of resistance training and moderate cardio, while a muscle-gain goal prioritises progressive overload with adequate volume. Mismatching your programme to your goal wastes time and effort.

---

**How do I accomplish this?**

If your goal is fat loss: choose a 3-4 day resistance programme with 2 days of moderate cardio (walking, cycling). If your goal is muscle gain: choose a 4-day upper/lower or push/pull/legs split focused on compound lifts with progressive overload. Search for reputable programmes online or consult a certified trainer. Ensure the programme fits your schedule and equipment access.` },
        { title: 'Create a nutrition plan with caloric and macronutrient targets', done: false,
          description: `**Why does this matter?**

Training without a nutrition plan is like building without blueprints. Your caloric balance determines whether you gain or lose weight, and your macronutrient split determines what that weight is made of — muscle or fat. Precision here accelerates results dramatically.

---

**How do I accomplish this?**

Calculate your Total Daily Energy Expenditure (TDEE) using an online calculator. For fat loss, subtract 300-500 calories; for muscle gain, add 200-300 calories. Set macros: protein at 1.6-2.2g per kg of bodyweight, fats at 0.8-1g per kg, and fill remaining calories with carbs. Plan your meals around these targets using a food tracking app for the first 2-3 weeks until you can estimate portions intuitively.` },
        { title: 'Schedule bi-weekly progress check-ins with measurements and photos', done: false,
          description: `**Why does this matter?**

Body composition changes happen gradually and are hard to notice in the mirror day-to-day. Bi-weekly measurements and photos create objective data points that reveal trends your eyes might miss, keeping you motivated and informed.

---

**How do I accomplish this?**

Set a recurring bi-weekly reminder (every other Sunday morning works well). Each check-in: weigh yourself under the same conditions, retake body measurements, and take comparison photos in the same lighting and clothing. Log everything alongside your previous entries. Look for trends over 4+ weeks rather than reacting to any single data point — fluctuations are normal.` },
        { title: 'Review and adjust the plan at the 45-day midpoint', done: false,
          description: `**Why does this matter?**

The 45-day mark is the natural inflection point of a 90-day plan. By this point, you have enough data to see whether your approach is working, stalling, or needs correction. Adjusting at the midpoint prevents wasting the second half of the plan on a strategy that is not delivering results.

---

**How do I accomplish this?**

At day 45, review all your data: compare your current measurements and photos to your starting point and your target. Ask: Am I on track to hit my 90-day goal? If yes, continue with the current plan. If progress has stalled: increase training volume slightly, tighten nutrition adherence, or adjust caloric targets by 100-200 calories. If you are ahead of schedule, consider whether to maintain the pace or set a more ambitious target.` },
      ],
    },
  ],

  // ── MENTAL WELL-BEING ──
  life_mental_core: [
    {
      title: 'Establish a morning routine: Fajr → Quran (minimum 1 page) → morning adhkar → journal',
      priority: 'urgent', tags: ['routine', 'adhkar'],
      description: 'How you start your morning determines the quality of your entire day. This Prophetic morning sequence — prayer, Quran, remembrance of Allah, and self-reflection — anchors your mind in purpose and protects against anxiety and aimlessness.',
      subtasks: [
        { title: 'Write out the exact sequence and estimated time for each element', done: false,
          description: `**Why does this matter?**

Without a written plan, your morning routine stays vague and easy to skip. Mapping the exact sequence and time for each element turns an aspiration into a concrete commitment your mind can follow on autopilot.

---

**How do I accomplish this?**

List each element in order: Fajr salah, Quran reading, morning adhkar, journaling. Estimate realistic minutes for each (e.g., Fajr 10 min, Quran 10 min, adhkar 5 min, journal 5 min). Write the total and your target wake-up time. Post it where you will see it every morning.` },
        { title: 'Prepare your Quran and journal in a designated morning spot the night before', done: false,
          description: `**Why does this matter?**

Friction kills habits. If you have to search for your Quran or journal half-asleep after Fajr, you are far more likely to skip the routine. Preparing the night before removes every barrier between you and your morning worship.

---

**How do I accomplish this?**

Choose a specific spot in your home — a prayer corner, desk, or reading chair. Each night before bed, place your Quran open to where you left off, your journal with a pen, and your adhkar card or phone (on airplane mode). Make this nightly preparation part of your evening wind-down.` },
        { title: 'Memorise or print the morning adhkar (Hisn al-Muslim or equivalent)', done: false,
          description: `**Why does this matter?**

The morning adhkar are a spiritual shield prescribed by the Prophet (SAW). Having them memorised or readily available ensures you never skip them due to not knowing the words or not having a reference handy.

---

**How do I accomplish this?**

Get a copy of Hisn al-Muslim (Fortress of the Muslim) in print or use a reliable app. Start with the 5-7 most essential morning supplications. Read them daily from the text for two weeks, then begin reciting from memory. Test yourself weekly until all core adhkar are memorised.` },
        { title: 'Start with a minimal version (5-10 min total) and expand gradually', done: false,
          description: `**Why does this matter?**

Attempting a 45-minute morning routine from day one almost guarantees burnout. Starting small builds the neural pathway of consistency first — once the habit is locked in, expanding it becomes natural rather than forced.

---

**How do I accomplish this?**

Begin with the absolute minimum: pray Fajr, read half a page of Quran, say 3 adhkar, write 1 sentence in your journal. Do this for 7-10 days. Once it feels automatic, add one more element or extend the time slightly. Increase by no more than 5 minutes per week.` },
        { title: 'Track completion daily for 30 days to solidify the habit', done: false,
          description: `**Why does this matter?**

What gets tracked gets done. A visible streak of completed mornings creates positive momentum and makes you reluctant to break the chain. Research shows habits become automatic after consistent repetition over several weeks.

---

**How do I accomplish this?**

Use a simple habit tracker — a printed calendar on the wall, a checklist in your journal, or an app like Habitica or Streaks. Each morning, mark whether you completed the routine. Review your tracker weekly. If you miss a day, never miss two in a row.` },
      ],
    },
    {
      title: 'Identify sources of haram media (music, content) and set firm boundaries',
      priority: 'high', tags: ['media', 'protection'],
      description: 'The eyes, ears, and heart are all accountable before Allah. Haram media — whether explicit content, idle entertainment that wastes time, or music that hardens the heart — erodes spiritual sensitivity and mental clarity. Setting boundaries is an act of self-preservation.',
      subtasks: [
        { title: 'Audit your subscriptions, apps, and social media follows for harmful content', done: false,
          description: `**Why does this matter?**

You cannot set boundaries on what you have not identified. An honest audit reveals how much haram or wasteful media has quietly accumulated in your digital life — subscriptions you forgot, accounts that add no value, and apps designed to steal your time.

---

**How do I accomplish this?**

Set aside 30 minutes. Go through every app on your phone, every subscription service, and every social media follow list. For each one, ask: does this bring me closer to Allah, benefit my dunya, or waste my time? Make a list of everything that needs to go.` },
        { title: 'Unsubscribe, unfollow, or delete sources of haram or time-wasting media', done: false,
          description: `**Why does this matter?**

Identification without action is just awareness. The real protection comes from removing the sources entirely. Every haram or time-wasting account you unfollow is a door of fitna you close for yourself and your household.

---

**How do I accomplish this?**

Work through your audit list systematically. Unsubscribe from streaming services you do not need. Unfollow social media accounts that post haram or idle content. Delete apps that are pure time-wasters. Do it in one focused session so you do not lose momentum.` },
        { title: 'Replace haram entertainment with beneficial alternatives (podcasts, lectures, nasheeds)', done: false,
          description: `**Why does this matter?**

Simply removing entertainment creates a vacuum that your nafs will rush to fill. Replacing haram with halal alternatives satisfies the human need for relaxation and stimulation while actually nourishing your iman and intellect.

---

**How do I accomplish this?**

Subscribe to 3-5 Islamic podcasts or lecture series that genuinely interest you. Download a nasheed playlist for commutes. Bookmark beneficial YouTube channels. Keep a book or audiobook ready for downtime. The key is having the alternative already prepared before the craving hits.` },
        { title: 'Install content filters or screen time controls on your devices', done: false,
          description: `**Why does this matter?**

Willpower alone is unreliable — the tech industry spends billions engineering addiction. Content filters and screen time controls add a structural barrier between you and harmful content, protecting you in moments of weakness when your resolve is low.

---

**How do I accomplish this?**

Enable built-in parental controls or screen time settings on your phone and computer. Install a DNS-level content filter like CleanBrowsing or OpenDNS on your home network. Set daily app time limits for social media. Use browser extensions that block distracting sites during work hours.` },
        { title: 'Establish a household media policy if you have children or dependents', done: false,
          description: `**Why does this matter?**

Children absorb media without the filters of adult judgement. A clear household media policy protects your family from harmful content and teaches children to be intentional consumers of media — a skill that will serve them for life.

---

**How do I accomplish this?**

Sit down with your spouse and agree on clear rules: what devices are allowed, where screens can be used, what content is off-limits, and how much screen time per day. Write it down. Discuss it with your children in age-appropriate terms. Review and update the policy every 6 months.` },
      ],
    },
    {
      title: 'Practise daily dhikr for anxiety — recite Ayat al-Kursi, last two ayat of Al-Baqarah',
      priority: 'high', tags: ['dhikr', 'mental-health'],
      description: 'Allah says: "Verily, in the remembrance of Allah do hearts find rest" (13:28). Specific adhkar have been prescribed by the Prophet (SAW) for protection and tranquillity. Making these a non-negotiable daily practice builds a spiritual shield against anxiety and intrusive thoughts.',
      subtasks: [
        { title: 'Memorise Ayat al-Kursi (2:255) if not already memorised', done: false,
          description: `**Why does this matter?**

Ayat al-Kursi is the greatest ayah in the Quran. The Prophet (SAW) taught that whoever recites it after every obligatory prayer will be under Allah's protection. Memorising it ensures you can recite it anywhere, anytime — in moments of anxiety, before sleep, and after every salah.

---

**How do I accomplish this?**

If you do not already know it, break it into 3-4 segments. Learn one segment per day by reading it 10 times, then reciting from memory 10 times. By the end of the week, connect all segments. Recite it after every fardh prayer for reinforcement.` },
        { title: 'Memorise the last two ayat of Surah Al-Baqarah (2:285-286)', done: false,
          description: `**Why does this matter?**

The Prophet (SAW) said that whoever recites the last two ayat of Surah Al-Baqarah at night, they will suffice him — meaning they provide protection and spiritual sufficiency. These verses are a powerful nightly shield against anxiety and harm.

---

**How do I accomplish this?**

These two verses are moderate in length. Break each verse into two halves. Learn one half per day using the same method: read 10 times, recite from memory 10 times. Within 4-5 days you should have both memorised. Recite them every night before sleep to lock them in.` },
        { title: 'Recite both after every fardh salah as a consistent practice', done: false,
          description: `**Why does this matter?**

Sporadic dhikr provides sporadic benefit. Making these recitations a non-negotiable part of every obligatory prayer embeds them into the rhythm of your day, creating five daily anchors of spiritual protection and mental tranquillity.

---

**How do I accomplish this?**

After each fardh prayer, before you get up from your place, recite Ayat al-Kursi followed by the last two ayat of Al-Baqarah. Pair this with your existing post-salah adhkar (tasbeeh, tahmeed, takbeer). It adds less than two minutes but creates a powerful protective habit.` },
        { title: 'Add evening adhkar including the three Quls and Ayat al-Kursi before sleep', done: false,
          description: `**Why does this matter?**

The evening adhkar are the complement to the morning shield. The Prophet (SAW) would recite the three Quls into his hands and wipe over his body before sleep. Combined with Ayat al-Kursi, this practice creates a complete spiritual protection for the night — reducing nighttime anxiety and disturbed sleep.

---

**How do I accomplish this?**

Set a reminder 10 minutes before your bedtime. Sit in bed and recite: Ayat al-Kursi, Surah Al-Ikhlas, Surah Al-Falaq, and Surah An-Nas (the three Quls three times each, blowing into your hands and wiping over your body as the Sunnah teaches). Add any other evening adhkar you know.` },
        { title: 'Notice and journal any changes in anxiety levels over 21 days', done: false,
          description: `**Why does this matter?**

Tracking the impact of your dhikr practice turns faith into lived experience. When you can look back and see a measurable reduction in anxiety correlated with consistent remembrance of Allah, it deepens your conviction and motivates you to continue.

---

**How do I accomplish this?**

Each evening, rate your anxiety on a simple 1-10 scale in your journal. Note whether you completed your dhikr that day. After 21 days, review the pattern. Most people notice a clear correlation between consistent dhikr and lower anxiety scores. Share your findings with someone you trust for accountability.` },
      ],
    },
    {
      title: 'Limit social media use to defined time windows — set screen-time limits',
      priority: 'high', tags: ['digital-detox', 'focus'],
      description: 'Uncontrolled social media use fragments attention, feeds comparison, and steals hours that could be spent in worship, learning, or meaningful connection. Setting firm time windows turns a passive habit into a controlled, intentional tool.',
      subtasks: [
        { title: 'Check your current daily screen time and identify the worst offending apps', done: false,
          description: `**Why does this matter?**

You cannot fix what you have not measured. Most people drastically underestimate their screen time. Seeing the actual numbers — often 4-6 hours daily on social media alone — creates the shock of awareness needed to motivate real change.

---

**How do I accomplish this?**

Open your phone's screen time or digital wellbeing settings right now. Look at your daily average and which apps consume the most time. Write down the top 3 offenders and their daily averages. This data becomes your baseline for measuring improvement.` },
        { title: 'Define two specific time windows per day for social media (e.g., 12-12:30, 8-8:30)', done: false,
          description: `**Why does this matter?**

Open-ended access to social media means it bleeds into every idle moment — eroding focus, fragmenting attention, and stealing time from worship and productive work. Defined time windows transform social media from a compulsion into a controlled, intentional activity.

---

**How do I accomplish this?**

Choose two 30-minute windows that do not conflict with prayer times or deep work. Write them down (e.g., 12:00-12:30 PM and 8:00-8:30 PM). Outside these windows, social media is off-limits. Set phone reminders for the start and end of each window. Commit to this for 14 days before adjusting.` },
        { title: 'Enable built-in screen time limits on your phone and computer', done: false,
          description: `**Why does this matter?**

Relying on willpower alone to resist apps engineered for addiction is a losing strategy. Screen time limits create a structural barrier — when the app locks you out, the decision is made for you, protecting you from your own weakness in moments of temptation.

---

**How do I accomplish this?**

On iPhone, go to Settings > Screen Time > App Limits. On Android, use Digital Wellbeing > App Timers. Set daily limits for each social media app (e.g., 30 minutes each). On your computer, use a browser extension like LeechBlock or Cold Turkey to block social sites during work hours.` },
        { title: 'Move social media apps off your home screen or into a folder', done: false,
          description: `**Why does this matter?**

Visual cues trigger habits. When social media icons sit on your home screen, every phone unlock is an invitation to scroll. Moving them out of sight adds a small but powerful friction that breaks the automatic reach-and-tap pattern.

---

**How do I accomplish this?**

Move all social media apps into a folder on your second or third home screen page. Better yet, delete the apps entirely and only access social media through the browser — the worse experience acts as a natural deterrent. Replace home screen slots with beneficial apps: Quran, adhkar, or a habit tracker.` },
        { title: 'Replace idle scrolling moments with dhikr, reading, or a beneficial app', done: false,
          description: `**Why does this matter?**

The moments you used to fill with scrolling — waiting in line, sitting in the car, before bed — are actually precious pockets of time. Filling them with dhikr or reading transforms dead time into spiritual and intellectual growth, compounding over months into significant personal development.

---

**How do I accomplish this?**

Identify your top 3 idle scrolling triggers (e.g., waiting for food, riding the elevator, lying in bed). For each trigger, assign a replacement: tasbeeh beads in your pocket, a book on your phone, or a specific dhikr phrase. Practice the replacement for one trigger at a time until it becomes automatic.` },
      ],
    },
    {
      title: 'Seek Islamic counselling or therapy if experiencing persistent anxiety or depression',
      priority: 'medium', tags: ['mental-health', 'help'],
      description: 'Seeking help is a sign of strength, not weakness. The Prophet (SAW) said: "Make use of medical treatment, for Allah has not made a disease without a remedy." Islamic counselling integrates psychological science with spiritual healing for holistic care.',
      subtasks: [
        { title: 'Honestly assess whether you are experiencing persistent low mood, anxiety, or emotional distress', done: false,
          description: `**Why does this matter?**

Many Muslims push through emotional suffering silently, mistaking it for sabr or assuming that more ibadah alone will fix it. Honest self-assessment is the first step — you cannot seek a cure for what you refuse to diagnose. Persistent distress lasting more than two weeks deserves professional attention.

---

**How do I accomplish this?**

Set aside 15 quiet minutes. Ask yourself: Have I felt persistently sad, anxious, or hopeless for more than two weeks? Has my sleep, appetite, or concentration changed significantly? Am I withdrawing from people or activities I used to enjoy? If yes to two or more, this is a signal to seek professional support.` },
        { title: 'Research Muslim therapists or Islamic counselling services in your area or online', done: false,
          description: `**Why does this matter?**

A therapist who understands your faith can integrate Islamic principles into the healing process — they will not dismiss your spiritual life or suggest solutions that conflict with your values. Finding the right fit makes the difference between therapy that feels foreign and therapy that feels like home.

---

**How do I accomplish this?**

Search directories like Khalil Center, Noor Human Consulting, or the Muslim Mental Health directory. Ask your local imam or community for referrals. Check if your insurance covers Muslim therapists. If in-person options are limited, online platforms offer Muslim therapists worldwide. Shortlist 2-3 options.` },
        { title: 'Schedule an initial consultation or intake session', done: false,
          description: `**Why does this matter?**

The hardest step is the first one. Scheduling the appointment turns intention into action. Many therapists offer a free 15-minute consultation call — this low-commitment first step lets you gauge fit without a full commitment.

---

**How do I accomplish this?**

Pick your top choice from your shortlist and call or email to schedule. Most practices have online booking. Request an initial consultation or intake session. If the first therapist is not available soon, book with your second choice — do not let a waitlist become an excuse to delay.` },
        { title: 'Discuss your spiritual practices as part of the therapeutic conversation', done: false,
          description: `**Why does this matter?**

Your relationship with Allah, your prayer life, and your spiritual struggles are not separate from your mental health — they are deeply intertwined. A therapist who knows about your spiritual practices can offer more holistic and effective guidance than one working with only half the picture.

---

**How do I accomplish this?**

In your first session, mention that your Islamic faith is central to your life and that you want it integrated into therapy. Share your daily spiritual practices (salah, Quran, dhikr). Be honest about spiritual struggles too — doubts, guilt, or feeling disconnected from Allah are important therapeutic material.` },
        { title: 'Commit to at least 4-6 sessions before evaluating whether to continue', done: false,
          description: `**Why does this matter?**

Therapy is not a one-session fix. The first 1-2 sessions are primarily assessment and rapport-building. Real therapeutic work begins around session 3-4. Quitting too early means you never experience the actual benefits, reinforcing the false belief that therapy does not work.

---

**How do I accomplish this?**

Make a commitment to yourself: attend at least 6 sessions before making any judgement about effectiveness. Schedule them in advance (weekly or bi-weekly). After session 6, evaluate honestly: do you feel heard, are you gaining insight, is your distress reducing? If not, switch therapists rather than abandoning therapy entirely.` },
      ],
    },
  ],
  life_mental_growth: [
    {
      title: 'Start a daily muhasaba (self-accounting) journal — 5 minutes before sleep',
      priority: 'high', tags: ['muhasaba', 'reflection'],
      description: 'Umar (RA) said: "Take account of yourselves before you are taken to account." Muhasaba is the practice of reviewing your day — what you did well, where you fell short, and what you intend for tomorrow. Five minutes of honest self-reflection accelerates personal growth dramatically.',
      subtasks: [
        { title: 'Get a dedicated journal or notebook for nightly muhasaba', done: false,
          description: `**Why does this matter?**

A dedicated journal signals to your mind that muhasaba is a serious, sacred practice — not an afterthought scribbled on random paper. Having a single place for all your reflections also allows you to review patterns over time, which is where the deepest insights emerge.

---

**How do I accomplish this?**

Choose a simple notebook that feels pleasant to write in — nothing fancy that makes you afraid to use it. Keep it with a pen on your nightstand or beside your bed. Label the first page with your start date and the intention: "Muhasaba — taking account of my soul before Allah takes account of me." ` },
        { title: 'Create a simple template: 3 blessings, 1 shortcoming, 1 intention for tomorrow', done: false,
          description: `**Why does this matter?**

A template removes the paralysis of the blank page. By structuring your reflection around gratitude (3 blessings), humility (1 shortcoming), and intention (1goal for tomorrow), you cover the essential elements of muhasaba without overthinking or turning it into a chore.

---

**How do I accomplish this?**

Write this template on the inside cover of your journal: (1) Three blessings I noticed today — things to thank Allah for, (2) One area where I fell short — missed salah, harsh words, wasted time, (3) One intention for tomorrow — something specific I will do better. Each entry should take no more than 5 minutes.` },
        { title: 'Set a recurring alarm 15 minutes before your target bedtime', done: false,
          description: `**Why does this matter?**

Without a trigger, muhasaba will be forgotten in the rush of nightly routines. An alarm 15 minutes before bed creates a consistent cue that says "it is time to reflect" — giving you enough runway to write before sleep pulls you under.

---

**How do I accomplish this?**

Set a daily recurring alarm on your phone for 15 minutes before your target bedtime. Label it "Muhasaba time." When it goes off, stop whatever you are doing, pick up your journal, and write. Treat this alarm with the same seriousness as your Fajr alarm.` },
        { title: 'Write consistently for 21 days without judging the quality of entries', done: false,
          description: `**Why does this matter?**

Perfectionism kills journaling habits faster than laziness does. If you judge every entry ("this is shallow," "I wrote the same thing yesterday"), you will dread the practice and eventually quit. The goal for the first 21 days is consistency, not quality — quality comes naturally once the habit is established.

---

**How do I accomplish this?**

Write something every night for 21 days straight, even if it is one sentence. Do not reread old entries during this period. Do not compare yourself to anyone. If you miss a night, write the next night without guilt. Mark each completed day on a calendar to visualize your streak.` },
        { title: 'Review weekly patterns to identify recurring strengths and weaknesses', done: false,
          description: `**Why does this matter?**

Individual entries reveal daily fluctuations, but weekly review reveals patterns — the recurring sins you keep falling into, the blessings you keep overlooking, and the areas where you are actually growing. Pattern recognition is where muhasaba transforms from diary-keeping into genuine self-knowledge.

---

**How do I accomplish this?**

Every Friday (or another consistent day), read through your past week of entries. Note: Which blessings appear repeatedly? Which shortcomings keep returning? Are your intentions translating into action? Write a brief weekly summary highlighting one pattern to address and one strength to build on.` },
      ],
    },
    {
      title: 'Designate one day per week as a digital-free unplugged day',
      priority: 'medium', tags: ['digital-detox', 'rest'],
      description: 'The mind needs genuine rest — not just sleep, but freedom from the constant stimulation of screens and notifications. An unplugged day restores mental clarity, deepens family bonds, and creates space for worship, nature, and unhurried thought.',
      subtasks: [
        { title: 'Choose a consistent day of the week for your digital detox', done: false,
          description: `**Why does this matter?**

Consistency makes the unplugged day a ritual rather than a random experiment. When the same day is always screen-free, your mind and family begin to anticipate and prepare for it, and the benefits compound week over week.

---

**How do I accomplish this?**

Pick a day that works with your schedule — many people choose Saturday or Sunday. Consider choosing Friday to align with Jummah and family time. Avoid choosing a workday if your job requires digital communication. Commit to the same day every week for at least one month before reassessing.` },
        { title: 'Inform key contacts and set an auto-reply for that day', done: false,
          description: `**Why does this matter?**

Fear of missing something urgent is the number one reason people break their digital detox. Informing key contacts in advance and setting an auto-reply eliminates this anxiety — you know that anyone who truly needs you can reach you through a phone call.

---

**How do I accomplish this?**

Tell your family, close friends, and work colleagues which day you will be offline. Set an auto-reply on email and messaging apps: "I am offline today for a weekly digital detox. For urgent matters, please call me directly." This sets expectations and frees you from the compulsion to check.` },
        { title: 'Plan alternative activities: reading, family time, nature walks, mosque visits', done: false,
          description: `**Why does this matter?**

An unplugged day without a plan quickly becomes a boring day — and boredom drives you straight back to your phone. Planning enjoyable, meaningful activities in advance ensures the day feels like a gift rather than a deprivation.

---

**How do I accomplish this?**

The night before your unplugged day, write a loose plan: morning Quran and breakfast with family, a nature walk or park visit, an afternoon reading session, visiting the mosque for a prayer, cooking a meal together. You do not need to schedule every hour — just have enough options that you never feel idle and tempted.` },
        { title: 'Put devices in a drawer or designated storage for the full day', done: false,
          description: `**Why does this matter?**

Out of sight, out of mind. If your phone is on the kitchen counter, you will pick it up reflexively dozens of times. Physically storing devices in a drawer creates a real barrier between you and the screen, making the detox dramatically easier to maintain.

---

**How do I accomplish this?**

Choose a drawer, box, or cabinet as your "device parking spot." The night before, charge all devices and place them there. In the morning, leave them. If you need a phone for emergency calls, put it on Do Not Disturb in another room — accessible but not convenient. Resist the urge to "just check one thing." ` },
        { title: 'Journal your experience after the first three unplugged days to notice the impact', done: false,
          description: `**Why does this matter?**

Without reflection, the benefits of an unplugged day fade into vague feelings. Journaling your experience creates a record you can revisit when motivation dips — concrete evidence that disconnecting makes you calmer, more present, and more connected to what matters.

---

**How do I accomplish this?**

After each of your first three unplugged days, write a short journal entry answering: How did I feel during the day? What did I notice about my attention and mood? What did I do with the extra time? What was hardest? After three entries, compare them — most people notice significant positive shifts by the third week.` },
      ],
    },
    {
      title: 'Study and practise Sunnah grounding techniques: wudu for anger, salah for stress, istighfar for guilt',
      priority: 'medium', tags: ['sunnah', 'mental-health'],
      description: 'The Prophet (SAW) prescribed specific spiritual actions for specific emotional states — wudu to cool anger, prayer to find relief in distress, and istighfar to release guilt. These are divinely guided coping mechanisms that address both the spiritual and psychological root of difficult emotions.',
      subtasks: [
        { title: 'Study the hadith sources for each technique (anger→wudu, distress→salah, guilt→istighfar)', done: false,
          description: `**Why does this matter?**

Knowing the Prophetic source behind each technique transforms it from a generic coping strategy into an act of worship. When you understand that the Prophet (SAW) specifically prescribed wudu for anger, you approach the sink not just to calm down but to follow a Sunnah — and that intention multiplies the benefit.

---

**How do I accomplish this?**

Look up the relevant hadith for each technique: the hadith about wudu extinguishing anger (Abu Dawud), the Prophet (SAW) turning to prayer when distressed, and the virtues of istighfar for relieving worry (Ahmad). Write each hadith on a card or in your phone for quick reference.` },
        { title: 'Create a personal cue card: "When I feel X, I will do Y"', done: false,
          description: `**Why does this matter?**

In the heat of a strong emotion, your rational mind goes offline. A pre-written cue card bypasses the need to think — you have already decided what to do when anger, stress, or guilt strikes. This is the essence of emotional preparedness in Islam: planning your response before the test arrives.

---

**How do I accomplish this?**

Write three simple if-then statements: "When I feel anger rising, I will make wudu." "When I feel overwhelmed or stressed, I will pray two rakaat." "When I feel guilt or shame, I will say istighfar 100 times." Keep this card in your wallet, on your desk, or as your phone lock screen.` },
        { title: 'Practise immediately the next time you experience anger, stress, or guilt', done: false,
          description: `**Why does this matter?**

Knowledge without practice is like medicine that stays in the bottle. The first time you actually get up and make wudu when angry — or pray when stressed — you experience firsthand the power of these Prophetic prescriptions. That lived experience is what transforms theory into lifelong habit.

---

**How do I accomplish this?**

Commit right now: the very next time you feel a strong negative emotion, you will use the corresponding technique. Do not wait for a "big" moment — practice with mild irritation or minor stress first. The more you practice in small moments, the more automatic it becomes for the big ones.` },
        { title: 'Reflect on effectiveness in your muhasaba journal after each use', done: false,
          description: `**Why does this matter?**

Documenting when you used a Sunnah grounding technique and how it affected you creates a personal evidence base. Over time, you will see clear patterns proving that these divinely guided methods actually work — strengthening both your practice and your iman.

---

**How do I accomplish this?**

After each time you use wudu for anger, salah for stress, or istighfar for guilt, note it in your muhasaba journal that evening. Record: what triggered the emotion, which technique you used, and how you felt afterward. Review these entries monthly to see your emotional growth.` },
      ],
    },
    {
      title: 'Read one book on Islamic psychology or tazkiyah al-nafs per month',
      priority: 'medium', tags: ['study', 'tazkiyah'],
      description: 'Islamic tradition has a rich body of knowledge on the purification of the soul and the diseases of the heart. Reading works by scholars like Imam al-Ghazali, Ibn al-Qayyim, and contemporary Muslim psychologists deepens self-understanding and provides tools for genuine inner transformation.',
      subtasks: [
        { title: 'Build a reading list — start with Ihya Ulum al-Din (abridged), Purification of the Heart, or Reclaim Your Heart', done: false,
          description: `**Why does this matter?**

Without a curated reading list, you either never start or waste time on low-quality material. These three books represent different entry points into Islamic psychology — classical scholarship (Ghazali), poetic wisdom (Hamza Yusuf), and contemporary reflection (Yasmin Mogahed) — ensuring you find a voice that resonates with you.

---

**How do I accomplish this?**

Order or download at least two of these books today. If you prefer classical depth, start with Ihya Ulum al-Din (use an abridged English translation). If you prefer accessible modern writing, start with Reclaim Your Heart. Add 2-3 more titles recommended by scholars or friends you trust. Keep the list in your journal or phone.` },
        { title: 'Schedule 20-30 minutes of daily reading time', done: false,
          description: `**Why does this matter?**

Reading about tazkiyah in scattered, random moments means you never build momentum or depth. A scheduled daily window — even just 20 minutes — ensures consistent progress. One book per month at this pace equals twelve transformative works in a year.

---

**How do I accomplish this?**

Choose a time that naturally fits your routine — after Fajr, during lunch, or before bed. Block it on your calendar and treat it as an appointment with your soul. Keep your current book in your designated reading spot. Set a phone timer for 20 minutes so you do not have to watch the clock.` },
        { title: 'Take notes on key concepts and how they apply to your own nafs', done: false,
          description: `**Why does this matter?**

Passive reading entertains the mind but does not transform it. Writing notes forces you to process what you read, connect it to your own life, and identify which diseases of the heart or patterns of the nafs apply to you specifically. This active engagement is where real tazkiyah begins.

---

**How do I accomplish this?**

Keep a small notebook or digital note file dedicated to your tazkiyah reading. After each session, write: one key concept from today's reading, how it applies to my own nafs, and one action I can take based on this insight. Review your notes before starting each new reading session.` },
        { title: 'Discuss insights with a friend, spouse, or study circle for deeper understanding', done: false,
          description: `**Why does this matter?**

The companions of the Prophet (SAW) learned in community, not isolation. Discussing what you read with someone you trust deepens your understanding, reveals blind spots in your interpretation, and creates mutual accountability for applying what you learn.

---

**How do I accomplish this?**

Invite one or two people to read the same book as you, or simply share interesting insights over a weekly coffee or phone call. If you have a study circle or halaqa, propose discussing a tazkiyah book together. Even sharing one insight per week with your spouse over dinner counts as meaningful discussion.` },
        { title: 'Apply at least one practical lesson from each book to your daily life', done: false,
          description: `**Why does this matter?**

Knowledge of Islamic psychology without application is hujjah (evidence) against you, not for you. The scholars of tazkiyah wrote their works to be lived, not merely admired. Applying even one lesson per book means you are actively purifying your nafs rather than just studying purification.

---

**How do I accomplish this?**

At the end of each book, review your notes and choose the single most impactful lesson. Write it as a concrete commitment: "For the next 30 days, I will..." (e.g., "check my intention before every action," "respond to anger with silence for 10 seconds," "make istighfar before complaining"). Track your adherence daily.` },
      ],
    },
  ],
  life_mental_excellence: [
    {
      title: 'Begin a cognitive training programme — Quran memorisation or language learning',
      priority: 'medium', tags: ['memorisation', 'cognitive'],
      description: 'The brain, like any muscle, grows stronger with consistent challenge. Quran memorisation is the pinnacle of cognitive training for a Muslim — it strengthens memory, builds discipline, and earns immense reward. Language learning (Arabic especially) opens doors to understanding the deen directly.',
      subtasks: [
        { title: 'Choose your track: Quran memorisation (hifz) or Arabic/language learning', done: false,
          description: `**Why does this matter?**

Trying to do everything at once diffuses your energy and leads to abandoning both. Choosing one track — hifz or language — allows you to channel your full cognitive effort into deep, sustained practice. You can always add the second track later once the first is established.

---

**How do I accomplish this?**

Ask yourself: what would benefit me more right now? If you already read Arabic but want a deeper connection to the Quran, choose hifz. If you cannot understand Arabic at all, learning the language first may be more foundational. Make your choice, commit for at least 6 months, and do not second-guess it.` },
        { title: 'Find a qualified teacher, programme, or structured app', done: false,
          description: `**Why does this matter?**

Self-teaching Quran memorisation or Arabic is possible but dramatically slower and more error-prone than guided learning. A qualified teacher corrects your tajweed, holds you accountable, and adapts the pace to your ability — all of which accelerate progress and prevent bad habits from forming.

---

**How do I accomplish this?**

For hifz: ask your local mosque about memorisation circles, or search for online hifz programmes with one-on-one recitation sessions. For Arabic: consider structured programmes like Bayyinah TV, Arabic With Husna, or a local institute. Prioritise programmes that include regular assessment and teacher feedback.` },
        { title: 'Set a daily practice window of 20-30 minutes minimum', done: false,
          description: `**Why does this matter?**

Cognitive training requires daily repetition to build neural pathways. Sporadic practice — memorising on Monday, skipping until Thursday — means you spend most of your time re-learning what you forgot. A daily window of at least 20 minutes ensures forward momentum and retention.

---

**How do I accomplish this?**

Choose a time when your mind is freshest — for most people, this is after Fajr or in the early morning. Block 20-30 minutes on your daily schedule. Start your session the same way each time (e.g., recite what you know, then learn new material, then review). Protect this time as non-negotiable.` },
        { title: 'Establish a review system to retain what you have already learned', done: false,
          description: `**Why does this matter?**

Memorisation without review is like filling a bucket with holes. The brain naturally forgets over time, and Quran or language knowledge is no exception. A structured review system ensures that what you learned last month is still solid while you continue learning new material.

---

**How do I accomplish this?**

Use a spaced repetition approach: review today's new material tomorrow, then again in 3 days, then weekly, then monthly. For hifz, recite previously memorised portions daily in your prayers. For language, use flashcard apps like Anki with spaced repetition built in. Dedicate at least half your practice time to review, not just new material.` },
        { title: 'Set monthly milestones (e.g., 1 page/week for hifz, 1 lesson/day for language)', done: false,
          description: `**Why does this matter?**

Without milestones, long-term goals feel abstract and motivation fades. Monthly targets break an enormous goal (memorising the entire Quran, becoming fluent in Arabic) into measurable checkpoints that give you regular wins and early warning if you are falling behind.

---

**How do I accomplish this?**

Set a realistic monthly target based on your current pace. For hifz: 1 page per week means roughly 4 pages per month — at that pace, a full juz every 5-6 months. For language: completing one lesson per day in your programme. Write your milestones in your journal and review progress on the 1st of each month. Adjust targets based on actual performance, not wishful thinking.` },
      ],
    },
    {
      title: 'Engage a mentor, coach, or therapist for deep personal development',
      priority: 'medium', tags: ['mentorship', 'growth'],
      description: 'Every great companion had a mentor. Working with someone who can see your blind spots, challenge your assumptions, and hold you accountable accelerates growth in ways self-study alone cannot. This could be a shaykh, a professional coach, or a therapist depending on your needs.',
      subtasks: [
        { title: 'Identify what you most need right now: spiritual guidance, life coaching, or therapeutic support', done: false,
          description: `**Why does this matter?**

A shaykh, a coach, and a therapist serve different functions. Seeking spiritual guidance for a clinical issue, or therapy for a strategic career question, means you get the wrong type of help. Clarity about your actual need ensures you invest time and money in the right kind of support.

---

**How do I accomplish this?**

Reflect honestly: Are you struggling with iman, connection to Allah, or understanding your deen? You need a shaykh or spiritual mentor. Are you stuck on life direction, career, or productivity? You need a coach. Are you dealing with trauma, anxiety, depression, or emotional pain? You need a therapist. It is also okay to need more than one.` },
        { title: 'Research and shortlist 3-5 potential mentors, coaches, or therapists', done: false,
          description: `**Why does this matter?**

The quality of the mentoring relationship depends heavily on fit — credentials, personality, communication style, and shared values all matter. Shortlisting multiple options gives you the ability to compare and choose wisely rather than committing to the first name you find.

---

**How do I accomplish this?**

Ask trusted community members, imams, or friends for recommendations. Search professional directories for Muslim coaches or therapists. Check credentials, read reviews or testimonials, and look for someone whose approach resonates with you. Narrow your list to 3-5 strong candidates.` },
        { title: 'Reach out and schedule an introductory conversation with your top choice', done: false,
          description: `**Why does this matter?**

Research without action is procrastination in disguise. The introductory conversation is low-risk — most mentors and therapists offer a brief initial call to assess fit. Taking this step moves you from thinking about growth to actually investing in it.

---

**How do I accomplish this?**

Send an email or make a call to your top choice today. Briefly introduce yourself, explain what you are looking for, and ask for a 15-20 minute introductory conversation. If they are unavailable or the fit does not feel right, move to the next person on your list. Do not let one rejection stop the process.` },
        { title: 'Commit to a regular cadence of sessions (weekly or bi-weekly)', done: false,
          description: `**Why does this matter?**

Sporadic sessions prevent the depth and momentum that mentoring, coaching, or therapy requires. A regular cadence — weekly for intensive work, bi-weekly for maintenance — ensures continuity. Your mentor or therapist can build on previous sessions rather than starting fresh each time.

---

**How do I accomplish this?**

Agree on a frequency with your mentor or therapist during the introductory conversation. Block the recurring time on your calendar and treat it as unmovable. Budget for the cost if applicable. Commit to the cadence for at least 3 months before evaluating whether to adjust.` },
        { title: 'Prepare for each session with specific questions, challenges, or reflections', done: false,
          description: `**Why does this matter?**

Showing up unprepared to a mentoring or therapy session wastes both your time and your guide's. Coming with specific questions, challenges you faced since the last session, or reflections from your journal ensures every session is focused, productive, and directly relevant to your growth.

---

**How do I accomplish this?**

Keep a running note on your phone or in your journal labeled "For next session." Throughout the week, jot down questions, situations that challenged you, insights, or things you want to discuss. Review this note 15 minutes before each session and prioritise the top 2-3 items to cover.` },
      ],
    },
    {
      title: 'Write a personal soul-map: your psychological autobiography, values, wounds, and aspirations',
      priority: 'low', tags: ['reflection', 'tazkiyah'],
      description: 'A soul-map is a deep, honest written exploration of who you are — your formative experiences, core values, emotional wounds, recurring patterns, and highest aspirations. This exercise brings unconscious drivers into conscious awareness, enabling intentional change and genuine self-knowledge.',
      subtasks: [
        { title: 'Write your life story in 3-5 pages, focusing on pivotal moments that shaped you', done: false,
          description: `**Why does this matter?**

Most of us have never sat down to write our own story. Pivotal moments — the loss that changed you, the teacher who believed in you, the failure that redirected your path — are scattered across memory without coherence. Writing them down reveals the narrative thread of your life and the qadr of Allah within it.

---

**How do I accomplish this?**

Set aside 2-3 hours in a quiet place. Write chronologically from childhood to now, focusing on turning points: moments of joy, pain, decision, loss, and growth. Do not edit as you write — let the story flow. You can always revise later. Aim for 3-5 handwritten or typed pages.` },
        { title: 'List your top 5 non-negotiable values and test whether your life reflects them', done: false,
          description: `**Why does this matter?**

Many people live with a disconnect between what they say they value and how they actually spend their time and energy. Listing your core values and honestly testing them against your real life reveals where you are aligned and where you are living in contradiction — which is a source of deep inner tension.

---

**How do I accomplish this?**

Write down the 5 values most important to you (e.g., tawakkul, family, honesty, justice, knowledge). For each one, ask: "In the last month, what evidence shows I actually lived this value?" and "Where did I contradict it?" Be ruthlessly honest. The gaps you find are your highest-priority areas for growth.` },
        { title: 'Identify your deepest emotional wounds and how they influence your behaviour today', done: false,
          description: `**Why does this matter?**

Unexamined emotional wounds do not heal — they drive behaviour from the shadows. The anger you cannot explain, the relationships you sabotage, the validation you endlessly seek often trace back to specific wounds from childhood, family, or past experiences. Naming them is the first step toward healing.

---

**How do I accomplish this?**

Reflect on recurring emotional patterns in your life: what consistently triggers disproportionate anger, sadness, or fear? Trace each pattern back to its earliest memory. Write down what happened, how it made you feel, and how it still shows up in your behaviour today. This exercise may bring up strong emotions — be gentle with yourself, and consider sharing what you find with a therapist.` },
        { title: 'Describe the person you aspire to become in 5 years — spiritually, mentally, socially', done: false,
          description: `**Why does this matter?**

A clear vision of your future self creates a magnetic pull toward growth. Without it, you drift — reacting to life rather than intentionally building the character and capabilities you want. The soul-map is incomplete without a destination: who is the person Allah is shaping you to become?

---

**How do I accomplish this?**

Write a detailed portrait of yourself 5 years from now across three dimensions. Spiritually: what is your relationship with Allah like? What is your Quran practice? Mentally: how do you handle stress, make decisions, and think? Socially: what are your relationships like, how do you serve your community? Be specific and vivid — this is not a wish list but a blueprint.` },
        { title: 'Share relevant portions with a trusted mentor or spouse for external reflection', done: false,
          description: `**Why does this matter?**

Self-knowledge has a ceiling when pursued alone. A trusted outside perspective — someone who knows you well and cares about your growth — can see patterns, blind spots, and strengths that you cannot see in yourself. Sharing your soul-map is an act of vulnerability that deepens both self-understanding and relational trust.

---

**How do I accomplish this?**

Choose someone you deeply trust — your spouse, a close friend, a mentor, or a therapist. Share the portions of your soul-map that you are comfortable with. Ask them: "Does this match what you see in me? What am I missing? What patterns do you notice that I might not?" Listen without defending. Their perspective is a gift, not a judgement.` },
      ],
    },
  ],

  // ── SAFETY & SECURITY ──
  life_safety_core: [
    {
      title: 'Confirm stable, secure, and dignified housing for your household',
      priority: 'urgent', tags: ['housing', 'security'],
      description: 'Shelter is one of the most fundamental human needs and a prerequisite for stability in every other area of life. Dignified housing means a space that is safe, clean, adequately sized, and free from threats — a foundation upon which spiritual and professional life can be built.',
      subtasks: [
        { title: 'Assess your current housing for safety issues (locks, lighting, structural integrity)', done: false,
          description: `**Why does this matter?**

A home that is physically unsafe undermines every other pursuit — you cannot focus on ibadah, work, or family when basic security is compromised. Identifying hazards is the first step toward fulfilling your amanah as protector of your household.

---

**How do I accomplish this?**

Walk through your home room by room. Check that all exterior doors have functioning deadbolts and that windows lock securely. Test outdoor and hallway lighting — replace any burned-out bulbs. Look for structural concerns: cracks in walls, water damage, loose railings, or tripping hazards. Write down every issue you find and rank them by urgency.` },
        { title: 'Verify that your lease or mortgage terms are halal and sustainable', done: false,
          description: `**Why does this matter?**

Riba-based housing arrangements are among the most common haram financial entanglements Muslims face. Verifying that your lease or mortgage is halal ensures your shelter — one of your most fundamental needs — is not built on a prohibited foundation.

---

**How do I accomplish this?**

Review your current lease or mortgage agreement. If you have a conventional mortgage, research Islamic home financing alternatives (murabaha, ijara, diminishing musharaka) available in your area. For renters, confirm your lease terms are transparent and fair. Consult a knowledgeable scholar or Islamic finance advisor if you are unsure about any terms.` },
        { title: 'Ensure the home provides adequate privacy and space for salah and family life', done: false,
          description: `**Why does this matter?**

Privacy (sitr) is a core Islamic value, and your home should be a sanctuary where your family can pray, rest, and live without intrusion. A home that lacks adequate space or privacy creates stress and makes consistent ibadah difficult.

---

**How do I accomplish this?**

Evaluate whether each family member has reasonable personal space. Designate a clean, quiet area for salah that can be kept free of distractions. Ensure bathrooms and bedrooms provide genuine privacy. If space is tight, use curtains, room dividers, or schedule coordination to create functional zones. Address any sight-line issues from windows or shared walls.` },
        { title: 'Address any urgent maintenance or safety concerns immediately', done: false,
          description: `**Why does this matter?**

Delaying urgent repairs — a broken lock, exposed wiring, a gas leak, mould — puts your family at real physical risk. Acting immediately on safety hazards is part of taking by the means (al-akhdh bil-asbab) while trusting in Allah.

---

**How do I accomplish this?**

From your housing assessment, identify any issues that pose an immediate safety threat. Fix what you can yourself today — replace a broken lock, cover exposed wires, install a smoke detector. For issues beyond your skill, contact your landlord or hire a qualified professional. Do not wait for a convenient time; urgency means acting now.` },
        { title: 'If housing is unstable, create a plan with timeline and budget for improvement', done: false,
          description: `**Why does this matter?**

If your current housing is genuinely unstable — unsafe neighbourhood, unaffordable rent, or uninhabitable conditions — you need a concrete plan, not just worry. A written plan with a timeline transforms anxiety into action and brings you closer to dignified shelter.

---

**How do I accomplish this?**

Define what "stable housing" looks like for your family — location, size, cost, and safety criteria. Research options: moving, renegotiating your lease, applying for assistance, or saving for a halal mortgage. Set a realistic timeline with monthly milestones and a budget. Share the plan with your spouse or a trusted advisor for accountability.` },
      ],
    },
    {
      title: 'Verify that all basic needs (food, clothing, shelter) are covered by halal income',
      priority: 'urgent', tags: ['provision', 'halal'],
      description: 'The Prophet (SAW) taught that the son of Adam has no right to anything beyond basic food, clothing, and shelter. Ensuring these essentials are covered by halal income is both a spiritual obligation and the foundation of financial peace. Any haram source taints everything built upon it.',
      subtasks: [
        { title: 'List all current income sources and verify each is halal', done: false,
          description: `**Why does this matter?**

Every dirham that enters your household either carries barakah or strips it away. If even one income source involves riba, gambling, deception, or haram industries, it contaminates the provision your family depends on. Clarity here is non-negotiable.

---

**How do I accomplish this?**

Write down every source of income: salary, side work, investments, rental income, government benefits, and gifts. For each one, assess whether the industry, the contract terms, and the way you earn it are halal. If you are unsure about any source, consult a knowledgeable scholar. Be honest — this exercise only works if you are willing to face uncomfortable truths.` },
        { title: 'Calculate your monthly essential expenses (food, clothing, shelter, utilities)', done: false,
          description: `**Why does this matter?**

You cannot know whether your halal income is sufficient unless you know exactly what your essential costs are. This number is the baseline — the minimum your household needs to survive with dignity each month.

---

**How do I accomplish this?**

Review the last three months of spending. Categorise expenses into essentials (rent/mortgage, food, utilities, clothing, transport, medical) and non-essentials. Total the essentials to get your monthly baseline. Use a spreadsheet or budgeting app to keep it precise. This number becomes the benchmark for your emergency fund and income planning.` },
        { title: 'Confirm that halal income fully covers these essentials with no shortfall', done: false,
          description: `**Why does this matter?**

If your halal income does not cover your essential expenses, you are vulnerable — to debt, to compromise, and to the temptation of haram alternatives. Confirming coverage gives you the peace of mind that your foundation is sound.

---

**How do I accomplish this?**

Compare your total verified halal income against your monthly essential expenses. If halal income exceeds essentials, you have a surplus to build on. If there is a shortfall, quantify it exactly — this is the gap you need to close. Be precise; rounding or estimating can hide real problems.` },
        { title: 'If there is a gap, identify halal income opportunities to close it', done: false,
          description: `**Why does this matter?**

A shortfall between halal income and essential expenses is an urgent problem that will not resolve itself. Without a plan, the gap tends to be filled by debt or compromise. Proactively identifying halal alternatives is both practical wisdom and an act of tawakkul.

---

**How do I accomplish this?**

Brainstorm halal income opportunities: freelance skills, a side business, a better-paying halal job, selling unused assets, or reducing non-essential expenses. Prioritise options by speed to revenue and alignment with your skills. Set a target date for closing the gap and track weekly progress. Ask Allah for barakah and then take concrete action.` },
        { title: 'Eliminate any haram income sources and replace them with halal alternatives', done: false,
          description: `**Why does this matter?**

Continuing to earn from haram sources while knowing they are haram is a serious spiritual matter. The Prophet (SAW) warned that a body nourished by haram will not enter Paradise. Elimination is not optional once you have identified the problem.

---

**How do I accomplish this?**

For each haram income source identified, create an exit plan with a timeline. If it is employment in a haram industry, begin job searching immediately. If it is an investment, liquidate and reinvest in halal vehicles. If it is a side hustle with haram elements, restructure or shut it down. Replace each eliminated source with a halal alternative before or as you exit.` },
      ],
    },
    {
      title: 'Build a 3-month emergency fund in a halal savings vehicle',
      priority: 'high', tags: ['finance', 'emergency'],
      description: 'An emergency fund provides a buffer against unexpected job loss, medical expenses, or urgent needs — reducing the temptation to take on riba-based debt in a crisis. Three months of essential expenses, held in a halal account, is the minimum safety net every Muslim household should have.',
      subtasks: [
        { title: 'Calculate your total monthly essential expenses to determine the 3-month target', done: false,
          description: `**Why does this matter?**

Your emergency fund target must be based on real numbers, not guesses. An undersized fund gives false confidence, while an oversized target feels unreachable and delays action. Precision here sets you up for success.

---

**How do I accomplish this?**

Use your monthly essential expenses calculation (food, shelter, utilities, transport, medical). Multiply by three to get your emergency fund target. Write this number down prominently — it is your goal. If you have not yet calculated your essentials, complete that subtask first.` },
        { title: 'Open a halal savings account (Islamic bank or halal investment vehicle)', done: false,
          description: `**Why does this matter?**

Storing your emergency fund in a conventional interest-bearing account means your safety net is built on riba. A halal savings vehicle keeps your fund clean and ensures the barakah of your preparation is not undermined by the means you use to hold it.

---

**How do I accomplish this?**

Research Islamic banks or credit unions in your area that offer savings accounts. If none are local, look into online Islamic banking options or halal money market funds. Compare fees, accessibility (you need quick access in emergencies), and any minimum balance requirements. Open the account and set it up for electronic transfers from your primary account.` },
        { title: 'Set up an automatic monthly transfer toward the emergency fund', done: false,
          description: `**Why does this matter?**

Automation removes willpower from the equation. If you rely on manually transferring money each month, life will get in the way. An automatic transfer treats your emergency fund like a non-negotiable bill — because it is.

---

**How do I accomplish this?**

Log into your primary bank account and set up a recurring automatic transfer to your halal savings account. Schedule it for the day after your paycheck arrives. Start with whatever amount you can afford — even a small amount builds momentum. Increase the transfer amount whenever your income grows or expenses decrease.` },
        { title: 'Avoid touching the fund for non-emergencies — define what qualifies as an emergency', done: false,
          description: `**Why does this matter?**

An emergency fund that gets raided for vacations, gadgets, or "just this once" situations is not an emergency fund — it is a slush fund. Clear boundaries protect the fund from your own nafs and ensure it is there when you truly need it.

---

**How do I accomplish this?**

Write a short list of what counts as an emergency: job loss, medical emergency, urgent home or car repair, or a family crisis. Post this list where you will see it. Anything not on the list requires you to find another funding source. If you do use the fund for a real emergency, prioritise replenishing it immediately afterward.` },
        { title: 'Track progress monthly until the 3-month target is reached', done: false,
          description: `**Why does this matter?**

Tracking progress keeps you motivated and accountable. Seeing your fund grow month by month reinforces the habit and helps you catch any missed transfers early. Without tracking, the goal stays abstract.

---

**How do I accomplish this?**

Set a monthly reminder to check your emergency fund balance. Record the balance in a simple spreadsheet or notebook alongside your target. Calculate the percentage complete and estimated months to reach the goal. Celebrate milestones — reaching 25%, 50%, and 75% of your target are real achievements. Adjust your transfer amount if progress is too slow.` },
      ],
    },
    {
      title: 'Obtain basic first aid and CPR certification',
      priority: 'high', tags: ['first-aid', 'preparation'],
      description: 'Knowing how to respond in a medical emergency can save a life — a family member, a colleague, or a stranger. First aid and CPR certification equips you with practical skills that fulfil the Islamic duty of preserving life (hifz al-nafs) in its most direct form.',
      subtasks: [
        { title: 'Find a certified first aid and CPR course in your area or online', done: false,
          description: `**Why does this matter?**

You cannot learn these skills from a YouTube video alone — proper certification involves hands-on practice with feedback from qualified instructors. Finding the right course is the first step toward being prepared to save a life.

---

**How do I accomplish this?**

Search for Red Cross, Red Crescent, St John Ambulance, or equivalent certified courses in your area. Check local community centres, mosques, or hospitals for scheduled classes. Online-only courses work for theory but ensure you also get in-person practice. Compare cost, schedule, and certification validity before enrolling.` },
        { title: 'Register and complete the course (typically 4-8 hours)', done: false,
          description: `**Why does this matter?**

Knowledge without action is worth nothing. Registering locks you into a commitment, and completing the course transforms theoretical awareness into muscle memory that works under pressure.

---

**How do I accomplish this?**

Register for the course you identified — pay the fee and block the time on your calendar. Attend the full session and participate actively in all practical exercises. Ask questions about scenarios you find confusing. Take the written and practical assessments seriously. Keep your certification card in a safe, accessible place.` },
        { title: 'Practise key skills: recovery position, CPR compressions, choking response', done: false,
          description: `**Why does this matter?**

Skills fade quickly without reinforcement. In a real emergency, you will not have time to recall what you learned six months ago — your body needs to remember through repeated practice.

---

**How do I accomplish this?**

After the course, practise the recovery position with a family member. Review the CPR compression technique monthly — 30 compressions to 2 breaths, 5-6 cm depth, 100-120 beats per minute. Walk through the choking response (back blows and abdominal thrusts) so the sequence is automatic. Consider purchasing a practice mannequin or attending refresher workshops.` },
        { title: 'Keep your certification current with renewal before expiry', done: false,
          description: `**Why does this matter?**

First aid guidelines evolve as medical research advances. An expired certification means your knowledge may be outdated and you may not be covered legally if you intervene. Staying current is part of being genuinely prepared.

---

**How do I accomplish this?**

Note your certification expiry date and set a calendar reminder two months before it lapses. Most certifications are valid for 2-3 years. Book a renewal course in advance so you do not lapse. Renewal courses are usually shorter than the initial certification and serve as valuable refreshers on updated protocols.` },
      ],
    },
    {
      title: 'Document an emergency contact plan — phone numbers, meeting point, exit routes',
      priority: 'medium', tags: ['emergency', 'planning'],
      description: 'In an emergency — fire, natural disaster, or security threat — panic is the enemy. A pre-documented plan with clear contacts, meeting points, and exit routes ensures your family can act quickly and reunite safely. Tawakkul in Allah does not negate taking practical precautions.',
      subtasks: [
        { title: 'List emergency contacts: family, neighbours, local emergency services, mosque', done: false,
          description: `**Why does this matter?**

In an emergency, you should not have to search for phone numbers. Having every critical contact pre-listed means any family member — including children — can reach help immediately, even if the primary adult is incapacitated.

---

**How do I accomplish this?**

Create a contact list that includes: local emergency services (police, fire, ambulance), your nearest hospital, your family doctor, trusted neighbours, close relatives, your mosque or imam, and poison control. Include full names, phone numbers, and addresses where relevant. Format it clearly so even a child could use it.` },
        { title: 'Identify two exit routes from your home and a family meeting point outside', done: false,
          description: `**Why does this matter?**

If the primary exit is blocked by fire or debris, a second route can save your life. A predetermined meeting point outside eliminates the deadly mistake of going back into a burning building to search for someone who is already safely outside.

---

**How do I accomplish this?**

Walk through your home and identify two ways out of every room — typically a door and a window. Ensure windows designated as exits can actually be opened quickly. Choose a meeting point outside that is far enough from the building to be safe but close enough to be obvious — a specific tree, lamppost, or neighbour's front yard. Make sure every family member knows both routes and the meeting point.` },
        { title: 'Print the plan and post it in a visible location (kitchen or hallway)', done: false,
          description: `**Why does this matter?**

A plan that only exists in your head or buried in a phone is useless during a crisis. A printed, visible copy ensures the information is accessible when screens are dark, hands are shaking, and time is critical.

---

**How do I accomplish this?**

Format your emergency plan clearly on a single page: contacts at the top, exit routes in the middle, meeting point at the bottom. Use large, readable font. Print it and laminate it if possible. Post it on the inside of a kitchen cabinet door, on the fridge, or in the main hallway — somewhere every family member passes daily. Keep a backup copy in your car or go-bag.` },
        { title: 'Save all emergency numbers in every family member\'s phone', done: false,
          description: `**Why does this matter?**

Your printed plan covers the home, but emergencies happen everywhere. Having critical numbers saved in every phone means your family can reach help whether they are at school, at work, or travelling.

---

**How do I accomplish this?**

Go through each family member's phone and add all emergency contacts with clear labels (e.g., "ICE - Dad", "Doctor - Dr. Ahmad", "Poison Control"). Use the ICE (In Case of Emergency) prefix so first responders can identify key contacts. For children without phones, ensure their school and caretakers have the full contact list. Test that every number is correct by calling each one.` },
        { title: 'Conduct a family walkthrough of the plan so everyone knows what to do', done: false,
          description: `**Why does this matter?**

A plan on paper is only as good as the people who know how to follow it. A walkthrough turns abstract instructions into physical memory — your children will know which window to open, which direction to run, and where to gather.

---

**How do I accomplish this?**

Gather your entire household and walk through the emergency plan step by step. Physically practise both exit routes. Have everyone walk to the meeting point. Let each person practise calling an emergency contact. Make it calm and informative, not frightening — frame it as being smart and prepared. Repeat the walkthrough every six months or whenever a new family member moves in.` },
      ],
    },
  ],
  life_safety_growth: [
    {
      title: 'Improve living conditions — reduce overcrowding, noise, and environmental stressors',
      priority: 'high', tags: ['housing', 'well-being'],
      description: 'Your environment shapes your mental state. Overcrowding, excessive noise, clutter, and poor lighting create chronic stress that erodes well-being and makes ibadah, study, and family life harder. Improving your living conditions is an investment in every dimension of your life.',
      subtasks: [
        { title: 'Identify the top 3 environmental stressors in your home (noise, clutter, lighting, space)', done: false,
          description: `**Why does this matter?**

You cannot fix what you have not identified. Most people adapt to chronic environmental stress without realising how much it drains them. Naming your top stressors is the first step toward a home that supports rather than sabotages your well-being.

---

**How do I accomplish this?**

Spend a day paying deliberate attention to what bothers you in your home. Notice noise levels, clutter hotspots, dark corners, cramped spaces, temperature issues, or unpleasant smells. Ask family members what stresses them most. Rank everything and pick the top three that have the greatest daily impact on your mood and productivity.` },
        { title: 'Declutter one room at a time — remove what you do not need or use', done: false,
          description: `**Why does this matter?**

Clutter is not just an aesthetic problem — it creates visual noise that taxes your brain, makes cleaning harder, and subtly communicates disorder. The Prophet (SAW) valued cleanliness and order; a decluttered home is easier to maintain and more conducive to peace.

---

**How do I accomplish this?**

Pick one room to start with — ideally the one you spend the most time in. Go through every item and decide: keep, donate, or discard. Be honest about what you actually use versus what you are keeping "just in case." Box up donations immediately and remove them from the house. Organise what remains with clear storage. Move to the next room only after the first is complete.` },
        { title: 'Address noise issues with practical solutions (rugs, curtains, white noise, conversation)', done: false,
          description: `**Why does this matter?**

Chronic noise — traffic, neighbours, appliances, or even family activity — elevates cortisol, disrupts sleep, and makes concentration during salah or study nearly impossible. Reducing noise is one of the highest-impact improvements you can make.

---

**How do I accomplish this?**

Identify your primary noise sources. For external noise, add heavy curtains, seal window gaps, or use a white noise machine. For hard-floor echo, lay down rugs or carpet. For internal noise conflicts (children playing while someone studies), establish quiet hours or use room dividers. If a neighbour is the source, have a respectful conversation — many people are unaware of the impact.` },
        { title: 'Improve lighting — maximise natural light and add warm task lighting where needed', done: false,
          description: `**Why does this matter?**

Poor lighting affects your mood, energy, eyesight, and circadian rhythm. Dark, dim spaces feel oppressive and make productive work harder. Good lighting is one of the simplest and most affordable upgrades you can make to transform how your home feels.

---

**How do I accomplish this?**

Start by maximising natural light: clean windows, open curtains during the day, and trim any outdoor vegetation blocking light. For rooms with limited natural light, add warm-toned LED lamps at desk, reading, and kitchen work areas. Avoid harsh overhead fluorescents in living spaces. Use dimmer switches in bedrooms to support healthy sleep. Replace any flickering or burned-out bulbs immediately.` },
        { title: 'Create a dedicated quiet space for salah, reading, and reflection', done: false,
          description: `**Why does this matter?**

Having a designated space for worship and reflection signals to your nafs and your family that these activities are a priority, not an afterthought. A quiet corner with a prayer mat, good lighting, and minimal distractions can transform your daily ibadah.

---

**How do I accomplish this?**

Choose a clean, quiet corner of your home — it does not need to be an entire room. Lay a dedicated prayer mat and keep a Quran or mushaf nearby. Ensure the space faces the qiblah. Remove screens and distractions from the area. Add a small shelf for Islamic books. If space is limited, a foldable screen or curtain can partition a corner of a bedroom or living room.` },
      ],
    },
    {
      title: 'Research and obtain relevant Takaful (Islamic insurance) for health and property',
      priority: 'medium', tags: ['takaful', 'protection'],
      description: 'Takaful is the Islamic alternative to conventional insurance, based on mutual cooperation rather than riba and gharar. Securing takaful coverage for health and property protects your family from catastrophic financial loss while remaining within halal boundaries.',
      subtasks: [
        { title: 'Learn the difference between takaful and conventional insurance', done: false,
          description: `**Why does this matter?**

Conventional insurance involves riba (interest), gharar (excessive uncertainty), and maysir (gambling-like risk transfer) — all prohibited in Islam. Understanding why takaful is different helps you make an informed choice and explain it to your family.

---

**How do I accomplish this?**

Read a clear comparison article or watch a short lecture on takaful vs. conventional insurance. Key differences: takaful is based on mutual cooperation (tabarru) where participants contribute to a shared pool, while conventional insurance is a for-profit risk-transfer contract. In takaful, surplus is returned to participants; in conventional insurance, it becomes company profit. Take notes so you can explain it to your spouse.` },
        { title: 'Identify takaful providers available in your country or region', done: false,
          description: `**Why does this matter?**

Takaful availability varies widely by region. In some countries, multiple providers compete; in others, options are limited or nonexistent. Knowing what is available locally determines whether you can go fully halal or need to explore alternatives.

---

**How do I accomplish this?**

Search online for "takaful providers in [your country/state]." Check Islamic finance directories and ask your local mosque or Muslim community for recommendations. If no takaful is available locally, research whether any providers offer online or cross-border coverage. Note each provider's product range, reputation, and Shariah board credentials.` },
        { title: 'Compare plans for health coverage — premiums, coverage limits, exclusions', done: false,
          description: `**Why does this matter?**

Not all takaful plans are equal. A plan with low premiums but severe exclusions or low coverage limits can leave you exposed to the very catastrophic costs you are trying to protect against. Informed comparison prevents regret.

---

**How do I accomplish this?**

Request quotes from at least two takaful providers. For each plan, compare: monthly contribution amount, annual coverage limit, out-of-pocket maximum, covered services (hospitalisation, outpatient, dental, maternity), and any exclusions or waiting periods. Check whether your preferred doctors and hospitals are in-network. Create a simple comparison table to make the decision clear.` },
        { title: 'Evaluate property/home takaful options for your dwelling and valuables', done: false,
          description: `**Why does this matter?**

A fire, flood, or theft could wipe out years of savings in a single event. Property takaful protects your physical assets — your home, furniture, electronics, and valuables — so that a disaster does not become a financial catastrophe on top of an emotional one.

---

**How do I accomplish this?**

Estimate the replacement value of your home contents and any property you own. Request property takaful quotes and compare coverage for fire, theft, water damage, and natural disasters. Check whether the plan covers full replacement cost or depreciated value. Read the exclusions carefully — flood and earthquake coverage is often separate. Choose a plan that covers your most likely risks.` },
        { title: 'Select and enrol in the most suitable plans for your household', done: false,
          description: `**Why does this matter?**

Research without action leaves your family unprotected. Choosing and enrolling closes the loop — turning knowledge into actual coverage that will be there when crisis strikes.

---

**How do I accomplish this?**

Based on your comparison, select the health and property takaful plans that offer the best balance of coverage, cost, and accessibility. Complete the application process, provide any required documentation, and set up payment. Keep copies of your policy documents in a secure, accessible location. Set a calendar reminder to review your coverage annually and update it after major life changes.` },
      ],
    },
    {
      title: 'Create a written home safety protocol (fire plan, emergency procedures)',
      priority: 'medium', tags: ['safety', 'planning'],
      description: 'A written safety protocol transforms vague intentions into clear, rehearsed actions. Covering fire escape, gas leaks, medical emergencies, and severe weather ensures your household is prepared for the most common domestic risks.',
      subtasks: [
        { title: 'Install or test smoke detectors and carbon monoxide alarms in your home', done: false,
          description: `**Why does this matter?**

Smoke detectors and carbon monoxide alarms are your first line of defence against two of the deadliest household threats. They buy you the minutes you need to escape. A detector with a dead battery is as useless as no detector at all.

---

**How do I accomplish this?**

Check every level of your home for smoke detectors — there should be one in every bedroom, outside each sleeping area, and on every floor including the basement. Test each detector by pressing the test button. Replace batteries immediately if the alarm is weak or chirping. If you have no carbon monoxide alarm, purchase and install one near sleeping areas. Replace any detector older than 10 years.` },
        { title: 'Write a fire escape plan with two exits per room and a meeting point', done: false,
          description: `**Why does this matter?**

A documented fire escape plan removes the need to think during a crisis. When smoke fills a room, you have seconds — not minutes — to act. A written plan ensures every family member has a pre-decided path to safety.

---

**How do I accomplish this?**

Draw a simple floor plan of your home. For each room, mark two exit routes (typically a door and a window). Indicate the location of smoke detectors and fire extinguishers. Mark the outdoor meeting point clearly. Write step-by-step instructions: hear alarm, get low, follow route, close doors behind you, meet outside, call emergency services. Keep the plan to one page.` },
        { title: 'Document procedures for gas leak, water leak, and power outage', done: false,
          description: `**Why does this matter?**

These three emergencies are common yet often mishandled because people do not know the correct immediate response. A gas leak mishandled can cause an explosion; a water leak ignored can cause structural damage; a power outage can compromise food safety and medical equipment.

---

**How do I accomplish this?**

For gas leaks: write down to not use any electrical switches, open windows, evacuate, and call the gas company from outside. For water leaks: document where your main water shutoff valve is and how to turn it off. For power outages: note the location of your fuse box, torches, and how to safely use backup power. Print these procedures and keep them with your fire escape plan.` },
        { title: 'Store a fire extinguisher in the kitchen and learn how to use it', done: false,
          description: `**Why does this matter?**

Most home fires start in the kitchen. A fire extinguisher within reach can stop a small fire before it becomes a deadly blaze — but only if you know how to use it. An unused extinguisher during a kitchen fire is a tragic missed opportunity.

---

**How do I accomplish this?**

Purchase an ABC-rated fire extinguisher (effective against ordinary, liquid, and electrical fires). Mount it on the wall near your kitchen exit — not next to the stove, where a fire would block access. Learn the PASS technique: Pull the pin, Aim at the base of the fire, Squeeze the handle, Sweep side to side. Check the pressure gauge monthly and replace the unit before its expiry date.` },
        { title: 'Rehearse the fire escape plan with all household members quarterly', done: false,
          description: `**Why does this matter?**

A plan that has never been practised will fail under pressure. Regular rehearsal builds muscle memory so that your family reacts automatically when the alarm sounds — no hesitation, no confusion, no wasted seconds.

---

**How do I accomplish this?**

Set a quarterly calendar reminder for a family fire drill. Sound the alarm (or shout "fire drill"), start a timer, and have everyone follow the escape routes to the outdoor meeting point. Time the drill and discuss what went well and what was slow. Practise at different times — including at night — so the plan works regardless of when an emergency strikes. Make it a family routine, not a one-off exercise.` },
      ],
    },
    {
      title: 'Understand your legal rights as a Muslim in your jurisdiction (employment, religious accommodation)',
      priority: 'medium', tags: ['rights', 'knowledge'],
      description: 'Knowing your legal rights regarding religious practice — prayer breaks, hijab, dietary accommodation, holiday observance — empowers you to advocate for yourself professionally and protects you from unlawful discrimination. Knowledge here is both practical wisdom and a form of self-preservation.',
      subtasks: [
        { title: 'Research anti-discrimination laws regarding religion in your jurisdiction', done: false,
          description: `**Why does this matter?**

You cannot assert rights you do not know you have. Many Muslims face workplace discrimination or public harassment without realising that the law protects them. Knowledge of your legal protections is a form of self-defence.

---

**How do I accomplish this?**

Search for your country or state's anti-discrimination legislation regarding religion. Read the sections on religious discrimination specifically. Note what is protected: hiring, firing, harassment, dress code, prayer breaks. Look for any recent case law involving Muslim employees. Save or bookmark the key legal references for future use.` },
        { title: 'Understand your rights to religious accommodation at work (prayer, fasting, dress)', done: false,
          description: `**Why does this matter?**

Many employers are legally required to accommodate sincere religious practices unless it causes undue hardship. Knowing this empowers you to request prayer breaks, Ramadan adjustments, or hijab accommodation with confidence rather than apology.

---

**How do I accomplish this?**

Research the concept of "reasonable religious accommodation" in your jurisdiction. Understand what your employer is required to provide: a space for prayer, schedule flexibility for Jumu'ah, exceptions to dress codes for religious garments. Know the difference between a request and a demand — frame accommodation requests professionally, in writing, citing your legal rights. Keep copies of all correspondence.` },
        { title: 'Identify legal resources and Muslim advocacy organisations in your area', done: false,
          description: `**Why does this matter?**

If your rights are ever violated, you need to know who to call before the crisis happens. Muslim advocacy organisations have experience navigating religious discrimination cases and can provide guidance, legal referrals, and support.

---

**How do I accomplish this?**

Search for Muslim civil rights organisations active in your country (e.g., CAIR in the US, MEND in the UK, NCCM in Canada). Save their hotline numbers and websites. Identify local legal aid societies that handle discrimination cases. Ask your mosque if they have a legal committee or partnerships with Muslim lawyers. Keep this information accessible — you may need it on short notice.` },
        { title: 'Document any current or past accommodation requests and their outcomes', done: false,
          description: `**Why does this matter?**

A paper trail is essential if a situation ever escalates to a formal complaint or legal action. Undocumented verbal requests are nearly impossible to prove. Documenting from the start protects you and creates accountability.

---

**How do I accomplish this?**

Write down every accommodation request you have made at work: the date, what you asked for, who you asked, and what the response was. Include any follow-up conversations. If you made verbal requests in the past, send a follow-up email summarising the conversation to create a written record. Store these documents in a secure personal folder — not on your work computer.` },
        { title: 'Know the process for filing a complaint if your rights are violated', done: false,
          description: `**Why does this matter?**

Knowing the complaint process before you need it removes a major barrier to action. Many people suffer discrimination in silence because they do not know how or where to file a complaint. Preparation is empowerment.

---

**How do I accomplish this?**

Research the formal complaint process for religious discrimination in your jurisdiction — this is often through a government agency (e.g., EEOC in the US, Equality and Human Rights Commission in the UK). Note the filing deadlines, required documentation, and steps involved. Identify whether your employer has an internal grievance procedure and understand that process as well. Consult with a Muslim advocacy organisation if you are unsure how to proceed.` },
      ],
    },
  ],
  life_safety_excellence: [
    {
      title: 'Contribute to a community safety initiative — neighbourhood watch, emergency response training',
      priority: 'low', tags: ['community', 'safety'],
      description: 'Extending safety beyond your own household to your community is a manifestation of the Prophetic principle that the best of people are those most beneficial to others. Community safety initiatives build social cohesion, deter harm, and create networks of mutual support.',
      subtasks: [
        { title: 'Research existing community safety programmes in your neighbourhood or mosque', done: false,
          description: `**Why does this matter?**

Before starting something new, find out what already exists. Joining an established programme multiplies your impact immediately, while reinventing the wheel wastes energy. Many mosques and neighbourhoods already have safety initiatives that need volunteers.

---

**How do I accomplish this?**

Ask your mosque board, local council, or neighbourhood association whether any safety programmes exist — neighbourhood watch, community emergency response teams, or disaster preparedness committees. Check local government websites for community safety initiatives. Attend a community meeting to learn about active efforts and unmet needs.` },
        { title: 'Attend an introductory meeting or training session', done: false,
          description: `**Why does this matter?**

Showing up is the transition from intention to commitment. An introductory meeting lets you meet the team, understand the scope of the initiative, and assess where your skills can best contribute — all before making a long-term commitment.

---

**How do I accomplish this?**

Contact the programme coordinator and ask when the next meeting or training session is. Put it on your calendar and attend with an open mind. Listen more than you speak — learn the current structure, challenges, and how volunteers are deployed. Take notes on where you see opportunities to help. Introduce yourself and express your interest in contributing.` },
        { title: 'Volunteer for a specific role (coordinator, trainer, communications)', done: false,
          description: `**Why does this matter?**

Vague involvement fades quickly. Committing to a specific role gives you accountability, a clear contribution, and makes you a reliable part of the team rather than an occasional drop-in. Defined roles are what make volunteer organisations actually function.

---

**How do I accomplish this?**

After attending a meeting, identify which role aligns with your skills and availability. If you are organised, coordinate schedules and logistics. If you are a good communicator, handle outreach and social media. If you have relevant professional skills (medical, legal, technical), offer to lead training. Tell the coordinator which role you want and commit to a specific time commitment per week or month.` },
        { title: 'Complete any required training (community emergency response, de-escalation)', done: false,
          description: `**Why does this matter?**

Good intentions without training can cause more harm than good. Community emergency response and de-escalation training equip you with protocols that work under pressure, protecting both you and those you are trying to help.

---

**How do I accomplish this?**

Ask the programme coordinator what training is required or recommended. Common options include CERT (Community Emergency Response Team) training, basic de-escalation and conflict resolution, first aid refreshers, and active threat response. Register for and complete the training within a set timeframe. Apply what you learn in practice scenarios and share key takeaways with your household.` },
        { title: 'Recruit at least two other community members to participate', done: false,
          description: `**Why does this matter?**

Community safety is only as strong as the number of people involved. Recruiting others ensures the initiative is sustainable beyond any single person and builds the critical mass needed to make a real difference in your neighbourhood.

---

**How do I accomplish this?**

Think of two or three people in your community who are reliable and community-minded — fellow mosque-goers, neighbours, or friends. Have a personal conversation about what the programme does and why it matters. Invite them to the next meeting or training session. People are more likely to join when personally invited by someone they trust than when they see a flyer.` },
      ],
    },
    {
      title: 'Develop a family continuity plan — wills, guardianship, Islamic estate planning',
      priority: 'medium', tags: ['planning', 'family'],
      description: 'Islamic estate planning (mirath) is a fardh obligation, yet most Muslims die without a valid Islamic will. A family continuity plan ensures your assets are distributed according to Shariah, your children have designated guardians, and your family is not left in legal limbo during their most vulnerable moment.',
      subtasks: [
        { title: 'Learn the Islamic rules of inheritance (mirath) and obligatory shares', done: false,
          description: `**Why does this matter?**

Islamic inheritance law is not optional — it is a divine command with specific shares prescribed in the Quran. Not knowing these rules means risking a distribution that violates what Allah has ordained, which wrongs both the deceased and the heirs.

---

**How do I accomplish this?**

Study the Quranic verses on inheritance (primarily Surah An-Nisa, verses 11-12 and 176). Take a class or read a clear guidebook on Islamic inheritance. Understand the fixed shares (fard) for spouses, parents, children, and siblings. Learn when shares adjust based on the presence or absence of other heirs. Use an online mirath calculator to see how your own estate would be divided.` },
        { title: 'Draft an Islamic will (wasiyyah) with the help of a knowledgeable scholar or solicitor', done: false,
          description: `**Why does this matter?**

Without a valid will, your estate will be distributed according to local secular law — which almost certainly does not match Islamic inheritance rules. A properly drafted Islamic will ensures your wealth is divided as Allah commands and can include your wasiyyah (bequest of up to one-third for charitable or non-heir purposes).

---

**How do I accomplish this?**

Find a solicitor or lawyer experienced with Islamic wills in your jurisdiction. Many Muslim organisations offer will-drafting services or templates. Work with a scholar to determine the correct shares for your heirs. Ensure the will is legally valid in your jurisdiction — it must meet local legal requirements to be enforceable. Sign it with witnesses as required by law.` },
        { title: 'Designate guardians for minor children in consultation with your spouse and family', done: false,
          description: `**Why does this matter?**

If both parents pass away without designated guardians, the court decides who raises your children — and the court may not choose someone who will raise them upon Islam. This is one of the most important decisions you will ever make as a parent.

---

**How do I accomplish this?**

Discuss with your spouse who you would trust to raise your children with Islamic values, love, and stability. Consider the candidates' deen, character, financial stability, and willingness. Have an honest conversation with your chosen guardians to confirm they accept. Document the guardianship designation in your will and ensure it is legally binding in your jurisdiction.` },
        { title: 'Document all assets, debts, accounts, and insurance policies in one secure location', done: false,
          description: `**Why does this matter?**

When someone passes away, their family often has no idea what assets, debts, or accounts exist. Undiscovered accounts go unclaimed, unknown debts surface at the worst time, and the estate settlement drags on for months or years. A single document prevents all of this.

---

**How do I accomplish this?**

Create a master document listing: all bank accounts (with account numbers and institutions), investments, property deeds, vehicles, valuables, life insurance or takaful policies, debts owed and debts owing, pension or retirement accounts, and digital accounts with passwords. Store this document in a fireproof safe or a secure digital vault. Tell your spouse and executor where to find it.` },
        { title: 'Review and update the will annually or after any major life event', done: false,
          description: `**Why does this matter?**

Life changes — births, deaths, marriages, divorces, significant financial changes — can make a will outdated or even legally invalid. An annual review ensures your will reflects your current reality, not a snapshot from years ago.

---

**How do I accomplish this?**

Set an annual calendar reminder to review your will — a good time is during Ramadan, when reflection on mortality is natural. After any major life event (new child, death of an heir, marriage, divorce, major purchase), review immediately. Check that guardian designations, asset lists, and heir shares are still accurate. Update and re-sign the will with witnesses if any changes are needed.` },
        { title: 'Inform your executor and family members where the will and key documents are stored', done: false,
          description: `**Why does this matter?**

A perfectly drafted will that nobody can find is worthless. Your executor needs to know where the will is, who the witnesses are, and how to access the master asset document — ideally before they need it, not after you are gone.

---

**How do I accomplish this?**

Have a direct conversation with your designated executor about their role and responsibilities. Tell them exactly where your will and asset documents are stored — safe, lawyer's office, or secure digital vault. Give them the access information they need (safe combination, lawyer's contact, vault password). Inform your spouse and at least one other trusted family member as a backup.` },
      ],
    },
    {
      title: 'Pursue a leadership role in your neighbourhood or mosque safety committee',
      priority: 'low', tags: ['leadership', 'community'],
      description: 'Taking a leadership role in safety infrastructure — whether at the mosque, school, or neighbourhood level — multiplies your impact and ensures that safety planning is proactive rather than reactive. It is a form of khidmah (service) that protects the most vulnerable.',
      subtasks: [
        { title: 'Express your interest to the mosque board or community organisation leadership', done: false,
          description: `**Why does this matter?**

Leadership positions are rarely handed out — they go to those who step forward. Expressing interest signals that you are serious, and it opens a conversation about how your skills and experience can serve the community's safety needs.

---

**How do I accomplish this?**

Request a meeting or send a message to the mosque board chairperson or community organisation leader. Explain your background, your interest in safety and emergency preparedness, and what specific experience or skills you bring. Ask what the current safety structure looks like and where they see the biggest need. Be specific about what you are offering — vague offers to "help out" get forgotten.` },
        { title: 'Assess the current state of safety protocols and identify the biggest gaps', done: false,
          description: `**Why does this matter?**

Effective leadership starts with an honest assessment of the current state. Many mosques and community spaces have no formal safety protocols at all, or have outdated plans that have never been tested. You cannot fix what you have not measured.

---

**How do I accomplish this?**

Conduct a walkthrough of the community space with a safety checklist: fire exits (clear and marked?), fire extinguishers (present and inspected?), first aid kits (stocked?), emergency lighting, AED availability, security camera coverage, and written emergency procedures. Interview staff and regular attendees about their awareness of safety protocols. Document everything and rank gaps by severity and likelihood.` },
        { title: 'Propose a structured safety improvement plan with priorities and timelines', done: false,
          description: `**Why does this matter?**

A list of problems without a plan is just a complaint. A structured improvement plan with priorities and timelines shows leadership, earns buy-in from the board, and creates accountability for actually getting things done.

---

**How do I accomplish this?**

Based on your assessment, create a document with three priority tiers: immediate (fire safety, first aid), short-term (training, signage, protocols), and long-term (security systems, AED installation). For each item, include the action, responsible person, estimated cost, and target completion date. Present it to the board in a clear, professional format. Start with quick wins to build momentum and credibility.` },
        { title: 'Organise a safety training or awareness event for the community', done: false,
          description: `**Why does this matter?**

Safety infrastructure is only effective if the community knows it exists and knows how to use it. A training event educates, builds awareness, and creates a culture where safety is everyone's responsibility — not just the committee's.

---

**How do I accomplish this?**

Plan a community event: a first aid workshop, a fire safety demonstration, or an emergency preparedness seminar. Partner with local fire departments, ambulance services, or qualified trainers who may offer free community sessions. Promote the event through the mosque announcement, social media, and word of mouth. Make it family-friendly and practical — people remember what they physically practise, not what they hear in a lecture.` },
        { title: 'Build a team of committed volunteers to sustain the initiative beyond you', done: false,
          description: `**Why does this matter?**

A safety initiative that depends on one person will die when that person burns out or moves on. Building a team ensures sustainability and distributes the workload. True leadership creates systems that outlast the leader.

---

**How do I accomplish this?**

Identify 3-5 community members who showed interest during events or training. Invite them to join a formal safety committee with defined roles: coordinator, trainer, communications lead, supply manager. Hold regular meetings (monthly or quarterly) to maintain momentum. Document all procedures so that any committee member can step into any role. Develop a succession plan so the committee survives leadership transitions.` },
      ],
    },
  ],

  // ── SOCIAL CHARACTER ──
  life_social_core: [
    {
      title: 'Master the Islamic greeting — give salam freely and respond completely',
      priority: 'high', tags: ['adab', 'sunnah'],
      description: 'The Prophet (SAW) said: "You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I not tell you of something that if you do it, you will love one another? Spread the salam amongst yourselves." The greeting of peace is the simplest, most powerful tool for building Muslim brotherhood.',
      subtasks: [
        { title: 'Make it a habit to initiate salam with every Muslim you encounter', done: false,
          description: `**Why does this matter?**

The one who initiates the greeting earns greater reward. By making salam your default, you break social barriers, soften hearts, and plant seeds of brotherhood with every encounter.

---

**How do I accomplish this?**

Set a personal rule: you will be the first to say "As-salamu alaykum" in every interaction with a Muslim — at the store, the parking lot, the hallway. Do not wait for eye contact or familiarity. Track yourself for one week and notice how many new connections open up.` },
        { title: 'Learn and use the full response: "Wa alaykum as-salam wa rahmatullahi wa barakatuh"', done: false,
          description: `**Why does this matter?**

Responding with the complete greeting maximises the reward and honours the one who greeted you. Each additional phrase adds mercy and blessings to the exchange, turning a simple hello into a powerful dua.

---

**How do I accomplish this?**

Memorise the full response and practise it until it flows naturally. When someone gives you salam, pause for a beat and deliver the complete reply. Correct yourself out loud if you cut it short — this builds the habit quickly.` },
        { title: 'Greet strangers at the mosque, workplace, and in your neighbourhood', done: false,
          description: `**Why does this matter?**

Salam is most impactful when given to those you do not know. It transforms a room of strangers into a community of believers and fulfils the prophetic command to spread peace among yourselves.

---

**How do I accomplish this?**

Choose one setting each week — the mosque, your office, or your neighbourhood — and deliberately greet every Muslim you see, including those you have never spoken to. Smile, make eye contact, and say it clearly. Notice how quickly walls come down.` },
        { title: 'Teach children the etiquette of giving and responding to salam', done: false,
          description: `**Why does this matter?**

Children who learn the salam early internalise that every human interaction begins with peace. This shapes their social character from the foundation and ensures the sunnah passes to the next generation.

---

**How do I accomplish this?**

Model the behaviour — greet everyone with salam in front of your children and prompt them to do the same. Teach them who greets first (the young greets the elder, the walker greets the seated) and praise them when they initiate salam on their own.` },
      ],
    },
    {
      title: 'Fulfil social obligations consistently — attend weddings, funerals, and visit the sick',
      priority: 'high', tags: ['adab', 'community'],
      description: 'The Prophet (SAW) outlined five rights of a Muslim upon another Muslim, including visiting the sick, attending funerals, and accepting invitations. These are not optional courtesies — they are obligations that maintain the social fabric of the ummah and earn immense reward.',
      subtasks: [
        { title: 'Keep a calendar or list of upcoming social obligations (weddings, births, illnesses)', done: false,
          description: `**Why does this matter?**

Social obligations in Islam are not optional — they are rights that others hold over you. Without a system to track them, you will inevitably miss weddings, forget to visit the sick, and lose the reward and connection that come from showing up.

---

**How do I accomplish this?**

Create a dedicated section in your calendar or notes app for social obligations. When you hear of a wedding, birth, illness, or death, add it immediately with a reminder. Review this list weekly so nothing falls through the cracks.` },
        { title: 'Prioritise attending janazah prayers whenever you are notified of a death', done: false,
          description: `**Why does this matter?**

Attending the janazah prayer is a communal obligation (fardh kifayah) and carries the reward of a qirat — a mountain of good deeds. It also comforts the bereaved family and reminds you of your own mortality, softening your heart.

---

**How do I accomplish this?**

Sign up for your local mosque notification list or community WhatsApp group that announces deaths. When a janazah is announced, treat it as a priority — rearrange your schedule if possible. Even if you did not know the deceased, your presence fulfils a right and earns immense reward.` },
        { title: 'Visit at least one sick person per month — bring food, dua, and companionship', done: false,
          description: `**Why does this matter?**

Visiting the sick is one of the five rights of a Muslim upon another Muslim. The Prophet (SAW) said that when you visit a sick person, you are surrounded by angels making dua for you. It strengthens the bond of community and reminds you of the blessing of health.

---

**How do I accomplish this?**

Ask around your circle each week — who is unwell, recovering from surgery, or housebound? Schedule a visit, bring a home-cooked meal or fruit, sit with them, make dua for their recovery, and keep the visit brief unless they want company. Consistency matters more than grand gestures.` },
        { title: 'Accept invitations to walimah and other gatherings unless there is a valid Islamic reason not to', done: false,
          description: `**Why does this matter?**

The Prophet (SAW) said that whoever does not accept an invitation has disobeyed Allah and His Messenger. Accepting invitations strengthens social bonds, honours the host, and keeps you connected to your community rather than isolated.

---

**How do I accomplish this?**

When invited to a walimah, aqeeqah, or community gathering, accept as your default response. Only decline if there is a legitimate Islamic reason (haram activity at the event, genuine hardship). If you cannot attend, send a gift or a warm message explaining your absence.` },
        { title: 'Follow up after visits with a message, call, or continued support', done: false,
          description: `**Why does this matter?**

A single visit or attendance is good, but follow-up transforms a social obligation into a genuine relationship. The people who remember to check in after the crowd has moved on are the ones who earn lasting love and trust.

---

**How do I accomplish this?**

After visiting the sick, attending a funeral, or going to a wedding, send a brief follow-up message within 48 hours. For the bereaved, check in again after one week and one month when the support often dries up. For the sick, ask about their recovery periodically.` },
      ],
    },
    {
      title: 'Audit your speech — eliminate backbiting (gheebah), slander (buhtan), and lying',
      priority: 'urgent', tags: ['adab', 'character'],
      description: 'Allah compares backbiting to eating the flesh of your dead brother (49:12). The tongue is the most dangerous limb — it can destroy relationships, reputations, and your own akhirah. An honest audit of your speech habits is the starting point for purifying your social character.',
      subtasks: [
        { title: 'For one week, actively monitor every conversation for gheebah, buhtan, or exaggeration', done: false,
          description: `**Why does this matter?**

You cannot fix what you do not see. Most people backbite so habitually that they do not even recognise it. A deliberate week-long audit forces you to confront the reality of your speech and creates the awareness needed for change.

---

**How do I accomplish this?**

For seven days, carry a small notebook or use your phone to tally every instance where you speak negatively about someone who is not present — even if what you said is true. Note what you said, about whom, and in what context. Review the tally at the end of each day.` },
        { title: 'Identify your triggers — who, what, and when do you most often slip into harmful speech', done: false,
          description: `**Why does this matter?**

Harmful speech is rarely random — it follows patterns. Certain people, topics, or emotional states trigger it. Identifying your triggers is the key to interrupting the cycle before it starts.

---

**How do I accomplish this?**

Review your week-long audit and look for patterns. Do you backbite most with a particular friend? About a specific colleague? When you are stressed or bored? Write down your top three triggers and develop a plan for each — whether that means changing the subject, excusing yourself, or avoiding the trigger environment.` },
        { title: 'Establish a personal rule: speak about someone only as you would in their presence', done: false,
          description: `**Why does this matter?**

This single rule, if followed consistently, eliminates the vast majority of harmful speech. It forces you to filter every comment through a test of honesty, courage, and respect before it leaves your mouth.

---

**How do I accomplish this?**

Before you say anything about someone who is not present, pause and ask: "Would I say this exactly the same way if they were sitting here?" If the answer is no, do not say it. Write this rule on a card and keep it visible — in your wallet, on your desk, or as a phone reminder — until it becomes second nature.` },
        { title: 'When you catch yourself backbiting, make istighfar and say something positive about the person', done: false,
          description: `**Why does this matter?**

Catching yourself mid-slip and correcting it trains your nafs to associate backbiting with immediate repentance rather than casual acceptance. Over time, the discomfort of having to stop and make istighfar becomes a powerful deterrent.

---

**How do I accomplish this?**

The moment you realise you have said something that qualifies as gheebah, stop mid-conversation if necessary. Say "Astaghfirullah" and then immediately mention something genuinely positive about that person. This practice also signals to those around you that you are serious about guarding your tongue.` },
        { title: 'Find an accountability partner who will gently remind you when you slip', done: false,
          description: `**Why does this matter?**

Self-monitoring has limits — you will have blind spots. An accountability partner provides an external check and makes the commitment social, which dramatically increases follow-through.

---

**How do I accomplish this?**

Choose a trusted friend, spouse, or colleague and explain your goal. Ask them to gently signal you — a tap on the arm, a code word, a look — whenever they hear you slip into gheebah. Agree that neither of you will take offence at being corrected. Check in with each other weekly on progress.` },
      ],
    },
    {
      title: 'Practise positive body language — eye contact, open posture, and full presence in conversations',
      priority: 'medium', tags: ['adab', 'communication'],
      description: 'The Prophet (SAW) was described as giving his full attention to whoever spoke to him, turning his entire body toward them. Positive body language — eye contact, leaning in, putting down your phone — communicates respect and builds trust in every interaction.',
      subtasks: [
        { title: 'Put your phone away (face down or in pocket) during all face-to-face conversations', done: false,
          description: `**Why does this matter?**

A visible phone — even face-up on the table — signals divided attention. Research shows that the mere presence of a phone reduces the quality of conversation and makes the other person feel less valued. Removing it is the simplest way to show someone they matter.

---

**How do I accomplish this?**

Make it a non-negotiable habit: when a conversation begins, your phone goes face-down on the table or into your pocket. Turn off vibration if you are easily distracted. Start with one-on-one conversations and expand to group settings. Notice how the quality of your interactions changes within a week.` },
        { title: 'Practise making comfortable eye contact — aim for 60-70% of the conversation', done: false,
          description: `**Why does this matter?**

Eye contact communicates engagement, confidence, and sincerity. Too little makes you seem disinterested or untrustworthy; too much can feel aggressive. The 60-70% range is the sweet spot that builds connection without discomfort.

---

**How do I accomplish this?**

During your next few conversations, consciously maintain eye contact while the other person is speaking, and allow natural breaks when you are thinking or responding. If sustained eye contact feels difficult, focus on the triangle between the person's eyes and nose. Practise with trusted friends first and gradually extend to new people.` },
        { title: 'Face the speaker with open posture (uncrossed arms, slight lean forward)', done: false,
          description: `**Why does this matter?**

Your body communicates before your words do. Crossed arms, turned shoulders, or leaning away signal defensiveness or disinterest — even if you are genuinely listening. Open posture invites trust and makes the speaker feel safe to share.

---

**How do I accomplish this?**

When someone speaks to you, turn your full body toward them — not just your head. Uncross your arms and let your hands rest naturally. Lean forward slightly to show engagement. This mirrors the sunnah of the Prophet (SAW), who would turn his entire body to face whoever addressed him.` },
        { title: 'Observe how others respond when you give them full, undivided attention', done: false,
          description: `**Why does this matter?**

Noticing the impact of your improved presence reinforces the habit. When you see people open up, share more deeply, or thank you for listening, it proves that full attention is one of the greatest gifts you can give another human being.

---

**How do I accomplish this?**

After practising the previous subtasks for two weeks, start paying attention to how people react. Do they share more? Do conversations go deeper? Do people seek you out for advice? Journal your observations — this positive feedback loop will cement the habit permanently.` },
      ],
    },
    {
      title: 'Respond to wrongdoing with patience (hilm) — implement a 24-hour rule before reacting',
      priority: 'medium', tags: ['character', 'patience'],
      description: 'The Prophet (SAW) said: "The strong person is not the one who can wrestle, but the one who controls himself when angry." The 24-hour rule creates a buffer between stimulus and response, allowing wisdom and hilm (forbearance) to replace impulsive reactions that you would regret.',
      subtasks: [
        { title: 'Commit to the rule: when wronged or angered, wait 24 hours before responding', done: false,
          description: `**Why does this matter?**

Most regrettable words and actions happen in the heat of the moment. A 24-hour buffer allows the initial emotional surge to subside, giving your rational mind and your faith time to guide your response. This single rule can prevent years of relational damage.

---

**How do I accomplish this?**

Write the rule down and place it where you will see it daily. When you feel the urge to fire back — via text, email, or in person — tell yourself "24 hours." If someone is in front of you, excuse yourself politely. Do not type, send, or say anything until the time has passed.` },
        { title: 'During the waiting period, make wudu, pray two rakaat, and seek counsel from Allah', done: false,
          description: `**Why does this matter?**

The 24-hour window is not just about waiting — it is about redirecting your energy toward Allah. Wudu cools the body, salah centres the heart, and dua opens the door to guidance. The Prophet (SAW) prescribed these exact remedies for anger.

---

**How do I accomplish this?**

As soon as you step away from the triggering situation, go make wudu. Then pray two voluntary rakaat and make a sincere dua asking Allah for patience, clarity, and the best response. If you are in a place where you cannot pray, sit down (the Prophet advised changing your position when angry) and make dhikr until the intensity fades.` },
        { title: 'Write down what happened and how you feel before deciding on a response', done: false,
          description: `**Why does this matter?**

Writing forces clarity. When you put the incident on paper, you often discover that the situation is less severe than it felt, or that your own assumptions contributed to the hurt. This process separates facts from emotions and prepares you for a measured response.

---

**How do I accomplish this?**

Within the first few hours of the 24-hour period, write a brief account: What happened? What exactly was said or done? How did it make you feel? What assumptions are you making about the other person's intent? Review what you wrote before deciding how to respond. Often, the act of writing itself brings peace.` },
        { title: 'After 24 hours, choose the response that is most just and most likely to preserve the relationship', done: false,
          description: `**Why does this matter?**

The goal of the 24-hour rule is not to suppress your response but to refine it. After the waiting period, you are in a position to choose a response that is just (not vengeful), merciful (not cruel), and strategic (preserving the relationship wherever possible).

---

**How do I accomplish this?**

After 24 hours, review your written notes and ask: What is the most just response? What would the Prophet (SAW) do? Will this response preserve or destroy the relationship? Choose the path that balances your rights with mercy. If direct conversation is needed, approach the person calmly, state what happened, how it affected you, and what you need going forward.` },
        { title: 'Track incidents where the 24-hour rule prevented a regrettable reaction', done: false,
          description: `**Why does this matter?**

Tracking your wins builds confidence in the system. Every time you look back and realise the 24-hour rule saved you from a regrettable text, a harsh word, or a burned bridge, your commitment to the practice deepens.

---

**How do I accomplish this?**

Keep a simple log — date, what triggered you, what you would have said or done immediately, and what you actually did after 24 hours. Over time, this log becomes powerful evidence of your growth in hilm and a motivator to continue.` },
      ],
    },
  ],
  life_social_growth: [
    {
      title: 'Build a reputation for honesty and reliability in your professional and social circles',
      priority: 'high', tags: ['trust', 'character'],
      description: 'The Prophet (SAW) was known as al-Amin (the trustworthy) even before revelation. A reputation for honesty and reliability is built through consistent small actions — keeping promises, meeting deadlines, telling the truth even when it is inconvenient, and never overpromising.',
      subtasks: [
        { title: 'Audit your current commitments — are there any unfulfilled promises or overdue obligations?', done: false,
          description: `**Why does this matter?**

You cannot build a reputation for reliability while carrying a backlog of broken promises. An honest audit reveals where your credibility has slipped and gives you a clear starting point for restoration.

---

**How do I accomplish this?**

Set aside 30 minutes and list every commitment you have made recently — to family, friends, colleagues, and community. For each one, mark whether it is fulfilled, in progress, or overdue. For anything overdue, either complete it this week or communicate honestly about the delay. This single exercise rebuilds trust faster than any grand gesture.` },
        { title: 'Adopt a policy of under-promising and over-delivering in all commitments', done: false,
          description: `**Why does this matter?**

Over-promising feels generous in the moment but erodes trust when you cannot follow through. Under-promising creates a buffer that allows you to consistently exceed expectations — and people remember those who deliver more than they promised.

---

**How do I accomplish this?**

Before making any commitment, pause and ask: "Can I realistically deliver this, plus a little more, without stress?" If not, scale back what you promise. When someone asks for a favour, add extra time to your estimate. When you deliver early or beyond expectations, your reputation compounds.` },
        { title: 'Follow through on every small commitment (returning calls, showing up on time, completing favours)', done: false,
          description: `**Why does this matter?**

Trust is built in the small things. Returning a call when you said you would, showing up five minutes early, and completing a small favour without being reminded — these micro-actions signal that you are someone who keeps their word at every level.

---

**How do I accomplish this?**

Treat every small commitment with the same seriousness as a major deadline. When you tell someone "I will call you back," add it to your task list immediately. Set a personal standard of arriving five minutes early to everything. If you offer to do something, do it within 24 hours. These small wins accumulate into an unshakeable reputation.` },
        { title: 'When you cannot fulfil a commitment, communicate proactively and honestly', done: false,
          description: `**Why does this matter?**

Everyone occasionally falls short — what separates trustworthy people from unreliable ones is how they handle it. Proactive, honest communication when you cannot deliver preserves trust because it shows respect for the other person's time and expectations.

---

**How do I accomplish this?**

The moment you realise you will miss a deadline or cannot fulfil a promise, reach out immediately — do not wait until the last minute. Explain the situation honestly (no excuses), apologise sincerely, and offer a concrete alternative or revised timeline. People forgive delays far more readily than silence.` },
        { title: 'Ask a trusted friend or colleague for honest feedback on your reliability', done: false,
          description: `**Why does this matter?**

Self-assessment has blind spots. You may believe you are reliable, but the people around you experience the reality. Honest feedback from someone you trust reveals the gap between your self-image and your actual reputation.

---

**How do I accomplish this?**

Choose one or two people who know you well in different contexts (work and personal). Ask them directly: "On a scale of 1-10, how reliable would you say I am? Where do I fall short?" Listen without defending yourself, thank them genuinely, and act on the feedback. Revisit the conversation in three months to check your progress.` },
      ],
    },
    {
      title: 'Perform a regular act of service (khidmah) — volunteer, help a neighbour, or assist at the mosque',
      priority: 'medium', tags: ['khidmah', 'community'],
      description: 'The Prophet (SAW) said: "The most beloved of people to Allah are those who are most beneficial to people." Regular service — whether structured volunteering or spontaneous acts of kindness — builds empathy, strengthens community bonds, and purifies the nafs from selfishness.',
      subtasks: [
        { title: 'Identify a cause or organisation aligned with your skills and values', done: false,
          description: `**Why does this matter?**

Service is most sustainable and impactful when it aligns with what you are good at and what you care about. Random acts of service are beautiful, but strategic alignment turns occasional help into lasting impact.

---

**How do I accomplish this?**

List your top three skills (organising, teaching, cooking, driving, technology, etc.) and your top three values (education, hunger relief, youth development, etc.). Search for local organisations or mosque programmes that sit at the intersection. Reach out to one this week and ask how you can contribute.` },
        { title: 'Commit to a regular schedule — even 2-4 hours per month makes a difference', done: false,
          description: `**Why does this matter?**

Sporadic service is better than none, but consistent service creates real change — both in the community and in your own character. A regular schedule turns khidmah from an occasional impulse into a pillar of your life.

---

**How do I accomplish this?**

Block a specific time on your calendar — the first Saturday morning of each month, every other Friday afternoon, whatever works. Treat it like a non-negotiable appointment. Start with just 2-4 hours per month and increase only when you can sustain it without resentment or burnout.` },
        { title: 'Look for daily micro-opportunities: carrying groceries, giving rides, checking on elderly neighbours', done: false,
          description: `**Why does this matter?**

Structured volunteering is valuable, but the majority of service opportunities appear in your daily routine. Noticing and acting on these micro-moments builds a servant mindset that becomes second nature.

---

**How do I accomplish this?**

Train your eye to notice needs around you: the elderly person struggling with bags, the neighbour whose bins are still out, the colleague who looks overwhelmed. Act immediately without overthinking — carry the bags, bring the bins in, offer to help. Keep a mental count of daily micro-services for one week to build awareness.` },
        { title: 'Involve your family in service activities to build a culture of giving', done: false,
          description: `**Why does this matter?**

When service is a family activity, it multiplies the impact and instils generosity in your children from an early age. It also creates shared experiences and memories rooted in purpose rather than consumption.

---

**How do I accomplish this?**

Choose one family-friendly service activity per month: cooking meals for a shelter together, cleaning the mosque grounds, visiting an elderly neighbour as a family, or assembling care packages. Let your children take ownership of age-appropriate tasks. Discuss the experience afterwards — why it matters and how it felt.` },
      ],
    },
    {
      title: 'Develop active listening skills — practise full presence and ask thoughtful follow-up questions',
      priority: 'medium', tags: ['communication', 'character'],
      description: 'Most people listen to respond, not to understand. Active listening — being fully present, reflecting back what you hear, and asking genuine follow-up questions — is one of the most powerful ways to honour another human being and build deep, trusting relationships.',
      subtasks: [
        { title: 'In your next 5 conversations, focus entirely on listening without planning your response', done: false,
          description: `**Why does this matter?**

The habit of mentally composing your reply while someone is still speaking means you are not truly hearing them. Deliberately silencing your inner response-planner, even for five conversations, rewires how you engage with others.

---

**How do I accomplish this?**

In your next five meaningful conversations, give yourself one instruction: do not think about what you will say next. When you notice your mind drifting to your response, gently bring your attention back to the speaker's words, tone, and body language. Allow a pause after they finish before you respond — the pause proves you were listening, not just waiting.` },
        { title: 'Practise paraphrasing: "So what I hear you saying is..." before responding', done: false,
          description: `**Why does this matter?**

Paraphrasing confirms to the speaker that they have been understood — and it often reveals misunderstandings before they cause conflict. It is one of the most effective tools for preventing miscommunication and showing genuine care.

---

**How do I accomplish this?**

After someone shares something important, resist the urge to immediately give your opinion. Instead, say: "So what I hear you saying is..." and summarise their point in your own words. Then ask: "Did I get that right?" This takes practice and may feel awkward at first, but the impact on your relationships will be immediate.` },
        { title: 'Ask at least one thoughtful follow-up question in every meaningful conversation', done: false,
          description: `**Why does this matter?**

A thoughtful follow-up question tells the speaker: "I am genuinely interested in what you are sharing." It deepens the conversation beyond surface-level exchanges and often leads to insights neither person expected.

---

**How do I accomplish this?**

After someone shares, ask a question that goes deeper: "What was that like for you?" "What do you think you will do next?" "How did that change your perspective?" Avoid questions that shift the topic to yourself. Make this a personal challenge — one genuine follow-up question per meaningful conversation, every day.` },
        { title: 'Notice the difference in connection quality when you listen deeply vs. superficially', done: false,
          description: `**Why does this matter?**

Awareness of the difference is what transforms active listening from a technique into a permanent character trait. When you feel the contrast between a shallow exchange and a deeply connected conversation, you will never want to go back.

---

**How do I accomplish this?**

After each conversation this week, rate the connection quality on a scale of 1-5. Note whether you were fully present or distracted. Compare the ratings — you will see a clear pattern. Conversations where you truly listened will consistently score higher, reinforcing the habit with real evidence.` },
        { title: 'Read or watch one resource on active listening techniques this month', done: false,
          description: `**Why does this matter?**

Learning from experts accelerates your growth. There are techniques — mirroring, labelling emotions, strategic silence — that you may not discover through practice alone. Even one good resource can give you tools that transform your conversations.

---

**How do I accomplish this?**

Search for a highly-rated book, podcast episode, or video on active listening. Good starting points include resources on motivational interviewing, counselling fundamentals, or negotiation communication. Dedicate one hour this month to learning, then immediately practise one new technique in your next conversation.` },
      ],
    },
    {
      title: 'Identify and reconcile at least one broken or strained relationship this month',
      priority: 'high', tags: ['reconciliation', 'sulh'],
      description: 'The Prophet (SAW) said: "It is not permissible for a Muslim to forsake his brother for more than three days." Broken relationships weigh on the heart, harden it, and block blessings. Reconciliation — even when you were wronged — is one of the highest acts of character in Islam.',
      subtasks: [
        { title: 'List relationships that are currently strained, broken, or distant', done: false,
          description: `**Why does this matter?**

You cannot reconcile what you have not acknowledged. Writing down strained relationships forces you to confront the reality of disconnection and moves reconciliation from a vague intention to a concrete action item.

---

**How do I accomplish this?**

Sit quietly and think through your family, friends, colleagues, and community members. Write the name of every person with whom things are not right — whether through conflict, neglect, or slow drift. Be honest; include relationships you have been avoiding thinking about. This list is your starting point.` },
        { title: 'Choose one relationship to prioritise for reconciliation this month', done: false,
          description: `**Why does this matter?**

Trying to fix everything at once leads to paralysis. Choosing one relationship focuses your energy and increases the likelihood of meaningful progress. One successful reconciliation also builds the confidence and skill to tackle others.

---

**How do I accomplish this?**

Review your list and select the relationship that weighs most heavily on your heart, or the one where reconciliation is most achievable. Consider factors like proximity, the severity of the rift, and whether the other person might be receptive. Commit to this one relationship for the next 30 days.` },
        { title: 'Reflect honestly on your role in the breakdown — make istighfar if needed', done: false,
          description: `**Why does this matter?**

It is human nature to see yourself as the victim in every conflict. Honest self-reflection often reveals that you contributed to the breakdown — through words, neglect, pride, or misunderstanding. Acknowledging your role is the foundation of genuine reconciliation.

---

**How do I accomplish this?**

Before reaching out, spend time in honest self-examination. Ask yourself: What did I do or fail to do? Did I listen, or did I dismiss? Was I fair, or was I harsh? If you find fault in yourself, make sincere istighfar and be prepared to acknowledge your part when you reach out. This is not weakness — it is the strength of prophetic character.` },
        { title: 'Reach out with humility — a call, visit, or sincere message', done: false,
          description: `**Why does this matter?**

The first move is always the hardest, and the one who initiates reconciliation earns the greater reward regardless of who was at fault. A humble, sincere outreach can melt years of resentment and reopen doors you thought were permanently closed.

---

**How do I accomplish this?**

Choose the medium that feels most personal — a face-to-face visit is best, followed by a phone call, then a heartfelt message. Keep it simple: express that you value the relationship, acknowledge any wrongdoing on your part, and express your desire to move forward. Do not demand an apology or relitigate the past. Your job is to open the door; let Allah handle the rest.` },
        { title: 'Focus on restoring basic goodwill, not necessarily resolving every issue at once', done: false,
          description: `**Why does this matter?**

Reconciliation does not mean resolving every disagreement — it means restoring basic goodwill, respect, and willingness to engage. Trying to solve everything in one conversation often reignites conflict. Small, steady steps rebuild trust more effectively than grand resolutions.

---

**How do I accomplish this?**

Set realistic expectations: your goal is to move from hostility or silence to basic warmth and communication. Start with simple gestures — a greeting, a shared meal, a brief check-in. Let the relationship rebuild naturally over time. If deeper issues need addressing, schedule those conversations once the foundation of goodwill is restored.` },
      ],
    },
  ],
  life_social_excellence: [
    {
      title: 'Mentor a younger Muslim in character development and professional or spiritual growth',
      priority: 'medium', tags: ['mentorship', 'dawah'],
      description: 'The Prophet (SAW) invested deeply in individual mentorship — his companionship with Abu Bakr, his guidance of Ali, his nurturing of Anas. Mentoring a younger Muslim passes on hard-won wisdom, multiplies your impact, and fulfils the obligation of mutual enjoining of good (amr bil maruf).',
      subtasks: [
        { title: 'Identify a younger Muslim in your community, workplace, or family who could benefit from mentorship', done: false,
          description: `**Why does this matter?**

Every generation needs guides who have walked the path before them. Without mentorship, younger Muslims navigate career, character, and spiritual challenges alone — often making avoidable mistakes. Your experience, even if imperfect, is exactly what someone needs right now.

---

**How do I accomplish this?**

Look around your immediate circles: the mosque, your workplace, your extended family, or community programmes. Notice who is at a transition point — starting university, entering the workforce, newly married, or struggling with direction. Approach them naturally, not with a formal "I want to mentor you" speech, but with genuine interest in their life and a willingness to be available.` },
        { title: 'Initiate the relationship naturally — regular check-ins over coffee, walks, or shared activities', done: false,
          description: `**Why does this matter?**

Forced mentorship feels like a lecture. The most transformative mentoring relationships are built on natural, relaxed interactions where wisdom is exchanged through conversation, shared experience, and genuine companionship — just as the Sahaba learned from the Prophet (SAW) by being with him.

---

**How do I accomplish this?**

Suggest a low-pressure activity: coffee, a walk after Jumuah, helping them with a project, or attending a community event together. Let conversations flow naturally rather than following a curriculum. Be consistent with your invitations — showing up regularly communicates that you genuinely care, not that you are fulfilling an obligation.` },
        { title: 'Listen first to understand their challenges, goals, and aspirations', done: false,
          description: `**Why does this matter?**

Effective mentorship starts with understanding, not advice. If you jump straight to sharing your wisdom without understanding their world, your guidance will miss the mark. Listening first earns trust and ensures your input is relevant and welcome.

---

**How do I accomplish this?**

In your early conversations, ask open-ended questions: "What are you working toward right now?" "What is your biggest challenge?" "What do you wish someone had told you a year ago?" Listen fully before responding. Take mental notes of recurring themes. Only offer advice when asked, or when you see a clear connection between their challenge and your experience.` },
        { title: 'Share relevant experiences, lessons, and resources without being preachy', done: false,
          description: `**Why does this matter?**

Young people tune out lectures but absorb stories. Sharing your own mistakes, failures, and hard-won lessons in a vulnerable, relatable way is far more impactful than dispensing advice from a position of authority. Authenticity builds trust; preachiness destroys it.

---

**How do I accomplish this?**

When a topic arises where you have relevant experience, share it as a story, not a directive: "I went through something similar and here is what I learned..." Include your mistakes and what you wish you had done differently. Recommend books, podcasts, or people who helped you — but limit to one or two suggestions at a time. Let them ask for more rather than overwhelming them.` },
        { title: 'Meet consistently — at least monthly — and follow up on previous conversations', done: false,
          description: `**Why does this matter?**

Consistency is what separates mentorship from a one-off conversation. Meeting regularly shows that you are invested in their growth, and following up on previous topics demonstrates that you actually listen and remember — which deepens the trust exponentially.

---

**How do I accomplish this?**

Set a recurring date — the first Sunday of each month, every other Friday after Maghrib, whatever works for both of you. At each meeting, reference something from the last conversation: "Last time you mentioned you were applying for that role — how did it go?" This continuity transforms casual catch-ups into a meaningful mentoring journey.` },
      ],
    },
    {
      title: 'Represent Islam publicly through excellence in conduct — let your character be your dawah',
      priority: 'medium', tags: ['dawah', 'character'],
      description: 'The greatest dawah is not a speech or a pamphlet — it is your character. When non-Muslims see a Muslim who is honest, generous, patient, and excellent in their work, it speaks louder than any argument. This task is about being intentionally excellent in public-facing interactions as an act of worship.',
      subtasks: [
        { title: 'Identify 3 public-facing contexts where you interact with non-Muslims regularly', done: false,
          description: `**Why does this matter?**

You cannot be intentional about something you have not identified. Mapping the contexts where you regularly interact with non-Muslims allows you to turn everyday interactions into deliberate acts of dawah through excellence.

---

**How do I accomplish this?**

Think through your weekly routine: your workplace, your neighbourhood, the school gate, local shops, the gym, community events. Write down three specific contexts where you interact with non-Muslims regularly. For each, note what impression you currently leave and what excellence would look like in that setting.` },
        { title: 'In each context, aim for measurably excellent conduct — extra courtesy, reliability, generosity', done: false,
          description: `**Why does this matter?**

Vague intentions to "be a good Muslim in public" rarely translate into action. Measurable excellence — going above and beyond what is expected — creates memorable impressions that people associate with your faith.

---

**How do I accomplish this?**

For each of your three contexts, set one specific excellence target this month. At work: deliver every project ahead of deadline. In your neighbourhood: be the first to offer help when someone is moving, shovelling, or struggling. At the school gate: greet every parent warmly and remember their names. Track your follow-through and raise the bar each month.` },
        { title: 'Handle complaints, conflicts, or rudeness with prophetic composure and grace', done: false,
          description: `**Why does this matter?**

Anyone can be pleasant when things are going well. The true test of character — and the most powerful dawah — is how you respond when someone is rude, unfair, or hostile. The Prophet (SAW) met hostility with dignity, and many hearts were opened through his composure.

---

**How do I accomplish this?**

When faced with rudeness or conflict in a public setting, take a breath before responding. Speak calmly, lower your voice rather than raising it, and seek resolution rather than victory. If someone is rude to you because of your faith, respond with warmth and facts rather than defensiveness. Afterwards, reflect on how you handled it and what you would improve.` },
        { title: 'Be willing to explain Islamic practices when asked, with warmth and confidence', done: false,
          description: `**Why does this matter?**

When your excellent conduct sparks curiosity, people will ask about your faith. Being able to explain your practices — fasting, prayer, hijab, dietary choices — with warmth and confidence turns a casual question into a moment of genuine connection and understanding.

---

**How do I accomplish this?**

Prepare simple, warm explanations for the practices people most commonly ask about: "I pray five times a day — it is like a reset button that keeps me grounded." "Ramadan is our month of fasting — it teaches gratitude and self-discipline." Practise saying these out loud so they feel natural. Welcome questions with a smile rather than treating them as intrusions.` },
        { title: 'Reflect monthly on whether your public conduct would make the Prophet (SAW) proud', done: false,
          description: `**Why does this matter?**

Without regular reflection, even the best intentions fade into routine. Asking whether your conduct would make the Prophet (SAW) proud is the highest standard of self-assessment — it keeps your niyyah (intention) aligned and your actions sharp.

---

**How do I accomplish this?**

At the end of each month, set aside 15 minutes for honest reflection. Review your three public-facing contexts: Did you show excellence? How did you handle conflict? Were you generous, patient, and truthful? Write down one thing you did well and one thing to improve. Make dua for consistency and sincerity in your public witness.` },
      ],
    },
    {
      title: 'Establish or join a circle of accountability (muhasaba group) with trusted peers',
      priority: 'low', tags: ['muhasaba', 'community'],
      description: 'Iron sharpens iron. A muhasaba circle is a small group of trusted Muslim peers who meet regularly to hold each other accountable in deen, character, and goals. This practice was modelled by the Sahaba and remains one of the most effective tools for sustained spiritual and personal growth.',
      subtasks: [
        { title: 'Identify 2-4 trusted, like-minded Muslim peers who share your commitment to growth', done: false,
          description: `**Why does this matter?**

The quality of your muhasaba circle determines its effectiveness. You need peers who are serious about their own growth, trustworthy with sensitive information, and willing to both give and receive honest feedback. The wrong group becomes a social gathering; the right group becomes a lifeline.

---

**How do I accomplish this?**

Think of Muslim brothers or sisters who consistently demonstrate commitment to their deen and personal development. They should be people you respect, feel safe with, and who challenge you. Approach them individually, share your vision for a muhasaba circle, and gauge their interest and commitment before forming the group.` },
        { title: 'Propose the concept and agree on a format: weekly or bi-weekly, in person or virtual', done: false,
          description: `**Why does this matter?**

Without a clear format agreed upon upfront, groups quickly lose momentum. Defining the logistics — frequency, duration, location, and structure — before the first session sets expectations and prevents the drift that kills most informal groups within weeks.

---

**How do I accomplish this?**

Draft a simple one-page proposal: purpose of the group, suggested frequency (bi-weekly is often sustainable), duration (60-90 minutes), and whether meetings will be in person, virtual, or a mix. Share it with your potential members and invite feedback. Agree on a format that works for everyone and set the first three meeting dates immediately.` },
        { title: 'Establish ground rules: confidentiality, honesty, no judgement, constructive feedback only', done: false,
          description: `**Why does this matter?**

Trust is the currency of accountability. Without explicit ground rules, people hold back out of fear of judgement or gossip. Clear agreements on confidentiality and constructive feedback create the psychological safety needed for genuine vulnerability and growth.

---

**How do I accomplish this?**

At your first session, discuss and agree on ground rules together. Essential ones include: everything shared stays in the group; we speak with honesty and compassion; we do not judge or lecture; feedback is constructive and requested, not imposed. Write these down and revisit them if anyone feels they are being violated. The group is only as strong as its trust.` },
        { title: 'Structure each session: check-in on goals, share struggles, make dua for each other', done: false,
          description: `**Why does this matter?**

A structured session ensures the group stays focused and everyone gets equal time. Without structure, meetings tend to be dominated by one or two voices, or they wander into casual conversation and lose their transformative potential.

---

**How do I accomplish this?**

Use a simple three-part structure: (1) Each member shares a brief update on goals set at the previous session — what went well, what did not. (2) Open floor for sharing current struggles, seeking advice, or requesting accountability on a specific area. (3) Close with each member making dua for the person next to them. Keep time so everyone gets equal space.` },
        { title: 'Rotate facilitation so no single person carries the burden of leading every session', done: false,
          description: `**Why does this matter?**

When one person always leads, they carry a disproportionate burden and the group becomes dependent on them. Rotating facilitation distributes ownership, develops leadership in every member, and ensures the group survives if any one person is unavailable.

---

**How do I accomplish this?**

Assign facilitation on a rotating schedule — each member leads one session in turn. The facilitator is responsible for opening the session, keeping time, ensuring everyone speaks, and closing with dua. Create a simple facilitation guide so every member feels confident when their turn comes. Review the rotation quarterly and adjust as needed.` },
        { title: 'Evaluate the group dynamic after 3 months and adjust format as needed', done: false,
          description: `**Why does this matter?**

No format is perfect from the start. A three-month evaluation gives the group enough time to find its rhythm, but catches problems before they become entrenched. Groups that never evaluate stagnate; groups that evaluate and adapt become long-lasting sources of growth.

---

**How do I accomplish this?**

At the three-month mark, dedicate an entire session to evaluation. Ask each member: What is working well? What is not? Are you growing? Do you feel safe? Is the format sustainable? Collect honest feedback, discuss openly, and make concrete changes — whether that means adjusting frequency, structure, communication style, or even membership. Then set the next evaluation date.` },
      ],
    },
  ],
};
