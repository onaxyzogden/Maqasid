# Orientation Module — CONTEXT.md

## Purpose
Single-recommendation "what to do next" screen at `/app/orientation`. Surfaces exactly one subtask (never a list), ranked by necessity tier (Daruriyyat → Hajiyyat → Tahsiniyyat) across all seven Maqasid pillars, with a breadcrumb ladder, inline grounding evidence, and four non-punitive exits (Mark done / Doesn't apply / Something else / Not today).

## File Inventory
| File | Description |
|------|-------------|
| Orientation.jsx | Container — owns held/override/picker/ack state, wires stores, computes `todayKey`, calls `recommendOrientation` |
| OrientationLadder.jsx | 5-rung breadcrumb: Pillar → Tier → Submodule → Task → Now |
| OrientationBalanceStrip.jsx | 7-bar strip across pillars; doubles as the "Something else" picker when open |
| OrientationEvidence.jsx | Lazy-loaded evidence accordion, wraps `work/SubtaskSources.jsx` |
| OrientationActions.jsx | 4 action buttons (stateless, callback props) |
| Orientation.css | Token-only styling (no inline hex) |

## Architecture
```
Orientation (container)
├── OrientationLadder        — breadcrumb, no state
├── OrientationBalanceStrip  — pillar bars + picker mode
├── "now" card
│   └── OrientationEvidence  — accordion → lazy SubtaskSources
└── OrientationActions       — 4 buttons, callbacks only
```

## Store Dependencies
- **project-store**: `projects`
- **task-store**: `tasksByProject`, `toggleSubtask`, `updateSubtask`
- **settings-store**: `valuesLayer` (Islamic vs. universal pillar labels)
- **selector** (`src/data/orientation-selector.js`): `recommendOrientation` — pure, no store imports itself; the container passes it store snapshots
- **islamic-day-store**: `currentIslamicDayKey` (pure helper, not the Zustand store) — governs "Not today" snooze expiry

## Key Patterns
- **Recompute is effect-driven, not handler-driven.** Actions that mutate the store (Mark done / Doesn't apply / Not today) do NOT call the selector directly — they mutate `tasksByProject` and let the `useEffect` (dependent on `projects`/`tasksByProject`) react. This avoids a stale-closure race where a handler-computed recommendation would use a `tasksByProject` snapshot taken before React re-renders. "Something else" doesn't mutate the store, so it bumps a `tick` counter to force the same effect to re-run.
- **Held-task continuity** (`heldRef`) and **pillar override** (`overrideRef`) are refs, not state — they're write-once-read-once per recompute, never used to derive JSX directly. Override is intentionally one-shot: it steers the very next recommendation, then is cleared so subsequent recomputes fall back to system-wide ranking once that task's held continuity runs out (a temporary "set aside," not a permanent pin).
- **Evidence rendering is reused, not rebuilt.** `OrientationEvidence` lazy-imports `work/SubtaskSources.jsx` exactly like `TaskDetailPanel.jsx` does (`ChunkErrorBoundary` + `Suspense` + skeleton fallback).
- **Grounding helpers** (`isSubtaskGrounded`/`deriveSubtaskTier`) live in `src/utils/subtask-grounding.js`, shared with `TaskDetailPanel.jsx` — do not reimplement locally.

## Common Tasks
- Change ranking logic → edit `src/data/orientation-selector.js`, not this folder (pure, unit-tested separately)
- Add a new action → extend `OrientationActions.jsx` props + wire a handler in `Orientation.jsx` that mutates the store and lets the effect recompute
- Change pillar label wording → `getPillarLabel`/`getSubmoduleLabel` in `src/data/maqasid.js`, respects `valuesLayer`

## Gotchas
- `OrientationEvidence.jsx` imports `../work/TaskDetailPanel.css` for the `tdp-*` classes `SubtaskSources` renders into — a known cross-folder wart, accepted as-is (see [wiki decision / plan Risks](../../../.claude/plans)); a future cleanup could relocate `SubtaskSources` + its CSS to `shared/`.
- `timeToMs` (HH:MM string → epoch ms) is duplicated locally in `Orientation.jsx` rather than imported — this mirrors existing duplication in `usePrayerTimes.js` and `PropheticPath.jsx`, not a new inconsistency.
- Do NOT add a 4th tile to `MobileNav.jsx` for discovery — its 3-tile bar is intentionally reserved. Discovery is via `TodayFocusSection.jsx`'s handoff row and `Sidebar.jsx` only.
- No `position: fixed` anywhere in this module's CSS — `MobileNav` already owns that failure mode (see project memory); Orientation's action bar flows normally in-page.
