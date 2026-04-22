import WealthLevelOverview from './WealthLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

// Re-export constants for backward compatibility with submodule pages & registry.
export {
  WEALTH_PILLARS,
  WEALTH_LEVEL_ROUTES,
  WEALTH_STORAGE_KEY,
  WEALTH_ENSURE_PROJECTS,
} from './WealthLevelNavigator';

export const WEALTH_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Wealth Foundations',  desc: 'The essential obligations of halal earning, financial stewardship, and the rights of wealth \u2014 what no Muslim may neglect.' },
  growth:     { title: 'Wealth Stewardship',  desc: 'Deepening ethical ownership, responsible management, and expanding the circles of giving and generosity.' },
  excellence: { title: 'Wealth as Amanah',    desc: 'Mastery in wealth as a trust \u2014 building lasting endowment, generational barakah, and transformative impact.' },
};

export default function WealthCorePage() {
  return <WealthLevelOverview level="core" levelColor={MODULE_PALETTE.wealth.core} />;
}
