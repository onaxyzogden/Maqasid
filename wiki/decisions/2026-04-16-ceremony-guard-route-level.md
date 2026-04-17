---
title: "CeremonyGuard — Route-Level Ceremony Gating"
type: decision
date: 2026-04-16
status: active
---

# CeremonyGuard — Route-Level Ceremony Gating

## Context

Graphify analysis (2026-04-11) flagged `threshold-store` as the highest-centrality node in the module graph — 93 edges, 10 communities, betweenness 0.133. 63 of those edges were individual pillar-page imports of `useThresholdStore` + `CeremonyGate` to gate module entry.

The per-page pattern was boilerplate:
```jsx
const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['faith-salah']);
if (!hasCompletedOpening) return <CeremonyGate moduleId="faith-salah" />;
return <FaithPillarPage pillarKey="salah" />;
```

Issues:
- Gate enforcement was opt-in; easy to forget on new pages.
- Ceremony gating — a cross-cutting concern (Islamic grounding before module entry) — was expressed as per-page logic rather than architecture.
- The threshold-store edge count inflated the apparent centrality of the store and obscured its actual behavioral surface.

## Decision

Introduce `<CeremonyGuard moduleId="...">` (`src/components/islamic/CeremonyGuard.jsx`) as a route-level wrapper. `App.jsx` wraps each gated route element:

```jsx
<Route path="faith-salah" element={<CeremonyGuard moduleId="faith-salah"><FaithSalahPage /></CeremonyGuard>} />
```

The guarded page becomes pure content — no `useThresholdStore` import, no gate check. `CeremonyGuard` subscribes to `completedOpening[moduleId]` and renders either `<CeremonyGate />` or `children`.

### Phasing

- **Phase 1 (done 2026-04-16):** Applied to the 28 thin sub-pillar routes — `faith-shahada/salah/zakah/sawm/hajj`, `life-physical/mental/safety/social`, `intellect-learning/thinking/cognitive/professional`, `family-marriage/parenting/kinship/home`, `wealth-earning/financial/ownership/circulation`, `env-resource/waste/ecosystem/sourcing`, `moontrance-land/seasonal/residency`. Those 28 page files simplified.
- **Phase 2a (done 2026-04-16):** Homogeneous business-module cluster lifted — `Work`, `Money`, `People`, `Office`, `Tech`. Standalone routes wrapped in `<CeremonyGuard moduleId="...">`; in-body `useThresholdStore` + `CeremonyGate` stripped. **Embedded-variant decision (option a):** embedded routes under `/work/:projectId/*` are NOT individually wrapped — the parent `Project` route's own "work" gate already covers them, matching pre-refactor behavior (the in-body gate skipped when `embedded === true`). The `embedded` prop is preserved in the page signatures because it still governs `<PillarHeader>` rendering.
- **Phase 2b-ummah (done 2026-04-16):** Ummah cluster lifted — `FamilyPage`, `Neighbors`, `Community`, `CollectivePage`. All 4 had static moduleId matching the route path (`family`, `neighbors`, `community`, `collective`), no embedded variants, and only benign hooks (`useState`, `useAyahBanner`). Routes wrapped in `<CeremonyGuard>`; in-body gate code stripped. **Side-effect behavior change accepted as a latent-bug fix:** `useAyahBanner` previously ran before the gate returned — so while the user sat on the CeremonyGate, the global ayah banner was already populated with that module's ayah. Post-lift, the page doesn't mount while gated, so the banner stays cleared until the user passes the gate. This is the more correct "nothing appears until you open" semantics the ceremony intends.
- **Phase 2c-sources (closed 2026-04-16 as no-op + cleanup):** The "sources cluster" was a misreading — only `SourcesPage` is routed at `/app/sources`; `QuranPage`, `HadithPage`, `IslamicKnowledgePage` are not routes, they're tab content rendered inside `SourcesPage`, each gating independently as `"quran"`, `"hadith"`, `"islamic-knowledge"`. `FivePillars.jsx` was dead code (no live imports). **Decision: option (B)** — do NOT lift the 3 tab-content gates. Per-tab gating is the intended semantic (Quran/Hadith/Knowledge are distinct openings, not a single "sources" threshold), and collapsing them into one route-level gate would change user-visible behavior, not just wiring. In-body pattern stays for these 3. Dead `FivePillars.jsx` deleted (`FivePillars.css` retained — still used by `OverviewCards.jsx`). If future work wants to remove the remaining in-body gates here, the right vehicle is a dynamic-guard component (same category as Phase 2d below) that reads `searchParams.get('tab')` — handle alongside `ModulePlaceholder`/`ComingSoon`.
- **Phase 2d (deferred):** 3 thick pages still gate themselves in-body. **dynamic** (`ModulePlaceholder`, `ComingSoon` — `moduleId` from `useParams`; needs extension of `CeremonyGuard` or a sibling dynamic-guard component — and optionally extended to also handle the sources tab case via `searchParams`), **route-id-mismatch** (`Project.jsx` gates `"work"` not `"project"` — needs explicit mapping or pathed inheritance).

## Rationale

- **Enforcement by architecture, not discipline.** New thin sub-pillar pages added via `App.jsx` get gating automatically.
- **Page files express intent, not plumbing.** A pillar page is now literally the content it renders.
- **Behavior preserved.** The gate UI, store reads/writes, deferred flow, and skip flow are unchanged — only the wiring moved up a layer.
- **Thick pages deferred, not ignored.** Each has a specific reason the simple wrapper doesn't fit; lumping them in would either regress behavior or force the guard to grow features it shouldn't.

## Consequences

- `threshold-store` edges drop by ~28 (one `useThresholdStore` subscription per thin page removed, replaced by one in `CeremonyGuard`).
- `App.jsx` grows slightly longer — explicit wrapper nodes per gated route. Acceptable tradeoff for gating visibility in the routing tree.
- The `src/components/islamic/CONTEXT.md` file now documents two coexisting modes (route-level vs. in-body) until Phase 2 ships.
- `CeremonyGuard` intentionally does NOT read `useParams` — keeping it a pure prop-driven component. Phase 2 will handle dynamic-moduleId cases explicitly (Placeholder/ComingSoon).

## References

- Component: `src/components/islamic/CeremonyGuard.jsx`
- Routing: `src/App.jsx` (28 thin routes wrapped)
- Pages simplified: 28 files under `src/pages/{faith,life,intellect,family,wealth,environment,ummah}/`
- Related memory: `project_ceremony_guard_refactor.md`
- Source of analysis: graphify run 2026-04-11
