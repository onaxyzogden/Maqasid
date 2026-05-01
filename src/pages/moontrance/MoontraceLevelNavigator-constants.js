import { MapPinned, Leaf, HousePlus } from 'lucide-react';

export const MOONTRANCE_PILLARS = [
  { id: 'moontrance-land',      label: 'Land',      Icon: MapPinned, route: '/app/moontrance-land'      },
  { id: 'moontrance-seasonal',  label: 'Seasonal',  Icon: Leaf,      route: '/app/moontrance-seasonal'  },
  { id: 'moontrance-residency', label: 'Residency', Icon: HousePlus, route: '/app/moontrance-residency' },
];

export const MOONTRANCE_LEVEL_ROUTES = {
  core:       '/app/pillar/moontrance',
  growth:     '/app/pillar/moontrance',
  excellence: '/app/pillar/moontrance',
};

export const MOONTRANCE_STORAGE_KEY = 'moontrance_active_tab';

export const MOONTRANCE_ENSURE_PROJECTS = (s) => s.ensureUmmahProjects;
