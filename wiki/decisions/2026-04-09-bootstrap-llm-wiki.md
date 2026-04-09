---
title: "Bootstrap LLM Wiki as Persistent Knowledge Base"
type: decision
date: 2026-04-09
status: accepted
tags: [wiki, llm, knowledge-management, notebooklm, session-protocol]
superseded_by: null
---

## Context

The Session Initialization Protocol (Gate 2) previously relied on NotebookLM as the authoritative source of project context. While NotebookLM excels at ingesting documents and answering questions, it has limitations: it lives outside the repo, cannot be updated programmatically by Claude Code, and creates a dependency on an external service for every session start. As project complexity grows, we need a knowledge layer that is version-controlled, co-located with the code, and maintainable by the AI agent itself.

## Decision

Create an **LLM Wiki** -- a persistent, Claude-maintained knowledge base stored at `wiki/` in the Maqasid OS repo. The wiki replaces NotebookLM as the primary orientation source for Gate 2 of the Session Initialization Protocol.

Three key sub-decisions:

1. **Wide source boundary** -- The wiki ingests from references, transcripts, NotebookLM outputs, commit history, stage gate documents, and session debriefs. Anything that shapes project understanding is fair game.

2. **Auto-update after every session** -- The Session Debrief step now triggers wiki maintenance. New decisions, source summaries, and entity updates are written before the session closes.

3. **Wiki absorbs NotebookLM's orientation role** -- Gate 2 queries the wiki first. NotebookLM remains available as a secondary source for deep research but is no longer the blocking dependency.

## Rationale

A repo-local wiki gives Claude Code direct read/write access to project context without API calls to external services. It is version-controlled (auditable), grep-able (fast lookup), and composable (pages cross-reference via wikilinks). The pattern is inspired by Tobi Lutke's LLM Wiki concept: treat accumulated project knowledge as a first-class, maintained artifact rather than ephemeral chat context.

## Alternatives Considered

### Continue with NotebookLM Only
Rejected. NotebookLM cannot be updated programmatically, lives outside version control, and adds latency to every session start. It also creates a single point of failure if the service is unavailable.

### Structured Database (SQLite, JSON)
Rejected for the primary layer. Markdown files are human-readable, diff-friendly, and editable by both humans and AI. A structured graph layer ([[graphify]]) complements the wiki for code-level intelligence.

### Confluence / Notion / External Wiki
Rejected. External tools add authentication overhead, cannot be read/written by Claude Code natively, and fragment the source of truth away from the repo.

## Consequences

- `wiki/` becomes a first-class directory in the repo, organized into `entities/`, `concepts/`, `decisions/`, and `sources/`.
- The Session Initialization Protocol (CLAUDE.md) will be updated to point Gate 2 at the wiki.
- NotebookLM notebooks remain as archival/research resources but are no longer the blocking gate.
- Wiki maintenance becomes part of every session's Definition of Done.
- The wiki is complementary to [[graphify]] -- graphify handles structural code intelligence (call graphs, dependency maps), the wiki handles meaning, decisions, and synthesis.

## Connections

- [[maqasid-os]] -- the project this wiki serves
- [[graphify]] -- complementary structural intelligence tool
- [[covenant-architecture]] -- the wiki preserves and propagates covenant-level decisions
- [[amanah-gate]] -- wiki pages are subject to the same ethical screening as code changes
