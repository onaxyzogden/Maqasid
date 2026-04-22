import { GitPullRequestCreateArrow, ChessKnight, Scale, CircleFadingArrowUp } from 'lucide-react';
import LevelNavigator from '@components/shared/LevelNavigator';

// Canonical Wealth submodule icons — match the sidebar's global defaults
// (src/data/maqasid.js + src/data/modules.js). Kept in sync so wheel
// sectors, bento cards, and sidebar items render identical glyphs.
export const WEALTH_PILLARS = [
  { id: 'earning',     label: 'Earning & Provision',  Icon: CircleFadingArrowUp,       route: '/app/wealth-earning'     },
  { id: 'financial',   label: 'Financial Literacy',   Icon: ChessKnight,               route: '/app/wealth-financial'   },
  { id: 'ownership',   label: 'Ownership & Rights',   Icon: Scale,                     route: '/app/wealth-ownership'   },
  { id: 'circulation', label: 'Circulation & Impact', Icon: GitPullRequestCreateArrow, route: '/app/wealth-circulation' },
];

export const WEALTH_LEVEL_ROUTES = {
  core:       '/app/wealth-core',
  growth:     '/app/wealth-growth',
  excellence: '/app/wealth-excellence',
};

export const WEALTH_STORAGE_KEY = 'wealth_active_tab';

export const WEALTH_ENSURE_PROJECTS = (s) => s.ensureWealthProjects;

export default function WealthLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={WEALTH_PILLARS}
      storageKey={WEALTH_STORAGE_KEY}
      ensureProjects={WEALTH_ENSURE_PROJECTS}
      levelRoutes={WEALTH_LEVEL_ROUTES}
      {...props}
    />
  );
}
