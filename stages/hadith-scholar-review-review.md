# Hadith & Ayah Enrichment — Scholarly Review

**Date:** 2026-04-16
**Reviewer role:** Acting as an Islamic studies scholar reviewing the 322 sourced subtask-citation pairs produced by V3 semantic reranker.
**Status:** review
**Scope:** Reviewed all faith (100), all ummah (61), sampled wealth (36), intellect (25), environment (22).

---

## Overall assessment

The V3 semantic reranker produces a **meaningfully higher quality** corpus than
V1/V2 lexical. Real strengths are present — several citations are the kind a
muhaddith or faqih would affirm without hesitation. At the same time,
systematic failure modes remain. This review classifies the corpus as:

- **Publishable under a disclaimer** (citations as *suggestive references*, not
  fatwa rulings), with ~20-30 blocks warranting removal or replacement before
  public exposure.
- **Not yet scholar-attested.** A madhhab-trained reviewer would need to pass
  judgment before any *ijazah*-level claim.

---

## Gold-standard citations (exemplary)

These would stand up in a classical fiqh work:

| Subtask | Citation | Why it works |
|---|---|---|
| Muhabbah (love Allah above all) | 3:31, 2:165 | Exact doctrinal verses — "If you love Allah, follow me" |
| Iman — 6 articles | 4:136 | Verse explicitly names all six articles |
| Qadar | 54:49, 64:11, 97:1 + Muslim 93 | Qadariyyah refutation hadith + decree verses |
| Al-Fuqara | 2:273 | The definitional zakah verse |
| Ihsan | 40:60 + Muslim 93 | Hadith of Jibril — the canonical ihsan source |
| Emergency supply for neighbor | 107:7 | "Withhold simple assistance" — Surah Al-Ma'un, the definitive social-ethic verse |
| Repel evil with good | 41:34 | Exact Quranic principle — "Repel [evil] with that which is better" |
| Debt documentation | 2:282 + Bukhari 2291 | Ayat al-Dayn — longest verse in Quran, on contract recording |
| Hire trustworthy | 28:26 | Shu'ayb's daughter: "Best you hire is the strong and trustworthy" — classic hiring aya |
| Kanz (hoarding prohibition) | 9:35 | Exact hoarding-punishment verse |
| Riba study | 2:275 + Bukhari 4540/459 | Direct riba verse + revelation-context hadiths |
| Mediate reconciliation | 4:35 | The arbitrator-between-spouses verse — perfect |
| Barakah in wealth (zakah) | 30:39 | Riba-vs-zakah contrast verse |
| Light for humanity du'a | 11:118 | "Had your Lord willed, He would have made humanity one community" |
| Monthly sadaqah | 2:270 | Standard sadaqah verse |
| Waqf principles | Bukhari 1643 | Umar's waqf at Khaybar — the foundational waqf hadith |
| Six fasts of Shawwal | Muslim 2758 | The canonical hadith |
| Janazah ghusl | Bukhari 1256 | Ghusl of the Prophet's daughter — proper fiqh source |
| Restorative justice | 49:9 | "Reconcile between the two groups" — the actual restorative-justice ayah |
| Ramadan community programme | 17:78 + Bukhari 37/2018 | Prayer-time ayah + tarawih/i'tikaf hadiths |
| Sahifat al-Madinah | Bukhari 2697 | "Whoever innovates in this matter of ours…" — foundational |
| Non-neighbor kindness | (should be 60:8, is 60:11) | Near-miss — see errata |
| Halal meat tayyib | 5:4, 23:51 | Both named tayyib verses |

---

## Scholarly errors requiring correction

### Critical — factually wrong attribution

**1. `family > hajj > Growth :: Ibrahim's sacrifice and Eid al-Adha` — cites 2:258**
- 2:258 is the debate between Ibrahim and Nimrud about life and death, not the sacrifice of Isma'il.
- Correct reference: **37:102-107** (the binding/redemption narrative).
- Action: remove 2:258; add 37:102-107 to candidate pool if not present.

