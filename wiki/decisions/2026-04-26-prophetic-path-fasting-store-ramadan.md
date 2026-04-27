---
date: 2026-04-26
status: shipped
tags: [prophetic-path, sunnah, ramadan, fasting, siyam, milos]
related: [2026-04-26-hijri-date-infrastructure, 2026-04-26-prophetic-path-eid-variants, 2026-04-26-prophetic-path-sahari-node, 2026-04-18-milos-grounding-two-axis]
---

# Fasting-State Store + Ramadan Spine Content (Phase 2 of 3)

## Context

Sahari content shipped unconditional with hardcoded "If fasting today…/Even outside Ramadan…" copy. Ramadan-specific moments (iftar du'a at Maghrib, taraweeh after Isha, Laylat al-Qadr du'a in the last ten nights) had no spine support. The spine needed a single canonical answer to "is the user fasting today?" — auto-driven by Hijri date, manually overridable for sunnah fasts (Mon/Thu, Ayyam al-Bid, Arafah, Ashura) outside Ramadan, force-off on Tashreeq (where fasting is prohibited per Muslim 1141).

## Decision

New Zustand store `fasting-store.js` with derivation:

```
isFasting(hijri) = !isTashreeq(hijri) && (isRamadan(hijri) || userOverride)
```

Two new conditional spine nodes gated on the derivation:

- `maghrib-iftar` — anchored on `Maghrib`, fasting-only (renders alongside `maghrib`'s before phase since iftar du'a belongs to the moment of breaking the fast).
- `isha-taraweeh` — anchored on `Isha`, `offsetMin: 30`, Ramadan-only (uses `isRamadan` directly, not generic `isFasting`).

A third Ramadan moment, the Laylat al-Qadr du'a, surfaces as a subtask on the existing tahajjud/qiyam content via `transition:laylat-al-qadr` rather than a new node.

## Implementation

Six files touched:

1. **src/store/fasting-store.js** (new) — `{ userOverride, setUserOverride, computeIsFasting }`. Persists `userOverride` via `safeSet('fasting_user_override', ...)`. `computeIsFasting(hijri)` guards Tashreeq first, then auto-on for Ramadan, then falls through to `userOverride`.
2. **PropheticPath.jsx** — imported `useFastingStore`, `isHijriRamadan`, `isEidFitr`, `isEidAdha`. Subscribes both `userOverride` (forces re-render on toggle) and `computeIsFasting` (does derivation). Added `FASTING_ONLY_NODE_IDS = {maghrib-iftar}`, `RAMADAN_ONLY_NODE_IDS = {isha-taraweeh}`. `getActiveNodeTiming(date, opts)` and `dayNodes` memo apply the new filters.
3. **prophetic-path-submodules.js** — `NODE_TIMING_KEY` entries for `maghrib-iftar` (Maghrib) and `isha-taraweeh` (Isha). `TOD_SUBMODULES` matchers for both new nodes (faith-salah + faith-siyam).
4. **TimelineIslamicContent.jsx** — `NODE_META.maghrib-iftar` (Iftar / الإفطار / amber accent) and `NODE_META.isha-taraweeh` (Taraweeh / التراويح / violet accent).
5. **time-based-content.js** — full before/during/after intent for `maghrib-iftar` (Ibn Majah 1753, Abu Dawud 2356, Abu Dawud 2358 quoted) and `isha-taraweeh` (Bukhari 37, Tirmidhi 806).
6. **prayer-seed-tasks.js** — `classifyTask` mappings: `transition:maghrib-iftar → ['prayer_maghrib_before']`, `transition:isha-taraweeh → ['prayer_isha_after']`, `transition:laylat-al-qadr → ['prayer_tahajjud_before']`.
7. **faith-seed-tasks.js** — appended parent task "Observe Ramadan with the Prophet's ﷺ structure" to `faith_siyam_core` with three grounded subtasks: iftar du'a (Abu Dawud 2358, Hasan), taraweeh (Bukhari 37 + Tirmidhi 806, both Sahih), Laylat al-Qadr du'a (Tirmidhi 3513, Sahih).

## Reactive subscription pattern

`computeIsFasting` is a function reference and would not trigger re-renders on its own when `userOverride` flips. The component must subscribe to `userOverride` directly (`useFastingStore((s) => s.userOverride)`) alongside the function, then call `computeIsFasting(hijri)` inside the render. The unused-but-subscribed primitive is annotated with `void userOverride;` and a comment explaining the reactivity dependency.

## Tashreeq force-off

`isTashreeq(hijri)` is checked first in `computeIsFasting`, so even with `userOverride: true` the user cannot accidentally signal fasting on 11–13 Dhul-Hijjah. Single-source guard avoids drift if more callers consume the derivation later.

## Grounding

| Subtask | ref | Tier / grade |
|---|---|---|
| Iftar du'a — "Dhahaba al-zama'…" | Sunan Abi Dawud 2358 | Bayyinah / Hasan |
| Stand the night with taraweeh | Sahih al-Bukhari 37 + Jami' at-Tirmidhi 806 | Bayyinah / Sahih (both) |
| Laylat al-Qadr du'a — "Allahumma innaka 'afuwwun…" | Jami' at-Tirmidhi 3513 | Bayyinah / Sahih |

All entries: full Arabic, narrator-attributed translation, `provenanceTier: 'Bayyinah'`, `relevance: 'direct'`, `ratNote: 'Verified against sunnah.com 2026-04-26 — [ref] confirmed.'`

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — 3 ratchets at 0
- Sahari copy now state-driven (no hardcoded "If fasting today…"); iftar prompt fires at Maghrib when `isFasting`; taraweeh fires at Isha+30 in Ramadan only.

## Carried forward

- Settings UI for `setUserOverride` toggle — store + derivation ship; UI mount deferred until a natural spot exists (likely in the Faith pillar settings).
- Mon/Thu, Ayyam al-Bid, Arafah, Ashura sunnah fasts already exist as subtasks under `faith_siyam_growth` and `faith_siyam_excellence`; the manual override gives users the spine-level signal without duplicating subtasks.
