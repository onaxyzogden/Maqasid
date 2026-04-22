import IntellectLevelOverview from './IntellectLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function IntellectExcellencePage() {
  return <IntellectLevelOverview level="excellence" levelColor={MODULE_PALETTE.intellect.excellence} />;
}
