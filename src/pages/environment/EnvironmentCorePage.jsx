import { Droplets, Recycle, TreeDeciduous, ShoppingBag } from 'lucide-react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';

export const ENVIRONMENT_PILLARS = [
  { id: 'resource',  label: 'Resource',  Icon: Droplets,      route: '/app/env-resource'  },
  { id: 'waste',     label: 'Waste',     Icon: Recycle,       route: '/app/env-waste'     },
  { id: 'ecosystem', label: 'Ecosystem', Icon: TreeDeciduous, route: '/app/env-ecosystem' },
  { id: 'sourcing',  label: 'Sourcing',  Icon: ShoppingBag,   route: '/app/env-sourcing'  },
];

export const ENVIRONMENT_LEVEL_ROUTES = {
  core:       '/app/environment-core',
  growth:     '/app/environment-growth',
  excellence: '/app/environment-excellence',
};

export const ENVIRONMENT_STORAGE_KEY = 'environment_active_tab';
export const ENVIRONMENT_ENSURE_PROJECTS = (s) => s.ensureEnvironmentProjects;

export const ENVIRONMENT_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Stewardship Duties',     desc: 'The essential obligations of resource preservation, waste reduction, and ethical consumption.' },
  growth:     { title: 'Ecological Engagement',  desc: 'Developing practices that actively support ecosystem health and responsible sourcing.' },
  excellence: { title: 'Khalifa Excellence',     desc: 'Aspirational circularity, biodiversity care, and full embodiment of the vicegerency covenant.' },
};

export default function EnvironmentCorePage() {
  return (
    <LevelOverviewPage
      level="core"
      levelColor="#C8A96E"
      pillars={ENVIRONMENT_PILLARS}
      storageKey={ENVIRONMENT_STORAGE_KEY}
      ensureProjects={ENVIRONMENT_ENSURE_PROJECTS}
      levelRoutes={ENVIRONMENT_LEVEL_ROUTES}
      boardPrefix="environment"
      levelDescriptions={ENVIRONMENT_LEVEL_DESCRIPTIONS}
    />
  );
}
