import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Kanban, Settings,
} from 'lucide-react';
import { useThresholdStore } from '@store/threshold-store';
import { MAQASID_PILLARS } from '@data/maqasid';
import { ICON_REGISTRY } from '@data/icon-registry';
import './MobileNav.css';

const PILLAR_ICONS = ICON_REGISTRY;

export default function MobileNav() {
  const location = useLocation();
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);

  // Resolve all valid focus pillars (exclude '_skipped' sentinel), max 3
  const focusPillars = (niyyahFocus || [])
    .filter((id) => id !== '_skipped')
    .map((id) => MAQASID_PILLARS.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 3);

  const pillarItems = focusPillars.length > 0
    ? focusPillars.map((p) => ({
        to: `/app/pillar/${p.id}`,
        icon: PILLAR_ICONS[p.icon] ?? Kanban,
        label: p.sidebarLabel,
      }))
    : [{ to: '/app/work', icon: Kanban, label: 'Work' }];

  // Show Settings only when fewer than 3 pillars are focused
  const items = [
    { to: '/app', icon: LayoutDashboard, label: 'Home', exact: true },
    ...pillarItems,
    ...(focusPillars.length < 3 ? [{ to: '/app/settings', icon: Settings, label: 'Settings' }] : []),
  ];

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.exact
          ? location.pathname === item.to
          : location.pathname.startsWith(item.to);
        return (
          <Link key={item.to} to={item.to} className={`mobile-nav-item ${active ? 'active' : ''}`}>
            <Icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
