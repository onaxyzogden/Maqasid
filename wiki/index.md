---
title: "Wiki Index"
type: index
updated: 2026-04-25
---

# Wiki Index

Catalog of all wiki pages. Claude reads this first to orient at the start of every session.

## Entities

| Page | Summary |
|---|---|
| [[milos]] | Islamic life operating system — React 19 SPA managing work, money, people across Seven Maqasid |
| [[ogden-hub]] | Static marketing/landing site at bismillah.ogden.ag |
| [[olos]] | Geospatial land intelligence app — React + TypeScript + MapboxGL + Fastify + PostGIS |
| [[bbos-pipeline]] | Barakah Business Operating System — 9-stage covenant pipeline (IDY/CRD/STR/OFR/OUT/SLS/DEL/RET/OPT) for Islamic business |
| [[ogden-ecosystem]] | Meta-module tracking BBOS + MILOS + Atlas convergence into Moontrance (Foundation/Integration/Realization) |
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
| [[motif-tokens]] | Shared `--motif-*` design-system vocabulary (halo, ghost-text, soft-glass, shimmer-border, editorial serif) composed by pages rather than duplicated |

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
| [[2026-04-22-wheel-two-axis-color-and-wealth-icon-canon]] | 2026-04-22 | MaqasidComparisonWheel gains per-module `themeColor` (band) decoupled from universal `LEVEL_COLORS` (fill); `.mcw-seg-bg` hover dim inverted (rest=light, peer=dark); Wealth submodule icons canonicalized and Earning↔Circulation swapped |
| [[2026-04-22-icon-registry-consolidation]] | 2026-04-22 | Consolidated 10 duplicated icon-name → component maps into single `src/data/icon-registry.js`. Eliminates the drop-on-unused-import bug class that caused blank Ummah sidebar glyphs earlier in the session |
| [[2026-04-22-bundle-code-split-three-phase]] | 2026-04-22 | Three-phase code-split: lazy SubtaskSources, `/app/sources` route, Work subtree + react-markdown. Main chunk gzip 2,533 → 541 kB (-76%); initial JS ~614 kB gz |
| [[2026-04-22-atlas-jsonb-serialization-and-ssurgo-parse]] | 2026-04-22 | Atlas Tier-3 end-to-end verification on Rodale surfaced + fixed two prod-blockers: SSURGO SDA parse (needed `format=JSON+COLUMNNAME`) and jsonb double-serialization across 5 writers (`JSON.stringify` → `db.json(x as never) as unknown as string`). Overall score 50 → 78, parity delta 0.000 |
| [[2026-04-23-dashboard-three-tier-redesign]] | 2026-04-23 | Main dashboard reorganized into Qalb/Amal/Barakah tiers; killed Open Tasks/Activity Feed/Maqasid Focus; merged Manifesto+Reflect→DailyMithaq (Maghrib pivot); reframed WorkflowPressure→SakinahMeter; new 7-axis MaqasidBalanceRadar |
| [[2026-04-23-prophetic-path-intro-removed]] | 2026-04-23 | Prophetic Path `.pp-intro` removed entirely — ribbon opens directly under TopBar; only `.pp-niyyah-echo` renders when a niyyah is set; supersedes the Living Anchor decision |
| [[2026-04-23-prophetic-path-living-anchor]] | 2026-04-23 | Prophetic Path `pp-intro` reduced to a two-line Living Anchor (city eyebrow + Fajr·Maghrib bookends) — Scholar-led Semantic Reduction, countdown line trimmed by user as duplicative of the ribbon `next` chip |
| [[2026-04-23-flo-redesign-promotion]] | 2026-04-23 | FLO Redesign promoted onto shared `LevelOverviewPage` — all 7 pillars inherit 2px pillar top rule (from MAQASID_PILLARS accentColor), editorial serif titles, calm-peer 60%, container-less wheel with pillar aura, bento Active Neutrality; prototype retired |
| [[2026-04-23-flo-redesign-prototype]] | 2026-04-23 | FLO Redesign — scoped `.flo-rx` prototype at `/app/flo-redesign-test` rehouses shared LevelOverviewPage with calm-peer tiers, container-less wheel, Active Neutrality bento, and 2px pillar top rule; shared page untouched |
| [[2026-04-25-ogden-ecosystem-presentation-mode]] | 2026-04-25 | OGDEN Ecosystem Presentation Mode — fullscreen `/present/ogden` route wraps existing wheel with keyboard beat sequencer (0/Esc, 1/2/3, 4, z/Z, →, i); additive props `forceHover` / `forceConverged` / `centerLabelOverride` / `seg.color` / `seg.tooltip*`; descriptive tooltip anchored bottom-center to avoid left-sector clipping |
| [[2026-04-23-prophetic-path-compressed-ribbon]] | 2026-04-23 | Prophetic Path Phase 1+2+3 — Scholar's Pattern A compressed ribbon; state-driven sizing; editorial serif + ghost-text + purposeful aura; canonical MAQASID_PILLARS accent resolver on chips with 4s Maqasid pulse shimmer on active; `data-side` prop fully purged |
| [[2026-04-23-landing-hero-scholar-polish]] | 2026-04-23 | Landing hero phase 1 — UI/UX Scholar consult applied: Cormorant Garamond H1 (300wt, -0.02em), soul-language copy rewrite, hero-scoped CTA press state, edge-blurred Ummah-signal marquee; items 4–5 (breaking-the-box, Bento grid) deferred |
| [[2026-04-23-prophetic-path-isha-order-and-rotation]] | 2026-04-23 | Prophetic Path — `isha` moved to sit after `maghrib` (canonical cycle corrected); spine rotates so the currently-active node is always at the top while preserving cycle order |
| [[2026-04-23-landing-hero-scholar-polish-phase-2]] | 2026-04-23 | Landing hero phase 2 — break-the-box Faith ring (absolute-positioned, right: -120px) with 4s Maqasid Pulse traveling shimmer via `strokeDasharray 250/1005` gradient head; `.hero-modules` chip row replaced with `.hero-bento` 8-card grid (4×2 desktop / 2×4 mobile) with per-pillar accent, 28px 0% Mastery Rings, and progressive-disclosure descriptions on `:hover` / `:focus-within` |
| [[2026-04-24-atlas-ca-tier3-verification-crs-and-race-fixes]] | 2026-04-24 | Atlas Tier-3 end-to-end verification on Milton, ON surfaced + fixed four CA-path defects: CA-1 NRCan STAC queryable, CA-2 ECCC `data_period` date coercion, CA-3 HRDEM COGs are EPSG:3979 (proj4 reprojection added to `ElevationGridReader`), CA-4 writer-vs-layers race (writer now gates on Tier-3 derived `project_layers` presence). Milton overall 73.0, parity delta 0.000 |
| [[2026-04-24-task-detail-panel-scholar-refit]] | 2026-04-24 | TaskDetailPanel modal refit applying NotebookLM UI/UX Scholar's 5 answers: editorial serif title (Q1), priority eyebrow demoted (Q2), homogeneous-tier rollup to section header (Q3), ghost Done button with shimmer-on-ready (Q4), receding description via motif-ghost color-mix (Q5); pattern propagated to InlineTaskDetail |
| [[2026-04-25-milos-pre-test-tier-1-fixes]] | 2026-04-25 | Phase A of pre-test audit: CeremonyGuard wrapping for 8 thick pillar routes + catch-all (App.jsx 225-233); silent storage/migration `catch {}` replaced with logged warnings + storage-error events; toastStore vs toast-store documented as intentional twins (audit was wrong about orphan); Onboarding `finish()` seeds today's niyyah from selections so no second ceremony on first dashboard visit; two original audit findings (T1.1, T1.4) verified incorrect |
| [[2026-04-25-milos-tier-2-polish]] | 2026-04-25 | Phase B of pre-test audit: 23 pillar-wisdom + next-actions stubs replaced with quran.ai-grounded content; Prophetic Path graduated test→prod with redirect; new `ChunkErrorBoundary` wraps App + TaskDetailPanel Suspense (Retry on chunk-load failure); PropheticPath surfaces prayer-times degraded banner with Retry; storage `safeSet` adds `navigator.storage.estimate()` pre-probe for >200KB writes; Moontrance routes lazy-split (-322KB index). Audit correction: Ummah seed-tasks already grounded (525 subtasks, 0 missing). Caveat: LevelNavigator 4.7MB chunk root cause is shared data hoisting — deferred |
| [[2026-04-25-milos-tier-3-cleanup]] | 2026-04-25 | Phase C of pre-test audit (session close): persistence-tier comment block in `threshold-store.js`; new `formatDate` canonical helper at `src/lib/format-date.js` (`MMM d, yyyy` default) + concept doc; 6 hard-coded hex sites in PillarBoard + TaskDetailPanel migrated to tokens. Two audit corrections: (1) the 4 shimmer keyframes animate different properties and aren't redundant; (2) dark-mode coverage was already correct via 100+ token remappings in `tokens.css`, verified live in preview. Pre-test audit fully closed |

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
