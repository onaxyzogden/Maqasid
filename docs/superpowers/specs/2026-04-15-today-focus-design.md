# Today's Focus — Dashboard Design Spec

**Date:** 2026-04-15
**Feature:** Today's Focus section on the main Dashboard
**Status:** Approved for implementation

---

## Overview

Replace the existing compact `insight-niyyah-row` pill strip on the Dashboard with a more prominent "Today's Focus" block. The block has two states depending on whether the user has set a niyyah focus for today.

---

## Placement

Directly between the `insight-greeting` row and the existing Maqasid strip / content below it, at `src/pages/Dashboard.jsx` lines 458–473 (current `insight-niyyah-row`). The new block replaces the `insight-niyyah-row` entirely — same position, more prominence.

---

## State 1 — Niyyah set (focus cards)

**Condition:** `niyyahFocus.length > 0 && !niyyahFocus.includes('_skipped')`

Render one card per focused pillar, in a horizontal flex row (wraps on small screens).

### Card anatomy (per pillar)

```
┌─[bar]──────────────────────────────────────────────────┐
│  [icon]  TODAY'S FOCUS (eyebrow)                  [Go→] │
│          Pillar Name (large)                            │
│          حفظ الدين (arabic root, muted)                 │
│          N open · M overdue (meta, dimmed)              │
└─────────────────────────────────────────────────────────┘
```

- **Left accent bar:** 4px wide, full card height, `pillar.accentColor`
- **Icon:** 36×36 rounded box, background `accentColor + '18'`, icon color `accentColor`. Icon comes from `PILLAR_ICONS` map (Lucide component keyed by `pillar.icon`).
- **Eyebrow:** "Today's Focus", 9–10px uppercase, `accentColor`
- **Name:** `pillar.sidebarLabel`, 15px bold, near-white (`#e4e8f4`)
- **Arabic root:** `pillar.arabicRootAr`, 11px, `accentColor + '80'` (muted)
- **Meta:** `N open` or `N open · M overdue` from `pillarSummary`, 11px, dimmed (`#4a5068`). If `overdueCount > 0`, show both parts.
- **"Go →" button:** Small pill button, background `accentColor + '18'`, text `accentColor`. `Link` to `/app/pillar/{pillar.id}`.
- **Card border:** 1px solid `accentColor + '30'`, background `accentColor + '08'`

### Task count data source

`pillarSummary` (already computed in Dashboard's `useMemo` at line 378) returns `{ pillar, openCount, overdueCount }[]`. For each `niyyahFocus` pillar ID, find its entry in `pillarSummary` to get counts. If a pillar has no entry (zero open tasks), show `0 open`.

---

## State 2 — Skipped or not yet set (CTA prompt)

**Condition:** `niyyahFocus.length === 0 || niyyahFocus.includes('_skipped')`

A single dashed-border row:

```
┌ - - - - - - - - - - - - - - - - - - - - - - - ─┐
│  [⚡]  Set your focus for today      [Set focus→] │
│        Choose which pillar(s) to direct           │
│        your energy toward.                        │
└ - - - - - - - - - - - - - - - - - - - - - - - - ┘
```

- Container: `border: 1px dashed #2a3047`, background `#0c0e18`, border-radius 10px
- Icon box: 36×36, background `#161a2a`, ⚡ emoji
- Title: "Set your focus for today", 13px semibold, `#8892aa`
- Sub: "Choose which pillar(s) to direct your energy toward.", 11px, `#3a4060`
- Button: "Set focus →", background `#1e2438`, border `1px solid #2a3047`, color `#c8ccd8`. On click: opens NiyyahAct overlay.

---

## Re-triggering NiyyahAct from the CTA

NiyyahAct currently only auto-shows in AppShell when `niyyahDate !== today`. For the "Set focus →" CTA (needed when user previously skipped or already dismissed today), we need a manual override:

1. Add `niyyahOverrideOpen: false` to `app-store.js`
2. Add `openNiyyahOverride: () => set({ niyyahOverrideOpen: true })` action
3. Add `closeNiyyahOverride: () => set({ niyyahOverrideOpen: false })` action
4. Modify AppShell line 286: `{(niyyahNeeded || niyyahOverrideOpen) && <NiyyahAct onClose={closeNiyyahOverride} />}`
5. NiyyahAct must call `onClose` (if provided) after the user completes or skips — check if NiyyahAct already has a dismiss path; if so, wire `onClose` there.
6. CTA button in Dashboard calls `openNiyyahOverride()` from `useAppStore`.

---

## New component: `TodayFocusSection`

Extract the block into `src/pages/TodayFocusSection.jsx` (co-located with Dashboard).

**Props:** none — reads from stores directly.

**Stores used:**
- `useThresholdStore` → `niyyahFocus`
- `useAppStore` → `openNiyyahOverride`
- Receives `pillarSummary` as a prop (computed in Dashboard, passed down — avoids re-computing)

**Prop signature:**
```jsx
TodayFocusSection({ pillarSummary })
// pillarSummary: Array<{ pillar: MaqasidPillar, openCount: number, overdueCount: number }>
```

**CSS:** `src/pages/TodayFocusSection.css` — scoped styles, no global pollution.

---

## Files to create / modify

| Action | File |
|---|---|
| Create | `src/pages/TodayFocusSection.jsx` |
| Create | `src/pages/TodayFocusSection.css` |
| Modify | `src/pages/Dashboard.jsx` — replace `insight-niyyah-row` block with `<TodayFocusSection pillarSummary={pillarSummary} />` |
| Modify | `src/store/app-store.js` — add `niyyahOverrideOpen`, `openNiyyahOverride`, `closeNiyyahOverride` |
| Modify | `src/components/layout/AppShell.jsx` — wire `niyyahOverrideOpen` |
| Modify | `src/components/layout/NiyyahAct.jsx` — accept optional `onClose` prop |

---

## Edge cases

| Case | Behaviour |
|---|---|
| Pillar in `niyyahFocus` but no tasks | Show "0 open", no overdue segment |
| `niyyahFocus = ['_skipped']` | Show CTA state |
| `niyyahFocus = []` | Show CTA state |
| Single focused pillar | Single card, full width |
| Multiple focused pillars | Cards flex-wrap side-by-side |
| Very long pillar name | Card body truncates (min-width: 0 on flex body) |

---

## Out of scope

- Editing which pillars are focused from the card (use NiyyahAct)
- Task list inline in the card (that's Option C which was not chosen)
- Any changes to the Maqasid strip below
