# Review — one blended description per Divine Name

**Phase:** review · **Status:** review · **Date:** 2026-08-19
**Scope:** all 114 module attributes across `MODULE_ATTRS` (96) and `BBOS_STAGE_ISLAMIC` (18)

---

## What changed

The Attribute card used to render two paragraphs: the registry **gloss** (the canonical
definition of the Name) above the module **application** (what the Name asks of that module).
79 of 114 applications — including **all 18** BBOS ones — opened by restating the Name, so the
two paragraphs said the same thing twice.

Each module attribute now carries **one** authored `description` that leads with the
application and folds the definition in as a subordinate clause. The card renders that one
paragraph plus the source chip. The registry `gloss` is unchanged and remains the canonical
definition of record — it is simply no longer rendered beside a paragraph that repeats it.

**What to check in this document:** each blend below sits directly above the gloss it is meant
to have absorbed. Read the pair. If the blend has drifted from the gloss, oversimplified it, or
dropped it entirely, flag that entry by `nameKey`.

## Guardrails now in force

| Guardrail | Where |
|---|---|
| Description ≤ 320 ch | `scripts/lint-divine-names.mjs`, `divine-names.test.js` |
| Description must contain its own Name (diacritic-folded) — proves the definition was folded in, not dropped | same |
| No literal `name` / `name_ar` / `title` / `gloss` / `body` / `source` in module data | same |
| Every `nameKey` resolves; every registry entry carries a schema-valid attestation | same |

Longest description: **284 ch** · average: **265 ch** (budget 320).

## Carried forward — resolved 2026-08-20

**Aṭ-Ṭāhir is not an established Name of Allah — and is no longer used.** On your instruction the
environment/waste module was re-pointed to **Aṭ-Ṭayyib** (*Sahih Muslim* 1015), and the `at-tahir`
registry entry was **deleted**: with its last consumer gone, an unattested Name sitting inside a
registry of Divine Names is the very thing the `needsReview` flag was describing. The registry now
holds **106** entries (99 of the ninety-nine + 7 off-list). Entry 92 below is the rewritten one.

---

## Pillar & workspace modules

### `work`

**1. Al-Muḥsin** المحسن — *The Doer of Excellence*  
<sub>`MODULE_ATTRS.work` · `al-muhsin` · 223 ch · **off-list**</sub>

> Work done with ihsan carries a quality beyond its specification — completed as though God sees it, because He does. That standard is Al-Muḥsin's own: He does everything with perfect care, and prescribes the same care of us.

- **Gloss (canonical, not rendered):** He does everything with perfect care and prescribes the same care in everything we do.
- **Attested:** Sahih Muslim 1955 — "Indeed Allah has prescribed excellence in all things." · Qarina / contextual

**2. Al-Wakīl** الوكيل — *The Trustee*  
<sub>`MODULE_ATTRS.work` · `al-wakil` · 253 ch</sub>

> You do the work with excellence; what it produces is not yours to determine. Outcomes are the department of Al-Wakīl, who disposes of a matter handed to Him better than you could — which makes trust not passivity but the freedom to work without anxiety.

- **Gloss (canonical, not rendered):** Hand Him the matter and He disposes of it better than you could — outcomes are His department.
- **Attested:** Quran 3:173 — "Sufficient for us is Allah, and He is the best Disposer of affairs." · Bayyinah / direct

### `money`

**3. Ar-Razzāq** الرزاق — *The Provider*  
<sub>`MODULE_ATTRS.money` · `ar-razzaq` · 273 ch</sub>

> Financial stewardship means managing what has been entrusted, not hoarding what you fear losing. Ar-Razzāq provides for every living thing — the ant in the ground and the fish in the deep are on the same register — so earn with effort and trust that sufficiency is decreed.

- **Gloss (canonical, not rendered):** Every living thing is provided for by Him — the ant in the ground and the fish in the deep are on the same register.
- **Attested:** Quran 51:58 — "Indeed, it is Allah who is the Provider, the firm possessor of strength." · Bayyinah / direct

**4. Al-Ḥasīb** الحسيب — *The Reckoner*  
<sub>`MODULE_ATTRS.money` · `al-hasib` · 228 ch</sub>

> Honest reckoning in finances is worship, not merely good practice. Every number must tell the truth because Al-Ḥasīb already knows it — He keeps the full account of every act, and nothing is lost from that record or added to it.

- **Gloss (canonical, not rendered):** He keeps the full account of every act — nothing is lost from the record and nothing is added to it.
- **Attested:** Quran 4:6 — "And sufficient is Allah as Accountant." · Bayyinah / direct

### `people`

**5. Al-Wadūd** الودود — *The Ever-Loving*  
<sub>`MODULE_ATTRS.people` · `al-wadud` · 255 ch</sub>

> Leading people means caring for their growth before their output and seeing their potential before their performance gaps. That is the love of Al-Wadūd, warm and steady and inexhaustible — it does not switch off when a person slips, and it precedes merit.

- **Gloss (canonical, not rendered):** His love is warm, steady and inexhaustible — it does not switch off when a person slips.
- **Attested:** Quran 85:14 — "And He is the Forgiving, the Affectionate." · Bayyinah / direct

**6. Al-ʿAdl** العدل — *The Utterly Just*  
<sub>`MODULE_ATTRS.people` · `al-adl` · 275 ch</sub>

> Fair treatment of every team member — in compensation, recognition and opportunity — is not generosity but the minimum standard of stewardship. Al-ʿAdl gives no one less than their due and wrongs no one by His decree; justice without partiality is the floor, not the ceiling.

- **Gloss (canonical, not rendered):** Perfectly fair — He gives no one less than their due, and no one is wronged by His decree.
- **Attested:** Jami' at-Tirmidhi 3507 — "The Judge, the Just." · Qarina / direct

### `office`

**7. As-Samīʿ** السميع — *The All-Hearing*  
<sub>`MODULE_ATTRS.office` · `as-sami` · 268 ch</sub>

> True communication begins with listening: before you speak, write or decide, have you actually heard what others are saying? As-Samīʿ receives every sound, whisper and unspoken plea — nothing is ever mislaid on Him, which is the standard your own attention answers to.

- **Gloss (canonical, not rendered):** Every sound, whisper and unspoken plea reaches Him — no prayer is ever mislaid.
- **Attested:** Quran 2:127 — "Our Lord, accept this from us. Indeed, You are the All-Hearing, the All-Knowing." · Bayyinah / direct

**8. Al-ʿAlīm** العليم — *The All-Knowing*  
<sub>`MODULE_ATTRS.office` · `al-alim` · 267 ch</sub>

> Organizational knowledge means documenting the truth, sharing information honestly, and never using what you know as power over others. Al-ʿAlīm knows the hidden and the manifest alike — past, present, what has not happened yet, and the thoughts you have told no one.

- **Gloss (canonical, not rendered):** He knows everything — past, present, what has not happened yet, and the thoughts you have told no one.
- **Attested:** Quran 2:32 — "Indeed, it is You who is the All-Knowing, the All-Wise." · Bayyinah / direct

### `tech`

**9. Al-Muhaymin** المهيمن — *The Guardian Overseer*  
<sub>`MODULE_ATTRS.tech` · `al-muhaymin` · 248 ch</sub>

> Technical stewardship guards systems, data and infrastructure as amanah — every security measure is care over what was entrusted to you. Al-Muhaymin keeps that same watch at a scale you cannot: nothing occurs outside His seeing and His safekeeping.

- **Gloss (canonical, not rendered):** He watches over everything and holds it in view — nothing occurs outside His seeing and safekeeping.
- **Attested:** Quran 59:23 — "The Giver of Security, the Guardian, the Almighty." · Bayyinah / direct

**10. Al-Ḥafīẓ** الحفيظ — *The Preserver*  
<sub>`MODULE_ATTRS.tech` · `al-hafiz` · 259 ch</sub>

> In technology this means protecting user data, maintaining system integrity, and building for durability rather than disposability. Al-Ḥafīẓ keeps what is entrusted to Him and loses nothing He guards — preservation is His attribute before it is your practice.

- **Gloss (canonical, not rendered):** He keeps and protects what is entrusted to Him — nothing He guards is ever lost.
- **Attested:** Quran 11:57 — "Indeed, my Lord is, over all things, a Preserver." · Bayyinah / direct

### `collective`

**11. Al-Khāliq** الخالق — *The Creator*  
<sub>`MODULE_ATTRS.collective` · `al-khaliq` · 277 ch</sub>

> Every acre, every watershed, every soil microbiome exists by His design, and to steward land is to serve as khalīfah over what He made rather than as owner. Al-Khāliq brings all of it into being out of nothing — stars, oceans and people exist because He determined they should.

- **Gloss (canonical, not rendered):** He brings everything into being out of nothing — stars, oceans and people exist because He determined they should.
- **Attested:** Quran 59:24 — "He is Allah, the Creator, the Originator, the Fashioner." · Bayyinah / direct

**12. Ar-Razzāq** الرزاق — *The Provider*  
<sub>`MODULE_ATTRS.collective` · `ar-razzaq` · 268 ch</sub>

> A faith-rooted land project plants with effort, tends with care, and knows the yield belongs to Him. Ar-Razzāq provides through the earth itself — rain becomes river, seed becomes harvest, land becomes sustenance — and every living thing on it is on the same register.

- **Gloss (canonical, not rendered):** Every living thing is provided for by Him — the ant in the ground and the fish in the deep are on the same register.
- **Attested:** Quran 51:58 — "Indeed, it is Allah who is the Provider, the firm possessor of strength." · Bayyinah / direct

