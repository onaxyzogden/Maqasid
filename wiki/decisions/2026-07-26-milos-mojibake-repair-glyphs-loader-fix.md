---
title: "Seed mojibake repaired by proven byte-reversal; glyph generator goes hermetic (configFile:false) — composite lint fully green"
type: decision
date: 2026-07-26
status: accepted
tags: [milos, data-integrity, encoding, quran, grounding, build, codegen, vite, lint]
superseded_by: null
---

# Seed mojibake repaired by proven byte-reversal; glyph generator goes hermetic — composite lint fully green

## Context

Two operator-ordered follow-ups after the centered-popups session ([[2026-07-26-milos-centered-popups-node-drill-in]]):

1. **The seed mojibake sweep** (`task_2e56b6bf`, [[project-seed-mojibake]]) — 485 UTF-8/cp1252 corruption occurrences across `health-seed-tasks.js` (388), `health-readiness-ayat.js` (87, Qur'an data), `niyyah-feelings.js` (10). Highest covenant weight: corrupted revelation text in production UI.
2. **The `generate:pillar-glyphs:check` failure** — the composite `npm run lint`'s 4th step had been red for multiple sessions with a Vite SSR module-runner `transport invoke timed out after 60000ms`, first flaky (Family once, Health once), then deterministic.

## Decision

**1. Mojibake: adopt the parallel-session fix `9f87e8d`, but only after independent proof.** `git restore --source=9f87e8d` onto the working tree (no commit — operator-gated), then a scratchpad verifier that recomputed the repair from first principles: take HEAD's corrupted bytes → strip the corrupter-added BOM → encode cp1252 **with a C1-control fallback for the five cp1252-undefined bytes** (0x81/0x8D/0x8F/0x90/0x9D — the corrupting decoder was lenient and preserved them; a naïve cp1252 encode throws) → the resulting bytes ARE the original UTF-8. Byte-diffed against `9f87e8d`'s blobs: **identical for all 3 files** (5,285 / 36,824 / 543,838 bytes). The Qur'an Arabic was therefore recovered mechanically, with **zero invented or approximated revelation text** — the Amanah constraint held by construction, and the repair needed no trust in the other branch's process. Ayat file still queued for operator covenant review before commit. Key negative findings that shaped this: no clean git revision exists for the ayat file (born corrupt), and niyyah/health-seed's clean revisions predate legitimate later work — so the original "restore from git history" guidance on [[project-seed-mojibake]] was not executable as written.

**2. Glyphs: the generator's Vite server now passes `configFile: false`** and imports the app's `vite.config.js` directly to reuse only its `resolve.alias` map ([scripts/generate-pillar-glyphs.mjs](scripts/generate-pillar-glyphs.mjs) `ssrLoad`). Root cause was **not** the lucide-react barrel (the prior working hypothesis): probe bisection showed identical SSR loads run in **milliseconds** with the same config values passed inline, and stall 10–60s per module (tripping the runner's fixed, non-configurable 60s transport timeout) **only when Vite loads the config file itself**. `optimizeDeps: { noDiscovery: true }` stays. Check now completes in **~1.5s**, deterministic across consecutive runs, with the dev server running — previously the worst case.

## Rationale

- **Prove, don't trust:** the fix commit came from a parallel session; for Qur'anic data, "the diff looks right" is not a standard. The mechanical-reversal proof is stronger than review-by-eye — it shows the repaired bytes are the *only* possible pre-corruption content under the established corruption mechanism.
- **Hermetic generator:** the empirical bisection (probe variants: no-config fast, config-file-loaded slow, config-*values*-inlined fast) pinpointed config-file loading as the pathology. Importing the config module directly for its alias map keeps zero drift risk against app resolution without inheriting the slow path. The plausible mechanism — contention between the config-loader's native rolldown bundling and a running dev server's rolldown instance — also explains the history: the 2026-07-05 ADR verified in an isolated worktree (no dev server → passed), and sessions with a live dev server saw flaky-then-deterministic timeouts. Mechanism recorded as plausible, not proven; the fix is empirical and deterministic either way.

## Alternatives Considered

- **Re-run the original restore-from-history guidance** — not executable (no clean revision for ayat; clean revisions elsewhere destroy later work).
- **Hand-write a fresh repair script** — redundant once `9f87e8d` was proven byte-exact; the verifier IS that script, run in proof mode.
- **Pre-bundle lucide-react (`optimizeDeps.include`)** — implemented first on the initial diagnosis; did not fix it (failure moved from Family to Intellect). Reverted once bisection exonerated the barrel.
- **Raise/disable the runner transport timeout (`createServerModuleRunner`)** — treats the symptom; the loads are milliseconds-fast once the config-file path is avoided, so no timeout tuning is needed.

## Consequences

- **Composite `npm run lint` is fully green for the first time on this branch** — eslint, grounding-strict, inline-refs, AND `generate-pillar-glyphs --check` (41 glyphs, ~1.5s).
- The generator no longer reads `vite.config.js` as config. If the app config ever adds a *plugin or transform the SSR-loaded data modules genuinely need*, the generator's inline config must gain it explicitly (aliases already flow through automatically).
- The 2026-07-05 generator ADR's "SSR loader" description is amended by this decision (its `createServer` call no longer loads the app config); the ADR remains otherwise accurate.
- **Pending operator action:** covenant review of the repaired `health-readiness-ayat.js` before commit; both fixes sit uncommitted on `feat/desktop-pillar-glyphs`.
- **Deferred:** mojibake mirror-copies inside `.claude/worktrees/*`; deletion of branch `claude/sleepy-lamarr-3f62e8` after its content lands here; a data-quality oddity found in passing — some ayat/health-seed `arabic:` fields hold English "**Translation:** …" prose instead of Arabic (pre-existing authoring issue, restored as-authored, flagged as a background task).

## Verified

Mojibake: byte-reversal proof identical ×3; mojibake grep 0 across the repo outside [[project-seed-mojibake]]'s intentional examples; no BOM; 2,319 real Arabic chars in the ayat file; `npm test` 102/102; grounding-strict pass; inline-refs 0 ≤ ratchet 0. Glyphs: `generate:pillar-glyphs:check` exit 0 twice consecutively (~1.5s each) with the dev server running; check mode wrote nothing (`level-navigator-responsive.css` untouched); full composite `npm run lint` exit 0.

**Amanah:** the mojibake half is covenant-positive — it restores corrupted Qur'anic text to its exact original bytes with a proof that nothing was invented, and keeps human review in the loop before commit. The glyphs half is neutral build tooling. No capital / sale / CSRA / salam / yield-share surface.

## Connections

- [[project-seed-mojibake]] — the defect entity this resolves
- [[2026-07-05-milos-pillar-glyph-generator]] — the generator whose loader this amends
- [[2026-07-26-milos-centered-popups-node-drill-in]] — the session that carried the red check to Phase 5 and handed both items here
- [[milos]] — parent entity
- [[amanah-gate]] — assessment above
