# Task Detail Modal Reskin — Design Spec

**Date:** 2026-04-15
**Project:** MAQASID OS V2.1
**Author:** Yousef + Claude

---

## Problem

The current `TaskDetailPanel` modal is functional but visually dated — tight 480px width, small title, square checkboxes, inline form controls (assignee, priority, status, G-Label, due date) all visible at once, and a cluttered footer with rarely-used buttons (Make Recurring, Show Discussion). The design doesn't match the refined aesthetic established in recent UI work across the app.

## Goal

Reskin the task detail modal to a clean, spacious layout with dynamic level-color theming. The default view surfaces only what matters: title, description (read-only), progress, subtasks, and notes. Secondary features move behind the scenes. A single "Task Document" footer button provides the primary action.

---

## Design

### Approach

**In-place reskin** of `TaskDetailPanel.jsx` and `TaskDetailPanel.css`. No new components, no call-site changes. All existing logic (auto-save, auto-move to In Progress, BBOS delegation, portal rendering, transform-origin animation, Escape key close) is preserved.

### Modal Shell

| Property | Current | New |
|----------|---------|-----|
| Width | 480px | 672px (max-w-2xl) |
| Max width | 92vw | 92vw (unchanged) |
| Max height | 85vh | 85vh (unchanged) |
| Border radius | 12px | 24px |
| Background | `var(--surface)` solid | `var(--surface)` solid (no glass) |
| Shadow | `var(--shadow-lg)` | `var(--shadow-lg)` (unchanged) |
| Animation | `tdpScaleIn` spring scale | Preserved, same transform-origin logic |

### Overlay

- Background: `var(--overlay)` with `backdrop-filter: blur(4px)` on the overlay (not the modal)

### Dynamic Color Theming

The modal accepts an accent color via a CSS variable `--tdp-accent`. This color drives:
- Header module icon stroke color
- Progress bar fill and percentage text
- Completed subtask checkbox fill
- "Task Document" button background and shadow

**Color source:** Derived from context:
- Pillar pages → `pillar.accentColor`
- BBOS stages → `stage.color`
- Level pages → `levelColor` prop
- Fallback → `var(--primary)`

The parent component (ProjectBoard, PillarLevelPage, etc.) passes the accent color as a prop. TaskDetailPanel sets `--tdp-accent` as an inline style on the modal root.

### Header

```
[Module Icon]  PROJECT NAME — LEVEL        [✕]
```

- **Left:** Grid/module icon (Lucide `LayoutGrid` or `Grid2x2`) in `--tdp-accent` color + project name in uppercase tracking-wider bold secondary text
- **Right:** Close button (X icon), rounded hover state
- **Border:** 1px solid with very low opacity (`rgba(--border, 0.1)`)
- **Background:** Slight tint (`rgba(255,255,255,0.5)`)

**Removed from header:** Task ID badge, MoreVertical menu, Due date badge.

### Body — Default Clean View

Generous padding (`32px`) and spacing (`32px` gap between sections).

#### 1. Priority Badge + Title + Description

- **Priority badge:** Small pill above title. Uses existing `PRIORITIES` color map (e.g., red for urgent, amber for high). Text: "{priority} Priority" in uppercase.
- **Title:** Editable textarea, `text-3xl` (1.875rem), `font-weight: 800`, Manrope font. Keeps existing auto-resize and auto-save logic.
- **Description:** Read-only `<p>` element (not a textarea). Displays `task.description` in `text-sm` (14px), `color: var(--text2)`, `line-height: 1.7`. If empty, this element is hidden (no placeholder).

#### 2. Subtask Progress Bar

- **Label row:** "Subtask Completion" (left, bold) + percentage (right, `--tdp-accent` color)
- **Bar:** 12px tall, `border-radius: 9999px`, track: `var(--surface-dim)`, fill: `--tdp-accent`
- **Calculation:** `(doneSubtasks.length / totalSubtasks.length * 100)`, rounded to integer. Shows "0%" when no subtasks.
- **Hidden when:** Task has zero subtasks.

#### 3. Subtasks List

