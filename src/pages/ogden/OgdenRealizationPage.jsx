import OgdenLevelOverview from './OgdenLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function OgdenRealizationPage() {
  return <OgdenLevelOverview level="excellence" levelColor={MODULE_PALETTE.ogden.excellence} />;
}
