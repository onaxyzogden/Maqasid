---
title: "Steward Data Model (OLOS)"
type: concept
project: olos
updated: 2026-06-14

---

# Steward Data Model

How OLOS/atlas represents "a steward" — the people who hold and work the land —
and the 2026-06-14 consolidation that linked the scattered capture surfaces back
to one canonical identity.

> This page was reconstructed 2026-06-14 after the original (untracked) copy was
> swept by worktree/clean churn in the parent repo. It records the model as built
> through Option 3.

## The two-part canonical model

A steward is the **join of two records keyed by member `userId`**:

| Layer | Store | Shape | Persistence |
|---|---|---|---|
| Identity | `memberStore` | `ProjectMemberRecord` — `userId`, `email`, `displayName`, `role` | **server-synced** |
| Overlay | `visionStore.stewardProfiles[userId]` | `StewardProfile` — all fields optional | **client-only IndexedDB** (`ogden-vision`) |

The join is `useStewardRoster(projectId)` → `StewardRosterEntry { member, profile }`.
`entry.profile` is the **whole** `StewardProfile` (no field whitelist), so any field
added to the overlay rides the roster read model for free.

`ProjectRole` is a closed 8-value enum:
`owner | designer | reviewer | viewer | primary_steward | team_member | contractor | landowner`.
**`'steward'` is NOT a valid role** — the steward role is `'primary_steward'`. (Test
fixtures that used `'steward'` were tsc defects; corrected 2026-06-14.)

## StewardProfile fields counted toward completeness

`STEWARD_FIELDS` in `v3/observe/modules/human-context/derivations.ts` — **9 fields**
(identity/name lives on the member record, not counted here):

`relationship`, `age`, `occupation`, `lifestyle`, `maintenanceHrsInitial`,
`maintenanceHrsOngoing`, `budget`, `skills`, **`needs`** (joined 2026-06-14, Option 3).

`stewardCompleteness` = filled / 9; `rosterCompleteness` = mean per-steward pct, with
`filled`/`total` summed for the caption.

## The audit and the consolidation (2026-06-14)

The audit found the model was only *partially* canonical: ~6 Act capture surfaces
**re-typed the same person by free-text name** with no link back to the roster, so
nothing was attributable to one identity. Four options, sequenced by the operator:

1. **Option 1 — link capture surfaces to the roster** (attributability; lowest risk).
   *Built + committed `72a51e1b` (+ fixup `6a50f87a`).* A dual ref
   `StewardRef = {userId} | {email} | null` (compact token `u:` / `e:` / `''`), TOTAL
   decode so every pre-existing saved decision round-trips byte-identically. New
   `captures/stewardRef.ts` (`buildStewardOptions` / `memberStewardOptions`) +
   `StewardPicker`; wired into Labour roster, ProvisionBalance ratify, SettlementPlan
   c5 verifier + c1 cohort restructure, and work assignment. See
   [[project-steward-roster-link-option1]].

2. **Option 3 — add an explicit `needs` field** (smallest gap-closer; built next per
   the operator). *Built + committed `628e6d1e`.* `needs?: string[]` on
   `StewardProfile` — the one explicit steward variable that previously had no home.
   Captured via a `ChipEditor` in `StewardSurveyDetail`, counted toward completeness
   (`STEWARD_FIELDS` 8→9). Client-only, no sync/migration. See
   [[project-steward-needs-field-option3]].

3. **Option 2 — server-sync `StewardProfile`** (durability). *Deferred.* The overlay
   is device-local IndexedDB today, so `needs` / `skills` / every overlay field does
   not sync across devices.

4. **Option 4 — unified `Steward` entity** (single server-side join). *Deferred —
   reassess after Option 2.*

## Amanah

These surfaces touch cost-share and governance, never sale. The consolidation added
no advance-purchase / salam / CSRA surface; the verbatim `FINANCIAL_SCOPE_NOTE`,
`RATIFY_ACK`, and `SETTLEMENT_SCOPE_NOTES` are untouched. See [[fiqh-csra-erased-2026-05-04]].
