#!/usr/bin/env python3
"""Pathfinder — CONTEXT.md discovery and maintenance for Maqasid OS.

Automated Edit-Source loop: discovers files, patches routing tables,
audits structural health, and generates skeleton CONTEXT.md files.

Usage:
    python scripts/pathfinder.py discover "KanbanCard"
    python scripts/pathfinder.py discover "KanbanCard" --patch
    python scripts/pathfinder.py audit
    python scripts/pathfinder.py update-inventory src/components/islamic/
    python scripts/pathfinder.py update-inventory src/components/islamic/ --dry-run
    python scripts/pathfinder.py patch-route "pillar cards" src/components/dashboard/
    python scripts/pathfinder.py init-context src/components/dashboard/
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

# ─── Constants ───────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SOURCE_EXTENSIONS = {'.jsx', '.js', '.css'}
INVENTORY_EXTENSIONS = {'.jsx', '.js'}  # CSS excluded from inventories (convention)
CONTEXT_FILENAME = 'CONTEXT.md'
CLAUDE_FILENAME = 'CLAUDE.md'

MAX_CLAUDE_LINES = 50
MAX_CONTEXT_LINES = 100
FOLDER_CONTEXT_THRESHOLD = 8

SKIP_DIRS = {'node_modules', 'dist', '.git', '.github', '.claude', '__pycache__', '.obsidian', 'notes'}

# ─── Markdown Parsing ───────────────────────────────────────────────

TABLE_ROW_RE = re.compile(r'^\s*\|(.+)\|\s*$')
TABLE_SEP_RE = re.compile(r'^\s*\|[\s\-:]+(\|[\s\-:]+)*\|\s*$')


def parse_cells(line):
    """Split '| a | b | c |' into ['a', 'b', 'c'] (stripped)."""
    line = line.strip()
    if line.startswith('|'):
        line = line[1:]
    if line.endswith('|'):
        line = line[:-1]
    return [cell.strip() for cell in line.split('|')]


def parse_markdown_table(lines, header_keyword):
    """Find a table whose header row contains header_keyword (case-insensitive).

    Returns (start_idx, end_idx, header_cells, data_rows) where
    data_rows is a list of lists of cell strings.
    Returns None if no matching table found.
    """
    keyword_lower = header_keyword.lower()
    i = 0
    while i < len(lines):
        line = lines[i]
        if TABLE_ROW_RE.match(line) and keyword_lower in line.lower():
            # Potential header row
            header_cells = parse_cells(line)
            # Next line should be separator
            if i + 1 < len(lines) and TABLE_SEP_RE.match(lines[i + 1]):
                start_idx = i
                data_rows = []
                j = i + 2  # skip header + separator
                while j < len(lines) and TABLE_ROW_RE.match(lines[j]):
                    if TABLE_SEP_RE.match(lines[j]):
                        break
                    data_rows.append(parse_cells(lines[j]))
                    j += 1
                return (start_idx, j, header_cells, data_rows)
        i += 1
    return None


def render_markdown_table(headers, rows):
    """Render a markdown table from headers and row data."""
    # Calculate column widths
    col_widths = [len(h) for h in headers]
    for row in rows:
        for ci, cell in enumerate(row):
            if ci < len(col_widths):
                col_widths[ci] = max(col_widths[ci], len(cell))

    def fmt_row(cells):
        parts = []
        for ci, cell in enumerate(cells):
            w = col_widths[ci] if ci < len(col_widths) else len(cell)
            parts.append(f' {cell:<{w}} ')
        return '|' + '|'.join(parts) + '|'

    result = [fmt_row(headers)]
    result.append('|' + '|'.join('-' * (w + 2) for w in col_widths) + '|')
    for row in rows:
        # Pad row to match header count
        padded = list(row) + [''] * (len(headers) - len(row))
        result.append(fmt_row(padded[:len(headers)]))
    return '\n'.join(result)


def find_section(lines, heading_text):
    """Find the line range of a markdown section by heading text.
    Returns (heading_line_idx, next_heading_line_idx_or_eof).
    Returns None if not found.
    """
    heading_lower = heading_text.lower()
    heading_re = re.compile(r'^#{1,6}\s+')
    start = None
    for i, line in enumerate(lines):
        if heading_re.match(line) and heading_lower in line.lower():
            start = i
            continue
        if start is not None and heading_re.match(line):
            return (start, i)
    if start is not None:
        return (start, len(lines))
    return None


# ─── Discovery Engine ───────────────────────────────────────────────

def scan_tree(root=None, extensions=None):
    """Walk the project tree, skip SKIP_DIRS, return matching Paths."""
    root = root or PROJECT_ROOT
    results = []
    for dirpath, dirnames, filenames in os.walk(root):
        # Skip excluded directories
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fname in filenames:
            fpath = Path(dirpath) / fname
            if extensions is None or fpath.suffix in extensions:
                results.append(fpath)
    return results


def find_file(name):
    """Find files whose stem matches name (case-insensitive).

    Priority: exact match > startswith > substring.
    Returns list of (rel_path_posix, match_type) sorted by relevance.
    """
    name_lower = name.lower()
    # Strip extension from search name if provided
    name_stem = Path(name_lower).stem

    all_files = scan_tree(extensions=SOURCE_EXTENSIONS)
    exact, starts, contains = [], [], []

    for fpath in all_files:
        stem_lower = fpath.stem.lower()
        rel = fpath.relative_to(PROJECT_ROOT).as_posix()
        if stem_lower == name_stem:
            exact.append((rel, 'exact'))
        elif stem_lower.startswith(name_stem):
            starts.append((rel, 'startswith'))
        elif name_stem in stem_lower:
            contains.append((rel, 'substring'))

    exact.sort(key=lambda x: x[0])
    starts.sort(key=lambda x: x[0])
    contains.sort(key=lambda x: x[0])
    return exact + starts + contains


def resolve_context_chain(file_path_posix):
    """Given a relative POSIX file path, return the chain of CONTEXT.md files.

    Returns list of dicts: {path_posix, abs_path, exists, has_file_in_inventory}.
    """
    parts = Path(file_path_posix).parts
    filename = parts[-1]
    chain = []

    # Root CONTEXT.md
    root_ctx = PROJECT_ROOT / CONTEXT_FILENAME
    chain.append({
        'path_posix': CONTEXT_FILENAME,
        'abs_path': root_ctx,
        'exists': root_ctx.exists(),
        'has_file': None,  # root doesn't have file inventories
    })

    # Walk up from file's directory
    # e.g. src/components/islamic/PrayerTime.jsx → check src/, src/components/, src/components/islamic/
    for depth in range(1, len(parts)):
        dir_path = Path(*parts[:depth])
        ctx_path = PROJECT_ROOT / dir_path / CONTEXT_FILENAME
        chain.append({
            'path_posix': (dir_path / CONTEXT_FILENAME).as_posix(),
            'abs_path': ctx_path,
            'exists': ctx_path.exists(),
            'has_file': None,
        })

    # Check if the file appears in the deepest existing CONTEXT.md inventory
    for entry in reversed(chain):
        if entry['exists']:
            entry['has_file'] = check_file_in_inventory(entry['abs_path'], filename)
            break

    return chain


def check_file_in_inventory(context_abs_path, filename):
    """Check if filename appears in a CONTEXT.md's File Inventory table."""
    if not context_abs_path.exists():
        return False
    try:
        content = context_abs_path.read_text(encoding='utf-8')
    except Exception:
        return False
    lines = content.splitlines()
    result = parse_markdown_table(lines, 'File')
    if result is None:
        return False
    _, _, _, data_rows = result
    for row in data_rows:
        if row and filename.lower() in row[0].lower():
            return True
    return False


