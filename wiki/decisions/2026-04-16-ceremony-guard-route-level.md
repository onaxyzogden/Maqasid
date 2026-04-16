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
- **Phase 2 (deferred):** ~16 thick pages still gate themselves in-body — `Work`, `Money`, `People`, `Office`, `Tech`, `Project`, `FamilyPage`, `Neighbors`, `Community`, `CollectivePage`, `FivePillars`, `HadithPage`, `IslamicKnowledgePage`, `QuranPage`, `ModulePlaceholder`, `ComingSoon`. Reasons for deferral: hooks before the gate check, dynamic moduleId (Placeholder/ComingSoon), embedded variants inside `/work/:projectId`, or route-id mismatch (`Project.jsx` gates `"work"`).

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