### `faith`

**13. Al-Mutakabbir** المتكبر — *The Supremely Great*  
<sub>`MODULE_ATTRS.faith` · `al-mutakabbir` · 270 ch</sub>

> Pride corrupts Faith not through dramatic arrogance but through interior distortions: worship performed for recognition, devotion measured against others, knowledge approached as acquisition. Al-Mutakabbir dissolves them — greatness belongs to Him alone, as plain truth.

- **Gloss (canonical, not rendered):** Greatness that belongs to Him alone — the one being for whom supremacy is plain truth rather than arrogance.
- **Attested:** Quran 59:23 — "The Almighty, the Compeller, the Supreme." · Bayyinah / direct

**14. Al-Wakīl** الوكيل — *The Trustee*  
<sub>`MODULE_ATTRS.faith` · `al-wakil` · 269 ch</sub>

> Doubt erodes Faith less through intellectual objection than through the refusal to release outcomes; the operator who acts but cannot let go is still holding what should be entrusted. Al-Wakīl disposes of a matter handed to Him better than you could — outcomes are His.

- **Gloss (canonical, not rendered):** Hand Him the matter and He disposes of it better than you could — outcomes are His department.
- **Attested:** Quran 3:173 — "Sufficient for us is Allah, and He is the best Disposer of affairs." · Bayyinah / direct

### `faith-shahada`

**15. Al-Aḥad** الأحد — *The Indivisible One*  
<sub>`MODULE_ATTRS.faith-shahada` · `al-ahad` · 275 ch</sub>

> The Shahada is not one belief added to a set of beliefs — it is the collapse of every rival claim on the heart. Al-Aḥad is one in a way that cannot be divided, added to or compared with anything, so wherever something else carries the weight only Allah should, He exposes it.

- **Gloss (canonical, not rendered):** One in a way that cannot be divided, added to or compared with anything.
- **Attested:** Quran 112:1 — "Say: He is Allah, One." · Bayyinah / direct

**16. Aṣ-Ṣamad** الصمد — *The Eternal Refuge*  
<sub>`MODULE_ATTRS.faith-shahada` · `as-samad` · 240 ch</sub>

> To say the Shahada is to acknowledge that every dependency you carry — on wealth, reputation, people, outcomes — terminates properly in Him alone. Aṣ-Ṣamad is the One all turn to in need and who turns to no one: the Source, never a channel.

- **Gloss (canonical, not rendered):** Everyone turns to Him for what they need and He turns to no one — the Source, never a channel.
- **Attested:** Quran 112:2 — "Allah, the Eternal Refuge." · Bayyinah / direct

### `faith-salah`

**17. Al-Qarīb** القريب — *The Near*  
<sub>`MODULE_ATTRS.faith-salah` · `al-qarib` · 238 ch · **off-list**</sub>

> Salah does not transport you to Him; it corrects your posture toward a nearness that was never suspended. Al-Qarīb is nearer than the distance any call has to travel and needs no intermediary — the forgetting is ours, the nearness is His.

- **Gloss (canonical, not rendered):** Nearer than the distance any call has to travel — no intermediary is required to reach Him.
- **Attested:** Quran 2:186 — "And when My servants ask you concerning Me — indeed I am near." · Bayyinah / direct

**18. Al-Mujīb** المجيب — *The Responsive*  
<sub>`MODULE_ATTRS.faith-salah` · `al-mujib` · 253 ch</sub>

> Salah is not a monologue but framed supplication inside a conversation Allah promises to enter. Al-Mujīb answers every call — sometimes with what was asked for, sometimes with something better — so to pray is to believe the answer is already on its way.

- **Gloss (canonical, not rendered):** He answers every call — sometimes with what was asked for, sometimes with something better.
- **Attested:** Quran 11:61 — "Indeed, my Lord is near and responsive." · Bayyinah / direct

### `faith-zakah`

**19. Ar-Razzāq** الرزاق — *The Provider*  
<sub>`MODULE_ATTRS.faith-zakah` · `ar-razzaq` · 263 ch</sub>

> Zakah is not a tax on what you earned but a return of what was circulated through you to the chambers He designated; to give it is to admit it was never wholly yours. Ar-Razzāq is the source of every dirham in your account, as He is of every creature's provision.

- **Gloss (canonical, not rendered):** Every living thing is provided for by Him — the ant in the ground and the fish in the deep are on the same register.
- **Attested:** Quran 51:58 — "Indeed, it is Allah who is the Provider, the firm possessor of strength." · Bayyinah / direct

**20. Al-Karīm** الكريم — *The Most Generous*  
<sub>`MODULE_ATTRS.faith-zakah` · `al-karim` · 254 ch</sub>

> Give as He gives — without keeping score, without reminding the recipient, without using the gift as leverage. Al-Karīm gives without depletion and without being asked, owing the recipient nothing: the minimum fulfils the fard, and this adab perfects it.

- **Gloss (canonical, not rendered):** He gives without depletion and without being asked — generosity owing nothing to the recipient.
- **Attested:** Quran 27:40 — "Then indeed, my Lord is Self-Sufficient and Generous." · Bayyinah / direct

### `faith-siyam`

**21. Aṣ-Ṣabūr** الصبور — *The Patient*  
<sub>`MODULE_ATTRS.faith-siyam` · `as-sabur` · 257 ch</sub>

> Siyam is not primarily about food; it is an apprenticeship in the sabr of waiting — sitting with hunger, lowered expectation and delayed reward without dropping your adab. Aṣ-Ṣabūr is hurried by nothing, patient under no pressure that would make Him hasten.

- **Gloss (canonical, not rendered):** He is not hurried by anything — patience without any pressure that would make Him hasten.
- **Attested:** Sahih al-Bukhari 6099 — "No one is more patient with an offence he hears than Allah." · Qarina / contextual

**22. Ash-Shakūr** الشكور — *The Appreciative*  
<sub>`MODULE_ATTRS.faith-siyam` · `ash-shakur` · 248 ch</sub>

> Ramadan exhausts, and each restrained tongue, each held patience, each night of qiyam is caught. Ash-Shakūr rewards a small deed far beyond its size and notices effort no one else recorded — the fast offered sincerely is multiplied without measure.

- **Gloss (canonical, not rendered):** He rewards a small deed far beyond its size, and notices effort no one else recorded.
- **Attested:** Quran 35:30 — "Indeed, He is Forgiving and Appreciative." · Bayyinah / direct

### `faith-hajj`

**23. Al-Malik** الملك — *The Sovereign*  
<sub>`MODULE_ATTRS.faith-hajj` · `al-malik` · 249 ch</sub>

> Hajj strips the wealth, the title, the clothing that distinguished you, returning you to two white cloths at the miqat. Al-Malik is the only real king — every other throne is borrowed — so whatever sovereignty you thought you held is recalled there.

- **Gloss (canonical, not rendered):** The only real king — every other throne is borrowed, and the whole universe is His dominion.
- **Attested:** Quran 59:23 — "He is Allah, other than whom there is no deity, the Sovereign, the Pure." · Bayyinah / direct

**24. Al-Quddūs** القدوس — *The Absolutely Pure*  
<sub>`MODULE_ATTRS.faith-hajj` · `al-quddus` · 254 ch</sub>

> Hajj is the one worship whose form is the purification: the tawaf, the sa'y, the wuquf are not symbolic, they are the scrubbing. Al-Quddūs is free of every defect and limitation, and asks the pilgrim to arrive clear of shirk, grudges and unlawful wealth.

- **Gloss (canonical, not rendered):** Free of every defect and limitation — purity not as cleanliness but as the absence of anything to correct.
- **Attested:** Quran 59:23 — "The Sovereign, the Pure, the Source of Peace." · Bayyinah / direct

### `sources`

**25. Al-Hādī** الهادي — *The Guide*  
<sub>`MODULE_ATTRS.sources` · `al-hadi` · 242 ch</sub>

> The sources — Qur'an, Sunnah, the transmitted tradition — do not disclose themselves to a careless reader; come as a student and leave as a student. Al-Hādī grants guidance rather than letting it be navigated to, and meets the adab you bring.

- **Gloss (canonical, not rendered):** Guidance is granted by Him, not navigated to — He shows the way and He makes the heart accept it.
- **Attested:** Quran 25:31 — "And sufficient is your Lord as a Guide and a Helper." · Bayyinah / direct

**26. Al-ʿAlīm** العليم — *The All-Knowing*  
<sub>`MODULE_ATTRS.sources` · `al-alim` · 240 ch</sub>

> To open the sources is to come without the pose of knowing — neither inflating what you understand nor denying what you do not. Al-ʿAlīm knows everything you do not and everything you pretend to, including the thoughts you have told no one.

- **Gloss (canonical, not rendered):** He knows everything — past, present, what has not happened yet, and the thoughts you have told no one.
- **Attested:** Quran 2:32 — "Indeed, it is You who is the All-Knowing, the All-Wise." · Bayyinah / direct

### `faith-core`

**27. Al-Muḥyī** المحيي — *The Giver of Life*  
<sub>`MODULE_ATTRS.faith-core` · `al-muhyi` · 279 ch</sub>

> The Daruriyyat are not optional; they are the life-support of the deen, and to miss the fard is not to lose an embellishment but to let something die. Al-Muḥyī gives life — to bodies, to dead land after rain, and to hearts that had gone quiet — and meant to keep it alive in you.

