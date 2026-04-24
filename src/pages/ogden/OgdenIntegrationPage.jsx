import OgdenLevelOverview from './OgdenLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function OgdenIntegrationPage() {
  return <OgdenLevelOverview level="growth" levelColor={MODULE_PALETTE.ogden.growth} />;
}
