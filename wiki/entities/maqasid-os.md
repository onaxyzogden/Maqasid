---
title: "Maqasid OS"
type: entity
created: 2026-04-09
updated: 2026-04-09
tags: [product, spa, react, islamic, operating-system, seven-maqasid]
sources: 0
---

# Maqasid OS

Maqasid OS V2.1 is an Islamic life operating system built as a React 19 single-page application with Zustand 5 state management, React Router 7 navigation, and Vite 8 bundling. It manages work, money, people, and operations across the Seven Maqasid — Faith, Life, Intellect, Family, Wealth, Environment, and Ummah — providing module dashboards with a three-tier detail design, [[bbos-pipeline]] integration, and Islamic UI components such as CeremonyGate, ReadinessCheck, and PrayerOverlay. The project uses a CONTEXT.md routing hierarchy for developer orientation and is deployed via GitHub Pages. The monorepo now includes `website/` ([[ogden-hub]] subtree) and `atlas/` ([[atlas]] git submodule). Its knowledge graph, built via [[graphify]], contains 882 nodes, 1,438 edges, and 47 communities.

## Key Facts

- **Stack:** React 19 + Zustand 5 + React Router 7 + Vite 8 + dnd-kit + Lucide icons + date-fns
- **Architecture:** SPA with module dashboards, three-tier detail design (overview / detail / action)
- **Modules:** Faith, Life, Intellect, Family, Wealth, Environment, Ummah, plus BBOS, Money, People, CRM
- **Islamic UI components:** CeremonyGate, ReadinessCheck, PrayerOverlay, ThresholdModal, ResumeOverlay
- **Context system:** CONTEXT.md routing hierarchy — root routes to domain-level files before source is touched
- **Deployment:** GitHub Pages
- **Monorepo structure:** `src/` (app), `website/` ([[ogden-hub]]), `atlas/` ([[atlas]])
- **Knowledge graph:** 882 nodes, 1,438 edges, 47 communities via [[graphify]]

## Current Status

Active development on V2.1. Module dashboards for all seven pillars implemented with three-tier detail design. BBOS pipeline integrated. Islamic grounding components (CeremonyGate, ReadinessCheck, PrayerOverlay) functional. People module undergoing a significant refactor (many files deleted/restructured per recent git status). Monorepo expanded to include [[ogden-hub]] and [[atlas]] as of 2026-04-09.

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

- How will the People module refactor settle — what is the target component structure?
- Will the three monorepo segments (app, website, atlas) share any dependencies or remain fully isolated?
- What is the deployment strategy for atlas.ogden.ag vs the main GitHub Pages site?
- Should the knowledge graph be regenerated after the People module refactor completes?

## History

| Date | Event |
|---|---|
| 2026-04-09 | Wiki entity page bootstrapped. Monorepo expanded with ogden-hub subtree and atlas submodule. Knowledge graph at 882 nodes / 1,438 edges / 47 communities. |
