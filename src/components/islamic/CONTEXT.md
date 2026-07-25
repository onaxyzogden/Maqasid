# Islamic UI Components — CONTEXT.md

## Purpose
Spiritual UX layer: prayer awareness, ceremony gates, intention setting, readiness checks. This is the Islamic identity of the app — changes must be reviewed for theological accuracy.

## File Inventory
| File | Description |
|------|-------------|
| CeremonyGate.jsx | Pre-entry gate UI for modules — begin opening or skip |
| CeremonyGuard.jsx | Route-level wrapper (static moduleId prop) — renders CeremonyGate until `completedOpening[moduleId]` is true, then renders `children`. Used in `App.jsx` around pillar-route elements |
| CeremonyGuardDynamic.jsx | Param-driven variant — reads `moduleId` from `useParams(paramKey)` (default `'moduleId'`). Used for catch-all routes like `/app/:moduleId` |
| ThresholdModal.jsx | Full ceremony flow: Dua → Attributes → Readiness [→ Pause] → Confirm |
| NiyyahAct.jsx | Daily intention ceremony: orient step + pillar focus selection |
| PrayerTime.jsx | Sidebar prayer schedule with geolocation + 5 daily times |
| PrayerOverlay.jsx | Slim, non-blocking prayer-time banner (top-center) — dismissible (✕ or Alhamdulillah); auto-clears after `PRAYER_TRAIL_MS` |
| PrayerWarning.jsx | Top-center pill warning of an approaching prayer, dismissible |
| ReadinessCheck.jsx | Display-only paired rows OR interactive yes/no cards with contextual column labels |
| AttributeCard.jsx | Single attribute display: name (+ Arabic), title, description |
| DuaSection.jsx | Renders Quranic dua: Arabic, transliteration, meaning, source |
| IslamicPanel.jsx | Right sidebar: prayer times, pillar context, threshold buttons. `ILSection` blocks accept `id`/`activeSection`/`nonce` and force-open + `scrollIntoView` when targeted by the rail; prayer + citations have `.il-anchor` wrappers scrolled by a panel-level effect |
| IslamicRail.jsx | The **collapsed** form of the right sidebar (desktop only): a 64px vertical icon rail shown in col 5 when `islamicPanelOpen` is false (the panel replaces it when expanded — no separate always-on bar). One icon per available section (from `useIslamicSections`) + Begin/Close ceremony icons. Click → `focusIslamicSection(id)` (expands panel, scrolls to section). Mirrors the collapsed left sidebar |
| IslamicRail.css | Rail styling — icon buttons, hover/active accent. Divider comes from the always-present right col-edge (no own border) |
| useIslamicSections.js | Single source of truth for the panel's ordered sections + per-section availability (computed from `valuesLayer`, route, `activeModule`/`activeBbosStage`, citation count). Consumed by both IslamicRail and (for availability) the panel so the two never drift |
| ResumeOverlay.jsx | Confirmation overlay when returning to module mid-session |
| PropheticPath.jsx | The day's timeline spine. Renders `TimelineNode` cards (presentational) + the slide-ups (`NodePhaseSlideUp`, project/task panels) |
| NodePhaseSlideUp.jsx | Node popup — Before / During / After tabs. The single entry point for every Prophetic Path node (replaced the old `.pp-satellite` buttons) |
| CeremonySummary.jsx | Condensed threshold preview (du'a + up to 2 attributes) shown in the popup's Before/After tabs for **non-prayer** nodes, with a "Begin opening/closing" button that hands off to the full `ThresholdModal` |
| PrayerHeroDuring.jsx | The inline "during the prayer" guide shown in the popup's **During** tab for the **six prayer** nodes (prop `pillarKey` = node id). Two self-contained modes over `PRAYER_SEQUENCES` (`@data/prayer-sequences`): **Reference** (vertical scroll — rakʿah sections, postures, recitations) and opt-in **Pray-Along** (swipeable step cards); falls back to a "coming soon" card for prayers without a sequence (only Fajr/Isha have one today). Brings its own CSS + data; consumed only by `NodePhaseSlideUp` |
| PropheticPathMirror.jsx | `MirrorCard` / `PPTaskCard` / `EducationList` / `ProjectRow` — extracted from `PropheticPath.jsx` so the popup can reuse them without a circular import |
| prophetic-path-constants.js | `LEVEL_COLOR`, `PRAYER_NODE_IDS`, `THRESHOLD_MODULE_BY_NODE`, `isThresholdTriggerNode` — shared by `PropheticPath.jsx` and the popup; imports nothing from either |

## Architecture

### CeremonyGate Pattern
Module entry is gated by the opening ceremony. Two wiring modes coexist:

**Route-level static (default)** — `<CeremonyGuard>` wraps the route element in `App.jsx`:
```jsx
<Route path="faith-salah" element={<CeremonyGuard moduleId="faith-salah"><FaithSalahPage /></CeremonyGuard>} />
```
The guarded page stays pure content — no `useThresholdStore` import, no gate check. Applied to 28 sub-pillar pages + 5 business modules + 4 ummah pages + `work/:projectId` (Project, gated as "work" to match pre-refactor semantics).

**Route-level dynamic** — `<CeremonyGuardDynamic>` reads `moduleId` from `useParams`:
```jsx
<Route path=":moduleId" element={<CeremonyGuardDynamic><ModulePlaceholder /></CeremonyGuardDynamic>} />
```
Used for the `:moduleId` catch-all. Accepts optional `paramKey` prop.

**In-body (intentional, by design)** — only for tab content that is NOT URL-driven:
```jsx
if (!completedOpening[moduleId]) return <CeremonyGate moduleId={moduleId} />;
```
Remaining: `QuranPage`, `HadithPage`, `IslamicKnowledgePage` — tab content inside `SourcesPage`. `activeTab` is local React state (button clicks don't update the URL), so a URL-driven guard can't gate what the user sees. Per-tab gating is also the intended semantic — Quran/Hadith/Knowledge are distinct openings.

Both modes end at the same UI:
- Shows "Begin Opening" or "Return to Opening" (if deferred)
- Skip flow: confirmation dialog → `completeOpening(moduleId)` immediately

### ThresholdModal — Multi-Step Ceremony
5 base steps with conditional branching:
1. **Dua** — module-specific supplication
2. **Attributes** — governing Islamic attributes / universal principles
3. **Readiness** (opening) / **Reflection** (closing)
4. **Confirm** — checkbox attestation
5. **Pause** — conditionally inserted if readiness NOT all-yes

**Pause system**: If interactive readiness has unconfirmed rows → pause step inserted with contextual Quranic verse via `lookupReadinessAyahByKey()`. Includes compassionate defer option.

**Defer system**: `deferOpening(moduleId)` stores ISO timestamp in `deferred[moduleId]`. CeremonyGate detects and shows "Return to Opening".

### ReadinessCheck — Two Rendering Modes

**Display-only mode** (`RCSection`):
- Flat `governing[]` / `notYet[]` arrays rendered as paired rows
- Column headers read from `data.yesLabel` / `data.notYetLabel` (fallback: "At Peace When" / "Not Yet Rested In")
- Used for reflections and modules without interactive rows

**Interactive mode** (`RCInteractive` → `RCInteractiveCard`):
- `rows[]` array grouped by attribute (first row carries `attr_ar`, `attrTitle`, `attrFrame`, `yesLabel`, `notYetLabel`)
- Each attribute renders its own card with contextual column headers
- Column headers read from group's `yesLabel` / `notYetLabel` (fallback: "YES WHEN" / "NOT YET WHEN")
- Selections produce 6-bit binary key for Ayah lookup

**Data source chain**: `islamic-data.js` (MODULE_ATTRS / UNIVERSAL_EQUIV) or `bbos-stage-islamic.js` (BBOS_STAGE_ISLAMIC) → `getModuleData()` / `getBbosStageIslamic()` → ThresholdModal → ReadinessCheck

### Prayer System (3-part)
- **PrayerTime** → sidebar display, uses `usePrayerTimes()` hook
- **PrayerWarning** → top-center pill ~15→5min before prayer ("{Prayer} approaching · Xm"), dismissible
- **PrayerOverlay** → slim, non-blocking, dismissible top-center banner during the prayer window; no countdown; auto-clears after `PRAYER_TRAIL_MS`. The app stays fully usable underneath, and dismissing does NOT open a resume gate (the user never stepped away)

### Prophetic Path node popup — Before / During / After
Clicking any node card on the spine opens `NodePhaseSlideUp` (portal → `document.body`).
Three tabs, default **During**:
- **Before** → `<CeremonySummary type="opening">` + `.pp-phase-tasks` (non-prayer), or — on the
  6 prayer nodes — the phase task list *only*
- **During** → `<MirrorCard>` (tasks / projects / Action-vs-Education), or — on the 6 prayer
  nodes — `<PrayerHeroDuring pillarKey={node.id}>` rendered inline (the in-prayer guide itself)
- **After** → `<CeremonySummary type="closing">` + `.pp-phase-tasks` (non-prayer), or — on the
  6 prayer nodes — the phase task list *only*

On the six prayer nodes the Before/After tabs are tasks-only: they render neither the generic
`faith-salah` opening/closing threshold (all six resolved to the same `<CeremonySummary>`) nor the
per-prayer Sunnah rawātib summary — the tab label alone supplies Before/After context. The
niyyah/readiness ceremony stays reachable via the route-level `CeremonyGuard`. The During tab
inlines `PrayerHeroDuring` (Reference mode by default, opt-in Pray-Along); it is self-contained
(brings its own CSS + `PRAYER_SEQUENCES` data) and falls back to its own "coming soon" card for
prayers without a sequence (only Fajr/Isha have one today).

**Task list — prayer nodes read their board directly.** Prayer nodes bypass `buildTasksForNode`
and read `prayer_{prayerId}_{before|during|after}` out of `tasksByProject` via the popup's local
`buildPrayerPhaseTasks`. The board *is* the phase, so there is nothing to infer. Inference was
also broken both ways: `PRAYER_BOARDS` ship `moduleId: null` (`@data/prayer-pillars`) and
`buildTasksForNode` drops any project with no canonical submodule — which hid all 49 seeded
prayer-phase tasks from this popup on every prayer and every tab — while opening the
`faith-salah` pool to fix that would have let the keyword matchers (`/siwak|rawatib|witr/`) pull
one prayer's tasks into another's window. Non-prayer nodes still use `buildTasksForNode`.

Prayer-phase rows carry `_level: null` — those boards are keyed by window, not by Maqasid level —
so `PPTaskCard` omits the L1/L2/L3 chip for them rather than defaulting to L3 "Tahsiniyyat" and
labelling Fajr's mu'akkadah rawatib an embellishment. Non-prayer rows keep the chip.

The ceremony is **not** rendered locally: "Begin opening/closing" sets
`openingModuleId` / `closingModuleId` on threshold-store and closes the popup, so the globally
mounted `ThresholdModal` (`AppShell.jsx`) takes over. Module precedence is
`THRESHOLD_MODULE_BY_NODE[node.id] || moduleId || 'work'`. This replaced the old `.pp-satellite`
buttons, which CSS hid on every non-active node — the opening/closing thresholds are now
reachable from **every** node on the timeline, past and upcoming included.

### NiyyahAct — Daily Intention
2-step flow: (1) Orient (Bismillah + morning dua), (2) Focus (select pillar buttons). Stores via `completeNiyyah(selectedPillars)`.

## Store Dependencies
- **threshold-store**: `setOpeningModuleId`, `completeOpening`, `deferOpening`, `completeNiyyah`, ceremony state
- **settings-store**: `valuesLayer` (islamic/universal text switching)
- **app-store**: `activeModule`, `toggleIslamicPanel`, `focusIslamicSection` / `islamicActiveSection` / `islamicSectionNonce` (rail → panel section targeting)

## Key Patterns
- Every component checks `valuesLayer` for islamic vs universal text
- Readiness keys are binary-encoded (rows mapped to '1'/'0') for Ayah lookup
- Pause step NOT shown on closing ceremonies (only opening)
- `color` prop flows through AttributeCard/DuaSection with transparency suffixes (`+ '66'`, `+ '08'`)
- ReadinessCheck column labels are contextual per attribute card (`yesLabel`/`notYetLabel`), derived from the `attrFrame` question

## Gotchas
- PrayerOverlay uses `setTimeout`s (not a 1s tick) to flip its before→after message at prayer time and to auto-clear at window end — `onDismiss` kept in a ref so the timers never need recreating
- Pause step dynamically inserted into steps array — step index changes
- Back from Pause returns to Readiness, not previous step
- ResumeOverlay must be explicitly rendered by parent (not auto-shown)
- Missing module data in `modules.js` renders empty sections (no error)
- Every rule in `PropheticPath.css` is scoped under `.prophetic-path`, but `NodePhaseSlideUp`
  portals into `<body>` — outside that subtree. Its portal root therefore carries
  `className="prophetic-path pp-phase-slideup"` + `data-theme`, and
  `.pp-phase-slideup.prophetic-path { display: contents }` strips the root's own 100vh flex box
  while custom properties still inherit. Drop either and the mirror/pill-switch styling silently
  disappears
- `MODULE_ATTRS` is keyed at pillar level, so sub-modules (`faith-salah`) miss keys and fall back
  to their parent pillar. Use `resolveCeremonyData(moduleId, valuesLayer)` from
  `@data/islamic/islamic-data` rather than re-deriving the fallback
