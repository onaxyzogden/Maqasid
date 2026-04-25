import LevelNavigator from '@components/shared/LevelNavigator';
import {
  ENVIRONMENT_PILLARS,
  ENVIRONMENT_LEVEL_ROUTES,
  ENVIRONMENT_STORAGE_KEY,
  ENVIRONMENT_ENSURE_PROJECTS,
} from './EnvironmentLevelNavigator-constants';

export default function EnvironmentLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={ENVIRONMENT_PILLARS}
      storageKey={ENVIRONMENT_STORAGE_KEY}
      ensureProjects={ENVIRONMENT_ENSURE_PROJECTS}
      levelRoutes={ENVIRONMENT_LEVEL_ROUTES}
      {...props}
    />
  );
}
