import LevelNavigator from '@components/shared/LevelNavigator';
import {
  FAITH_PILLARS,
  FAITH_LEVEL_ROUTES,
  FAITH_STORAGE_KEY,
  FAITH_ENSURE_PROJECTS,
} from './FaithLevelNavigator-constants';

export default function FaithLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={FAITH_PILLARS}
      storageKey={FAITH_STORAGE_KEY}
      ensureProjects={FAITH_ENSURE_PROJECTS}
      levelRoutes={FAITH_LEVEL_ROUTES}
      {...props}
    />
  );
}
