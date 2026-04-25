---
title: "MILOS pre-test Tier-1 fixes (Phase A of pre-test audit)"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, audit, ceremony-guard, storage, onboarding]
superseded_by: null
---

# MILOS pre-test Tier-1 fixes (Phase A of pre-test audit)

## Context

Yousef requested a comprehensive pre-test audit of MILOS V2.1 before the next live click-through pass. Three Explore agents fanned out across (a) content gaps + missing references, (b) workflow + architecture friction, and (c) UI inconsistencies + drift. Findings were triaged into four severity tiers. Tier 1 was the small set that would visibly break the live walk-through. This decision records the Tier-1 fixes that shipped in Phase A. See [[2026-04-25-milos-pre-test-audit]] for the full triage and plan.

## Decision

Five Tier-1 fixes were applied. Two of the original audit findings were verified incorrect during execution and are documented here as corrections.

### A.1 — Moontrance MODULE_ATTRS (audit finding **incorrect**)

**Audit claimed:** `'moontrance-land'`, `'moontrance-seasonal'`, `'moontrance-residency'` missing from `MODULE_ATTRS`, breaking `getModuleData()` for the 8th pillar.

**Actual state:** All three entries already exist in [src/data/islamic/islamic-data.js](src/data/islamic/islamic-data.js) at lines 3914, 4029, and 4144 — each with full attrs (Al-Khāliq + Al-Bāriʾ for land, Al-Mudabbir + Al-Fattāḥ for seasonal, Al-Walī + Al-Ḥafīẓ for residency), opening dua, closing dua, readiness rows, and reflection structure. `getModuleData()` at line 6134 resolves them correctly.

**Gap noted, not fixed:** there is no top-level `moontrance:` pillar key in `MODULE_ATTRS` (faith/life/intellect/family/ummah/wealth/environment all have one). Adding it requires NotebookLM Muslim Scholar grounding for an 8th-pillar dua + attrs synthesis — filed for Phase B authoring.

### A.2 — CeremonyGuard wrapping for pillar routes

[src/App.jsx:225-233](src/App.jsx) thick pillar routes (`/app/pillar/{name}` for the eight pillars + the `/app/pillar/:pillarId` catch-all) bypassed `CeremonyGuard`. Click pillar in sidebar → page rendered without Opening Threshold.

**Fix applied:**
- `pillar/faith` → `pillar/environment`: wrapped in `<CeremonyGuard moduleId="{name}-core" isLevel1>` to match the existing ceremony semantics of the dedicated `/app/{name}-core` routes
- `pillar/ummah`: wrapped in `<CeremonyGuard moduleId="ummah">` (top-level entry exists)
- `pillar/moontrance`: **deferred** — no top-level `moontrance` MODULE_ATTRS entry exists; gating it would render with null attrs. Filed for Phase B alongside the top-level Moontrance authoring task
- `pillar/:pillarId` catch-all: wrapped in `<CeremonyGuardDynamic paramKey="pillarId">` so unknown pillar IDs gate dynamically

**Verified in preview:**
- `pillar/test-unknown-id` → CeremonyGate renders (gate title: "This module begins with an opening threshold")
- `pillar/wealth` with `disable_l1_threshold_gate=false` → CeremonyGate renders for `wealth-core`
- `pillar/wealth` with default settings (`disable_l1_threshold_gate='true'`) → page renders directly. **This is by design** — the L1 gate is opt-in by default, matching the behavior of the existing `/app/wealth-core` route. The user can enable L1 gating in settings to require ceremony at every Core pillar entry.

### A.3 — Storage + migration error logging

[src/services/storage.js](src/services/storage.js) `safeGet`, `safeGetJSON`, `safeRemove`, `createBackup`, `restoreBackup` all had silent empty `catch {}` blocks. [src/services/migration.js](src/services/migration.js) `read()` and `write()` had the same. Persistence errors were swallowed; user could believe data was saved when it wasn't.

**Fix applied:** every catch now logs via `console.warn('[bbiz]…', key, e)`. Backup create/restore failures and migration write failures additionally dispatch a `bbiz:storage-error` CustomEvent so the existing storage-error banner (storage.js:132) surfaces them to the user. Read-side failures (`safeGet`, `safeGetJSON`, migration `read`) only warn — fallback behavior preserved.

### A.4 — toastStore vs toast-store (audit finding **incorrect**)

**Audit claimed:** [src/store/toastStore.js](src/store/toastStore.js) was an orphan to delete; only [src/store/toast-store.js](src/store/toast-store.js) was live.