def get_inventory_files(context_abs_path):
    """Get list of filenames from a CONTEXT.md's File Inventory table."""
    if not context_abs_path.exists():
        return []
    try:
        content = context_abs_path.read_text(encoding='utf-8')
    except Exception:
        return []
    lines = content.splitlines()
    result = parse_markdown_table(lines, 'File')
    if result is None:
        return []
    _, _, _, data_rows = result
    return [row[0].strip() for row in data_rows if row]


# ─── Patching Engine ────────────────────────────────────────────────

def safe_write(path, content):
    """Write content to file only if it differs from current content."""
    path = Path(path)
    if path.exists():
        try:
            existing = path.read_text(encoding='utf-8')
            if existing == content:
                return False  # No change needed
        except Exception:
            pass
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding='utf-8')
    return True


def add_inventory_row(context_abs_path, filename, description=''):
    """Add a row to the File Inventory table. Alphabetical insertion.

    Returns (changed: bool, message: str).
    """
    context_abs_path = Path(context_abs_path)
    if not context_abs_path.exists():
        return False, f'CONTEXT.md does not exist: {context_abs_path}'

    content = context_abs_path.read_text(encoding='utf-8')
    lines = content.splitlines()
    result = parse_markdown_table(lines, 'File')

    if result is None:
        return False, 'No File Inventory table found in CONTEXT.md'

    start_idx, end_idx, headers, data_rows = result

    # Check if already present
    for row in data_rows:
        if row and row[0].strip().lower() == filename.lower():
            return False, f'{filename} already in inventory'

    # Insert alphabetically
    desc = description or '*(to be documented)*'
    new_row = [filename, desc]
    data_rows.append(new_row)
    data_rows.sort(key=lambda r: r[0].lower() if r else '')

    # Rebuild the table
    new_table = render_markdown_table(headers, data_rows)
    new_lines = lines[:start_idx] + new_table.splitlines() + lines[end_idx:]
    new_content = '\n'.join(new_lines) + '\n'

    # Check line count guardrail
    new_line_count = len(new_lines)
    if new_line_count > MAX_CONTEXT_LINES:
        return False, (
            f'WARNING: Adding {filename} would push {context_abs_path.name} to '
            f'{new_line_count} lines (limit: {MAX_CONTEXT_LINES}). '
            f'Consider splitting into a child CONTEXT.md.'
        )

    changed = safe_write(context_abs_path, new_content)
    if changed:
        return True, f'Added {filename} to inventory'
    return False, f'{filename} already in inventory (no change)'


