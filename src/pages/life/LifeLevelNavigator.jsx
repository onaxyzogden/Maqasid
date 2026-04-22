import { Activity, BrainCircuit, Shield, Sparkles } from 'lucide-react';
import LevelNavigator from '@components/shared/LevelNavigator';

export const LIFE_PILLARS = [
  { id: 'physical', label: 'Physical Health',   Icon: Activity,     route: '/app/life-physical' },
  { id: 'mental',   label: 'Mental Well-being', Icon: BrainCircuit, route: '/app/life-mental'   },
  { id: 'safety',   label: 'Safety',            Icon: Shield,       route: '/app/life-safety'   },
  { id: 'social',   label: 'Social Character',  Icon: Sparkles,     route: '/app/life-social'   },
];

export const LIFE_LEVEL_ROUTES = {
  core:       '/app/life-core',
  growth:     '/app/life-growth',
  excellence: '/app/life-excellence',
};

export const LIFE_STORAGE_KEY = 'life_active_tab';

export const LIFE_ENSURE_PROJECTS = (s) => s.ensureLifeProjects;

export default function LifeLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={LIFE_PILLARS}
      storageKey={LIFE_STORAGE_KEY}
      ensureProjects={LIFE_ENSURE_PROJECTS}
      levelRoutes={LIFE_LEVEL_ROUTES}
      {...props}
    />
  );
}
