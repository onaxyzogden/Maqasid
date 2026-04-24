import OgdenLevelOverview from './OgdenLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function OgdenFoundationPage() {
  return <OgdenLevelOverview level="core" levelColor={MODULE_PALETTE.ogden.core} />;
}
