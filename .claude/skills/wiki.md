---
name: wiki
description: Maintain the LLM Wiki — ingest sources, query knowledge, lint health, update after sessions
user_invocable: true
---

# /wiki

Persistent, LLM-maintained knowledge base. The wiki accumulates understanding across sessions — decisions, rationale, synthesis, and cross-project knowledge. Complements graphify (structural code intelligence) with meaning and context.

## Usage

```
/wiki ingest <file>        # Read source, extract info, update wiki pages
/wiki ingest <file> --batch # Process multiple files with minimal discussion
/wiki query "<question>"   # Search wiki, synthesize answer, optionally file result
/wiki lint                 # Health-check: contradictions, orphans, stale pages, gaps
/wiki update               # End-of-session maintenance (also runs automatically)
/wiki status               # Show wiki stats: page count, last update, recent log
```

## What You Must Do When Invoked

### Read the schema first
Before any operation, read `wiki/SCHEMA.md`. It defines page templates, frontmatter conventions, naming rules, and detailed workflows for each operation. Follow it exactly.

### `/wiki status`

1. Count files in each wiki subdirectory (entities, concepts, decisions, sources, synthesis)
2. Read the last 5 entries from `wiki/log.md`
3. Report:
   ```
   Wiki Status
     Entities:   N pages
     Concepts:   N pages
     Decisions:  N pages
     Sources:    N pages
     Synthesis:  N pages
     Total:      N pages
     Last update: YYYY-MM-DD — [operation summary]
   ```

### `/wiki ingest <file>`

Follow the Ingest workflow in SCHEMA.md:
1. Read the source file completely
2. Briefly discuss key takeaways with the user (2-3 sentences — what's notable, what's surprising)
3. Create a source summary page in `wiki/sources/`
4. Update existing entity and concept pages the source touches
5. Create new entity or concept pages for things not yet in the wiki
6. Update `wiki/index.md` with any new pages
7. Append to `wiki/log.md`
8. Report: "Updated N pages, created N new pages" + list of touched pages

With `--batch`: skip discussion, process silently, report totals at end.

### `/wiki query "<question>"`

Follow the Query workflow in SCHEMA.md:
1. Read `wiki/index.md` to find relevant pages
2. Read the relevant pages (drill into the ones most likely to answer the question)
3. Synthesize an answer using `[[wikilinks]]` to cite wiki pages
4. If the answer is substantive (>3 sentences, cross-cutting, or novel synthesis), offer to file it as `wiki/synthesis/{slug}.md`
5. If filed: update index and log

### `/wiki lint`

Follow the Lint workflow in SCHEMA.md:
1. Scan all wiki pages for:
   - Orphan pages (no inbound `[[wikilinks]]`)
   - Dead links (`[[wikilinks]]` to non-existent pages)
   - Stale pages (not updated in 30+ days, referencing active projects)
   - Missing pages (frequently linked but don't exist)
   - Frontmatter gaps (missing required fields)
   - Contradictions (conflicting claims across pages)
2. Report findings grouped by severity
3. Offer to fix automatically (create missing pages, add links, update frontmatter)

### `/wiki update`

End-of-session maintenance. Can be called manually or runs as part of session close.

1. Review what happened this session:
   - What was built, fixed, or changed?
   - What decisions were made?
   - What was deferred?
   - What corrections were applied?
2. Update relevant entity pages in `wiki/entities/`
3. Create decision pages in `wiki/decisions/` for any architectural choices
4. Append session entry to `wiki/log.md`
5. Update `wiki/index.md` if new pages were created
6. Check for contradictions with existing wiki content — flag with `> [!warning]` callout

## Important Rules

- **Always use `[[wikilinks]]`** for cross-references. This powers Obsidian's graph view.
- **Always update the index** when creating new pages.
- **Always append to the log** when modifying wiki content.
- **Never delete pages** — mark deprecated pages with `status: deprecated` in frontmatter.
- **Never copy source material verbatim** — summaries and extractions only.
- **Keep frontmatter accurate** — especially `updated` date and `sources` count.
- The wiki directory is `wiki/` at the project root. All paths are relative to that.
