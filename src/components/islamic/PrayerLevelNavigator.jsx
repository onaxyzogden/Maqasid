import LevelNavigator from '@components/shared/LevelNavigator';
import { PRAYER_PILLARS, PRAYER_LEVELS } from '@data/prayer-pillars';

export const PRAYER_STORAGE_KEY = 'prayer_active_phase';

export const PRAYER_ENSURE_PROJECTS = (s) => s.ensurePrayerProjects;

// Thin wrapper — passes PRAYER_LEVELS as `customLevels` so the generic
// carousel renders Before / During / After instead of Core / Growth / Excellence.
// Consumers (PrayerLevelPage) still own pillarTasks, active-level control, and
// segment-click routing.
export default function PrayerLevelNavigator(props) {
  return (
    <LevelNavigator
      pillars={PRAYER_PILLARS}
      levels={PRAYER_LEVELS}
      storageKey={PRAYER_STORAGE_KEY}
      ensureProjects={PRAYER_ENSURE_PROJECTS}
      {...props}
    />
  );
}
