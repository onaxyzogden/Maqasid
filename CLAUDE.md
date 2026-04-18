# MILOS V2.1

Islamic life operating system — manage work, money, people, and operations across the Seven Maqasid (Faith, Life, Intellect, Family, Wealth, Environment, Ummah).
React 19 SPA · Zustand 5 · React Router 7 · Vite 8 · dnd-kit · Lucide icons · date-fns

## Platform
This project runs on Windows. Do not suggest Bash installers, Unix-specific commands, or assume POSIX paths. Use PowerShell or cmd equivalents. Watch for cp1252/UTF-8 encoding issues when reading/writing files.

## Code Conventions

### String Escaping
When writing JavaScript/JSON strings containing apostrophes (e.g., Qur'an, don't), always use double quotes or properly escape. Verify files compile after writing.

## Build & Dev Commands
```bash
npm run dev        # Start Vite dev server
npm run build      # Production build
npm run lint       # ESLint (flat config, eslint.config.js)
npm run preview    # Preview production build
```
No test framework is configured.

## MANDATORY: Context-First Protocol
STOP. Before you read, modify, or explore ANY source file, you MUST complete these steps in order:
1. **Amanah Gate** — Confirm the task serves a halal purpose. If riba, gharar, or ethical concerns arise — STOP and flag. Full protocol: `docs/principles.md`
2. **Identify domains** — Which workspaces does this task touch? (e.g., "readiness checks" → `src/components/islamic/` + `src/data/`)
3. **Read CONTEXT.md files** — Use the routing hierarchy below to find and READ every relevant CONTEXT.md BEFORE opening any `.jsx`, `.js`, or `.css` file. The CONTEXT.md contains file inventories, architecture, store dependencies, and gotchas that eliminate exploratory scanning.
4. **Only then** read specific source files for details the CONTEXT.md does not cover.
**This is not optional.** Subagents MUST also receive the relevant CONTEXT.md path(s) in their prompts. Do NOT launch explore agents or grep for files that the CONTEXT.md already documents.
## Routing Hierarchy
Start at root `CONTEXT.md` and follow the chain. Each CONTEXT.md routes to its children.
## Cross-Cutting Rules
- Plan mode for any non-trivial task (3+ steps or irreversible changes)
- Use subagents for research/exploration to keep main context clean
- Never mark done without verification
- After any correction: update `tasks/lessons.md`
- Full workflow principles: `docs/principles.md`
- Can't find a file? Run `python scripts/pathfinder.py discover "Name"` — searches and patches routing

## Workflow Rules

### After Refactoring / File Moves
Always run a full build (`npm run build` or equivalent) after moving files or reorganizing. Grep for ALL import references to moved files including CSS imports, relative paths at different nesting depths, and data file imports.

## Hemisphere Division
| Side | Directories | Owner | AI Access |
|---|---|---|---|
| Human | `notes/`, `tasks/`, `docs/` | Yousef | Read (tasks, docs); No access (notes) |
| Machine | `src/`, `scripts/`, `dist/` | Claude Code | Full read/write |
| Shared | `references/`, `stages/` | Both | Read (references); Write to stages, read+review by human |
| Marketing | `website/` | Yousef | Read-only (static HTML, no build) |
| OLOS | `atlas/` (submodule) | Both | Separate repo — read here, develop in atlas repo |
| Wiki | `wiki/` | Claude Code | Full read/write (LLM-owned knowledge base) |
## Naming Conventions — Status Tracking
- Stage gate files: `[phase]-[slug]-[status].md` (e.g., `research-crm-revamp-review.md`)
- Status values: `draft` | `review` | `approved` | `rejected`
- Reference docs: kebab-case descriptive (`style-guide.md`, `voice-and-tone.md`)
- Journal entries: `YYYY-MM-DD.md` in `notes/journal/`
## CI/CD Safety Flags
- Destructive operations (store reset, data migration) require a `stages/` approval doc
- Never auto-deploy without human review gate approval
- `.obsidian/` and `notes/` are .gitignored — personal config, not shared

## Verification

### Preview Verification
When verifying UI changes in preview, do not claim something is working without a screenshot confirming it. If the screenshot tool is unresponsive, say so rather than assuming success.

## UI Development

### HTML-to-React Conversions
When converting HTML designs to React components, match the original HTML pixel-for-pixel. Do not 'improve' or reinterpret the design unless explicitly asked. Show a side-by-side comparison before moving on.

## Website (ogden-hub)
Static marketing site merged from ogden-hub repo. Lives in `website/`.
Pure HTML — no build system, no Node.js dependencies.
Domain: bismillah.ogden.ag (deployment postponed).

## OLOS (git submodule)
Geospatial land intelligence app. Linked as submodule at `atlas/`.
Separate repo: `onaxyzogden/atlas`. Own monorepo (pnpm + Turborepo).
Stack: React 18 + TypeScript + Vite + MapboxGL + Fastify + PostgreSQL/PostGIS.
Domain: atlas.ogden.ag. Develop in the atlas repo directly — submodule is for reference.
