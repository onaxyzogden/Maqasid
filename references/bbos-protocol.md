# BBOS Protocol — Canonical Reference (v2.4)

Barakah Business Operating System: a covenant-grounded 9-stage pipeline for cultivating halal businesses through Two-Factory production, Assembly Gating, and stage-scoped divine attribute framing.

**Authoritative sources (in order of precedence):**
1. `src/data/bbos/bbos-pipeline.js` — stage canon, layers, patch sub-stages
2. `src/data/bbos/bbos-stage-islamic.js` — divine attributes, du'a, readiness, reflection per stage
3. `src/data/bbos/bbos-task-definitions.js` — 113 task definitions across the pipeline
4. `src/data/bbos/bbos-role-access.js` — role-task access matrix
5. `wiki/entities/bbos-pipeline.md` — narrative rationale

If this doc disagrees with code, the code wins. Update this doc.

---

## The 9 Stages

| # | ID  | Label       | Layer   | Divine Attributes        | Purpose |
|---|-----|-------------|---------|--------------------------|---------|
| 0 | IDY | Identity    | Think   | Al-Awwal · Al-Badi       | Establish the foundational identity, mission, and values. |
| 1 | CRD | Credibility | Think   | Al-Mu'min · Al-Wakil     | Build credibility and trust infrastructure for the offering. |
| 2 | STR | Structure   | Think   | Al-Musawwir · Al-Mudabbir| Design operational structure, processes, and team architecture. |
| 3 | OFR | Offering    | Think   | Ar-Razzaq · Al-Karim     | Define and price the service offering with clarity and integrity. |
| 4 | OUT | Reach       | Execute | Al-Hadi · An-Nur         | Reach the right people through ethical, purposeful outreach. |
| 5 | SLS | Convert     | Execute | As-Sami · Al-Basir       | Convert interest into commitment through honest, consultative selling. |
| 6 | DEL | Deliver     | Execute | Al-Muhsin · Al-Latif     | Deliver the promised outcome with excellence and care. |
| 7 | RET | Retain      | Execute | Al-Wadud · Al-Hafiz      | Retain clients through ongoing value, relationship, and stewardship. |
| 8 | OPT | Reckon      | Reckon  | Al-Hasib · Al-Khabir     | Reckon with outcomes, optimize systems, prepare next cycle. |

Stage IDs are immutable — they are persisted in task records and referenced across code, marketing, and wiki. **Never rename a stage code without a coordinated migration.**

---

## Three Layers

The 9 stages collapse into 3 layers used by `LevelNavigator` and the marketing site:

| Layer   | Stages                | Theme                                                      |
|---------|------------------------|------------------------------------------------------------|
| Think   | IDY, CRD, STR, OFR     | Strategic Groundwork — lay identity, trust, structure, offer. |
| Execute | OUT, SLS, DEL, RET     | Offering to Market — outreach, sales, delivery, retention. |
| Reckon  | OPT                    | Reckoning — assess, strengthen, optimize for next cycle.   |

Layer keys are `'think' | 'execute' | 'reckon'` (lowercase). See `BBOS_LAYERS` and `BBOS_NAV_LEVELS` in `bbos-pipeline.js`.

---

## Two-Factory Architecture

Within each stage, tasks split into two production factories:

**Research Factory** (must clear first)
- `S` — Scout (data gathering)
- `V` — Verify (proof, audit, validation)
- `FP` — Field Probe (operator-on-ground evidence)

**Asset Factory** (gated by Research)
- `A` — Asset (artifact production)
- `AF` — Asset Finalize (review, polish)
- `IC` — Integrity Check (G-Label assignment, signoff)

Task IDs encode this: `IDY-S1`, `CRD-V2`, `STR-A1`, `OFR-IC1`, etc. Task prefix determines which factory it belongs to. See `src/components/bbos/BbosFullDashboard.jsx` for `STAGE_SCORE_SIGNALS` and the prefix → factory map.

### Assembly Gate

For each stage, **all Research-factory tasks must reach `Done` before Asset-factory tasks unlock for editing.** This is the Assembly Gate. UI at [BbosFullDashboard.jsx:1782](../src/components/bbos/BbosFullDashboard.jsx) renders gate state as `LOCKED | OPEN | N/A`. If the active role has zero Research-task visibility, the gate is treated as N/A (cleared).

---

## Patch Sub-Stages (v2.4)

Two non-numbered checkpoints inserted between primary stages:

