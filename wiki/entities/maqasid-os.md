---
title: "Maqasid OS"
type: entity
created: 2026-04-09
updated: 2026-04-11
tags: [product, spa, react, islamic, operating-system, seven-maqasid]
sources: 0
---

# Maqasid OS

Maqasid OS V2.1 is an Islamic life operating system built as a React 19 single-page application with Zustand 5 state management, React Router 7 navigation, and Vite 8 bundling. It manages work, money, people, and operations across the Seven Maqasid — Faith, Life, Intellect, Family, Wealth, Environment, and Ummah — providing module dashboards with a three-tier detail design, [[bbos-pipeline]] integration, and Islamic UI components such as CeremonyGate, ReadinessCheck, and PrayerOverlay. The project uses a CONTEXT.md routing hierarchy for developer orientation and is deployed via GitHub Pages. The monorepo now includes `website/` ([[ogden-hub]] subtree) and `atlas/` ([[atlas]] git submodule). Its knowledge graph, built via [[graphify]], contains 1,012 nodes, 1,517 edges, and 126 communities.

## Key Facts

- **Stack:** React 19 + Zustand 5 + React Router 7 + Vite 8 + dnd-kit + Lucide icons + date-fns
- **Architecture:** SPA with module dashboards, three-tier detail design (overview / detail / action)
- **Modules:** Faith, Life, Intellect, Family, Wealth, Environment, Ummah, plus BBOS, Money, People, CRM
- **Islamic UI components:** CeremonyGate, ReadinessCheck, PrayerOverlay, ThresholdModal, ResumeOverlay
- **Context system:** CONTEXT.md routing hierarchy — root routes to domain-level files before source is touched
- **Deployment:** GitHub Pages
- **Monorepo structure:** `src/` (app), `website/` ([[ogden-hub]]), `atlas/` ([[atlas]])
- **Knowledge graph:** 1,012 nodes, 1,517 edges, 126 communities via [[graphify]]

## Current Status

Active development on V2.1. 35-finding technical audit remediation completed across 8 sprints (2026-04-10 to 2026-04-11). Module dashboards for all seven pillars implemented with three-tier detail design. BBOS pipeline integrated with Two-Factory visual split and Assembly Gate UI. MoneyDashboard rewritten from mock data to live store-computed values. SearchPalette expanded to 5 sources (projects, tasks, modules, people, events). Dashboard empty state for new users. Islamic grounding components (CeremonyGate, ReadinessCheck, PrayerOverlay, NiyyahAct) functional with sessionStorage-backed ceremony state. Monorepo includes [[ogden-hub]] and [[atlas]].

## Connections

- [[bbos-pipeline]] — Business operating system module integrated into the app
- [[ogden-hub]] — Marketing site merged as subtree at `website/`
- [[atlas]] — Land intelligence app linked as git submodule at `atlas/`
- [[graphify]] — Knowledge graph extraction tool used for codebase analysis
- [[maqasid-al-shariah]] — Jurisprudential framework grounding the Seven Maqasid pillar system
- [[amanah-gate]] — Ethical screening pattern used in BBOS qualification stage
- [[ceremony-gate-pattern]] — UI pattern for Islamic ritual transitions (prayer, readiness)
- [[covenant-architecture]] — Structural philosophy governing pipeline and module design

## Open Questions

- Will the three monorepo segments (app, website, atlas) share any dependencies or remain fully isolated?
- What is the deployment strategy for atlas.ogden.ag vs the main GitHub Pages site?
- ~~Should the knowledge graph be regenerated after the audit remediation completes?~~ Done — regenerated 2026-04-11 (1,012 nodes, 126 communities)
- When will the dual contact stores (contacts_v2 / crm_contacts) be unified? (see ADR: [[dual-contact-stores]])

## History

| Date | Event |
|---|---|
| 2026-04-11 | Technical audit remediation Sprint 4: threshold-store sessionStorage migration for ceremony state (#19), Niyyah skip action (#14), geolocation 3-attempt retry with IP fallback (#20). |
| 2026-04-11 | Sprint 5: localStorage guardrails — 500 KB attachment limit with quota estimation (#22), message pruning at 500/channel (#23), dual-contact-stores ADR (#25). |
| 2026-04-11 | Sprint 6: MoneyDashboard rewritten from mock data to store-computed values (#15). Dashboard empty state for new users (#11). TechOverview "Simulated" badge (#16). SearchPalette expanded to 5 sources (#18). BudgetTab placeholder (#24). |
| 2026-04-11 | Sprint 7: BBOS Two-Factory visual split + Assembly Gate UI (#32A-B). G-Label descriptions in picker (#32C). Pipeline sub-stage progress indicators (#32D). Mobile breadcrumb visibility (#33). |
| 2026-04-11 | Sprint 8: Documentation freshness — 4 CONTEXT.md files updated, wiki entities synced, lessons learned populated, bundle size ADR filed. |
| 2026-04-11 | Family module: added Family Office — embedded Office module accessible as (1) tab within `/app/family` (FamilyPage) and (2) dedicated sidebar entry at `/app/family-office`. |
| 2026-04-09 | Wiki entity page bootstrapped. Monorepo expanded with ogden-hub subtree and atlas submodule. Knowledge graph at 882 nodes / 1,438 edges / 47 communities. |