- **Gloss (canonical, not rendered):** He gives life — to bodies, to dead land after rain, and to hearts that had gone quiet.
- **Attested:** Quran 30:50 — "Indeed, that [same One] will give life to the dead." · Bayyinah / direct

**28. Al-Qayyūm** القيوم — *The Self-Subsisting Sustainer*  
<sub>`MODULE_ATTRS.faith-core` · `al-qayyum` · 245 ch</sub>

> The Daruriyyat are the load-bearing members of the deen's structure: remove them and the rest gives way, so this board is not about doing more but about not letting the walls fail. Al-Qayyūm stands by Himself while everything else stands by Him.

- **Gloss (canonical, not rendered):** He stands by Himself and everything else stands by Him — creation would stop if He withdrew.
- **Attested:** Quran 2:255 — "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence." · Bayyinah / direct

### `faith-growth`

**29. Ar-Rāfiʿ** الرافع — *The Exalter*  
<sub>`MODULE_ATTRS.faith-growth` · `ar-rafi` · 268 ch</sub>

> The Hajiyyat are not fard, but they are the difference between a deen that survives and one that grows; to neglect them is not kufr but a refusal of an ascent being offered. Ar-Rāfiʿ raises whom He wills — the unnoticed are lifted by Him, not by their own positioning.

- **Gloss (canonical, not rendered):** He raises whom He wills — the unnoticed are lifted by Him, not by their own positioning.
- **Attested:** Quran 3:55 — "O Jesus, indeed I will take you and raise you to Myself." · Bayyinah / direct

**30. Al-Fattāḥ** الفتاح — *The Opener*  
<sub>`MODULE_ATTRS.faith-growth` · `al-fattah` · 279 ch</sub>

> Growth in the deen is not linear; it moves through openings — a suddenly-held adhkar, a newly-kept night, an understanding finally received. Al-Fattāḥ opens what is shut, in circumstances and in the understanding of a closed heart, so walking the Hajiyyat means to keep knocking.

- **Gloss (canonical, not rendered):** He opens what is shut — in circumstances, in provision, and in the understanding of a closed heart.
- **Attested:** Quran 34:26 — "And He is the Opener, the All-Knowing." · Bayyinah / direct

### `faith-excellence`

**31. Al-Muḥsin** المحسن — *The Doer of Excellence*  
<sub>`MODULE_ATTRS.faith-excellence` · `al-muhsin` · 230 ch · **off-list**</sub>

> The Tahsiniyyat are ornaments, but ihsan is the soul of the deen — worship Allah as though you see Him is the aim of this board. Every act of ihsan you perform is Al-Muḥsin's own perfect care operating through you when you let it.

- **Gloss (canonical, not rendered):** He does everything with perfect care and prescribes the same care in everything we do.
- **Attested:** Sahih Muslim 1955 — "Indeed Allah has prescribed excellence in all things." · Qarina / contextual

**32. Al-Jamīl** الجميل — *The Beautiful*  
<sub>`MODULE_ATTRS.faith-excellence` · `al-jamil` · 276 ch · **off-list**</sub>

> The Tahsiniyyat refine a deen already structurally sound: the adab in the greeting, the care in the wording, the quality of what is offered to guests and to worship. Al-Jamīl is beautiful in Himself and pleased by beauty — care over how a thing is made is worship, not vanity.

- **Gloss (canonical, not rendered):** Beautiful in Himself and pleased by beauty — care over how a thing is made is worship, not vanity.
- **Attested:** Sahih Muslim 91 — "Indeed Allah is Beautiful and loves beauty." · Bayyinah / direct

### `life`

**33. Al-Qawiyy** القوي — *The All-Strong*  
<sub>`MODULE_ATTRS.life` · `al-qawi` · 270 ch</sub>

> Strength here is the capacity to meet adversity without being unmade by it; its absence shows as quiet attrition, the self shrinking under demand that was never replenished. Al-Qawiyy is strength without fatigue — He does not tire, weaken or need to recover, and you do.

- **Gloss (canonical, not rendered):** Strength without fatigue — He does not tire, weaken or need to recover.
- **Attested:** Quran 22:74 — "Indeed, Allah is Powerful and Exalted in Might." · Bayyinah / direct

**34. Al-Laṭīf** اللطيف — *The Subtly Kind*  
<sub>`MODULE_ATTRS.life` · `al-latif` · 283 ch</sub>

> Its absence shows in small unattended needs accumulating: the rest not taken, the conversation not had, the inner state not named. Al-Laṭīf works through details too fine to notice, arriving exactly when needed — and asks the same perception of you, before a signal becomes a crisis.

- **Gloss (canonical, not rendered):** His care works through details too fine to notice, arriving at exactly the moment it was needed.
- **Attested:** Quran 6:103 — "Vision perceives Him not, but He perceives all vision; and He is the Subtle, the All-Aware." · Bayyinah / direct

### `health-physical`

**35. Al-Muḥyī** المحيي — *The Giver of Life*  
<sub>`MODULE_ATTRS.health-physical` · `al-muhyi` · 264 ch</sub>

> The body is not yours to drive into the ground; it is an amanah placed in your care, and to neglect it is to treat a trust as disposable. Tending it is cooperation with Al-Muḥyī, who gives life to bodies, to dead land after rain, and to hearts that had gone quiet.

- **Gloss (canonical, not rendered):** He gives life — to bodies, to dead land after rain, and to hearts that had gone quiet.
- **Attested:** Quran 30:50 — "Indeed, that [same One] will give life to the dead." · Bayyinah / direct

**36. Ash-Shāfī** الشافي — *The Healer*  
<sub>`MODULE_ATTRS.health-physical` · `ash-shafi` · 268 ch · **off-list**</sub>

> A meal, a walk, a night of sleep heal nothing on their own — they are means Ash-Shāfī either permits to reach their effect or does not, because healing comes from Him and never from the medicine. Health as self-optimization forgets Him; health as cooperation does not.

- **Gloss (canonical, not rendered):** Healing comes from Him — medicine and rest are means He put in place, never the cure itself.
- **Attested:** Sahih al-Bukhari 5675 — "O Allah, Lord of mankind, remove the harm and heal — You are the Healer." · Bayyinah / direct

### `health-mental`

**37. As-Salām** السلام — *The Source of Peace*  
<sub>`MODULE_ATTRS.health-mental` · `as-salam` · 270 ch</sub>

> An aligned mind is not one that never meets anxiety but one that returns to tranquility by remembrance rather than distraction. Peace originates in As-Salām and is given from Him — a settledness the heart cannot manufacture — so its absence is alarm that cannot resolve.

- **Gloss (canonical, not rendered):** Peace originates in Him and is given from Him — the settledness a heart cannot manufacture for itself.
- **Attested:** Quran 59:23 — "The Source of Peace, the Giver of Security, the Guardian." · Bayyinah / direct

**38. Al-Laṭīf** اللطيف — *The Subtly Kind*  
<sub>`MODULE_ATTRS.health-mental` · `al-latif` · 270 ch</sub>

> Tending your inner state means extending to yourself the gentleness He already brings to it — noticing the tremor before the tear, the tension before the thought becomes conscious. Al-Laṭīf works through details too fine to notice, arriving at exactly the moment needed.

- **Gloss (canonical, not rendered):** His care works through details too fine to notice, arriving at exactly the moment it was needed.
- **Attested:** Quran 6:103 — "Vision perceives Him not, but He perceives all vision; and He is the Subtle, the All-Aware." · Bayyinah / direct

### `health-safety`

**39. Al-Muhaymin** المهيمن — *The Guardian Overseer*  
<sub>`MODULE_ATTRS.health-safety` · `al-muhaymin` · 275 ch</sub>

> Safety is full diligence held inside tawakkul — neither paranoia nor recklessness, but prudent action whose outcome is already witnessed. No harm reaches anyone outside the seeing of Al-Muhaymin, who holds everything in view, and no protection arrives without His permission.

- **Gloss (canonical, not rendered):** He watches over everything and holds it in view — nothing occurs outside His seeing and safekeeping.
- **Attested:** Quran 59:23 — "The Giver of Security, the Guardian, the Almighty." · Bayyinah / direct

**40. Al-Ḥafīẓ** الحفيظ — *The Preserver*  
<sub>`MODULE_ATTRS.health-safety` · `al-hafiz` · 276 ch</sub>

> A locked door, a seatbelt, a careful word are asbab placed in your hand so that you participate in preservation. Al-Ḥafīẓ is the One who makes them effective, keeping what is entrusted to Him — forget Him and the checklist becomes anxiety; remember Him and it becomes worship.

- **Gloss (canonical, not rendered):** He keeps and protects what is entrusted to Him — nothing He guards is ever lost.
- **Attested:** Quran 11:57 — "Indeed, my Lord is, over all things, a Preserver." · Bayyinah / direct

### `health-social`

**41. Al-Wadūd** الودود — *The Ever-Loving*  
<sub>`MODULE_ATTRS.health-social` · `al-wadud` · 279 ch</sub>

> In social life this is the warmth extended to the stranger, the patience kept with the difficult colleague, the smile given to someone who has not earned it. Al-Wadūd loves steadily and inexhaustibly, never switching off when a person slips; its absence makes every tie a ledger.

- **Gloss (canonical, not rendered):** His love is warm, steady and inexhaustible — it does not switch off when a person slips.
- **Attested:** Quran 85:14 — "And He is the Forgiving, the Affectionate." · Bayyinah / direct

