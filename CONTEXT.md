# Maqasid OS V2.1 — Root Context (Layer 1 Task Router)

## Workspace Map

| If your task involves… | Go to workspace | Read first |
|---|---|---|
| Building features, fixing bugs, modifying UI or logic | `src/` | `src/CONTEXT.md` |
| Reading or updating project documentation, principles | `docs/` | `docs/CONTEXT.md` |
| Tracking tasks, reviewing lessons, project status | `tasks/` | `tasks/CONTEXT.md` |
| Finding lost files, maintaining CONTEXT.md routing | `scripts/` | `python scripts/pathfinder.py --help` |
| Checking style guides, voice docs, component specs | `references/` | `references/CONTEXT.md` |
| Reviewing staged output, approving deliverables | `stages/` | `stages/CONTEXT.md` |
| Personal notes, journals, brainstorms | `notes/` | `notes/CONTEXT.md` |
| Marketing website, landing pages, static HTML | `website/` | `website/CONTEXT.md` |
| Atlas land intelligence app (submodule) | `atlas/` | `atlas/README.md` |

## Project Entry Points
- **App bootstrap**: `index.html` → `src/main.jsx` → `src/App.jsx` (router + route definitions)
- **Build config**: `vite.config.js`, `eslint.config.js`
- **Dependencies**: `package.json` (React 19, Zustand 5, Router 7, Vite 8, dnd-kit, Lucide, date-fns)
- **Workflow principles**: `docs/principles.md` (Amanah Gate, Itqan, Sidq, verification rules)
- **Marketing website**: `website/index.html` (pure static HTML, no build)
- **Atlas app**: `atlas/` (git submodule → `onaxyzogden/atlas`, pnpm + Turborepo)
