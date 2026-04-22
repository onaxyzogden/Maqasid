import IntellectLevelOverview from './IntellectLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function IntellectGrowthPage() {
  return <IntellectLevelOverview level="growth" levelColor={MODULE_PALETTE.intellect.growth} />;
}