**42. Al-Muḥsin** المحسن — *The Doer of Excellence*  
<sub>`MODULE_ATTRS.health-social` · `al-muhsin` · 259 ch · **off-list**</sub>

> Ahsin kama ahsana-llahu ilayk — do good as Allah has done good to you. Al-Muḥsin does everything with perfect care and prescribes the same of us: the refusal to meet rudeness with rudeness, to give back exactly what was given, or to carry grudges at interest.

- **Gloss (canonical, not rendered):** He does everything with perfect care and prescribes the same care in everything we do.
- **Attested:** Sahih Muslim 1955 — "Indeed Allah has prescribed excellence in all things." · Qarina / contextual

### `intellect`

**43. Al-Fattāḥ** الفتاح — *The Opener*  
<sub>`MODULE_ATTRS.intellect` · `al-fattah` · 272 ch</sub>

> Its absence here is not ignorance but closure: approaching learning already knowing what you will find, engaging ideas only to confirm prior positions, mistaking familiarity for mastery. Al-Fattāḥ opens what is shut, including the understanding of a heart that has closed.

- **Gloss (canonical, not rendered):** He opens what is shut — in circumstances, in provision, and in the understanding of a closed heart.
- **Attested:** Quran 34:26 — "And He is the Opener, the All-Knowing." · Bayyinah / direct

**44. Al-ʿAlīm** العليم — *The All-Knowing*  
<sub>`MODULE_ATTRS.intellect` · `al-alim` · 276 ch</sub>

> Knowledge is a trust to steward rather than a resource to acquire; the wrong relationship with it corrupts through accumulation without application, sharing without accountability, criticism without humility. Al-ʿAlīm knows all of it — including thoughts you have told no one.

- **Gloss (canonical, not rendered):** He knows everything — past, present, what has not happened yet, and the thoughts you have told no one.
- **Attested:** Quran 2:32 — "Indeed, it is You who is the All-Knowing, the All-Wise." · Bayyinah / direct

### `intellect-learning`

**45. Al-ʿAlīm** العليم — *The All-Knowing*  
<sub>`MODULE_ATTRS.intellect-learning` · `al-alim` · 261 ch</sub>

> To seek knowledge is not to manufacture it but to receive what He has permitted of a knowledge already complete in Al-ʿAlīm, who knows past, present and what has not yet happened. Its absence is learning that accumulates as ego — achievement rather than amanah.

- **Gloss (canonical, not rendered):** He knows everything — past, present, what has not happened yet, and the thoughts you have told no one.
- **Attested:** Quran 2:32 — "Indeed, it is You who is the All-Knowing, the All-Wise." · Bayyinah / direct

**46. Al-Khabīr** الخبير — *The All-Aware*  
<sub>`MODULE_ATTRS.intellect-learning` · `al-khabir` · 265 ch</sub>

> Learning pushes past the shallow grasp toward the real structure of a thing — the cause behind the effect, the principle behind the instance. Al-Khabīr knows that inner reality of everything, including the motive underneath an action you have explained differently.

- **Gloss (canonical, not rendered):** He knows the inner reality of things, including the motive underneath an action you have explained differently.
- **Attested:** Quran 6:103 — "And He is the Subtle, the All-Aware." · Bayyinah / direct

### `intellect-thinking`

**47. Al-Ḥakīm** الحكيم — *The All-Wise*  
<sub>`MODULE_ATTRS.intellect-thinking` · `al-hakim` · 278 ch</sub>

> Wisdom is not raw intelligence but the discernment of what is fitting here, now, for this person; its absence is sharp reasoning serving small ends. Al-Ḥakīm holds a reason for every decree in perfect wisdom, disclosed or not — never an answer out of proportion to its question.

- **Gloss (canonical, not rendered):** Every decree has a reason held in perfect wisdom, whether or not the reason is disclosed to us.
- **Attested:** Quran 2:32 — "Indeed, it is You who is the All-Knowing, the All-Wise." · Bayyinah / direct

**48. Al-Baṣīr** البصير — *The All-Seeing*  
<sub>`MODULE_ATTRS.intellect-thinking` · `al-basir` · 279 ch</sub>

> To think well is to refuse the surface story and keep looking until what is actually the case comes into view. The sight of Al-Baṣīr reaches what no observer, instrument or record could — so accepting a convenient narrative because examining it would cost something fools no one.

- **Gloss (canonical, not rendered):** Nothing you do is hidden from Him — His sight reaches what no observer, instrument or record could.
- **Attested:** Quran 42:11 — "There is nothing like unto Him, and He is the All-Hearing, the All-Seeing." · Bayyinah / direct

### `intellect-cognitive`

**49. Al-Muhaymin** المهيمن — *The Guardian Overseer*  
<sub>`MODULE_ATTRS.intellect-cognitive` · `al-muhaymin` · 277 ch</sub>

> Your attention is a resource He gave you, and what you let in through it becomes what you become; a mind that accepts whatever is placed in front of it outsources its formation to the nearest feed. Al-Muhaymin holds everything in view — guard the mind as He guards what is His.

- **Gloss (canonical, not rendered):** He watches over everything and holds it in view — nothing occurs outside His seeing and safekeeping.
- **Attested:** Quran 59:23 — "The Giver of Security, the Guardian, the Almighty." · Bayyinah / direct

**50. Al-Ḥafīẓ** الحفيظ — *The Preserver*  
<sub>`MODULE_ATTRS.intellect-cognitive` · `al-hafiz` · 272 ch</sub>

> Attention is among the most valuable amanāt — what you trade for everything else in your life — so preserving it is stewardship of a finite, sacred capacity, not a productivity technique. Al-Ḥafīẓ loses nothing He guards; a shattered attention still believes it functions.

- **Gloss (canonical, not rendered):** He keeps and protects what is entrusted to Him — nothing He guards is ever lost.
- **Attested:** Quran 11:57 — "Indeed, my Lord is, over all things, a Preserver." · Bayyinah / direct

### `intellect-professional`

**51. Al-Muṣawwir** المصور — *The Fashioner of Forms*  
<sub>`MODULE_ATTRS.intellect-professional` · `al-musawwir` · 268 ch</sub>

> In craft, skill is not competence but the shaping of a thing into the form it was meant to take. Al-Muṣawwir gives every created thing its own shape, face and colour — form is assigned, never accidental — and its absence leaves work that functions without being right.

- **Gloss (canonical, not rendered):** He gives each created thing its own shape, face and colour — form is assigned, never accidental.
- **Attested:** Quran 59:24 — "The Creator, the Originator, the Fashioner." · Bayyinah / direct

**52. Al-Bāri'** البارئ — *The Originator*  
<sub>`MODULE_ATTRS.intellect-professional` · `al-bari` · 272 ch</sub>

> Mastery is not producing a copy of someone else's excellence but bringing into being the contribution only you, with your training and your niyyah, can bring. Al-Bāri' originates without copying a model — every creature is a first — and competent imitation is not mastery.

- **Gloss (canonical, not rendered):** He originates without copying a model — every creature is a first, not a variation on an existing design.
- **Attested:** Quran 59:24 — "The Creator, the Originator, the Fashioner." · Bayyinah / direct

### `family`

**53. Al-Wadūd** الودود — *The Ever-Loving*  
<sub>`MODULE_ATTRS.family` · `al-wadud` · 276 ch</sub>

> In the family this is the love that precedes approval — the parent who loves the child before the child earns it, the spouse who loves before the spouse deserves it. Al-Wadūd loves inexhaustibly, never switching off when a person slips; its absence makes belonging a purchase.

- **Gloss (canonical, not rendered):** His love is warm, steady and inexhaustible — it does not switch off when a person slips.
- **Attested:** Quran 85:14 — "And He is the Forgiving, the Affectionate." · Bayyinah / direct

**54. Ar-Raḥmān** الرحمن — *The Most Gracious*  
<sub>`MODULE_ATTRS.family` · `ar-rahman` · 263 ch</sub>

> To lead a household in rahmah is to default to compassion before correction, assume the best before demanding proof, and make the home a place where weakness is not weaponized. The kindness of Ar-Raḥmān falls on those who thank Him and those who forget Him alike.

- **Gloss (canonical, not rendered):** His kindness reaches every creature — sun, rain and sustenance fall on those who thank Him and those who forget Him alike.
- **Attested:** Quran 55:1 — "The Most Gracious." · Bayyinah / direct

### `family-marriage`

**55. Al-Wadūd** الودود — *The Ever-Loving*  
<sub>`MODULE_ATTRS.family-marriage` · `al-wadud` · 280 ch</sub>

> Marriage is the most public school of wadud: loving through the days that earn love and the days that do not. The nikah binds the covenant; the steady, inexhaustible love of Al-Wadūd — which does not switch off when a person slips — is what makes it habitable rather than audited.

- **Gloss (canonical, not rendered):** His love is warm, steady and inexhaustible — it does not switch off when a person slips.
- **Attested:** Quran 85:14 — "And He is the Forgiving, the Affectionate." · Bayyinah / direct

**56. As-Salām** السلام — *The Source of Peace*  
<sub>`MODULE_ATTRS.family-marriage` · `as-salam` · 271 ch</sub>

> A marriage aligned with peace is one where neither spouse fears the other, tongues are kept, and silence is not punishment. Litaskunū ilayhā — that you may find tranquility in her — is the aim, and that settledness originates in As-Salām, never manufactured by the heart.

