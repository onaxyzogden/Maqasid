---
title: "Link OLOS as Git Submodule"
type: decision
date: 2026-04-09
status: accepted
tags: [git, monorepo, atlas, submodule]
superseded_by: null
---

## Context

[[olos]] is a full-stack monorepo: pnpm workspaces, Turborepo, React/TypeScript frontend, Fastify backend, PostgreSQL/PostGIS, and Redis. With 1400+ files and its own CI/CD pipeline, it operates as an independent product. The user wants a single source of truth across all projects without tangling unrelated git histories.

## Decision

Link OLOS into the MILOS monorepo as a **git submodule** at `atlas/`.

## Rationale

OLOS is too large and too complex to embed. Its own dependency graph (pnpm + Turborepo), database migrations, and release cycle mean it must retain an independent git history and independent CI. A submodule provides the "single repo view" the user wants while keeping OLOS fully autonomous. Developers working on OLOS clone it normally; developers working on MILOS can optionally init the submodule when they need cross-project context.

## Alternatives Considered

### Git Subtree
Rejected. Subtree would embed all 1400+ files into the MILOS history, inflating clone size and tangling two unrelated commit graphs. Every OLOS merge would pollute the MILOS log. Compare with [[2026-04-09-merge-ogden-hub-subtree]] where subtree is appropriate for a small static site.

### Separate Repo Only (No Link)
Rejected. The user explicitly wants a single source of truth. Keeping OLOS entirely separate means context is fragmented across repos, which defeats the purpose of the monorepo consolidation effort.

## Consequences

- Cloning the full workspace requires `git clone --recurse-submodules` or a follow-up `git submodule update --init`.
- OLOS retains its own branches, tags, and CI pipeline.
- The MILOS repo pins a specific OLOS commit; bumping that pin is an explicit, reviewable action.
- Contributors unfamiliar with submodules may need onboarding documentation.

## Connections

- [[olos]] -- the entity being linked
- [[milos]] -- the parent monorepo
- [[2026-04-09-merge-ogden-hub-subtree]] -- contrasting decision for a lightweight repo
- [[2026-04-09-bootstrap-llm-wiki]] -- this decision was recorded as part of the wiki bootstrap
