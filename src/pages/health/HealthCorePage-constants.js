// Re-export constants for backward compatibility with submodule pages & registry.
export {
  HEALTH_PILLARS,
  HEALTH_LEVEL_ROUTES,
  HEALTH_STORAGE_KEY,
  HEALTH_ENSURE_PROJECTS,
} from './HealthLevelNavigator-constants';

export const HEALTH_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Core Wellbeing',   desc: 'Physical safety, mental baseline, and security \u2014 the non-negotiable foundations of a healthy life.' },
  growth:     { title: 'Growth Practices', desc: 'Deepening health, social character, and quality of life through structured, sustained effort.' },
  excellence: { title: 'Flourishing',      desc: 'Aspirational refinement of body, mind, and relationships toward their highest potential.' },
};
