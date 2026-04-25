import LevelNavigator from '@components/shared/LevelNavigator';
import {
  WEALTH_PILLARS,
  WEALTH_LEVEL_ROUTES,
  WEALTH_STORAGE_KEY,
  WEALTH_ENSURE_PROJECTS,
} from './WealthLevelNavigator-constants';

export default function WealthLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={WEALTH_PILLARS}
      storageKey={WEALTH_STORAGE_KEY}
      ensureProjects={WEALTH_ENSURE_PROJECTS}
      levelRoutes={WEALTH_LEVEL_ROUTES}
      {...props}
    />
  );
}
