---
title: "Non-prayer node popup — tasks consolidated onto During, Before/After reduced to ceremony previews"
type: decision
date: 2026-07-25
status: accepted
tags: [ui, islamic, prophetic-path, milos]
superseded_by: null
---

# Non-prayer node popup — tasks consolidated onto During, Before/After reduced to ceremony previews

## Context

Follow-up to [[2026-07-25-milos-prayer-popup-consolidation]], which reshaped the **prayer** nodes of the Prophetic Path popup ([[2026-07-22-milos-prophetic-path-node-popup]]) and explicitly left the **non-prayer** nodes (work, learning, meals, rest, etc.) untouched. This decision reshapes the non-prayer nodes to the *inverse* layout.

Before this change, each non-prayer tab in [NodePhaseSlideUp.jsx](src/components/islamic/NodePhaseSlideUp.jsx) rendered a **ceremony preview *plus* a task list**, and the three lists were *different subsets* of the node pool: nodes carry `phaseMatchers`, so **Before** caught `/plan|planning|prep/` tasks, **After** caught `/wrap|close/` tasks, and **During** (the `main` slot) showed the remainder. The task the operator was looking at ("Plan the week's learning block", "Plan this week's deep-work block") sat under **Before** purely because its title matched `/plan/`.

The operator's instruction: *"Move the task list from before and after to the during tab."* Two constraints confirmed by follow-up questions:

1. **Scope: non-prayer nodes only.** Prayer nodes keep the layout from [[2026-07-25-milos-prayer-popup-consolidation]] — tasks on Before/After, the inline `PrayerHeroDuring` guide on During.
2. **Before/After keep the ceremony preview.** Only the task list is removed from them; the `CeremonySummary` "Begin opening / Begin closing" card stays.

A third case surfaced during the work: `midday-labor` was the *one* non-prayer node whose During did **not** show a task list — it showed a `showProjects` Projects/Education view (user projects in scope). Consolidating tasks onto During would have left them homeless on the exact node the operator clicked. The operator chose: **show the task list** on `midday-labor`'s During like every other non-prayer node, dropping the `showProjects` view.

## Decision

On every non-prayer node in [NodePhaseSlideUp.jsx](src/components/islamic/NodePhaseSlideUp.jsx):

```jsx
// phaseTasks — non-prayer branch: whole node pool, phase-agnostic.
: buildTasksForNode(node.id, projects, tasksByProject, {
    limit: 20,          // was 8 — the merged Before+main+After set must not truncate
    submoduleNameById,
    phase: null,        // was SLOT_BY_PHASE[phase] — drop the before/main/after split
    moduleId,
  })

// During — MirrorCard with the full pool; showProjects hard-off
<MirrorCard … tasks={phaseTasks} showProjects={false} />

// Before / After — ceremony preview only (no task list)
} else {
  body = <CeremonySummary type={phase === 'before' ? 'opening' : 'closing'} … />;
}
```

- **Phase filter dropped** for non-prayer nodes (`phase: null`) so During shows the *combined* Before+main+After pool — no task stranded by a matcher. `limit` raised 8 → 20 so the merged set isn't capped.
- **Before/After = `CeremonySummary` alone.** The `<div className="pp-phase-tasks">{taskList}</div>` wrapper is gone; its orphaned CSS rule was removed from [NodePhaseSlideUp.css](src/components/islamic/NodePhaseSlideUp.css).
- **`showProjects` plumbing removed.** The `showProjects`/`scopeProjects` `useMemo` and its now-unused imports (`buildUserProjectsForScope`, `submodulesForNode`, `getPillarSubmoduleIds`) were deleted from `NodePhaseSlideUp.jsx`. `midday-labor`'s During now renders the task list under the same Wealth/Community + Action/Education toggles as its peers.

`SLOT_BY_PHASE` and the `slot` local were removed (dead after the filter drop). `MirrorCard`'s `showProjects` branch is left intact in [PropheticPathMirror.jsx](src/components/islamic/PropheticPathMirror.jsx) — it is a reusable export and the branch is simply never reached now (`showProjects={false}` at the only call site).

## Rationale

