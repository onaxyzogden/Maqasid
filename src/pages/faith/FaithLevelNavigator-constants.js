import { CheckCircle2, HeartHandshake, HandHeart, Moon, Landmark } from 'lucide-react';

export const FAITH_PILLARS = [
  { id: 'shahada', label: 'Shahada', Icon: CheckCircle2,   route: '/app/faith-shahada' },
  { id: 'salat',   label: 'Salah',   Icon: HeartHandshake, route: '/app/faith-salah'   },
  { id: 'zakat',   label: 'Zakah',   Icon: HandHeart,      route: '/app/faith-zakah'   },
  { id: 'siyam',   label: 'Siyam',   Icon: Moon,           route: '/app/faith-siyam'   },
  { id: 'hajj',    label: 'Hajj',    Icon: Landmark,       route: '/app/faith-hajj'    },
];

export const FAITH_LEVEL_ROUTES = {
  core:       '/app/faith-core',
  growth:     '/app/faith-growth',
  excellence: '/app/faith-excellence',
};

export const FAITH_STORAGE_KEY = 'faith_active_tab';

export const FAITH_ENSURE_PROJECTS = (s) => s.ensureFaithProjects;
