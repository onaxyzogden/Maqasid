import LevelNavigator from '@components/shared/LevelNavigator';
import {
  INTELLECT_PILLARS,
  INTELLECT_LEVEL_ROUTES,
  INTELLECT_STORAGE_KEY,
  INTELLECT_ENSURE_PROJECTS,
} from './IntellectLevelNavigator-constants';

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
