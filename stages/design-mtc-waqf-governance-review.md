---
phase: design
slug: mtc-waqf-governance
status: review
amanah: pending
created: 2026-05-02
---

# Review Gate: design — mtc-waqf-governance

## Decisions Resolved (Yousef, 2026-05-02)

The eight initial open questions in this doc were resolved on 2026-05-02.
Each decision is now folded into the relevant body section; this block
summarizes them for fast reference.

1. **OGDEN's role(s)** (§8.1) — **Confirmed: wāqif + initial trustee +
   tooling licensor**, transitioning to tooling licensor only. The
   transition must be **deed-bound, not intention-bound**: the deed names
   a hard trigger (e.g., "OGDEN's trustee seats reduce to zero no later
   than [X years] after seating of the third independent trustee").
   "Operating partner" is **off** the confirmed list — if OGDEN ever
   provides paid services to Operating, it is a separate arms-length
   transaction reviewed by the Scholar Council.
2. **Mutawalli composition and term limits** (§4.1) — **Confirmed: minimum
   five, staggered three-year terms, renewable once (max six consecutive
   years), then mandatory rotation with one-term cooling-off** before
   re-eligibility. Pre-land / pre-residency, the founding-member designate
   doubles as a provisional resident voice and is replaced or supplemented
   by a true resident designate once the community is seated.
3. **Surplus split** (§6.1c, §7.4) — **Hybrid: deed-locked floors, shūrā
   sets actuals above the floors annually.** Floors: no less than 30% of
   Operating surplus to Charitable, no less than 20% to corpus reinvestment
   via Holdings, no less than 10% to operating reserve. Starting target
   for discussion (subject to land-carrying-cost data once a parcel is
   identified): 35% Charitable / 40% corpus / 25% reserve.
4. **Quorum and deadlock** (§5.3) — **Confirmed with refinements: 2/3 of
   *seated* trustees, minimum three present**, except trustee appointment
   decisions which require a full-complement or near-full-complement
   threshold (so a vacancy-reduced minority cannot appoint sympathetic
   replacements). Scholar Council deadlock referral: **binding on fiqh
   questions, advisory-but-heavily-weighted on non-fiqh questions.**
5. **Founding-member vs. resident** (§3) — **Distinct tracks with a gated
   pathway between them.** Founding-member is a permanent designation
   (carries shūrā voice, priority consideration for residency, mutawalli
   candidacy eligibility) but **not** automatic residency. Residency is a
   separate application and covenant process.
6. **Charitable entity timing** (§10.3) — **Default: register before land
   acquisition**, with a documented operational plan ready at filing.
   Counsel may override on tax/CRA grounds; engage counsel on this
   question specifically before committing.
7. **CSRA model — ERASED 2026-05-04.** The Community-Supported
   Regenerative Agriculture model has been removed entirely from the MTC
   capital architecture on fiqh grounds: Islam does not permit the sale
   of what one does not yet possess (*bayʿ mā laysa ʿindak*). The
   classical exception (salam) requires a producer with capacity to
   deliver, which the pre-land MTC does not have, and even
   post-acquisition MTC will not offer salam-style advance-purchase as
   a public channel. Capital flows are restricted to charitable
   donation, qard ḥasan, restricted donation routed through the
   Charitable entity, and in-kind contribution. A future yield-sharing
   relationship may exist post-acquisition as a **membership benefit**
   (entitlement to a percentage of yield as a benefit of belonging,
   not a return on advance-purchase) and will be designed under fresh
   Scholar Council review when the corpus exists. See §6.4 below.
8. **Scope — tri-entity vs. single-entity** (§6) — **Tri-entity stack
   confirmed; single-entity alternative not explored.** Rationale: the
   liability isolation in §6.3 is load-bearing. A single entity holding
   land, running guest programming, and issuing tax receipts is exposed
   in all three directions simultaneously. Canadian courts will pierce
   an Islamic endowment instrument to reach the legal entity's assets if
   a guest is injured; the Waqf covenant is not by itself protection
   against tort liability. The tri-entity stack is the answer to that
   exposure, not a stylistic choice.

What remains before the doc can move from `review` to `approved`:

- **[scholar review]** items still need fiqh-competent attestation —
  most importantly the Holdings → Operating ijārah structure, any
  financing instrument, and the future post-acquisition
  membership-benefit yield-share design (deferred — not in this doc).
- **[lawyer review]** items still need Ontario-law counsel — most
  importantly the deed wrapper for the Waqf instrument (charitable
  purpose trust vs. conservation easement vs. bespoke deed restriction).

The wiki follow-ups (`wiki/entities/mtc-waqf.md` + dated ADR) follow
those external reviews, not this internal decision pass.

---

> **What this is:** A first-pass organizational-structure proposal for the
> Moontrance Collective (MTC), framed by Waqf principles and operationalized
> through a tri-entity legal stack. **This is a design artifact, not bylaws,
> not legal text, not a registration.** Final structure must be confirmed
> with a fiqh-competent scholar and an Ontario lawyer experienced in
> charity / trust / agricultural land law before anything is filed.

> **Tags used in this doc:**
> - **[scholar review]** — fiqh-sensitive claim that needs scholarly attestation
> - **[lawyer review]** — legal-form claim that needs counsel review
> - **[open question]** — unresolved by the user; flagged for a decision

> **Companion document:** Scriptural and prophetic grounding for the
> structural choices below — including the Khaybar waqf hadith, qawī+amīn
> trustee criteria, the shepherd hadith, and the anti-hīlah / riba /
> gharar grounding — is consolidated in
> [scholar-review-mtc-waqf-governance-grounding-review.md](scholar-review-mtc-waqf-governance-grounding-review.md).
> The 2026-05-02 NotebookLM Muslim Scholar pass behind that doc has
> already been folded into §2, §4.1, §5, §6.4, and §7.5 below.

---

## 1. Purpose & Scope

### What this doc is
- A structured proposal for **how MTC is organized** — the entities, roles,
  decision rights, and the Waqf covenant that binds them.
- A bridge between the values already locked in the public vision
  ([website/mtc/](../website/mtc/), [collective-overview.js](../src/data/module-overviews/collective-overview.js))
  and the legal/operational form needed to host land, programs, and donations.

### What this doc is not
- Not bylaws.
- Not articles of incorporation.
- Not a charity application.
- Not a deed of waqf or trust instrument.
- Not a final answer on jurisdiction, madhhab posture, or tax treatment.

### Audience
- **Yousef** — to confirm the structure aligns with intent before counsel is engaged.
- **Future trustees / mutawalli candidates** — to understand what they would steward.
- **Future legal counsel and scholars** — as the working brief from which they draft real instruments.
- **Founding members and capital partners (qard ḥasan / donors)** — as the document explaining why MTC is structured this way.

### Scope guardrails (from the approved plan)
- No contradictions with the locked website-facing vision and the principles
  encoded in [collective-overview.js](../src/data/module-overviews/collective-overview.js)
  (Khilāfah, Jamāʿah, Tarbiyah, Waqf, Ḍiyāfah).
- No genericizing of Islamic framing. (The CSRA naming convention,
  formerly locked here, was removed 2026-05-04 with the model itself.)
- This session edits no source files outside `stages/`.

### Why a tri-entity stack and not a single entity (resolved 2026-05-02)

A single-entity alternative — e.g., a federally incorporated charity
holding land subject to a deed restriction, running guest programming,
and issuing tax receipts — would be simpler, cheaper, and easier to
govern for a small community. It avoids inter-entity transfer pricing
scrutiny and the lease complexity, and reduces governance overhead from
three boards to one.

That option was considered and **rejected**. The decisive reason is
liability isolation against tort exposure. A community that hosts guests
on the land and employs operating staff faces three concurrent risk
surfaces (premises liability, employment, charitable-program operations).
A single entity carrying all three is exposed in all three directions
simultaneously, and Canadian courts will pierce through an Islamic
endowment instrument to reach the legal entity's assets if a guest is
injured. The Waqf covenant alone is not protection against tort
liability; the tri-entity stack in §6 *is*. The simplicity tradeoff is
real but is paid as insurance against catastrophic exposure to the
corpus (the land itself), which the Waqf instrument forbids being
disposed of for any reason. See §6.3 for the full rationale.

---

## 2. Foundational Frame — Why Waqf

### Scriptural anchor — the Khaybar Waqf

The seminal hadith for the institution of waqf is **Sahih al-Bukhari Book 50,
Number 895** (also Book 51, Number 33):

> "Umar bin Khattab got some land in Khaibar and he went to the Prophet to
> consult him about it saying, 'O Allah's Apostle, I got some land in
> Khaibar better than which I have never had, what do you suggest that I do
> with it?' The Prophet said, 'If you like you can give the land as endowment
> and give its fruits in charity.' So Umar gave it in charity as an endowment
> on the condition that **it would not be sold nor given to anybody as a
> present and not to be inherited**, but its yield would be given in charity
> to the poor people, to the kith and kin, for freeing slaves, for Allah's
> Cause, to the travelers and guests; and that **there would be no harm if
> the guardian of the endowment ate from it according to his need with good
> intention, and fed others without storing it for the future**."

This single narration grounds four of the load-bearing claims in this doc:

| Claim | Hadith basis | Doc reference |
|---|---|---|
| Inalienability of the corpus | "would not be sold nor given to anybody as a present and not to be inherited" | §6.1a |
| Dedication of usufruct to a defined beneficiary class | "yield would be given in charity to the poor people, to the kith and kin, for freeing slaves, for Allah's Cause, to the travelers and guests" | §3, §6.1c |
| Legitimacy of an appointed trustee (mutawalli) | "the guardian of the endowment" | §4.1 |
| Permissibility of moderate trustee compensation | "no harm if the guardian of the endowment ate from it according to his need with good intention" | §4.1 |

Sadaqah jāriyah (Sahih Muslim Book 13 No. 4005) — *"When a man dies, his
acts come to an end, but three: recurring charity, knowledge by which
people benefit, or a pious son who prays for him"* — is the second pillar
of the Waqf rationale: a waqf is the institutional form of recurring charity.

Beneficiary-class verses already established in MILOS content:
**Adh-Dhāriyāt 51:19**, **Al-Baqarah 2:177 / 2:215**, **At-Tawbah 9:60**,
**An-Nisāʾ 4:58**.

For full scriptural grounding (Khaybar, sadaqah jāriyah, Abu Talha's Bairuha
garden, Saʿd's Al-Makhraf, beneficiary verses) see the companion document
[scholar-review-mtc-waqf-governance-grounding-review.md](scholar-review-mtc-waqf-governance-grounding-review.md) Part 1.

### Definition (working)
A **waqf** is the dedication of an asset such that:

- **Perpetuity** — the asset is held in perpetuity; ownership is transferred
  to Allah ﷻ in the metaphysical sense, with humans acting only as stewards.
- **Inalienability** — the corpus cannot be sold, gifted, inherited, or
  encumbered. Only the usufruct (manfaʿah) is directed to beneficiaries.
- **Beneficiary-fixed** — the wāqif (founder) names a class of beneficiaries
  (mawqūf ʿalayhi) and a purpose; trustees cannot redirect the benefit.
- **Stewarded** — a mutawalli (trustee/administrator) is charged with
  maintaining and deploying the asset for its stated purpose. **[scholar review]**

### Why Waqf, not just "a charity" or "a corporation"
The choice of frame is load-bearing. The four reasons MTC is being designed
as a Waqf rather than as a conventional nonprofit, co-op, or LLC:

| Axis | Conventional charity / corp | Waqf |
|---|---|---|
| **Stewardship vs ownership** | Board owns/controls; can dispose | Held for Allah; trustees only steward |
| **Perpetuity** | Can be wound up, sold, merged | Designed to outlast founders permanently |
| **Beneficiary protection** | Mission can drift via board vote | Beneficiary class fixed by the waqf instrument |
| **Riba/gharar containment** | No structural prohibition | Structurally incompatible with riba; gharar avoided by design |

### Cross-link to existing project content
- The Waqf principle is already articulated as one of the five pillars of
  **The Collective** in [collective-overview.js:88–114](../src/data/module-overviews/collective-overview.js)
  — the conditions and virtues there are inputs to this doc, not redefined here.
- [collective-overview.js:151](../src/data/module-overviews/collective-overview.js)
  names "Legal structure (waqf / trust) protecting the land from private sale
  or dissolution" as a **necessity** (ḍarūriyyāt) of The Collective Maqasid frame.
- [moontrance-residency-overview.js:79](../src/data/module-overviews/moontrance-residency-overview.js)
  names the "Waqf or trust structure ensures the community outlasts its
  founding generation" as a residency condition.
- [community-overview.js:102](../src/data/module-overviews/community-overview.js)
  names "Islamic social entrepreneurship and community endowments (Waqf)" as
  a Maqasid-tier embellishment of the Community module.
- [wiki/concepts/covenant-architecture.md:29](../wiki/concepts/covenant-architecture.md)
  asserts the Waqf-as-governance frame at the philosophical level — this doc
  operationalizes that one-line claim.

---

## 3. Stakeholder Map

The actors involved in or served by MTC, and what each one is in this structure.

| Actor | What they are | Relation to the Waqf |
|---|---|---|
| **OGDEN** | Parent platform; founder organization that originated MTC | **Wāqif** + initial trustee + tooling licensor, with deed-bound transition to tooling-licensor only (resolved 2026-05-02 — see §8.1). "Operating partner" is **not** a confirmed role. |
| **MTC Waqf** | The endowed entity itself — the covenant + the corpus | The structure being designed |
| **Holdings entity** | Ontario legal entity holding land in fee simple | The corpus carrier; legally bound by the Waqf instrument |
| **Operating entity** | Ontario corporation running the farm and the five Collective experiences | Lessee of the Holdings; bound by the Waqf instrument as to surplus and conduct |
| **Charitable entity** | Registered Canadian charity / non-profit | Beneficiary-facing arm; receives donations and qard ḥasan |
| **Mutawalli / Trustees** | Governance body of the Waqf | Steward the corpus; appoint and oversee the directors of the three legal entities |
| **Scholar Council** | Fiqh-competent scholars who attest the Waqf's compliance | Advise mutawalli; bind on questions of fiqh |
| **Founding Members** | Early committed families who shape the vision pre-land and early-residency | Participate in shūrā; some may sit on the mutawalli body |
| **The Community (residents)** | Year-round residents of MTC (per [moontrance-residency-overview.js](../src/data/module-overviews/moontrance-residency-overview.js)) | Beneficiaries of the Waqf; participate in shūrā per the residency covenant |
| **Capital partners** | Donors and qard ḥasan lenders (interest-free) | Support the corpus and operations; never equity holders, never advance-purchasers |
| **Beneficiaries (defined class)** | Muslim families in the GTA / Halton region encountering the Collective and Community | The mawqūf ʿalayhi — the class for whom the Waqf is established |
| **Operating staff** | Paid employees of the Operating entity | Standard employment relationship with Operating entity |
| **Guests** | Day visitors and overnight guests of the five Collective experiences | Customers of the Operating entity; honoured per Ḍiyāfah |

**Resolved (2026-05-02):** Founding members and residents are **distinct
tracks with a gated pathway between them.** Founding-member status is a
permanent designation earned by pre-land covenant commitment — it carries
shūrā voice, priority consideration for residency, and eligibility for
mutawalli candidacy, but **not** automatic residency. Residency is a
separate post-land application and covenant process. A founding member
who wishes to become a resident goes through the residency gate like
anyone else; founding-member status is noted but not determinative. This
preserves the prophetic principle that standing does not exempt from
accountability (cf. ʿUmar's dismissal of Saʿd in §4.1).

---

## 4. Roles & Decision Rights

### 4.1 Mutawalli (Board of Trustees)

- **Role:** Steward the Waqf corpus; ensure all three legal entities operate
  in conformity with the Waqf instrument; appoint and oversee directors of
  the Holdings, Operating, and Charitable entities; act as ultimate authority
  on any conflict between operational expediency and covenant obligations.
- **Qualifications — qawī + amīn:** Per **Al-Qaṣaṣ 28:26** ("the best one
  you can hire is the strong [qawī] and the trustworthy [amīn]"), every
  mutawalli must satisfy *both* prongs: capacity to discharge the role
  (competence, capability, time) and integrity of character (confirmed
  amānah). The Prophet's ﷺ warning anchors the converse: when asked when
  the Hour would come, he said, *"When honesty is lost, then wait for the
  Hour"* — clarified as *"when the power or authority comes in the hands
  of unfit persons"* (Sahih al-Bukhari). Appointing the unqualified is
  itself a sign of communal collapse.
- **Composition (resolved 2026-05-02):** Minimum of five trustees, with
  staggered terms; minimum one scholar designate or Scholar Council
  liaison; minimum one founding-member designate; minimum one resident
  designate once the community is seated. **Pre-land / pre-residency
  rule:** the founding-member designate **doubles as a provisional
  resident voice** until residency is established, at which point a
  resident designate replaces or supplements them. This must be explicit
  in the deed, not assumed, so there is no governance gap during the
  pre-residency window.
- **Appointment:** Initial mutawalli named in the deed of waqf by the wāqif.
  Subsequent appointments by remaining trustees on shūrā, with Scholar Council
  attestation that the candidate is qawī + amīn per the standard above.
  **[scholar review]**
- **Term (resolved 2026-05-02):** Three-year staggered terms, **renewable
  once** (maximum six consecutive years), then **mandatory rotation with
  a one-term (three-year) cooling-off period** before re-eligibility.
  This operationalizes the "no permanent, unchecked authority" principle
  in [moontrance-residency-overview.js:50](../src/data/module-overviews/moontrance-residency-overview.js)
  while preserving enough continuity that institutional knowledge is not
  constantly bleeding out.
- **Compensation:** Moderate compensation for the trustee's labour is
  permitted, grounded in the closing clause of the Khaybar hadith (§2):
  *"there would be no harm if the guardian of the endowment ate from it
  according to his need with good intention, and fed others without
  storing it for the future."* The deed should set a documented, modest
  compensation standard reviewed by the Scholar Council. **[scholar review]**
- **Removal for cause:** Grounds — breach of amānah (khiyānah), manifest
  fisq, sustained inability to serve (qawī prong fails). Process is
  modelled on the prophetic precedent of **ʿUmar ibn al-Khaṭṭāb dismissing
  Saʿd from leadership in Kufa** after public complaint, having dispatched
  investigators to ask the community about his conduct *before* finalizing
  the decision. Accusations require evidence or oath per the prophetic
  ruling: *"If people were to be given what they claim (without proving
  their claim) the life and property of the nation would be lost"*
  (Sahih al-Bukhari). The exact procedural form (quorum for removal vote,
  Scholar Council attestation threshold, notice period) must be set in the
  deed and is not derivable from Qur'an + Sahihayn alone.
  **[lawyer review] [scholar review]**
- **Authority:** Bound by the deed of waqf. Cannot redirect the beneficiary
  class, cannot dispose of corpus, cannot dissolve the Waqf.
- **Accountability anchor:** *"Kullukum rāʿin wa kullukum masʾūlun ʿan
  raʿiyyatih"* — every trustee, every director, every operational lead is
  a guardian answerable to Allāh ﷻ for the charges they hold (Sahih
  al-Bukhari and Sahih Muslim, the shepherd hadith). The decision matrix
  in §4.8 operationalizes this: every decision class has a named accountable
  party.

### 4.2 Scholar Council

- **Role:** Attest fiqh-compliance of major decisions: lease terms between
  Holdings and Operating, financing arrangements, charitable purpose changes,
  trustee appointments, dispute resolution where shariʿah questions arise.
- **Authority:** Binding on fiqh; advisory on operations.
- **Composition:** **[open question]** — minimum two scholars, drawn from
  recognized institutions, ideally diverse in madhhab. **[scholar review]**

### 4.3 Directors of the Holdings entity

- **Role:** Hold the land per the deed of waqf restrictions; lease to Operating
  at arms-length, fiqh-compliant rent; maintain the corpus.
- **Authority:** Limited to corpus stewardship. Cannot sell, encumber, or
  change-of-use without trustee + Scholar Council sign-off.
- **Appointment:** By the mutawalli.

### 4.4 Directors of the Operating entity

- **Role:** Run the five Collective experiences (Guided Tour, Family Land Day,
  Seasonal Workshop, plus the two overnight experiences referenced in
  [website/mtc/collective/solution/index.html](../website/mtc/collective/solution/index.html)),
  pay staff, manage land programs and farm operations, generate revenue.
- **Authority:** Operational, bounded by the lease terms and the Waqf instrument.
- **Appointment:** By the mutawalli.

### 4.5 Directors of the Charitable entity

- **Role:** Run subsidized family programs, hold sponsorship and
  donor relationships, issue tax receipts, advance the beneficiary mission.
- **Authority:** Charitable purpose only, per registration.
- **Appointment:** By the mutawalli.

### 4.6 Founding Members

- **Role:** Participate in shūrā; carry institutional memory of the founding
  intent; eligible (not automatic) for residency, mutawalli candidacy, or
  Charitable board membership.
- **Authority:** Consultative; binding only when sitting on a body that holds
  decision rights.

### 4.7 Residents (the Community)

- **Role:** Live on the land per the community covenant; participate in shūrā
  per [moontrance-residency-overview.js](../src/data/module-overviews/moontrance-residency-overview.js).
- **Authority:** Decisions affecting daily community life are governed by the
  residency shūrā, escalated to the mutawalli only for matters that touch the
  Waqf instrument.

### 4.8 Decision Matrix (RACI-style)

| Decision | Mutawalli | Scholar Council | Holdings dir. | Operating dir. | Charitable dir. | Resident shūrā |
|---|---|---|---|---|---|---|
| Acquire / receive new land into Waqf | A | C (binding) | R | I | I | C |
| Sell or encumber land | **PROHIBITED** by deed | — | — | — | — | — |
| Set lease rent (Holdings → Operating) | A | C (binding on form) | R | R | I | I |
| Hire / fire farm staff | I | — | — | A | — | C |
| Launch / change a Collective experience | I | I | I | A | — | C |
| Receive a major donation with strings | A | C | I | I | R | I |
| Define / refine beneficiary programs | A | C | — | I | R | C |
| Trustee appointment | A | C (binding) | I | I | I | C |
| Trustee removal for cause | A | C (binding) | I | I | I | C |
| Material capital deployment from corpus | A | C (binding) | R | C | C | I |
| Financing / debt arrangement | A | C (binding) | R | C | C | I |
| Annual financial transparency report | A | I | R | R | R | C |
| Dissolution of Waqf | **PROHIBITED** by deed | — | — | — | — | — |
| Dissolution of an operating entity (Operating or Charitable) | A | C | I | varies | varies | C |

**Key:** R = responsible (does the work) · A = accountable (final sign-off) ·
C = consulted · I = informed.

---

## 5. Shūrā Process

The principle of governance-by-consultation is established by **Ash-Shūrā
42:38** — *"And those who have responded to their Lord and established
prayer and **whose affair is [determined by] consultation among
themselves**, and from what We have provided them, they spend"* —
referenced in [moontrance-residency-overview.js:42](../src/data/module-overviews/moontrance-residency-overview.js)
and named in [collective-overview.js:50](../src/data/module-overviews/collective-overview.js)
as a non-optional condition of the Jamāʿah pillar: *"Disputes are resolved
through shūrā (consultation), not authority imposed from above."*

**Prophetic practice:** During the slander of ʿĀʾisha (raḍiyallāhu ʿanhā),
when revelation was delayed, the Prophet ﷺ *"sent for ʿAlī and Usāma to
consult them"* (Sahih al-Bukhari). He gathered counsel before deciding
even when revelation was the available channel. Shūrā is therefore not
a fallback for when guidance is unclear — it is the default operating mode
for matters touching the community.

### 5.1 Where shūrā binds, where it advises

- **Binds the mutawalli** on: trustee appointments and removals; acceptance
  of major donations; dissolution of Operating or Charitable entities;
  changes to beneficiary programs that materially affect the resident community.
- **Advises the mutawalli** on: lease terms; capital deployment within the
  approved budget; ordinary operating decisions; new Collective experiences.
- **Self-governs** at the resident layer for: daily community life, ta'āruf
  programming, conflict resolution between residents (per
  [moontrance-residency-overview.js:51](../src/data/module-overviews/moontrance-residency-overview.js)).

### 5.2 Cadence

- **Mutawalli shūrā:** quarterly, plus called sessions for material decisions.
- **Resident shūrā:** monthly during residency season; documented decisions
  per [moontrance-residency-overview.js:49](../src/data/module-overviews/moontrance-residency-overview.js).
- **Scholar Council:** convened as needed; standing review at least annually.

### 5.3 Quorum and deadlock (resolved 2026-05-02)

- **Standard quorum:** **2/3 of seated trustees, minimum three present
  regardless of seat count.** "Seated" means currently appointed; vacant
  seats do not count toward the denominator.
- **Trustee-appointment exception:** A vacancy-reduced quorum **cannot**
  be used to make trustee appointment decisions. Trustee appointments
  require a **full-complement or near-full-complement threshold** (deed
  to specify exact figure — recommended: ≥ four of five seated). This
  prevents a minority of seated trustees from appointing sympathetic
  replacements during a vacancy.
- **Fiqh-binding decisions:** Scholar Council liaison must be present.
- **Deadlock resolution:** Referral to the Scholar Council. The Scholar
  Council's recommendation is **binding on fiqh questions** (is this
  permissible?) and **advisory but heavily weighted on non-fiqh
  questions** (which permitted option is better?). The deed must define
  this distinction explicitly so the Scholar Council neither over-reaches
  on operational matters nor under-reaches on shariʿah ones.

### 5.4 Documentation

The documentation requirements below are **scripturally mandated, not
discretionary**, grounded in **Al-Baqarah 2:282** (the longest verse in
the Qur'an): *"O you who have believed, when you contract a debt for a
specified term, write it down. And let a scribe write it between you in
justice... And bring to witness two witnesses from among your men..."*
The prophetic evidentiary standard is: *"Produce your two witnesses or
else the defendant is to take an oath"* (Sahih al-Bukhari Book 48 No. 837).

- All shūrā decisions are documented in writing.
- All inter-entity contracts (the Holdings → Operating lease, designated
  grants from Operating to Charitable, restricted-donation routing,
  qard ḥasan loan agreements) are written and witnessed per 2:282.
- Financial transparency is absolute, per
  [collective-overview.js:106](../src/data/module-overviews/collective-overview.js)
  ("Financial transparency is absolute — every dollar in and out is accountable")
  and [moontrance-residency-overview.js:52](../src/data/module-overviews/moontrance-residency-overview.js)
  ("Financial transparency: all community funds, expenses, and allocations
  are visible to residents").

---

## 6. Legal Entity Architecture (the Tri-Entity Stack)

> **The core proposal.** The Waqf is the covenant; the three legal entities
> are the vehicles. The Waqf instrument sits *above* all three and binds them
> regardless of how Canadian corporate forms evolve.

### 6.1 The three entities

#### a. Holdings Entity (the land-holder)

- **Form:** Ontario corporation or trust, bound by a registered deed
  containing the operative Waqf restrictions. **[lawyer review]** — exact
  Ontario-law wrapper for the inalienability covenant (charitable purpose
  trust, conservation easement-style restriction, or other) is the single
  most important legal-form question.
- **Owns:** Land in fee simple, registered title with the deed restrictions
  recorded against title where possible.
- **Inalienable by design:** Deed restrictions prohibit sale, encumbrance,
  or change-of-use without **both** mutawalli sign-off **and** Scholar
  Council attestation. **[lawyer review]**
- **Operates:** Nothing customer-facing. Holdings does not run the farm,
  does not serve guests, does not earn revenue from programs.
- **Revenue:** Lease income from Operating only.
- **Expenses:** Property tax, capital maintenance of land and structures,
  debt service if any (avoided where possible).
- **Why separate:** Liability isolation (claims against farm operations
  cannot reach the land), tax treatment, and the cleanest possible carrier
  for the Waqf restrictions.

#### b. Operating Entity (farm + Collective programs)

- **Form:** Ontario corporation. **[lawyer review]** — for-profit vs.
  non-share-capital corp depends on tax treatment and whether surplus
  flows to the Waqf instrument or is taxed first.
- **Leases:** Land and tooling from the Holdings entity at a documented,
  arms-length, Sharīʿah-compliant rent. **[scholar review]** — lease
  structure must avoid hīlah and meet ijārah requirements.
- **Runs:** The five Collective experiences (Guided Tour, Family Land Day,
  Seasonal Workshop, plus the two overnight experiences); farm operations;
  events; merchandise.
- **Revenue:** Guest revenue from the five experiences; spot-market
  produce sales once the farm has standing inventory; event fees.
- **Expenses:** Staff payroll, materials, the lease to Holdings, surplus
  reinvestment, grants out to the Charitable entity.
- **Surplus (resolved 2026-05-02 — hybrid floors + annual shūrā):** No
  shareholder distribution. Surplus is directed per the Waqf instrument
  to (a) corpus reinvestment via Holdings, (b) beneficiary programs via
  Charitable, (c) operating reserve. The deed locks **floors**, and
  shūrā sets the actual annual allocation **above** those floors. Floors:
  - **≥ 30%** of Operating surplus to the Charitable entity
  - **≥ 20%** to corpus reinvestment via Holdings
  - **≥ 10%** to operating reserve
  Starting target for shūrā discussion (subject to land-carrying-cost
  data once a parcel is identified): **35% Charitable / 40% corpus / 25%
  reserve**. The deed-level floors protect the beneficiary class against
  slow erosion via incremental annual ratio shifts (a hīlah pattern
  flagged in §7.5); the above-floor flexibility allows shūrā to adapt
  to operational reality.

#### c. Charitable Entity (registered charity / non-profit)

- **Form:** Canadian registered charity or non-profit. **[lawyer review]**
  — federal vs. Ontario registration; preferred class (e.g., advancement
  of religion, advancement of education, relief of poverty, agricultural
  organizations).
- **Receives:** Sadaqah, zakat-eligible donations (where qualifying),
  qard ḥasan (interest-free loans), restricted donations for capital
  improvements, sponsorships designated as charitable, foundation grants.
- **Runs:** Subsidized seats for low-income families across the five
  Collective experiences, beneficiary programs (homeschool immersions,
  youth tarbiyah programs per
  [collective-overview.js:158](../src/data/module-overviews/collective-overview.js)),
  scholarships for residency.
- **Issues:** Tax receipts where applicable.
- **Cannot:** Own the land. Run the for-revenue programs directly. Receive
  Operating's main revenue line — only designated grants from Operating's
  surplus.

### 6.2 Inter-entity flows

```
                          ┌──────────────────────┐
                          │   Waqf Instrument    │
                          │  (covenant + deed)   │
                          └──────────┬───────────┘
                                     │ binds
            ┌────────────────────────┼────────────────────────┐
            ▼                        ▼                        ▼
   ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
   │   Holdings      │      │   Operating     │      │   Charitable    │
   │   (land + Waqf  │      │   (farm + 5     │      │   (donations,   │
   │    restrictions)│      │    experiences) │      │    subsidized   │
   │                 │      │                 │      │    programs)    │
   └────────┬────────┘      └────────┬────────┘      └────────┬────────┘
            │  lease (arms-length)     │                       │
            │ ◄────────────────────────┤                       │
            │                          │   grants (designated  │
            │                          │   surplus)            │
            │                          ├──────────────────────►│
            │                          │                       │
            │  restricted donations    │                       │
            │  for capital improvements│                       │
            │ ◄────────────────────────┼───────────────────────┤
            │                          │                       │
                                       │   guest revenue       │
                                       │ ◄─── (from public)    │
                                                               │
                                                  donations    │
                                                  qard ḥasan  ─┤
                                                  sponsorship  │
                                                               │
```

| Flow | From | To | Purpose | Governance |
|---|---|---|---|---|
| Lease | Operating | Holdings | Land use rent | Set by mutawalli + Scholar Council |
| Designated grant | Operating | Charitable | Fund subsidized seats / beneficiary programs | Annual shūrā decision |
| Restricted donation routing | Charitable | Holdings | Capital improvements to land (e.g., masjid, water systems) | Per donor restriction + mutawalli |
| Guest revenue | Public | Operating | Fees for the five experiences | Operational |
| Donation | Public | Charitable | General or designated charitable giving | Per Charitable's program plan |
| Qard ḥasan | Capital partner | Holdings, Operating, or Charitable | Interest-free loan, repayable per documented schedule | Mutawalli + Scholar Council attest non-hīlah |

### 6.3 Why three, not one

| Reason | Explanation |
|---|---|
| **Liability isolation** | Claims arising from farm operations or guest accidents do not reach the land. |
| **Tax treatment** | Charity status only attaches to the Charitable entity; Operating bears its own tax position; Holdings bears land-related treatment only. |
| **Donor confidence** | Donors give to a registered charity, not to a for-profit operator. |
| **Riba/gharar containment** | Each entity has a narrow, declared purpose; financing instruments (if any) attach only where they can be made compliant. |
| **Clean unwinding paths** | If any single entity fails, the Waqf instrument and the other two entities survive. The corpus is protected even in worst-case operational failure. |

### 6.4 Permitted capital channels (CSRA model erased 2026-05-04)

A prior draft of this doc treated **Community-Supported Regenerative
Agriculture (CSRA)** as a primary capital channel and attempted to
structure participant contributions as **salam** advance-purchase.
That model has been **erased entirely**, both pre- and post-acquisition,
on the following fiqh ground:

> Islam does not permit the sale of what one does not yet possess
> (*bayʿ mā laysa ʿindak*).

The classical exception is salam, which the Prophet ﷺ permitted under
strict conditions (Sahih al-Bukhari Book 35 Nos. 443 & 445). But salam
requires a counterparty *capable of delivering* at maturity. The
pre-land MTC has no land, no farm, no Operating entity, and no
productive corpus — so no salam contract may be entered before
acquisition. And even post-acquisition, MTC will **not** offer
salam-style advance-purchase as a public capital channel, on the
broader principle that the corpus is dedicated to the beneficiary
class rather than to capital partners.

**Permitted capital channels:**

| Channel | Goes to | Form | Notes |
|---|---|---|---|
| Charitable donation (unrestricted) | Charitable | Gift; no return | Tax receipt where applicable |
| Restricted donation | Charitable → Holdings or Operating | Gift restricted to a named use | Tax receipt; charity-law routing |
| Qard ḥasan (interest-free loan) | Holdings, Operating, or Charitable | Loan repayable on schedule; no interest, no profit-share, no equity conversion | Scholar Council attestation that structure is not a hīlah for riba |
| In-kind contribution | Operating or Charitable | Labor, materials, expertise at no fee | Documented at fair-market value for transparency |
| Sponsorship of a beneficiary's program | Charitable | Restricted gift naming a beneficiary or class | Charitable purpose; tax receipt |

**Prohibited capital channels:**

- Equity, shares, units, or membership interest in any for-profit form.
- Salam advance-purchase, share-of-harvest pre-sale, "CSRA pre-sale,"
  or any instrument that conveys ownership of unharvested produce or
  unrealized yield.
- Any debt instrument bearing interest, late-fee structures that
  function as interest, or any synthetic riba arrangement.
- Profit-share, mushārakah-as-investment, or any return-on-capital
  structured as a private benefit.

**Future post-acquisition channel (deferred — not part of this design).**
Once the corpus exists and the Operating entity has standing programs,
a *membership* relationship may be offered in which entitlement to a
percentage of the actual yield is one of the **benefits of belonging**,
not a return on advance-purchase or capital contribution. This is a
fundamentally different structure from CSRA and must be designed and
attested afresh by the Scholar Council when the time comes. It is
explicitly **not** part of this doc, and any draft language found in
older revisions should be considered superseded. **[scholar review]**

### 6.5 Why a Waqf frame above all three

The legal entities are vehicles. The Waqf instrument is the covenant.
Even if Canadian charity rules change, even if corporate forms evolve, even
if a future board attempts mission drift — the Waqf instrument **holds the
beneficiary class, the inalienability of the corpus, and the stewardship
obligations** as covenantal commitments above the legal layer.

This is the structural expression of the principle stated in
[wiki/concepts/covenant-architecture.md:29](../wiki/concepts/covenant-architecture.md):
the Waqf structure applies covenant architecture to governance — community
resources are held in trust under Islamic endowment principles rather than
conventional ownership models.

**[scholar review] [lawyer review]** — this entire section is the doc's
heaviest review surface. The wedding of an Ontario-recognized legal form
with the Islamic Waqf framework is the load-bearing innovation. It must
be checked end-to-end.

---

## 7. Asset & Capital Posture

### 7.1 At founding (capital injection)

- **Land:** Acquired by OGDEN or by the Holdings entity directly, then
  endowed into the Waqf via the deed at acquisition. **[lawyer review]** —
  whether the wāqif transfers title at acquisition or after development
  affects tax and legal treatment.
- **Initial operating capital:** Likely OGDEN-provided, structured as
  founding endowment to the Charitable entity (deductible) and / or
  capitalization of Operating as a non-distributing corporation.
  **[lawyer review]**

### 7.2 Capital partner contributions — see §6.4

- Never equity in Holdings, Operating, or Charitable.
- Never advance-purchase, salam pre-sale, or share-of-harvest.
- Permitted forms only: charitable donation, restricted donation
  routed via Charitable, qard ḥasan, in-kind, sponsorship.

### 7.3 Debt and financing

- **Default posture: avoid debt.** The Waqf instrument should prohibit any
  riba-bearing debt at the Holdings level. **[scholar review]**
- **If financing is unavoidable:** Murābaḥah, ijārah, mushārakah, or
  diminishing mushārakah structures only, attested by the Scholar Council
  before execution. **[scholar review]**
- **Equity sales of Holdings: structurally prohibited** by the Waqf
  instrument and by deed restrictions on title.

### 7.4 Surplus treatment

- Operating surplus (after the lease, payroll, materials, reserves) is
  directed per the Waqf instrument to: (a) corpus reinvestment via Holdings,
  (b) beneficiary programs via the Charitable entity, (c) operating reserve.
- **Hybrid floors + annual shūrā (resolved 2026-05-02 — see §6.1c for
  details):** deed-locked floors of ≥30% Charitable / ≥20% corpus / ≥10%
  reserve; shūrā sets the actual allocation above those floors annually.
- No surplus is distributed to any individual.

### 7.5 Riba, gharar, and hīlah guardrails at every flow

- **Lease (Holdings → Operating):** must meet ijārah requirements. **[scholar review]**
- **Grants (Operating → Charitable):** unilateral, no exchange; not a
  riba-bearing instrument.
- **Restricted donation routing (Charitable → Holdings):** governed by
  donor restriction + charity-law constraints.
- **Advance-purchase / salam / pre-sale: prohibited** as a public
  capital channel per §6.4 (CSRA model erased 2026-05-04 on
  *bayʿ mā laysa ʿindak* grounds). The salam scriptural framework
  (Sahih al-Bukhari Book 35 Nos. 443 & 445) is preserved in the
  companion grounding doc as reference material, not as an active
  MTC capital structure.

**Riba — extended accountability.** The prohibition on riba (Al-Baqarah
2:275–279) is reinforced by the prophetic curse on every party in the
chain: *"the accepter of interest and its payer, and one who records it,
and the two witnesses — they are all equal"* (Sahih Muslim Book 10
No. 3881). This means accountability for any riba-bearing instrument
extends to every director, scribe, and witness who facilitates it — not
only the principal counterparties. Any financing instrument used by
Holdings or Operating must be attested by the Scholar Council *before*
execution; signing or recording an unattested instrument is itself a
breach of amānah for the signatory.

**Anti-hīlah review.** The Qur'an condemns the Sabbath-breakers who used
a legal workaround to violate the spirit of divine restriction
(Al-Aʿrāf 7:163–166, Al-Baqarah 2:65 — *"Be apes, despised"*). The Prophet ﷺ
extended this warning: *"May Allāh curse the Jews, for Allāh made the fat
of animals illegal for them, yet they melted the fat and sold it and ate
its price"* (Sahih al-Bukhari Book 34 No. 438; Sahih Muslim Book 10 No. 3840).

The tri-entity stack must not become a hīlah for evading the Waqf
restrictions. Specific failure patterns to guard against:

- Operating routinely runs at "loss" so surplus never reaches Charitable.
- Lease rent is set artificially low to drain Holdings, or artificially
  high to extract value from Operating to a related party.
- "Donations" are structured to return de facto benefit to OGDEN or to
  named individuals.
- Inter-entity transactions concentrate benefit toward founders rather
  than the named beneficiary class.

**The Scholar Council shall conduct an annual anti-hīlah review of all
inter-entity transactions** to verify that no legal form is being used to
evade the spirit of the Waqf instrument. The review is documented in the
mutawalli's annual stewardship report. **[scholar review]**

---

## 8. Relationship to OGDEN

### 8.1 Possible roles OGDEN plays

OGDEN is the parent platform within which MTC, OLOS, BBOS, and MILOS sit
(per [website/mtc/index.html:192–199](../website/mtc/index.html)). With
respect to the Waqf and the three entities, OGDEN can occupy one or more
of the following roles:

| Role | What it means |
|---|---|
| **Wāqif** | The founder of the Waqf — the party that endows the land and articulates the instrument |
| **Initial trustee** | Sits on the mutawalli at founding (with phased reduction as independent trustees are appointed) |
| **Tooling licensor** | Licenses OLOS / MILOS / Atlas to the Operating entity for use in MTC operations |
| **Donor** | Gives to the Charitable entity |
| **Operating partner** | Provides services (technology, design, management) to the Operating entity |

**Resolved (2026-05-02):** OGDEN occupies **wāqif + initial trustee +
tooling licensor**, transitioning to **tooling licensor only** as
independent trustees are seated. **"Operating partner" is off the
confirmed list** — if OGDEN ever provides paid services to the Operating
entity, that is a separate arms-length transaction subject to fair-market
pricing and Scholar Council review (§7.5 anti-hīlah and ijārah review).

**Deed-bound transition trigger (required).** Classical fiqh permits the
wāqif to appoint themselves as mutawalli, but during the period in which
OGDEN is *both* wāqif and a trustee majority, OGDEN effectively controls
the very Waqf it endowed. The transition out of that window must be
**deed-bound, not intention-bound**, or the anti-hīlah concern in §7.5
becomes a live structural risk. The deed must therefore name an explicit
trigger — recommended language:

> *"OGDEN's trustee seats reduce to zero no later than [X years] after
> seating of the third independent trustee."*

The exact value of [X years] is for Scholar Council and counsel input;
the *existence* of a hard trigger clause is non-negotiable.
**[scholar review] [lawyer review]**

### 8.2 Tooling license

- OLOS, MILOS, and Atlas are OGDEN-owned tools.
- Recommended structure: a perpetual, royalty-free license to the Operating
  entity for use in MTC, with the Waqf instrument naming the Operating
  entity as licensee. **[lawyer review]**
- This protects MTC from being held hostage if OGDEN's commercial direction
  changes, while keeping IP ownership clean.

### 8.3 Boundary

Once the Waqf is established and the three entities are stood up, OGDEN
**does not** control the land, **does not** dictate operations, **does not**
direct beneficiary selection. OGDEN's residual relationship is through:

- Whatever trustee seats it retains (subject to the rotation/term schedule).
- The tooling license.
- Voluntary ongoing donations to the Charitable entity, if any.

This separation is required by the principle that the Waqf "is designed to
outlast its founders — governance survives generational transition"
([collective-overview.js:104](../src/data/module-overviews/collective-overview.js)).

---

## 9. Lifecycle

### 9.1 Pre-land (now)

- **State:** Vision complete (per [website/mtc/index.html:251](../website/mtc/index.html)),
  land search active in GTA / Halton.
- **What this doc enables:** It can be circulated to scholar(s) and counsel
  to refine the structure *before* land is acquired, so the deed of waqf
  is ready at closing.
- **Founding members:** Make commitments to the not-yet-existing community;
  Charitable entity (if registered first) can receive their early support.

### 9.2 At land acquisition

- **Sequence:**
  1. Holdings entity formed and capitalized.
  2. Land purchased by Holdings.
  3. Deed of waqf executed; title restrictions recorded.
  4. Operating entity formed.
  5. Charitable entity formed and registered (if not already).
  6. Lease executed (Holdings → Operating).
  7. Mutawalli formally seated.
  8. Scholar Council named.

- **[lawyer review]** — sequence and timing affect tax treatment; counsel
  may advise reordering.

### 9.3 Steady state

- **Annual reporting:** Holdings, Operating, and Charitable each publish
  annual financials. Mutawalli publishes an annual stewardship report
  including beneficiary statistics, program outcomes, and any deviations
  from prior shūrā decisions.
- **Beneficiary review:** Annually, the mutawalli reviews whether the
  beneficiary class is being served as intended.
- **Shūrā cadence:** Per §5.2.

### 9.4 Succession

- **Trustee replacement:** Per §4.1.
- **Operating entity wind-down:** If the Operating entity becomes unviable,
  it is wound down; the Charitable entity may absorb beneficiary programs;
  Holdings remains intact. The Waqf does not dissolve.
- **Charitable entity wind-down:** If revoked or wound down, charitable
  assets go to a like-purposed Muslim charity per Canadian charity law.
  The Waqf does not dissolve.
- **Worst case (no operator):** Holdings remains; the mutawalli + Scholar
  Council convene to either (a) seek a successor operator, or (b) place
  the land under conservation stewardship until an operator is found.
  The land cannot revert to private ownership.

---

## 10. Open Questions for Scholar / Lawyer Review

Consolidated from `[open question]`, `[scholar review]`, and `[lawyer review]`
tags above. The Qur'an + Sahihayn grounding for items already settled is in
the companion doc
[scholar-review-mtc-waqf-governance-grounding-review.md](scholar-review-mtc-waqf-governance-grounding-review.md);
the items below are those that corpus *cannot* substantively resolve and
that require live scholar / lawyer / user decision.

### 10.1 For the Scholar Council

- Madhhab posture on the operative definition of Waqf used in §2.
- Cash-waqf vs. land-only waqf for the Charitable entity's capital pool.
- Lease structure (Holdings → Operating): ijārah-compliance specifics.
- Permissibility of any future post-acquisition membership-benefit
  yield-share design (deferred from this doc; raise when MTC has corpus).
- Any financing instrument used by Holdings or Operating: murābaḥah / ijārah / mushārakah requirements.
- Trustee removal procedure: shariʿah-compliant grounds and process.
- Whether founding members can be both wāqif-adjacent and beneficiaries.

### 10.2 For legal counsel

- Ontario-law wrapper for the Waqf instrument: charitable purpose trust?
  Conservation easement? Bespoke deed restriction? The single biggest
  legal-form question.
- Form of Holdings: corporation or trust.
- Form of Operating: for-profit corp or non-share-capital corp.
- Form of Charitable: federal vs. Ontario registration; charitable class.
- Sequence of formation and land acquisition for tax treatment.
- Registrability of deed restrictions against title in Ontario.
- Treatment of guest revenue and overnight stays for tax / charity rules.
- Inter-entity transfer pricing (lease, grants) for CRA scrutiny.

### 10.3 Yousef-level decisions — RESOLVED 2026-05-02

The following items were resolved on 2026-05-02 and folded into the body
sections cited. See the "Decisions Resolved" block at the top of this
document for the consolidated summary.

- ✅ OGDEN's role(s) per §8.1 — wāqif + initial trustee + tooling licensor
  with deed-bound transition trigger.
- ✅ Mutawalli composition and term limits per §4.1 — five trustees,
  three-year staggered terms, renewable once, mandatory rotation with
  one-term cooling-off; provisional resident voice held by founding-member
  designate pre-residency.
- ✅ Surplus split per §6.1c / §7.4 — hybrid floors (≥30% Charitable /
  ≥20% corpus / ≥10% reserve), shūrā-set actuals above floors.
- ✅ Quorum and deadlock per §5.3 — 2/3 of seated (min 3); appointments
  require near-full-complement; Scholar Council binding on fiqh, weighted
  on non-fiqh.
- ✅ Founding-member vs. resident per §3 — distinct tracks with gated
  pathway.
- ✅ **CSRA model erased 2026-05-04** (§6.4) — entire
  Community-Supported Regenerative Agriculture / advance-purchase /
  salam structure removed on *bayʿ mā laysa ʿindak* grounds. Capital
  channels restricted to charitable donation, restricted donation,
  qard ḥasan, in-kind, sponsorship. Future post-acquisition
  membership-benefit yield-share is deferred and out of scope.
- ✅ Tri-entity vs. single-entity scope per §6 — tri-entity confirmed;
  single-entity rejected on liability-isolation grounds (§6.3).
- ⏳ **Charitable entity registration timing — default decided, counsel
  override pending.** Default position: **register before land
  acquisition** with a documented operational plan ready at filing
  (the planning doc and Scholar Council engagement themselves constitute
  early charitable activity). Counsel may override on CRA-scrutiny grounds
  — this question must be the first item raised when Ontario charity
  counsel is engaged. **[lawyer review]**

---

## 11. Appendix

### 11.1 MILOS seed-task literacy paths

The same Waqf concept formalized at the org level in this doc is taught
to MILOS users at the personal level in seed tasks. A user working through
their own Waqf journey on MILOS is being prepared to understand and steward
MTC's Waqf at the org level. Cross-references:

- **Faith → zakah → Excellence** — fiqh of waqf, research existing platforms,
  contribute to or establish a small waqf
  ([src/data/seed-tasks/faith-seed-tasks.js](../src/data/seed-tasks/faith-seed-tasks.js))
- **Wealth → ownership → Excellence** — complete waqf-establishment sequence:
  study fiqh, identify assets, define beneficiaries, engage lawyer, appoint
  mutawalli, register deed
  ([src/data/seed-tasks/wealth-seed-tasks.js](../src/data/seed-tasks/wealth-seed-tasks.js))
- **Wealth → circulation → Excellence** — dedicate capital, scholar review,
  legal standing, launch, designate ≤1/3 via wasiyyah / waqf
  ([src/data/seed-tasks/wealth-seed-tasks.js](../src/data/seed-tasks/wealth-seed-tasks.js))
- **Family → kinship → Excellence** — waqf deed with beneficiaries, governance,
  trustee succession; dedicate to deceased family
  ([src/data/seed-tasks/family-seed-tasks.js](../src/data/seed-tasks/family-seed-tasks.js))
- **Ummah → collective → Growth** — explore establishing a community waqf
  for long-term sustainability
  ([src/data/seed-tasks/ummah-seed-tasks.js](../src/data/seed-tasks/ummah-seed-tasks.js))

### 11.2 Glossary

| Term | Arabic | Meaning in this doc |
|---|---|---|
| Waqf | وَقْف | Islamic endowment; the covenant binding the corpus to a beneficiary purpose in perpetuity |
| Wāqif | وَاقِف | The founder who endows the corpus |
| Mawqūf | مَوْقُوف | The endowed asset itself |
| Mawqūf ʿalayhi | مَوْقُوف عَلَيْهِ | The beneficiary class |
| Mutawalli | مُتَوَلِّي | Trustee / administrator stewarding the Waqf |
| Nāẓir | نَاظِر | Overseer; in some structures synonymous with mutawalli |
| Sighah | صِيغَة | The formula / language of the waqf declaration |
| Manfaʿah | مَنْفَعَة | The usufruct / benefit deployed to beneficiaries |
| Amānah | أَمَانَة | Trust; the obligation borne by stewards |
| Khalīfah | خَلِيفَة | Steward / vicegerent of the earth |
| Shūrā | شُورَى | Consultation; the binding governance principle |
| Ijārah | إِجَارَة | Lease; the structure governing Holdings → Operating |
| Murābaḥah | مُرَابَحَة | Cost-plus financing; one Sharīʿah-compliant alternative to riba-bearing debt |
| Mushārakah | مُشَارَكَة | Partnership-based financing |
| Salam | سَلَم | Forward sale under prophetic conditions; preserved in this glossary as scriptural reference, **not** an active MTC capital structure (CSRA model erased 2026-05-04) |
| Bayʿ mā laysa ʿindak | بَيْع مَا لَيْسَ عِنْدَك | The prohibited sale of what one does not yet possess; the basis for the CSRA erasure |
| Sadaqah jāriyah | صَدَقَة جَارِيَة | Ongoing charity; the spiritual fruit of a Waqf |

### 11.3 On approval, follow-up wiki artifacts

Per the approved plan, on user approval of this design:

- Create `wiki/entities/mtc-waqf.md` — entity page for the Waqf governance body.
- Create `wiki/decisions/2026-MM-DD-mtc-waqf-structure.md` — ADR locking the
  tri-entity choice and the Waqf framing above.

These follow approval and are out of scope for this session.

---

## Status

**review** — internal user decisions resolved 2026-05-02 and folded into
the body. The doc is now ready to be presented to (a) a fiqh-competent
scholar for the remaining `[scholar review]` items and (b) Ontario
charity / trust / agricultural-land counsel for the remaining
`[lawyer review]` items. On those external reviews returning, the doc
can be promoted to `approved` and the wiki follow-ups
(`wiki/entities/mtc-waqf.md` + dated ADR) created.
