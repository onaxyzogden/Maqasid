# Graph Report - .  (2026-04-18)

## Corpus Check
- Corpus is ~25,951 words - fits in a single context window. You may not need a graph.

## Summary
- 84 nodes · 134 edges · 9 communities detected
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_MTC Faith-Rooted Community|MTC Faith-Rooted Community]]
- [[_COMMUNITY_BBOS Pipeline & Journey|BBOS Pipeline & Journey]]
- [[_COMMUNITY_OLOS Prayer-First Land Design|OLOS Prayer-First Land Design]]
- [[_COMMUNITY_OLOS Scoring & Stewardship|OLOS Scoring & Stewardship]]
- [[_COMMUNITY_OGDEN Ecosystem & Outreach|OGDEN Ecosystem & Outreach]]
- [[_COMMUNITY_MILOS Islamic OS|MILOS Islamic OS]]
- [[_COMMUNITY_BBOS Covenant Foundations|BBOS Covenant Foundations]]
- [[_COMMUNITY_Land-as-Trust Philosophy|Land-as-Trust Philosophy]]
- [[_COMMUNITY_Amanah Gate & Honesty|Amanah Gate & Honesty]]

## Keystone Nodes (most connected - your core abstractions)
1. `BBOS — Barakah Business Operating System` - 13 edges
2. `G-Label System (G1-G4)` - 10 edges
3. `MTC (Muslim Taqwa Collective)` - 10 edges
4. `MILOS — Muslim Islamic Life Operating System` - 9 edges
5. `Amanah Gate (Stage 02 Go/No-Go)` - 9 edges
6. `BBOS Solution — Full System` - 8 edges
7. `OGDEN Ecosystem` - 7 edges
8. `BBOS Nine-Stage Pipeline` - 7 edges
9. `OLOS (Land Design Intelligence)` - 7 edges
10. `OLOS — Ogden Land Operating System` - 6 edges

## Surprising Connections (you probably didn't know these)
- `G-Label System (G1-G4)` --semantically_similar_to--> `OLOS Confidence Framework (High/Medium/Low)`  [INFERRED] [semantically similar]
  .graphify_website_staging/bbos/solution/index.md → .graphify_website_staging/CONTEXT.md
- `Seven Maqasid al-Shariah` --semantically_similar_to--> `Three Deeds Hadith (Sadaqah Jariyah, Ilm Nafi, Walad Salih)`  [INFERRED] [semantically similar]
  .graphify_website_staging/milos/index.md → .graphify_website_staging/index.md
- `BBOS Connect / Express Interest` --references--> `BBOS — Barakah Business Operating System`  [EXTRACTED]
  .graphify_website_staging/bbos/connect/index.md → .graphify_website_staging/bbos/index.md
- `BBOS Vision — Covenant System` --references--> `BBOS Nine-Stage Pipeline`  [EXTRACTED]
  .graphify_website_staging/bbos/vision/index.md → .graphify_website_staging/bbos/solution/index.md
- `Stewardship Reckoning / Stewardship Score` --conceptually_related_to--> `G-Label System (G1-G4)`  [INFERRED]
  .graphify_website_staging/bbos/product/vision/index.md → .graphify_website_staging/bbos/solution/index.md

## Hyperedges (group relationships)
- **Amanah Gate Protocol — tiered evidential honesty across products** — concept_g_label_system, concept_olos_confidence_framework, concept_amanah_gate_protocol [EXTRACTED 1.00]
- **OGDEN — Four expressions of one intention** — bbos_product, olos_product, mtc_product, milos_product [EXTRACTED 1.00]
- **BBOS Integrity Mechanisms — Amanah Gate + G-Label + NO-SHIP + Nine Stages** — concept_amanah_gate, concept_g_label_system, concept_no_ship_protocol, concept_nine_stage_pipeline [EXTRACTED 1.00]
- **OGDEN Three Expressions** — product_bbos, product_olos, product_mtc [EXTRACTED 1.00]
- **MTC Two Expressions of One Intention** — concept_mtc_collective, concept_mtc_community, product_mtc [EXTRACTED 1.00]
- **OLOS Assessment Stack** — concept_six_dimensions, concept_thirty_domains, concept_federal_apis [EXTRACTED 1.00]

## Communities

### Community 0 - "MTC Faith-Rooted Community"
Cohesion: 0.13
Nodes (21): Jama'ah (Communal Muslim Life), MTC The Collective — Five Faith-Designed Experiences, MTC The Community — Intentional Muslim Life on Land, Seasonal Participation (Four Seasons), Tarbiyah (Child Upbringing on Land), Three Outlasting Deeds (Sadaqah Jariyah, Ilm Nafi, Walad Salih), GTA / Halton Region, Ontario, MTC Collective (Pre-Land) (+13 more)

