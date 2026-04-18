# Wiki Schema

This file governs how the LLM maintains the wiki. Read this before any wiki operation.

## Purpose

The wiki is a persistent, compounding knowledge base maintained by Claude across sessions. It sits between raw sources and the user — accumulating understanding that would otherwise be lost in chat history. graphify handles structural code intelligence (AST, imports, call graphs). The wiki handles meaning: decisions, rationale, synthesis, and cross-project understanding.

## Directory Layout

```
wiki/
  SCHEMA.md       # This file — conventions and workflows
  index.md        # Catalog of all pages (read first to orient)
  log.md          # Append-only chronological record
  sources/        # Summary pages for ingested raw sources
  entities/       # Projects, modules, systems, tools, people
  concepts/       # Frameworks, patterns, principles, design philosophy
  decisions/      # ADR-style records — what was decided, when, and why
  synthesis/      # Cross-cutting analyses, filed query results, comparisons
```

## Page Types

### Entity (`entities/`)
A concrete thing — a project, module, component, tool, system, or person.

```markdown
---
title: "Entity Name"
type: entity
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [project, module, tool, person]
sources: 3
---

# Entity Name

One-paragraph summary of what this is and its current state.

## Key Facts
- Bullet list of essential facts

## Architecture / Structure
How it's built or organized. Reference graphify for structural detail.

## Current Status
What's active, what's blocked, what's next.

## Connections
- [[related-entity]] — how they relate
- [[related-concept]] — why it matters

## Open Questions
Things not yet resolved about this entity.

## History
Reverse-chronological list of significant changes.
- YYYY-MM-DD: What changed and why. See [[decision-slug]] if applicable.
```

### Concept (`concepts/`)
An idea, framework, pattern, or principle that shapes how work is done.

```markdown
---
title: "Concept Name"
type: concept
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [islamic, architecture, pattern, principle]
sources: 2
---

# Concept Name

One-paragraph definition.

## Core Idea
What this concept means in the context of this project ecosystem.

## Application
How and where this concept is applied. Concrete examples.

## Connections
- [[related-concept]] — relationship
- [[related-entity]] — where it's implemented

## Sources
Where this concept comes from (Quranic reference, paper, conversation, etc.)
```

### Decision (`decisions/`)
An architectural or design choice — what was decided, why, and what was rejected.

```markdown
---
title: "Decision Title"
type: decision
date: YYYY-MM-DD
status: accepted | superseded | deprecated
tags: [architecture, data, ui, deployment]
superseded_by: null
---

# Decision Title

## Context
What prompted this decision. The problem or need.

## Decision
What was chosen.

## Rationale
Why this option was selected over alternatives.

## Alternatives Considered
- Option A — why rejected
- Option B — why rejected

## Consequences
What this decision enables or constrains going forward.

## Connections
- [[affected-entity]] — how it's affected
- [[related-concept]] — governing principle
```

### Source Summary (`sources/`)
A digest of an ingested raw source — the wiki's record of what was read and extracted.

```markdown
---
title: "Source Title"
type: source
ingested: YYYY-MM-DD
source_path: "references/filename.md"
source_type: document | conversation | commit-log | stage-gate | notebook
tags: []
---

# Source Title

## Summary
2-4 sentence digest of the source's key content.

## Key Extractions
- What entities, concepts, or decisions were extracted from this source
- What wiki pages were created or updated as a result

## Notable Claims
Specific claims worth tracking for potential contradiction with future sources.
```

### Synthesis (`synthesis/`)
A cross-cutting analysis, comparison, or filed query result that spans multiple entities/concepts.

```markdown
---
title: "Synthesis Title"
type: synthesis
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
query: "Original question that prompted this, if any"
---

# Synthesis Title

The analysis, comparison, or answer. Free-form but should cite wiki pages with [[wikilinks]].
```

## Naming Conventions

- All filenames: kebab-case, `.md` extension
- Entities: `{slug}.md` (e.g., `maqasid-os.md`, `faith-module.md`)
- Concepts: `{slug}.md` (e.g., `amanah-gate.md`, `covenant-architecture.md`)
- Decisions: `{YYYY-MM-DD}-{slug}.md` (e.g., `2026-04-09-atlas-as-submodule.md`)
- Sources: `{slug}.md` matching the source name (e.g., `style-guide.md`, `session-2026-04-09.md`)
- Synthesis: `{slug}.md` (e.g., `faith-module-redesign-analysis.md`)

## Cross-Referencing

