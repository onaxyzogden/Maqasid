---
title: "Citation pipeline must not globally blacklist authentic revelation"
date: 2026-04-16
status: accepted
type: decision
---

# Citation pipeline must not globally blacklist authentic revelation

## Context

The hadith/ayah semantic-reranker pipeline (`scripts/rerank-hadith-embeddings.mjs`) was producing wrong pairings between subtasks and citations — e.g., Paradise-cup verses (76:5) on "reusable water bottle" subtasks, or 2:258 (Nimrud debate) on "Ibrahim's sacrifice" subtasks.

An initial fix introduced `AYAH_BLACKLIST` (30 entries) and `HADITH_BLACKLIST` (26 entries) that globally vetoed specific ayahs and hadiths from ever appearing in any citation, regardless of subtask.

## Decision

**We do not use global blacklists on authentic Qur'anic ayat or Sahih Bukhari/Muslim hadith.** Every ayah is truth; every Sahih narration is authentic. Treating revelation as globally vetoable is an adab violation even when the pipeline motivation is well-intentioned.

Instead, we use **contextual pairing gates**: structures that declare each citation's true topical subject via keyword lists. A citation passes only on subtasks whose title matches a topical keyword. The revelation itself is never declared problematic — only the *pairing* between a particular subtask and that citation is constrained.

Implemented as `AYAH_CONTEXTUAL_GATES` and `HADITH_CONTEXTUAL_GATES` in `scripts/rerank-hadith-embeddings.mjs`.

## Consequences

- Language throughout the pipeline uses `GATES` / `ALLOWS` / `TOPICAL_REQUIREMENTS`, not `BLACKLIST` / `VETO`.
- Domain-clash filters (war/military on civilian subtasks, hadd punishment on non-legal subtasks, etc.) remain acceptable because they are about *topical fit*, not denying authenticity.
- If a verse keeps misfiring, options are: (a) add or tighten a contextual keyword gate, (b) raise the similarity threshold for that pillar, or (c) accept that some imperfect pairings exist pending scholar review — but never "this verse is banned."
- Fiqh-sensitive ayah set (30 verses covering menstruation, iddah, dhihar, divorce, hadd, li'an) is also a topical gate, not a veto — those verses surface only on subtasks whose title contains the matching fiqh keyword.

## Related

- Feedback memory: `memory/feedback_no_blacklist_revelation.md`
- Commit: `b85b821` (refactor blacklists to contextual gates)
- Scholar review: `stages/hadith-scholar-review-review.md`