def add_routing_row(context_abs_path, keyword, folder, read_first):
    """Add a row to a routing table in a CONTEXT.md.

    Returns (changed: bool, message: str).
    """
    context_abs_path = Path(context_abs_path)
    if not context_abs_path.exists():
        return False, f'CONTEXT.md does not exist: {context_abs_path}'

    content = context_abs_path.read_text(encoding='utf-8')
    lines = content.splitlines()

    # Try to find a routing table (contains "involves" or "Folder" or "Go to")
    result = parse_markdown_table(lines, 'involves')
    if result is None:
        result = parse_markdown_table(lines, 'Folder')
    if result is None:
        result = parse_markdown_table(lines, 'Go to')
    if result is None:
        return False, 'No routing table found in CONTEXT.md'

    start_idx, end_idx, headers, data_rows = result

    # Check if folder already covered (compare folder basenames and full paths)
    folder_normalized = folder.rstrip('/').replace('\\', '/')
    folder_basename = Path(folder_normalized).name
    for row in data_rows:
        if len(row) >= 2:
            existing = row[1].strip().strip('`').rstrip('/')
            existing_basename = Path(existing).name if existing else ''
            if existing == folder_normalized or existing_basename == folder_basename:
                return False, f'Folder {folder} already in routing table'

    # Add new row
    folder_display = f'`{folder_normalized}/`'
    read_display = f'`{read_first}`'
    new_row = [keyword, folder_display, read_display]
    data_rows.append(new_row)

    # Rebuild
    new_table = render_markdown_table(headers, data_rows)
    new_lines = lines[:start_idx] + new_table.splitlines() + lines[end_idx:]
    new_content = '\n'.join(new_lines) + '\n'

    changed = safe_write(context_abs_path, new_content)
    if changed:
        return True, f'Added routing row for {folder}'
    return False, 'No change needed'


