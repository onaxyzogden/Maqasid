import LevelNavigator from '@components/shared/LevelNavigator';
import {
  UMMAH_PILLARS,
  UMMAH_LEVEL_ROUTES,
  UMMAH_STORAGE_KEY,
  UMMAH_ENSURE_PROJECTS,
} from './UmmahLevelNavigator-constants';

export default function UmmahLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={UMMAH_PILLARS}
      storageKey={UMMAH_STORAGE_KEY}
      ensureProjects={UMMAH_ENSURE_PROJECTS}
      levelRoutes={UMMAH_LEVEL_ROUTES}
      {...props}
    />
  );
}
