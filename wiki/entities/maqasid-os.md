---
title: "Maqasid OS"
type: entity
created: 2026-04-09
updated: 2026-04-17
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

Active development on V2.1. Rich subtask descriptions (Why/How format) now complete for 6 of 7 pillars: Faith, Life, Intellect, Family, Wealth (236 subtasks), and Environment (226 subtasks). Only Ummah remains. 35-finding technical audit remediation completed across 8 sprints (2026-04-10 to 2026-04-11). Dashboard refreshed with `PillarProgressStrip` and live Maqasid Focus panel. Module dashboards for all seven pillars implemented. BBOS pipeline integrated. AyahBanner polished. Family pillar Islamic data bootstrapped — `MODULE_ATTRS['family']` now has full dua (Quran 25:74), divine attrs (Al-Wadud, Al-Qayyum), readiness checks, and reflection, unblocking the Opening Threshold for all family sub-modules. Intellect "Professional" sub-module renamed to "Skill Proficiency" across all 5 data/page files.

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
| 2026-04-12 | AyahBanner polish: Amiri font, centered layout (label + Arabic + translation + source), col-edge overlap fix (`left: var(--edge-w)`), topbar z-index 10→16, opaque surface background. Spacing tweak: `--space-6` → `--space-3` below banner. Intellect submodule renamed "Skill Proficiency" (was "Professional Mastery") across 5 files. Family Islamic data bootstrapped in `MODULE_ATTRS` — dua Quran 25:74, Al-Wadud + Al-Qayyum, full readiness + reflection. |
| 2026-04-12 | Dashboard refresh: replaced static PillarCard grid with `PillarProgressStrip` (task-based status coloring, pillar accent borders, Arabic roots), replaced "coming soon" with live Maqasid Focus panel (pillars by open task count), trimmed stat cards to 2, renamed EPH → "Today", added OVERVIEW + MAQASID AL-SHARI'AH section labels. Bug fixed: pillar resolution must use `project.id.startsWith(pillar.id + '_')` as primary (subModuleId strings do not match project.moduleId for faith/life/intellect/family/environment). |
| 2026-04-11 | Family module: added Family Office — embedded Office module accessible as (1) tab within `/app/family` (FamilyPage) and (2) dedicated sidebar entry at `/app/family-office`. |
| 2026-04-09 | Wiki entity page bootstrapped. Monorepo expanded with ogden-hub subtree and atlas submodule. Knowledge graph at 882 nodes / 1,438 edges / 47 communities. |
| 2026-04-17 | Subtask Sources view upgraded with `QuranEmbed` (live quran.com iframe, offline fallback) and `HadithCard` (509 bundled hadith, Amiri Arabic). Seed copy standardized (Why?/How?, heading renames, HR removed). 4 module icons refreshed; lucide-react bumped 0.511 → 1.8. Commits `1ae2793`, `cd5bd55`. |
| 2026-04-17 | Ummah pillar converted to PillarLevelPage pattern. Added `UMMAH_BOARDS` (18 boards: 6 submodules × 3 levels), `ensureUmmahProjects`, `UmmahLevelNavigator`, `UmmahPillarPage`. All 6 submodule pages (Collective, Neighbors, Community, Moontrance Land/Seasonal/Residency) rewritten from legacy `PillarHeader + ViewToggle + OverviewCards/MaqasidTable` to minimal `<UmmahPillarPage pillarKey="…" />` wrappers. OVERVIEW + MAQASID content relocated to `UmmahDashboard` as collapsible "Frameworks" section. Build passes at 2645 modules. Seeded tasks (450 subtasks across 90 tasks) authored in prior session via 6 parallel agents — citation verification pass still deferred. |