- **Gloss (canonical, not rendered):** Peace originates in Him and is given from Him — the settledness a heart cannot manufacture for itself.
- **Attested:** Quran 59:23 — "The Source of Peace, the Giver of Security, the Guardian." · Bayyinah / direct

### `family-parenting`

**57. Ar-Rabb** الرب — *The Nurturing Lord*  
<sub>`MODULE_ATTRS.family-parenting` · `ar-rabb` · 256 ch · **off-list**</sub>

> To parent is to grow a soul, not shape a product — accepting that tarbiyah unfolds in seasons that will not match the calendar of your convenience. Ar-Rabb is owner, sustainer and raiser at once: He does not only possess creation, He brings it to maturity.

- **Gloss (canonical, not rendered):** Owner, sustainer and raiser all at once — He does not only possess creation, He brings it to maturity.
- **Attested:** Quran 1:2 — "All praise is due to Allah, Lord of the worlds." · Bayyinah / direct

**58. Al-Ḥafīẓ** الحفيظ — *The Preserver*  
<sub>`MODULE_ATTRS.family-parenting` · `al-hafiz` · 273 ch</sub>

> Your children are an amanah before they are yours — to be guarded from what would harm them without suffocating what must grow, including harm that wears your own face when you are tired or short. Al-Ḥafīẓ keeps what is entrusted to Him, and nothing He guards is ever lost.

- **Gloss (canonical, not rendered):** He keeps and protects what is entrusted to Him — nothing He guards is ever lost.
- **Attested:** Quran 11:57 — "Indeed, my Lord is, over all things, a Preserver." · Bayyinah / direct

### `family-kinship`

**59. Al-Wakīl** الوكيل — *The Trustee*  
<sub>`MODULE_ATTRS.family-kinship` · `al-wakil` · 272 ch</sub>

> Silat al-rahim is a trust placed in you that no contract names: your role is to maintain the tie, and the result of that maintenance is returned to Him. Al-Wakīl holds the outcomes you cannot — a reconciled aunt, a returned call, a softened cousin — better than you could.

- **Gloss (canonical, not rendered):** Hand Him the matter and He disposes of it better than you could — outcomes are His department.
- **Attested:** Quran 3:173 — "Sufficient for us is Allah, and He is the best Disposer of affairs." · Bayyinah / direct

**60. Ash-Shakūr** الشكور — *The Appreciative*  
<sub>`MODULE_ATTRS.family-kinship` · `ash-shakur` · 264 ch</sub>

> A check-in call, a remembered birthday, a visit to the elder who cannot leave the house are not small to Him. Ash-Shakūr rewards a small deed far beyond its size and notices effort no one else recorded — so believe the five-minute call matters, and make it anyway.

- **Gloss (canonical, not rendered):** He rewards a small deed far beyond its size, and notices effort no one else recorded.
- **Attested:** Quran 35:30 — "Indeed, He is Forgiving and Appreciative." · Bayyinah / direct

### `family-home`

**61. As-Salām** السلام — *The Source of Peace*  
<sub>`MODULE_ATTRS.family-home` · `as-salam` · 272 ch</sub>

> A home where the nervous system can rest is quieter in its conflicts, gentler in its rhythms and safer in its tongues than the street outside; when that departs, everyone learns to brace at the door. As-Salām is where such settledness originates and from whom it is given.

- **Gloss (canonical, not rendered):** Peace originates in Him and is given from Him — the settledness a heart cannot manufacture for itself.
- **Attested:** Quran 59:23 — "The Source of Peace, the Giver of Security, the Guardian." · Bayyinah / direct

**62. Al-Quddūs** القدوس — *The Absolutely Pure*  
<sub>`MODULE_ATTRS.family-home` · `al-quddus` · 263 ch</sub>

> A home stays attentive to what crosses its threshold — what is watched, what is spoken, what is consumed — not to become sterile but to remain a place where hearts stay soft and revelation still reaches them. Al-Quddūs is pure in having nothing at all to correct.

- **Gloss (canonical, not rendered):** Free of every defect and limitation — purity not as cleanliness but as the absence of anything to correct.
- **Attested:** Quran 59:23 — "The Sovereign, the Pure, the Source of Peace." · Bayyinah / direct

### `family-office`

**63. Al-Jāmiʿ** الجامع — *The Gatherer*  
<sub>`MODULE_ATTRS.family-office` · `al-jami` · 265 ch</sub>

> The Family Office is the mechanism through which a household is gathered — its calendar, its announcements, its shared documents — so steward it to make finding each other easy, not to add one more place people get lost. Al-Jāmiʿ brings together what was scattered.

- **Gloss (canonical, not rendered):** He brings together what was scattered — people, provisions and the whole of creation on one appointed day.
- **Attested:** Quran 3:9 — "Our Lord, surely You will gather the people for a Day about which there is no doubt." · Bayyinah / direct

**64. Al-Ḥafīẓ** الحفيظ — *The Preserver*  
<sub>`MODULE_ATTRS.family-office` · `al-hafiz` · 265 ch</sub>

> The Family Office holds what matters: decisions made, agreements reached, documents the family will need again. Treat the record as an amanah rather than an inbox, in the manner of Al-Ḥafīẓ, who keeps what is entrusted to Him so that nothing He guards is ever lost.

- **Gloss (canonical, not rendered):** He keeps and protects what is entrusted to Him — nothing He guards is ever lost.
- **Attested:** Quran 11:57 — "Indeed, my Lord is, over all things, a Preserver." · Bayyinah / direct

### `ummah`

**65. Ar-Raḥīm** الرحيم — *The Most Merciful*  
<sub>`MODULE_ATTRS.ummah` · `ar-rahim` · 270 ch</sub>

> In the People domain raḥmah is active mercy that reaches out rather than waiting to be earned; its absence corrupts not through cruelty but through treating people as roles. Ar-Raḥīm sustains that mercy toward those who try — nearer than earned, always ready to forgive.

- **Gloss (canonical, not rendered):** A particular, sustained mercy toward those who believe and try — nearer than they have earned, always ready to forgive.
- **Attested:** Quran 1:3 — "The Most Gracious, the Most Merciful." · Bayyinah / direct

**66. Al-Jāmiʿ** الجامع — *The Gatherer*  
<sub>`MODULE_ATTRS.ummah` · `al-jami` · 270 ch</sub>

> This is not uniformity but the orientation toward a shared centre that makes difference generative rather than fragmenting, and the operator entering here is asked whether their presence builds or disperses the social fabric. Al-Jāmiʿ brings together what was scattered.

- **Gloss (canonical, not rendered):** He brings together what was scattered — people, provisions and the whole of creation on one appointed day.
- **Attested:** Quran 3:9 — "Our Lord, surely You will gather the people for a Day about which there is no doubt." · Bayyinah / direct

### `neighbors`

**67. Al-Wadūd** الودود — *The Ever-Loving*  
<sub>`MODULE_ATTRS.neighbors` · `al-wadud` · 262 ch</sub>

> Neighbor-right is love expressed as active care for whoever Allah placed at your door; Jibrīl kept enjoining it until the Prophet ﷺ thought the neighbor would be made an heir. Al-Wadūd loves steadily, and its absence lets a family behind a wall become invisible.

- **Gloss (canonical, not rendered):** His love is warm, steady and inexhaustible — it does not switch off when a person slips.
- **Attested:** Quran 85:14 — "And He is the Forgiving, the Affectionate." · Bayyinah / direct

**68. Al-Muḥsin** المحسن — *The Doer of Excellence*  
<sub>`MODULE_ATTRS.neighbors` · `al-muhsin` · 259 ch · **off-list**</sub>

> Iḥsān in neighbor-right anticipates need rather than responding only when pressed — doing good without counting, without the neighbor having to ask. Al-Muḥsin does everything with perfect care; its absence is civility without care, presence without attention.

- **Gloss (canonical, not rendered):** He does everything with perfect care and prescribes the same care in everything we do.
- **Attested:** Sahih Muslim 1955 — "Indeed Allah has prescribed excellence in all things." · Qarina / contextual

### `community`

**69. Al-Jāmiʿ** الجامع — *The Gatherer*  
<sub>`MODULE_ATTRS.community` · `al-jami` · 278 ch</sub>

> Beyond the household and the neighbor, the question is whether your presence builds or disperses the wider jamāʿah. Al-Jāmiʿ brings together what was scattered; its absence is the drift into faction — preference becomes party, difference hardens into camp, the centre abandoned.

- **Gloss (canonical, not rendered):** He brings together what was scattered — people, provisions and the whole of creation on one appointed day.
- **Attested:** Quran 3:9 — "Our Lord, surely You will gather the people for a Day about which there is no doubt." · Bayyinah / direct

**70. Al-Walī** الولي — *The Protecting Friend*  
<sub>`MODULE_ATTRS.community` · `al-wali` · 277 ch</sub>

> Community life refuses to let the collective become a vehicle for personal brand while its weakest members go unprotected. Al-Walī is the guardian who stays close and does not leave — nearness that is protection — while its absence performs unity and leaves the grieving alone.

- **Gloss (canonical, not rendered):** A guardian who stays close and does not leave — nearness that is protection, not merely company.
- **Attested:** Quran 42:9 — "But Allah — He is the Protector." · Bayyinah / direct

### `moontrance-land`

**71. Al-Khāliq** الخالق — *The Creator*  
<sub>`MODULE_ATTRS.moontrance-land` · `al-khaliq` · 254 ch</sub>

