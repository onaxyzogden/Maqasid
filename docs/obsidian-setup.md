# Obsidian + Claude Code Integration

## Model
- **Obsidian** = the visual map/library. Yousef browses, reviews, journals here.
- **Claude Code** = the librarian. Executes, files, routes, and builds on the same filesystem.
- Both point at the same directory. Changes by either tool are immediately visible to the other.

## Hemisphere Division
| Side | Directories | Who writes |
|---|---|---|
| Human | `notes/`, `tasks/`, `docs/` | Yousef (AI reads tasks/docs, no access to notes) |
| Machine | `src/`, `scripts/`, `dist/` | Claude Code |
| Shared | `references/`, `stages/` | Both (stages = review gates, references = read-only constraints) |

## Installed Plugins
- **Templater** — auto-applies templates when creating files in `notes/journal/` (daily journal) and `stages/` (review gate)
- **Terminal** — shell access inside Obsidian for npm/git commands
- **Obsidian Git** — version control integration
- **Web Browser** — integrated research without leaving the vault

## Terminal + Claude Code
The Obsidian terminal plugin may not find `claude` in PATH on Windows. Run Claude Code from an external terminal (Windows Terminal, PowerShell, or VS Code) pointed at the vault directory. This is by design — Obsidian handles the visual layer, Claude Code handles execution.

## Graph View
Color-coded by architecture layer:
- **Green** — CONTEXT.md files (routing network)
- **Orange** — CLAUDE.md (entry point)
- **Yellow** — stages/ (review gates)
- **Blue** — notes/ (human hemisphere)
