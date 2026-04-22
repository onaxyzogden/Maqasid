---
title: "UI/UX Scholar consult — PrayerHeroDuring design decisions"
date: 2026-04-22
status: reference
type: decision
source: "NotebookLM — Modern UI/UX Design Scholar (995a59d1-be39-4173-9709-473f2665e64b)"
conversation: "2b89f729-12b2-44ff-a6c3-58db84e07931"
---

# UI/UX Scholar consult — PrayerHeroDuring design decisions

## Context

The Isha + Fajr "During" pilots shipped with three choices flagged for post-V1 validation:

1. The corner icon-only mode toggle (BookOpen / X) — discoverable?
2. The soft accent-scoped radial halo behind the silhouette — right tradeoff?
3. Arabic text rendered with full tashkīl by default — right default; should there be a toggle?

This session consulted the Modern UI/UX Design Scholar NotebookLM against those three questions. The notebook is informational (ceremonial/product-design patterns from YouTube sources), **not fiqh**. No cross-pollination with the Muslim Scholar corpus.

## Q1 — Arabic diacritical toggle

**Scholar recommendation:** Default to **full tashkīl** in sacred contexts (accuracy is primary). Provide an opt-out for fluent readers via a global setting, not a per-page control. Prefer **progressive disclosure** or **layered transparency** over abrupt show/hide to avoid layout jump: e.g. render harakat at 0.15–0.3 opacity by default, fade to full opacity on hover/press. Onboarding-time proficiency selection ("learner" vs "fluent") beats guessing a default.

**What we shipped (this session):**
- Hard show/hide toggle (not opacity-fade) in `useSettingsStore.showDiacritics`, default ON, persisted to localStorage.
- Toggle UI lives in the global `IslamicPanel` header alongside `valuesLayer` / `citationsVisible` — matches the scholar's "global settings for profile persistence" recommendation.
- No onboarding proficiency picker (out of scope).

**Known gap vs. scholar pattern:** Hard toggle may cause line-height jump on small screens when diacritics disappear — monitor in preview. The layered-transparency approach is a candidate for a V2 refinement if the hard toggle feels jarring in practice.

## Q2 — Corner icon-only mode toggle

**Scholar recommendation:** Prefer a **segmented control** (two icons side-by-side in a pill container with an active-state highlight) over a single state-changing icon — the segmented form telegraphs "there are two modes, this is which one." First-session shimmer/glow signifier can draw the eye. Always include `aria-label`. For mobile, consider a floating action bar in the thumb zone.

**What we shipped:**
- Single BookOpen icon in top-right corner with explicit `aria-label="Switch to Reference mode"`.
- 44×44 tap target (WCAG AA) added this session.
- No segmented control; no first-session shimmer.

**Known gap vs. scholar pattern:** The single-icon mode toggle does not visibly communicate "two modes exist." A segmented pill (BookOpen | Play) would be more discoverable. Defer as a V2 candidate — low-cost change if real-user feedback shows the toggle is being missed.

## Q3 — Halo behind silhouette

**Scholar recommendation:** **Hybrid Nur strategy** — pure matte midnight foundation with a *very subtle* radial glow using low-chroma palette (low saturation, small lightness shift). The glow should read as interactive feedback (e.g., "igniting" on step completion), not as static decoration. Pure-black is "silent muraqabah"; glow is "warmth/safety/Nur"; each has legitimate ceremonial readings.

**What we shipped:**
- Accent-scoped radial glow (`color-mix(in srgb, var(--phd-accent) 18%, transparent)`) via `.phd-pa__figure-halo` pseudo-element.
- Static on mount, not interactive/responsive to progression.
- Austere Reference mode unchanged.

**Known gap vs. scholar pattern:** Halo is static. Making it "ignite" subtly on rakah completion (e.g., brief brightness pulse when a rakah's dot fills) would shift the halo from decoration toward feedback — defer as a V2 refinement.

## Guardrails observed

- Muslim Scholar and UI/UX Scholar corpora were not cross-referenced (per global memory).
- UI/UX recommendations treated as informational, not fiqh-binding.
- No fiqh-adjacent claims sourced from this consult.

## Deferred items (V2 candidates from this consult)

- Opacity-fade rather than hard strip for diacritic toggle.
- Segmented pill for Reference/PrayAlong mode toggle.
- Halo as interactive feedback tied to rakah completion.
- Onboarding proficiency picker (learner vs fluent).
