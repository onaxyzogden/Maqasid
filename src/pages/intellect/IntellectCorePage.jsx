import IntellectLevelOverview from './IntellectLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function IntellectCorePage() {
  return <IntellectLevelOverview level="core" levelColor={MODULE_PALETTE.intellect.core} />;
}
