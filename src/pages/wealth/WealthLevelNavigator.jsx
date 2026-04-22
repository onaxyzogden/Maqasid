import { Wallet, PiggyBank, Scale, CircleFadingArrowUp } from 'lucide-react';
import LevelNavigator from '@components/shared/LevelNavigator';

export const WEALTH_PILLARS = [
  { id: 'earning',     label: 'Earning & Provision',  Icon: Wallet,              route: '/app/wealth-earning'     },
  { id: 'financial',   label: 'Financial Literacy',   Icon: PiggyBank,           route: '/app/wealth-financial'   },
  { id: 'ownership',   label: 'Ownership & Rights',   Icon: Scale,               route: '/app/wealth-ownership'   },
  { id: 'circulation', label: 'Circulation & Impact', Icon: CircleFadingArrowUp, route: '/app/wealth-circulation' },
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