> Every horizon of MTC land is māddah He originated — not property you own but a living āyah you are answerable for. Al-Khāliq brings everything into being out of nothing; its absence treats land as inert inventory to be scraped or traded rather than read.

- **Gloss (canonical, not rendered):** He brings everything into being out of nothing — stars, oceans and people exist because He determined they should.
- **Attested:** Quran 59:24 — "He is Allah, the Creator, the Originator, the Fashioner." · Bayyinah / direct

**72. Al-Bāri'** البارئ — *The Originator*  
<sub>`MODULE_ATTRS.moontrance-land` · `al-bari` · 282 ch</sub>

> The land steward refuses to overwrite what Allah has already shaped: regenerative practice is a return to His design, not an imposition on it. Al-Bāri' originates without copying a model, and its absence is extraction that flattens a site's native intelligence to fit a spreadsheet.

- **Gloss (canonical, not rendered):** He originates without copying a model — every creature is a first, not a variation on an existing design.
- **Attested:** Quran 59:24 — "The Creator, the Originator, the Fashioner." · Bayyinah / direct

### `moontrance-seasonal`

**73. Al-Mudabbir** المدبر — *The Orderer of Affairs*  
<sub>`MODULE_ATTRS.moontrance-seasonal` · `al-mudabbir` · 280 ch · **off-list**</sub>

> A seasonal land pathway submits to His ordering of rain, rest and harvest rather than imposing a commercial calendar on a living system. Al-Mudabbir arranges every matter to its proper end, sequence and timing managed rather than left to drift; its absence denies fallow entirely.

- **Gloss (canonical, not rendered):** He arranges every matter to its proper end — sequence and timing are managed, not left to drift.
- **Attested:** Quran 10:3 — "He arranges the matter; there is no intercessor except after His permission." · Qarina / direct

**74. Al-Fattāḥ** الفتاح — *The Opener*  
<sub>`MODULE_ATTRS.moontrance-seasonal` · `al-fattah` · 275 ch</sub>

> Your task is iḥsān in tending; the opening of rizq is His. Al-Fattāḥ opens what is shut — the seed, the rain-cloud, the bound potential inside soil — and decides whether planting opens into harvest. Its absence is the grasping that treats yield as earned rather than granted.

- **Gloss (canonical, not rendered):** He opens what is shut — in circumstances, in provision, and in the understanding of a closed heart.
- **Attested:** Quran 34:26 — "And He is the Opener, the All-Knowing." · Bayyinah / direct

### `moontrance-residency`

**75. Al-Walī** الولي — *The Protecting Friend*  
<sub>`MODULE_ATTRS.moontrance-residency` · `al-wali` · 265 ch</sub>

> Walāʾ is what made Ansar and Muhajirūn a single household — a residency stands or falls on it, because co-location alone does not make people a community. Al-Walī stays close and does not leave; its absence is households sharing infrastructure with no binding duty.

- **Gloss (canonical, not rendered):** A guardian who stays close and does not leave — nearness that is protection, not merely company.
- **Attested:** Quran 42:9 — "But Allah — He is the Protector." · Bayyinah / direct

**76. Al-Ḥafīẓ** الحفيظ — *The Preserver*  
<sub>`MODULE_ATTRS.moontrance-residency` · `al-hafiz` · 268 ch</sub>

> A residency is not a program but a durable social form: ask whether today's structures will preserve this community through the generation that inherits it. Al-Ḥafīẓ keeps what is entrusted to Him and loses nothing He guards; its absence is what dies with its founder.

- **Gloss (canonical, not rendered):** He keeps and protects what is entrusted to Him — nothing He guards is ever lost.
- **Attested:** Quran 11:57 — "Indeed, my Lord is, over all things, a Preserver." · Bayyinah / direct

### `wealth`

**77. Ar-Razzāq** الرزاق — *The Provider*  
<sub>`MODULE_ATTRS.wealth` · `ar-razzaq` · 265 ch</sub>

> At this level wealth is not personal achievement to protect or expand but rizq entrusted for a purpose. Ar-Razzāq provides for every living thing; its absence corrupts through accumulation that crowds out generosity, and the anxiety of holding rather than trusting.

- **Gloss (canonical, not rendered):** Every living thing is provided for by Him — the ant in the ground and the fish in the deep are on the same register.
- **Attested:** Quran 51:58 — "Indeed, it is Allah who is the Provider, the firm possessor of strength." · Bayyinah / direct

**78. Al-Ḥasīb** الحسيب — *The Reckoner*  
<sub>`MODULE_ATTRS.wealth` · `al-hasib` · 276 ch</sub>

> This is not anxiety about outcomes but the quality of attention that makes stewardship legible, to the operator and to Allah. Al-Ḥasīb keeps the full account of every act, nothing lost from the record and nothing added; its absence is decisions made without counting the cost.

- **Gloss (canonical, not rendered):** He keeps the full account of every act — nothing is lost from the record and nothing is added to it.
- **Attested:** Quran 4:6 — "And sufficient is Allah as Accountant." · Bayyinah / direct

### `wealth-earning`

**79. Ar-Razzāq** الرزاق — *The Provider*  
<sub>`MODULE_ATTRS.wealth-earning` · `ar-razzaq` · 269 ch</sub>

> The employer, the client, the market are means He uses — not the source. To earn is to take the sabab seriously without believing the effort is the provider, because Ar-Razzāq provides for every living thing; its absence is panic in scarcity and arrogance in abundance.

- **Gloss (canonical, not rendered):** Every living thing is provided for by Him — the ant in the ground and the fish in the deep are on the same register.
- **Attested:** Quran 51:58 — "Indeed, it is Allah who is the Provider, the firm possessor of strength." · Bayyinah / direct

**80. Al-Fattāḥ** الفتاح — *The Opener*  
<sub>`MODULE_ATTRS.wealth-earning` · `al-fattah` · 272 ch</sub>

> Earning well is the confidence that a door closed to you is closed for your benefit, and the willingness to keep knocking on the next one. Al-Fattāḥ opens what is shut, in circumstances and in provision; its absence is despair at closure, or forcing a door Allah has shut.

- **Gloss (canonical, not rendered):** He opens what is shut — in circumstances, in provision, and in the understanding of a closed heart.
- **Attested:** Quran 34:26 — "And He is the Opener, the All-Knowing." · Bayyinah / direct

### `wealth-financial`

**81. Ar-Razzāq** الرزاق — *The Provider*  
<sub>`MODULE_ATTRS.wealth-financial` · `ar-razzaq` · 262 ch</sub>

> Managing wealth means treating every unit as provision entrusted for a purpose, not earnings to spend by appetite. Ar-Razzāq provides for every living thing — the ant in the ground and the fish in the deep — and its absence turns a budget into an indulgence log.

- **Gloss (canonical, not rendered):** Every living thing is provided for by Him — the ant in the ground and the fish in the deep are on the same register.
- **Attested:** Quran 51:58 — "Indeed, it is Allah who is the Provider, the firm possessor of strength." · Bayyinah / direct

**82. Al-Ghanī** الغني — *The Self-Sufficient*  
<sub>`MODULE_ATTRS.wealth-financial` · `al-ghani` · 268 ch</sub>

> To manage finances well is to steward money with a heart that does not need it for security, even as the hands use it competently. Al-Ghanī needs nothing from anyone — your worship adds nothing to Him and your neglect takes nothing away; the balance is not your worth.

- **Gloss (canonical, not rendered):** He needs nothing from anyone — your worship adds nothing to Him and your neglect takes nothing away.
- **Attested:** Quran 2:263 — "And Allah is Free of need and Forbearing." · Bayyinah / direct

### `wealth-ownership`

**83. Al-ʿAdl** العدل — *The Utterly Just*  
<sub>`MODULE_ATTRS.wealth-ownership` · `al-adl` · 280 ch</sub>

> In ownership this governs contracts, inheritance, partnerships and promises. Al-ʿAdl gives no one less than their due and wrongs no one by His decree; its absence shows in paperwork favoring the strong, inheritances sidelining the weak, and options kept open at another's expense.

- **Gloss (canonical, not rendered):** Perfectly fair — He gives no one less than their due, and no one is wronged by His decree.
- **Attested:** Jami' at-Tirmidhi 3507 — "The Judge, the Just." · Qarina / direct

**84. Al-Muqsiṭ** المقسط — *The Equitable*  
<sub>`MODULE_ATTRS.wealth-ownership` · `al-muqsit` · 265 ch</sub>

> Where Al-ʿAdl is the absolute standard, Al-Muqsiṭ is the careful apportioning in practice — exact fairness that restores what was taken and returns each right to its owner. Its absence is the generic it-is-fair that never counted what each party carries or is owed.

- **Gloss (canonical, not rendered):** He apportions with exact fairness — restoring what was taken and returning each right to its owner.
- **Attested:** Quran 49:9 — "And act justly. Indeed, Allah loves those who act justly." · Qarina / contextual

### `wealth-circulation`

**85. Al-Karīm** الكريم — *The Most Generous*  
<sub>`MODULE_ATTRS.wealth-circulation` · `al-karim` · 253 ch</sub>

> To circulate wealth is to refuse the calculus that asks what a gift will return — the giving is the return. Al-Karīm gives without depletion and without being asked, owing the recipient nothing; its absence reduces sadaqah to PR and zakat to compliance.

- **Gloss (canonical, not rendered):** He gives without depletion and without being asked — generosity owing nothing to the recipient.
- **Attested:** Quran 27:40 — "Then indeed, my Lord is Self-Sufficient and Generous." · Bayyinah / direct