# ─── Audit Engine ────────────────────────────────────────────────────

def audit_line_counts():
    """Check all CONTEXT.md and CLAUDE.md files against line limits."""
    results = []

    # Check CLAUDE.md
    claude_path = PROJECT_ROOT / CLAUDE_FILENAME
    if claude_path.exists():
        lines = claude_path.read_text(encoding='utf-8').splitlines()
        count = len(lines)
        status = 'WARNING' if count > MAX_CLAUDE_LINES else 'OK'
        results.append({
            'file': CLAUDE_FILENAME,
            'lines': count,
            'limit': MAX_CLAUDE_LINES,
            'status': status,
        })

    # Check all CONTEXT.md files
    for ctx in scan_tree(extensions=None):
        if ctx.name == CONTEXT_FILENAME:
            rel = ctx.relative_to(PROJECT_ROOT).as_posix()
            lines = ctx.read_text(encoding='utf-8').splitlines()
            count = len(lines)
            status = 'WARNING' if count > MAX_CONTEXT_LINES else 'OK'
            results.append({
                'file': rel,
                'lines': count,
                'limit': MAX_CONTEXT_LINES,
                'status': status,
            })

    results.sort(key=lambda r: r['file'])
    return results


def audit_missing_contexts():
    """Find folders with FOLDER_CONTEXT_THRESHOLD+ source files but no CONTEXT.md."""
    results = []
    seen_dirs = {}

    for fpath in scan_tree(extensions=INVENTORY_EXTENSIONS):
        parent = fpath.parent
        rel_parent = parent.relative_to(PROJECT_ROOT).as_posix()
        if rel_parent not in seen_dirs:
            seen_dirs[rel_parent] = {'count': 0, 'has_context': (parent / CONTEXT_FILENAME).exists()}
        seen_dirs[rel_parent]['count'] += 1

    for folder, info in sorted(seen_dirs.items()):
        if info['count'] >= FOLDER_CONTEXT_THRESHOLD and not info['has_context']:
            results.append({
                'folder': folder,
                'file_count': info['count'],
                'threshold': FOLDER_CONTEXT_THRESHOLD,
            })

    return results


def has_inventory_table(context_abs_path):
    """Check if a CONTEXT.md has a File Inventory table (| File | Description |)."""
    if not context_abs_path.exists():
        return False
    try:
        content = context_abs_path.read_text(encoding='utf-8')
    except Exception:
        return False
    return parse_markdown_table(content.splitlines(), 'File') is not None


def audit_orphan_files():
    """Find source files not listed in their module's CONTEXT.md inventory.

    Only checks folders whose CONTEXT.md has a | File | Description | table.
    Folders using prose/bullet listings are skipped (different documentation style).
    """
    results = []
    seen_dirs = {}

    for fpath in scan_tree(extensions=INVENTORY_EXTENSIONS):
        parent = fpath.parent
        if parent not in seen_dirs:
            ctx_path = parent / CONTEXT_FILENAME
            has_table = has_inventory_table(ctx_path)
            seen_dirs[parent] = {
                'ctx_exists': ctx_path.exists(),
                'has_table': has_table,
                'inventory': get_inventory_files(ctx_path) if has_table else [],
            }
        info = seen_dirs[parent]
        if info['ctx_exists'] and info['has_table']:
            fname = fpath.name
            inv_lower = [f.lower() for f in info['inventory']]
            if fname.lower() not in inv_lower:
                rel = fpath.relative_to(PROJECT_ROOT).as_posix()
                results.append({
                    'file': rel,
                    'context': (parent / CONTEXT_FILENAME).relative_to(PROJECT_ROOT).as_posix(),
                })

    return results


