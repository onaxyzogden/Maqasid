# Islamic UI Components — CONTEXT.md

## Purpose
Spiritual UX layer: prayer awareness, ceremony gates, intention setting, readiness checks. This is the Islamic identity of the app — changes must be reviewed for theological accuracy.

## File Inventory
| File | Description |
|------|-------------|
| CeremonyGate.jsx | Pre-entry gate for modules — begin opening or skip |
| ThresholdModal.jsx | Full ceremony flow: Dua → Attributes → Readiness [→ Pause] → Confirm |
| NiyyahAct.jsx | Daily intention ceremony: orient step + pillar focus selection |
| PrayerTime.jsx | Sidebar prayer schedule with geolocation + 5 daily times |
| PrayerOverlay.jsx | Full-screen prayer blocker with countdown, auto-dismiss |
| PrayerWarning.jsx | Toast banner warning of approaching prayer time |
| ReadinessCheck.jsx | Display-only paired rows OR interactive yes/no cards with contextual column labels |
| AttributeCard.jsx | Single attribute display: name (+ Arabic), title, description |
| DuaSection.jsx | Renders Quranic dua: Arabic, transliteration, meaning, source |
| IslamicPanel.jsx | Right sidebar: prayer times, pillar context, threshold buttons |
| ResumeOverlay.jsx | Confirmation overlay when returning to module mid-session |

## Architecture

### CeremonyGate Pattern
All pillar sub-pages gate access behind CeremonyGate:
```jsx
if (!completedOpening[moduleId]) return <CeremonyGate moduleId={moduleId} />;
```
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
- **PrayerWarning** → toast ~5min before prayer ("screen will pause in Xm")
- **PrayerOverlay** → full-screen blocker with countdown, auto-dismisses after `PRAYER_TRAIL_MS`

### NiyyahAct — Daily Intention
2-step flow: (1) Orient (Bismillah + morning dua), (2) Focus (select pillar buttons). Stores via `completeNiyyah(selectedPillars)`.

## Store Dependencies
- **threshold-store**: `setOpeningModuleId`, `completeOpening`, `deferOpening`, `completeNiyyah`, ceremony state
- **settings-store**: `valuesLayer` (islamic/universal text switching)
- **app-store**: `activeModule`, `toggleIslamicPanel`

## Key Patterns
- Every component checks `valuesLayer` for islamic vs universal text
- Readiness keys are binary-encoded (rows mapped to '1'/'0') for Ayah lookup
- Pause step NOT shown on closing ceremonies (only opening)
- `color` prop flows through AttributeCard/DuaSection with transparency suffixes (`+ '66'`, `+ '08'`)
- ReadinessCheck column labels are contextual per attribute card (`yesLabel`/`notYetLabel`), derived from the `attrFrame` question

## Gotchas
- PrayerOverlay countdown uses `Date.now()` in 1-second interval — `onDismiss` kept in ref to avoid re-render breakage
- Pause step dynamically inserted into steps array — step index changes
- Back from Pause returns to Readiness, not previous step
- ResumeOverlay must be explicitly rendered by parent (not auto-shown)
- Missing module data in `modules.js` renders empty sections (no error)
