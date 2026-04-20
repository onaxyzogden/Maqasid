import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Kanban, PencilRuler, Wallet, GitPullRequestCreateArrow, Users, Building2, Shield, SquareTerminal, Heart, Home, UsersRound, Landmark, BookOpen, ScrollText,
  LayoutDashboard, Settings, Plus, ChevronLeft, ChevronRight,
  ChevronDown, Bell, Compass, HeartPulse, Brain, Coins, ChessRook, TreePine, Globe, Moon, TrendingUp, Star, CheckCircle2,
  Activity, BrainCircuit, Sparkles, HeartHandshake,
  Library, Wrench, Lightbulb, Share2,
  Baby, CalendarHeart, Handshake,
  GraduationCap, HandHeart, Scale,
  PiggyBank, ChessKnight, Store, CircleFadingArrowUp, BarChart3,
  Leaf, TreeDeciduous, ShoppingBag, Hammer,
  Droplets, Recycle,
  Mountain, Building, CirclePile, HousePlus, Shapes, MapPinned, Boxes, HouseHeart,
  Search, FlaskConical,
} from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useSettingsStore } from '../../store/settings-store';
import { useMobile } from '../../hooks/useMobile';
import { MODULES } from '../../data/modules';
import { MAQASID_PILLARS, getPillarLabel } from '../../data/maqasid';
import NotificationsPanel from './NotificationsPanel';
import './Sidebar.css';

const ICON_MAP = {
  Kanban, PencilRuler, Wallet, GitPullRequestCreateArrow, Users, Building2, Shield, SquareTerminal, Heart, Home, UsersRound, Landmark, BookOpen, ScrollText,
  Activity, BrainCircuit, Sparkles, HeartHandshake,
  Library, Wrench, Lightbulb, Share2,
  Baby, CalendarHeart, Handshake,
  GraduationCap, HandHeart, Scale,
  PiggyBank, ChessKnight, Store, CircleFadingArrowUp, BarChart3,
  Leaf, TreeDeciduous, ShoppingBag, Hammer,
  Droplets, Recycle,
  TrendingUp, Star, CheckCircle2, Moon, TreePine,
  Mountain, Building, CirclePile, HousePlus, Shapes, MapPinned, Boxes, HouseHeart,
};
const PILLAR_ICON_MAP = { Compass, HeartPulse, Brain, Users, Coins, ChessRook, TreePine, Globe, Moon };

const MODULE_ROUTES = {
  work: '/app/work',
  money: '/app/money',
  people: '/app/people',
  office: '/app/office',
  tech: '/app/tech',
  family: '/app/family',
  neighbors: '/app/neighbors',
  community: '/app/community',
  sources: '/app/sources',
  // Faith
  'faith-core': '/app/faith-core',
  'faith-growth': '/app/faith-growth',
  'faith-excellence': '/app/faith-excellence',
  'faith-shahada': '/app/faith-shahada',
  'faith-salah': '/app/faith-salah',
  'faith-zakah': '/app/faith-zakah',
  'faith-siyam': '/app/faith-siyam',
  'faith-hajj': '/app/faith-hajj',
  // Life
  'life-physical': '/app/life-physical',
  'life-mental': '/app/life-mental',
  'life-safety': '/app/life-safety',
  'life-social': '/app/life-social',
  // Intellect
  'intellect-learning': '/app/intellect-learning',
  'intellect-thinking': '/app/intellect-thinking',
  'intellect-cognitive': '/app/intellect-cognitive',
  'intellect-professional': '/app/intellect-professional',
  // Family
  'family-marriage': '/app/family-marriage',
  'family-parenting': '/app/family-parenting',
  'family-kinship': '/app/family-kinship',
  'family-home': '/app/family-home',
  'family-office': '/app/family-office',
  // Wealth
  'wealth-earning': '/app/wealth-earning',
  'wealth-financial': '/app/wealth-financial',
  'wealth-ownership': '/app/wealth-ownership',
  'wealth-circulation': '/app/wealth-circulation',
  // Environment
  'env-resource': '/app/env-resource',
  'env-waste': '/app/env-waste',
  'env-ecosystem': '/app/env-ecosystem',
  'env-sourcing': '/app/env-sourcing',
  // Standalone
  collective: '/app/collective',
  // MTC (Ummah)
  'moontrance-land': '/app/moontrance-land',
  'moontrance-seasonal': '/app/moontrance-seasonal',
  'moontrance-residency': '/app/moontrance-residency',
};

