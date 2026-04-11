# Maqasid OS V2.1 — Comprehensive System Report

**Prepared:** 2026-04-11
**Version Documented:** V2.1
**Classification:** Dual-audience — general and technical

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Foundational Core Principles](#2-foundational-core-principles)
3. [System Architecture](#3-system-architecture)
4. [The Seven Maqasid Pillars](#4-the-seven-maqasid-pillars)
5. [Functional Modules](#5-functional-modules)
6. [BBOS Integration — Barakah Business Operating System](#6-bbos-integration)
7. [The Islamic UI Layer](#7-the-islamic-ui-layer)
8. [Integration Strategies](#8-integration-strategies)
9. [Intended Use Cases](#9-intended-use-cases)
10. [Benefits to Stakeholders](#10-benefits-to-stakeholders)
11. [Known Limitations and Areas for Improvement](#11-known-limitations-and-areas-for-improvement)
12. [Appendix A — Key File Reference](#appendix-a--key-file-reference)
13. [Appendix B — Glossary](#appendix-b--glossary)

---

## 1. Executive Summary

Maqasid OS is an Islamic life operating system — a single, unified software environment that allows a Muslim individual, household, or business operator to manage every meaningful domain of their life through the lens of Islamic purpose and values.

Most productivity software is built on a premise of secular neutrality: tasks are tasks, money is money, time is time. Maqasid OS rejects this premise. It is built on the conviction that life cannot be managed well in fragments, and that the right organizing principle for a Muslim's life is not a project manager's backlog or a banker's ledger — it is the Maqasid Al-Shariah, the higher objectives of Islamic law as articulated by classical scholars and modernized by contemporary thinkers like Jasser Auda.

The system organizes all of human life across **seven pillars**: Faith, Life, Intellect, Family, Wealth, Environment, and Ummah. Within each pillar, a user manages work, finances, people, communications, and spiritual practice — not as separate apps but as one coherent environment that always knows which objective it is serving.

At the center of the system sits an embedded business operating system — the **Barakah Business Operating System (BBOS)** — a rigorous, covenant-grounded 8-stage pipeline for constructing truth-safe, halal businesses. BBOS is not simply a project board for entrepreneurs. It is a structured methodology that enforces honesty, prevents deceptive claims, screens every business concept against Islamic ethical standards, and grounds each stage in the divine names of Allah.

The system's unique value proposition is this: **it treats software itself as a covenant**. Every design decision, every interaction pattern, every data structure is arranged to bring the user closer to their divinely appointed objectives — not to maximize engagement, extract attention, or optimize for platform metrics.

**Who it is for:**
- Muslim professionals managing complex lives across spiritual, financial, and relational domains
- Islamic business operators building or scaling ethically grounded enterprises
- Families seeking a shared governance structure rooted in Islamic values
- Communities (Ummah) stewarding collective resources and obligations
- Developers and architects interested in covenant-grounded, purpose-driven software design

---

## 2. Foundational Core Principles

Maqasid OS is not built on a technical framework alone — it is built on a philosophical one. Every architectural decision, UI pattern, and data model in the system flows from five interlocking principles.

### 2.1 Maqasid Al-Shariah — The Higher Objectives of Islamic Law

The foundational intellectual framework of the entire system is Maqasid Al-Shariah: the classical Islamic jurisprudential theory that the law (Shariah) is not a collection of isolated commands but a purposeful, integrated system governed by higher objectives.

Articulated originally by Al-Ghazali and systematized by Al-Shatibi, the classical framework identifies **five essential objectives** (al-Daruriyyat al-Khams) that Shariah seeks to protect and develop:

| Objective | Arabic | Meaning |
|---|---|---|
| Faith | Hifz al-Din | Preservation and cultivation of religious belief and practice |
| Life | Hifz al-Nafs | Protection and flourishing of human life and physical wellbeing |
| Intellect | Hifz al-Aql | Safeguarding the mind, reason, and knowledge |
| Family | Hifz al-Nasl | Protecting lineage, family structure, and progeny |
| Wealth | Hifz al-Mal | Ensuring just acquisition, circulation, and stewardship of wealth |

Maqasid OS extends this classical five to **seven pillars**, adding two objectives that contemporary Islamic scholarship and the system's own design vision have elevated to first-class status:

- **Environment** (Hifz al-Bi'ah) — ecological stewardship as a divine trust
- **Ummah** (Hifz al-Ummah) — collective wellbeing, community, and social obligation

**Jasser Auda's Systems Lens.** The system's design is also informed by Auda's reframing of the Maqasid as a living systems architecture rather than a static hierarchy. His six systems features — cognitive nature, wholeness, openness, interrelated hierarchy, multi-dimensionality, and purposefulness — translate directly into software design principles: equifinality (multiple valid implementations of the same maqsad), program adaptability (rulings change with context while objectives remain constant), and autopoiesis (the system renews itself through openness to new knowledge without losing its identity).

This is not mere thematic labeling. The seven pillars are the **information architecture** of Maqasid OS. They are not a skin applied over a neutral technical substrate — they are the substrate.

### 2.2 Covenant Architecture

Covenant Architecture is the design philosophy that gives the Maqasid Al-Shariah framework its technical expression. The core idea is this: **software should embody the values it serves, not merely implement features**.

The covenant referenced is the *ahd* — a mutual obligation. The system commits to protecting and advancing the user's divinely appointed objectives. The user commits to engaging with the system purposefully. Where conventional software design optimizes for efficiency or engagement, Covenant Architecture optimizes for alignment: does this feature, this interaction, this data model bring the user closer to their higher objectives?

This philosophy manifests throughout the system:

- The seven Maqasid pillars are not menu categories — they are the load-bearing structure of the application's navigation, data, and meaning.
- Every pillar dashboard surfaces its governing Quranic ayah and Islamic grounding before presenting any operational data.
- The BBOS business pipeline grounds each of its nine stages in the divine names of Allah (Asma al-Husna), so that business operations are never detached from their spiritual meaning.
- Operator onboarding in BBOS requires explicit covenant acknowledgment before any tools are unlocked.

The term "Covenant Architecture" is drawn partly from the **Scroll of Madinah** (Sahifat al-Madinah) — the Prophet's foundational document of pluralism, mutual obligation, and peaceful co-existence — as a model for how a system can hold diverse functions under a unified covenant.

### 2.3 Amanah Gate — Ethical Permissibility Protocol

The Amanah Gate is the system's ethical firewall. Before any significant task begins — whether in the BBOS pipeline, within a pillar module, or in Claude's own AI-assisted work on the codebase — the Amanah Gate requires an explicit permissibility check.

The gate screens against three categories of concern:

- **Riba** — any form of usury or prohibited financial practice embedded in a task or proposal
- **Gharar** — deception, excessive uncertainty, or hidden terms that would compromise the integrity of a transaction or contract
- **Maqasid misalignment** — any task that, even if procedurally valid, undermines one or more of the seven higher objectives

The Amanah Gate is not a soft recommendation. It is structurally the first element of the workflow. A task flagged by the Amanah Gate does not proceed. This makes ethical screening a mandatory gate, not an optional reflection.

In BBOS specifically, the Amanah Proof Audit at Stage 00 (Pre-Check) applies the Amanah Gate to the entire business concept before the pipeline advances — ensuring that no resources, time, or energy are invested in a venture that fails covenantal standards.

### 2.4 Ceremony Gate Pattern — Intentionality at the UI Boundary

The Ceremony Gate Pattern is the user interface expression of niyyah — the Islamic concept of conscious intention before an act. Before entering any significant module or pillar in Maqasid OS, the user passes through a ceremonial threshold that:

1. Presents a Quranic ayah relevant to the pillar's objective
2. Names the governing Islamic attributes of that domain
3. Asks readiness questions to assess the user's alignment
4. Requires an explicit acknowledgment before the module opens

This pattern rejects the design convention where applications simply open and present content. The act of entering a module is itself a meaningful transition — from the general to the purposeful. The ceremony transforms an ordinary click into an act of intention.

The pattern is implemented through several interconnected UI components described in detail in Section 7.

### 2.5 Truth-Safe Design — The BBOS Integrity Framework

The fifth core principle is specific to the BBOS business system but has implications across the entire OS: **truth-safe design**. Every claim made in a business context must be grounded in verified, documented evidence. The system enforces this through:

- **G-Labeling (G1-G4):** Every result claim must carry an evidence grade — G1 (highest, documented proof) through G4 (assertion without supporting evidence). The system will not allow G4 claims to advance pipeline gates.
- **No External Assumptions:** The AI cannot invent operator credentials, capabilities, contacts, or resources. All inputs must come from the operator's declared reality.
- **Verbatim Extraction:** Voice-of-Customer language is extracted character-for-character from source material and never paraphrased. The market's authentic language is non-negotiable.
- **Scope Integrity:** Once the Offer Scope Map is frozen, no downstream material (outreach, sales, delivery) may reference capabilities, claims, or features outside it.
- **Assembly Gate:** The AI's Asset Factory is locked until the operator explicitly types `ASSEMBLE` — preserving operator sovereignty over all deliverables.

---

## 3. System Architecture

### 3.1 Technology Stack

Maqasid OS V2.1 is a **React 19 single-page application** (SPA) built with the following core dependencies:

| Layer | Technology | Version | Role |
|---|---|---|---|
| UI Framework | React | 19.2.4 | Component rendering, hooks, concurrent features |
| State Management | Zustand | 5.0.5 | All application state across 13 stores |
| Routing | React Router | 7.6.1+ | SPA navigation, protected routes, nested layouts |
| Build Tool | Vite | 8.0.3 | Dev server, HMR, production bundling |
| Drag-and-Drop | dnd-kit | 6.3/10.0/3.2 | Kanban column/card reordering |
| Icons | Lucide React | 0.511.0 | Consistent iconography |
| Date Utilities | date-fns | 4.1.0 | Date formatting, distance calculations, calendar logic |
| ID Generation | nanoid | 5.1.5 | Collision-resistant IDs for all entity types |

**Deployment:** GitHub Pages via Vite production build.

### 3.2 Monorepo Structure

The project is a monorepo with three distinct execution contexts:

```
MAQASID OS - V2.1/
├── src/           Machine hemisphere — React app (Claude Code full read/write)
├── website/       Ogden Hub marketing site — git subtree (static HTML, no build)
├── atlas/         Geospatial land intelligence — git submodule (separate repo)
├── wiki/          LLM-owned knowledge base — persistent across sessions
├── docs/          Stable principles and workflow documentation
├── tasks/         Active task tracking (todo.md, lessons.md)
├── notes/         Human-only (gitignored journals and brainstorms)
├── references/    Style guides, voice docs, component specs
└── stages/        Staged outputs awaiting human review
```

**Hemisphere division** is a formal governance convention: `src/`, `scripts/`, and `wiki/` belong to the machine (Claude Code); `notes/`, `tasks/`, and `docs/` belong to the human; `stages/` and `references/` are shared.

### 3.3 Source Code Organization (`src/`)

The `src/` directory is organized into seven functional layers:

```
src/
├── components/      11 category folders — UI components by domain
│   ├── work/        Kanban, Gantt, task panels, project boards
│   ├── money/       Financial management components
│   ├── people/      HR, attendance, recruitment
│   ├── office/      Calendar, documents, chat, announcements
│   ├── tech/        Monitoring, campaigns, integrations
│   ├── crm/         Sales CRM, deal pipeline
│   ├── layout/      AppShell, Sidebar, TopBar, MobileNav
│   ├── islamic/     CeremonyGate, Prayer, Niyyah, Thresholds
│   ├── shared/      SearchPalette, tables, reusable elements
│   ├── bbos/        BBOS pipeline UI components
│   └── dashboard/   Pillar cards, activity chart, health pulse
├── pages/           70+ page components organized by pillar and domain
├── store/           13 Zustand stores
├── data/            Static constants and lookup functions
├── hooks/           5 custom React hooks
├── services/        3 utility modules (ID generation, storage, migration)
└── styles/          Global tokens, base reset, landing styles
```

### 3.4 State Management Architecture

All application state is managed through **13 Zustand stores**, each responsible for a distinct domain. There is no centralized Redux-style store — stores are domain-scoped and imported directly by the components that need them.

**Critical implementation detail:** Maqasid OS does not use Zustand's built-in persistence middleware. All stores implement **manual localStorage persistence** through a shared `services/storage.js` module. Every key is prefixed with `bbiz_` to prevent namespace collisions.

```
Store               Manages                                     Persistence Keys
────────────────────────────────────────────────────────────────────────────────
app-store           UI state (sidebar, active module, filters)  Mixed
auth-store          Current user profile                        auth_user
task-store          Tasks indexed by projectId                  tasks_{projectId}
project-store       Projects list + BBOS column migration       projects
money-store         Expenses, invoices, budgets, accounts        8+ distinct keys
people-store        Employees, attendance, leave, time          5 keys
contacts-store      HR contacts, salaries, docs, departments    7 keys
office-store        Channels, messages, events, documents       6 keys
crm-store           CRM contacts, deals, pipeline, activities   4 keys
tech-store          Monitors, campaigns, integrations           6 keys
settings-store      Theme, values layer, attribute language     String keys
threshold-store     Ceremony completion state, niyyah           Mixed ephemeral/persistent
recruitment-store   Job postings, applications, pipelines       recruit_* keys
```

### 3.5 Design Token System

All visual constants are defined in `src/styles/tokens.css` as CSS custom properties. Components never hard-code colors, spacing, or layout dimensions. Key token families:

- **Surfaces:** `--bg`, `--bg2`, `--bg3`, `--bg4`, `--surface`, `--surface-hover`
- **Typography:** `--text` (#1a1d21), `--text2`, `--text3` + DM Sans / Manrope / Amiri (Arabic) / JetBrains Mono
- **Primary (Teal):** `--primary` (#4ab8a8) — the main brand color
- **Accent (Gold):** `--accent` (#c9a05a) — BBOS and covenant layer
- **Module colors:** 18 distinct module colors with -bg and -border variants
- **Pillar colors:** 7 pillar colors with contextual variants
- **Layout constants:** `--topbar-h` (56px), `--sidebar-w` (248px), `--sidebar-w-collapsed` (64px), `--islamic-panel-w` (280px)

### 3.6 Context-First Development Protocol

A formal protocol governs how developers (human or AI) interact with the codebase:

1. Every directory has a `CONTEXT.md` file containing a complete file inventory, architecture notes, store dependencies, and known gotchas
2. Before any source file is opened, the relevant `CONTEXT.md` must be read
3. The CONTEXT.md hierarchy routes from root → domain → component, mirroring the directory tree
4. Source files are opened only for details the CONTEXT.md does not cover

This protocol was designed to prevent the most common failure mode in large codebases: exploratory scanning that misses existing implementations and introduces duplicate or conflicting code.

### 3.7 Knowledge Graph

The codebase has been analyzed via the graphify tool, producing a persistent knowledge graph with:
- **882 nodes** (components, stores, hooks, services, data modules)
- **1,438 edges** (import relationships, data dependencies, store subscriptions)
- **47 communities** (tightly coupled functional clusters)

This graph provides structural intelligence for architecture decisions, refactoring impact analysis, and onboarding orientation.

### 3.8 Path Aliases

The Vite build configuration defines shorthand path aliases to prevent deeply nested relative imports:

| Alias | Resolves to |
|---|---|
| `@` | `src/` |
| `@components` | `src/components/` |
| `@pages` | `src/pages/` |
| `@store` | `src/store/` |
| `@data` | `src/data/` |
| `@hooks` | `src/hooks/` |
| `@services` | `src/services/` |
| `@styles` | `src/styles/` |

---

## 4. The Seven Maqasid Pillars

Each pillar in Maqasid OS is more than a navigation category — it is a complete governance domain with its own dashboard, sub-pages, Islamic grounding, readiness system, and seed task library.

### Shared Dashboard Pattern

Every pillar dashboard follows the same three-tier bento grid structure:

```
┌─────────────────────────────────────────────────┐
│  Header: pillar badge + title + governing ayah  │
│  + overall readiness progress indicator         │
├─────────────────────────────────────────────────┤
│  Hero card: current focus / primary metric      │
├───────────────┬─────────────────┬───────────────┤
│  NECESSITIES  │     NEEDS       │  EXCELLENCE   │
│  (fard/wajib) │ (mustahabb)     │ (ihsan level) │
│  Core tasks   │ Supporting work │ Aspirational  │
└───────────────┴─────────────────┴───────────────┘
```

This three-tier structure mirrors the classical jurisprudential hierarchy of necessities (daruriyyat), needs (hajiyyat), and complementary goods (tahsiniyyat).

### Readiness Ayah System

Before a user enters any pillar sub-page, they complete a **Readiness Check** — six yes/no questions assessing their alignment with the pillar's objectives. Their answers form a 6-bit binary key (e.g., `100010`). This key is looked up in a Quranic ayah matrix specific to that pillar, returning the verse most precisely calibrated to their current state. If all six answers are YES (`111111`), no pause is needed — the user proceeds immediately.

This system means that no two sessions begin identically: the Quran speaks to the user's actual condition, not a generic welcome screen.

### 4.1 Faith — Hifz al-Din

**Arabic root:** دين | **Stewardship label:** Spiritual Governance

**Sub-pages:** Shahada (declaration of faith), Salah (prayer practice), Zakat (obligatory giving), Sawm (fasting), Hajj (pilgrimage), Core Aqeedah, Spiritual Growth, Islamic Excellence

**Domain purpose:** Managing the active practice, development, and deepening of Islamic faith — not as a checklist but as a living relationship with Allah. The Faith pillar is architecturally the first pillar and the root from which all others derive their legitimacy.

### 4.2 Life — Hifz al-Nafs

**Arabic root:** نفس | **Stewardship label:** Vitality Stewardship

**Sub-pages:** Physical wellbeing, Mental health, Safety and security, Social connections

**Domain purpose:** Tracking and advancing the conditions for human flourishing — physical health, mental resilience, security from harm, and meaningful relationships. This pillar grounds the system's understanding that the body, mind, and social fabric are not separate from spiritual practice but prerequisites for it.

### 4.3 Intellect — Hifz al-Aql

**Arabic root:** عقل | **Stewardship label:** Cognitive Integrity

**Sub-pages:** Active learning, Thinking and reasoning, Cognitive health, Professional development

**Domain purpose:** Protecting and developing the human capacity for reason, learning, and knowledge production. The Intellect pillar governs study habits, information diet, professional skill development, and the discipline of clear thinking.

### 4.4 Family — Hifz al-Nasl

**Arabic root:** نسل | **Stewardship label:** Lineage and Legacy

**Sub-pages:** Marriage and partnership, Parenting, Kinship and extended family, Home management, Family Office

**Domain purpose:** Stewardship of the family as the primary social unit — not just the nuclear household but the extended network of kinship obligations and the longer arc of generational legacy. The recently added **Family Office** module (2026-04-11) extends this pillar into formal family governance: shared finances, shared documents, and coordinated household operations.

### 4.5 Wealth — Hifz al-Mal

**Arabic root:** مال | **Stewardship label:** Resource Orchestration

**Sub-pages:** Earning and income, Financial management, Ownership and assets, Circulation and giving

**Domain purpose:** Managing wealth as a trust (amanah) — not as personal property to be maximized but as a resource to be stewarded, circulated, and deployed in service of the other Maqasid. The Wealth pillar is the primary host of BBOS, connecting the business operating system directly to its jurisprudential home.

### 4.6 Environment — Hifz al-Bi'ah

**Arabic root:** بيئة | **Stewardship label:** Ecological Symbiosis

**Sub-pages:** Resource consumption, Waste and reduction, Ecosystem engagement, Ethical sourcing

**Domain purpose:** This pillar extends the classical Maqasid framework with an explicit ecological mandate — recognizing that the earth is a trust (amanah) given to humanity and that environmental stewardship is not a peripheral concern but a core Islamic obligation. The Environment pillar connects to the Atlas geospatial system for land intelligence and to Community-Supported Regenerative Agriculture (CSRA) operations.

### 4.7 Ummah — Hifz al-Ummah

**Arabic root:** أمة | **Stewardship label:** Collective Stewardship

**Sub-pages:** Community engagement, Neighbors, Collective action, Family community

**Domain purpose:** Managing the web of obligations to the wider community — neighbors, local organizations, charitable commitments, collective projects, and the global Muslim community. The Ummah pillar operationalizes the Islamic conviction that individual flourishing is inseparable from collective flourishing.

---

## 5. Functional Modules

Beyond the seven Maqasid pillars, Maqasid OS includes eight operational modules that handle the day-to-day mechanics of work, money, people, and communications. These modules serve the pillars — they are the machinery through which covenantal objectives are pursued.

### 5.1 Work Module — Project and Task Management

The Work module is the system's primary project management environment, built around a **Kanban board with four default columns**: To Do, In Progress, Review, Done. Key features:

- **Drag-and-drop** task reordering and column movement via dnd-kit (fully accessible, pointer and keyboard events)
- **Gantt view** for timeline visualization of project deliverables
- **List view** for compact task scanning
- **Task Detail Panel** — a slide-in drawer with full task editing: title, description, priority (urgent/high/medium/low), due date, assignee, tags, and subtasks
- **BBOS integration** — tasks can carry a `bbosTaskType` field linking them to BBOS stage task definitions, enabling the pipeline to live inside the project board
- **Filter bar** — filter tasks by priority, assignee, tag, or BBOS stage
- **Per-project views** — each project has Work, Money, People, and other tab views, making a project a complete operational unit

**Technical:** `task-store.js` indexes tasks by `projectId`. Task IDs are generated by `genTaskId()` in `services/id.js`. Drag events update column order in the store and persist immediately to localStorage.

### 5.2 Money Module — Financial Management

The Money module provides a comprehensive personal and business finance management system:

- **Expenses** — categorized expense tracking with vendor records
- **Invoices** — invoice creation, status tracking, and payment recording
- **Income** — multiple income stream tracking
- **Accounts** — account balance management across cash, bank, and asset accounts
- **Assets** — fixed asset registry
- **Budgets** — budget allocation and variance tracking
- **Categories** — configurable category system for financial classification

**Technical:** `money-store.js` manages 8+ distinct localStorage keys. Components use a `.money-slidein` slide-in panel pattern. A known limitation is that the invoice counter increments permanently with no year-based reset.

### 5.3 People Module — Human Resources

The People module handles all workforce-related operations:

- **Employee records** — profiles, roles, departments, employment status
- **Attendance tracking** — clock-in/clock-out, time entries
- **Leave management** — leave requests, approvals, leave balances
- **Recruitment** — job postings, application pipeline, candidate tracking
- **Departments** — organizational structure management

**Note:** This module is currently undergoing a significant architectural refactor. There are two partially separate contact systems (`people-store` for HR and `contacts-store` for a broader contact model) that have not yet been unified.

### 5.4 Office Module — Collaboration and Communications

The Office module handles internal organizational communication and document management:

- **Calendar** — month/week/day views for event management
- **Documents** — document storage and retrieval
- **Chat** — a 3-pane channel-based chat interface (channel list / message thread / member list)
- **Forum / Q&A** — structured knowledge-sharing and question-answer threads
- **Announcements** — broadcast communications for organizational updates

**Technical:** `office-store.js` persists channels, messages, events, documents, Q&A items, and announcements independently. The calendar uses date-fns for all date computations.

### 5.5 CRM Module — Customer Relationship Management

The CRM module is a sales-focused contact and deal management system, distinct from the HR-focused People module:

- **Contacts** — sales contacts with full profile management
- **Deal pipeline** — visual kanban-style deal progression through sales stages
- **Activity log** — chronological record of interactions and touchpoints
- **Companies** — organizational accounts associated with contacts

**Technical:** `crm-store.js` is entirely separate from `contacts-store.js` and `people-store.js`. There is currently no technical bridge between the three contact systems — a known architectural limitation.

### 5.6 Tech Module — Digital Operations

The Tech module manages digital infrastructure and marketing operations:

- **Website monitoring** — uptime and performance status tracking (currently simulated, not making real HTTP calls)
- **Dark web monitoring** — email breach tracking
- **Integrations** — third-party service connection registry
- **Email campaigns** — campaign creation and tracking

**Technical:** `tech-store.js` manages monitor status via a `checkMonitor()` function that simulates responses. Real HTTP health checks are a pending improvement.

### 5.7 Islamic Module — Spiritual Practice Management

The Islamic module provides dedicated tooling for Islamic religious practice:

- **Prayer times** — location-aware prayer schedule via Aladhan API (polling every 30 seconds with localStorage cache), with Nominatim reverse geocoding for location labels
- **Quran** — Quranic content access and study
- **Hadith** — Hadith collections and search
- **Five Pillars tracking** — practice monitoring across the pillars of Islam
- **Thresholds** — ceremony and readiness management

**Technical:** `usePrayerTimes.js` hook manages the Aladhan API integration. Prayer data is cached to localStorage and refreshed on a 30-second interval. The prayer system spans three components: PrayerTime (sidebar display), PrayerWarning (5-minute toast notification), PrayerOverlay (full-screen countdown blocker that cannot be dismissed during prayer time).

### 5.8 Family Office Module

Added in April 2026, the Family Office module extends the Family pillar with formal household governance capabilities. It is accessible in two ways: as a tab within the main Family page (`/app/family`) and as a dedicated sidebar entry (`/app/family-office`). It reuses the Office module's infrastructure (calendar, documents, chat) within the context of family governance.

---

## 6. BBOS Integration — Barakah Business Operating System

BBOS deserves extended treatment because it is the most architecturally complex and philosophically distinctive component of the entire system.

### 6.1 What BBOS Is

The Barakah Business Operating System (BBOS) v2.4 is a **Direct-Injection Auto-Sequence** — a structured, LLM-integrated methodology for constructing truth-safe, halal businesses from first principles. The term "truth-safe" is deliberate: BBOS exists to prevent the most common failure modes of business formation — inflated claims, unverified assumptions, borrowed credibility, and offers built on hope rather than evidence.

BBOS is not a project management tool for businesses. It is a **business construction methodology** that enforces intellectual honesty, covenantal integrity, and sequential rigour at every stage. It cannot be gamed, skipped, or shortcut. Its rules are non-negotiable by design.

BBOS lives inside Maqasid OS as a module (most closely associated with the Wealth pillar) but maintains its own distinct visual identity, workflow logic, and data layer.

### 6.2 The Two-Factory Architecture

Every stage of BBOS operates through a mandatory dual-factory structure:

**Research Factory** — the analytical engine. Takes raw operator inputs and synthesizes them into a series of strategic outputs (S1 through S5/S6 depending on stage). These outputs define the truthful landscape of that stage: what the market actually says, what the operator actually has, what the evidence actually supports. The Research Factory runs with AI assistance.

**Asset Factory** — the production engine. Converts approved Research Factory outputs into the final deliverable Asset Pack for that stage. The Asset Factory is **gated**: the AI is prohibited from running it until the operator explicitly triggers the **Assembly Gate** by typing `ASSEMBLE`. Until that command is entered, no assets are produced.

This separation is architectural, not cosmetic. It enforces a critical principle: the human operator — not the AI — decides when thinking has sufficiently concluded and production should begin. The AI can research endlessly; it cannot produce without operator sovereignty.

### 6.3 The 8-Stage Pipeline

BBOS progresses through eight stages in strict linear sequence. No stages may be skipped. No later stage can draw on inputs that earlier stages have not produced and verified.

| Stage | Code | Layer | Name | Purpose |
|---|---|---|---|---|
| 00 | PRE | Think | Pre-Check | Audits operator skills, documented proof, and constraints. Includes External Viability Pre-Check. |
| 01 | STR | Think | Strategy | Extracts truthful market "buying language" and identifies the "External Enemy" that the offer defeats. |
| 02 | OFR | Think | Offer | Constructs a priced, truth-safe offer with a formal Proof Plan. |
| 03 | OUT | Execute | Outreach | Builds the acquisition engine using "hooks" as the primary attention device. |
| 04 | SAL | Execute | Sales | Installs conversion infrastructure: scripts, objection handling, and close sequences. |
| 05 | DLR | Execute | Delivery | Maps delivery SOPs to promised outcomes with QC checkpoints. |
| 06 | RET | Reckon | Retention | Maximizes lifetime value through proof-led re-engagement strategies. |
| 07 | OPT | Reckon | Optimization | Data-driven 30-day optimization cycle identifying the "Weakest Link" in the pipeline. |

The three layers carry distinct colors throughout the UI:
- **Think layer (PRE → OFR):** Gold (#c9a05a) — foundational thinking work
- **Execute layer (OUT → DLR):** Teal (#4ab8a8) — operational execution
- **Reckon layer (RET → OPT):** Indigo (#6366f1) — measurement and optimization

### 6.4 Patch Plan Sub-Stages

Two sub-stages bridge critical gaps in the main pipeline:

- **Stage 00A — Input Integrity Gate:** Grades operator proof on a P0 (no proof) through P3 (strong documented evidence) scale before pipeline entry. An operator who cannot meet minimum proof thresholds is redirected before any resources are committed.

- **Stage 01B — Mechanism Factory:** Bridges the strategy-to-offer gap, ensuring that STR (Strategy) outputs translate cleanly into OFR (Offer) inputs. Without this bridge, operators frequently carry ambiguous strategic language into the offer stage and produce incoherent offers.

### 6.5 Critical Business Rules

These rules are architectural invariants — they cannot be overridden by operator preference:

| Rule | Description |
|---|---|
| **Sequence Strictness** | Stages are executed 00 → 07 in order. No stage may be accessed before its predecessor is complete. |
| **Truth-Gate (G-Labeling G1-G4)** | Every result claim must carry an evidence grade. G1 = highest (documented, verifiable proof). G4 = assertion without supporting evidence. G4 claims block pipeline advancement. |
| **Assembly Gate** | The AI may not produce the Asset Pack until the operator types `ASSEMBLE`. Protects operator sovereignty. |
| **No External Assumptions** | The system cannot invent operator credentials, capabilities, contacts, or resources. All inputs must be operator-declared. |
| **Verbatim Extraction** | Voice-of-Customer language is extracted character-for-character from source material. No paraphrasing. The market's authentic language is non-negotiable. |
| **Scarcity Verification** | Any urgency or scarcity claim in an offer must be tied to a documented, real-world constraint. Manufactured scarcity is prohibited. |
| **Scope Integrity** | Once the OFR Scope Map is frozen, no downstream material (outreach, sales, delivery) may reference anything outside it. |
| **Regulatory Hard Stops** | If regulatory compliance issues are identified at any stage, the pipeline halts until resolved. |

### 6.6 Islamic Grounding Per Stage

BBOS is not a neutral business methodology with Islamic values grafted on. Islamic grounding is intrinsic to each stage through `src/data/bbos/bbos-stage-islamic.js`, which provides for every stage:

- **Divine name attributes (Asma al-Husna)** — the names of Allah that govern the stage's orientation, with Arabic, transliteration, and theological explanation. For example:
  - PRE stage: Al-Awwal (The First) + Al-Badi (The Originator)
  - STR stage: Al-Basir (The All-Seeing) + Al-Sami (The All-Hearing)
  - OFR stage: Al-Qadir (The All-Powerful) + Al-Hakim (The All-Wise)

- **Stage dua (supplication)** — a specific supplication in Arabic with transliteration, translation, and Quranic or hadith source, to be recited before beginning the stage's work

- **Readiness framework** — yes/no questions calibrated to the stage's Islamic dimension (e.g., for PRE: "Does this foundation begin with His name or my ambition?")

- **Reflection frame** — prompts for end-of-stage contemplation connecting the completed work back to its covenantal meaning

### 6.7 The 118-Task Definition Registry

BBOS contains a complete registry of 118 task templates across all nine stages, defined in `src/data/bbos/bbos-task-definitions.js` (181,953 bytes — the largest single data file in the codebase). Each task definition includes:

- **ID and stage association** (e.g., `FND-S1`, `TRU-AF5`, `STR-V1`)
- **Task label and governing Islamic attributes**
- **Purpose statement** — what this task produces and why it matters
- **Field definitions** — each input field with type (`textarea`, `text`, `select`, `number`), label, placeholder, and row count
- **Flags:**
  - `hasGLabel` — whether this task requires a G1-G4 evidence grade assignment
  - `hasAiDraft` — whether the AI can generate a draft for this task
  - `validationFlags` — blocking conditions (`PROOF_PENDING`, `CLAIM_UNVERIFIED`, `GATE_BLOCKED`)

Task types are prefixed by function:
- `S` — Strategic research tasks
- `A` — Asset production tasks
- `AF` — Analysis framework tasks
- `V` — Validation tasks
- `FP` — Framework prompt tasks
- `IFB` — Intake form builder tasks
- `IC` — Integrity check tasks

### 6.8 Role-Based Access Control

BBOS implements a formal role-based access control system across all 118 tasks. Seven roles are defined:

| Role ID | Role Name |
|---|---|
| OW | Owner |
| ST | Strategist |
| CW | Copywriter |
| MB | Media Buyer |
| SE | Setter (Appointment Setter) |
| CL | Closer |
| FU | Fulfillment |

Each of the 118 tasks carries an explicit access level for each role:
- **O (Owner):** Full read, write, and delete access
- **E (Edit):** Can enter and modify field data
- **V (View):** Can read but not modify
- **— (Hidden):** Task is not visible to this role

Example: The PRE-S1 Raw Intake Capture task — `{ OW: 'O', ST: 'V', CW: '-', MB: '-', SE: '-', CL: '-', FU: '-' }`. The strategist can observe the founder's raw self-assessment; operational roles cannot.

This matrix was designed to support team-based pipeline execution where different operators handle different stages without compromising the integrity of other stages' data.

### 6.9 UI Components

Five dedicated React components render the BBOS experience within Maqasid OS:

**BbosPipelineHeader** — A horizontal progress visualization showing all nine stages. Each stage tab is color-coded by its completion state (empty / active / complete) and grouped by layer. The header accepts a `stageStatusMap` prop computed from the project's task data to keep visual state in sync with actual task progress.

**BbosTaskPanel** — The primary work surface. Renders a selected BBOS task with: purpose statement, governing Islamic attributes, theological rationale, all field inputs (rendered from the task definition's fields array), G-label picker (shown only when `def.hasGLabel === true`), AI draft generation controls, and template import/export. Field data changes auto-save with a 300ms debounce and trigger automatic task status advancement to "In Progress" on first entry.

**BbosFullDashboard** — The unified dashboard introduced in April 2026 that consolidates all stage views. Features stage-by-stage scorecards, task cards organized by stage, project audit metrics, and the StageScoreCard component for dynamic scoring.

**StageScoreCard** — Dynamic stage scoring component introduced across TRU, STR, OFR, and OUT stages. Calculates a weighted score from 5 stage-specific signals (each worth up to 5 points, 25 points maximum). Produces a verdict at four tiers:
- QUALIFIED (≥75%)
- DEVELOPING (≥50%)
- REVIEW NEEDED (≥25%)
- BLOCKED (<25%)

**BbosRoleBadge / BbosRolePicker** — Compact role display and selection components used throughout the pipeline UI to indicate which role is active and filter task visibility accordingly.

### 6.10 Export / Import Services

Two service modules support BBOS data portability:

`src/services/bbos-export.js` — Produces a JSON export in a format optimized for LLM-assisted form filling. The export includes project metadata, column definitions, and all tasks with their complete field schemas and current data values. This allows an operator to export their pipeline state, feed it to an AI assistant, and receive structured completion assistance outside the UI.

`src/services/bbos-template.js` — Provides per-task and stage-bundle template structures in the `maqasid-bbos-task-template` v1.0 format, with validation logic and import handlers for round-tripping pipeline data.

---

## 7. The Islamic UI Layer

The Islamic UI layer is a set of interconnected components that operationalize niyyah (intention), prayer observance, and spiritual readiness at the interface level. These are not decorative Islamic touches — they are structural interventions that change how the user enters, occupies, and exits the application.

### 7.1 CeremonyGate

The CeremonyGate is a portal-based overlay that blocks module entry until the user completes a ceremonial acknowledgment. It:

1. Presents a Quranic ayah specifically selected for the pillar being entered
2. Names the governing Islamic attributes of that domain
3. Requires an explicit click-through attestation

Implementation: the gate renders as a React portal (outside the component tree) so it cannot be bypassed by parent layout changes. Once acknowledged, the gate state is stored in `threshold-store` under `completedOpening[moduleId]`, preventing the gate from re-appearing in the same session unless the user explicitly resets.

### 7.2 ThresholdModal — The Five-Step Ceremony

The ThresholdModal is the most elaborate Islamic UI component. It runs a five-step ceremony before significant module engagement:

1. **Dua** — Module-specific supplication with Arabic text, transliteration, and translation
2. **Attributes** — The governing Islamic attributes and universal principles for this domain
3. **Readiness Check** — Six yes/no questions assessing the user's current alignment with the domain's objectives
4. **Confirm** — A checkbox attestation ("I enter this domain in a state of intentional stewardship")
5. **Pause** — Dynamically inserted between Readiness and Confirm only if the readiness check reveals unresolved issues (i.e., the binary key is not `111111`)

The Pause step's dynamic insertion means the ceremony adapts to the user's actual condition — an honest self-assessment that reveals misalignment triggers a deeper pause before proceeding, while a user who is genuinely ready moves through smoothly.

### 7.3 Readiness Check System

The ReadinessCheck presents six binary (yes/no) questions calibrated to a specific pillar's objectives. Responses form a 6-character binary string. This string is used as a lookup key in a per-pillar Quranic ayah matrix (`src/data/ayat/`), returning the verse most precisely relevant to that combination of answered conditions.

The matrix contains 64 possible combinations per pillar (2^6), each mapped to a different ayah. This means the Quran speaks to the user's precise spiritual condition, not a generic motivational quote. The ayah's accompanying framing text contextualizes why this verse speaks to this pattern of readiness.

### 7.4 Prayer System — Three-Component Architecture

Prayer observance is architecturally enforced through three coordinated components:

**PrayerTime** (Sidebar component) — Continuously displays the current prayer schedule in the application sidebar, showing the current and next prayer times. Powered by the `usePrayerTimes()` hook, which queries the Aladhan API using browser geolocation, caches results in localStorage, and refreshes every 30 seconds.

**PrayerWarning** (Toast notification) — Fires 5 minutes before each prayer time as a non-intrusive toast notification. Gives the user advance notice without interrupting current work.

**PrayerOverlay** (Full-screen blocker) — At prayer time, a full-screen overlay renders with a countdown timer. Unlike the Warning, this overlay cannot be dismissed — the application is paused for the duration of the prayer window. The overlay uses `Date.now()` in a 1-second interval with the `onDismiss` callback stored in a ref to prevent re-renders during the countdown.

This three-component architecture represents a deliberate design choice: prayer is not a reminder to be snoozed but a reality that the application must accommodate structurally.

### 7.5 NiyyahAct — Daily Intention

The NiyyahAct is a two-step daily intention-setting ritual that anchors the user's day in conscious purpose:

1. **Orient** — Opens with Bismillah, a morning dua, and a moment of stillness before the day begins
2. **Focus** — The user selects one or more pillars as their primary focus for the current day

This selection populates the application's contextual recommendations and daily task surfacing. It is reset at the start of each new day.

### 7.6 ResumeOverlay — Return Ceremony

When a user returns to a module after a significant gap (managed by the `useInactivity.js` hook, default threshold 20 minutes), the ResumeOverlay presents a lightweight return ceremony — a reminder of the niyyah set at the start of the session and a brief reorientation before work resumes.

---

## 8. Integration Strategies

### 8.1 Atlas — Geospatial Land Intelligence

Atlas is a full-stack geospatial application linked to the Maqasid OS monorepo as a **git submodule** at `atlas/`. It is developed independently in a separate repository (`onaxyzogden/atlas`) with its own stack:

- **Frontend:** React 18 + TypeScript + Vite + MapboxGL
- **Backend:** Fastify API server
- **Database:** PostgreSQL + PostGIS (spatial queries)
- **Build:** pnpm + Turborepo (separate from the main npm monorepo)
- **Domain:** atlas.ogden.ag

Atlas serves the Environment and Ummah pillars by providing geospatial intelligence for land stewardship and Community-Supported Regenerative Agriculture (CSRA) operations. The submodule relationship means Maqasid OS can reference Atlas's current state, but active development occurs in the Atlas repo. There is currently no live data bridge between the two — the integration is architectural and conceptual, pending a formal API layer.

### 8.2 Ogden Hub — Marketing and Brand Presence

The Ogden Hub marketing site lives inside the monorepo at `website/` as a **git subtree** (merged from the `ogden-hub` repository). It is pure static HTML with no build system, framework dependencies, or Node.js toolchain.

Within the website, `website/bbos/` hosts the BBOS marketing landing page — the public-facing product presentation for the Barakah Business Operating System. This separation of marketing (website/) from application (src/) within the same repository allows synchronized updates without cross-contamination.

The planned domain is `bismillah.ogden.ag` (deployment currently postponed).

### 8.3 External APIs

**Aladhan API** — Provides prayer time calculations based on geographic coordinates. The integration handles geolocation, API querying, response caching (localStorage), and polling refresh. Supports multiple calculation methods and madhabs.

**Nominatim (OpenStreetMap)** — Used for reverse geocoding: converts raw latitude/longitude coordinates from the browser's geolocation API into human-readable location labels displayed in the Prayer Time sidebar component.

### 8.4 LLM / AI Integration

The system has several formally designed integration points for AI assistance:

**BBOS AI Draft Generation** — Tasks marked with `hasAiDraft: true` in the task definition registry expose an AI draft generation interface in BbosTaskPanel. The operator can request an AI-generated draft for any eligible task. Draft status is tracked via `_aiDraftStatus` on the task object (`none` → `pending` → `accepted` / `rejected`). Drafts are injected into the task's field data on acceptance.

**LLM-Optimized Export** — The `bbos-export.js` service produces JSON structured specifically for LLM consumption — including full field schemas, current values, and contextual metadata — enabling external AI assistant sessions to pick up pipeline state seamlessly.

**HTML-to-Task Extraction Skill** — A Claude Code skill (`/.claude/skills/bbos-html-to-task.md`) automates the extraction of task definitions from SingleFile HTML exports of the demo site, converting them into the bbos-task-definitions.js format via a Python regex extraction pipeline.

### 8.5 Claude OS / Model Workspace Protocol (MWP)

The development environment itself is deeply integrated with Claude Code through the **Model Workspace Protocol v2.1** — a 3-layer context hierarchy:

- **Layer 1 (Map):** `CLAUDE.md` files at root and project level — routing tables, tech stack, safety flags, and operating principles
- **Layer 2 (Rooms):** `CONTEXT.md` files throughout the directory tree — localized architectural notes, file inventories, and gotchas per component/domain
- **Layer 3 (Tools):** Skills and MCP servers — graphify (knowledge graph), wiki (persistent knowledge base), PDF/DOCX/XLSX processing, and BBOS-specific skills

This three-layer architecture means Claude Code can orient within the codebase at the appropriate level of detail for any task without scanning unnecessarily or missing established context.

### 8.6 Wiki System — Persistent LLM Knowledge Base

The `wiki/` directory is a git-tracked, Claude Code-maintained knowledge base that persists synthesized understanding across sessions:

```
wiki/
├── index.md           Entity and concept catalog (session entry point)
├── log.md             Chronological operation record
├── SCHEMA.md          Conventions and workflows
├── entities/          Projects, modules, systems (maqasid-os, bbos-pipeline, atlas, etc.)
├── concepts/          Frameworks and principles (covenant-architecture, maqasid-al-shariah, etc.)
└── decisions/         Architectural decision records (ADRs)
```

This wiki replaced NotebookLM as the primary session orientation source on 2026-04-09. NotebookLM notebooks remain available for deep-dive queries but are no longer the authoritative context source.

### 8.7 Graphify — Knowledge Graph Intelligence

The graphify tool analyzes the codebase and produces a persistent, navigable knowledge graph. The current graph state (882 nodes, 1,438 edges, 47 communities) provides:

- Import relationship mapping across all source files
- Community detection revealing tightly coupled functional clusters
- Architectural impact analysis for refactoring decisions
- Onboarding orientation for understanding how components relate

The graph complements the wiki by providing structural intelligence (what connects to what) while the wiki provides meaning intelligence (why things are the way they are).

---

## 9. Intended Use Cases

### 9.1 The Individual Muslim Professional

The primary user is a Muslim professional managing a complex life across multiple domains — work, family, finances, faith practice, community obligations, and business activities. Today, this person might use a combination of: a project manager (Notion, Asana), a finance app (YNAB, QuickBooks), a habit tracker, a prayer app, a CRM, and a notes tool — none of which speak to each other, and none of which understand the Islamic framework that organizes the user's life.

Maqasid OS replaces this fragmented stack with a single environment that:
- Organizes all life domains under the seven higher objectives of Islamic law
- Ensures that business activities are assessed for halal compliance before resources are invested
- Enforces prayer observance structurally rather than relying on willpower
- Grounds every work session in conscious intention (niyyah)
- Surfaces Quranic guidance calibrated to the user's actual readiness, not generic motivation

### 9.2 Family Governance

For families seeking a shared governance framework rooted in Islamic values, Maqasid OS provides:
- The Family pillar for tracking marriage, parenting, kinship, and home management
- The Family Office module for shared financial oversight, document management, and coordination
- Shared task assignment for family projects
- A common Islamic values layer that ensures all household management flows from the same ethical foundation

The system treats the family not as a collection of individuals but as a covenantal unit with shared obligations and shared resources held in trust.

### 9.3 Islamic Business Formation (BBOS)

For operators building or scaling a business, BBOS provides a structured environment that:
- Forces honest self-assessment before any business concept advances
- Prevents the most common business formation failures (unverifiable claims, unsupported offers, untested assumptions)
- Grounds the business at every stage in the divine names of Allah and Quranic guidance
- Produces a complete, stage-gated evidence trail (G-labels) for every claim
- Supports team-based execution through role-based access control
- Generates AI-assisted content drafts without surrendering operator sovereignty over deliverables

The ideal operator is building a service or product business, has some documented proof of capability or results, and is committed to covenant-grounded business practice.

### 9.4 Community and Ummah Stewardship

The Ummah pillar makes Maqasid OS a tool for managing collective obligations — not just individual productivity:
- Tracking commitments to neighbors and local community members
- Organizing collective action and charitable projects
- Managing Ummah-scale goals across a network of relationships
- Connecting individual stewardship to the wider health of the community

### 9.5 Regenerative Agriculture and Land Stewardship

Through the Atlas integration (geospatial intelligence) and the Environment pillar, Maqasid OS supports operators in Community-Supported Regenerative Agriculture (CSRA) — land investment and agricultural ventures organized around Islamic stewardship principles rather than extractive ownership models. The system uses "CSRA participants" rather than "investors" to reflect this covenantal framing.

### 9.6 Spiritual Accountability System

Even apart from its operational modules, Maqasid OS functions as a spiritual accountability platform:
- Daily niyyah setting anchors each day in conscious purpose
- Ceremony gates ensure intentional entry into every work context
- Readiness checks surface Quranic guidance at moments of transition
- Prayer enforcement means spiritual obligations take structural precedence over operational tasks
- The three-tier pillar dashboards (Necessities / Needs / Excellence) mirror the jurisprudential hierarchy of obligations, helping users distinguish fard from mustahabb from ihsan

---

## 10. Benefits to Stakeholders

### 10.1 Muslim Individuals and Families

**Unified life management under Islamic objectives.** The most immediate benefit is coherence — no longer managing spiritual practice, finances, family, and work in separate siloed tools that share no common framework. Every domain in Maqasid OS is oriented toward the same seven objectives.

**Structural Islamic practice enforcement.** Prayer is not a notification to be swiped away — it is a structural pause in the application. Niyyah is not optional — the system asks for it before work begins. This architectural enforcement supports Muslims who recognize the value of these practices but struggle with consistency in a distraction-saturated environment.

**Quranic relevance, not generic inspiration.** The readiness ayah system provides Quranic guidance calibrated to the user's actual reported state, not randomly selected motivational verses. This makes scripture engagement contextually meaningful rather than decorative.

### 10.2 Islamic Business Operators

**Truth-safe business construction.** BBOS systematically prevents the shortcuts that cause most businesses to fail or cause harm: unverifiable claims, offers built on hope, strategies based on assumption. An operator who completes the full BBOS pipeline has a business with a documented evidence base at every stage.

**Halal compliance as a structural gate, not an afterthought.** The Amanah Gate at Stage 00 screens the business concept before any work is invested. Riba and gharar are identified at the entry point, not after months of pipeline construction.

**LLM-augmented without LLM-dependent.** The AI assists with drafts, analysis, and structured outputs — but the Assembly Gate ensures the operator retains sovereignty over all final deliverables. The AI is a research partner, not an autonomous producer.

**Role-based team execution.** The 7-role access control system (OW, ST, CW, MB, SE, CL, FU) allows a team of operators to work the pipeline simultaneously without role-inappropriate access to sensitive stages.

### 10.3 Teams and Organizations

**Audit trail through G-labeling.** Every claim in the pipeline carries an evidence grade. This creates a complete, inspectable evidence trail for any stakeholder who needs to verify the basis for a business decision.

**Stage-gated advancement.** The sequential pipeline structure prevents teams from rushing to execution before strategic foundations are solid. The gate conditions serve as natural governance checkpoints.

**Shared operational context.** The Work, Money, People, and Office modules provide shared operational infrastructure for any team that also uses BBOS — the pipeline and the operations live in the same system.

### 10.4 Developers and Architects

**Covenant Architecture as a replicable design pattern.** The design philosophy documented in `wiki/concepts/covenant-architecture.md` and expressed throughout the codebase provides a model for how software can be purposefully structured around ethical and values-based objectives — applicable beyond the Islamic context to any values-grounded software project.

**CONTEXT.md routing as a scalable development protocol.** The Context-First Protocol — where every directory documents itself before any source file is opened — is a solution to the common problem of AI-assisted development generating redundant or conflicting code. It is applicable to any large codebase regardless of the Islamic context.

**Clean state architecture.** The 13 Zustand stores with domain-scoped responsibility, path aliases, design token system, and co-located CSS provide a clean, readable architecture that scales well for a single-developer or small-team context.

**LLM-integrated development workflow.** The Claude OS / MWP framework, wiki system, and graphify integration demonstrate a mature approach to LLM-assisted software development — one where the AI has persistent context, bounded authority, and structured orientation rather than starting from scratch each session.

### 10.5 Islamic Studies and Systems Theory Researchers

**Empirical application of Jasser Auda's systems framework.** Maqasid OS is perhaps the most fully realized software implementation of Auda's systems-theoretic reframing of the Maqasid. Researchers interested in purpose-oriented jurisprudence applied to digital systems design will find the system — and its wiki documentation — a substantive case study.

**Documented design decisions.** The `wiki/decisions/` ADR system records architectural decisions with rationale, making the system's intellectual history transparent and citable.

---

## 11. Known Limitations and Areas for Improvement

This section documents the system's current gaps honestly. Understanding these limitations is essential for operators, developers, and potential contributors.

### 11.1 No Automated Test Framework

**Current state:** No test framework is configured. There are no unit tests, integration tests, or end-to-end tests.

**Risk:** Any significant refactoring or feature addition carries regression risk that cannot be systematically detected. Store interactions, ceremony gate logic, BBOS scoring algorithms, and routing behaviour are all untested.

**Improvement path:** Introduce Vitest (the natural companion to Vite) for unit testing stores and pure logic functions. Add Playwright for critical end-to-end flows (CeremonyGate → module entry, BBOS task panel field saving, prayer overlay behaviour).

### 11.2 Dual Contact Systems — No Unified Contact Model

**Current state:** Two entirely separate contact systems exist in parallel: `crm-store.js` (sales contacts, deal pipeline) and `contacts-store.js` (HR contacts, employment records, salaries). There is no technical link between them.

**Risk:** A person who is both an employee and a client must be entered and maintained in two separate stores. Cross-reference queries (e.g., "show all people associated with this organization across HR and sales") are impossible.

**Improvement path:** Design a unified contact model that distinguishes contact type (employee / CRM contact / vendor / community member) while maintaining a single source of truth for the person record.

### 11.3 Manual localStorage Persistence — No Cloud, No Sync

**Current state:** All 13 stores persist to browser localStorage via manual `safeSet`/`safeGetJSON` calls. There is no cloud backup, no cross-device synchronization, and no data migration path beyond the schema v5.0 migration script.

**Risk:** Data loss on browser data clearing, browser storage quota exceeded for large projects, no access from secondary devices, no disaster recovery.

**Improvement path:** Introduce a backend persistence layer (REST API or local-first sync via CRDTs/PouchDB). The `services/storage.js` abstraction already provides a clean interface for replacing the localStorage implementation without touching store code.

### 11.4 BBOS UI / Protocol Gap

**Current state:** The BBOS v2.4 protocol documentation (Two-Factory Model, Assembly Gate as typed `ASSEMBLE` command, G1-G4 evidence grade rendering, Patch Plan sub-stages 00A and 01B) is fully documented in the wiki and data files, but the UI implementation may not yet fully reflect all documented mechanics.

**Specific gaps identified:**
- The Two-Factory (Research Factory / Asset Factory) split is not visually explicit in the current BbosFullDashboard layout
- The `ASSEMBLE` command trigger is protocol-documented but not yet surfaced as an explicit UI interaction
- G1-G4 grade labels are defined in the task definitions but their visual rendering in the task panel is incomplete
- Patch Plan sub-stages 00A (Input Integrity Gate) and 01B (Mechanism Factory) are not represented in the pipeline header stage progression

**Improvement path:** Audit BbosFullDashboard against the v2.4 protocol document stage by stage. Build the Research Factory / Asset Factory split as a visual tab or section within each stage view. Surface the Assembly Gate as an explicit, styled UI affordance rather than a text command.

### 11.5 Tech Module — Simulated Monitoring

**Current state:** `tech-store.js`'s `checkMonitor()` function simulates website monitoring status responses. No real HTTP health checks are made.

**Risk:** The monitoring dashboard presents data that does not reflect actual system state. Operators relying on it for website uptime visibility will receive false confidence.

**Improvement path:** Implement real HTTP health check calls from a serverless function (Cloudflare Worker or equivalent) to avoid CORS issues. Update `checkMonitor()` to call this endpoint and return real status data.

### 11.6 People Module Refactor — Unsettled Architecture

**Current state:** The People module is undergoing a significant refactor. Multiple component files have been deleted and restructured. The target component architecture is not yet finalized.

**Risk:** Further development that touches the People module may conflict with the ongoing refactor. Documentation in the People `CONTEXT.md` may be stale.

**Improvement path:** Complete the refactor, document the settled architecture in the People `CONTEXT.md`, and run a full build verification before considering the module stable.

### 11.7 Single-User, Local-Only Architecture

**Current state:** The system is designed for a single authenticated user with no multi-user support, real-time collaboration, or server-side user management.

**Risk:** BBOS's role-based access control system (7 roles × 118 task access matrix) has no enforcement mechanism because there is no multi-user session management. A user switching roles in BbosRolePicker changes their view but there is no actual access control — all data is equally accessible to whoever holds the browser session.

**Improvement path:** Implement a lightweight authentication and session management layer. The `auth-store.js` already holds a user profile structure — this could be extended into a real auth flow with JWT or session-based authentication against a backend.

### 11.8 Windows-First Platform Assumptions

**Current state:** The project explicitly documents Windows-first assumptions: PowerShell/cmd over Bash, cp1252/UTF-8 encoding awareness, no POSIX path expectations.

**Risk:** Limits contributor and deployment portability. CI/CD pipelines running on Linux agents may encounter encoding or path issues in build scripts.

**Improvement path:** Audit all scripts and shell commands for platform-specific assumptions. Add a `cross-env` dependency for environment variable handling. Document encoding handling in CONTEXT.md files for future contributors.

### 11.9 No Accessibility Audit

**Current state:** No WCAG 2.1 AA compliance audit has been documented. Screen reader compatibility, keyboard navigation completeness, touch target sizing, and color contrast ratios have not been formally reviewed.

**Risk:** The system may be inaccessible to users with visual, motor, or cognitive disabilities. Components like PrayerOverlay (full-screen blocker), ThresholdModal (multi-step ceremony), and BbosTaskPanel (complex form) are particularly likely to have accessibility gaps.

**Improvement path:** Run an automated accessibility audit (axe-core, Lighthouse). Prioritize keyboard navigation in modal flows and ARIA labeling in dynamic components. The design token system's color values should be checked against WCAG contrast ratios.

### 11.10 Atlas Integration — Reference Only, No Live Data Bridge

**Current state:** Atlas is linked as a git submodule (reference only). There is no API layer, no shared data format, and no live data flowing between the geospatial Atlas system and the Maqasid OS application.

**Risk:** The Environment and Ummah pillars, which conceptually depend on Atlas for land and community data, cannot actually surface Atlas data in the current architecture.

**Improvement path:** Define an Atlas API contract (likely Fastify REST endpoints from the Atlas backend). Implement a data fetching layer in Maqasid OS (React Query or SWR) that queries Atlas for land parcel data, CSRA participant records, and environmental metrics to surface in the relevant pillar dashboards.

---

## Appendix A — Key File Reference

| File | Purpose |
|---|---|
| `src/data/maqasid.js` | Seven pillar definitions — the system's foundational data structure |
| `src/data/modules.js` | Eight module definitions |
| `src/data/bbos/bbos-pipeline.js` | 9 stage definitions, 3 layer definitions, stage lookup functions |
| `src/data/bbos/bbos-task-definitions.js` | 118 task template definitions (181KB) |
| `src/data/bbos/bbos-role-access.js` | 7 role definitions + access matrix for all 118 tasks |
| `src/data/bbos/bbos-stage-islamic.js` | Islamic grounding per stage: divine names, dua, readiness, reflection |
| `src/data/ayat/` | Readiness ayah router + per-pillar Quranic verse matrices |
| `src/services/storage.js` | localStorage abstraction with bbiz_ prefix |
| `src/services/id.js` | 30+ ID generator factories (nanoid-based) |
| `src/services/migration.js` | Schema v5.0 migration (contacts model unification) |
| `src/styles/tokens.css` | Complete design token system |
| `src/components/bbos/BbosFullDashboard.jsx` | Unified BBOS dashboard |
| `src/components/bbos/BbosTaskPanel.jsx` | Task detail panel with field input, G-label, AI draft |
| `src/components/islamic/CeremonyGate.jsx` | Portal-based module entry gate |
| `src/hooks/usePrayerTimes.js` | Aladhan API + Nominatim integration |
| `wiki/entities/maqasid-os.md` | System overview and current state |
| `wiki/entities/bbos-pipeline.md` | BBOS v2.4 complete documentation |
| `wiki/concepts/covenant-architecture.md` | Design philosophy |
| `wiki/concepts/maqasid-al-shariah.md` | Jurisprudential framework |
| `docs/principles.md` | Amanah Gate full protocol and workflow principles |

---

## Appendix B — Glossary

| Term | Definition |
|---|---|
| Maqasid Al-Shariah | The higher objectives of Islamic law — the purposes that Shariah seeks to protect and develop |
| Amanah | Trust or trusteeship — the principle that all human stewardship is held on behalf of Allah |
| Niyyah | Conscious intention — declared before any act of worship or significant work |
| Riba | Usury or prohibited financial interest |
| Gharar | Deception, excessive uncertainty, or hidden terms in a transaction |
| G-Label | Evidence grade in BBOS: G1 (highest, documented proof) through G4 (unverified assertion) |
| CSRA | Community-Supported Regenerative Agriculture — the preferred term for land investment participants |
| Asma al-Husna | The Beautiful Names of Allah — used in BBOS to ground each stage in divine attributes |
| Ihsan | Excellence — the highest tier of Islamic practice, doing as if you see Allah |
| Waqf | Islamic endowment — perpetual charitable trust |
| SPA | Single-Page Application — the architectural pattern of the Maqasid OS frontend |
| MWP | Model Workspace Protocol — the three-layer Claude Code context system |
| Two-Factory Model | BBOS architecture separating Research Factory (analysis) from Asset Factory (production) |
| Assembly Gate | The BBOS rule prohibiting AI asset production until the operator types `ASSEMBLE` |

---

*This report was compiled from the Maqasid OS project wiki, CONTEXT.md routing hierarchy, source code, and BBOS v2.4 documentation. It reflects system state as of 2026-04-11.*
