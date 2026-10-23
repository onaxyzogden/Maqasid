# Shared Components — CONTEXT.md

## Purpose
Reusable UI components used across multiple modules: search, labels, tables, tooltips, headers.

## File Inventory
| File | Description | Used By |
|------|-------------|---------|
| SearchPalette.jsx | Cmd+K command palette; searches 5 sources (projects, tasks, modules, people, events); keyboard nav | Global (via AppShell) |
| SearchPalette.css | Palette overlay, result groups, keyboard-active highlight styles | Global (via AppShell) |
| DashboardTaskCard.jsx | Unified clickable task card: subtask bars, field progress, due dates, tags, BBOS custom renderers | BbosFullDashboard, PillarLevelDashboard |
| DashboardTaskCard.css | Task card layout, status colors, hover states | BbosFullDashboard, PillarLevelDashboard |
| IslamicTerm.jsx | Portal-based hover tooltip for Islamic terms; smart positioning (above/below) | Throughout app |
| IslamicTerm.css | Tooltip positioning, portal styles | Throughout app |
| GLabelBadge.jsx | Displays G-Label (integrity label) badge | BbosTaskPanel |
| AmanahTierBadge.jsx | Displays Amanah Gate Protocol tier (T1/T2/T3 — Bayyinah/Qarina/Aspiration) | TaskDetailPanel (subtask row + subtask-detail header), SubtaskStepDetail |
| SequentialStepFlow.jsx | The sequential-locking step engine, extracted from `OrientationSheet` 2026-07-27: owns `preview {taskIndex, subtaskIndex}` with the **render-time `syncedTo` reset** (deliberately NOT a `useEffect` — see orientation/CONTEXT.md gotchas), clamping, viewingCurrent/ahead/behind derivation, and renders `TaskStepper`/`SubtaskStepper` + `SubtaskStepDetail` + `OrientationActions`. Primary label: `Mark done` (current) / `Complete prior steps` (ahead, disabled) / `Completed` (behind, **enabled** → `onRevert`). Props `{ items, currentTaskIndex, currentSubtaskIndex, resetKey, getCrumbParts, onMarkDone, onNotApplicable, onNotToday, onRevert, renderShell }` | OrientationSheet, NodePhaseSlideUp (prayer Before/After tabs + During MirrorCard) |
| SubtaskStepDetail.jsx | One subtask ("step") rendered Orientation-style: crumb → **task-stepper slot** → task title/progress → tag row (priority / Amanah tier / Grounded) → **subtask-stepper slot** → Now box → "Why & how" accordion → Evidence accordion; `subtask == null` renders the "nothing left in this task today" complete state. **Renders a Fragment** — host body must supply flex-column + gap. Props `{ crumbParts, task, subtask, taskStats, taskStepper = null, subtaskStepper = null }` — the last two are optional render slots (React nodes) for the sequential-locking rails. Purely presentational | SequentialStepFlow |
| SubtaskStepDetail.css | Step-detail internals moved verbatim from `Orientation(.Sheet).css` — class names keep the historical `os-sheet__` / `orient-evidence__` prefixes (renaming them would touch every override; deferred) | Same |
| SubtaskEvidence.jsx | Lazy-loaded grounding-sources accordion (`label`/`defaultOpen` props), wraps `work/SubtaskSources.jsx` with ChunkErrorBoundary + Suspense. Formerly `orientation/OrientationEvidence.jsx`. Imports `../work/TaskDetailPanel.css` for the `tdp-*` classes SubtaskSources renders into — known cross-folder wart, accepted | SubtaskStepDetail |
| GLabelPicker.jsx | Dropdown picker for G-Labels with descriptions; escape to close | BbosTaskPanel |
| MaqasidTable.jsx | Maqasid framework table (necessities/needs/embellishments rows) | Module pages (Quran, Hadith) |
| OverviewCards.jsx | Card grid for overview items; Quranic ayah/hadith references | FivePillars, module overviews |
| PillarHeader.jsx | Compact pillar label with stewardship phrase and Arabic root | Module page headers |
| PillarHeader.css | Pillar header layout, accent color cascading | Module page headers |
| ViewToggle.jsx | Two-button toggle (Overview/Framework); role="tablist" with aria-selected | Pages with dual views |
| ViewToggle.css | Toggle button styles, active/inactive states | Pages with dual views |
| Modal.jsx / Modal.css | Centred dialog (sibling of SlideIn): focus trap, Escape, backdrop, dirty-discard, focus return. Props `onClose, label/labelledBy, describedBy, role ('dialog' or 'alertdialog'), dirty, active, dismissible, overlayClassName, className` | ~12 dialogs; ConfirmDialog |
| ConfirmDialog.jsx / .css | The app's only confirm prompt. Renders the head of `store/confirm-store.js`'s queue as an `alertdialog`. Focus starts on Cancel; Escape and backdrop answer false. Danger button is a fixed #dc2626 (AA in dark mode). Overlay z-index 10001, above ceremonies and BPD dialogs | Mounted once in AppShell |
| FirstSignInSheet.jsx | The first sign-in on a device that already holds its own records: Add this device's records / Start this account empty / Look through first / Sign out instead. Renders **before App** (no stores, router or `requestConfirm`); `main.jsx` hands it `counts`, `onChoose` (`sync-first.js` `chooseFirst`), `onSignOut` and `onDone` (a reload). Nothing is sent until a choice is made | main.jsx (when `prepareSync` returns `undecided`) |
| SnapshotSheet.jsx | Offered once per account when the old snapshot sync left a copy in the cloud: Bring it in (records the device lacks are added and queued; the device's own copy is kept) / Leave it. Renders **before App**, like FirstSignInSheet; `main.jsx` hands it `savedAt`, `onBring` (`services/sync-snapshot.js` `importSnapshot`), `onLeave` and `onDone`. The old copy is never changed or removed | main.jsx (when `readSnapshot` finds a copy not yet answered) |
| SignOutChoice.jsx | Sign out, keeping or removing this device's data. When an account started empty here, also offers "Put this device's earlier records back" (`sync-first.js` `putShelfBack`), then starts the page over | Settings, AccountPage |

## Store Dependencies
- **app-store** (SearchPalette): `searchOpen`, `setSearchOpen`
- **project-store** (SearchPalette): `projects[]`
- **task-store** (SearchPalette): `searchAllTasks()`
- **contacts-store** (SearchPalette): `contacts[]` for people search
- **office-store** (SearchPalette): `events[]` for event search
- **settings-store** (PillarHeader): `valuesLayer`
- **data/modules.js** (SearchPalette): `MODULES` for module search
- **auth-store** (SignOutChoice): `signOut({ removeData })`. With accounts off (`cloudAccountsEnabled` false, `services/supabase.js`) `authStatus` stays `'guest'` and FirstSignInSheet never shows

## Key Patterns
- **Portal components**: IslamicTerm, SearchPalette use React portal to escape `overflow:hidden`
- **CSS variable cascading**: `--fp-accent`, `--pd-color`, `--ph-color` for dynamic theming
- **Memoized filtering**: SearchPalette filters on min 2 chars
- **Keyboard shortcuts**: Escape, Arrow keys, Enter for navigation
- **Smart tooltip positioning**: IslamicTerm flips above/below based on available space
- **Accessibility**: proper ARIA roles on ViewToggle and SearchPalette

## Gotchas
- **No native `window.confirm()` / `alert()`.** In components use `const confirm = useConfirm(); if (await confirm({ title, body, confirmLabel, danger }))`. Outside React use `requestConfirm(opts)` (both from `store/confirm-store.js`). Report outcomes with `useToastStore.getState().addToast(...)`; toast messages keep `\n` line breaks, and `lib/error-list.js` `errorListMessage()` caps a validation list at 3 items. Destructive titles name the item.
- Stacked dialogs: `useFocusTrap` ignores Escape when focus is inside a different `[aria-modal="true"]`, so a ConfirmDialog over a SlideIn closes only itself.
- Toasts (z-index 9999) render under ConfirmDialog. An `extraAction` that needs to report success should pass `doneLabel`.
- IslamicTerm tooltip uses fixed positioning via portal — parent scroll doesn't break it
- SearchPalette has min 2-char threshold before showing results
- MaqasidTable reuses `PillarDashboard.css` styles
