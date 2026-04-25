import { Globe, MapPin, Users } from 'lucide-react';

// Canonical Ummah submodule icons — match the sidebar's global defaults
// (src/data/modules.js). Kept in sync so wheel sectors, bento cards, and
// sidebar items render identical glyphs.
export const UMMAH_PILLARS = [
  { id: 'collective', label: 'Ummah',     Icon: Globe,  route: '/app/collective' },
  { id: 'neighbors',  label: 'Neighbors', Icon: MapPin, route: '/app/neighbors'  },
  { id: 'community',  label: 'Community', Icon: Users,  route: '/app/community'  },
];

export const UMMAH_LEVEL_ROUTES = {
  core:       '/app/pillar/ummah',
  growth:     '/app/pillar/ummah',
  excellence: '/app/pillar/ummah',
};

export const UMMAH_STORAGE_KEY = 'ummah_active_tab';

export const UMMAH_ENSURE_PROJECTS = (s) => s.ensureUmmahProjects;
