---
date: 2026-04-26
status: shipped
tags: [prophetic-path, travel, qasr, event-nodes, sunnah, milos]
related: [2026-04-26-travel-mode-store, 2026-04-26-travel-mode-qasr-content, 2026-04-26-prophetic-path-eid-variants]
---

# Travel-Mode Event Nodes — Departure + Arrival (Phase 3 of 3)

## Context

Phases 1+2 give the spine reactive qasr/jam'/fast-deferral framing while traveling. Two prophetic moments remained un-surfaced because they're not time-anchored: the **departure du'a** (recited on mounting the conveyance — Sahih Muslim 1342, with takbir on ascent and tasbih on descent — Sahih al-Bukhari 2993) and the **arrival du'a** (the "ʿAʾibun taʾibun" formula on returning home — Sahih al-Bukhari 1797 + Sahih Muslim 1345; pray two rakʿat at the masjid before going home — Sahih al-Bukhari 443). These moments are triggered by the user's transition into / out of travel mode, not by sun position.

## Decision

Introduce a new spine concept: **ephemeral event nodes** rendered in a separate row above the time-anchored spine, gated by a 60-minute trigger window keyed on store timestamps:

- `traveler-departure` — visible while `traveling && now - startedAt < 60 min`
- `traveler-arrival` — visible while `!traveling && endedAt && now - endedAt < 60 min`

Rendered as `<div className="pp-spine pp-spine--events">` above the standard `<div className="pp-spine">`. Each node carries icon (Plane / MapPin), eyebrow label ("Departure" / "Arrival"), title ("Begin the Journey" / "Return Home"), grounding prose, and pillar tags (Faith + Ummah for departure; Faith + Family for arrival).

A `useEffect` runs a 60-second `setInterval` only while in the trigger window so the row auto-hides without reload.

## Implementation

Five files:

1. **PropheticPath.jsx** — `Plane`, `MapPin` lucide imports; `EVENT_TRIGGER_WINDOW_MS = 60 * 60 * 1000`; `EVENT_NODES` array (2 entries with icon + eyebrow + title + intent + tags); subscribed travel-store primitives + `getIsTraveling`; `eventTick` state + interval `useEffect`; `eventNodes` memo gates by traveling+startedAt vs !traveling+endedAt windows; render block above the time-anchored spine.
2. **prophetic-path-submodules.js** — `TOD_SUBMODULES['traveler-departure']` (faith-salah + ummah-community + family-home; matchers for travel/safar/journey/qasr/jam'/transition:traveler-departure) and `TOD_SUBMODULES['traveler-arrival']` (faith-salah + family-home + ummah-community; matchers for arrival/return/aibun/ta'ibun/transition:traveler-arrival).
3. **TimelineIslamicContent.jsx** — `NODE_META` entries: `traveler-departure` (Departure / السفر / `#0ea5e9`), `traveler-arrival` (Arrival / الإياب / `#06b6d4`).
4. **time-based-content.js** — `TIME_CONTENT['traveler-departure']` (Muslim 1342 + Bukhari 2993 prose) and `TIME_CONTENT['traveler-arrival']` (Bukhari 1797 + Muslim 1345 + Bukhari 443 prose).
5. **prayer-seed-tasks.js** — `classifyTask` routes: `transition:traveler-departure → ['prayer_dhuhr_before']`, `transition:traveler-arrival → ['prayer_maghrib_after']`.
6. **faith-seed-tasks.js** — new parent task "Travel with the Prophet's ﷺ structure" appended to `faith_salah_growth` (placed before `faith_salah_excellence`) with 5 subtasks:

| # | Subtask | Citations | Relevance |
|---|---|---|---|
| 1 | Travel du'a on mounting (full Arabic + translation) | Sahih Muslim 1342 | direct |
| 2 | Takbir on ascent / tasbih on descent | Sahih al-Bukhari 2993 | direct |
| 3 | Qasr to 2 rakʿat | Sahih al-Bukhari 1102 + Sahih Muslim 685 | direct |
| 4 | Combine prayers (jam') | Sahih al-Bukhari 1107 | direct |
| 5 | Arrival du'a "ʿAʾibun taʾibun" + masjid-before-home | Sahih al-Bukhari 1797 + Sahih Muslim 1345 + Sahih al-Bukhari 443 | direct |

Tags: `['salah', 'sunnah', 'travel', 'qasr', 'transition:traveler-departure', 'transition:traveler-arrival']`.

## Reactive subscription pattern

Components must select the primitive store fields (`active`, `startedAt`, `endedAt`) alongside the `getIsTraveling` function — selecting the function alone returns a stable identity and won't trigger re-render. Empty `void` annotations satisfy ESLint no-unused-vars without runtime cost:

```js
const travelActive = useTravelStore((s) => s.active);
const travelStartedAt = useTravelStore((s) => s.startedAt);
const travelEndedAt = useTravelStore((s) => s.endedAt);
const getIsTraveling = useTravelStore((s) => s.getIsTraveling);
void travelActive; void travelStartedAt; void travelEndedAt;
const isTraveling = getIsTraveling();
```

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — 3 ratchets at 0 (after one mid-flight inline-refs fix: arrival-du'a subtask cited Bukhari 443 in prose; added it as the 6th source citation for the masjid-before-home detail from Kaʿb ibn Malik narration)
- Preview verified: setting `bbiz_travel_state` to `{active:true,startedAt:Date.now(),...}` renders the Departure event row above the spine; flipping to `{active:false,endedAt:Date.now(),...}` renders the Arrival row. Both rows auto-hide outside the 60-minute window.

## Gotchas

- localStorage seeding for manual preview testing must use the prefixed key `bbiz_travel_state` — `services/storage` applies `bbiz_` prefix on every read/write.
- `relevance` enum is `{direct, contextual, thematic}` — `corroborating` is not in the allow-list (caught earlier in the Eid Phase 3 by the same schema test).

## Carried forward

- Settings UI mount for `setTravel(days)` / `clearTravel()` toggles — store + auto-expire ship; UI button row could live alongside the future fasting `userOverride` toggle.
- Per-pair jam' framing (Dhuhr+Asr vs Maghrib+Isha) — Phase 2 covers with a single shared note.
- Qasr/jam' eligibility nuance (78km Shafiʿi vs 88km Hanafi distance, 4-day vs 15-day duration cap) — currently the user toggles intent; classical-fiqh distance/duration validation could surface a "verify travel ruling applies" prompt without auto-detection.
