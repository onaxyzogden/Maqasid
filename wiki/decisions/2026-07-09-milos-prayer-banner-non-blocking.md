---
title: "MILOS prayer overlay → slim non-blocking banner"
type: decision
date: 2026-07-09
status: accepted
tags: [ui, islamic, prayer, accessibility, milos]
superseded_by: null
---

# MILOS prayer overlay → slim non-blocking banner

> [!note] Follow-up (2026-07-10) — banner copy reverted to original tone
> The operator preferred the **original wording**, so the two `PrayerOverlay` prompt strings were reverted. Everything else this decision established stands — the slim top-banner form factor, the two dismiss affordances, no countdown, auto-clear, and the cut `ResumeOverlay` chain.
> - before the adhan: *"It's almost time for {prayer}."* → **"{prayer} is approaching."**
> - at / after `prayerTimeMs`: *"It's time for {prayer} — pray when you're able."* → **"It is time for {prayer}."**
>
> `PrayerWarning` was **left unchanged** by explicit operator choice: its original *"screen will pause"* wording is no longer true (see the **Consequences** section), so reverting it would put a false claim back on screen. The theological *approaching → it is time* split (below) is preserved verbatim in structure and still satisfied. Verified — `npm run lint:eslint` 0 errors, `npm run build` green, both states confirmed via live DOM (`"Fajr is approaching."` → `"It is time for Fajr."`); the screenshot tool was unresponsive (30 s timeout), so no visual capture exists — disclosed, not assumed. Session logged 2026-07-10.

## Context

The operator reported: *"When it is time for prayer, a feature appears that blocks part of the screen that can't be removed until prayer time is over."*

Taken at face value this contradicts the wiki. The [2026-04-22 session](../log.md) recorded a **PrayerOverlay de-lock**: the fullscreen `position: fixed; inset: 0` scrim with an 88% black backdrop, `useFocusTrap`, and `aria-modal="true"` was replaced by a bottom-right card with `pointer-events: none` on the wrapper, `role="status"` + `aria-live="polite"`, and an `الحمد لله · Alhamdulillah` dismiss button. Reading `HEAD~1` confirms all of that was still true on 2026-07-09. **There was no lock.**

What survived the 2026-04-22 de-lock were the lock's *signals* — four of them, each independently sufficient to make a non-blocking component feel blocking:

1. **The warning copy promised a lock that no longer existed.** `PrayerWarning` rendered `` `${prayerName} in ${prayerMins}m — screen will pause in ${lockMins} minute(s)` ``. The app told the user, in words, that the screen was about to pause.
2. **Dismissal did not return the user to work.** `AppShell.handlePrayerDismiss` ran `setPrayerLock(false, …)` and then `if (completedOpening[activeModule]) triggerResume(activeModule)` — closing the prayer card *mounted `ResumeOverlay` in its place*. The user pressed the only exit and got another overlay. This is the literal mechanism behind "can't be removed."
3. **The card occluded the workspace.** 320px wide, `background: rgba(0, 0, 0, 0.92)` — a near-opaque black panel pinned bottom-right at `z-index: 9500`. `pointer-events: none` makes a thing click-through, not invisible. This is "blocks part of the screen."
4. **A large `mm:ss` countdown** ticked down to the end of the prayer window, framing the banner as a timer to be waited out — "until prayer time is over."

