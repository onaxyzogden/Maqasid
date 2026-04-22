import WealthLevelOverview from './WealthLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function WealthExcellencePage() {
  return <WealthLevelOverview level="excellence" levelColor={MODULE_PALETTE.wealth.excellence} />;
}
