---
title: "graphify"
type: entity
created: 2026-04-09
updated: 2026-04-21
tags: [tool, knowledge-graph, python, tree-sitter, claude, community-detection, obsidian]
sources: 0
---

# graphify

graphify is a knowledge graph tool that builds persistent graphs from codebases and documents. Distributed as a Python package (graphifyy), it combines tree-sitter AST extraction (free, deterministic) with Claude-powered semantic extraction (parallel subagents) to produce richly connected knowledge graphs. It uses Leiden community detection for clustering and tags edges with confidence levels: EXTRACTED (1.0), INFERRED (0.6-0.9), and AMBIGUOUS (0.1-0.3). Outputs include interactive HTML visualization, GraphRAG-ready JSON, a GRAPH_REPORT.md audit file, and an Obsidian vault with wikilinks. The current [[milos]] graph contains 1,535 nodes, 1,553 edges, and 286 communities. graphify complements the LLM Wiki — graphify handles structure, the wiki handles meaning.

## Key Facts

- **Package:** graphifyy (Python)
- **Extraction layer 1:** tree-sitter AST extraction — free, deterministic, language-aware
- **Extraction layer 2:** Claude semantic extraction — parallel subagents for relationship inference
- **Community detection:** Leiden algorithm for clustering
- **Edge confidence tags:** EXTRACTED (1.0), INFERRED (0.6-0.9), AMBIGUOUS (0.1-0.3)
- **Outputs:** Interactive HTML, GraphRAG-ready JSON, GRAPH_REPORT.md audit, Obsidian vault with wikilinks
- **Current graph stats (maqasid-os):** 1,535 nodes, 1,553 edges, 286 communities (2026-04-21 `--update` run + bridge patch)
- **Complementary role:** graphify = structure; LLM Wiki = meaning
- **Known extraction gap:** AST + default semantic extraction under-emits `imports` edges for `src/data/**` consumers — producing false-positive bridge nodes with inflated betweenness. Confirmed on `bbos-task-definitions.js` (bridge dissolved after patching 8 real consumer imports; betweenness dropped 0.031 → 0.0027). See [[2026-04-21-graphify-extraction-gaps]]

## Current Status

Operational and producing graphs for the [[milos]] codebase. Most recent run yielded 1,535 nodes, 1,553 edges, and 286 communities. Available as a Claude Code skill triggered via `/graphify`. Outputs are used for codebase orientation, architectural auditing, and feeding context into wiki bootstrapping.

## Connections

- [[milos]] — Primary codebase currently graphed (1,535 nodes, 1,553 edges, 286 communities)
- [[bbos-pipeline]] — Pipeline structure captured as nodes and edges in the graph
- [[olos]] — Candidate for separate graph extraction once Phase 1 stabilizes
- [[covenant-architecture]] — Graph communities reveal covenant-aligned module boundaries

## Open Questions

- Should the graph be regenerated after the People module refactor in [[milos]]?
- ~~Can graphify be run incrementally (delta extraction)?~~ **Answered 2026-04-21:** yes — `--update` mode uses `detect_incremental` to re-extract only changed files and merges into existing `graph.json`.
- What is the strategy for graphing across the monorepo (maqasid-os + ogden-hub + atlas)?
- How should AMBIGUOUS edges be triaged — manual review or automated pruning threshold?

## History

| Date | Event |
|---|---|
| 2026-04-09 | Wiki entity page bootstrapped. Current maqasid-os graph: 882 nodes, 1,438 edges, 47 communities. graphify registered as Claude Code skill at `/graphify`. |
| 2026-04-21 | `/graphify --update` run on full Maqasid/Milos corpus (atlas + graphify-out excluded). AST extracted 74 code files → 334 nodes/824 edges; 7 semantic subagents over 117 uncached files → 134 nodes/108 edges/15 hyperedges. Merged with prior graph → **1,535 nodes, 1,532 edges, 286 communities**. 27 top communities hand-labeled. Benchmark: 3,985× token reduction vs full-corpus reads. Trace of top-betweenness bridge (`bbos-task-definitions.js`, score 0.031) surfaced an extraction gap — file was a structural island despite high centrality. Targeted re-extraction patched 21 real edges (imports + calls + shares_data_with); bridge dissolved into single community, betweenness → 0.0027. Edge total after patch: 1,553. |
