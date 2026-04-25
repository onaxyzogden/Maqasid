import EnvironmentLevelOverview from './EnvironmentLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function EnvironmentCorePage() {
  return <EnvironmentLevelOverview level="core" levelColor={MODULE_PALETTE.environment.core} />;
}
