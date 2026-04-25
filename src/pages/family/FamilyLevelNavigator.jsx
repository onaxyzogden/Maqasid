import LevelNavigator from '@components/shared/LevelNavigator';
import {
  FAMILY_PILLARS,
  FAMILY_LEVEL_ROUTES,
  FAMILY_STORAGE_KEY,
  FAMILY_ENSURE_PROJECTS,
} from './FamilyLevelNavigator-constants';

export default function FamilyLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={FAMILY_PILLARS}
      storageKey={FAMILY_STORAGE_KEY}
      ensureProjects={FAMILY_ENSURE_PROJECTS}
      levelRoutes={FAMILY_LEVEL_ROUTES}
      {...props}
    />
  );
}
