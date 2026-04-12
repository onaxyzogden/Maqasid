import { Heart, Baby, Handshake, Home } from 'lucide-react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';

export const FAMILY_PILLARS = [
  { id: 'marriage',  label: 'Marriage',  Icon: Heart,      route: '/app/family-marriage'  },
  { id: 'parenting', label: 'Parenting', Icon: Baby,       route: '/app/family-parenting' },
  { id: 'kinship',   label: 'Kinship',   Icon: Handshake,  route: '/app/family-kinship'   },
  { id: 'home',      label: 'Home',      Icon: Home,       route: '/app/family-home'      },
];

export const FAMILY_LEVEL_ROUTES = {
  core:       '/app/family-core',
  growth:     '/app/family-growth',
  excellence: '/app/family-excellence',
};

export const FAMILY_STORAGE_KEY = 'family_active_tab';
export const FAMILY_ENSURE_PROJECTS = (s) => s.ensureFamilyProjects;

export const FAMILY_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Family Covenant',    desc: 'The essential obligations of marriage, parenting, and kinship \u2014 the bonds no Muslim may neglect.' },
  growth:     { title: 'Family Depth',       desc: 'Nurturing relationships, building a home of growth, and strengthening ties through intentional care.' },
  excellence: { title: 'Family Excellence',  desc: 'Aspirational beauty in every bond \u2014 a household of wisdom, mercy, and generational barakah.' },
};

export default function FamilyCorePage() {
  return (
    <LevelOverviewPage
      level="core"
      levelColor="#C8A96E"
      pillars={FAMILY_PILLARS}
      storageKey={FAMILY_STORAGE_KEY}
      ensureProjects={FAMILY_ENSURE_PROJECTS}
      levelRoutes={FAMILY_LEVEL_ROUTES}
      boardPrefix="family"
      levelDescriptions={FAMILY_LEVEL_DESCRIPTIONS}
    />
  );
}