- **One home for tasks.** Splitting a node's tasks across three tabs by a keyword matcher was invisible: a "plan the week" task appearing under Before (not During/"now") surprised the operator. Consolidating onto During makes the popup's task surface a single predictable list; Before/After become pure *threshold* affordances (the opening/closing du'ā ceremony), matching how the prayer nodes now read (tasks in one place, the phase tabs carry only their special content).
- **Whole pool, not the `main` subset.** During had shown only the `main` slot; surfacing the *combined* pool there is required so nothing the matchers had routed to Before/After is lost. The matchers still exist in `buildTasksForNode` — they are simply not applied from this call site.
- **`midday-labor` regularized.** Its bespoke Projects/Education view was the only non-prayer During that wasn't a task list; folding it into the standard task list removes a special case and satisfies the operator's "show the tasks here" intent for the very node they were inspecting. The projects data path survives as an unreached `MirrorCard` capability, not deleted.

## Alternatives Considered

- **Keep the phase split, just relabel.** Rejected — the operator asked to *move* tasks to During, not to rename Before/After. Cross-tab subsets were the confusion.
- **Delete `MirrorCard`'s `showProjects` branch.** Rejected — `MirrorCard` is a shared export; the branch is harmless dead-on-this-path code and removing it widens the blast radius for no runtime benefit. Left with `showProjects={false}`.
- **Remove `onSelectProject` from the prop chain.** Rejected — kept threaded to preserve the component API; inert now, but stable.

## Consequences

- **Before/After never render tasks for non-prayer nodes** — they are `CeremonySummary` only. The `.pp-phase-tasks` class no longer exists in the codebase.
- **`midday-labor` no longer has a Projects view in the popup.** User projects in its scope are reachable elsewhere; the popup shows its task list. `showProjects` is dead at every call site.
- **`buildUserProjectsForScope`, `submodulesForNode` (in this file), `getPillarSubmoduleIds` imports dropped** from `NodePhaseSlideUp.jsx`. (`submodulesForNode`/`getPillarSubmoduleIds` remain imported in `PropheticPathMirror.jsx`, feeding the live `EducationList`.)
- **Prayer nodes unchanged** — this decision is strictly the inverse-scope complement of [[2026-07-25-milos-prayer-popup-consolidation]]; the two together define the whole popup's task/phase behavior.

## Verification

DOM-level (the screenshot tool was **unresponsive this session** — "Browser pane is not displayed, so the page is not compositing frames"; contrast the working run recorded in [[2026-07-25-milos-prayer-popup-consolidation]]). Verified on `/app/prophetic-path` via DOM inspection:

- **Midday Labor · During** → `MirrorCard` with a 20-card task list (hitting the raised cap), **no** `.pp-project-list`; both weekly-planning tasks ("Plan the week's learning…", "Plan this week's deep-work…") present; Wealth/Community + Action/Education toggles intact.
- **Midday Labor · Before** → `.pp-ceremony` with "Begin opening", **0** task lists.
- **Midday Labor · After** → `.pp-ceremony` with "Begin closing", **0** task lists.
- **Fajr (prayer, regression)** → During = inline guide (`phd-root`, no `MirrorCard`); Before = bare task-list branch ("No tasks queued for this window.", no ceremony). Unchanged.
- `npm test` — **94/94**. `npm run build` — **✓ clean**, no dangling imports. ESLint on `NodePhaseSlideUp.jsx` — **0 problems**.
- **`npm run lint` (full composite) still fails** on the same *pre-existing, unrelated* error carried on this branch: `Date.now()` purity in [Orientation.jsx:42](src/components/orientation/Orientation.jsx) ([[2026-07-23-milos-orientation-screen]]), not touched here. Surfaced, not hidden.

**Amanah:** neutral. Presentational/navigational only — no seed data, grounding `sources[]`, fiqh, or capital surface touched. No CSA/CSRA/salam/yield-share. No covenant framing genericized: Before/After stay the threshold-ceremony (du'ā) affordances; only the task list moved tabs.

Uncommitted at time of filing on `feat/desktop-pillar-glyphs`; commit operator-gated.

## Connections

- [[milos]] — the app whose Prophetic Path popup this governs
- [[2026-07-25-milos-prayer-popup-consolidation]] — the prayer-node sibling; this is its non-prayer, inverse-layout complement
- [[2026-07-22-milos-prophetic-path-node-popup]] — the popup both decisions reshape
- [[2026-07-23-milos-prayer-phase-task-boards]] — the phase-board read model prayer nodes still use (non-prayer nodes now bypass phase entirely)
- [[covenant-architecture]] — Before/After remain the threshold-ceremony frame around the node's work
