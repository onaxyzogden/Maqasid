import LevelNavigator from '@components/shared/LevelNavigator';
import {
  OGDEN_SUB_PILLARS,
  OGDEN_LEVEL_ROUTES,
  OGDEN_STORAGE_KEY,
  OGDEN_ENSURE_PROJECTS,
  OGDEN_LEVELS,
} from '@data/ogden-ecosystem';

export default function OgdenLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={OGDEN_SUB_PILLARS}
      storageKey={OGDEN_STORAGE_KEY}
      ensureProjects={OGDEN_ENSURE_PROJECTS}
      levelRoutes={OGDEN_LEVEL_ROUTES}
      levelDescriptions={OGDEN_LEVELS}
      {...props}
    />
  );
}
