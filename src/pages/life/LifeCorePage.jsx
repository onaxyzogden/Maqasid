import { Activity, BrainCircuit, Shield, Sparkles } from 'lucide-react';
import LevelOverviewPage from '@pages/shared/LevelOverviewPage';

export const LIFE_PILLARS = [
  { id: 'physical', label: 'Physical Health', Icon: Activity,     route: '/app/life-physical' },
  { id: 'mental',   label: 'Mental Well-being', Icon: BrainCircuit, route: '/app/life-mental'   },
  { id: 'safety',   label: 'Safety',           Icon: Shield,       route: '/app/life-safety'   },
  { id: 'social',   label: 'Social Character', Icon: Sparkles,     route: '/app/life-social'   },
];

export const LIFE_LEVEL_ROUTES = {
  core:       '/app/life-core',
  growth:     '/app/life-growth',
  excellence: '/app/life-excellence',
};

export const LIFE_STORAGE_KEY = 'life_active_tab';
export const LIFE_ENSURE_PROJECTS = (s) => s.ensureLifeProjects;

export const LIFE_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Core Wellbeing',   desc: 'Physical safety, mental baseline, and security \u2014 the non-negotiable foundations of a healthy life.' },
  growth:     { title: 'Growth Practices', desc: 'Deepening health, social character, and quality of life through structured, sustained effort.' },
  excellence: { title: 'Flourishing',      desc: 'Aspirational refinement of body, mind, and relationships toward their highest potential.' },
};

export default function LifeCorePage() {
  return (
    <LevelOverviewPage
      level="core"
      levelColor="#C8A96E"
      pillars={LIFE_PILLARS}
      storageKey={LIFE_STORAGE_KEY}
      ensureProjects={LIFE_ENSURE_PROJECTS}
      levelRoutes={LIFE_LEVEL_ROUTES}
      boardPrefix="life"
      levelDescriptions={LIFE_LEVEL_DESCRIPTIONS}
    />
  );
}
