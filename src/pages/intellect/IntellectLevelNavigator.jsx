import { Library, Lightbulb, BrainCircuit, Wrench } from 'lucide-react';
import LevelNavigator from '@components/shared/LevelNavigator';

export const INTELLECT_PILLARS = [
  { id: 'learning',     label: 'Learning',     Icon: Library,      route: '/app/intellect-learning'     },
  { id: 'thinking',     label: 'Thinking',     Icon: Lightbulb,    route: '/app/intellect-thinking'     },
  { id: 'cognitive',    label: 'Cognitive',    Icon: BrainCircuit, route: '/app/intellect-cognitive'    },
  { id: 'professional', label: 'Skill',        Icon: Wrench,       route: '/app/intellect-professional' },
];

export const INTELLECT_LEVEL_ROUTES = {
  core:       '/app/intellect-core',
  growth:     '/app/intellect-growth',
  excellence: '/app/intellect-excellence',
};

export const INTELLECT_STORAGE_KEY = 'intellect_active_tab';

export const INTELLECT_ENSURE_PROJECTS = (s) => s.ensureIntellectProjects;

export default function IntellectLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={INTELLECT_PILLARS}
      storageKey={INTELLECT_STORAGE_KEY}
      ensureProjects={INTELLECT_ENSURE_PROJECTS}
      levelRoutes={INTELLECT_LEVEL_ROUTES}
      {...props}
    />
  );
}