def audit_stale_entries():
    """Find CONTEXT.md inventory entries where the file no longer exists on disk."""
    results = []

    for ctx_path in scan_tree(extensions=None):
        if ctx_path.name != CONTEXT_FILENAME:
            continue
        inventory = get_inventory_files(ctx_path)
        parent = ctx_path.parent
        for fname in inventory:
            fname_clean = fname.strip().strip('`')
            if not fname_clean:
                continue
            actual = parent / fname_clean
            if not actual.exists():
                results.append({
                    'entry': fname_clean,
                    'context': ctx_path.relative_to(PROJECT_ROOT).as_posix(),
                })

    return results


def audit_routing_coverage():
    """Check that subfolders with CONTEXT.md are referenced in parent routing tables."""
    results = []

    for ctx_path in scan_tree(extensions=None):
        if ctx_path.name != CONTEXT_FILENAME:
            continue
        # Check if this folder's CONTEXT.md is referenced in parent's CONTEXT.md
        folder = ctx_path.parent
        if folder == PROJECT_ROOT:
            continue  # Root CONTEXT.md doesn't need a parent reference

        parent_ctx = folder.parent / CONTEXT_FILENAME
        if not parent_ctx.exists():
            continue

        # Read parent and check if this folder appears
        parent_content = parent_ctx.read_text(encoding='utf-8').lower()
        folder_name = folder.name.lower()
        if folder_name not in parent_content:
            rel_folder = folder.relative_to(PROJECT_ROOT).as_posix()
            results.append({
                'folder': rel_folder,
                'parent_context': parent_ctx.relative_to(PROJECT_ROOT).as_posix(),
            })

    return results


# ─── Commands ────────────────────────────────────────────────────────

def cmd_discover(args):
    """Find a file by name, show CONTEXT chain, optionally patch."""
    matches = find_file(args.name)

    if not matches:
        result = {
            'status': 'NOT_FOUND',
            'query': args.name,
            'message': f'No files matching "{args.name}" found in project.',
        }
        if args.json:
            print(json.dumps(result, indent=2))
        else:
            print(f'NOT FOUND: No files matching "{args.name}" in project.')
            print(f'\nSearched {len(scan_tree(extensions=SOURCE_EXTENSIONS))} source files.')
        return

    output = {'query': args.name, 'matches': []}

    for rel_path, match_type in matches:
        chain = resolve_context_chain(rel_path)
        match_info = {
            'path': rel_path,
            'match_type': match_type,
            'chain': [],
            'actions': [],
        }

        fully_routed = True
        for entry in chain:
            chain_entry = {
                'context': entry['path_posix'],
                'exists': entry['exists'],
                'has_file': entry['has_file'],
            }
            match_info['chain'].append(chain_entry)
            if not entry['exists']:
                fully_routed = False
            if entry['has_file'] is False:
                fully_routed = False

        if fully_routed:
            match_info['status'] = 'FULLY_ROUTED'
        else:
            match_info['status'] = 'GAPS_FOUND'
            # Determine actions needed
            for entry in chain:
                if not entry['exists']:
                    folder = Path(entry['path_posix']).parent.as_posix()
                    if folder == '.':
                        folder = ''
                    action = f'Run: python scripts/pathfinder.py init-context {folder}'
                    match_info['actions'].append(action)
                elif entry['has_file'] is False:
                    filename = Path(rel_path).name
                    action = f'Add {filename} to {entry["path_posix"]} inventory'
                    match_info['actions'].append(action)
                    if args.patch:
                        changed, msg = add_inventory_row(entry['abs_path'], filename)
                        match_info['actions'].append(f'  PATCHED: {msg}')

        output['matches'].append(match_info)

    if args.json:
        # Clean non-serializable data
        clean = json.loads(json.dumps(output, default=str))
        print(json.dumps(clean, indent=2))
    else:
        for mi in output['matches']:
            marker = '✓' if mi['status'] == 'FULLY_ROUTED' else '✗'
            print(f'FOUND: {mi["path"]} ({mi["match_type"]})')
            print()
            print('CONTEXT CHAIN:')
            for ce in mi['chain']:
                icon = '✓' if ce['exists'] else '✗'
                suffix = ''
                if ce['has_file'] is True:
                    suffix = ' → in File Inventory'
                elif ce['has_file'] is False:
                    suffix = ' → NOT in inventory'
                elif not ce['exists']:
                    suffix = ' → MISSING'
                print(f'  {icon} {ce["context"]}{suffix}')
            print()
            if mi['status'] == 'FULLY_ROUTED':
                print('STATUS: Fully routed. No patches needed.')
            else:
                print('STATUS: Gaps found.')
                for action in mi['actions']:
                    print(f'  {action}')
            print()