Use `[[wikilinks]]` for all internal references. This enables Obsidian's graph view.
- Link to pages by filename without extension: `[[milos]]`, `[[amanah-gate]]`
- For display text: `[[milos|MILOS V2.1]]`
- Every page should have at least one inbound and one outbound link (no orphans)

## Frontmatter

Every page MUST have YAML frontmatter with at minimum:
- `title`: Human-readable name
- `type`: entity | concept | decision | source | synthesis
- `created`: YYYY-MM-DD
- `updated`: YYYY-MM-DD (same as created initially)
- `tags`: Array of relevant tags

## Operations

### Ingest (`/wiki ingest <file>`)

When a new source is added:

1. **Read** the source file completely
2. **Discuss** key takeaways with the user (brief summary, notable claims, surprises)
3. **Create** a source summary page in `wiki/sources/`
4. **Update** existing entity and concept pages that the source touches — add new facts, revise outdated claims, note contradictions
5. **Create** new entity or concept pages if the source introduces things not yet in the wiki
6. **Update** `wiki/index.md` with any new pages
7. **Append** to `wiki/log.md`: `## [YYYY-MM-DD] ingest | Source Title`
8. **Report** what was touched: "Updated 3 pages, created 2 new pages, flagged 1 contradiction"

### Query (`/wiki query "<question>"`)

When the user asks a question:

1. **Read** `wiki/index.md` to find relevant pages
2. **Read** the relevant pages
3. **Synthesize** an answer with `[[wikilink]]` citations
4. **Offer** to file the answer as a synthesis page if it's substantive
5. If filed, **update** `wiki/index.md` and **append** to `wiki/log.md`

### Update (end-of-session maintenance)

After every Claude Code session, before the session closes:

1. **Extract** from the session: decisions made, things discovered, items deferred, corrections applied
2. **Update entities** — touch any entity pages affected by this session's work (e.g., if the Faith module was modified, update `wiki/entities/faith-module.md`)
3. **File decisions** — any architectural or design choice becomes `wiki/decisions/YYYY-MM-DD-{slug}.md`
4. **Append to log** — add session entry to `wiki/log.md`:
   ```
   ## [YYYY-MM-DD] session | Brief session objective
   - Completed: what was done
   - Decisions: [[decision-link]] if any
   - Deferred: what was postponed
   - Pages touched: list of updated wiki pages
   ```
5. **Update index** — add any new pages to `wiki/index.md`
6. **Contradiction check** — if anything learned this session conflicts with existing wiki content, flag it inline with `> [!warning] Contradiction` callout and note both the old and new claims

### Lint (`/wiki lint`)

Periodic health check:

1. **Orphan pages** — pages with no inbound links
2. **Dead links** — `[[wikilinks]]` pointing to pages that don't exist
3. **Stale pages** — pages not updated in 30+ days that reference active projects
4. **Missing pages** — concepts or entities frequently mentioned in `[[wikilinks]]` but lacking their own page
5. **Contradictions** — claims on different pages that conflict
6. **Frontmatter gaps** — pages missing required frontmatter fields
7. **Report** findings and offer to fix automatically

## Relationship to Other Systems

| System | Role | How wiki interacts |
|---|---|---|
| **graphify** | Structural code intelligence (AST, imports, communities) | Wiki links to graphify for "what connects to what." graphify links to wiki for "what does it mean." |
| **CONTEXT.md hierarchy** | File-level routing for Claude navigation | Unchanged. Wiki is for accumulated knowledge; CONTEXT.md is for real-time file discovery. |
| **NotebookLM** | (Legacy) External context source | Superseded by wiki for session orientation. Still available for manual use. |
| **Obsidian** | Browsing layer | Open `wiki/` as a vault. Graph view shows connections. Dataview plugin can query frontmatter. |
| **git** | Version history | Wiki is committed to the repo. `git log wiki/` shows knowledge evolution. |

## Anti-Patterns

- **Don't duplicate CONTEXT.md content.** CONTEXT.md documents file inventories and routing. The wiki documents meaning, decisions, and synthesis.
- **Don't store ephemeral task state.** Use `tasks/` for current todos. The wiki records decisions and learnings, not in-progress work.
- **Don't reproduce source material.** Source summaries are digests, not copies. Link to the original in `references/` or cite the commit.
- **Don't let pages rot.** If a page is no longer relevant, mark its frontmatter `status: deprecated` and note why — don't delete it.
- **Don't skip the log.** Every operation that changes wiki pages gets a log entry. The log is how future sessions understand what happened.
