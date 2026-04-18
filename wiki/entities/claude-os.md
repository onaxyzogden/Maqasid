---
title: "Claude OS / Model Workspace Protocol"
type: entity
created: 2026-04-09
updated: 2026-04-09
tags: [architecture, tool, meta]
sources: 1
---

# Claude OS / Model Workspace Protocol (MWP) v2.1

Claude OS is the system architecture that governs how Claude Code operates across projects. Formalized as the Model Workspace Protocol (MWP) v2.1, it replaces programmatic multi-agent frameworks with filesystem structure — plain markdown files, numbered folder stages, and human-review gates. The protocol defines a 3-layer context hierarchy (Map, Rooms, Tools) that keeps agent context tight and interpretable, and a production philosophy (60/30/10) that treats AI as a specialized component within a deterministic architecture. The LLM Wiki now serves as the persistent knowledge layer for session orientation, superseding NotebookLM.

## Key Facts

- **Protocol version:** MWP v2.1
- **3-Layer System:** CLAUDE.md (Map) > CONTEXT.md (Rooms) > Skills + MCP Servers (Tools)
- **Production philosophy:** 60% traditional code / 30% rule-based logic / 10% AI processing
- **Context orchestration:** filesystem structure replaces programmatic multi-agent frameworks
- **Session process loop:** Read, Think, Write, Check, Adjust
- **Directory guardrail:** 8-10 file rule per directory; recursive scoping into sub-rooms beyond that
- **CLAUDE.md guardrail:** kept under ~50 lines for signal clarity
- **Token siloing:** agents load only necessary context, target 2K-8K token windows
- **Persistent knowledge layer:** LLM Wiki (replaced NotebookLM for session orientation)

## Architecture / Structure

### Layer 1 — The Map (CLAUDE.md)

Root-level identity and routing file. First file the agent reads in any project. Contains the routing table to all CONTEXT.md files, naming conventions, tech stack declaration, hemisphere division (Human / Machine / Shared sides), and CI/CD safety flags. Kept deliberately lean to maximize signal-to-noise in the agent's initial context window.

### Layer 2 — The Rooms (CONTEXT.md)

Workspace-level context files distributed throughout the source tree. Each CONTEXT.md silos instructions to its specific folder — defining localized processes, file inventories, architecture notes, store dependencies, and gotchas. Enforces separation of concerns at the filesystem level. The routing hierarchy chains from root CONTEXT.md down to leaf directories.

### Layer 3 — The Tools (Skills + MCP Servers)

Plug-and-play capabilities loaded only when relevant, standardized via Model Context Protocol. Current toolset includes `/graphify` (knowledge graph extraction), `/wiki` (LLM Wiki maintenance), `/notebooklm` (legacy notebook queries), `/pdf`, `/docx`, `/xlsx`, and BBOS pipeline stage skills. Skills are stored as SKILL.md files and triggered on demand — they do not consume context until invoked.

### Context Orchestration

MWP replaces programmatic multi-agent orchestration with filesystem conventions:
- Sequential stages via numbered folders (e.g., `01_research/`, `02_drafting/`)
- Plain markdown as the universal interface between stages
- Intermediate outputs serve as edit surfaces for human review gates
- Opening a folder reveals full pipeline state — interpretable without tooling

### 60/30/10 Production AI Framework

A sizing heuristic for where AI belongs in production systems:
- **60% Traditional Code:** platform integrations, file handling, networking
- **30% Rule-Based Logic:** routing decisions, session management, security checks
- **10% AI Processing:** natural language generation, semantic meaning extraction

Treats AI as a specialized component within a deterministic architecture, not the other way around.

### Session Management Principles

- **Pathfinder Protocol:** any architectural discovery must be patched into CLAUDE.md or CONTEXT.md immediately — fix the factory, not the product
- **Edit-Source Principle:** correct the reference context (CLAUDE.md, CONTEXT.md, wiki) rather than re-explaining to the AI each session
- **Token Siloing:** agents load only the context they need, maintaining 2K-8K token windows
- **Recursive Scoping:** split into sub-rooms when a directory exceeds 8-10 files

## Current Status

Fully operational across the [[milos]] project ecosystem. The 3-layer system (CLAUDE.md > CONTEXT.md > Skills) governs all Claude Code sessions. The LLM Wiki was bootstrapped on 2026-04-09 as the persistent knowledge layer, replacing NotebookLM notebooks for session orientation. Session initialization follows the three-gate protocol defined in the global CLAUDE.md: Brief, Orient (from wiki), Plan (with explicit approval gate). The [[amanah-gate]] serves as the ethical pre-check before any task execution.

## Connections

- [[milos]] — Primary project governed by MWP; CLAUDE.md and CONTEXT.md hierarchy fully deployed
- [[graphify]] — Layer 3 tool providing structural code intelligence; complements the wiki's meaning layer
- [[bbos-pipeline]] — Pipeline stages modeled as numbered folders following MWP's sequential-stage convention
- [[covenant-architecture]] — Philosophical foundation; MWP's filesystem-as-structure reflects covenant principles of transparency and interpretability
- [[amanah-gate]] — Ethical gate integrated into the Session Initialization Protocol as the first check before any work

## Open Questions

- Should MWP version be tracked formally (changelog, semver) as it evolves?
- How should cross-project context sharing work when multiple projects (maqasid-os, atlas, ogden-hub) share the same global CLAUDE.md?
- What is the threshold for splitting a CONTEXT.md into child CONTEXT.md files vs. keeping a single longer file?
- How should the wiki and CONTEXT.md hierarchy handle contradictions when both describe the same module?

## History

| Date | Event |
|---|---|
| 2026-04-09 | Wiki entity page created. MWP v2.1 fully operational. LLM Wiki bootstrapped as persistent knowledge layer, replacing NotebookLM for session orientation. 3-layer system (Map/Rooms/Tools) and 60/30/10 framework documented from META notebook source. |
