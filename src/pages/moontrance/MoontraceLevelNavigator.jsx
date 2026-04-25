import LevelNavigator from '@components/shared/LevelNavigator';
import {
  MOONTRANCE_PILLARS,
  MOONTRANCE_LEVEL_ROUTES,
  MOONTRANCE_STORAGE_KEY,
  MOONTRANCE_ENSURE_PROJECTS,
} from './MoontraceLevelNavigator-constants';

export default function MoontraceLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={MOONTRANCE_PILLARS}
      storageKey={MOONTRANCE_STORAGE_KEY}
      ensureProjects={MOONTRANCE_ENSURE_PROJECTS}
      levelRoutes={MOONTRANCE_LEVEL_ROUTES}
      {...props}
    />
  );
}
