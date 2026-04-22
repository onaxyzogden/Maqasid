import IntellectLevelOverview from './IntellectLevelOverview';
import { MODULE_PALETTE } from '@data/module-palette';

// Re-export constants for backward compatibility with submodule pages & registry.
export {
  INTELLECT_PILLARS,
  INTELLECT_LEVEL_ROUTES,
  INTELLECT_STORAGE_KEY,
  INTELLECT_ENSURE_PROJECTS,
} from './IntellectLevelNavigator';

export const INTELLECT_LEVEL_DESCRIPTIONS = {
  core:       { title: 'Core Literacy',      desc: 'Essential knowledge, foundational thinking habits, and cognitive clarity that anchor all learning.' },
  growth:     { title: 'Deepening Mastery',  desc: 'Structured inquiry, professional development, and critical engagement that expand capability.' },
  excellence: { title: 'Wisdom',             desc: 'The refinement of thought, craft, and discernment toward peak intellectual contribution.' },
};

export default function IntellectCorePage() {
  return <IntellectLevelOverview level="core" levelColor={MODULE_PALETTE.intellect.core} />;
}
