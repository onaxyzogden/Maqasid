import HealthLevelOverview from './HealthLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function HealthCorePage() {
  return <HealthLevelOverview level="core" levelColor={MODULE_PALETTE.life.core} />;
}