**2. `wealth > earning > Core :: Conditions of valid sale/contract` — cites 2:235**
- 2:235 is on the permissibility of *proposing marriage* to widows during *iddah*.
  This is an iddah verse that should have been fiqh-gated but is not currently
  in `FIQH_SENSITIVE_AYAHS`.
- Action: **add 2:235 to the fiqh-sensitive set**; correct references for
  sale/contract validity are 2:282, 5:1, 4:29.

**3. `family > home > Growth :: Plant-based meals / meat sourcing` misses Bukhari 2349**
- Bukhari 2349 (companions' plant-food preparation) was noted as a strong citation
  in the V2 audit but does not appear in the V3 approvals for meat/meal subtasks.
  Likely excluded by cosine threshold; consider lowering threshold for this
  specific block or adding an override.

### Pattern errors — verses used on wrong subtasks

| Wrong pairing | Issue | Fix |
|---|---|---|
| 76:5, 76:17 on reusable water bottle | Paradise cups of kafoor/zanjabeel — not drinkware ethics | Blacklist 76:5, 76:17 |
| 76:28 on durable garments | Paradise description, not garment durability | Blacklist 76:28 |
| 55:54 on garden design | Paradise couches, not horticulture | Blacklist 55:54 |
| 56:7, 56:29, 56:89 on product categories / plants | Waqi'a paradise/hell sorting verses | Blacklist all three |
| 41:3, 15:1, 27:1 on compiling references | Sura openings ("this is the Book") — not content | Blacklist |
| 2:144 on "nearest masjid" | Qibla-direction verse, not location-finding | Blacklist 2:144 when pillar ≠ faith/salah |
| 40:49 on praying in jama'ah | Hellfire dwellers pleading, not congregational prayer | Blacklist 40:49 |
| 22:26 on sujud al-sahw / ruku adhkar | Ibrahim purifying Ka'bah | Blacklist 22:26 when submodule ≠ hajj |
| 2:258 on Ibrahim's sacrifice | Nimrud debate (noted above) | Blacklist for sacrifice subtasks |
| 2:121 used for both "Books" and "Messengers" shahada study | Same verse, both weak — recitation verse | Separate: use 2:4, 2:285 for Books/Messengers |
| 3:79, 5:44 on stewardship / khilafah | 3:79 is prophets not being worshipped; 5:44 is rule-by-revelation | Replace with 2:30, 6:165, 35:39 |
| 7:21 on nasihah training | Iblis's *false* "sincere advice" — ironic inversion | Blacklist 7:21 for nasihah contexts |
| 2:241, 49:9 on just wages | 2:241 is divorce-mata'a; 49:9 is reconciliation | Replace with 26:183, Muslim 1571 |
| 33:33, 4:95 on zakah acceptance du'a | 33:33 is Prophet's wives; 4:95 is mujahidun | Replace |
| 68:46 on subtracting debts | "Do you ask them for payment" — opposite meaning | Blacklist 68:46 |
| 51:4 on trustworthy zakah orgs | Clouds/winds distributing — metaphysical | Blacklist 51:4 |
| 12:75 on repayment schedule | Yusuf finding his cup | Blacklist |
| 17:63 on forgiving borrower | Shaytan's claim over descendants | Blacklist 17:63 |
| 81:7 on budgeting tool | Souls being paired on Day of Judgment | Blacklist |
| 3:19, 16:60 on updating will | Religion-is-Islam / worst example | Blacklist for will-drafting |
| 18:108 on verifying inheritance | Kahf reward | Blacklist |
| 17:71 on "develop next-gen leaders" / "introduce to imam" | "Every people with their imam" on Day of Judgment — marginal | Narrow usage |
| 19:73 on "strongest arguments" | "Better position" — same lexical trap as 79:43 | Blacklist 19:73 |
| 3:207, 3:887 on istikharah | Not the istikharah hadith (which is Bukhari 1162) | Replace |

---

## Recurring hadith false-positives (candidates for next blacklist pass)

Observed resurfacing across multiple subtasks:

- **Bukhari 25** — appears on "community mediators", "scholar consulting", "case study for researchers", "waqf structure", "Islamic finance qualification" — a generic narration that keeps landing on advice/expertise subtasks. Consider contextual allow-list rather than blanket blacklist.
- **Bukhari 42** — appears on "evaluate each course" and "environmental taharah" — likely faith-branches hadith, too generic.
- **Bukhari 3** (revelation commencement) — keeps resurfacing on Ikhlas, Hajar/Isma'il, attributes-of-Allah, update-will. Already partially blacklisted for family-heritage; extend blacklist to shahada/faith contexts.
- **Bukhari 1643** (Umar waqf) — correctly used on waqf subtasks but FP on "4 arkan of Hajj", "wajibat", "Quran programme", "trust structure verification". Context-gate: allow only on waqf/sadaqah subtasks.
- **Muslim 2951** (pilgrim narrations) — FP on Ibrahim sacrifice, environmental ethics. Blacklist.
- **Bukhari 7517** (Mi'raj angels) — FP on "nearest masjid" and other masjid-logistics subtasks. Allow only on aqidah/angels/Isra-Mi'raj subtasks.
- **Bukhari 2468, 1284** on swearing habits — Hudaybiyya/loans context. Consider full blacklist (was partially added in V2).

---

## Systemic pattern: paradise/eschatology verses as "concrete noun" magnets

The embedding model is genuinely pulled toward verses describing physical objects
in paradise or hellfire when the subtask mentions those objects:

- "Water bottle" → paradise cups (76:5, 76:17)
- "Garment" → paradise silk (76:28)
- "Couch/layout" → paradise couches (55:54)
- "Plant/tree" → paradise gardens (56:29, 44:26)
- "Category/kind" → "three kinds" at Judgment (56:7)

**Recommendation:** add a "paradise/hellfire description" cluster to the
domain-clash filter. Verses from surahs 55, 56, 76, 88 — when cited on
a *worldly-implementation* subtask (environment/home/family-logistics) —
should be vetoed unless the subtask explicitly references Akhira or tafsir.

---

## Verses that should be added to `FIQH_SENSITIVE_AYAHS`

Beyond the current 17 verses:

- **2:235** — proposing to widows during iddah (triggered a wealth/contract FP)
- **2:236, 2:237** — divorce-mahr verses
- **4:3, 4:19, 4:20, 4:21** — marriage/mahr/divorce contexts
- **24:2, 24:6-9** — hadd punishments / li'an
- **33:49** — divorce before consummation

Fiqh-sensitive allowlist should keep *topical keyword* gating (not blanket submodule).

---

## Recommended next actions

1. **Immediate (30 min):** Apply the 20+ ayah blacklist additions above to
   `rerank-hadith-embeddings.mjs`, expand fiqh set, re-score, re-apply. Expect
   drop from 322 → ~280 blocks, with per-citation quality up 10-15pp.
2. **Short-term:** Add paradise/eschatology domain cluster; gate by subtask
   context keyword.
3. **Medium-term:** Have a trained scholar (or partner with one) spot-review
   the final ~280 blocks. Mark which can carry the "scholar-reviewed" badge
   vs which remain "suggestive reference."
4. **Before user-facing publication:** Add a UI disclaimer that citations are
   curated heuristics pending scholarly review, not fatwa.

---

## Closing

The V3 semantic reranker does what V1/V2 lexical could not: it matches *concepts*
rather than keywords. The cases where it succeeds (Muhabbah 3:31, Ayat al-Dayn
on contracts, Surah Al-Ma'un on neighbor aid, the hiring ayah for Shu'ayb's
daughter) are genuinely scholarly-sound pairings. The cases where it fails are
now identifiable and patchable — a closed set of false-friend verses and
recurring generic hadiths.

This is a solid foundation for a rigorous scholarship-reviewed corpus, not the
end of the road.

— *Reviewer acting in scholar capacity, 2026-04-16*