### Community 1 - "BBOS Pipeline & Journey"
Cohesion: 0.17
Nodes (20): BBOS Connect / Express Interest, BBOS Journey to Distribution, BBOS Product — How It Works Today, BBOS Product Vision — Inside the Pipeline, BBOS Solution — Full System, BBOS Solution Vision — Live Pipeline, Amanah Gate (Stage 02 Go/No-Go), Five Distortions (Control, Outcome, Validation, Identity, Comfort) (+12 more)

### Community 2 - "OLOS Prayer-First Land Design"
Cohesion: 0.24
Nodes (11): Seven Federal Data APIs (USGS/USDA/FEMA/NOAA), Five Designed Experiences (Visit & Stay), Halal as Structural (Not Requested), Prayer-First Design, Spiritual Intentionality (Prayer Orientation), MTC Collective Solution, MTC Collective Solution Vision (Land Ready), MTC Vision (Land Found) (+3 more)

### Community 3 - "OLOS Scoring & Stewardship"
Cohesion: 0.22
Nodes (10): Confidence Framework (Traceability), Regenerative Stewardship, Six Scoring Dimensions, Thirty Domains, MTC Journey to Open, OLOS Request Access Form, OLOS Home, OLOS (Land Design Intelligence) (+2 more)

### Community 4 - "OGDEN Ecosystem & Outreach"
Cohesion: 0.4
Nodes (6): Three Deeds Hadith (Sadaqah Jariyah, Ilm Nafi, Walad Salih), OGDEN Get in Touch, MTC — Muslim-Tended Creation / Faith-Rooted Land Destination, OGDEN Ecosystem, Rationale: MTC built vision/frameworks before acquiring land, Rationale: OGDEN is structured response to the Three Deeds Hadith

### Community 5 - "MILOS Islamic OS"
Cohesion: 0.4
Nodes (5): CeremonyGate (Islamic UI Component), PrayerOverlay (Islamic UI Component), ReadinessCheck (Islamic UI Component), MILOS — Muslim Islamic Life Operating System, Rationale: Maqasid al-Shariah already is the operating system of a Muslim's life

### Community 6 - "BBOS Covenant Foundations"
Cohesion: 0.5
Nodes (4): BBOS — Barakah Business Operating System, BBOS Vision — Covenant System, Rationale: BBOS is a Covenant System, not merely a Workflow Tool, Rationale: Forgetting Allah is Al-Razzaq creates self-razzaq wound

### Community 7 - "Land-as-Trust Philosophy"
Cohesion: 0.5
Nodes (4): Land as Amanah (Trust, not Investment), OGDEN Ecosystem in Motion — Journey, OLOS — Ogden Land Operating System, Rationale: Land Is a Trust (Amanah) Not an Investment Vehicle

### Community 8 - "Amanah Gate & Honesty"
Cohesion: 0.67
Nodes (3): Amanah Gate Protocol (tiered evidential honesty), OLOS Confidence Framework (High/Medium/Low), Website CONTEXT (ogden-hub)

## Knowledge Gaps
- **21 isolated node(s):** `CeremonyGate (Islamic UI Component)`, `ReadinessCheck (Islamic UI Component)`, `PrayerOverlay (Islamic UI Component)`, `Rationale: Forgetting Allah is Al-Razzaq creates self-razzaq wound`, `Rationale: BBOS is a Covenant System, not merely a Workflow Tool` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MTC (Muslim Taqwa Collective)` connect `MTC Faith-Rooted Community` to `OLOS Prayer-First Land Design`, `OLOS Scoring & Stewardship`?**
  _High betweenness centrality (0.419) - this node is a cross-community bridge._
- **Why does `Amanah Gate (Stage 02 Go/No-Go)` connect `BBOS Pipeline & Journey` to `OLOS Scoring & Stewardship`?**
  _High betweenness centrality (0.264) - this node is a cross-community bridge._
- **Why does `MTC Landing — Faith Land Creation Ontario` connect `MTC Faith-Rooted Community` to `Land-as-Trust Philosophy`?**
  _High betweenness centrality (0.258) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `G-Label System (G1-G4)` (e.g. with `OLOS Confidence Framework (High/Medium/Low)` and `Stewardship Reckoning / Stewardship Score`) actually correct?**
  _`G-Label System (G1-G4)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CeremonyGate (Islamic UI Component)`, `ReadinessCheck (Islamic UI Component)`, `PrayerOverlay (Islamic UI Component)` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MTC Faith-Rooted Community` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._