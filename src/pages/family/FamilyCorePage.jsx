import FamilyLevelOverview from './FamilyLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function FamilyCorePage() {
  return <FamilyLevelOverview level="core" levelColor={MODULE_PALETTE.family.core} />;
}
