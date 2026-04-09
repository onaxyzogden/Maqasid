---
title: "graphify"
type: entity
created: 2026-04-09
updated: 2026-04-09
tags: [tool, knowledge-graph, python, tree-sitter, claude, community-detection, obsidian]
sources: 0
---

# graphify

graphify is a knowledge graph tool that builds persistent graphs from codebases and documents. Distributed as a Python package (graphifyy), it combines tree-sitter AST extraction (free, deterministic) with Claude-powered semantic extraction (parallel subagents) to produce richly connected knowledge graphs. It uses Leiden community detection for clustering and tags edges with confidence levels: EXTRACTED (1.0), INFERRED (0.6-0.9), and AMBIGUOUS (0.1-0.3). Outputs include interactive HTML visualization, GraphRAG-ready JSON, a GRAPH_REPORT.md audit file, and an Obsidian vault with wikilinks. The current [[maqasid-os]] graph contains 882 nodes, 1,438 edges, and 47 communities. graphify complements the LLM Wiki — graphify handles structure, the wiki handles meaning.

## Key Facts

- **Package:** graphifyy (Python)
- **Extraction layer 1:** tree-sitter AST extraction — free, deterministic, language-aware
- **Extraction layer 2:** Claude semantic extraction — parallel subagents for relationship inference
- **Community detection:** Leiden algorithm for clustering
- **Edge confidence tags:** EXTRACTED (1.0), INFERRED (0.6-0.9), AMBIGUOUS (0.1-0.3)
- **Outputs:** Interactive HTML, GraphRAG-ready JSON, GRAPH_REPORT.md audit, Obsidian vault with wikilinks
- **Current graph stats (maqasid-os):** 882 nodes, 1,438 edges, 47 communities
- **Complementary role:** graphify = structure; LLM Wiki = meaning

## Current Status

Operational and producing graphs for the [[maqasid-os]] codebase. Most recent run yielded 882 nodes, 1,438 edges, and 47 communities. Available as a Claude Code skill triggered via `/graphify`. Outputs are used for codebase orientation, architectural auditing, and feeding context into wiki bootstrapping.

## Connections

- [[maqasid-os]] — Primary codebase currently graphed (882 nodes, 1,438 edges, 47 communities)
- [[bbos-pipeline]] — Pipeline structure captured as nodes and edges in the graph
- [[atlas]] — Candidate for separate graph extraction once Phase 1 stabilizes
- [[covenant-architecture]] — Graph communities reveal covenant-aligned module boundaries

## Open Questions

- Should the graph be regenerated after the People module refactor in [[maqasid-os]]?
- Can graphify be run incrementally (delta extraction), or does it require full re-extraction?
- What is the strategy for graphing across the monorepo (maqasid-os + ogden-hub + atlas)?
- How should AMBIGUOUS edges be triaged — manual review or automated pruning threshold?

## History

| Date | Event |
|---|---|
| 2026-04-09 | Wiki entity page bootstrapped. Current maqasid-os graph: 882 nodes, 1,438 edges, 47 communities. graphify registered as Claude Code skill at `/graphify`. |