**86. Al-Wahhāb** الوهاب — *The Supreme Bestower*  
<sub>`MODULE_ATTRS.wealth-circulation` · `al-wahhab` · 251 ch</sub>

> Circulating wealth is learning to pass on what was freely given as something meant to keep flowing. Al-Wahhāb gives as gift rather than exchange — nothing good you hold was earned into existence — and its absence hoards provision as if it were finite.

- **Gloss (canonical, not rendered):** He gives as gift rather than exchange — nothing good you hold was earned into existence.
- **Attested:** Quran 3:8 — "And grant us mercy from Yourself. Indeed, You are the Bestower." · Bayyinah / direct

### `environment`

**87. Al-Wakīl** الوكيل — *The Trustee*  
<sub>`MODULE_ATTRS.environment` · `al-wakil` · 268 ch</sub>

> The earth is entrusted — not owned, not inherited as a right, but held in custody for those who come after, and a trustee has obligations to the one who entrusted. Al-Wakīl disposes of a matter handed to Him better than you could; the ground beneath you is that trust.

- **Gloss (canonical, not rendered):** Hand Him the matter and He disposes of it better than you could — outcomes are His department.
- **Attested:** Quran 3:173 — "Sufficient for us is Allah, and He is the best Disposer of affairs." · Bayyinah / direct

**88. Al-Ḥakīm** الحكيم — *The All-Wise*  
<sub>`MODULE_ATTRS.environment` · `al-hakim` · 278 ch</sub>

> This is the antidote to short-sightedness: not merely prudence but the perception that sees how present choices propagate into future conditions. Al-Ḥakīm holds a reason for every decree in perfect wisdom, disclosed or not; its absence is small decisions made without their arc.

- **Gloss (canonical, not rendered):** Every decree has a reason held in perfect wisdom, whether or not the reason is disclosed to us.
- **Attested:** Quran 2:32 — "Indeed, it is You who is the All-Knowing, the All-Wise." · Bayyinah / direct

### `env-resource`

**89. Al-Muḥyī** المحيي — *The Giver of Life*  
<sub>`MODULE_ATTRS.env-resource` · `al-muhyi` · 245 ch</sub>

> Every drop of water you use today was life He extended, and the tap, the switch and the field are thin interfaces over a miracle — not infinite, not owed. Al-Muḥyī gives life to bodies, to dead land after rain, and to hearts that had gone quiet.

- **Gloss (canonical, not rendered):** He gives life — to bodies, to dead land after rain, and to hearts that had gone quiet.
- **Attested:** Quran 30:50 — "Indeed, that [same One] will give life to the dead." · Bayyinah / direct

**90. Al-Badīʿ** البديع — *The Originator of Wonders*  
<sub>`MODULE_ATTRS.env-resource` · `al-badi` · 271 ch</sub>

> The aquifer behind the tap, the forest behind the lumber, the grid behind the light — Al-Badīʿ originated all of it without precedent, copying nothing from a prior pattern. Honor the design by not wasting it; its absence sees only the endpoint and forgets the dependency.

- **Gloss (canonical, not rendered):** He originates without precedent — nothing He made was copied from a prior pattern.
- **Attested:** Quran 2:117 — "Originator of the heavens and the earth." · Bayyinah / direct

### `env-waste`

**91. Al-Quddūs** القدوس — *The Absolutely Pure*  
<sub>`MODULE_ATTRS.env-waste` · `al-quddus` · 261 ch</sub>

> The earth He entrusted is meant to remain fit to live on, so refuse to dump your impurity into what is held in common. Al-Quddūs is free of every defect — purity as the absence of anything to correct — and its absence is casual pollution of air, water and soil.

- **Gloss (canonical, not rendered):** Free of every defect and limitation — purity not as cleanliness but as the absence of anything to correct.
- **Attested:** Quran 59:23 — "The Sovereign, the Pure, the Source of Peace." · Bayyinah / direct

**92. Aṭ-Ṭayyib** الطيب — *The Pure and Wholesome*  
<sub>`MODULE_ATTRS.env-waste` · `at-tayyib` · 278 ch · **off-list** · **re-pointed 2026-08-20**</sub>

> The believer is commanded to leave a place cleaner than they found it — an-naẓāfatu min al-īmān. Aṭ-Ṭayyib is pure in Himself and accepts only what is pure, wholesome at its source rather than clean on its surface; its absence is the wrapper dropped, the byproduct externalized.

- **Gloss (canonical, not rendered):** Pure in Himself and accepting only what is pure — what is earned or given must be clean at its source.
- **Attested:** Sahih Muslim 1015 — "Indeed Allah is Pure and accepts only what is pure." · Bayyinah / direct

### `env-ecosystem`

**93. Al-Ḥafīẓ** الحفيظ — *The Preserver*  
<sub>`MODULE_ATTRS.env-ecosystem` · `al-hafiz` · 269 ch</sub>

> The biodiversity of a forest, the fertility of a soil, the integrity of a watershed are entrusted, and your diligence is one of the means by which they are kept. Al-Ḥafīẓ preserves what is entrusted to Him and loses nothing He guards; its absence is passive complicity.

- **Gloss (canonical, not rendered):** He keeps and protects what is entrusted to Him — nothing He guards is ever lost.
- **Attested:** Quran 11:57 — "Indeed, my Lord is, over all things, a Preserver." · Bayyinah / direct

**94. Ar-Raqīb** الرقيب — *The Watchful*  
<sub>`MODULE_ATTRS.env-ecosystem` · `ar-raqib` · 270 ch</sub>

> Nothing done to creation passes unnoticed — not the felled tree, not the wasted field, not the species extinguished. Ar-Raqīb is always watching and never inattentive, seeing you in company and seeing you alone; act as if you were already being watched, because you are.

- **Gloss (canonical, not rendered):** Always watching and never inattentive — He sees you in company and He sees you alone.
- **Attested:** Quran 4:1 — "Indeed Allah is ever, over you, an Observer." · Bayyinah / direct

### `env-sourcing`

**95. Al-ʿAlīm** العليم — *The All-Knowing*  
<sub>`MODULE_ATTRS.env-sourcing` · `al-alim` · 271 ch</sub>

> To source well is to refuse the comfort of ignorance; its absence is deliberate blindness to upstream ethics maintained by refusing to ask. Al-ʿAlīm knows the entire chain — the hand that mined, the field that grew, the river that was diverted — and what you told no one.

- **Gloss (canonical, not rendered):** He knows everything — past, present, what has not happened yet, and the thoughts you have told no one.
- **Attested:** Quran 2:32 — "Indeed, it is You who is the All-Knowing, the All-Wise." · Bayyinah / direct

**96. Ar-Rashīd** الرشيد — *The Director to the Right Course*  
<sub>`MODULE_ATTRS.env-sourcing` · `ar-rashid` · 284 ch</sub>

> Sourcing chooses the fitting path between extremes: neither pious withdrawal from all commerce nor cynical participation in whatever is cheapest. Ar-Rashīd directs every affair to its right end; its absence is paralysis because nothing is perfect, or compromise because all is broken.

- **Gloss (canonical, not rendered):** He directs every affair to its right end — the outcome He steers toward is the sound one.
- **Attested:** Jami' at-Tirmidhi 3507 — "The Guide to the right course, the Patient." · Qarina / direct


## BBOS stages

### `IDY`

**97. Al-Awwal** الأول — *The First*  
<sub>`BBOS_STAGE_ISLAMIC.IDY` · `al-awwal` · 259 ch</sub>

> Every business begins not with your decision but with His permission, and founding a venture in His name anchors it to the only source that cannot be taken away. Al-Awwal is before everything, with nothing before Him — there was no moment in which He was not.

- **Gloss (canonical, not rendered):** Before everything, with nothing before Him — there was no moment in which He was not.
- **Attested:** Quran 57:3 — "He is the First and the Last, the Manifest and the Hidden." · Bayyinah / direct

**98. Al-Badīʿ** البديع — *The Originator of Wonders*  
<sub>`BBOS_STAGE_ISLAMIC.IDY` · `al-badi` · 217 ch</sub>

> Your foundation need not copy what already exists — it is an invitation for Al-Badīʿ, who originates without precedent and copied nothing from a prior pattern, to bring something new through your effort and surrender.

- **Gloss (canonical, not rendered):** He originates without precedent — nothing He made was copied from a prior pattern.
- **Attested:** Quran 2:117 — "Originator of the heavens and the earth." · Bayyinah / direct

### `CRD`

**99. Al-Mu'min** المؤمن — *The Giver of Security*  
<sub>`BBOS_STAGE_ISLAMIC.CRD` · `al-mumin` · 275 ch</sub>

> Trust in a business is not manufactured — it is earned by consistent truthfulness, authenticated claims and promises kept, so build credibility as an act of worship. Al-Mu'min makes hearts safe and keeps every promise He has made; security is granted by Him, not against Him.

- **Gloss (canonical, not rendered):** He makes hearts safe and keeps every promise He has made — security is granted by Him, not secured against Him.
- **Attested:** Quran 59:23 — "The Source of Peace, the Giver of Security, the Guardian." · Bayyinah / direct

**100. Al-Wakīl** الوكيل — *The Trustee*  
<sub>`BBOS_STAGE_ISLAMIC.CRD` · `al-wakil` · 266 ch</sub>

