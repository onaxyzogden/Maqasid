import { useEffect, useCallback, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store/app-store';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { useThresholdStore } from '../../store/threshold-store';
import { useSettingsStore } from '../../store/settings-store';
import { useMobile } from '../../hooks/useMobile';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useInactivity } from '../../hooks/useInactivity';
import { usePrayerTimes } from '../../hooks/usePrayerTimes';
import { PRESENCE_CONFIG } from '@data/islamic/islamic-data';
import { MODULES } from '../../data/modules';
import { MAQASID_PILLARS } from '../../data/maqasid';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MobileNav from './MobileNav';
import SearchPalette from '../shared/SearchPalette';
import IslamicPanel from '../islamic/IslamicPanel';
import ThresholdModal from '../islamic/ThresholdModal';
import ResumeOverlay from '../islamic/ResumeOverlay';
import PrayerOverlay from '../islamic/PrayerOverlay';
import PrayerWarning from '../islamic/PrayerWarning';
import NiyyahAct from '../islamic/NiyyahAct';
import JournalPanel from '../journal/JournalPanel';
import DiscussionPanel from '../discussion/DiscussionPanel';
import Toast from '../shared/Toast';
import PillarFirstEntry from '../onboarding/PillarFirstEntry';
import './AppShell.css';

export default function AppShell() {
  const sidebarOpen = useAppStore((s) => s.sidebarOpen);
  const setSearchOpen = useAppStore((s) => s.setSearchOpen);
  const islamicPanelOpen = useAppStore((s) => s.islamicPanelOpen);
  const toggleIslamicPanel = useAppStore((s) => s.toggleIslamicPanel);
  const activeModule = useAppStore((s) => s.activeModule);
  const setActiveModule = useAppStore((s) => s.setActiveModule);
  const niyyahOverrideOpen = useAppStore((s) => s.niyyahOverrideOpen);
  const closeNiyyahOverride = useAppStore((s) => s.closeNiyyahOverride);
  const location = useLocation();
  const mobile = useMobile();
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);

  // Presence awareness state
  const completedOpening = useThresholdStore((s) => s.completedOpening);
  const resumeModuleId = useThresholdStore((s) => s.resumeModuleId);
  const isPrayerLocked = useThresholdStore((s) => s.isPrayerLocked);
  const currentPrayerName = useThresholdStore((s) => s.currentPrayerName);
  const prayerTimeMs = useThresholdStore((s) => s.prayerTimeMs);
  const prayerWarningName = useThresholdStore((s) => s.prayerWarningName);
  const prayerWarningDismissed = useThresholdStore((s) => s.prayerWarningDismissed);
  const niyyahDate = useThresholdStore((s) => s.niyyahDate);
  const triggerResume = useThresholdStore((s) => s.triggerResume);
  const dismissResume = useThresholdStore((s) => s.dismissResume);
  const setPrayerLock = useThresholdStore((s) => s.setPrayerLock);
  const showPrayerWarning = useThresholdStore((s) => s.showPrayerWarning);
  const dismissPrayerWarning = useThresholdStore((s) => s.dismissPrayerWarning);
  const clearPrayerWarning = useThresholdStore((s) => s.clearPrayerWarning);

  // Wire Cmd+K to open search
  useKeyboard('mod+k', () => setSearchOpen(true), [setSearchOpen]);

  // Wire Cmd+I to toggle Islamic panel
  useKeyboard('mod+i', () => toggleIslamicPanel(), [toggleIslamicPanel]);

  // Clear niyyahOverrideOpen on route change to prevent modal re-trigger
  useEffect(() => {
    if (niyyahOverrideOpen) closeNiyyahOverride();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Dismiss stale resume overlay when route changes — the snapshot was captured
  // for the previous module and should not follow the user to a new page.
  useEffect(() => {
    if (resumeModuleId) dismissResume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Sync activeModule with current URL — covers all navigation paths (back/forward, in-page links, pillar headers)
  // that don't go through the sidebar submodule onClick handler.
  useEffect(() => {
    const parts = location.pathname.replace(/^\/app\/?/, '').split('/');
    const segment = parts[0];
    if (!segment || segment === 'settings') return;
    if (segment === 'pillar') {
      const pillarId = parts[1];
      if (!pillarId) return;
      const coreId = `${pillarId}-core`;
      if (MODULES.some((m) => m.id === coreId)) {
        setActiveModule(coreId);
        return;
      }
      const pillar = MAQASID_PILLARS.find((p) => p.id === pillarId);
      const fallback = pillar?.subModuleIds?.[0];
      if (fallback) setActiveModule(fallback);
      return;
    }
    setActiveModule(segment);
  }, [location.pathname]);

  // Preload all project tasks so cross-project search works
  useEffect(() => {
    projects.forEach((p) => loadTasks(p.id));
  }, [projects.length]);

  // Inactivity detection — resume overlay on return
  const handleResume = useCallback(() => {
    if (completedOpening[activeModule]) {
      triggerResume(activeModule);
    }
  }, [completedOpening, activeModule, triggerResume]);

  useInactivity({
    timeoutMs: PRESENCE_CONFIG.INACTIVITY_TIMEOUT_MS,
    onResume: handleResume,
  });

  // Prayer time detection
  const { activePrayer, nextPrayer } = usePrayerTimes();

  // Prayer lock — triggers 5 min before prayer
  const dismissedPrayerRef = useRef(null);

  useEffect(() => {
    if (activePrayer && !isPrayerLocked && valuesLayer === 'islamic' && dismissedPrayerRef.current !== activePrayer.name) {
      setPrayerLock(true, activePrayer.name, activePrayer.msRemaining, activePrayer.prayerTimeMs);
    }
    // Reset dismissed ref when we move to a different prayer
    if (!activePrayer) {
      dismissedPrayerRef.current = null;
    }
  }, [activePrayer?.name, isPrayerLocked, valuesLayer]);

  // Prayer warning — triggers 15 min before prayer
  useEffect(() => {
    if (
      nextPrayer?.remainingMs != null
      && nextPrayer.remainingMs <= PRESENCE_CONFIG.PRAYER_WARNING_LEAD_MS
      && nextPrayer.remainingMs > PRESENCE_CONFIG.PRAYER_LEAD_MS
      && valuesLayer === 'islamic'
      && prayerWarningName !== nextPrayer.name
    ) {
      showPrayerWarning(nextPrayer.name);
    }
    // Clear warning when lock activates
    if (isPrayerLocked && prayerWarningName) {
      clearPrayerWarning();
    }
  }, [nextPrayer?.remainingMs, isPrayerLocked]);

  // Prayer dismiss handler — chain into resume overlay
  const handlePrayerDismiss = useCallback(() => {
    dismissedPrayerRef.current = currentPrayerName;
    setPrayerLock(false, null, null);
    if (completedOpening[activeModule]) {
      triggerResume(activeModule);
    }
  }, [setPrayerLock, completedOpening, activeModule, triggerResume]);

  // Daily Niyyah Act gate
  const today = new Date().toISOString().slice(0, 10);
  const niyyahNeeded = niyyahDate !== today;

  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const sidebarWidthPx = useAppStore((s) => s.sidebarWidthPx);
  const setSidebarWidth = useAppStore((s) => s.setSidebarWidth);
  const islamicPanelWidthPx = useAppStore((s) => s.islamicPanelWidthPx);
  const setIslamicPanelWidth = useAppStore((s) => s.setIslamicPanelWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [isRightDragging, setIsRightDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, startW: 248, moved: false });
  const rightDragStartRef = useRef({ x: 0, startW: 280, moved: false });

  const sidebarPx = sidebarOpen ? `${sidebarWidthPx}px` : '64px';
  const edgePx = '28px';
  const panelPx = `${islamicPanelWidthPx}px`;
  const gridCols = mobile
    ? '1fr'
    : `${sidebarPx} ${edgePx} 1fr ${islamicPanelOpen ? edgePx : '0px'} ${islamicPanelOpen ? panelPx : '0px'}`;

  const handleEdgePointerDown = (e) => {
    // Only handle left mouse button / primary touch
    if (e.button !== undefined && e.button !== 0) return;
    dragStartRef.current = { x: e.clientX, startW: sidebarWidthPx, moved: false };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const handleEdgePointerMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartRef.current.x;
    if (Math.abs(delta) >= 5) {
      dragStartRef.current.moved = true;
      const newW = dragStartRef.current.startW + delta;
      if (newW < 80) {
        // Snap to collapsed
        if (sidebarOpen) toggleSidebar();
        return;
      }
      setSidebarWidth(newW);
    }
  };

  const handleEdgePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    // If no meaningful movement, treat as a click toggle
    if (!dragStartRef.current.moved) {
      toggleSidebar();
    }
  };

  // ── Right edge (Islamic panel) drag handlers ──
  const handleRightEdgePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    rightDragStartRef.current = { x: e.clientX, startW: islamicPanelWidthPx, moved: false };
    setIsRightDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const handleRightEdgePointerMove = (e) => {
    if (!isRightDragging) return;
    const delta = e.clientX - rightDragStartRef.current.x;
    if (Math.abs(delta) >= 5) {
      rightDragStartRef.current.moved = true;
      // Right edge: drag left = panel wider (negate delta)
      const newW = rightDragStartRef.current.startW - delta;
      if (newW < 80) {
        if (islamicPanelOpen) toggleIslamicPanel();
        return;
      }
      setIslamicPanelWidth(newW);
    }
  };

  const handleRightEdgePointerUp = (e) => {
    if (!isRightDragging) return;
    setIsRightDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (!rightDragStartRef.current.moved) {
      toggleIslamicPanel();
    }
  };

  // Minutes until prayer itself, and minutes until the lock screen activates
  const minutesUntilPrayer = nextPrayer?.remainingMs != null
    ? Math.ceil(nextPrayer.remainingMs / 60000)
    : 0;
  const minutesUntilLock = nextPrayer?.remainingMs != null
    ? Math.ceil((nextPrayer.remainingMs - PRESENCE_CONFIG.PRAYER_LEAD_MS) / 60000)
    : 0;

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className={`app-shell${isDragging || isRightDragging ? ' app-shell--dragging' : ''}`} style={{ gridTemplateColumns: gridCols }}>
        <TopBar />
        <Sidebar />
        {!mobile && (
          <div
            className="col-edge"
            aria-hidden="true"
            style={{ gridColumn: 2, gridRow: '2 / -1' }}
            onPointerDown={handleEdgePointerDown}
            onPointerMove={handleEdgePointerMove}
            onPointerUp={handleEdgePointerUp}
          >
            <div className="col-edge__line" />
            <button
              className="col-edge__toggle"
              tabIndex={-1}
              aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSidebar(); } }}
            >
              {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>
          </div>
        )}
        <main id="main-content" key={location.key} className="app-main">
          <Outlet />
        </main>
        {!mobile && (
          <div
            className={`col-edge${islamicPanelOpen ? '' : ' col-edge--hidden'}`}
            aria-hidden="true"
            style={{ gridColumn: 4, gridRow: '2 / -1' }}
            onPointerDown={islamicPanelOpen ? handleRightEdgePointerDown : undefined}
            onPointerMove={islamicPanelOpen ? handleRightEdgePointerMove : undefined}
            onPointerUp={islamicPanelOpen ? handleRightEdgePointerUp : undefined}
          >
            {islamicPanelOpen && (
              <>
                <div className="col-edge__line" />
                <button
                  className="col-edge__toggle"
                  tabIndex={-1}
                  aria-label="Close Islamic panel"
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleIslamicPanel(); } }}
                >
                  <ChevronRight size={14} />
                </button>
              </>
            )}
          </div>
        )}
        {!mobile && (
          <div className={`il-wrapper${islamicPanelOpen ? ' il-wrapper--open' : ''}`} style={{ gridColumn: 5, gridRow: '1 / -1' }}>
            <IslamicPanel />
          </div>
        )}
        {mobile && islamicPanelOpen && (
          <>
            <div className="il-mobile-backdrop" onClick={toggleIslamicPanel} />
            <div className="il-mobile-panel">
              <IslamicPanel />
            </div>
          </>
        )}
        {mobile && <MobileNav />}
      </div>
      <SearchPalette />
      <ThresholdModal type="opening" />
      <ThresholdModal type="closing" />
      {resumeModuleId && !isPrayerLocked && (
        <ResumeOverlay moduleId={resumeModuleId} onDismiss={dismissResume} />
      )}
      {isPrayerLocked && (
        <PrayerOverlay
          prayerName={currentPrayerName}
          prayerTimeMs={prayerTimeMs}
          onDismiss={handlePrayerDismiss}
        />
      )}
      {(niyyahNeeded || niyyahOverrideOpen) && (
        <NiyyahAct
          initialStep={niyyahNeeded ? 'dua' : 'pillars'}
          onClose={closeNiyyahOverride}
        />
      )}
      {prayerWarningName && !prayerWarningDismissed && !isPrayerLocked && (
        <PrayerWarning
          prayerName={prayerWarningName}
          minutesUntilPrayer={minutesUntilPrayer}
          minutesUntilLock={minutesUntilLock}
          onDismiss={dismissPrayerWarning}
        />
      )}


      <JournalPanel />
      <DiscussionPanel />
      <PillarFirstEntry />
      <Toast />
    </>
  );
}
