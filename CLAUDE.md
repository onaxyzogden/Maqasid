# MILOS V2.1

Islamic life operating system — manage work, money, people, and operations across the Seven Maqasid (Faith, Health, Intellect, Family, Wealth, Environment, Community).
React 19 SPA · Zustand 5 · React Router 7 · Vite 8 · dnd-kit · Lucide icons · date-fns

## Platform
This project runs on Windows. Do not suggest Bash installers, Unix-specific commands, or assume POSIX paths. Use PowerShell or cmd equivalents. Watch for cp1252/UTF-8 encoding issues when reading/writing files.

## Code Conventions
- String escaping: when writing JavaScript/JSON strings containing apostrophes (e.g., Qur'an, don't), always use double quotes or properly escape. Verify files compile after writing.
- Build, test and seed-task grounding rules: root `CONTEXT.md`. Run `npm test` and `npm run lint` after any seed-task edit.

## MANDATORY: Context-First Protocol
STOP. Before you read, modify, or explore ANY source file, you MUST complete these steps in order:
1. **Amanah Gate** — If the task may not serve a halal purpose, or riba, gharar or another ethical concern arises, STOP and flag it. The gate itself runs as the Phase 1 plan task. Full protocol: `docs/principles.md`
   - In every Stage 03 plan, the Amanah Gate is a Phase 1 task with no verdict until it runs, and the plan says what stops on a non-pass verdict. A session-start or Stage 02 Amanah status is a declaration, not that verdict, and this holds for low-risk tasks too, such as identifier renames.
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
- After refactoring or file moves: run a full build (`npm run build`) and grep for ALL import references to moved files, including CSS imports, relative paths at different nesting depths, and data file imports.

## Hemisphere Division
| Side | Directories | Owner | AI Access |
|---|---|---|---|
| Human | `notes/`, `tasks/`, `docs/` | Yousef | Read (tasks, docs); No access (notes) |
| Machine | `src/`, `scripts/`, `dist/` | Claude Code | Full read/write |
| Shared | `references/`, `stages/` | Both | Read (references); Write to stages, read+review by human |
| Marketing | `website/` | Yousef | Read-only (static HTML, no build) |
| OLOS | `atlas/` (submodule) | Both | Separate repo — read here, develop in atlas repo |
| Wiki | `wiki/` | Claude Code | Full read/write (LLM-owned knowledge base) |
## Naming & Safety
- Stage gate naming and workflow: `stages/CONTEXT.md`. Other naming conventions: root `CONTEXT.md`.
- Destructive operations (store reset, data migration) require a `stages/` approval doc
- Never auto-deploy without human review gate approval
- `.obsidian/` and `notes/` are .gitignored — personal config, not shared

## Verification & UI
- Preview: do not claim a UI change is working without a screenshot confirming it. If the screenshot tool is unresponsive, say so rather than assuming success.
- HTML-to-React: match the original HTML pixel-for-pixel. Do not 'improve' or reinterpret the design unless explicitly asked. Show a side-by-side comparison before moving on.
- Website (ogden-hub, `website/`) and OLOS (`atlas/` submodule) details: `website/CONTEXT.md` and root `CONTEXT.md`.
