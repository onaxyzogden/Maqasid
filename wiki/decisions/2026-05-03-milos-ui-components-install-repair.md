---
date: 2026-05-03
project: milos
status: accepted
tags: [build, ui-components, npm, worktrees]
---

# 2026-05-03 — `@ogden/ui-components` Install Repair

## Context

Production build (`npm run build`) had been failing in the worktree environment with:

```
Rolldown failed to resolve import "@ogden/ui-components/style.css" from src/main.jsx
```

The error had been observed since at least 2026-05-01 (logged in [[2026-05-01-milos-ui-components-package-dev-mode-fix]]) and was assumed to be a missing `style.css` export from the upstream package — i.e., a fix that would require an upstream PR + version bump.

## Investigation

Direct probing of the GitHub repo `onaxyzogden/ogden-ui-components` showed the upstream package was correct:

- Tags `v0.1.0`, `v0.2.0`, `v0.3.0` all published.
- `v0.1.0/package.json` already declares `"./style.css": "./dist/ogden-ui-components.css"` in its `exports` map.
- `v0.1.0/dist/` is committed to the repo and contains `ogden-ui-components.css` (plus `.es.js`, `.cjs.js`, `.map`s).
- `package-lock.json` correctly resolves `@ogden/ui-components@0.1.0` to commit `3ad9108c`.

Inspection of the local install at `node_modules/@ogden/ui-components/` revealed the actual problem: **the on-disk install was corrupt.** The directory contained only an empty `src/styles/` subdirectory — no `package.json`, no `dist/`, no `README`, no `LICENSE`. This is the *opposite* of what `v0.1.0`'s `files: ["dist", "README.md", "LICENSE"]` and `.npmignore` (which excludes `src`) should produce.

How it got into that state is unknown — likely a partial install from an earlier session, or an interrupted `npm install` that left a stub directory which subsequent installs then skipped (because the node_modules entry already existed).

## Decision

Resolve by deleting the broken install and re-running `npm install`:

```bash
rm -rf node_modules/@ogden && npm install
```

The reinstall fetched the package cleanly. Resulting `node_modules/@ogden/ui-components/` now contains `package.json`, `LICENSE`, `README.md`, and `dist/` with all five expected dist files.

No upstream change, no version bump, no source-code change required. The earlier hypothesis (missing `style.css` export) was wrong — the export had always been correctly declared.

## Verification

- `npm run build` — succeeds; produces a full `dist/` bundle.
- `npm test` — 61/61 pass.
- `npm run lint` — `[STRICT] OK`; all three ratchets at minimum (per-pillar legacy 0, empty-array 0, inline-refs 0).

## Consequences

- The earlier ADR [[2026-05-01-milos-ui-components-package-dev-mode-fix]] noted the build error as "pre-existing, not caused by this change" and several subsequent ADRs (including [[2026-05-03-milos-moontrance-pillar-hard-split-and-grounding-pass]]) inherited that note. Those references remain accurate as historical context but the underlying build error is now resolved.
- Recovery recipe (delete `node_modules/@ogden && npm install`) is documented here for future sessions that hit the same corrupt-install symptom in fresh worktrees.
- No package version bump pursued. Latest published tag is `v0.3.0` (adds a `./bbos` subpath export); MILOS does not currently consume that subpath, so the v0.1.0 pin is left in place. Bumping is a separate, optional decision.

## Files Changed

None in the source tree. The fix was entirely a `node_modules/` repair.

## References

- `package.json` — dep pin: `"@ogden/ui-components": "github:onaxyzogden/ogden-ui-components#v0.1.0"`
- `vite.config.js` — `optimizeDeps.exclude: ['@ogden/ui-components']`
- `src/main.jsx` — `import '@ogden/ui-components/style.css'`
- [[2026-05-01-milos-ui-components-package-dev-mode-fix]] — earlier dev-mode work on this package
- [[2026-04-30-ogden-ui-components-github-direct]] — switch from local `packages/` to GitHub-pinned dep
- [[2026-05-03-milos-moontrance-pillar-hard-split-and-grounding-pass]] — referenced this build error as pre-existing