def cmd_audit(args):
    """Full health check of CONTEXT.md architecture."""
    output = {
        'line_counts': audit_line_counts(),
        'missing_contexts': audit_missing_contexts(),
        'orphan_files': audit_orphan_files(),
        'stale_entries': audit_stale_entries(),
        'routing_gaps': audit_routing_coverage(),
    }

    warnings = sum(1 for r in output['line_counts'] if r['status'] == 'WARNING')
    total_issues = (
        warnings
        + len(output['missing_contexts'])
        + len(output['orphan_files'])
        + len(output['stale_entries'])
        + len(output['routing_gaps'])
    )

    if args.json:
        output['summary'] = {'warnings': warnings, 'total_issues': total_issues}
        print(json.dumps(output, indent=2, default=str))
        return

    print('=== PATHFINDER AUDIT ===\n')

    # Line counts
    print('LINE COUNTS:')
    for r in output['line_counts']:
        dots = '.' * max(1, 45 - len(r['file']))
        flag = f'  {r["status"]}' if r['status'] == 'WARNING' else ''
        print(f'  {r["file"]} {dots} {r["lines"]} lines (limit: {r["limit"]}){flag}')
    print()

    # Missing CONTEXT.md
    print('MISSING CONTEXT.md:')
    if output['missing_contexts']:
        for r in output['missing_contexts']:
            print(f'  {r["folder"]}/ — {r["file_count"]} source files (threshold: {r["threshold"]})')
    else:
        print('  (none)')
    print()

    # Orphan files
    print('ORPHAN FILES (not in any inventory):')
    if output['orphan_files']:
        for r in output['orphan_files']:
            print(f'  {r["file"]}')
            print(f'    Missing from: {r["context"]}')
    else:
        print('  (none)')
    print()

    # Stale entries
    print('STALE ENTRIES (listed but file missing):')
    if output['stale_entries']:
        for r in output['stale_entries']:
            print(f'  {r["entry"]} in {r["context"]}')
    else:
        print('  (none)')
    print()

    # Routing gaps
    print('ROUTING GAPS:')
    if output['routing_gaps']:
        for r in output['routing_gaps']:
            print(f'  {r["folder"]}/ not referenced in {r["parent_context"]}')
    else:
        print('  (none)')
    print()

    print(f'SUMMARY: {warnings} warning(s), {total_issues} total issue(s)')