| ID  | Label                  | After Stage | Function |
|-----|------------------------|-------------|----------|
| 00A | Input Integrity Gate   | IDY         | Grades operator proof on a P0–P3 scale before pipeline entry. |
| 01B | Mechanism Factory      | STR         | Bridges the strategy-to-offer gap; ensures STR outputs translate cleanly into OFR inputs. |

Patch sub-stages currently have no dedicated task definitions — they render as derived status from their parent stage's tasks. See `BBOS_PATCH_STAGES` in `bbos-pipeline.js`.

---

## Amanah Proof Audit

Anchored at **Stage 02 CRD (Credibility)**. Every claim, testimonial, and credential surfaced in the pipeline must be independently verifiable before it can be promoted into outreach (OUT) or sales (SLS) artifacts. CRD tasks `CRD-V1` and `CRD-V2` operationalize Al-Mu'min · Al-Wakil — the audit is theological, not procedural. See `bbos-stage-islamic.js` `CRD.readiness` rows for the governing-vs-not-yet readiness model.

Cross-reference: [wiki/concepts/amanah-gate.md](../wiki/concepts/amanah-gate.md), [wiki/decisions/2026-04-14-amanah-gate-protocol.md](../wiki/decisions/2026-04-14-amanah-gate-protocol.md).

---

## G-Label Tier Semantics

Each shippable artifact carries a G-Label assigned by the IC (Integrity Check) task at end-of-stage. Tiers:

| Tier | Meaning |
|------|---------|
| G1   | Operator-attested only. Lowest evidence weight; usable for internal work. |
| G2   | Independently verifiable claim with at least one Bayyinah-class source. |
| G3   | Multiple Bayyinah sources or one Qarina (circumstantial) corroboration with Niyyah (intentional disclosure) statement. |
| G4   | Audit-grade — multi-source, externally reviewable, suitable for regulated or public-facing claims. |

### Universal Amanah Gate Evidence Tiers

The cross-module canon (used by BBOS, OLOS, MTC):
- **Bayyinah** — direct, primary evidence (document, recording, signed statement).
- **Qarina** — circumstantial corroboration (pattern, indirect proof).
- **Niyyah** — declared intent statement from the operator.

A claim's G-Label is the highest tier its evidence stack supports. See [wiki/concepts/amanah-gate.md](../wiki/concepts/amanah-gate.md).

---

## Task Field Schema

Every task carries:
- `bbosTaskType` — e.g., `'IDY-S1'`, `'CRD-V1'`, links to definition in `bbos-task-definitions.js`
- `bbosFieldData` — object mapping field IDs to user-entered values
- `gLabel` — assigned tier (G1–G4) at IC stage
- `_aiDraftStatus` — `'none' | 'pending' | 'accepted' | 'rejected'`

Stage-level theological framing (governing attributes, du'a, readiness, reflection) is **stage-scoped, not per-task** — it lives in `bbos-stage-islamic.js` and is pulled into the task panel via `getBbosStageIslamic(taskDef.stage)`. Task definitions do **not** carry per-task `governingAttributes` or `attrMeaning` fields. (This was changed 2026-04-25 — see lessons.)

---

## Role Access

Roles defined in `bbos-role-access.js`. Per-task access levels:
- `'V'` — view-only
- `'E'` — editable
- `'-'` — hidden (task does not appear for this role)

When a role has zero edit-or-view tasks in the Research factory for a given stage, the Assembly Gate is treated as N/A for that role.

---

## AI Draft Generation

Implemented via `streamCompletion` in `src/services/ai/ai-client.js`. Prompts are assembled by `src/services/ai/prompt-builder.js`, which pulls stage-scoped Islamic framing from `getBbosStageIslamic` and combines it with the task definition's purpose, fields, and instructions. Provider configuration lives in `src/services/ai/ai-settings.js` and is user-editable in the AI Settings panel.

---

## Verification Checklist (when modifying BBOS canon)

Before merging any change that touches stage IDs, attributes, or task definitions:

1. `grep -n` for every retired identifier across `src/`, `website/`, and `wiki/`.
2. Build clean: `npm run build`.
3. Lint clean: `npm run lint`.
4. Update this file if the change affects the canon.
5. Update `wiki/entities/bbos-pipeline.md` for narrative rationale.
6. Add a `wiki/decisions/YYYY-MM-DD-<slug>.md` entry if architectural.

---

**Last reviewed:** 2026-04-25 (pre-live-test audit)
**Maintainer:** Claude Code (via session-end wiki update workflow)
