import EnvironmentLevelOverview from './EnvironmentLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function EnvironmentExcellencePage() {
  return <EnvironmentLevelOverview level="excellence" levelColor={MODULE_PALETTE.environment.excellence} />;
}
