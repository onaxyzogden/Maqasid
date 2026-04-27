---
date: 2026-04-26
status: shipped
tags: [settings, fasting, travel, ui, milos]
related: [2026-04-26-prophetic-path-fasting-store-ramadan, 2026-04-26-travel-mode-store, 2026-04-26-travel-mode-event-nodes]
---

# Sunnah Mode — Settings UI Mount

## Context

The fasting-store (`userOverride`) and travel-store (`setTravel`/`clearTravel`) shipped earlier today as functional state with no UI surface. Both decisions explicitly carried-forward the toggle UI mount. Without UI, manual `localStorage` editing was the only way to flip the spine variants for development or operator use — unsustainable for end users.

## Decision

Single new section "Sunnah Mode" in `src/pages/Settings.jsx`, placed between Ritual Gates and Onboarding (worship-adjacent grouping). Two subsections sharing one section heading:

### Fasting subsection
- Checkbox bound to `useFastingStore.userOverride` / `setUserOverride()`
- Status chip beside the checkbox shows live `computeIsFasting(hijri)` reason: "Active (Ramadan)" / "Active (manual)" / "Off (Tashreeq — fasting prohibited)" / "Off"
- Checkbox auto-disables on Tashreeq (visual reinforcement of the canonical force-off)
- Helper prose explains Ramadan auto-on and Tashreeq override

### Travel subsection
- Status row: "Currently traveling" / "Not traveling" with Active/Off chip
- When active: shows "Started Nm/Nh/Nd ago" + auto-clears countdown if `expiresAt` set + "End Travel" button
- When inactive: shows auto-expire `<select>` (None / 1 / 3 / 7 / 14 days) + "Begin Travel" button
- Live `now` ticks every 60s via `useState` + `useEffect` interval (only while traveling) so countdown stays fresh
- Helper prose covers what activates: qasr, jam', traveler du'a moments, jumuʿah hide, fast deferral

## Implementation

Single file: `src/pages/Settings.jsx`. Imports added: `Plane`, `MapPin`, `Utensils` from lucide-react; `useFastingStore`, `useTravelStore`, `usePrayerTimes`, `isTashreeq`, `isRamadan`. No new stores, no new components extracted — direct use of the existing two-axis Settings page pattern (surface card + label + chip + helper prose) keeps the file focused.

`Date.now()` is impure and ESLint's `react-hooks/purity` rule flags it during render. Solution: capture `now` in `useState(() => Date.now())` and refresh via 60s interval gated on `travelActive`. Minimal cost; countdown stays correct.

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — 3 ratchets at 0 (after the purity fix)
- Preview verified end-to-end: Begin Travel → store flipped → button swapped to End Travel → navigated to `/app/prophetic-path` → `.pp-spine--events` Departure row rendered with Bukhari 2993 / Muslim 1342 prose. Fasting checkbox toggle persisted to `bbiz_fasting_user_override` and chip updated to "Active (manual)".

## Carries forward

- Hijri-only non-prayer overlays (Mawlid, Isrā wal-Miʿrāj, 15 Shaʿbān, 1 Muḥarram) — brainstorm opened then deferred mid-Q1; the framing question (commemoration overlay vs sīrah-anchored reflection overlay vs hybrid-with-toggle) needs an answer before any code.
- Per-pair jam' framing (Dhuhr+Asr vs Maghrib+Isha) — currently single shared traveler note.
- Geolocation auto-detect for travel mode — explicitly out of scope per design decision (1c).
