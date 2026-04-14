import { Library, Lightbulb, BrainCircuit, Wrench } from 'lucide-react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';

export const INTELLECT_PILLARS = [
  { id: 'learning',     label: 'Learning',     Icon: Library,      route: '/app/intellect-learning'     },
  { id: 'thinking',     label: 'Thinking',     Icon: Lightbulb,    route: '/app/intellect-thinking'     },
  { id: 'cognitive',    label: 'Cognitive',    Icon: BrainCircuit, route: '/app/intellect-cognitive'    },
  { id: 'professional', label: 'Skill',             Icon: Wrench,       route: '/app/intellect-professional' },
];

export const INTELLECT_LEVEL_ROUTES = {
  core:       '/app/intellect-core',
  growth:     '/app/intellect-growth',
  excellence: '/app/intellect-excellence',
};

export const INTELLECT_STORAGE_KEY = 'intellect_active_tab';
export const INTELLECT_ENSURE_PROJECTS = (s) => s.ensureIntellectProjects;

export const INTELLECT_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Core Literacy',      desc: 'Essential knowledge, foundational thinking habits, and cognitive clarity that anchor all learning.' },
  growth:     { title: 'Deepening Mastery',  desc: 'Structured inquiry, professional development, and critical engagement that expand capability.' },
  excellence: { title: 'Wisdom',             desc: 'The refinement of thought, craft, and discernment toward peak intellectual contribution.' },
};

export default function IntellectCorePage() {
  return (
    <LevelOverviewPage
      level="core"
      levelColor="#C8A96E"
      pillars={INTELLECT_PILLARS}
      storageKey={INTELLECT_STORAGE_KEY}
      ensureProjects={INTELLECT_ENSURE_PROJECTS}
      levelRoutes={INTELLECT_LEVEL_ROUTES}
      boardPrefix="intellect"
      levelDescriptions={INTELLECT_LEVEL_DESCRIPTIONS}
    />
  );
}
