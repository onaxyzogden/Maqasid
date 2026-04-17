---
title: "Upgrade lucide-react 0.511 → 1.8 for module icon refresh"
type: decision
date: 2026-04-17
status: accepted
tags: [dependencies, ui, icons, lucide]
---

# Upgrade lucide-react 0.511 → 1.8 for module icon refresh

## Context

Four module icons were revised for semantic fit:

- Circulation & Impact: `Gift` → `CircleFadingArrowUp`
- Moontrance Residency: `Building` → `HousePlus`
- Moontrance Land: `Mountain` → `MapPinned`
- Collective: `UsersRound` → `Shapes`

`HousePlus` and `MapPinned` are not present in lucide-react 0.511 (the installed version). Options considered: substitute an available icon, or upgrade.

## Decision

Upgrade `lucide-react` to 1.8.0. Use the chosen icons as-is.

After upgrade, Vite's pre-bundled dep cache kept serving 0.511 artifacts and threw `does not provide an export named 'HousePlus'`. Clearing `node_modules/.vite` and restarting the preview server resolved it.

## Rationale

- Icon semantic fit matters more than holding lucide-react back; no breaking API changes in the icons we use.
- 1.8 is a minor bump in SemVer terms for this package family and does not affect other dependencies.

## Consequences

### Positive
- Access to a much larger icon catalog going forward.

### Negative / Gotchas
- Vite dep pre-bundle cache is stale after the bump — remember to `rm -rf node_modules/.vite` and restart dev/preview server when swapping icon imports post-upgrade.
- ICON_MAP dicts in `Sidebar.jsx` and `TaskDetailPanel.jsx` are hand-maintained; every icon string added to `modules.js` must also be registered in both maps.

## Related

- [[maqasid-os]]
- `package.json`, `src/data/modules.js`, `src/components/layout/Sidebar.jsx`, `src/components/work/TaskDetailPanel.jsx`
- Commit `cd5bd55`
