---
title: "Wiki Index"
type: index
updated: 2026-04-22
---

# Wiki Index

Catalog of all wiki pages. Claude reads this first to orient at the start of every session.

## Entities

| Page | Summary |
|---|---|
| [[milos]] | Islamic life operating system — React 19 SPA managing work, money, people across Seven Maqasid |
| [[ogden-hub]] | Static marketing/landing site at bismillah.ogden.ag |
| [[olos]] | Geospatial land intelligence app — React + TypeScript + MapboxGL + Fastify + PostGIS |
| [[bbos-pipeline]] | Barakah Business Operating System — 8-stage covenant pipeline for Islamic business |
| [[graphify]] | Knowledge graph tool — builds persistent graphs from codebases with community detection |
| [[claude-os]] | Claude OS / Model Workspace Protocol — 3-layer system architecture governing Claude Code across projects |
| [[money-dashboard]] | Money Dashboard — Balance overview chart, store bindings, bar chart data model |
| [[chart-tooltips]] | ChartTooltip shared component — portal-rendered tooltips for all chart types |

## Concepts

| Page | Summary |
|---|---|
| [[maqasid-al-shariah]] | The higher objectives of Islamic law — preservation of faith, life, intellect, family, wealth |
| [[amanah-gate]] | Permissibility check protocol — ethical gate before any task execution |
| [[amanah-gate-protocol]] | Amanah Gate Protocol — universal Bayyinah/Qarina/Niyyah evidence tier system across all OGDEN products |
| [[ceremony-gate-pattern]] | UI access gating pattern — module entry overlay requiring Islamic grounding |
| [[covenant-architecture]] | System design philosophy — structuring software around Islamic covenant principles |

## Decisions