> You are responsible for the truth you put into the world; He is responsible for what grows from it. Make every claim honest, then hand the result to Al-Wakīl, who disposes of a matter given to Him better than you could — outcomes are His department, not your burden.

- **Gloss (canonical, not rendered):** Hand Him the matter and He disposes of it better than you could — outcomes are His department.
- **Attested:** Quran 3:173 — "Sufficient for us is Allah, and He is the best Disposer of affairs." · Bayyinah / direct

### `STR`

**101. Al-Muṣawwir** المصور — *The Fashioner of Forms*  
<sub>`BBOS_STAGE_ISLAMIC.STR` · `al-musawwir` · 248 ch</sub>

> Strategy is the act of fashioning form from possibility — defining how things will be arranged — so bring precision to your operational design. Al-Muṣawwir gives each created thing its own shape, face and colour: form is assigned, never accidental.

- **Gloss (canonical, not rendered):** He gives each created thing its own shape, face and colour — form is assigned, never accidental.
- **Attested:** Quran 59:24 — "The Creator, the Originator, the Fashioner." · Bayyinah / direct

**102. Al-Mudabbir** المدبر — *The Orderer of Affairs*  
<sub>`BBOS_STAGE_ISLAMIC.STR` · `al-mudabbir` · 270 ch · **off-list**</sub>

> Your strategy is not a substitute for His planning but your faithful cooperation with the order He has made possible: plan thoroughly, then release the arrangement. Al-Mudabbir arranges every matter to its proper end — sequence and timing are managed, not left to drift.

- **Gloss (canonical, not rendered):** He arranges every matter to its proper end — sequence and timing are managed, not left to drift.
- **Attested:** Quran 10:3 — "He arranges the matter; there is no intercessor except after His permission." · Qarina / direct

### `OFR`

**103. Ar-Razzāq** الرزاق — *The Provider*  
<sub>`BBOS_STAGE_ISLAMIC.OFR` · `ar-razzaq` · 260 ch</sub>

> Pricing your offering is stewardship, not extraction: name a price that reflects genuine value and trust that the right clients will come. Ar-Razzāq provides for every living thing, so greed constricts what trust opens — the provision was never yours to force.

- **Gloss (canonical, not rendered):** Every living thing is provided for by Him — the ant in the ground and the fish in the deep are on the same register.
- **Attested:** Quran 51:58 — "Indeed, it is Allah who is the Provider, the firm possessor of strength." · Bayyinah / direct

**104. Al-Karīm** الكريم — *The Most Generous*  
<sub>`BBOS_STAGE_ISLAMIC.OFR` · `al-karim` · 274 ch</sub>

> Build generosity into your offer — not as a loss-leader tactic but as an expression of His character flowing through your work, because generosity in the offer is barakah in the business. Al-Karīm gives without depletion and without being asked, owing the recipient nothing.

- **Gloss (canonical, not rendered):** He gives without depletion and without being asked — generosity owing nothing to the recipient.
- **Attested:** Quran 27:40 — "Then indeed, my Lord is Self-Sufficient and Generous." · Bayyinah / direct

### `OUT`

**105. Al-Hādī** الهادي — *The Guide*  
<sub>`BBOS_STAGE_ISLAMIC.OUT` · `al-hadi` · 272 ch</sub>

> Ethical outreach is guidance, not manipulation: put the right thing in front of the right people and trust Him with who responds. You are not engineering consent but extending an invitation, because Al-Hādī grants guidance — He shows the way and makes the heart accept it.

- **Gloss (canonical, not rendered):** Guidance is granted by Him, not navigated to — He shows the way and He makes the heart accept it.
- **Attested:** Quran 25:31 — "And sufficient is your Lord as a Guide and a Helper." · Bayyinah / direct

**106. An-Nūr** النور — *The Light*  
<sub>`BBOS_STAGE_ISLAMIC.OUT` · `an-nur` · 256 ch</sub>

> Your outreach carries light when it illuminates a real problem and offers a genuine path forward — not when it uses fear, scarcity or pressure to drive action. An-Nūr is the light of the heavens and the earth, illuminating what is real and what to do next.

- **Gloss (canonical, not rendered):** The light of the heavens and the earth — He illuminates what is real and what to do next.
- **Attested:** Quran 24:35 — "Allah is the Light of the heavens and the earth." · Bayyinah / direct

### `SLS`

**107. As-Samīʿ** السميع — *The All-Hearing*  
<sub>`BBOS_STAGE_ISLAMIC.SLS` · `as-sami` · 267 ch</sub>

> Sales is not a performance but a conversation witnessed: every claim, every promise and every silence is on the record. As-Samīʿ receives every sound, whisper and unspoken plea, and nothing is ever mislaid on Him — so sell as though Allah is listening, because He is.

- **Gloss (canonical, not rendered):** Every sound, whisper and unspoken plea reaches Him — no prayer is ever mislaid.
- **Attested:** Quran 2:127 — "Our Lord, accept this from us. Indeed, You are the All-Hearing, the All-Knowing." · Bayyinah / direct

**108. Al-Baṣīr** البصير — *The All-Seeing*  
<sub>`BBOS_STAGE_ISLAMIC.SLS` · `al-basir` · 275 ch</sub>

> Consultative selling begins with genuine sight: seeing what the prospect actually needs, not what would benefit you most — their need, their capacity, their situation. The sight of Al-Baṣīr reaches what no observer, instrument or record could, and nothing is hidden from Him.

- **Gloss (canonical, not rendered):** Nothing you do is hidden from Him — His sight reaches what no observer, instrument or record could.
- **Attested:** Quran 42:11 — "There is nothing like unto Him, and He is the All-Hearing, the All-Seeing." · Bayyinah / direct

### `DEL`

**109. Al-Muḥsin** المحسن — *The Doer of Excellence*  
<sub>`BBOS_STAGE_ISLAMIC.DEL` · `al-muhsin` · 269 ch · **off-list**</sub>

> Delivery with ihsan exceeds the specification not for commercial advantage but because the work deserves to be done well; every deliverable carrying genuine excellence is an act of worship. Al-Muḥsin does everything with perfect care and prescribes the same care of us.

- **Gloss (canonical, not rendered):** He does everything with perfect care and prescribes the same care in everything we do.
- **Attested:** Sahih Muslim 1955 — "Indeed Allah has prescribed excellence in all things." · Qarina / contextual

**110. Al-Laṭīf** اللطيف — *The Subtly Kind*  
<sub>`BBOS_STAGE_ISLAMIC.DEL` · `al-latif` · 271 ch</sub>

> Delivery means attending to what the client did not explicitly ask for but genuinely needs: the communication, the care, the quality of presence, the unspoken expectation. Al-Laṭīf works through details too fine to notice, arriving at exactly the moment they were needed.

- **Gloss (canonical, not rendered):** His care works through details too fine to notice, arriving at exactly the moment it was needed.
- **Attested:** Quran 6:103 — "Vision perceives Him not, but He perceives all vision; and He is the Subtle, the All-Aware." · Bayyinah / direct

### `RET`

**111. Al-Wadūd** الودود — *The Ever-Loving*  
<sub>`BBOS_STAGE_ISLAMIC.RET` · `al-wadud` · 264 ch</sub>

> Retention rooted in genuine care outlasts retention built on tactics: love the client enough to tell them hard truths, invest in their growth, remember them when there is nothing to sell. Al-Wadūd loves warmly and steadily, never switching off when a person slips.

- **Gloss (canonical, not rendered):** His love is warm, steady and inexhaustible — it does not switch off when a person slips.
- **Attested:** Quran 85:14 — "And He is the Forgiving, the Affectionate." · Bayyinah / direct

**112. Al-Ḥafīẓ** الحفيظ — *The Preserver*  
<sub>`BBOS_STAGE_ISLAMIC.RET` · `al-hafiz` · 259 ch</sub>

> Every client relationship is an amanah — a trust placed in your care — and retention is faithful stewardship of it: remembering, protecting and nurturing what was built. Al-Ḥafīẓ keeps and protects what is entrusted to Him, and nothing He guards is ever lost.

- **Gloss (canonical, not rendered):** He keeps and protects what is entrusted to Him — nothing He guards is ever lost.
- **Attested:** Quran 11:57 — "Indeed, my Lord is, over all things, a Preserver." · Bayyinah / direct

### `OPT`

**113. Al-Ḥasīb** الحسيب — *The Reckoner*  
<sub>`BBOS_STAGE_ISLAMIC.OPT` · `al-hasib` · 263 ch</sub>

> Optimization begins with honest reckoning — what worked, what did not, and why — because fudging the numbers only delays an accountability already complete. Al-Ḥasīb keeps the full account of every act: nothing is lost from that record and nothing is added to it.

- **Gloss (canonical, not rendered):** He keeps the full account of every act — nothing is lost from the record and nothing is added to it.
- **Attested:** Quran 4:6 — "And sufficient is Allah as Accountant." · Bayyinah / direct

**114. Al-Khabīr** الخبير — *The All-Aware*  
<sub>`BBOS_STAGE_ISLAMIC.OPT` · `al-khabir` · 266 ch</sub>

> Review your outcomes not just with metrics but with wisdom: what did the results actually tell you, and what did you miss? Al-Khabīr knows the inner reality of things — the hidden causes, the lagging indicators, the motive underneath an action explained differently.

- **Gloss (canonical, not rendered):** He knows the inner reality of things, including the motive underneath an action you have explained differently.
- **Attested:** Quran 6:103 — "And He is the Subtle, the All-Aware." · Bayyinah / direct

