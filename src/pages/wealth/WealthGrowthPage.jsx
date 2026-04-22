import WealthLevelOverview from './WealthLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function WealthGrowthPage() {
  return <WealthLevelOverview level="growth" levelColor={MODULE_PALETTE.wealth.growth} />;
}
