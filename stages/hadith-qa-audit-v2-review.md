# Hadith Enrichment QA Audit v2 — Post-Rerank Comparison

**Date:** 2026-04-16
**Sample:** 40 APPROVE blocks drawn pseudo-randomly (seed 99) from the 1,136 v2-approved blocks.
**Sample file:** `stages/_qa-sample-v2-40.md`
**Status:** review

---

## V1 vs V2 comparison (per-citation accuracy)

| Metric | V1 (sample 50) | V2 (sample 40) | Delta |
|---|---|---|---|
| Citations per block (avg) | 3.0 | 1.9 | -37% (fewer, tighter) |
| Strong/on-topic | ~40% | ~34% | — |
| Marginal (keyword-match, arguably related) | ~22% | ~20% | — |
| Off-topic / false-positive | ~38% | ~47% | **+9pp worse** |

**Candid reading:** V2's aggressive pruning removed fewer *obvious* bads than hoped. The per-citation FP rate actually went **up** because the strong fiqh ayahs were already rare; most removed citations were the "decent-enough marginal" kind, leaving a pool that's more concentrated in surviving-threshold-edge fallback hadiths.

V2 *did* succeed on two dimensions:
1. **Fiqh-sensitive ayah hits are gone.** No menstruation/iddah/divorce verses showing up on business or daily-life subtasks. This was the one safety-critical fix.
2. **Total block noise reduced.** 1,136 sourced blocks vs 1,758 → 622 blocks that previously had mostly-bad citations are now NO_RESULTS (correct outcome).

---

## Blacklist leakage

Several blacklisted hadiths still appear in the v2 sample — they're surviving at ratios right at or just above the 0.5 override threshold:

| Hadith | Block | Reason survived |
|---|---|---|
| Bukhari 4141 | environment > waste > Growth :: sort belongings | "room/use" lexical overlap inflated score |
| Bukhari 2731, 2732 | intellect > professional > Core :: credentials | Hudaybiyya text shares common words |
| Bukhari 4750 | life > mental > Growth :: auto-reply | Not in blacklist; same draw-lots template as 4141/2661 |
| Muslim 3245, 7021 | Various | Not in blacklist; attribution-chain padding |

**Recurring new offenders observed** (candidates for v3 blacklist):
- Bukhari 3364, 3365 — mother-of-Ishmael/girdle story
- Bukhari 4750 — drawing lots (same family as 4141/2661)
- Bukhari 2468, 4726 — long attribution chains
- Bukhari 5052, 6956 — generic marriage/bedouin anecdotes
- Muslim 7373 — Dajjal descriptions
- Muslim 7512 — "search for knowledge" travel

---

## Standout v2 successes

These blocks show citations that are genuinely scholarly-quality and would stand up to imam review:

| Subtask | Citation | Why it works |
|---|---|---|
| sawm > Journal gratitude after breaking fast | Bukhari 1915, 1957 | Companions' fasting/breaking-fast practice |
| wealth > ownership :: public water sources | Bukhari 4554 | Abu Talha's garden / common-use property |
| wealth > circulation :: spending within Muslim community | Bukhari 5299 | Miser/generous parable on circulation |
| environment > resource :: monthly water baseline | 13:17 | "Valleys flowed each according to its capacity" |
| environment > ecosystem :: plant-based meals | Bukhari 2349 | Actual plant-food preparation in Companion era |
| ummah > community :: mediate reconciliation | 4:35 | The arbitrator verse — perfect fit |
| ummah > moontrance-seasonal :: case study documentation | 2:282 | Ayat al-dayn on contract recording |
| ummah > moontrance-residency :: formalise Mithaq | 2:283 | Scribe/document/pledge verse |
| ummah > moontrance-residency :: restorative justice | 49:9 | "Seek reconciliation between believers" — perfect |

The Moontrance pillar in particular comes out strong — its subtasks are concrete enough that lexical matching works well.

---

## Honest assessment

V2 is a **modest net improvement** — the safety fix (fiqh-sensitive ayahs) is real and important, but the broader false-positive reduction is incremental, not transformative. The remaining 40-50% off-topic rate is a fundamental limitation of lexical matching on short subtask titles against long hadith texts.

Further heuristic tuning (v3 blacklist expansion, 0.6 override threshold, penalty on attribution-chain length) could squeeze another 5-10pp improvement but would also zero-out more blocks. Diminishing returns.

---

## Recommendation — pick one

### Option A: ship v2 as-is, commit
Accept ~45% citation noise as the cost of lexical-only filtering. Add a reader-facing UI disclaimer that citations are "suggestive references, not fatwa." This is the honest, pragmatic path.

### Option B: one more tightening pass (v3) then commit
- Expand FALLBACK_HADITH_BLACKLIST with the 8 new offenders identified above.
- Raise BLACKLIST_OVERRIDE_THRESHOLD from 0.5 to 0.6.
- Add penalty for hadiths over N words (attribution-chain padding is correlated with noise).
- Expected: another 150-200 blocks drop to NO_RESULTS, residual FP rate from ~47% to ~35%.
- Cost: ~1 hour.

### Option C: replace lexical with real embeddings
Use a multilingual sentence-transformer to compare subtask and candidate at the semantic level. Would kill most FPs but adds a model dependency and 30-60 min of compute to re-rank 10,251 candidates.
- Cost: ~3-4 hours.

### Option D: defer quality work, ship v2, revisit later
Commit v2 now, keep the current residual noise documented in a wiki decision, come back with fresher eyes.

---

## Awaiting your call

My recommendation: **Option B** — 1 hour to squeeze meaningful additional quality before committing, then ship. The safety fix makes the output currently publishable and the tuning extensions have clear gains against identified offenders.

But this is your call — Option A/D also reasonable, and Option C is the "do it properly" path if citation quality is going to end up in front of users prominently.
