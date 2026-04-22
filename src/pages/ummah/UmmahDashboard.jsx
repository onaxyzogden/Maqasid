import UmmahLevelOverview from './UmmahLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function UmmahDashboard() {
  return <UmmahLevelOverview level="core" levelColor={MODULE_PALETTE.ummah.core} />;
}
