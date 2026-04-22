import EnvironmentLevelOverview from './EnvironmentLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function EnvironmentGrowthPage() {
  return <EnvironmentLevelOverview level="growth" levelColor={MODULE_PALETTE.environment.growth} />;
}
