---
title: "Threshold Popup Content — Phased Repair"
type: decision
date: 2026-04-16
status: active
---

# Threshold Popup Content — Phased Repair

## Context

Audit of Threshold popup modules (`ThresholdModal.jsx`) against the full `MODULES` registry revealed extensive content gaps across `MODULE_ATTRS`, `UNIVERSAL_EQUIV`, and both `PAUSE_QUESTIONS` tables. Of 42 modules: only 5 had complete content on both values layers; 11 were fully broken on Islamic layer; 36 silently defaulted to the `work` pause question when users triggered a pause.

Root causes:
- Sub-modules rely on pillar-level fallback, but several pillars (`ummah`, `family`) had no entry in `MODULE_ATTRS`; and `UNIVERSAL_EQUIV` had no pillar entries at all.
- Pause question lookups had no pillar fallback — only exact-moduleId match, then default to `work`.
- `people` key was defined three times in `MODULE_ATTRS`; the pillar-level duplicate silently overwrote the module-level block, killing the business/leadership framing.
- `crm` had full content blocks but no module consumer (CRM functionality lives under People → Sales Pipeline tab; the standalone CRM page was unrouted).

## Decision

Phased repair over three passes:

- **Phase 0 (done 2026-04-16):** Code-path fixes only, no new content. Added pillar fallback to pause-question lookups. Renamed the duplicate `people` block at former line 1105 to `ummah`, reviving the dead module-level `people` block and filling the Ummah pillar gap as a free side effect. Deleted orphan `crm` blocks and unrouted `CRM.jsx`/`CRM.css`.
- **Phase 1 (in progress):** Author per-sub-module Islamic content pillar by pillar. Each sub-module gets unique dua, attrs, readiness rows, closingDua, reflection rows.
  - Family ✓ (commit `fd8a0e8`, 5 sub-modules + pillar)
  - Faith ✓ (commit `e72ebc5`, 9 sub-modules including tier-specific faith-core/growth/excellence)
  - Life ✓ (commit `443e02c`, 4 sub-modules)
  - Intellect ✓ (commit `6979374`, 4 sub-modules)
  - Wealth ✓ (commit `887f944`, 4 Maqasid sub-modules; legacy work/money/people/office/tech retained from top-of-file blocks)
  - Environment ✓ (commit `1372038`, 4 sub-modules)
  - Ummah ✓ (5 new sub-module blocks — `neighbors`, `community`, `moontrance-land`, `moontrance-seasonal`, `moontrance-residency`. Pillar block untouched. `collective` was already authored pre-Phase 1 and left in place.)
- **Phase 1 closed.** All seven pillars have per-sub-module Islamic-layer content or legitimate pillar fallback.
- **Phase 2 (done 2026-04-16):** Mirror Phase 1 for the universal layer. Added pillar fallback inside `getModuleData(id, 'universal')` matching the Phase 0 pause-question pattern (exact id → `getPillarForModule(id).id` → null). Authored 6 new secular-ethics pillar entries in `UNIVERSAL_EQUIV`: `faith` (Integrity/Meaning), `life` (Sustainability/Rest), `intellect` (Rigor/Humility), `wealth` (Stewardship/Sufficiency — distinct from legacy `money` entry), `environment` (Trusteeship/Foresight), `ummah` (Presence/Contribution). Each mirrors the full `UNIVERSAL_EQUIV.work` shape: principles[2], three mindfulness strings, readiness with frame/labels/6 rows/governing[6]/notYet[6], reflection with governing[2]/notYet[2]. Zero Islamic terminology — this is the layer for operators who opt out of Islamic framing.
- **Family anomaly resolved — option (a).** The pre-existing `UNIVERSAL_EQUIV.family` entry carried Islamic-style content in the universal layer (Al-Wadud/Al-Qayyum attrs, Arabic dua from Al-Furqan 25:74, closingDua from Al-Ahqaf 46:15, 3-string flat readiness rows). This was inconsistent with the layer's purpose — an operator opting out of Islamic framing would still see Arabic/Qur'an in Family ceremonies. Reshaped to secular pattern (Presence/Mercy principles, full `work`-shape) with user approval this session. Islamic Family content remains fully available via `MODULE_ATTRS.family` (Phase 1, commit `fd8a0e8`); nothing is lost.
- **Phase 2 closed.** Universal layer now has pillar fallback + complete coverage for all seven pillars plus the 5 legacy feature entries (work/money/people/office/tech).

## Rationale

- Per-sub-module content (vs. pillar fallback) was chosen for depth — operator engaging Salah deserves Salah-specific framing, not generic faith framing.
- `faith-core/growth/excellence` are outside the `faith` pillar's `subModuleIds` on purpose: they warrant Daruriyyat/Hajiyyat/Tahsiniyyat-specific content rather than pillar fallback.
- `crm` content deleted rather than kept dormant — orphan data rots; fresh authoring beats resurrecting stale text if CRM re-emerges as a module.

## Consequences

- Phase 0 established the infrastructure that Phases 1 and 2 populate without further code changes.
- Ummah pillar already has valid content (recovered from the `people` duplicate), so Phase 1 Ummah session is lighter.
- During Phase 1, `faith-core/growth/excellence` remain visibly broken on ceremony open until the Faith session ships.

## References

- Plan: `C:\Users\MY OWN AXIS\.claude\plans\there-s-a-number-of-mellow-emerson.md`
- Files touched: `src/data/islamic/islamic-data.js`, `src/components/islamic/ThresholdModal.jsx`, deleted `src/pages/modules/CRM.jsx` and `CRM.css`
