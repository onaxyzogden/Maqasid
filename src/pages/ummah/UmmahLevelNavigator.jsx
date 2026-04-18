import { Globe, MapPin, Users, Mountain, Leaf, Building } from 'lucide-react';
import LevelNavigator from '@components/shared/LevelNavigator';

export const UMMAH_PILLARS = [
  { id: 'collective',           label: 'Collective',           Icon: Globe,    route: '/app/collective'           },
  { id: 'neighbors',            label: 'Neighbors',            Icon: MapPin,   route: '/app/neighbors'            },
  { id: 'community',            label: 'Community',            Icon: Users,    route: '/app/community'            },
  { id: 'moontrance-land',      label: 'MTC Land',      Icon: Mountain, route: '/app/moontrance-land'      },
  { id: 'moontrance-seasonal',  label: 'MTC Seasonal',  Icon: Leaf,     route: '/app/moontrance-seasonal'  },
  { id: 'moontrance-residency', label: 'MTC Residency', Icon: Building, route: '/app/moontrance-residency' },
];

export const UMMAH_LEVEL_ROUTES = {
  core:       '/app/pillar/ummah',
  growth:     '/app/pillar/ummah',
  excellence: '/app/pillar/ummah',
};

export const UMMAH_STORAGE_KEY = 'ummah_active_tab';

export const UMMAH_ENSURE_PROJECTS = (s) => s.ensureUmmahProjects;

export default function UmmahLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={UMMAH_PILLARS}
      storageKey={UMMAH_STORAGE_KEY}
      ensureProjects={UMMAH_ENSURE_PROJECTS}
      levelRoutes={UMMAH_LEVEL_ROUTES}
      {...props}
    />
  );
}
