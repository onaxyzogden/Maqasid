// Re-exported from @ogden/ui-components so MILOS code and the package's
// LevelNavigator/MaqasidComparisonWheel resolve to the same singleton —
// required for cross-component hover sync to work (two module copies would
// hold separate state).
export { useWheelHoverStore } from '@ogden/ui-components';
