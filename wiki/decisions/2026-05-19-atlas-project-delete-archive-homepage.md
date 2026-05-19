---
title: "Atlas: delete + archive/unarchive projects from the HomePage list"
type: decision
date: 2026-05-19
status: accepted
tags: [atlas, homepage, projects, lifecycle, ui, archive, delete]
superseded_by: null
---

# Atlas: delete + archive/unarchive projects from the HomePage list

## Context

The Zustand `projectStore` already shipped `deleteProject(id)` (with full
`cascadeDeleteProject` cleanup across 11 stores + IndexedDB) and a
`status: 'archived'` state, but the only UI path to delete a project was
*inside* a project (MapView → SettingsPanel → confirm dialog in
`ProjectPage.tsx`), and **no UI existed to archive/unarchive** at all. From
the project list (`HomePage.tsx`) a steward could not remove or shelve a
project, so the working list grew unbounded.

## Decision

Surface archive/unarchive and delete (with confirmation) directly on the
HomePage project cards, and shelve archived projects out of the default view.

- **Card-action cluster** (`HomePage.tsx`, the existing hover/focus overlay
  that already held Candidate/Promote + Duplicate): added an
  **Archive**/**Unarchive** toggle button and a **Delete** button. The
  Candidate/Promote toggle is hidden on archived cards (promote/candidate on a
  shelved project is noise). Builtin/sample cards (incl. the `mtc` seed) still
  show no actions — the pre-existing `!p.isBuiltin` guard already covers this,
  and `deleteProject`/`updateProject` already no-op/allowlist-drop on builtins,
  so no extra builtin handling was added.
- **Archive = `updateProject(id, { status: 'archived' })`**, Unarchive =
  `status: 'active'`. Reuses the existing status union — no schema/store
  change.
- **Delete** opens the reusable `components/ui/Modal.tsx` (focus trap, Escape,
  overlay dismiss) with a danger-variant confirm button calling the existing
  `deleteProject` cascade. No immediate mutation on click — confirmation
  required.
- **Archived projects hidden from All/Active**; visible only under a new
  "Archived" filter tab. The `'all'` filter now returns
  `p.status !== 'archived'` (was `true`); a new `'archived'` tab chip renders
  only when `archivedCount > 0`. The "All" count shows
  `projects.length - archivedCount` for honesty with the filtered view.
- **Stranded-filter fix:** a `useEffect` resets `statusFilter` to `'all'`
  when the selected tab's bucket empties (last candidate promoted, or last
  archived project unarchived/deleted). This also closes a **pre-existing**
  latent bug for the Candidates tab (promote the last candidate while on the
  Candidates tab → stranded on an empty view with a stale message).
- New CSS `.cardActionBtnDanger` (composes the existing `.cardActionBtn`)
  using the `--color-error-600` token — the same danger token MapView's
  delete button uses.

Scope confirmed with the user via clarifying questions before implementation
(archive+unarchive AND delete; reusable Modal; archived hidden from All).

## Rationale

The store already owned the hard part (cascade delete, archived status); the
gap was purely UI exposure on the surface the steward actually uses. Reusing
the existing card-action overlay, status union, and shared Modal keeps the
change minimal and consistent with the two patterns already in the file
(Candidate/Promote, Duplicate) and the other delete entry point (ProjectPage).
Hiding archived from the default list matches the stated intent — a clean
working list — without losing the data (recoverable via Unarchive). The
stranded-filter `useEffect` was added because runtime verification surfaced the
bug live; fixing it also repaired the same latent defect on the older
Candidates tab.

## Alternatives Considered

- **Keep archived visible in 'All' with just a badge** — rejected by the user;
  defeats the "clean working list" purpose.
- **Inline confirm dialog mirroring `ProjectPage.tsx`** — rejected in favour of
  the shared `Modal` (focus trap + a11y already solved; less bespoke CSS).
- **Soft-delete/undo toast** — out of scope; delete is already gated behind an
  explicit confirmation modal and the cascade is the established behaviour.

## Consequences

- Stewards can shelve or permanently remove projects from the list without
  entering a project.
- Archived projects no longer clutter the default working list; the Archived
  tab is the recovery surface.
- The Candidates tab no longer strands the steward when the last candidate is
  promoted (pre-existing bug, fixed in passing).
- Store/schema unchanged; still client-local (no server-side delete — out of
  scope, cascade already handles local + IndexedDB).
- Verification: `apps/web` typecheck (8 GB script) clean, twice; full
  `apps/web` Vitest **1219/1219**; runtime exercise against the live dev
  server at `/home` proved every flow (builtin cards action-free; archive
  hides + tab appears + store status `archived`; Archived tab shows
  Unarchive/no-Candidate; unarchive restores + tab vanishes cleanly; delete
  modal opens, Escape/Cancel preserve the project, confirm removes it from
  store **and** persisted localStorage; cascade ran). `preview_screenshot`
  timed out twice (the documented recurring capture-tool hang in this project,
  though HomePage has no map canvas) — verification done via DOM/runtime
  exercise instead, documented honestly rather than asserted.

## Connections

- [[olos]] — Atlas HomePage / project lifecycle
- [[2026-05-18-atlas-plan-zone-rings-visibility]] — sibling recent Atlas UI
  work on the same rebased `feat/atlas-permaculture` branch
- [[maqasid-al-shariah]] — orderly stewardship of the steward's own work
