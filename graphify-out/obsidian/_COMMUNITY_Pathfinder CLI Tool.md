---
type: community
cohesion: 0.07
members: 50
---

# Pathfinder CLI Tool

**Cohesion:** 0.07 - loosely connected
**Members:** 50 nodes

## Members
- [[Add a routing table row in the parent CONTEXT.md.]] - rationale - scripts\pathfinder.py
- [[Add a row to a routing table in a CONTEXT.md.      Returns (changed bool, messa]] - rationale - scripts\pathfinder.py
- [[Add a row to the File Inventory table. Alphabetical insertion.      Returns (cha]] - rationale - scripts\pathfinder.py
- [[Apply inventory sync add new files, keep existing descriptions.]] - rationale - scripts\pathfinder.py
- [[Check all CONTEXT.md and CLAUDE.md files against line limits.]] - rationale - scripts\pathfinder.py
- [[Check if a CONTEXT.md has a File Inventory table ( File  Description ).]] - rationale - scripts\pathfinder.py
- [[Check if filename appears in a CONTEXT.md's File Inventory table.]] - rationale - scripts\pathfinder.py
- [[Check that subfolders with CONTEXT.md are referenced in parent routing tables.]] - rationale - scripts\pathfinder.py
- [[Find CONTEXT.md inventory entries where the file no longer exists on disk.]] - rationale - scripts\pathfinder.py
- [[Find a file by name, show CONTEXT chain, optionally patch.]] - rationale - scripts\pathfinder.py
- [[Find a table whose header row contains header_keyword (case-insensitive).      R]] - rationale - scripts\pathfinder.py
- [[Find files whose stem matches name (case-insensitive).      Priority exact matc]] - rationale - scripts\pathfinder.py
- [[Find folders with FOLDER_CONTEXT_THRESHOLD+ source files but no CONTEXT.md.]] - rationale - scripts\pathfinder.py
- [[Find source files not listed in their module's CONTEXT.md inventory.      Only c]] - rationale - scripts\pathfinder.py
- [[Find the line range of a markdown section by heading text.     Returns (heading_]] - rationale - scripts\pathfinder.py
- [[Full health check of CONTEXT.md architecture.]] - rationale - scripts\pathfinder.py
- [[Generate a skeleton CONTEXT.md for a folder that lacks one.]] - rationale - scripts\pathfinder.py
- [[Get list of filenames from a CONTEXT.md's File Inventory table.]] - rationale - scripts\pathfinder.py
- [[Given a relative POSIX file path, return the chain of CONTEXT.md files.      Ret]] - rationale - scripts\pathfinder.py
- [[Render a markdown table from headers and row data.]] - rationale - scripts\pathfinder.py
- [[Split ' a  b  c ' into 'a', 'b', 'c' (stripped).]] - rationale - scripts\pathfinder.py
- [[Sync a module's File Inventory table with actual files on disk.]] - rationale - scripts\pathfinder.py
- [[Walk the project tree, skip SKIP_DIRS, return matching Paths.]] - rationale - scripts\pathfinder.py
- [[Write content to file only if it differs from current content.]] - rationale - scripts\pathfinder.py
- [[_apply_inventory_sync()]] - code - scripts\pathfinder.py
- [[add_inventory_row()]] - code - scripts\pathfinder.py
- [[add_routing_row()]] - code - scripts\pathfinder.py
- [[audit_line_counts()]] - code - scripts\pathfinder.py
- [[audit_missing_contexts()]] - code - scripts\pathfinder.py
- [[audit_orphan_files()]] - code - scripts\pathfinder.py
- [[audit_routing_coverage()]] - code - scripts\pathfinder.py
- [[audit_stale_entries()]] - code - scripts\pathfinder.py
- [[check_file_in_inventory()]] - code - scripts\pathfinder.py
- [[cmd_audit()]] - code - scripts\pathfinder.py
- [[cmd_discover()]] - code - scripts\pathfinder.py
- [[cmd_init_context()]] - code - scripts\pathfinder.py
- [[cmd_patch_route()]] - code - scripts\pathfinder.py
- [[cmd_update_inventory()]] - code - scripts\pathfinder.py
- [[find_file()]] - code - scripts\pathfinder.py
- [[find_section()]] - code - scripts\pathfinder.py
- [[get_inventory_files()]] - code - scripts\pathfinder.py
- [[has_inventory_table()]] - code - scripts\pathfinder.py
- [[main()]] - code - scripts\pathfinder.py
- [[parse_cells()]] - code - scripts\pathfinder.py
- [[parse_markdown_table()]] - code - scripts\pathfinder.py
- [[pathfinder.py]] - code - scripts\pathfinder.py
- [[render_markdown_table()]] - code - scripts\pathfinder.py
- [[resolve_context_chain()]] - code - scripts\pathfinder.py
- [[safe_write()]] - code - scripts\pathfinder.py
- [[scan_tree()]] - code - scripts\pathfinder.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Pathfinder_CLI_Tool
SORT file.name ASC
```
