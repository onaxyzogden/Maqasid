import HealthLevelOverview from './HealthLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function HealthExcellencePage() {
  return <HealthLevelOverview level="excellence" levelColor={MODULE_PALETTE.life.excellence} />;
}
