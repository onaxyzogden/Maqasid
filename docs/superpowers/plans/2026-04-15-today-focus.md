# Today's Focus — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Today's Focus" section to the main Dashboard that shows pillar focus cards when the user has set their niyyah focus, or a CTA prompt when they haven't.

**Architecture:** NiyyahAct gains a second step (pillar selection) using CSS classes already present in NiyyahAct.css. A `niyyahOverrideOpen` flag in app-store lets the Dashboard re-open NiyyahAct after it has been dismissed. A new `TodayFocusSection` component reads `niyyahFocus` from threshold-store and renders either focus cards or a CTA, replacing the existing compact `insight-niyyah-row` in Dashboard.

**Tech Stack:** React 19, Zustand 5, React Router 7 (`<Link>`), Lucide React icons, plain CSS modules.

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Modify | `src/store/app-store.js` | Add `niyyahOverrideOpen` bool + open/close actions |
| Modify | `src/components/islamic/NiyyahAct.jsx` | Add 2-step flow (dua → pillar selection), accept `initialStep` + `onClose` props |
| Modify | `src/components/layout/AppShell.jsx` | Wire `niyyahOverrideOpen` to render NiyyahAct on demand |
| Create | `src/pages/TodayFocusSection.jsx` | Renders focus cards or CTA based on `niyyahFocus` |
| Create | `src/pages/TodayFocusSection.css` | Scoped styles for focus cards and CTA |
| Modify | `src/pages/Dashboard.jsx` | Replace `insight-niyyah-row` with `<TodayFocusSection>` |

---

## Task 1: Add `niyyahOverrideOpen` to app-store

**Files:**
- Modify: `src/store/app-store.js`

The store currently has no way to re-open NiyyahAct after it has been dismissed. We add a transient boolean flag + two actions. This is in-memory only (no localStorage persistence needed — it resets on page load, which is correct).

- [ ] **Step 1: Add state and actions**

  Open `src/store/app-store.js`. After this line (currently line 24):
  ```js
  citationsVisible: false,
  ```

  Add:
  ```js
  niyyahOverrideOpen: false,
  ```

  After the `toggleCitations` action (currently line 89):
  ```js
  toggleCitations: () => set((s) => ({ citationsVisible: !s.citationsVisible })),
  ```

  Add:
  ```js
  openNiyyahOverride: () => set({ niyyahOverrideOpen: true }),
  closeNiyyahOverride: () => set({ niyyahOverrideOpen: false }),
  ```

- [ ] **Step 2: Verify build**

  Run: `npm run build`
  Expected: clean build, no errors.

- [ ] **Step 3: Commit**

  ```bash
  git add src/store/app-store.js
  git commit -m "feat: add niyyahOverrideOpen flag to app-store"
  ```

---

## Task 2: Add pillar selection step to NiyyahAct

**Files:**
- Modify: `src/components/islamic/NiyyahAct.jsx`

NiyyahAct currently has one step: a Dua + "Bismillah — Begin" button that calls `completeNiyyah(['confirmed'])`. The CSS file already has all needed classes: `.niyyah-pillars`, `.niyyah-pillar-btn`, `.niyyah-pillar-btn--selected`, `.niyyah-pillar-dot`, `.niyyah-pillar-label`, `.niyyah-pillar-root`, `.niyyah-steps`, `.niyyah-step-dot`, `.niyyah-step-dot--active`, `.niyyah-step-dot--done`. We just need to use them.

New behaviour:
- Step `'dua'`: existing Dua content. "Skip" → `skipNiyyah(); onClose?.()`. "Bismillah — Begin" → advance to `'pillars'`.
- Step `'pillars'`: 7-pillar multi-select grid. "Skip" → `completeNiyyah([]); onClose?.()`. "Set Focus →" (disabled when 0 selected) → `completeNiyyah(selectedIds); onClose?.()`.
- `initialStep` prop (default `'dua'`) lets AppShell open directly to pillar selection when the user already confirmed their dua today.
- `onClose` prop (optional) is called after any action that closes the overlay — needed for the override case.

