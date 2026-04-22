import { Heart, Baby, Handshake, HouseHeart } from 'lucide-react';
import LevelNavigator from '@components/shared/LevelNavigator';

// Canonical Family submodule icons — match the sidebar's global defaults
// (src/data/modules.js). Kept in sync so wheel sectors, bento cards, and
// sidebar items render identical glyphs.
export const FAMILY_PILLARS = [
  { id: 'marriage',  label: 'Marriage',  Icon: Heart,      route: '/app/family-marriage'  },
  { id: 'parenting', label: 'Parenting', Icon: Baby,       route: '/app/family-parenting' },
  { id: 'kinship',   label: 'Kinship',   Icon: Handshake,  route: '/app/family-kinship'   },
  { id: 'home',      label: 'Home',      Icon: HouseHeart, route: '/app/family-home'      },
];

export const FAMILY_LEVEL_ROUTES = {
  core:       '/app/family-core',
  growth:     '/app/family-growth',
  excellence: '/app/family-excellence',
};

export const FAMILY_STORAGE_KEY = 'family_active_tab';

export const FAMILY_ENSURE_PROJECTS = (s) => s.ensureFamilyProjects;

export default function FamilyLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={FAMILY_PILLARS}
      storageKey={FAMILY_STORAGE_KEY}
      ensureProjects={FAMILY_ENSURE_PROJECTS}
      levelRoutes={FAMILY_LEVEL_ROUTES}
      {...props}
    />
  );
}
