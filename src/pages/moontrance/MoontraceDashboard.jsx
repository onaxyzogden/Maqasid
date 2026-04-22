import MoontranceLevelOverview from './MoontranceLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function MoontraceDashboard() {
  return <MoontranceLevelOverview level="core" levelColor={MODULE_PALETTE.moontrance.core} />;
}
