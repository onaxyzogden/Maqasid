import LifeLevelOverview from './LifeLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

export default function LifeExcellencePage() {
  return <LifeLevelOverview level="excellence" levelColor={MODULE_PALETTE.life.excellence} />;
}
