import WealthLevelOverview from './WealthLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function WealthCorePage() {
  return <WealthLevelOverview level="core" levelColor={MODULE_PALETTE.wealth.core} />;
}
