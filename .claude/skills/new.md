---
name: new
description: Scaffold a new component, page, store, hook, or data file following project conventions
user_invocable: true
---

# /new — Scaffold New File

Create a new file following Maqasid OS conventions. Usage: `/new [type] [name]`

**Types**: `component`, `page`, `store`, `hook`, `data`

## Steps

1. **Parse arguments**: Extract type and name from the user's input
2. **Read conventions**: Open `src/CONTEXT.md` for factory rules (React 19 functional components, Zustand 5 stores, etc.)
3. **Determine target directory**:
   - `component` → Ask which module folder under `src/components/`
   - `page` → Ask which pillar/module folder under `src/pages/`
   - `store` → `src/store/`
   - `hook` → `src/hooks/`
   - `data` → Ask which subdirectory under `src/data/`
4. **Create file** following the patterns in the target directory's CONTEXT.md
5. **Update CONTEXT.md**: Run `python scripts/pathfinder.py update-inventory [target-dir]` to add the new file to the inventory table
6. **Check 8-file threshold**: If the directory now has 8+ files, flag for potential sub-room creation with a new CONTEXT.md

## Scaffold Templates

### Component
```jsx
export default function [Name]() {
  return (
    <div className="[kebab-name]">
      {/* TODO */}
    </div>
  );
}
```

### Store
```js
import { create } from 'zustand';

const STORAGE_KEY = 'bbiz_[name]';

export const use[Name]Store = create((set, get) => ({
  // state
  // actions
}));
```

### Hook
```js
import { useState, useEffect } from 'react';

export function use[Name]() {
  // hook logic
}
```
