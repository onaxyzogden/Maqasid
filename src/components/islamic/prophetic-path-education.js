import { submodulesForNode } from '@data/prophetic-path-submodules';
import { getPillarSubmoduleIds } from '@data/submodule-registry';

// Submodule ids in scope for the Education view of a node/moduleGroup pair.
// Prefers the pillar's canonical submodule list (e.g., Wealth → all 4) when
// moduleId is a registered pillar; falls back to the node's moduleGroup scope
// for non-pillar groups like 'community'. Shared by EducationList (the picker
// in PropheticPathMirror.jsx) and NodePhaseSlideUp's per-submodule
// study-tasks builder, so the two can never drift out of sync on which
// submodules are in scope.
//
// Lives in its own file (not PropheticPathMirror.jsx) because it needs
// getPillarSubmoduleIds from submodule-registry.js, and PropheticPathMirror.jsx
// is a components-only file under react-refresh/only-export-components — a
// second non-component export there breaks fast refresh lint.
export function educationSubmoduleIds(nodeId, moduleId) {
  const pillarSubs = getPillarSubmoduleIds(moduleId);
  return pillarSubs.length > 0 ? pillarSubs : submodulesForNode(nodeId, moduleId);
}