- [ ] **Step 1: Rewrite NiyyahAct.jsx**

  Replace the entire contents of `src/components/islamic/NiyyahAct.jsx` with:

  ```jsx
  import { useState } from 'react';
  import { Sun } from 'lucide-react';
  import { useThresholdStore } from '../../store/threshold-store';
  import { useSettingsStore } from '../../store/settings-store';
  import { useCitations } from '../../hooks/useCitations';
  import { MAQASID_PILLARS } from '../../data/maqasid';
  import DuaSection from './DuaSection';
  import ReferenceList from './ReferenceList';
  import IslamicTerm from '../shared/IslamicTerm';
  import './NiyyahAct.css';

  const MORNING_DUA = {
    title: 'Morning Supplication',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    trans: 'Aṣbaḥnā wa aṣbaḥa l-mulku lillāh, wa l-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah, lahu l-mulku wa lahu l-ḥamd, wa huwa ʿalā kulli shayʾin qadīr',
    meaning: 'We have entered the morning, and the dominion belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone without partner; to Him belongs the dominion, to Him belongs all praise, and He is over all things capable.',
    source: 'Sahih Muslim 2723',
  };

  const EVENING_DUA = {
    title: 'Evening Supplication',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    trans: 'Amsaynā wa amsa l-mulku lillāh, wa l-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah, lahu l-mulku wa lahu l-ḥamd, wa huwa ʿalā kulli shayʾin qadīr',
    meaning: 'We have entered the evening, and the dominion belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone without partner; to Him belongs the dominion, to Him belongs all praise, and He is over all things capable.',
    source: 'Sahih Muslim 2723',
  };

  const UNIVERSAL_PROMPT = {
    meaning: 'Take a moment to set your intention for today. What matters most? Where will you direct your energy with purpose and clarity?',
  };

  const getDua = () => (new Date().getHours() < 12 ? MORNING_DUA : EVENING_DUA);

  export default function NiyyahAct({ initialStep = 'dua', onClose }) {
    const completeNiyyah = useThresholdStore((s) => s.completeNiyyah);
    const skipNiyyah = useThresholdStore((s) => s.skipNiyyah);
    const valuesLayer = useSettingsStore((s) => s.valuesLayer);
    const isIslamic = valuesLayer === 'islamic';
    const dua = getDua();
    const { citations, citationMap, citationsVisible } = useCitations(
      isIslamic ? [dua.source] : []
    );

    const [step, setStep] = useState(initialStep);
    const [selected, setSelected] = useState([]);

    function togglePillar(id) {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }

    function handleSkipAll() {
      skipNiyyah();
      onClose?.();
    }

    function handleBegin() {
      setStep('pillars');
    }

    function handleSetFocus() {
      completeNiyyah(selected);
      onClose?.();
    }

    function handleSkipFocus() {
      completeNiyyah([]);
      onClose?.();
    }

    const showStepDots = initialStep === 'dua';

    return (
      <div className="niyyah-overlay">
        <div className="niyyah-card">
          {/* Header */}
          <div className="niyyah-header">
            <span className="niyyah-badge">
              {isIslamic ? (
                <><IslamicTerm id="al-rahman">AL-RAHMĀN</IslamicTerm> · <IslamicTerm id="al-rahim">AL-RAHĪM</IslamicTerm></>
              ) : 'DAILY ORIENTATION'}
            </span>
            <h2 className="niyyah-title">
              {step === 'dua'
                ? (isIslamic ? <>Daily <IslamicTerm id="niyyah">Niyyah</IslamicTerm></> : 'Daily Intention')
                : "Today's Focus"}
            </h2>
            <p className="niyyah-subtitle">
              {step === 'dua'
                ? (isIslamic
                    ? 'Orient yourself under divine mercy before entering your work'
                    : 'Set your focus before entering your workspace')
                : 'Which pillars will you direct your energy toward today?'}
            </p>
          </div>

          {/* Step indicator dots */}
          {showStepDots && (
            <div className="niyyah-steps">
              <div className={`niyyah-step-dot ${step === 'dua' ? 'niyyah-step-dot--active' : 'niyyah-step-dot--done'}`} />
              <div className={`niyyah-step-dot ${step === 'pillars' ? 'niyyah-step-dot--active' : ''}`} />
            </div>
          )}

          {/* Body */}
          <div className="niyyah-body">
            {step === 'dua' ? (
              isIslamic ? (
                <>
                  <div className="niyyah-bismillah">
                    <p className="niyyah-bismillah-ar">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                    <p className="niyyah-bismillah-en">In the name of Allah, the Most Gracious, the Most Merciful</p>
                  </div>
                  <DuaSection
                    dua={dua}
                    color="var(--accent)"
                    citationIndex={citationMap[dua.source]}
                    showCitations={citationsVisible}
                  />
                </>
              ) : (
                <div className="niyyah-mindfulness">
                  <p className="niyyah-mindfulness-text">{UNIVERSAL_PROMPT.meaning}</p>
                </div>
              )
            ) : (
              <>
                <p className="niyyah-focus-heading">Select pillar(s)</p>
                <div className="niyyah-pillars">
                  {MAQASID_PILLARS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`niyyah-pillar-btn${selected.includes(p.id) ? ' niyyah-pillar-btn--selected' : ''}`}
                      onClick={() => togglePillar(p.id)}
                    >
                      <span className="niyyah-pillar-dot" style={{ background: p.accentColor }} />
                      <span>
                        <span className="niyyah-pillar-label">{p.sidebarLabel}</span>
                        <span className="niyyah-pillar-root">{p.arabicRootAr}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <ReferenceList citations={citations} visible={citationsVisible && isIslamic && step === 'dua'} />

          {/* Footer */}
          <div className="niyyah-footer">
            {step === 'dua' ? (
              <>
                <button className="niyyah-skip" onClick={handleSkipAll}>
                  Skip
                </button>
                <button className="niyyah-confirm" onClick={handleBegin}>
                  <Sun size={16} />
                  {isIslamic ? <><IslamicTerm id="bismillah">Bismillah</IslamicTerm> — Begin</> : 'Begin'}
                </button>
              </>
            ) : (
              <>
                <button className="niyyah-skip" onClick={handleSkipFocus}>
                  Skip
                </button>
                <button
                  className="niyyah-confirm"
                  onClick={handleSetFocus}
                  disabled={selected.length === 0}
                >
                  Set Focus →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
  ```

