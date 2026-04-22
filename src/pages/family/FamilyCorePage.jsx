import FamilyLevelOverview from './FamilyLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

// Re-export constants for backward compatibility with submodule pages & registry.
export {
  FAMILY_PILLARS,
  FAMILY_LEVEL_ROUTES,
  FAMILY_STORAGE_KEY,
  FAMILY_ENSURE_PROJECTS,
} from './FamilyLevelNavigator';

export const FAMILY_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Family Covenant',    desc: 'The essential obligations of marriage, parenting, and kinship \u2014 the bonds no Muslim may neglect.' },
  growth:     { title: 'Family Depth',       desc: 'Nurturing relationships, building a home of growth, and strengthening ties through intentional care.' },
  excellence: { title: 'Family Excellence',  desc: 'Aspirational beauty in every bond \u2014 a household of wisdom, mercy, and generational barakah.' },
};

export default function FamilyCorePage() {
  return <FamilyLevelOverview level="core" levelColor={MODULE_PALETTE.family.core} />;
}