| Page | Date | Summary |
|---|---|---|
| [[2026-04-09-merge-ogden-hub-subtree]] | 2026-04-09 | Merged ogden-hub website into monorepo via git subtree at website/ |
| [[2026-04-09-atlas-as-submodule]] | 2026-04-09 | Linked OLOS as git submodule (too complex for subtree merge) |
| [[2026-04-09-bootstrap-llm-wiki]] | 2026-04-09 | Bootstrapped LLM Wiki to replace NotebookLM as authoritative context source |
| [[2026-04-11-dual-contact-stores]] | 2026-04-11 | Accept dual contact stores (contacts_v2 / crm_contacts) isolation until test framework exists |
| [[2026-04-11-bundle-size-2mb]] | 2026-04-11 | Accept 2 MB monolithic bundle — revisit at 3 MB or multi-user deployment |
| [[2026-04-14-amanah-gate-protocol]] | 2026-04-14 | Amanah Gate Protocol named as cross-product pattern — tiered evidential honesty in OLOS, BBOS, MTC |
| [[2026-04-16-threshold-content-phased-fix]] | 2026-04-16 | Phased repair of Threshold popup content — Phase 0 code-path fixes done; Phase 1 Islamic content pillar-by-pillar; Phase 2 universal |
| [[2026-04-16-ceremony-guard-route-level]] | 2026-04-16 | CeremonyGuard wrapper lifts ceremony gating to the route layer — Phase 1 applied to 28 thin pillar pages; thick pages deferred |
| [[2026-04-16-hadith-semantic-reranker]] | 2026-04-16 | V3 hadith enrichment — multilingual sentence-transformer embeddings replace lexical scoring; 322 blocks sourced at ~60% strong quality |
| [[2026-04-17-quran-hadith-citation-cards]] | 2026-04-17 | Rich Quran iframe + offline HadithCard replace inline narration in subtask Sources view; 509 hadith bundled |
| [[2026-04-17-lucide-react-1-8-upgrade]] | 2026-04-17 | Upgrade lucide-react 0.511 → 1.8 to unlock HousePlus / MapPinned and refresh 4 module icons |
| [[2026-04-17-ummah-pillar-level-page]] | 2026-04-17 | Ummah pillar adopts shared PillarLevelPage pattern; 6 submodule pages collapsed to wrappers; OVERVIEW + MAQASID relocated to UmmahDashboard Frameworks section |
| [[2026-04-18-milos-grounding-two-axis]] | 2026-04-18 | Two-axis evidence schema for subtask grounding — provenanceTier (Amanah Gate, unchanged) + relevance (direct/contextual/thematic) |
| [[2026-04-19-dashboard-sanctuary-mode]] | 2026-04-19 | Dashboard Sanctuary Mode — niyyah-driven Sun & Stars layout, Focus Task List, Context Widgets, Evening Reflection, rollover self-healing, Yesterday's Echo |
| [[2026-04-20-dashboard-wheel-test-prototype]] | 2026-04-20 | Dashboard Wheel Test prototype — standalone route hosting Maqasid Comparison Wheel (custom SVG, center-origin gradient); superseded by 2026-04-21 promotion |
| [[2026-04-21-faith-dashboard-wheel-promotion]] | 2026-04-21 | Maqasid Comparison Wheel + Path to Excellence promoted onto Faith overview below Level Navigator; wheel recolors per selected level via `levelColor` prop |
| [[2026-04-21-threshold-orient-not-excuse]] | 2026-04-21 | Opening Threshold reframed: no Defer exits, no Confirm gate, readiness is a naming moment, finalize is bilingual Bismillah / Alhamdulillah |
| [[2026-04-21-prophetic-prayer-phase-tasks]] | 2026-04-21 | PropheticPath phase schema: `prayer-phase:*` tags + per-node `phaseMatchers`; Before button rewired from Threshold modal to phase-filtered task list |
| [[2026-04-21-prophetic-transition-phase-tasks]] | 2026-04-21 | Morning & Isha-rest non-prayer nodes: 5 new parent tasks (waking/morning adhkar, evening adhkar, pre-sleep, end-of-morning) with `phaseMatchers` closing the transition-sunnah gap |
| [[2026-04-21-project-pillar-tagging-submodule-slideup]] | 2026-04-21 | MirrorCard Education tab enumerates pillar submodules via registry; SubmoduleSlideUp opens canonical PillarLevelPage; `/app/work` New Project dialog tags projects with pillar/submodule `moduleId` |
| [[2026-04-21-prayer-slide-up-fln]] | 2026-04-21 | Prayer slide-up rebuilt as FLN carousel with 18 real `prayer_{pillar}_{phase}` boards; Option-A generic sunan duplication across 5 daily prayers; During renders hero, Before/After render kanban |
| [[2026-04-21-graphify-extraction-gaps]] | 2026-04-21 | graphify under-emits `imports` edges for `src/data/**` consumers, producing false-positive bridge nodes; targeted re-extraction is the accepted remedy |
| [[2026-04-22-mithaq-activation-nur-aura]] | 2026-04-22 | Round 5 wheel upgrade: daily Mithaq press-and-hold ritual on Qalb hub (1.5s) + Nur Aura icon bloom in OKLCH `brightAura`; wheel begins dormant until covenant renewed |
| [[2026-04-22-wheel-clickable-submodules-ios-fix]] | 2026-04-22 | Round 5.5: wheel segments + outer band become submodule nav buttons; hover contrast inversion; cursor-handoff crossfade via base-selector transitions; iOS Safari icon fix replaces `foreignObject` with nested SVG; Mithaq paused on Faith |
| [[2026-04-22-prayerhero-uiux-consult]] | 2026-04-22 | UI/UX Scholar NotebookLM consult on PrayerHeroDuring post-V1 flags (diacritical toggle UX, corner mode-toggle discoverability, halo vs austere bg). Identifies three V2 candidates vs. what we shipped |
| [[2026-04-22-timeline-islamic-layer-route]] | 2026-04-22 | IslamicPanel becomes route-aware on `/app/prophetic-path-test` — swaps module-centric body for prayer-phase window (header + ayah + dhikr + tasks); seeds reuse vetted AYAH_BANNER_DATA + ONGOING_DUA per Amanah Gate |

## Sources

| Page | Type | Summary |
|---|---|---|
| [[source-style-guide]] | document | Design tokens, color palette, typography from references/style-guide.md |
| [[source-voice-and-tone]] | document | Islamic terminology standards from references/voice-and-tone.md |
| [[source-component-library]] | document | Component catalog from references/component-library.md |
| [[source-notebooklm-migration]] | notebook | Ingested outputs from BBOS, Maqasid, and Clief Notes notebooks |
| [[notebooklm-grounding-corpora]] | reference | Muslim Scholar (1c17b03b) + Claude Scholar (91d2bd2b) — MILOS grounding pipeline corpora |

## Synthesis

_No synthesis pages yet._
