import { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Search, Moon, Sun, Menu, MoonStar, Compass, Clock, PenLine, MessageCircle, MessageCircleOff, MessagesSquare } from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useSettingsStore } from '../../store/settings-store';
import { useAuthStore } from '../../store/auth-store';
import { useProjectStore } from '../../store/project-store';
import { useMobile } from '../../hooks/useMobile';
import ClockInModal from '../people/hr/ClockInModal';
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
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const setSearchOpen = useAppStore((s) => s.setSearchOpen);
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
  const [clockInOpen, setClockInOpen] = useState(false);

  const tip = (text) => tooltipsEnabled ? text : undefined;

  const projectBase = getProjectBase(location.pathname);
  const showWorkTabs = !!projectBase;
  const isFaithRoute = location.pathname.startsWith('/app/faith') || location.pathname === '/app/pillar/faith';

  useEffect(() => {
    document.body.classList.toggle('faith-banner-active', isFaithRoute);
    return () => document.body.classList.remove('faith-banner-active');
  }, [isFaithRoute]);

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          {mobile && (
            <button className="topbar-btn" onClick={toggleSidebar} title={tip('Menu')}>
              <Menu size={20} />
            </button>
          )}
          {isFaithRoute && <span className="faith-badge faith-badge--module topbar-faith-badge">MODULE I</span>}
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
          <button
            className="topbar-btn"
            onClick={() => setReflectionOpen(true)}
            title={tip('Record Reflection')}
          >
            <PenLine size={18} />
          </button>
          <button
            className="topbar-btn"
            onClick={() => setClockInOpen(true)}
            title={tip('Clock in')}
          >
            <Clock size={18} />
          </button>
          <button className="topbar-btn topbar-search" onClick={() => setSearchOpen(true)} title={tip('Search (Cmd+K)')}>
            <Search size={18} />
            {!mobile && <span className="topbar-search-hint">Search...</span>}
            {!mobile && <kbd className="topbar-kbd">⌘K</kbd>}
          </button>
          <button
            className="topbar-btn"
            onClick={() => setDiscussionOpen(true)}
            title={tip('Discussion')}
          >
            <MessagesSquare size={18} />
          </button>
          <button
            className={`topbar-btn ${islamicPanelOpen ? 'topbar-btn-active' : ''}`}
            onClick={toggleIslamicPanel}
            title={tip(`${valuesLayer === 'islamic' ? 'Islamic' : 'Values'} Panel (Cmd+I)`)}
          >
            {valuesLayer === 'islamic' ? <MoonStar size={18} /> : <Compass size={18} />}
          </button>
          <button
            className="topbar-btn"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={tip('Toggle theme')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="topbar-btn"
            onClick={() => setTooltipsEnabled(!tooltipsEnabled)}
            title={tooltipsEnabled ? 'Hide tooltips' : undefined}
          >
            {tooltipsEnabled ? <MessageCircle size={18} /> : <MessageCircleOff size={18} />}
          </button>
          {user && (
            <div className="topbar-avatar" title={tip(user.name)}>
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
        </div>
        {isFaithRoute && (
          <div
            className="topbar-verse-banner"
            style={{ right: islamicPanelOpen && !mobile ? `${islamicPanelWidthPx + 28}px` : 0 }}
          >
            <p className="topbar-verse">
              "Those who have believed and whose hearts are assured by the
              remembrance of Allah. Unquestionably, by the remembrance of Allah
              hearts are assured."
            </p>
            <cite className="topbar-cite">— Surah Ar-Ra'd 13:28</cite>
          </div>
        )}
      </header>
      {clockInOpen && <ClockInModal onClose={() => setClockInOpen(false)} />}
    </>
  );
}
