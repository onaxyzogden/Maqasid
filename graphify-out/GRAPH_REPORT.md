# Graph Report - .  (2026-04-09)

## Corpus Check
- Large corpus: 288 files · ~261,765 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 882 nodes · 1438 edges · 47 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 23 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `Islamic UI Components CONTEXT.md` - 17 edges
2. `BBOS Pipeline Components CONTEXT.md` - 11 edges
3. `Workflow Principles & Islamic Framework` - 10 edges
4. `Layout Components CONTEXT.md` - 10 edges
5. `People Module CONTEXT` - 10 edges
6. `parse_markdown_table()` - 9 edges
7. `scan_tree()` - 9 edges
8. `Zustand Stores CONTEXT.md` - 9 edges
9. `src/components/ CONTEXT.md â€” Component Router` - 8 edges
10. `cmd_audit()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `CeremonyGate Pattern â€” Module Access Gating` --semantically_similar_to--> `Amanah Gate â€” Permissibility Check Protocol`  [INFERRED] [semantically similar]
  src/components/islamic/CONTEXT.md → docs/principles.md
- `Amanah Gate Checklist` --semantically_similar_to--> `threshold-store.js`  [INFERRED] [semantically similar]
  stages/_template-gate.md → src/store/CONTEXT.md
- `Master-Detail Pattern â€” List + DetailPanel` --conceptually_related_to--> `CRM Module CONTEXT.md`  [INFERRED]
  references/component-library.md → src/components/crm/CONTEXT.md
- `Seven Maqasid (Faith, Life, Intellect, Family, Wealth, Environment, Ummah)` --conceptually_related_to--> `Sidebar â€” Left Nav with Pillar Groups`  [INFERRED]
  references/voice-and-tone.md → src/components/layout/CONTEXT.md
- `Portal Components â€” createPortal to Escape overflow:hidden` --conceptually_related_to--> `ThresholdModal.jsx â€” Full Ceremony Flow`  [INFERRED]
  references/component-library.md → src/components/islamic/CONTEXT.md

## Hyperedges (group relationships)
- **Islamic Ceremony System** — concept_ceremony_gate_pattern, component_ceremony_gate, component_threshold_modal_jsx, concept_readiness_check, store_threshold_store [EXTRACTED 0.95]
- **Context-First Routing System** — concept_context_first_protocol, concept_routing_hierarchy, concept_discovery_protocol, contextmd_root, src_components_contextmd [EXTRACTED 0.92]
- **BBOS Data Layer** — data_bbos_pipeline, data_bbos_task_definitions, data_bbos_role_access, component_bbos_task_panel, concept_bbos_pipeline [EXTRACTED 0.90]
- **Pillar Dashboard Islamic Data Consumer Pattern** — faith_dashboard, environment_dashboard, family_dashboard, pillar_dashboard_data_js, islamic_data_js, ceremony_gate, readiness_check [EXTRACTED 0.97]
- **Readiness Binary Routing System** — readiness_check, readiness_ayat_router, readiness_binary_key_pattern, data_ayat_context [EXTRACTED 0.95]
- **People Domain Store and Config Cluster** — people_store, contacts_store, contact_config_js, people_departments_js, recruitment_config_js, detail_panel, hr_page, contacts_page [EXTRACTED 0.92]
- **Shared Pillar Dashboard Pattern** — intellect_intellect_dashboard, life_life_dashboard, ummah_dashboard, wealth_dashboard [EXTRACTED 0.95]
- **Manual localStorage Persistence System** — store_app_store_js, store_task_store_js, store_money_store_js, store_people_store_js, store_contacts_store_js, store_storage_service, store_manual_persistence [EXTRACTED 0.95]
- **Stage Gate Review Cycle** — stages_template_gate, stages_naming_convention, stages_review_workflow, stages_amanah_gate_checklist [EXTRACTED 0.90]

## Communities

### Community 0 - "App Router & Module Pages"
Cohesion: 0.04
Nodes (0): 

### Community 1 - "Layout & Islamic Ceremony UI"
Cohesion: 0.03
Nodes (17): bbos-pipeline.js, BbosTaskPanel(), formatDateTime(), BBOS Data CONTEXT, Shared Components CONTEXT, formatDateTime(), TaskDetailPanel(), allFilled() (+9 more)

### Community 2 - "People & Contacts Management"
Cohesion: 0.04
Nodes (10): Aladhan Prayer Times API, ClockInsTab(), formatDuration(), initDepartments(), p(), Hooks and Services CONTEXT, migration.js â€” Schema Migration Service, Nominatim Geocoding API (+2 more)

### Community 3 - "Pathfinder CLI Tool"
Cohesion: 0.07
Nodes (48): add_inventory_row(), add_routing_row(), _apply_inventory_sync(), audit_line_counts(), audit_missing_contexts(), audit_orphan_files(), audit_routing_coverage(), audit_stale_entries() (+40 more)

### Community 4 - "BBOS Pipeline Components"
Cohesion: 0.06
Nodes (50): BBOS Pipeline Components CONTEXT.md, AppShell â€” Root Layout Component, BbosPipelineHeader â€” Stage Visualization, BbosRoleBadge â€” Role Abbreviation Badge, BbosRolePicker â€” Role Dropdown Picker, BbosTaskPanel â€” Task Detail Panel, CeremonyGate â€” Module Entry Overlay, ContactList.jsx â€” CRM CRUD Interface (+42 more)

### Community 5 - "ID Generator Service"
Cohesion: 0.04
Nodes (0): 

### Community 6 - "Pillar Readiness & Ayat Data"
Cohesion: 0.06
Nodes (16): CeremonyGate Component, Islamic Data CONTEXT, EnvironmentDashboard Page, FaithDashboard Page, FamilyDashboard Page, five-pillars-content.js, islamic-data.js, islamic-glossary.js (+8 more)

### Community 7 - "Data Layer & Config"
Cohesion: 0.06
Nodes (31): BBOS Task Integration Pattern, contact-config.js, ContactsPage Component, Ayat Data CONTEXT, Config Data CONTEXT, Static Data CONTEXT, Seed Tasks Data CONTEXT, DetailPanel Component (+23 more)

### Community 8 - "CRM & Activity Tracking"
Cohesion: 0.06
Nodes (7): initPipeline(), persistPipeline(), importAll(), safeSet(), getActivePrayer(), getNextPrayer(), parseTimeToDate()

### Community 9 - "Money & Financial Modules"
Cohesion: 0.07
Nodes (2): initCategories(), persistCategories()

### Community 10 - "Architecture Principles & Concepts"
Cohesion: 0.08
Nodes (32): Maqasid OS V2.1 CLAUDE.md, Amanah Gate â€” Permissibility Check Protocol, Context-First Protocol â€” Read CONTEXT.md Before Source Files, CSS Custom Properties Rule â€” Never Hardcode Colors, Discovery Protocol â€” Edit-Source / Update CONTEXT.md, Hemisphere Division â€” Human/Machine/Shared, Itqan â€” Excellence in Craft, Obsidian Visual Layer + Claude Code Execution Model (+24 more)

### Community 11 - "HR & Department Management"
Cohesion: 0.1
Nodes (6): countDays(), LeaveManager(), initDepartments(), persistDepartments(), getMonday(), TimeTracker()

### Community 12 - "Intellect Pillar Pages"
Cohesion: 0.08
Nodes (24): IntellectCognitivePage, Intellect Pages CONTEXT.md, IntellectDashboard, IntellectLearningPage, IntellectProfessionalPage, IntellectThinkingPage, Life Pages CONTEXT.md, LifeDashboard (+16 more)

### Community 13 - "BBOS Role Access & Pipeline UI"
Cohesion: 0.11
Nodes (2): formatDate(), KanbanCard()

### Community 14 - "Pillar Dashboards (Shared Pattern)"
Cohesion: 0.11
Nodes (2): isDoneColumn(), isTaskDone()

### Community 15 - "Stage Gates & Store Persistence"
Cohesion: 0.13
Nodes (18): Amanah Gate Checklist, stages/ Review Gates CONTEXT.md, Stage File Naming Convention, Stage Gate Review Workflow, app-store.js, contacts-store.js, Zustand Stores CONTEXT.md, crm-store.js (+10 more)

### Community 16 - "Office & Collaboration"
Cohesion: 0.12
Nodes (2): initChannels(), persistChannels()

### Community 17 - "Tech & Marketing Modules"
Cohesion: 0.11
Nodes (1): Tech Module CONTEXT

### Community 18 - "Gantt View & Date Utilities"
Cohesion: 0.25
Nodes (2): GanttView(), toDay()

### Community 19 - "Design Tokens & Styles"
Cohesion: 0.25
Nodes (9): Favicon SVG (Teal-Gold Gradient Crescent), BBOS Brand Accent Gold (#c9a05a), Styles and Design Tokens CONTEXT.md, Glassmorphism Design Pattern, global.css, landing.css, Seven Pillar Color Tokens, Primary Teal Color (#4ab8a8) (+1 more)

### Community 20 - "Community 20"
Cohesion: 0.25
Nodes (8): Modules Pages CONTEXT.md, CRM Module Page, Money Module Page, Office Module Page, People Module Page, Project Module Page, Tech Module Page, Work Module Page

### Community 21 - "Community 21"
Cohesion: 0.29
Nodes (7): Dashboard Page, Pages CONTEXT, Environment Pages CONTEXT, Faith Pages CONTEXT, Family Pages CONTEXT, PillarDashboard Page, Three-Tier Bento Dashboard Pattern

### Community 22 - "Community 22"
Cohesion: 0.4
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 0.4
Nodes (5): FivePillars Page, HadithPage, IslamicKnowledgePage, Islamic Pages CONTEXT.md, QuranPage

### Community 24 - "Community 24"
Cohesion: 0.5
Nodes (4): IslamicTerm Tooltip Component, React Portal Pattern, SearchPalette Component, useKeyboard Hook

### Community 25 - "Community 25"
Cohesion: 0.67
Nodes (1): tasks/ Workflow Workspace CONTEXT.md

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (1): BBOS â€” Barakah Business Operating System Pipeline

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (1): MaqasidTable Component

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (1): OverviewCards Component

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (1): PillarHeader Component

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (1): ViewToggle Component

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (1): KanbanCard Component

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (1): useInactivity Hook

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (1): useMobile Hook

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (1): useDashboard Utility Module

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (1): id.js â€” ID Generator Service

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (1): icons.svg (Social Icon Sprite Sheet)

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (1): React Logo SVG

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (1): Vite Logo SVG

## Ambiguous Edges - Review These
- `Drag-and-Drop Pattern â€” dnd-kit Kanban` → `DealPipeline.jsx â€” Kanban-Style Deal Stages`  [AMBIGUOUS]
  src/components/crm/CONTEXT.md · relation: conceptually_related_to

## Knowledge Gaps
- **130 isolated node(s):** `Split '| a | b | c |' into ['a', 'b', 'c'] (stripped).`, `Find a table whose header row contains header_keyword (case-insensitive).      R`, `Render a markdown table from headers and row data.`, `Find the line range of a markdown section by heading text.     Returns (heading_`, `Walk the project tree, skip SKIP_DIRS, return matching Paths.` (+125 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 26`** (2 nodes): `ActivityChart.jsx`, `ActivityChart()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `HealthPulse.jsx`, `HealthPulse()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `ModuleHealthCard.jsx`, `ModuleHealthCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (1 nodes): `eslint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `vite.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `five-pillars-content.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `hadith-overview.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `quran-overview.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `BBOS â€” Barakah Business Operating System Pipeline`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `MaqasidTable Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `OverviewCards Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `PillarHeader Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `ViewToggle Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `KanbanCard Component`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `useInactivity Hook`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `useMobile Hook`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `useDashboard Utility Module`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `id.js â€” ID Generator Service`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `icons.svg (Social Icon Sprite Sheet)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `React Logo SVG`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `Vite Logo SVG`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Drag-and-Drop Pattern â€” dnd-kit Kanban` and `DealPipeline.jsx â€” Kanban-Style Deal Stages`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `references/ CONTEXT.md â€” Factory Room` connect `Architecture Principles & Concepts` to `BBOS Pipeline Components`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **What connects `Split '| a | b | c |' into ['a', 'b', 'c'] (stripped).`, `Find a table whose header row contains header_keyword (case-insensitive).      R`, `Render a markdown table from headers and row data.` to the rest of the system?**
  _130 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Router & Module Pages` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `Layout & Islamic Ceremony UI` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._
- **Should `People & Contacts Management` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `Pathfinder CLI Tool` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._