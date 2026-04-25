import { Droplets, Recycle, TreeDeciduous, ShoppingBag } from 'lucide-react';

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
