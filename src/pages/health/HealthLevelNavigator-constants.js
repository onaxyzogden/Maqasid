import { Activity, BrainCircuit, Shield, Sparkles } from 'lucide-react';

export const HEALTH_PILLARS = [
  { id: 'physical', label: 'Physical Health',   Icon: Activity,     route: '/app/health-physical' },
  { id: 'mental',   label: 'Mental Well-being', Icon: BrainCircuit, route: '/app/health-mental'   },
  { id: 'safety',   label: 'Safety',            Icon: Shield,       route: '/app/health-safety'   },
  { id: 'social',   label: 'Social Character',  Icon: Sparkles,     route: '/app/health-social'   },
];

export const HEALTH_LEVEL_ROUTES = {
  core:       '/app/health-core',
  growth:     '/app/health-growth',
  excellence: '/app/health-excellence',
};

export const HEALTH_STORAGE_KEY = 'health_active_tab';

export const HEALTH_ENSURE_PROJECTS = (s) => s.ensureHealthProjects;
