---
title: "graphify extraction gaps for src/data/** consumers"
type: decision
created: 2026-04-21
tags: [graphify, knowledge-graph, extraction, audit]
---

# graphify extraction gaps for `src/data/**` consumers

## Context

During the 2026-04-21 `/graphify --update` run on the full Maqasid/Milos corpus, the post-run analyzer flagged `src/data/bbos/bbos-task-definitions.js` as the highest-betweenness non-community-core node (score **0.031**), labeling it the top bridge in the graph and generating a suggested question: *"Why does `bbos-task-definitions` connect BBOS Task & Work Boards to BBOS Dashboard Views?"*

A trace (`.graphify_query3.py`, 3-hop BFS) revealed the node's neighborhood was **four nodes total** — the file plus its three exported functions, zero inbound edges. Structurally it was a disconnected island, not a bridge. A filesystem grep then showed **9 real consumers** importing from it (`BbosFullDashboard.jsx`, `ProjectBoard.jsx`, `BbosTaskPanel.jsx`, `Dashboard.jsx`, `project-store.js`, `JournalPanel.jsx`, `ScopeGate.jsx`, `context-gatherer.js`, + the file itself).

## Decision

1. **Accept that graphify's default extraction under-emits `imports` edges for `src/data/**` consumers.** Neither tree-sitter AST extraction nor the default semantic subagent prompt reliably captures `import` statements when the imported module is a data file (as opposed to a component or hook). Root cause appears to be a combination of AST import-path resolution failing for relative data paths and the semantic prompt deprioritizing re-extraction of imports under the instruction *"Code files: focus on semantic edges AST cannot find… do not re-extract imports."*

2. **Treat high-betweenness nodes with narrow degree as audit signals, not findings.** When `betweenness_centrality(n) > 0.01` and `degree(n) < 5`, the node is almost certainly an extraction artifact — the metric is spurious because the analyzer is finding shortest paths through a node whose edges don't reflect reality. Flag and re-extract, do not interpret.

3. **Targeted bridge patches are an acceptable remedy.** For this session the fix was a single subagent dispatch with an explicit prompt focused on import/call extraction for the 9 consumer files. Output merged into `graph.json` via `.graphify_merge_patch.py`. 21 edges added (8 imports, 8 calls, 5 shares_data_with). The "bridge" between communities 3 and 10 dissolved — both communities collapsed into community 1 (a single tight BBOS cluster), which is the structurally correct result.

## Consequences

- **Before patch:** 1,535 nodes, 1,532 edges, 286 communities. `bbos-task-definitions.js` betweenness = 0.031 (rank 1). Two separate "BBOS Task & Work Boards" and "BBOS Dashboard Views" communities.
- **After patch:** 1,535 nodes, 1,553 edges, 286 communities. `bbos-task-definitions.js` betweenness = 0.0027. The BBOS task/dashboard/store cluster is one community.
- Community labels for this run were assigned before the patch; the pre-patch labels "BBOS Task & Work Boards" (c3) and "BBOS Dashboard Views" (c10) are now artifacts of missing edges. Next full re-cluster will collapse them.
- Other `src/data/**` files (`readiness-ayahs.js`, `bbos-stages.js`, `islamic-data.js`, seed-tasks files) likely have the same gap. Any future betweenness claims involving them should be verified against the filesystem before being treated as findings.

## Follow-ups

- [ ] On next `/graphify` full run (not update), consider `--mode deep` and/or a prompt addendum instructing subagents to emit `imports` edges for every `src/data/**` consumer even when AST missed them.
- [ ] Spot-check `readiness-ayahs.js` and `islamic-data.js` in the current graph against filesystem grep results to quantify remaining gap.
- [ ] Consider upstreaming an issue to `graphifyy` about data-file import resolution in the tree-sitter AST layer.

## References

- Session log entry: [[log#2026-04-21-session-graphify-update]]
- Updated entity: [[graphify]]
- Graph outputs: `graphify-out/graph.json`, `graphify-out/GRAPH_REPORT.md`
- Trace scripts: `.graphify_query.py`, `.graphify_query2.py`, `.graphify_query3.py` (session-local, gitignored)
- Patch script: `.graphify_merge_patch.py` (session-local, gitignored)
