// Re-export constants for backward compatibility with submodule pages & registry.
export {
  ENVIRONMENT_PILLARS,
  ENVIRONMENT_LEVEL_ROUTES,
  ENVIRONMENT_STORAGE_KEY,
  ENVIRONMENT_ENSURE_PROJECTS,
} from './EnvironmentLevelNavigator-constants';

export const ENVIRONMENT_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Stewardship Duties',     desc: 'The essential obligations of resource preservation, waste reduction, and ethical consumption.' },
  growth:     { title: 'Ecological Engagement',  desc: 'Developing practices that actively support ecosystem health and responsible sourcing.' },
  excellence: { title: 'Khalifa Excellence',     desc: 'Aspirational circularity, biodiversity care, and full embodiment of the vicegerency covenant.' },
};
