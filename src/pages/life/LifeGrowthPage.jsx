import LifeLevelOverview from './LifeLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function LifeGrowthPage() {
  return <LifeLevelOverview level="growth" levelColor={MODULE_PALETTE.life.growth} />;
}
