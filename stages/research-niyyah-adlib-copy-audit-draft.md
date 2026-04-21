---
phase: research
slug: niyyah-adlib-copy-audit
status: draft
amanah: pending
created: 2026-04-19 10:10
---

# Review Gate: research — niyyah-adlib-copy-audit

## Summary

The Ad-lib "Daily Manifesto" flow renders a sentence built from three
dropdowns: **feeling → pillar → submodule**. The doc §5 ("Small Wins
Dropdown") argues that some current dropdown labels read as technical
nouns rather than human-first language — e.g. *"Resource Consumption"*
vs *"Being mindful of what I use"*. This document proposes
reframings for review BEFORE any code edits, since Islamic framing
must be preserved per global CLAUDE.md.

**No code has been changed.** This is a copy proposal only.

## Scope & Non-Scope

**In scope**
- Pillar stewardship sublabels (shown as option sublabel in the pillar
  dropdown — `stewardshipLabel` + `universalStewardship` in
  `src/data/maqasid.js`).
- Submodule display labels where the current label is an abstract
  title-cased suffix (e.g. `life-physical` → "Physical").

**Out of scope — do NOT reframe**
- Faith submodule names (Shahada, Salah, Zakah, Siyam, Hajj) — these
  are Islamic proper nouns.
- Module names (Work, Money, People, Office, Tech) — already concrete.
- Arabic roots (`arabicRoot`, `arabicRootAr`) — linguistic anchors,
  untouched.

## Current State (what renders today)

The Ad-lib sentence renders as:
> My heart feels **[feeling]**. I want to honor my pillar of
> **[pillar]** by tending to **[submodule]**.

When opening the pillar dropdown, each option shows:
- Primary label — `sidebarLabel` (Islamic) / `universalLabel` (Universal)
- Sublabel — `arabicRoot` (Islamic) / `universalStewardship` (Universal)

When opening the submodule dropdown, each option shows:
- Label — via `getSubmoduleLabel(id, pillarId)` in `src/data/maqasid.js`

## Proposal — Pillar Stewardship Sublabels (Universal layer)

Affects the **sublabel** shown in the pillar dropdown when
`valuesLayer === 'universal'`. Islamic-layer arabicRoot stays as-is.

| Pillar | `universalStewardship` (current) | Proposed human-first sublabel |
|---|---|---|
| Faith | Purpose Alignment | Keeping my compass true |
| Life | Vitality Management | Tending to body and breath |
| Intellect | Cognitive Clarity | Protecting my mind from clutter |
| Family | Legacy Stewardship | Caring for the people I come from |
| Wealth | Resource Management | Handling what I've been given |
| Environment | Ecological Balance | Treading gently on the earth |
| Ummah | Community Impact | Showing up for the people around me |
| Moontrance | Territorial Stewardship | Caring for the land I stand on |

*Rationale:* the current wording reads like a consulting deck
(*"Management"*, *"Stewardship"*, *"Impact"*). The Ad-lib frame is a
first-person morning sentence — noun-phrases that begin with verbs or
gerunds land better inside it.

## Proposal — Abstract Submodule Labels

Only labels that are currently a single title-cased word are candidates.
Concrete nouns (Home, Marriage, Kinship) stay as-is.

| Submodule ID | Current label | Proposed human-first label | Note |
|---|---|---|---|
| `life-physical` | Physical | Body & movement | |
| `life-mental` | Mental | Mind & mood | |
| `life-safety` | Safety | Feeling safe at home and out | |
| `life-social` | Social | Time with others | |
| `intellect-learning` | Learning | Learning something new | |
| `intellect-thinking` | Thinking | Thinking something through | |
| `intellect-cognitive` | Cognitive | Sharpening how I think | |
| `intellect-professional` | Professional | Getting better at my craft | |
| `env-resource` | Resource | Being mindful of what I use | from doc §5 |
| `env-waste` | Waste | Making less waste | |
| `env-ecosystem` | Ecosystem | The living world around me | |
| `env-sourcing` | Sourcing | Where my things come from | |
| `moontrance-land` | Land | The land itself | |
| `moontrance-seasonal` | Seasonal | Working with the seasons | |
| `moontrance-residency` | Residency | Rooting in place | |
| `collective` | Collective | The wider ummah | label = proper noun; check |
| `wealth-earning` | Earning & Provision | *keep* | already human-readable |
| `wealth-financial` | Financial Literacy | Understanding my money | |
| `wealth-ownership` | Ownership & Rights | *keep* | already human-readable |
| `wealth-circulation` | Circulation & Impact | Giving back from what I've been given | from doc §5 |

## Implementation Path (once approved)

1. Add a `humanFirstLabel` field (or `label` override) to pillar entries
   in `src/data/maqasid.js` for stewardship sublabels.
2. Extend `getSubmoduleLabel(id, pillarId)` to optionally return a
   human-first variant when called with `{ tone: 'human' }` — keeps
   other call sites untouched.
3. Thread a `tone` prop through the Ad-lib `InlineBlankPicker` options
   builder in `NiyyahAct.jsx`.
4. Leave the sidebar / pillar dashboard labels untouched — this tone
   only applies inside the morning Ad-lib sentence.

## Amanah Gate
- [ ] Halal purpose confirmed — reframing dropdown copy, no doctrinal content
- [ ] No riba/gharar concerns — n/a
- [ ] Itqan standard met — proposals are noun-phrases fitting the sentence
- [ ] Existing tests still pass — no code changed

## Key Decisions (proposed)
- Apply the human-first tone ONLY inside the morning Ad-lib, not globally.
  Sidebar / navigation / pillar pages retain current copy.
- Faith submodule names (Islamic proper nouns) are not candidates for
  reframing — those carry meaning that generic verbs would strip.
- Pillar names themselves (Faith, Purpose, Life, Vitality, ...) are
  untouched; only the **sublabel** (currently `universalStewardship`)
  is reframed.

## Open Questions
1. Approve / reject / edit each row in the two tables above.
2. Should the human-first tone also apply to the **Manifesto banner**
   on the dashboard, or only to the authoring moment in the modal?
3. "Collective" as an Ummah submodule label — is this still the right
   term, or do you want something warmer (e.g. "The wider ummah",
   "People beyond my circle")?

## Reviewer Notes

_Please annotate the proposal tables directly — edit the "Proposed"
column in place. Strike rows that should stay as-is._

## Decision
- [ ] **Approved** — proceed to implementation with the annotated table
- [ ] **Rejected** — rework (see notes)
