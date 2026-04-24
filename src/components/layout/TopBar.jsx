import { useState, useEffect, useRef } from 'react';
import { useLocation, NavLink, Link } from 'react-router-dom';
import { SunMoon, Menu, MoonStar, Compass, Clock, PenLine, MessageCircle, MessageCircleOff, MessagesSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useSettingsStore } from '../../store/settings-store';
import { useAuthStore } from '../../store/auth-store';
import { useProjectStore } from '../../store/project-store';
import { useMobile } from '../../hooks/useMobile';
import { useArabic } from '../../hooks/useArabic';
import ClockInModal from '../people/hr/ClockInModal';
import '../islamic/AyahBanner.css';
import '../islamic/DuaSection.css';
import './TopBar.css';

function getBreadcrumb(pathname, projects) {
  const parts = pathname.replace('/app', '').split('/').filter(Boolean);
  if (parts.length === 0) return 'Dashboard';

  // Project route: /app/work/:projectId/...
  if (parts[0] === 'work' && parts[1]) {
    const project = projects?.find((p) => p.id === parts[1]);
    if (project) return project.name;
  }

  // Pillar detail route: /app/faith-salah, /app/wealth-earning, etc.
  const labels = { work: 'Work', money: 'Money', people: 'People', office: 'Office', tech: 'Tech', settings: 'Settings', sources: 'Primary Sources' };
  const sub = parts[0];
  if (labels[sub]) return labels[sub];

  // Format hyphenated submodule names: 'faith-salah' → 'Salah' (faith badge handles pillar identity)
  if (sub.startsWith('faith-')) {
    const submodule = sub.split('-').slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return submodule;
  }
  if (sub.includes('-')) {
    return sub.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' — ');
  }

  // Pillar route: /app/pillar/:pillarId
  if (sub === 'pillar' && parts[1]) {
    return parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
  }

  return sub.charAt(0).toUpperCase() + sub.slice(1);
}

const WORK_TABS = [
  { path: 'pipeline', label: 'Pipeline' },
  { path: 'people', label: 'People' },
  { path: 'tasks', label: 'Tasks' },
  { path: 'money', label: 'Money' },
  { path: 'assets', label: 'Assets' },
  { path: 'office', label: 'Office' },
  { path: 'tech', label: 'Tech' },
  { path: 'journal', label: 'Journal' },
];

function getProjectBase(pathname) {
  const match = pathname.match(/^\/app\/work\/([^/]+)/);
  if (!match) return null;
  return `/app/work/${match[1]}`;
}

