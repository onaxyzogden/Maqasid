import HealthLevelOverview from './HealthLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function HealthGrowthPage() {
  return <HealthLevelOverview level="growth" levelColor={MODULE_PALETTE.life.growth} />;
}
