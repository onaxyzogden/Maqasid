import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Settings, Plus, ChevronLeft, ChevronRight,
  ChevronDown, Bell, Moon, Search, SquareChevronRight,
} from 'lucide-react';
import { useAppStore } from '../../store/app-store';
import { useSettingsStore } from '../../store/settings-store';
import { useMobile } from '../../hooks/useMobile';
import { MODULES } from '../../data/modules';
import { MAQASID_PILLARS, getPillarLabel } from '../../data/maqasid';
import { ICON_REGISTRY } from '../../data/icon-registry';
import NotificationsPanel from './NotificationsPanel';
import './Sidebar.css';

// Submodule + parent-pillar icons resolved via the shared registry.
const ICON_MAP = ICON_REGISTRY;
const PILLAR_ICON_MAP = ICON_REGISTRY;

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
  // OGDEN Ecosystem
  'ogden-bbos': '/app/ogden-bbos',
  'ogden-milos': '/app/ogden-milos',
  'ogden-atlas': '/app/ogden-atlas',
};

const OGDEN_SIDEBAR_CHILDREN = [
  { id: 'ogden-bbos',    name: 'BBOS',    icon: 'Briefcase' },
  { id: 'ogden-milos',   name: 'MILOS',   icon: 'Compass' },
  { id: 'ogden-atlas',   name: 'Atlas',   icon: 'Globe2' },
];
const OGDEN_ACCENT = '#7E6EAD';

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
            <span>MILOS</span>
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
          to="/app/prophetic-path"
          className={`sidebar-item ${location.pathname === '/app/prophetic-path' ? 'active' : ''}`}
          onClick={handleNavClick}
          title="Prophetic Path"
        >
          <SquareChevronRight size={18} />
          {!collapsed && <span>Prophetic Path</span>}
        </Link>

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

        {(() => {
          const OgdenIcon = ICON_MAP.Orbit;
          const ogdenRoute = '/app/ogden-foundation';
          const hasActiveChild = OGDEN_SIDEBAR_CHILDREN.some((c) => {
            const r = MODULE_ROUTES[c.id];
            return r && (location.pathname === r || location.pathname.startsWith(r + '/'));
          });
          const onOgdenLevelRoute = ['/app/ogden-foundation', '/app/ogden-integration', '/app/ogden-realization']
            .some((r) => location.pathname === r || location.pathname.startsWith(r + '/'));
          const isExpanded = expandedPillars.ogden || hasActiveChild || onOgdenLevelRoute;
          return (
            <div className="pillar-group">
              <button
                className={`pillar-header ${hasActiveChild || onOgdenLevelRoute ? 'has-active' : ''}`}
                style={{ '--pillar-color': OGDEN_ACCENT }}
                aria-expanded={isExpanded}
                onClick={() => {
                  if (collapsed) {
                    toggleSidebar();
                    navigate(ogdenRoute);
                    if (!isExpanded) { collapseAllPillars(); togglePillar('ogden'); }
                    return;
                  }
                  navigate(ogdenRoute);
                  if (!isExpanded) { collapseAllPillars(); togglePillar('ogden'); }
                  else togglePillar('ogden');
                }}
                title="OGDEN Ecosystem"
              >
                {OgdenIcon && <OgdenIcon size={16} style={{ color: OGDEN_ACCENT }} />}
                {!collapsed && (
                  <>
                    <span className="pillar-label">OGDEN Ecosystem</span>
                    <ChevronDown
                      size={14}
                      className={`pillar-chevron ${isExpanded ? 'expanded' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isExpanded) { collapseAllPillars(); togglePillar('ogden'); }
                        else togglePillar('ogden');
                      }}
                    />
                  </>
                )}
              </button>

              {!collapsed && isExpanded && (
                <div className="pillar-children">
                  {OGDEN_SIDEBAR_CHILDREN.map((child) => {
                    const Icon = ICON_MAP[child.icon];
                    const route = MODULE_ROUTES[child.id];
                    const isActive = location.pathname === route || location.pathname.startsWith(route + '/');
                    return (
                      <Link
                        key={child.id}
                        to={route}
                        className={`sidebar-item pillar-submodule ${isActive ? 'active' : ''}`}
                        onClick={() => { setActiveModule(child.id); handleNavClick(); }}
                        title={child.name}
                      >
                        {Icon && <Icon size={16} style={isActive ? { color: OGDEN_ACCENT } : undefined} />}
                        <span>{child.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}
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