export default function TopBar() {
  const location = useLocation();
  const mobile = useMobile();
  const fmt = useArabic();
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const islamicPanelOpen = useAppStore((s) => s.islamicPanelOpen);
  const islamicPanelWidthPx = useAppStore((s) => s.islamicPanelWidthPx);
  const toggleIslamicPanel = useAppStore((s) => s.toggleIslamicPanel);
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const user = useAuthStore((s) => s.user);
  const projects = useProjectStore((s) => s.projects);
  const tooltipsEnabled = useSettingsStore((s) => s.tooltipsEnabled);
  const setTooltipsEnabled = useSettingsStore((s) => s.setTooltipsEnabled);
  const setReflectionOpen = useAppStore((s) => s.setReflectionOpen);
  const setDiscussionOpen = useAppStore((s) => s.setDiscussionOpen);
  const citationsVisible = useAppStore((s) => s.citationsVisible);
  const ayahBannerData = useAppStore((s) => s.ayahBannerData);
  const ayahBannerCollapsed = useAppStore((s) => s.ayahBannerCollapsed);
  const toggleAyahBannerCollapsed = useAppStore((s) => s.toggleAyahBannerCollapsed);
  const bannerRef = useRef(null);
  const [clockInOpen, setClockInOpen] = useState(false);

  const tip = (text) => tooltipsEnabled ? text : undefined;

  const projectBase = getProjectBase(location.pathname);
  const showWorkTabs = !!projectBase;
  const isFaithRoute = location.pathname.startsWith('/app/faith') || location.pathname === '/app/pillar/faith';

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) {
      document.body.classList.remove('ayah-banner-active');
      document.documentElement.style.removeProperty('--verse-banner-h');
      return;
    }
    document.body.classList.add('ayah-banner-active');
    const ro = new ResizeObserver(([entry]) => {
      const h = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      document.documentElement.style.setProperty('--verse-banner-h', `${h}px`);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.classList.remove('ayah-banner-active');
      document.documentElement.style.removeProperty('--verse-banner-h');
    };
  }, [ayahBannerData, ayahBannerCollapsed]);

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          {mobile && (
            <button className="topbar-btn" onClick={toggleSidebar} title={tip('Menu')} aria-label="Toggle sidebar">
              <Menu size={20} />
            </button>
          )}
          {isFaithRoute && !mobile && (
            <Link to="/app/faith-core" className="faith-badge faith-badge--module topbar-faith-badge topbar-faith-badge--link">
              MODULE I
            </Link>
          )}
          <span className="topbar-breadcrumb">{getBreadcrumb(location.pathname, projects)}</span>
        </div>
        {showWorkTabs && (
          <div className="topbar-center">
            {WORK_TABS.map((tab) => {
              const to = tab.path === 'pipeline' ? projectBase : `${projectBase}/${tab.path}`;
              const end = tab.path === 'pipeline';
              return (
                <NavLink
                  key={tab.path}
                  to={to}
                  end={end}
                  className={({ isActive }) => `topbar-tab${isActive ? ' active' : ''}`}
                >
                  {tab.label}
                </NavLink>
              );
            })}
          </div>
        )}
        <div className="topbar-right">
          {!mobile && (
            <button
              className="topbar-btn"
              onClick={() => setReflectionOpen(true)}
              title={tip('Record Reflection')}
              aria-label="Open reflection journal"
            >
              <PenLine size={18} />
            </button>
          )}
          {!mobile && (
            <button
              className="topbar-btn"
              onClick={() => setClockInOpen(true)}
              title={tip('Clock in')}
              aria-label="Clock in"
            >
              <Clock size={18} />
            </button>
          )}
          {!mobile && (
            <button
              className="topbar-btn"
              onClick={() => setDiscussionOpen(true)}
              title={tip('Discussion')}
              aria-label="Open discussion"
            >
              <MessagesSquare size={18} />
            </button>
          )}
          <button
            className={`topbar-btn ${islamicPanelOpen ? 'topbar-btn-active' : ''}`}
            onClick={toggleIslamicPanel}
            title={tip(`${valuesLayer === 'islamic' ? 'Islamic' : 'Values'} Panel (Cmd+I)`)}
            aria-label="Toggle Islamic panel"
          >
            {valuesLayer === 'islamic' ? <MoonStar size={18} /> : <Compass size={18} />}
          </button>
          <button
            className="topbar-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={tip('Toggle theme')}
            aria-label="Toggle dark mode"
          >
            <SunMoon size={18} />
          </button>
          {!mobile && (
            <button
              className="topbar-btn"
              onClick={() => setTooltipsEnabled(!tooltipsEnabled)}
              title={tooltipsEnabled ? 'Hide tooltips' : undefined}
              aria-label="Toggle tooltips"
            >
              {tooltipsEnabled ? <MessageCircle size={18} /> : <MessageCircleOff size={18} />}
            </button>
          )}
          {user && (
            <div className="topbar-avatar" title={tip(user.name)}>
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
        </div>
        {ayahBannerData && (
          <div
            ref={bannerRef}
            className="topbar-verse-banner"
            style={{
              borderLeftColor: ayahBannerData.color + '80',
              '--banner-tint': ayahBannerData.color + '0d',
              right: islamicPanelOpen && !mobile ? `${islamicPanelWidthPx + 28}px` : 0,
            }}
          >
            <button
              className="ayah-banner__header"
              onClick={toggleAyahBannerCollapsed}
              aria-expanded={!ayahBannerCollapsed}
            >
              <span className="ayah-banner__label" style={{ color: ayahBannerData.color }}>
                Why?
              </span>
              <span className="ayah-banner__chevron">
                {ayahBannerCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
              </span>
            </button>
            {!ayahBannerCollapsed && (
              <div className="ayah-banner__body">
                <p className="ayah-banner__arabic">{fmt(ayahBannerData.arabic)}</p>
                <p className="ayah-banner__translation">
                  {ayahBannerData.translation}
                </p>
                <span className="ayah-banner__source">
                  {ayahBannerData.source}
                  {citationsVisible && <span className="dua-citation-badge">[1]</span>}
                </span>
              </div>
            )}
          </div>
        )}
      </header>
      {clockInOpen && <ClockInModal onClose={() => setClockInOpen(false)} />}
    </>
  );
}
