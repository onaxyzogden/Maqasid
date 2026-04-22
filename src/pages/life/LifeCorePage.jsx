import LifeLevelOverview from './LifeLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

// Re-export constants for backward compatibility with submodule pages & registry.
export {
  LIFE_PILLARS,
  LIFE_LEVEL_ROUTES,
  LIFE_STORAGE_KEY,
  LIFE_ENSURE_PROJECTS,
} from './LifeLevelNavigator';

export const LIFE_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Core Wellbeing',   desc: 'Physical safety, mental baseline, and security \u2014 the non-negotiable foundations of a healthy life.' },
  growth:     { title: 'Growth Practices', desc: 'Deepening health, social character, and quality of life through structured, sustained effort.' },
  excellence: { title: 'Flourishing',      desc: 'Aspirational refinement of body, mind, and relationships toward their highest potential.' },
};

export default function LifeCorePage() {
  return <LifeLevelOverview level="core" levelColor={MODULE_PALETTE.life.core} />;
}
