import LevelNavigator from '@components/shared/LevelNavigator';
import {
  LIFE_PILLARS,
  LIFE_LEVEL_ROUTES,
  LIFE_STORAGE_KEY,
  LIFE_ENSURE_PROJECTS,
} from './LifeLevelNavigator-constants';

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
