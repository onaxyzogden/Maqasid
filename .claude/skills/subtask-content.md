---
name: subtask-content
description: >
  Populate a subtask's detail pane with rich markdown guidance content from a .md file.
  Use this skill whenever the user provides a markdown file and wants its content loaded
  into a specific subtask description in the MAQASID OS seed data. Triggers on phrases like
  "use this md file for this subtask", "upload content into subtask", "populate subtask details",
  or any time a .md file is paired with a subtask element selection. Also use when the user
  asks to "add guidance" or "add content" to a subtask detail pane.
---

# Subtask Content Loader

Loads markdown content from a `.md` file into a subtask's `description` field in the seed data,
so the TaskDetailPanel's subtask detail pane renders rich guidance (headers, lists, tables, etc.)
via react-markdown.

## How it works

The MAQASID OS task system has a two-layer data flow:

1. **Seed data** (`src/data/seed-tasks/<pillar>-seed-tasks.js`) defines the canonical subtask content
2. **Backfill migration** (`src/store/project-store.js` → `backfillSeedDescriptions()`) runs on app load
   and updates any persisted subtask whose seed description is longer than the stored one

So: update the seed file → the migration propagates it to localStorage on next reload.

## Identifying the target

The user will identify the subtask in one of two ways:

- **UI element selection** — a `<launch-selected-element>` tag containing the subtask's text, the
  React component props (which include `projectId` like `faith_shahada_core`), and surrounding HTML
- **Verbal description** — the user names the subtask title and/or the project it belongs to

From either, extract:
1. **The subtask title** (exact string match in the seed file)
2. **The project/board ID** (e.g., `faith_shahada_core`) — this tells you which seed file to edit

### Mapping projectId to seed file

| Prefix | Seed file |
|--------|-----------|
| `faith_` | `src/data/seed-tasks/faith-seed-tasks.js` |
| `life_` | `src/data/seed-tasks/life-seed-tasks.js` |
| `intellect_` | `src/data/seed-tasks/intellect-seed-tasks.js` |
| `family_` | `src/data/seed-tasks/family-seed-tasks.js` |
| `wealth_` | `src/data/seed-tasks/wealth-seed-tasks.js` |
| `environment_` | `src/data/seed-tasks/environment-seed-tasks.js` |

## Steps

### 1. Read the markdown file

Read the `.md` file the user provided. Note any special characters that need escaping for
JavaScript template literals (backticks and `${`).

### 2. Find the subtask in the seed file

Search the correct seed file for the subtask by its `title` string. The structure looks like:

```javascript
{ title: 'Study the linguistic meaning of La ilaha illAllah', done: false,
  description: 'Short existing description...' },
```

### 3. Replace the description

Replace the `description` value with a **template literal** (backtick-quoted string) containing
the markdown content. This is necessary because the content spans multiple lines and may contain
single/double quotes.

**Escaping rules for template literals:**
- Backticks (`` ` ``) in the content → escape as `` \` ``
- `${` sequences in the content → escape as `\${`
- Regular single/double quotes need no escaping
- Newlines are preserved naturally in template literals

**Example edit:**

Before:
```javascript
{ title: 'Some subtask', done: false,
  description: 'Brief old description.' },
```

After:
```javascript
{ title: 'Some subtask', done: false,
  description: `## Section Header

Rich markdown content here with **bold**, *italic*, lists, tables...

- Bullet one
- Bullet two` },
```

### 4. Strip meta-references from the content

The markdown files may contain references to the MAQASID dashboard UI, task completion, or
other meta-context that was written for a chat interface. These read awkwardly inside the app
itself. Remove or rephrase lines like:
- "To help you complete this subtask in your **MAQASID** dashboard..."
- "Since you are currently working on your **Daruriyyat** level..."
- Any references to "your task" or "this subtask" that break the fourth wall

The content should read as standalone educational guidance, not as a chatbot response.

### 5. Verify (if preview is running)

If a preview server is active:
- Reload the page (the backfill migration runs on load)
- Navigate to the task and open the subtask detail pane
- Confirm the markdown renders correctly (headers, lists, tables, bold/italic)

If no preview is running, just confirm the seed file edit looks correct.

## Batch mode

When the user provides multiple `.md` files at once (or asks to do several subtasks in a row),
process them sequentially — read each file, edit the seed data, move to the next. Only verify
in preview once at the end after all edits are made, since each reload triggers the backfill
for all updated descriptions.

## Common gotchas

- **Markdown tables require `remark-gfm`** — already installed and configured in TaskDetailPanel.
  Tables in the content will render correctly.
- **h2/h3 inside the detail pane** are styled to match body text size (15px, weight 600) via
  `.tdp-subtask-detail__content h2, h3` rules. No need to adjust heading levels in the content.
- **Horizontal rules** (`---`) render as subtle dividers. They work fine in the content.
- **The backfill only upgrades** — it replaces stored descriptions when the seed version is longer.
  This means re-running with shorter content won't downgrade. If you need to shorten a description,
  the user must clear that task's localStorage entry.
