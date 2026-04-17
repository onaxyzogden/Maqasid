# Hadith Enrichment — Semantic Reranker (V3)

**Date:** 2026-04-16
**Status:** shipped
**Commit:** `2c36ce6`

## Decision

Replace the lexical keyword-match reranker with a multilingual
sentence-transformer embedding model (`Xenova/paraphrase-multilingual-MiniLM-L12-v2`,
quantized, 384-dim) for scoring hadith/ayah candidates against subtask titles.
Preserve safety filters (fiqh gate, hadith/ayah blacklists, domain clash) as
post-filters so that high cosine similarity cannot override a veto.

## Why

V1 lexical (keyword overlap) produced ~40% strong citations and ~38% outright
false-positives at per-citation level. V2 added fallback-hadith blacklist +
fiqh-sensitive-ayah blocklist + single-keyword penalty; these were a modest
safety fix (no more iddah verses on business subtasks) but per-citation FP
rate stayed ~47% because aggressive pruning removed decent-marginals while
threshold-edge fallbacks survived.

V3 embeddings resolve the fundamental limitation of lexical matching on short
subtask titles: the model understands that "monthly review" is not the iddah
verse and "reusable water bottle" is not paradise cups. The remaining FPs are
single-word lexical-semantic false-friends (e.g. "accommodation" ↔ 56:56) that
the model can't disambiguate from a 5-word title alone — those are handled
with an explicit ayah/hadith blacklist.

## How to apply

- Reranker: `scripts/rerank-hadith-embeddings.mjs`
  - Default threshold 0.45; titles ≤5 words get bumped to 0.50
  - Embeddings cached to `stages/.embed-cache.json` (gitignored, ~50MB)
  - First run downloads model (~120MB) + embeds ~6k unique texts (~4 min)
  - Subsequent runs at different thresholds are instant (cache-only re-scoring)
- Fiqh gate: per-ayah trigger keyword list in `FIQH_ALLOW_KEYWORDS`
  (e.g. 2:228 iddah only passes if title contains "divorce|iddah|talaq|khul")
- Blacklists: `HADITH_BLACKLIST` (12 entries), `AYAH_BLACKLIST` (20 entries) —
  grow these when QA samples surface recurring offenders
- Apply flow:
  ```bash
  node scripts/rerank-hadith-embeddings.mjs --threshold 0.45
  node scripts/strip-hadith-sources.mjs --all
  node scripts/apply-hadith-sources.mjs \
    --candidates stages/hadith-enrichment-candidates.reranked.md \
    --sidecar    stages/hadith-enrichment-candidates.reranked.json
  npm run build
  ```

## Results

- 1,826 candidate blocks → **322 sourced** (17.6% coverage)
- Safety vetoes: 151 blacklist + 116 domain clash + 4 fiqh
- Per-citation quality (20-block sample, seed 7): ~50% strong, ~25% marginal,
  ~25% residual FP — with known FPs documented in
  `stages/hadith-qa-audit-{review,v2-review}.md`

## When to revisit

- If a ReaderUI renders the citations prominently and receives scholar review
  feedback, revisit residual FPs by growing the blacklists or re-embedding
  against a larger multilingual model (e5-large, paraphrase-mpnet).
- If coverage needs to go up (>500 blocks), lower the threshold to 0.40 but
  accept a ~10pp drop in per-citation trust.