const modulesById = Object.fromEntries(MODULES.map((m) => [m.id, m]));

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const mobile = useMobile();
  const { sidebarOpen, toggleSidebar, setActiveModule, expandedPillars, togglePillar, collapseAllPillars, setSearchOpen } = useAppStore();
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const [notifOpen, setNotifOpen] = useState(false);

  const collapsed = mobile ? false : !sidebarOpen;

  const handleNavClick = () => {
    if (mobile && sidebarOpen) toggleSidebar();
  };

  if (mobile && !sidebarOpen) return null;

  return (
    <>
      {mobile && <div className="sidebar-overlay" onClick={toggleSidebar} />}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobile ? 'sidebar-mobile' : ''}`}>
      {/* Logo */}
      <div className="sidebar-header">
        {!collapsed && (
          <Link to="/app" className="sidebar-logo">
            <div className="logo-icon"><Moon size={14} /></div>
            <span>MAQASID</span>
          </Link>
        )}
        <button className="sidebar-toggle" onClick={toggleSidebar} title={collapsed ? 'Expand' : 'Collapse'} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Search */}
      <div className="sidebar-search-wrap">
        <button className="sidebar-search-btn" onClick={() => setSearchOpen(true)} title="Search (⌘K)" aria-label="Open search">
          <Search size={16} />
          {!collapsed && (
            <>
              <span className="sidebar-search-hint">Search...</span>
              <kbd className="sidebar-search-kbd">⌘K</kbd>
            </>
          )}
        </button>
      </div>

      {/* Main Nav */}
      <nav className="sidebar-nav" aria-label="Main navigation" data-tour="sidebar-nav">
        <Link
          to="/app"
          className={`sidebar-item ${location.pathname === '/app' ? 'active' : ''}`}
          onClick={handleNavClick}
          title="Dashboard"
        >
          <LayoutDashboard size={18} />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <div className="sidebar-divider" />

        {MAQASID_PILLARS.map((pillar) => {
          const PillarIcon = PILLAR_ICON_MAP[pillar.icon];
          const subModules = pillar.subModuleIds.map((id) => modulesById[id]).filter(Boolean);
          const hasActiveChild = subModules.some((m) => {
            const r = MODULE_ROUTES[m.id];
            return r && (location.pathname === r || location.pathname.startsWith(r + '/'));
          });
          const isExpanded = expandedPillars[pillar.id] || hasActiveChild;
          const isScaffold = pillar.status === 'scaffold';
          const label = getPillarLabel(pillar, valuesLayer);

          const isPillarActive = location.pathname === `/app/pillar/${pillar.id}`;

          return (
            <div key={pillar.id} className="pillar-group">
              <button
                className={`pillar-header ${hasActiveChild || isPillarActive ? 'has-active' : ''}`}
                style={{ '--pillar-color': `var(--pillar-${pillar.id})` }}
                aria-expanded={isExpanded}
                onClick={() => {
                  if (collapsed) {
                    toggleSidebar();
                    navigate(`/app/pillar/${pillar.id}`);
                    if (!isExpanded) { collapseAllPillars(); togglePillar(pillar.id); }
                    return;
                  }
                  navigate(`/app/pillar/${pillar.id}`);
                  if (!isExpanded) { collapseAllPillars(); togglePillar(pillar.id); }
                  else togglePillar(pillar.id);
                }}
                title={label}
              >
                {PillarIcon && <PillarIcon size={16} style={{ color: `var(--pillar-${pillar.id})` }} />}
                {!collapsed && (
                  <>
                    <span className="pillar-label">{label}</span>
                    {isScaffold && <span className="sidebar-badge">Soon</span>}
                    <ChevronDown
                      size={14}
                      className={`pillar-chevron ${isExpanded ? 'expanded' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isExpanded) { collapseAllPillars(); togglePillar(pillar.id); }
                        else togglePillar(pillar.id);
                      }}
                    />
                  </>
                )}
              </button>

              {!collapsed && isExpanded && (
                <div className="pillar-children">
                  {isScaffold ? (
                    <span className="pillar-scaffold">Coming soon</span>
                  ) : (
                    subModules.map((mod) => {
                      const Icon = ICON_MAP[mod.icon];
                      const route = MODULE_ROUTES[mod.id];
                      const isActive = location.pathname === route || location.pathname.startsWith(route + '/');
                      return (
                        <Link
                          key={mod.id}
                          to={route}
                          className={`sidebar-item pillar-submodule ${isActive ? 'active' : ''}`}
                          onClick={() => { setActiveModule(mod.id); handleNavClick(); }}
                          title={mod.name}
                        >
                          {Icon && <Icon size={16} style={isActive ? { color: mod.color } : undefined} />}
                          <span>{mod.name}</span>
                        </Link>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}

        <div className="sidebar-divider" />

        <Link
          to="/app/dashboard-wheel-test"
          className={`sidebar-item ${location.pathname === '/app/dashboard-wheel-test' ? 'active' : ''}`}
          onClick={handleNavClick}
          title="Dashboard Wheel Test (prototype)"
        >
          <FlaskConical size={18} />
          {!collapsed && <span>Dashboard Wheel Test</span>}
        </Link>

        <Link
          to="/app/prophetic-path-test"
          className={`sidebar-item ${location.pathname === '/app/prophetic-path-test' ? 'active' : ''}`}
          onClick={handleNavClick}
          title="Prophetic Path (prototype)"
        >
          <FlaskConical size={18} />
          {!collapsed && <span>Prophetic Path</span>}
        </Link>
      </nav>

      {/* Projects list removed from sidebar — accessible via Work module page */}

      {/* Bottom */}
      <div className="sidebar-bottom">
        <button
          className="sidebar-item"
          onClick={() => setNotifOpen(true)}
          title="Notifications"
          aria-label="Open notifications"
        >
          <Bell size={18} />
          {!collapsed && <span>Notifications</span>}
        </button>
        <Link
          to="/app/settings"
          className={`sidebar-item ${location.pathname === '/app/settings' ? 'active' : ''}`}
          title="Settings"
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>

      {notifOpen && <NotificationsPanel onClose={() => setNotifOpen(false)} />}
    </aside>
    </>
  );
}