**Actual state:** both stores have callers and serve distinct purposes:
- `toastStore.js` (camelCase) — pillar-pulse / Istiqamah toasts. API: `push({ message, pillar, levelColor, dwell })`. Used by 10 callers: 8 LevelOverview pages (`{Pillar}LevelOverview.jsx`), `IstiqamahToast.jsx`, `ModuleWheelSection.jsx`
- `toast-store.js` (kebab-case) — generic operation toasts (save / delete / copy). API: `addToast({ message, type, variant, duration })`. Used by 11 callers: Dashboard, CRM, HR, AddContactModal, Toast, Announcements, ExpensePanel, useTaskActions

**Fix applied:** added cross-referencing docstring headers to both files explaining the intentional split. No deletion. Future refactor to unify would need to bridge the pillar-color carry-over and the chip variant — not in scope for the audit.

### A.5 — Onboarding seeds today's niyyah

[src/pages/Onboarding.jsx](src/pages/Onboarding.jsx) `finish()` did not write `niyyahDate`, so the user finished onboarding → landed on Dashboard → AppShell saw `niyyahDate !== today` → fired the daily Niyyah Act. Looked like onboarding hadn't completed.

**Fix applied:** `finish()` now imports `useThresholdStore` and seeds the day's niyyah from onboarding selections:
- If user picked pillars → `completeNiyyah({ pillars: selectedPillars, submodule: selectedSubmodule || null, level: 'core' })` — carries pillar focus + first submodule forward as today's intention
- If user finished without selecting (Skip-for-now path) → `skipNiyyah()` — marks the day complete with `_skipped` so the modal doesn't fire again

The user lands on Dashboard with today's niyyah already complete; tomorrow they do a fresh niyyah as normal.

## Rationale

- **Tier-1 = "would visibly break live test"** — narrowly scoped to surfaces a tester would actually hit. Two of the five findings turned out to be false alarms; verifying them was still time well spent because the wiki record now documents the correct state for future audits.
- **CeremonyGuard wrapping followed the existing isLevel1 / isLevel23 split**, so the Tier-1 fix doesn't change observed UX for default users (L1 disabled) but does protect the Level 2/3 path and the catch-all. Aligning pillar/* with their dedicated-route ceremony semantics is the lowest-risk choice.
- **Moontrance pillar/moontrance gate deferred** rather than synthesized without grounding — Amanah Gate principle: never invent Quran/hadith content; always ground via NotebookLM Muslim Scholar (`1c17b03b`).
- **Toast stores kept separate** — the pillar-color carry-over isn't trivially expressible in the operation-toast API. Documenting the split is cheaper than unifying.
- **Niyyah seed from onboarding** treats the onboarding selections as the user's first intention rather than asking them to redo the picking.

## Alternatives Considered

- **Add a top-level `moontrance` MODULE_ATTRS entry now** — rejected this session, requires NotebookLM grounding pass for an 8th-pillar dua synthesis. Filed for Phase B authoring.
- **Unify the two toast stores under one API** — rejected this session, scope creep beyond Tier-1. Filed as Tier-3 hygiene.
- **Skip the niyyah ceremony entirely on first dashboard visit (date-gate)** — rejected, the niyyah selection is information the dashboard wants. Seeding with onboarding choices preserves intent.

## Consequences

**Enables:**
- Live click-through test can hit any pillar entry without dead-ends
- Storage failures now surface to the user via the existing banner instead of silently dropping data
- Onboarding completion feels complete

**Constrains:**
- pillar/moontrance still bypasses ceremony — Phase B must add the top-level moontrance entry before that route can gate cleanly
- The decision to keep two toast stores is documented but not architecturally final — a unification session would need to design the carry-over fields

## Connections

- [[milos]] — affected entity (pre-test surface)
- [[ceremony-gate-pattern]] — governing concept for the CeremonyGuard wrapping
- [[amanah-gate]] — principle that blocked synthesizing Moontrance citations without NotebookLM
- [[2026-04-16-ceremony-guard-route-level]] — prior decision establishing the route-level guard pattern
- [[2026-04-12-family-bootstrap-module-attrs]] — template for Moontrance top-level entry (deferred)

## Verification

- `npm run build` — exit 0, 2764 modules transformed, only pre-existing chunk-size warning
- `pillar/test-unknown-id` → `.ceremony-gate` rendered (CeremonyGuardDynamic confirmed)
- `pillar/wealth` with L1 enabled → `.ceremony-gate-title` "This module begins with an opening threshold" rendered
- `pillar/wealth` with default L1 disabled → page renders directly (matches dedicated `/app/wealth-core` behavior, by design)
- No console errors during navigation tests
- Screenshot tool unresponsive (per recent log entries — eval-based verification accepted)
