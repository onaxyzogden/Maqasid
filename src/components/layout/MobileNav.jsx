import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Kanban, Settings,
  Compass, HeartPulse, Brain, Users, Coins, TreePine, Globe,
} from 'lucide-react';
import { useThresholdStore } from '@store/threshold-store';
import { MAQASID_PILLARS } from '@data/maqasid';
import './MobileNav.css';

const PILLAR_ICONS = { Compass, HeartPulse, Brain, Users, Coins, TreePine, Globe };

export default function MobileNav() {
  const location = useLocation();
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);

  // Resolve first valid focus pillar (exclude '_skipped' sentinel)
  const focusPillar = (niyyahFocus || [])
    .map((id) => MAQASID_PILLARS.find((p) => p.id === id))
    .find(Boolean);

  const middleItem = focusPillar
    ? {
        to: `/app/pillar/${focusPillar.id}`,
        icon: PILLAR_ICONS[focusPillar.icon] ?? Kanban,
        label: focusPillar.sidebarLabel,
      }
    : { to: '/app/work', icon: Kanban, label: 'Work' };

  const items = [
    { to: '/app', icon: LayoutDashboard, label: 'Home', exact: true },
    middleItem,
    { to: '/app/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="mobile-nav">
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
