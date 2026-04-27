---
date: 2026-04-26
status: shipped
tags: [prophetic-path, sunnah, eid, fitr, adha, tashreeq, hijri, milos]
related: [2026-04-26-hijri-date-infrastructure, 2026-04-26-prophetic-path-fasting-store-ramadan, 2026-04-26-prophetic-path-jumuah-variant, 2026-04-18-milos-grounding-two-axis]
---

# PropheticPath — Eid Spine Variants (Phase 3 of 3)

## Context

With Phase 1 (Hijri infrastructure) and Phase 2 (fasting-store) shipped, the spine still rendered Eid al-Fitr (1 Shawwal), Eid al-Adha (10 Dhul-Hijjah), and Tashreeq (11–13 Dhul-Hijjah) as ordinary days. The user requested **richer scope**: distinct Fitr / Adha / Tashreeq overlays, not a shared Eid node — each Eid carries its own prophetic structure (Fitr eats before, Adha delays eating until after; Fitr's takbir window ends at the prayer, Adha's continues through Tashreeq; udhiyyah is Adha-only; Zakat al-Fitr is Fitr-only).

## Decision

Reuse the Friday filter-set pattern with Hijri inputs. Add a single `eid-prayer` spine node anchored on `Sunrise + 30 min`, replacing `duha` on both Eid days. Distinguish Fitr vs Adha vs Tashreeq behavior via:

- **Spine filter sets** — `EID_ONLY_NODE_IDS = {eid-prayer}`, `NON_EID_HIDE_ON_EID = {duha}` (symmetric to the Friday pattern).
- **Content branching** — `TIME_CONTENT['eid-prayer']` carries unified intent text covering both Eids, with the Fitr-vs-Adha contrast surfaced inside the prose (eat before vs delay eating, takbir window, udhiyyah, return-by-different-route).
- **Seed tasks** — three new parent tasks split the structural commitments cleanly: Fitr Sunan (4 subtasks), Adha Sunan (3 subtasks), Tashreeq dhikr arc folded into the Adha takbir-muqayyad subtask.
- **Tashreeq force-off** — already handled by Phase 2's `computeIsFasting` Tashreeq guard.

## Implementation

Six files touched:

1. **PropheticPath.jsx** — `Sparkles` lucide icon import. `NODE_TIMING['eid-prayer'] = { key: 'Sunrise', label: 'Eid Prayer', offsetMin: 30 }`. Filter sets `EID_ONLY_NODE_IDS` + `NON_EID_HIDE_ON_EID`. Subscribed `isEidFitr(hijri) || isEidAdha(hijri)` into `eid` flag, threaded into `dayFlags` memo and through `getActiveNodeTiming(date, opts)`. `dayNodes` memo applies all five filters: friday/non-friday, fasting-only, ramadan-only, eid-only, non-eid-hide. New `NODES` entry for `eid-prayer` (Sparkles icon, "Salat al-ʿĪd" label).
2. **prophetic-path-submodules.js** — `NODE_TIMING_KEY['eid-prayer'] = 'Sunrise'`. `TOD_SUBMODULES['eid-prayer']` (faith-salah + ummah-community + family-home; matchers for eid/musalla/takbir/zakat al-fitr/udhiyyah/qurbani/transition:eid-prayer).
3. **TimelineIslamicContent.jsx** — `NODE_META['eid-prayer']` (Salat al-ʿĪd / صلاة العيد / emerald accent).
4. **time-based-content.js** — `TIME_CONTENT['eid-prayer']` before/during/after intent text covering both Eids: Fitr odd-dates-before (Bukhari 953), Zakat al-Fitr before prayer (Bukhari 1503), Adha delay-eating (Tirmidhi 542), takbir on the road (Bukhari 970), pray on the musalla (Bukhari 956), return by a different route (Bukhari 986, Tirmidhi 541), udhiyyah after the prayer (Bukhari 5545, 5573).
5. **prayer-seed-tasks.js** — `classifyTask`: `transition:eid-prayer → ['prayer_fajr_after']` (closest existing pillar to the post-sunrise window).
6. **faith-seed-tasks.js** — three new parent tasks appended to `faith_siyam_core`:
   - **Keep the Sunan of ʿĪd al-Fitr** (4 subtasks): Zakat al-Fitr before the prayer (Bukhari 1503), eat odd dates before (Bukhari 953), takbir from Maghrib of eve through the prayer (Bukhari 970), return by a different route (Bukhari 986 + Tirmidhi 541).
   - **Keep the Sunan of ʿĪd al-Adha** (3 subtasks): delay first meal until after the prayer (Tirmidhi 542), offer the udhiyyah after the prayer (Bukhari 5545 + Bukhari 5573), keep the takbir muqayyad through Tashreeq (Q 2:203 + Muslim 1141).
   - The Tashreeq character — eating, drinking, and dhikr — is encoded inside the Adha takbir-muqayyad subtask via Muslim 1141, rather than as a separate parent.

## Filter symmetry — final shape

```
dayNodes filter chain (in order):
1. friday && NON_FRIDAY_HIDE_ON_FRIDAY      → drop
2. !friday && FRIDAY_ONLY_NODE_IDS          → drop
3. FASTING_ONLY_NODE_IDS && !fasting        → drop
4. RAMADAN_ONLY_NODE_IDS && !ramadan        → drop
5. EID_ONLY_NODE_IDS && !eid                → drop
6. eid && NON_EID_HIDE_ON_EID               → drop
```

Same filter set is consulted in `getActiveNodeTiming` (active/next computation) so the spine and the active-state logic stay aligned.

## Grounding (all canonical sunnah.com, verified 2026-04-26)

| Parent | Subtask | ref | Tier / grade |
|---|---|---|---|
| Fitr | Zakat al-Fitr before the prayer | Sahih al-Bukhari 1503 | Bayyinah / Sahih |
| Fitr | Odd dates before going out | Sahih al-Bukhari 953 | Bayyinah / Sahih |
| Fitr | Takbir from Maghrib of eve | Sahih al-Bukhari 970 | Bayyinah / Sahih |
| Fitr | Return by a different route | Sahih al-Bukhari 986 + Jami' at-Tirmidhi 541 | Bayyinah / Sahih (both) |
| Adha | Delay first meal until after the prayer | Jami' at-Tirmidhi 542 | Bayyinah / Sahih |
| Adha | Offer the udhiyyah | Sahih al-Bukhari 5545 + Sahih al-Bukhari 5573 | Bayyinah / Sahih (both) |
| Adha | Takbir muqayyad through Tashreeq | Q 2:203 + Sahih Muslim 1141 | Bayyinah / Sahih |

All seven subtasks include narrator-attributed translation (Arabic where the named du'a is in the matn), `provenanceTier: 'Bayyinah'`, `relevance: 'direct'`, and `ratNote: 'Verified against sunnah.com 2026-04-26 — [ref] confirmed.'`

## Verification

- `npm test` — 40/40 pass (after fixing two grounding-schema misses: a `corroborating` relevance value not in the allow-list `{direct,contextual,thematic}`, and a Q 2:203 entry missing its required `arabic` field)
- `npm run lint` — 3 ratchets at 0

## Carried forward

- Travel-mode spine variant (qasr salah) — separate context.
- Hijri-only events that are not prayer-anchored (Mawlid, Isra wal-Mi'raj) — unrelated overlay class.
- Settings UI for `setUserOverride` toggle (Phase 2 carry-forward).
- Calendar widget showing upcoming Sunnah fasting days — separate UX session.
- Optional split: dedicated Tashreeq parent task if the dhikr arc grows beyond the single takbir-muqayyad subtask.
