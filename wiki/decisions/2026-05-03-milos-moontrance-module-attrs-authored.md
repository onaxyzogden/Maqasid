---
date: 2026-05-03
project: MILOS
status: accepted
supersedes: []
related:
  - 2026-04-25-milos-pre-test-tier-1-fixes.md
  - 2026-05-02-milos-batch4-launch-readiness-review.md
---

# Moontrance — top-level MODULE_ATTRS authored, /pillar/moontrance route placed under CeremonyGuard

## Context

Moontrance was the only non-CeremonyGuarded pillar route after the 2026-04-25 Tier-1 wrapping pass ([[2026-04-25-milos-pre-test-tier-1-fixes]]) and the only pillar absent from MODULE_ATTRS in `src/data/islamic/islamic-data.js`. Both deferrals were noted in the Tier-1 ADR pending top-level `MODULE_ATTRS['moontrance']` authoring + Amanah Gate citation pass.

The three Moontrance submodules (`moontrance-land`, `moontrance-seasonal`, `moontrance-residency`) already carry their own MODULE_ATTRS blocks with full citations and have been CeremonyGuard-wrapped since the original placement. The gap was the integrating top-level entry that the `/pillar/moontrance` dashboard reads.

With the seven-pillar launch-readiness arc now closed (Faith → Ummah → Life → Intellect/Family/Wealth/Environment per [[2026-05-02-milos-batch4-launch-readiness-review]]), the Moontrance unblock is the last structural gap before the CeremonyGuard surface covers every pillar uniformly.

## Decision

Authored a top-level `moontrance:` block in `src/data/islamic/islamic-data.js` (~120 lines, inserted before the existing `'moontrance-land':` entry) with full schema parity to the `ummah:` top-level block:

**Attributes (2)**
- **Mālik al-Mulk** (Owner of Sovereignty) — Quran 3:26: "Say: O Allah, Owner of Sovereignty, You give sovereignty to whom You will and take it from whom You will." Frames every acre, season, and household MTC touches as a temporary trust under His sovereignty rather than founder property.
- **Al-Wāriṯ** (The Inheritor) — Quran 19:40: "Indeed, it is We who will inherit the earth and whoever is upon it, and to Us they will be returned." Frames the work as built for the next steward, not for the founder's tenure.

**Opening dua** — Surah Hūd 11:61 (the istaʿmara verse: "It is He who brought you forth from the earth and settled you upon it to develop it…"). Direct Quranic charter for the steward-developer posture Moontrance embodies.

**Closing dua** — Surah Maryam 19:40 (inheritance verse), reinforcing Al-Wāriṯ as the closing frame.

**Readiness** — 6 rows (3 per attr): integration of land+season+residency as one indivisible covenant, refusal of speculative/extractive structures, no land flips / no extractive leases / no founder-engineered residencies, building inheritable structures (waqf, written covenants, tarbiyah of children and arriving families).

**Reflection** — 2 rows (one per attr): khalīfah vs. proprietor decision review, durable-structure investment review.

Every attribute and dua carries a `Source:` citation from canonical Quran verses (Amanah Gate satisfied — all refs are deterministic chapter:verse).

Wrapped `src/App.jsx:238`:
- Before: `<Route path="pillar/moontrance" element={<MoontraceDashboard />} />`
- After:  `<Route path="pillar/moontrance" element={<CeremonyGuard moduleId="moontrance"><MoontraceDashboard /></CeremonyGuard>} />`

Pattern matches `/pillar/ummah` (composite pillar with submodules — no `isLevel1` prop).

## Outcome

- `npm test` → 56/56 passing
- `npm run lint` → clean; all 3 ratchets at minimum (per-pillar legacy 0, empty-array 1, inline-refs 0)
- `npm run build` → seed-task chunks transformed; the moontrance MODULE_ATTRS block parses cleanly. Build itself fails on a pre-existing unrelated `@ogden/ui-components/style.css` workspace resolution issue from `src/main.jsx` (not introduced by this change; same failure exists at parent `main`)
- All eight pillar dashboard routes now uniformly wrapped in CeremonyGuard
- Amanah Gate coverage extended to Moontrance: every attribute and dua cites a canonical Quranic source

## Consequences

**Positive:**
- The CeremonyGuard surface is now uniform across all pillars — entering `/pillar/moontrance` triggers the same naming-and-frame ceremony users already see for the other seven pillars.
- The integrating top-level frame (Mālik al-Mulk + Al-Wāriṯ) makes the Moontrance ethic explicit at the dashboard level, not just within the three submodule pages.
- The two attrs map cleanly to the two existential risks of land/season/residency work: treating it as private property (Mālik al-Mulk corrective) and building only for the founder's lifetime (Al-Wāriṯ corrective).

**Risks accepted:**
- The pre-existing `@ogden/ui-components/style.css` resolution failure in `npm run build` was not addressed — out of scope for this change. Tests + lint + module transform all pass; the failure is at the workspace-bundle level only.
- No NotebookLM grounding pass was applied to Moontrance seed-tasks (which are currently absent / stubbed). The MODULE_ATTRS authoring closes the *guard* surface; a future seed-task pass would extend the *grounding* surface to match the seven other pillars. Lower priority than the launch-readiness milestone now achieved.
- Quran 11:61 was selected as the opening dua based on its direct semantic fit (`istaʿmara` — settled to develop) rather than NotebookLM corpus probing; the verse is canonical chapter:verse so no defect risk, but a future pass could probe alternative candidates if the user wants to compare.

**Next session candidate:** Optional Moontrance seed-task authoring + grounding pass. Lower priority than the wiki/index refresh and any user-driven feature work.