Compounding it, `src/components/islamic/CONTEXT.md` still described the pre-2026-04-22 blocking behaviour, and the store flag is still named `isPrayerLocked`. The documentation and the vocabulary had not caught up with the code, so every subsequent reader — human and agent alike — re-learned a lock that was not there. (Two explore agents in this session's first pass reported PrayerOverlay as a "full-screen blocker," sourcing the stale CONTEXT.md.)

The 2026-04-22 change removed the **mechanism**. It did not remove the **perception**.

## Decision

Complete the de-lock at the perceptual layer. `PrayerOverlay` becomes a slim, top-centre pill banner that states it is prayer time and stays out of the way.

- **Form factor** (operator-chosen from four options): top-centre pill, sized to content, matching the existing `PrayerWarning` geometry and the project's `--surface` / `--accent-border` / `--radius-full` / `--shadow-lg` token set. Replaces the opaque black bottom-right card.
- **Dismissible two ways:** the `الحمد لله · Alhamdulillah` acknowledgment (retained from 2026-04-22) and a new `✕` close button.
- **Auto-clears** once the prayer window closes (`prayerTimeMs + PRESENCE_CONFIG.PRAYER_TRAIL_MS`), so an ignored banner does not persist indefinitely.
- **No visible countdown.** The `mm:ss` timer is gone; the per-second `setInterval` that drove it is replaced by two `setTimeout`s — one flipping the copy at `prayerTimeMs`, one auto-clearing at window end.
- **Copy rewritten.** `PrayerOverlay`: *"It's almost time for {prayer}."* → *"It's time for {prayer} — pray when you're able."* `PrayerWarning`: *"{prayer} in 12m — screen will pause in 5 minutes"* → *"{prayer} approaching · 12m"*. The `minutesUntilLock` prop is deleted, not merely unused.
- **The `ResumeOverlay` chain is cut.** `handlePrayerDismiss` now only clears the flag; deps trim to `[setPrayerLock]`.

### The message flip is theological, not cosmetic

`PrayerOverlay` mounts `PRESENCE_CONFIG.PRAYER_LEAD_MS` (5 minutes) **before** the adhan. A banner that declares *it is time* during that lead window invites the user to pray a fard before its time has entered — which does not discharge the obligation. The banner therefore reads *"approaching"* until `prayerTimeMs` and only then flips to *"it is time."* This distinction is load-bearing and must survive future refactors of the timer logic; it is stated here by its semantics rather than by the literal strings, which were reverted to the original tone on 2026-07-10 (see the Follow-up note above).

### Constraint discovered: `react-hooks/set-state-in-effect`

The first implementation set `beforePrayer` synchronously inside the effect body to reset it on prop change. The flat config's `react-hooks/set-state-in-effect` rule (error, not warning) forbids this. The resolution — worth recording because the naïve fix is to delete the before/after distinction:

- the **initial** value comes from the `useState` initializer (`() => prayerTimeMs ? Date.now() < prayerTimeMs : false`);
- the **flip** happens inside a `setTimeout` callback, which the rule permits;
- **no in-place reset is needed**, because `AppShell` mounts a fresh `PrayerOverlay` per prayer, so `prayerTimeMs` is stable for the lifetime of any one instance.

## Rationale

The operator's ask was *"still sees it's prayer time, but is able to continue using the app."* The app already satisfied the second half mechanically and failed it perceptually. Fixing the perception meant attacking all four signals — removing any three would have left the fourth to carry the impression on its own. In particular, cutting the `ResumeOverlay` chain (2) was mandatory: no amount of restyling makes a dismiss button feel like a dismiss button when pressing it summons a second overlay.

Dropping the countdown follows from the same reasoning. A ticking timer is an instruction to wait. The prayer window still governs auto-dismissal — it just stopped being displayed as a sentence the user has to serve.

## Alternatives Considered

- **Keep the countdown, restyle the card.** Rejected — the timer is the single strongest "wait this out" signal, and the operator asked for the best UX rather than pinning the countdown.
- **Auto-dismissing toast.** Rejected — the banner must persist for the duration of the prayer window; a toast that vanishes after ~5s stops answering "is it still prayer time?"
- **Remove the prayer indicator entirely.** Rejected against the explicit ask ("the user still sees it's prayer time") and against [[covenant-architecture]] — the prayer signal is the point.
- **Rename `isPrayerLocked` in this change.** Deferred. The flag is read in several places; renaming it is a mechanical sweep that would have enlarged an otherwise five-file diff. Recorded below as debt.

## Consequences

- **`isPrayerLocked` is now a misnomer.** The store flag (`threshold-store.js:225`, `setPrayerLock(locked, prayerName, msRemaining, prayerTimeMs)`) gates a *banner*, not a lock, and has done since 2026-04-22. The name is the last surviving artifact of the lock era and is the most likely source of the next false "MILOS locks the screen during prayer" reading. **Rename to `prayerBannerActive` / `setPrayerBanner` when a session next touches this store.**
- **`ResumeOverlay` no longer triggers from prayer dismissal.** It remains reachable from its other entry points. The `completedOpening` / `activeModule` / `triggerResume` reads are gone from `handlePrayerDismiss`'s dep array.
- **The universal (`valuesLayer !== 'islamic'`) branch of `PrayerOverlay` remains unreachable dead code** — `valuesLayer` defaults to `'islamic'` (`settings-store.js:6`) and there is no UI to change it. Left in place; not exercised by this change.
- Any future edit to the two `setTimeout`s must preserve the *"approaching"* / *"it is time"* split — see the theological note above.
- `CONTEXT.md` for `src/components/islamic/` is now accurate. It was the proximate cause of two explore agents mis-reporting the component this session; stale CONTEXT.md is a live hazard under the Context-First Protocol, which mandates trusting it over reading source.

## Verification

- `npm run lint:eslint` — 0 errors (1 pre-existing unrelated warning in `IslamicPanel.jsx`). `npm run build` — `✓ built in 1.17s`. The full `npm run lint` grounding gate and `npm test` were **not** re-run: no seed-task or `sources[]` data was touched, which is what those ratchets guard.
- **Non-blocking proven, not assumed:** `document.elementFromPoint` hit-testing over the workspace returned app content, not banner nodes; a live sidebar click changed the route while the banner stayed mounted.
- **Copy flip proven by genuine remount** (`setPrayerLock(false)` → `setPrayerLock(true, …, futureMs)` in separate evals) — necessary precisely because the in-place reset was deliberately removed.
- **Mobile defect found and fixed during verification, beyond the literal plan:** at 375px the pill shrink-wrapped to a 188×143px tall narrow column. Added a `@media (max-width: 640px)` block (project convention breakpoint for banners/toasts) spanning the banner edge-to-edge; now 351×77px. Disclosed to the operator as a scope addition at the time.
- **`preview_screenshot` timed out 6× at 30s** — on Landing, on `/app/pillar/wealth`, with animations frozen, with 66 SVG/wheel elements hidden, after resize, and with the entire app hidden leaving only the banner on a solid background. `preview_eval` / `inspect` / `click` / `resize` all responded instantly and the console was clean, so the rasterizer — not the page — is the fault. **No visual capture exists for this change.** [[project-screenshot-hang]]-class; disclosed rather than asserted, per the operator's standing rule.

**Amanah:** neutral. Prayer-time UX only — no capital instrument, no CSA/CSRA/salam/yield-share surface. The change *strengthens* the covenant posture by removing a false claim ("screen will pause") the app was making to its user, and by refusing to invite a fard prayer before its time enters.

Committed `e4302ce` on `feat/desktop-pillar-glyphs` (5 files, +137/−127), explicit pathspecs amid unrelated worktree/submodule churn. Not pushed.

## Connections

- [[milos]] — the app whose prayer surface this governs
- [[ceremony-gate-pattern]] — the sibling pattern; ceremony gates *do* gate, prayer no longer does
- [[covenant-architecture]] — the prayer signal exists to serve the covenant, not to enforce it
- [[2026-04-19-dashboard-sanctuary-mode]] — `PrayerCountdownWidget` extracted `useNextPrayer` from this component; the countdown lives on there, in a widget the user opts into, which is its right home