- **Section label:** "SUBTASKS" — 12px, uppercase, tracking-widest, secondary color
- **Each subtask row:** Padded card (`16px` padding, `16px` border-radius)
  - **Unchecked:** 24px circle with 2px `var(--outline-variant)` border, empty
  - **Checked:** 24px circle filled with `--tdp-accent`, white checkmark SVG inside
  - **Text:** 500 weight, `var(--on-surface)` for unchecked, `var(--on-surface-variant)` + `line-through` for checked
- **Hover:** Row background transitions to `var(--surface-container-low)`
- **Add subtask:** Existing input + Plus icon row at bottom (keep current logic)
- **Remove subtask:** X button on hover for completed subtasks (keep current logic)

#### 4. Notes Section

- **Section label:** "NOTES" — same style as subtasks label
- **Container:** `var(--surface-container-low)` background, `20px` padding, `16px` border-radius
- **Textarea:** Transparent background, no border, `14px` font, `1.6` line-height. Placeholder: "Write your thoughts or key learnings here..."
- **Auto-save:** Keep existing 300ms debounce logic

### Footer

- **Layout:** Centered, single element
- **"Task Document" button:** Pill button (`border-radius: 9999px`), `--tdp-accent` background, white text, `700` weight, `14px` font, `12px 40px` padding. Lucide `FileText` icon on left. Box shadow using accent color at 20% opacity.
- **Behavior:** TBD — likely navigates to a full task document view or opens a detailed edit mode. For now, this button is visual only (can be wired later).

### Features Removed from Default View

These features are **not deleted from code** — they are removed from the JSX render. The underlying store methods and state remain intact for future use or for the "Task Document" detail view:

- Assignee selector
- Priority dropdown (replaced by read-only badge)
- Status dropdown
- G-Label picker
- Due date input
- Tags section
- Attachments section
- Status timeline row
- Footer meta row (By user on date, Followers)
- Delete / Make Recurring / Show Discussion buttons

### Mobile Responsive

- Width: `95vw` (unchanged)
- Max height: `90vh` (unchanged)
- Body padding: `24px` instead of `32px`
- Body gap: `24px` instead of `32px`

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/work/TaskDetailPanel.jsx` | Restructure JSX: new header, body (priority badge, title, read-only description, progress bar, subtasks with circular checkboxes, notes), footer with Task Document button. Remove secondary feature sections from render. Add `accentColor` prop. |
| `src/components/work/TaskDetailPanel.css` | Full CSS rewrite: wider modal, 24px radius, new header/body/footer styles, circular checkbox styles, progress bar, dynamic `--tdp-accent` theming. |
| `src/components/work/ProjectBoard.jsx` | Pass `accentColor` prop to `TaskDetailPanel` (derive from project/stage context). |
| `src/pages/shared/PillarLevelPage.jsx` | Pass `accentColor` prop to `TaskDetailPanel` (derive from `levelColor`). |

---

## What Is NOT Changing

- Portal rendering via `createPortal`
- Transform-origin animation from clicked card
- Auto-save debounce (300ms)
- Auto-move to "In Progress" on open / revert on close
- BBOS task delegation to `BbosTaskPanel`
- Escape key close
- Backdrop click close
- All Zustand store integrations
- `BbosTaskPanel` (separate component, untouched)

---

## Verification

1. **Visual check:** Open task modal from different contexts:
   - Pillar level page (e.g., Faith → Shahada → CORE) — verify accent color matches pillar
   - BBOS project Tasks tab — verify accent color matches stage
   - Dashboard task card click — verify fallback to primary color
2. **Functionality check:**
   - Edit title → confirm auto-save (check store)
   - Toggle subtask → confirm progress bar updates
   - Edit notes → confirm auto-save
   - Open from "To Do" column → confirm auto-move to "In Progress"
   - Close without completing subtasks → confirm revert to "To Do"
   - Press Escape → modal closes
   - Click backdrop → modal closes
   - BBOS task → confirm delegation to BbosTaskPanel still works
3. **Responsive:** Resize to mobile viewport, confirm modal adapts
4. **Build:** `npm run build` passes with no errors
