import FamilyLevelOverview from './FamilyLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function FamilyExcellencePage() {
  return <FamilyLevelOverview level="excellence" levelColor={MODULE_PALETTE.family.excellence} />;
}
