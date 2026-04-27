import LevelNavigator from '@components/shared/LevelNavigator';
import {
  HEALTH_PILLARS,
  HEALTH_LEVEL_ROUTES,
  HEALTH_STORAGE_KEY,
  HEALTH_ENSURE_PROJECTS,
} from './HealthLevelNavigator-constants';

export default function HealthLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={HEALTH_PILLARS}
      storageKey={HEALTH_STORAGE_KEY}
      ensureProjects={HEALTH_ENSURE_PROJECTS}
      levelRoutes={HEALTH_LEVEL_ROUTES}
      {...props}
    />
  );
}
