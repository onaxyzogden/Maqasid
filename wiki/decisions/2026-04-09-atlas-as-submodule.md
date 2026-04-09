---
title: "Link Atlas as Git Submodule"
type: decision
date: 2026-04-09
status: accepted
tags: [git, monorepo, atlas, submodule]
superseded_by: null
---

## Context

[[atlas]] is a full-stack monorepo: pnpm workspaces, Turborepo, React/TypeScript frontend, Fastify backend, PostgreSQL/PostGIS, and Redis. With 1400+ files and its own CI/CD pipeline, it operates as an independent product. The user wants a single source of truth across all projects without tangling unrelated git histories.

## Decision

Link Atlas into the Maqasid OS monorepo as a **git submodule** at `atlas/`.

## Rationale

Atlas is too large and too complex to embed. Its own dependency graph (pnpm + Turborepo), database migrations, and release cycle mean it must retain an independent git history and independent CI. A submodule provides the "single repo view" the user wants while keeping Atlas fully autonomous. Developers working on Atlas clone it normally; developers working on Maqasid OS can optionally init the submodule when they need cross-project context.

## Alternatives Considered

### Git Subtree
Rejected. Subtree would embed all 1400+ files into the Maqasid OS history, inflating clone size and tangling two unrelated commit graphs. Every Atlas merge would pollute the Maqasid OS log. Compare with [[2026-04-09-merge-ogden-hub-subtree]] where subtree is appropriate for a small static site.

### Separate Repo Only (No Link)
Rejected. The user explicitly wants a single source of truth. Keeping Atlas entirely separate means context is fragmented across repos, which defeats the purpose of the monorepo consolidation effort.

## Consequences

- Cloning the full workspace requires `git clone --recurse-submodules` or a follow-up `git submodule update --init`.
- Atlas retains its own branches, tags, and CI pipeline.
- The Maqasid OS repo pins a specific Atlas commit; bumping that pin is an explicit, reviewable action.
- Contributors unfamiliar with submodules may need onboarding documentation.

## Connections

- [[atlas]] -- the entity being linked
- [[maqasid-os]] -- the parent monorepo
- [[2026-04-09-merge-ogden-hub-subtree]] -- contrasting decision for a lightweight repo
- [[2026-04-09-bootstrap-llm-wiki]] -- this decision was recorded as part of the wiki bootstrap