- [ ] **Step 2: Verify build**

  Run: `npm run build`
  Expected: clean build, no errors.

- [ ] **Step 3: Smoke-test in browser**

  Start: `npm run dev`
  - Clear today's niyyah in DevTools: `localStorage.removeItem('bbiz_thr_niyyah_date'); location.reload()`
  - Verify step 1 shows Dua + step dots
  - Click "Bismillah — Begin" → step 2 shows pillar grid
  - Select 2 pillars → "Set Focus →" enables
  - Click "Set Focus →" → modal closes, check `JSON.parse(localStorage.getItem('bbiz_thr_niyyah_focus'))` = `['<pillar1>', '<pillar2>']`

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/islamic/NiyyahAct.jsx
  git commit -m "feat: add pillar selection step to NiyyahAct"
  ```

---

## Task 3: Wire `niyyahOverrideOpen` in AppShell

**Files:**
- Modify: `src/components/layout/AppShell.jsx`

AppShell currently renders `{niyyahNeeded && <NiyyahAct />}` at line 286. We need to also render NiyyahAct when `niyyahOverrideOpen` is true (i.e., user clicked "Set focus →" on the dashboard after already completing their niyyah today). When opened via override, we skip the dua step (`initialStep="pillars"`) and call `closeNiyyahOverride` when the user is done.

- [ ] **Step 1: Read the current import line for useAppStore**

  Confirm `useAppStore` is already imported (it is, at line 3):
  ```js
  import { useAppStore } from '../../store/app-store';
  ```

- [ ] **Step 2: Add niyyahOverrideOpen and closeNiyyahOverride selectors**

  In `src/components/layout/AppShell.jsx`, find the block that reads from useAppStore (around lines 30–34):
  ```js
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSearchOpen = useAppStore((s) => s.setSearchOpen);
  const islamicPanelOpen = useAppStore((s) => s.islamicPanelOpen);
  const toggleIslamicPanel = useAppStore((s) => s.toggleIslamicPanel);
  const activeModule = useAppStore((s) => s.activeModule);
  ```

  Add these two lines immediately after that block:
  ```js
  const niyyahOverrideOpen = useAppStore((s) => s.niyyahOverrideOpen);
  const closeNiyyahOverride = useAppStore((s) => s.closeNiyyahOverride);
  ```

- [ ] **Step 3: Update the NiyyahAct render condition**

  Find line 286:
  ```jsx
  {niyyahNeeded && <NiyyahAct />}
  ```

  Replace with:
  ```jsx
  {(niyyahNeeded || niyyahOverrideOpen) && (
    <NiyyahAct
      initialStep={niyyahNeeded ? 'dua' : 'pillars'}
      onClose={closeNiyyahOverride}
    />
  )}
  ```

- [ ] **Step 4: Verify build**

  Run: `npm run build`
  Expected: clean build, no errors.

- [ ] **Step 5: Commit**

  ```bash
  git add src/components/layout/AppShell.jsx
  git commit -m "feat: wire niyyahOverrideOpen in AppShell to re-open NiyyahAct"
  ```

---

## Task 4: Create TodayFocusSection component

**Files:**
- Create: `src/pages/TodayFocusSection.jsx`
- Create: `src/pages/TodayFocusSection.css`

This component has two render paths:

**Cards path** (`niyyahFocus` contains real pillar IDs):
- Renders one card per focused pillar in a flex row
- Each card: left accent bar, pillar icon (Lucide), "Today's Focus" eyebrow, pillar name, Arabic root, open/overdue meta, "Go →" Link to `/app/pillar/{id}`

**CTA path** (`niyyahFocus` is empty, `['_skipped']`, or has no valid pillar IDs):
- Single dashed-border row: ⚡ icon, title + subtitle, "Set focus →" button that calls `openNiyyahOverride()`

Task counts come from the `pillarSummary` prop (computed in Dashboard, passed down — avoids re-computing).

- [ ] **Step 1: Create TodayFocusSection.jsx**

  Create `src/pages/TodayFocusSection.jsx`:

  ```jsx
  import { Link } from 'react-router-dom';
  import { Compass, HeartPulse, Brain, Users, Coins, TreePine, Globe, Kanban } from 'lucide-react';
  import { useThresholdStore } from '../store/threshold-store';
  import { useAppStore } from '../store/app-store';
  import { MAQASID_PILLARS } from '../data/maqasid';
  import './TodayFocusSection.css';

  const PILLAR_ICONS = { Compass, HeartPulse, Brain, Users, Coins, TreePine, Globe };

  // pillarSummary: Array<{ pillar: object, openCount: number, overdueCount: number }>
  export default function TodayFocusSection({ pillarSummary }) {
    const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);
    const openNiyyahOverride = useAppStore((s) => s.openNiyyahOverride);

    const focusedIds = (niyyahFocus || []).filter(
      (id) => id !== '_skipped' && MAQASID_PILLARS.some((p) => p.id === id)
    );

    if (focusedIds.length === 0) {
      return (
        <div className="tfs-cta">
          <div className="tfs-cta__icon">⚡</div>
          <div className="tfs-cta__body">
            <div className="tfs-cta__title">Set your focus for today</div>
            <div className="tfs-cta__sub">Choose which pillar(s) to direct your energy toward.</div>
          </div>
          <button className="tfs-cta__btn" type="button" onClick={openNiyyahOverride}>
            Set focus →
          </button>
        </div>
      );
    }

    return (
      <div className="tfs-cards">
        {focusedIds.map((pid) => {
          const pillar = MAQASID_PILLARS.find((p) => p.id === pid);
          if (!pillar) return null;
          const summary = pillarSummary.find((s) => s.pillar.id === pid);
          const openCount = summary?.openCount ?? 0;
          const overdueCount = summary?.overdueCount ?? 0;
          const meta = overdueCount > 0
            ? `${openCount} open · ${overdueCount} overdue`
            : `${openCount} open`;
          const Icon = PILLAR_ICONS[pillar.icon] ?? Kanban;
          return (
            <div
              key={pid}
              className="tfs-card"
              style={{
                borderColor: pillar.accentColor + '30',
                background: pillar.accentColor + '08',
              }}
            >
              <div className="tfs-card__bar" style={{ background: pillar.accentColor }} />
              <div
                className="tfs-card__icon"
                style={{ background: pillar.accentColor + '18', color: pillar.accentColor }}
              >
                <Icon size={18} />
              </div>
              <div className="tfs-card__body">
                <div className="tfs-card__eyebrow" style={{ color: pillar.accentColor }}>
                  Today&apos;s Focus
                </div>
                <div className="tfs-card__name">{pillar.sidebarLabel}</div>
                <div className="tfs-card__arabic" style={{ color: pillar.accentColor + '80' }}>
                  {pillar.arabicRootAr}
                </div>
                <div className="tfs-card__meta">{meta}</div>
              </div>
              <Link
                to={`/app/pillar/${pillar.id}`}
                className="tfs-card__btn"
                style={{ background: pillar.accentColor + '18', color: pillar.accentColor }}
              >
                Go →
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
  ```

- [ ] **Step 2: Create TodayFocusSection.css**

  Create `src/pages/TodayFocusSection.css`:

  ```css
  /* ── Focus cards (niyyah set) ── */
  .tfs-cards {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 12px;
  }

  .tfs-card {
    flex: 1;
    min-width: 160px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid;
    position: relative;
    overflow: hidden;
    transition: filter 0.15s;
  }

  .tfs-card:hover {
    filter: brightness(1.05);
  }

  .tfs-card__bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
  }

  .tfs-card__icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .tfs-card__body {
    flex: 1;
    min-width: 0;
  }

  .tfs-card__eyebrow {
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 2px;
  }

  .tfs-card__name {
    font-size: 15px;
    font-weight: 700;
    color: #e4e8f4;
    line-height: 1.1;
  }

  .tfs-card__arabic {
    font-size: 11px;
    margin-top: 1px;
  }

  .tfs-card__meta {
    font-size: 11px;
    margin-top: 3px;
    color: #4a5068;
  }

  .tfs-card__btn {
    padding: 5px 11px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    text-decoration: none;
    display: inline-block;
  }

  /* ── CTA prompt (niyyah not set / skipped) ── */
  .tfs-cta {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border-radius: 10px;
    background: #0c0e18;
    border: 1px dashed #2a3047;
    margin-bottom: 12px;
  }

  .tfs-cta__icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: #161a2a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .tfs-cta__body {
    flex: 1;
  }

  .tfs-cta__title {
    font-size: 13px;
    font-weight: 600;
    color: #8892aa;
  }

  .tfs-cta__sub {
    font-size: 11px;
    color: #3a4060;
    margin-top: 2px;
  }

  .tfs-cta__btn {
    padding: 7px 16px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 700;
    background: #1e2438;
    color: #c8ccd8;
    border: 1px solid #2a3047;
    cursor: pointer;
    flex-shrink: 0;
  }
  ```

- [ ] **Step 3: Verify build**

  Run: `npm run build`
  Expected: clean build, no errors.

- [ ] **Step 4: Commit**

  ```bash
  git add src/pages/TodayFocusSection.jsx src/pages/TodayFocusSection.css
  git commit -m "feat: create TodayFocusSection component"
  ```

---

## Task 5: Wire TodayFocusSection into Dashboard

**Files:**
- Modify: `src/pages/Dashboard.jsx`

Replace the existing `insight-niyyah-row` block (lines 458–473) with `<TodayFocusSection>`. The `pillarSummary` value is already computed in Dashboard's `useMemo` at line 378 — just pass it as a prop.

- [ ] **Step 1: Add import**

  In `src/pages/Dashboard.jsx`, after the existing imports (e.g., after line 15 which imports `PillarProgressStrip`), add:

  ```jsx
  import TodayFocusSection from './TodayFocusSection';
  ```

- [ ] **Step 2: Replace the niyyah row**

  Find this block (lines 458–473):
  ```jsx
  {/* ── Niyyah focus row ── */}
  {niyyahFocus?.length > 0 && (
    <div className="insight-niyyah-row">
      <Zap size={14} style={{ color: 'var(--accent)' }} />
      <span className="insight-niyyah-label">Today&apos;s focus:</span>
      {niyyahFocus.map((pid) => {
        const p = MAQASID_PILLARS.find((pl) => pl.id === pid);
        if (!p) return null;
        return (
          <span key={pid} className="insight-niyyah-pill" style={{ color: p.accentColor, borderColor: p.accentColor + '50', background: p.accentColor + '14' }}>
            {p.sidebarLabel}
          </span>
        );
      })}
    </div>
  )}
  ```

  Replace with:
  ```jsx
  {/* ── Today's Focus ── */}
  <TodayFocusSection pillarSummary={pillarSummary} />
  ```

- [ ] **Step 3: Verify build**

  Run: `npm run build`
  Expected: clean build, no errors.

- [ ] **Step 4: Verify in browser — CTA state**

  Start: `npm run dev` and open the Dashboard.

  Force CTA state (no focus set):
  ```js
  localStorage.removeItem('bbiz_thr_niyyah_date');
  localStorage.removeItem('bbiz_thr_niyyah_focus');
  location.reload();
  ```
  Expected: dashed CTA block shows — "Set your focus for today" + "Set focus →" button.

  Click "Set focus →":
  Expected: NiyyahAct opens at the pillar selection step (no dua, goes directly to pillar grid).

  Select 2 pillars, click "Set Focus →":
  Expected: modal closes, dashboard now shows focus cards for selected pillars.

- [ ] **Step 5: Verify in browser — cards state**

  Force focus with specific pillars:
  ```js
  localStorage.setItem('bbiz_thr_niyyah_date', new Date().toISOString().slice(0, 10));
  localStorage.setItem('bbiz_thr_niyyah_focus', JSON.stringify(['faith', 'wealth']));
  location.reload();
  ```
  Expected: two cards side by side — Faith (gold accent, حفظ الدين, task count) and Wealth (green accent, حفظ المال, task count). "Go →" on Faith card links to `/app/pillar/faith`.

- [ ] **Step 6: Verify first-time NiyyahAct still works**

  With `bbiz_thr_niyyah_date` removed, reload → NiyyahAct auto-shows at step 1 (dua). Complete both steps. Dashboard shows focus cards. Page reload → NiyyahAct does NOT re-show.

- [ ] **Step 7: Commit**

  ```bash
  git add src/pages/Dashboard.jsx
  git commit -m "feat: add Today's Focus section to dashboard"
  ```

---

## Verification Summary

| Scenario | Expected result |
|---|---|
| `niyyahFocus = []`, no date | CTA state |
| `niyyahFocus = ['_skipped']` | CTA state |
| `niyyahFocus = ['faith', 'wealth']` | Two pillar cards |
| Click "Set focus →" (skipped state) | NiyyahAct opens at pillar step |
| First open today | NiyyahAct opens at dua step with step dots |
| Click "Begin" in NiyyahAct | Advances to pillar grid |
| "Skip" on pillar step | `niyyahFocus = []`, dashboard shows CTA |
| "Set Focus →" with 0 pillars | Button stays disabled |
| Click "Go →" on a card | Navigates to `/app/pillar/{id}` |
| Desktop viewport | Focus cards display side by side |
| Mobile viewport (≤600px) | Cards wrap to stacked layout |
