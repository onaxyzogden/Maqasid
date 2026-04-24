import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, SquareChevronRight } from 'lucide-react';
import './MobileNav.css';

// Mobile nav is now a fixed three-tile bar: Home / Prophetic Path / Settings.
// Focus pillars used to occupy the middle slots when set via niyyah, but
// the current design reserves the mobile bar for stable navigation — focus
// pillars surface on the Home dashboard instead.
const ITEMS = [
  { to: '/app', icon: LayoutDashboard, label: 'Home', exact: true },
  { to: '/app/prophetic-path-test', icon: SquareChevronRight, label: 'Prophetic Path' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
];

export default function MobileNav() {
  const location = useLocation();

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {ITEMS.map((item) => {
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