def cmd_update_inventory(args):
    """Sync a module's File Inventory table with actual files on disk."""
    folder = (PROJECT_ROOT / args.folder.replace('\\', '/')).resolve()
    if not folder.is_dir():
        print(f'ERROR: {args.folder} is not a directory')
        return

    ctx_path = folder / CONTEXT_FILENAME
    if not ctx_path.exists():
        print(f'ERROR: No CONTEXT.md in {args.folder}')
        print(f'  Run: python scripts/pathfinder.py init-context {args.folder}')
        return

    # Scan actual files
    actual_files = sorted(
        f.name for f in folder.iterdir()
        if f.is_file() and f.suffix in INVENTORY_EXTENSIONS and f.name != CONTEXT_FILENAME
    )

    # Parse existing inventory
    inventory = get_inventory_files(ctx_path)
    inv_lower = {f.lower(): f for f in inventory}

    # Compute diff
    new_files = [f for f in actual_files if f.lower() not in inv_lower]
    removed_files = [f for f in inventory if f.lower() not in {a.lower() for a in actual_files}]

    output = {
        'folder': args.folder,
        'actual_count': len(actual_files),
        'inventory_count': len(inventory),
        'new': new_files,
        'removed': removed_files,
    }

    if args.json:
        print(json.dumps(output, indent=2))
        if not args.dry_run and (new_files or removed_files):
            _apply_inventory_sync(ctx_path, actual_files, inventory)
        return

    print(f'INVENTORY SYNC: {args.folder}')
    print(f'  Files on disk: {len(actual_files)}')
    print(f'  In inventory:  {len(inventory)}')
    print()

    if new_files:
        print('  NEW (will be added):')
        for f in new_files:
            print(f'    + {f}')
    if removed_files:
        print('  STALE (file missing from disk):')
        for f in removed_files:
            print(f'    - {f}')
    if not new_files and not removed_files:
        print('  No changes needed. Inventory is in sync.')
        return

    print()
    if args.dry_run:
        print('  DRY RUN — no changes written.')
    else:
        _apply_inventory_sync(ctx_path, actual_files, inventory)
        print('  ✓ Inventory updated.')


def _apply_inventory_sync(ctx_path, actual_files, existing_inventory):
    """Apply inventory sync: add new files, keep existing descriptions."""
    content = ctx_path.read_text(encoding='utf-8')
    lines = content.splitlines()
    result = parse_markdown_table(lines, 'File')

    if result is None:
        return

    start_idx, end_idx, headers, data_rows = result

    # Build a map of existing descriptions
    desc_map = {}
    for row in data_rows:
        if row and len(row) >= 2:
            desc_map[row[0].strip().lower()] = row[1].strip()

    # Rebuild rows from actual files, preserving descriptions
    new_rows = []
    for fname in actual_files:
        desc = desc_map.get(fname.lower(), '*(to be documented)*')
        new_rows.append([fname, desc])

    new_table = render_markdown_table(headers, new_rows)
    new_lines = lines[:start_idx] + new_table.splitlines() + lines[end_idx:]
    new_content = '\n'.join(new_lines) + '\n'
    safe_write(ctx_path, new_content)


def cmd_patch_route(args):
    """Add a routing table row in the parent CONTEXT.md."""
    folder = args.folder.replace('\\', '/').rstrip('/')
    folder_path = (PROJECT_ROOT / folder).resolve()

    if not folder_path.is_dir():
        print(f'ERROR: {args.folder} is not a directory')
        return

    # Find parent CONTEXT.md
    parent_ctx = folder_path.parent / CONTEXT_FILENAME
    if not parent_ctx.exists():
        print(f'ERROR: No CONTEXT.md in parent directory {folder_path.parent}')
        return

    # Determine read_first
    child_ctx = folder_path / CONTEXT_FILENAME
    if child_ctx.exists():
        read_first = (Path(folder) / CONTEXT_FILENAME).as_posix()
    else:
        folder_name = folder_path.name
        read_first = f'*(no CONTEXT.md — small folder)*'

    changed, msg = add_routing_row(parent_ctx, args.keyword, folder, read_first)

    if args.json:
        print(json.dumps({'changed': changed, 'message': msg}, indent=2))
    else:
        if changed:
            print(f'✓ {msg}')
            print(f'  Updated: {parent_ctx.relative_to(PROJECT_ROOT).as_posix()}')
        else:
            print(f'  {msg}')


