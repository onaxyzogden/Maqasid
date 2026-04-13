import { Wallet, PiggyBank, Scale, Gift } from 'lucide-react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';

export const WEALTH_PILLARS = [
  { id: 'earning',     label: 'Earning & Provision', Icon: Wallet,   route: '/app/wealth-earning'     },
  { id: 'financial',   label: 'Financial Literacy',  Icon: PiggyBank, route: '/app/wealth-financial'  },
  { id: 'ownership',   label: 'Ownership & Rights',  Icon: Scale,    route: '/app/wealth-ownership'   },
  { id: 'circulation', label: 'Circulation & Impact', Icon: Gift,    route: '/app/wealth-circulation' },
];

export const WEALTH_LEVEL_ROUTES = {
  core:       '/app/wealth-core',
  growth:     '/app/wealth-growth',
  excellence: '/app/wealth-excellence',
};

export const WEALTH_STORAGE_KEY = 'wealth_active_tab';
export const WEALTH_ENSURE_PROJECTS = (s) => s.ensureWealthProjects;

export const WEALTH_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Wealth Foundations',  desc: 'The essential obligations of halal earning, financial stewardship, and the rights of wealth — what no Muslim may neglect.' },
  growth:     { title: 'Wealth Stewardship',  desc: 'Deepening ethical ownership, responsible management, and expanding the circles of giving and generosity.' },
  excellence: { title: 'Wealth as Amanah',    desc: 'Mastery in wealth as a trust — building lasting endowment, generational barakah, and transformative impact.' },
};

export default function WealthCorePage() {
  return (
    <LevelOverviewPage
      level="core"
      levelColor="#C8A96E"
      pillars={WEALTH_PILLARS}
      storageKey={WEALTH_STORAGE_KEY}
      ensureProjects={WEALTH_ENSURE_PROJECTS}
      levelRoutes={WEALTH_LEVEL_ROUTES}
      boardPrefix="wealth"
      levelDescriptions={WEALTH_LEVEL_DESCRIPTIONS}
    />
  );
}
