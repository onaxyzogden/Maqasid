---
title: "Merge Ogden Hub into Monorepo via Git Subtree"
type: decision
date: 2026-04-09
status: accepted
tags: [git, monorepo, ogden-hub, subtree]
superseded_by: null
---

## Context

The [[ogden-hub]] marketing site is a static HTML site with no build system. As [[maqasid-os]] moves toward a single-repo architecture, we needed to decide how to incorporate ogden-hub's codebase. The goal was a single source of truth without unnecessary tooling overhead.

## Decision

Merge ogden-hub into the Maqasid OS monorepo using **git subtree** (squash merge). The site lives at `website/`.

## Rationale

Static HTML with no build pipeline is lightweight enough to embed fully. Git subtree preserves upstream history via squash merge while keeping a single repo checkout with no extra clone steps. This matches the project's preference for simplicity and avoids forcing contributors to learn submodule workflows for a site that rarely changes independently.

## Alternatives Considered

### Git Submodule
Rejected. Submodules add clone friction (`--recurse-submodules`) and are overkill for a static site that does not have its own CI, dependencies, or release cycle. Compare with the [[2026-04-09-atlas-as-submodule]] decision where submodule complexity is justified.

### Copy Files Directly
Rejected. Copying strips git history entirely. Subtree retains a squashed history record, which is valuable for auditing when content last changed and why.

## Consequences

- `website/` is now part of the Maqasid OS repo and follows the same branch/PR workflow.
- The original ogden-hub repo can be archived on GitHub.
- Future upstream pulls (if needed) use `git subtree pull`.
- Contributors working only on the React app never need to think about `website/` -- it is inert unless explicitly touched.

## Connections

- [[ogden-hub]] -- the entity being merged
- [[maqasid-os]] -- the target monorepo
- [[2026-04-09-atlas-as-submodule]] -- contrasting decision for a complex repo
- [[2026-04-09-bootstrap-llm-wiki]] -- this decision was recorded as part of the wiki bootstrap
