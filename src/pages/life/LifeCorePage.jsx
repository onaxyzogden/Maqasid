import LifeLevelOverview from './LifeLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function LifeCorePage() {
  return <LifeLevelOverview level="core" levelColor={MODULE_PALETTE.life.core} />;
}
