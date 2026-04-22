import FamilyLevelOverview from './FamilyLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function FamilyGrowthPage() {
  return <FamilyLevelOverview level="growth" levelColor={MODULE_PALETTE.family.growth} />;
}