def cmd_init_context(args):
    """Generate a skeleton CONTEXT.md for a folder that lacks one."""
    folder = (PROJECT_ROOT / args.folder.replace('\\', '/')).resolve()

    if not folder.is_dir():
        print(f'ERROR: {args.folder} is not a directory')
        return

    ctx_path = folder / CONTEXT_FILENAME
    if ctx_path.exists():
        print(f'CONTEXT.md already exists at {ctx_path.relative_to(PROJECT_ROOT).as_posix()}')
        print('Use update-inventory to sync its file inventory.')
        return

    # Scan actual files
    actual_files = sorted(
        f.name for f in folder.iterdir()
        if f.is_file() and f.suffix in INVENTORY_EXTENSIONS
    )

    folder_name = folder.name.capitalize()
    rel = folder.relative_to(PROJECT_ROOT).as_posix()

    # Build inventory rows
    inv_rows = []
    for fname in actual_files:
        inv_rows.append(f'| {fname} | *(to be documented)* |')

    inv_table = '\n'.join(inv_rows) if inv_rows else '| *(empty)* | |'

    skeleton = f"""# {folder_name} — CONTEXT.md

## Purpose
*(to be documented)*

## File Inventory
| File | Description |
|------|-------------|
{inv_table}

## Key Patterns
- *(to be documented)*

## Gotchas
- *(to be documented)*
"""

    changed = safe_write(ctx_path, skeleton)

    if args.json:
        print(json.dumps({
            'created': changed,
            'path': (ctx_path.relative_to(PROJECT_ROOT)).as_posix(),
            'files_listed': len(actual_files),
        }, indent=2))
    else:
        if changed:
            print(f'✓ Created {ctx_path.relative_to(PROJECT_ROOT).as_posix()}')
            print(f'  Listed {len(actual_files)} source file(s) in inventory.')
            print(f'  Next: fill in Purpose, descriptions, and patterns.')
        else:
            print('No changes written.')


# ─── CLI Entry Point ─────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description='Pathfinder — CONTEXT.md discovery and maintenance for Maqasid OS'
    )
    parser.add_argument('--json', action='store_true', help='Output JSON instead of text')
    sub = parser.add_subparsers(dest='command', required=True)

    # Common --json flag added to each subparser (so it works before or after subcommand)
    json_help = 'Output JSON instead of text'

    # discover
    p_discover = sub.add_parser('discover', help='Find a file by name and check routing')
    p_discover.add_argument('name', help='Filename or partial name to search for')
    p_discover.add_argument('--patch', action='store_true',
                            help='Auto-patch CONTEXT.md if file is missing from inventory')
    p_discover.add_argument('--json', action='store_true', help=json_help)

    # audit
    p_audit = sub.add_parser('audit', help='Health check all CONTEXT.md files')
    p_audit.add_argument('--json', action='store_true', help=json_help)

    # update-inventory
    p_inv = sub.add_parser('update-inventory', help='Sync file inventory for a folder')
    p_inv.add_argument('folder', help='Folder path relative to project root')
    p_inv.add_argument('--dry-run', action='store_true', help='Show changes without writing')
    p_inv.add_argument('--json', action='store_true', help=json_help)

    # patch-route
    p_route = sub.add_parser('patch-route', help='Add routing table entry')
    p_route.add_argument('keyword', help='Task description for the "involves" column')
    p_route.add_argument('folder', help='Target folder path relative to project root')
    p_route.add_argument('--json', action='store_true', help=json_help)

    # init-context
    p_init = sub.add_parser('init-context', help='Generate skeleton CONTEXT.md for a folder')
    p_init.add_argument('folder', help='Folder path relative to project root')
    p_init.add_argument('--json', action='store_true', help=json_help)

    args = parser.parse_args()

    # Dispatch
    commands = {
        'discover': cmd_discover,
        'audit': cmd_audit,
        'update-inventory': cmd_update_inventory,
        'patch-route': cmd_patch_route,
        'init-context': cmd_init_context,
    }
    commands[args.command](args)


if __name__ == '__main__':
    # Force UTF-8 output on Windows to handle ✓/✗ characters
    if sys.stdout.encoding and sys.stdout.encoding.lower() != 'utf-8':
        sys.stdout = open(sys.stdout.fileno(), mode='w', encoding='utf-8', errors='replace', closefd=False)
        sys.stderr = open(sys.stderr.fileno(), mode='w', encoding='utf-8', errors='replace', closefd=False)
    main()
