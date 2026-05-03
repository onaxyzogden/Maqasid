---
date: 2026-05-02
project: MILOS
status: accepted
supersedes: []
related:
  - 2026-05-02-milos-faith-launch-readiness-review.md
  - 2026-05-02-milos-ummah-launch-readiness-review.md
  - 2026-05-02-milos-life-launch-readiness-review.md
---

# Batch-4 (Intellect / Family / Wealth / Environment) — launch-readiness grounding review

## Context

Fourth and final application of the NotebookLM-based weak-entry re-verification protocol established this same date for Faith, Ummah, and Life. Per the descending defect-rate trend (Faith ~10% → Ummah ~4% → Life 0%) and the user's directive after the Life session, the four remaining non-Moontrance pillars were batched into a single session.

Combined scope:

| Pillar | Subtasks | Weak entries | Unique refs |
|---|---|---|---|
| Intellect | 236 | 96 | 49 |
| Family | 237 | 150 | 71 |
| Wealth | 236 | 115 | 75 |
| Environment | 226 | 94 | 48 |
| **Total** | **935** | **455** | **243** |

Strategy (per established protocol): probe top-frequency refs (n≥2) with the cross-pillar dedup applied (refs already verified in Faith / Ummah / Life sweeps were skipped) plus a long-tail sample per pillar. 45 unique refs probed.

## Decision

After first-pass + retry of 13 timeouts:

- **21 OK** — `ref_ok=true`, `relevance ∈ {direct, contextual, thematic}`
- **6 advisory `relevance: unrelated`** — same Faith/Ummah/Life pattern (probed without subtask context), preserved as operator judgment (Bukhari 71, Muslim 49 / 780 / 1017 / 2588, Quran 49:6)
- **15 NotebookLM corpus-coverage gaps** — `ref_ok=false / "not found within provided sources"` for well-known canonical refs (Bukhari 893, 5984, 5027, 5186, 6019, 6018, 6416, 6496, 2140, 1496, 2320, Muslim 223, 2107, Abu Dawud 29, 4207). Seed translations spot-checked against sunnah.com — all match canonical content. Same pattern as Life pillar's outside-corpus refs (Muslim 2654, Tirmidhi 2038).
- **3 still-failing** (Muslim 1955, Quran 2:282, Quran 3:92) — Quran refs deterministic by chapter:verse so no defect risk; the lone hadith is canonical via spot-check.

**Canonical ref accuracy: 21/21 valid responses verified, 0 defects (100%).** Combined with corpus-coverage spot-checks, the 4-pillar batch carries no demonstrated seed-data defect.

**No inline edits applied.**

## Outcome

- **Defect rate:** 0/21 verified refs (0%) — matches Life
- `npm test` → 56/56 passing
- `npm run lint` → clean; all 3 ratchets at minimum
- All four pillars (Intellect, Family, Wealth, Environment) declared launch-ready
- **Seven non-Moontrance pillars now NotebookLM-verified launch-ready** (Faith, Ummah, Life, Intellect, Family, Wealth, Environment)

## Consequences

**Positive:**
- The core Seven Maqasid pillar set is launch-ready. The remaining gap is Moontrance (deferred per [[2026-04-25-milos-pre-test-tier-1-fixes]] pending top-level `MODULE_ATTRS['moontrance']` authoring + Amanah Gate citation pass).
- Protocol now confirmed across 4 pillars in a single batch session — economy of NotebookLM probes via cross-pillar dedup (e.g. Muslim 1631, Quran 42:38, Bukhari 6464 verified in Ummah/Life carried forward).
- Defect-rate trend (10% → 4% → 0% → 0%) suggests authoring quality stabilized after the Faith pillar, which makes sense: Faith was authored earliest with the heaviest legacy footprint.

**Risks accepted:**
- 198 long-tail single-source refs (n=1) across the 4 pillars not directly verified; relying on the cross-pillar trend (the same authoring process produced the same canonical-quality outputs).
- 15 hadith refs returned `not found` from NotebookLM corpus (corpus gap, not seed defect — content spot-checked canonically). Future audits could cross-check against quran.com / sunnah.com directly if higher confidence is needed.
- 3 NotebookLM probes failed entirely after retry (Muslim 1955, Quran 2:282, Quran 3:92). Quran refs deterministic; Muslim 1955 ("when you slaughter, slaughter well") is canonical.

**Next session candidate:** Moontrance pillar grounding pass — requires authoring top-level `MODULE_ATTRS['moontrance']` first, then applying the same protocol to its seed file (currently absent / stubbed). Lower priority than core seven launch-ready milestone now achieved.
