---
title: "OLOS Universal Domains"
type: concept
created: 2026-05-25
updated: 2026-05-25
tags: [olos, atlas, land-design, domains, taxonomy, lifecycle, observe-plan-act, information-architecture]
sources: 0
---

# OLOS Universal Domains

A framing for OLOS ([[olos]]): every land-based project, whatever its type, is
understood through the **same recurring areas of land stewardship**. These are
called **domains** (not "modules") deliberately — a module sounds like software
architecture; a domain is a real field of stewardship the land itself imposes.

The core claim: **the domain stays the same across the whole lifecycle; only the
verb changes.** A project doesn't stop caring about water when it moves from
Observe to Plan to Act — it just *does something different* with water at each
stage. So the right backbone is a single universal domain set, with the stage
supplying the verb and the project type supplying the emphasis.

## The 16 universal domains

| # | Domain | Core purpose |
|---|---|---|
| 1 | Vision & Project Intent | Define what the land is meant to become |
| 2 | Land Base & Boundaries | Understand the physical/legal container |
| 3 | Climate & Microclimate | Understand atmospheric conditions |
| 4 | Topography & Landform | Understand the shape of the land |
| 5 | Hydrology & Water | Understand and manage water |
| 6 | Soil & Subsurface | Understand the living foundation |
| 7 | Ecology & Biodiversity | Understand existing life systems |
| 8 | Plants, Crops & Food Systems | Design and manage plant production |
| 9 | Animals, Livestock & Wildlife | Design and manage animal relationships |
| 10 | Built Infrastructure | Manage structures and physical assets |
| 11 | Access, Circulation & Logistics | Manage movement across the site |
| 12 | Energy, Materials & Resource Flows | Manage inputs, outputs, and cycles |
| 13 | People, Roles & Governance | Manage human coordination |
| 14 | Economics & Capacity | Manage financial and operational feasibility |
| 15 | Risk, Compliance & Suitability | Identify constraints and red flags |
| 16 | Monitoring, Records & Feedback | Track change, learning, and proof |

Two domains are easy to undervalue and worth calling out: **Access &
Circulation** (a beautiful design fails if nobody planned where the truck turns
around) and **Risk, Compliance & Suitability** (which belongs early — in Stage
Zero and Observe — so a steward doesn't fall in love with land that cannot carry
their vision).

## One domain, three verbs

OLOS runs on a **three-stage** lifecycle — Observe → Plan → Act (Report is a
sibling surface, not a stage). Each universal domain is present in each stage; the
stage only changes what the steward is *doing* inside it:

| Stage | Verb inside each domain |
|---|---|
| **Observe** | Document what is happening |
| **Plan** | Decide what should happen |
| **Act** | Execute, verify, and run what continues to happen |

The source proposal listed a fourth **Operate** stage (monitor / maintain /
improve over time). OLOS does **not** revive Operate as a distinct stage — that
contradicts the "7-stage lifecycle retiring → 3-item nav is the forward IA"
direction ([[project_lifecycle_retirement]]). Instead, the *Operate verbs* are
absorbed into **Act** (its ongoing-operations modules: maintain, tracker, review,
schedule) and the **Report** surface. The ongoing-stewardship intent is kept; the
extra stage is not.

Worked example — **Hydrology & Water**:

| Stage | What happens in the Water domain |
|---|---|
| Observe | Map runoff, wet/dry areas, wells, drainage, flood risk |
| Plan | Decide ponds, swales, roof catchment, irrigation, storage |
| Act | Build swales, install tanks, repair drainage, then monitor & maintain |

## Universal domains, project-specific emphasis

The domain *set* is universal; the **emphasis** is per project type. Stage Zero's
`project-type` answer selects which domains are foregrounded first, without ever
hiding the rest. Indicative primary emphases:

- **Regenerative farm:** Soil · Water · Plants · Animals · Built Infrastructure · Economics · Monitoring
- **Intentional community:** Vision · Land Base · Water · Built Infrastructure · People & Governance · Economics · Risk/Compliance
- **Conservation project:** Ecology · Water · Soil · Climate · Access · Risk · Monitoring
- **Agritourism / retreat:** Vision · Access · Built Infrastructure · People · Risk · Ecology · Economics
- **Homestead:** Water · Soil · Food Systems · Animals · Built Infrastructure · Energy · Economics

This is the architectural win: **one consistent system regardless of what is being
built, adapted by emphasis to the actual nature of the project.**

## Relation to today's stage-local modules

Today OLOS does *not* use a universal domain set. Each stage owns its own
independent module taxonomy — Observe **7**, Plan **15**, Act **8** — joined only
by affinity tables. The decision to **replace** those stage-local enums with this
16-domain set (as the single source of truth, specialised per stage by verb +
project-type emphasis) is recorded in ADR
[[2026-05-25-atlas-universal-domains]], which also carries the current→universal
mapping table. That ADR is direction-setting; the code refactor is future work.

Related OLOS framing lives in the atlas-submodule wiki concepts
`permaculture-alignment` and `land-os-positioning` (a different wiki, so referenced
here by name rather than wikilink).

## Connections

- Entity: [[olos]]
- Decision: [[2026-05-25-atlas-universal-domains]]
- Builds on the Stage Zero intake direction: [[2026-05-25-atlas-stage-zero-lean-trim]]
- Lifecycle stance: [[project_lifecycle_retirement]]
