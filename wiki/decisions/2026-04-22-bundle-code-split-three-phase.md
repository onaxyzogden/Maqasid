---
title: "Three-phase code-split — main bundle gzip 2,533 → 541 kB"
type: decision
date: 2026-04-22
status: accepted
supersedes: null
---

# Three-phase code-split — main bundle gzip 2,533 → 541 kB

## Context

[[2026-04-11-bundle-size-2mb]] accepted a 2 MB monolithic bundle with a
defined revisit threshold: **3 MB raw** or **multi-user deployment** or
**Lighthouse < 60**. By 2026-04-22 the production build had grown to:

- **8,812 kB raw / 2,533 kB gzipped** single `index-*.js`
- Zero `React.lazy` / dynamic `import()` anywhere in the app
- No `manualChunks` in `vite.config.js`
- 41 routes, all eagerly imported

Past threshold on raw size. An Explore-agent audit traced the fat to a
single transitive import chain:

```
App.jsx
  └─ every route using TaskDetailPanel
     └─ TaskDetailPanel.jsx
        └─ SubtaskSources.jsx
           ├─ HadithCard.jsx   → src/data/hadith.js        (1.3 MB)
           └─ QuranVerseCard.jsx → src/data/quran-wbw.js   (536 KB)
```

That chain alone accounted for ~1.8 MB raw / ~450 KB gzipped. The
remainder was react-markdown + remark-gfm (~80 KB gz) and @dnd-kit
(~40 KB gz) transitively loaded by the Work module subtree.

## Decision

Land three phases of dynamic `import()` splits, smallest-blast-radius
first. Leave Vite's `manualChunks` alone — Vite auto-splits on dynamic
`import()` boundaries, and the resulting chunk graph is cleaner than a
hand-maintained vendor split would be.

### Phase 1 — `SubtaskSources` lazy boundary (commit `609fecf`)

- `TaskDetailPanel.jsx`: `import SubtaskSources` →
  `const SubtaskSources = lazy(() => import('./SubtaskSources'))`.
- Wrap render site in `<Suspense fallback={<SourcesSkeleton />}>`.
- Inline `SourcesSkeleton` (three `var(--surface-2)` rows) keeps the
  panel from jumping.

Hadith + Quran chunk extracts at **1,838 kB raw / 456 kB gzipped**.
Main chunk after Phase 1: **6,976 kB raw / 2,077 kB gzipped**.

### Phase 2 — `/app/sources` route lazy (commit `0798946`, same commit as Phase 3)

- `App.jsx`: convert `SourcesPage` import to `lazy(() => import(...))`.
- Wrap the top-level `<Routes>` tree in a single
  `<Suspense fallback={<RouteSpinner />}>`.

Vite deduplicates the dynamic import — both entry points
(TaskDetailPanel's Sources tab and the top-level `/app/sources` route)
share the same Phase 1 chunk.

### Phase 3 — Work subtree + react-markdown lazy (same commit)

- `App.jsx`: `Work` and `Project` pages → `React.lazy`.
- New `src/components/shared/LazyMarkdown.jsx` wraps `react-markdown` +
  `remark-gfm` so the pair lands in one lazy chunk.
- `TaskDetailPanel.jsx`: replace `<Markdown remarkPlugins={[remarkGfm]}>`
  with `<Suspense fallback={plain text}><LazyMarkdown /></Suspense>`.
  Fallback renders the raw description text so users never see a blank
  description during the ~50 ms chunk load.

### Support files

- `src/components/shared/RouteSpinner.jsx` — centered lucide `Loader2`
  spinner, 24 px. Inline keyframes, no CSS import, no dependency.
- `src/components/shared/LazyMarkdown.jsx` — pass-through wrapper; its
  only job is to be the single import boundary for react-markdown +
  remark-gfm.

## Consequences

### Cumulative build impact

| Metric                   | Baseline  | After P1   | After P2+P3 |
|--------------------------|-----------|------------|-------------|
| Main chunk raw           | 8,812 kB  | 6,976 kB   | 1,990 kB    |
| Main chunk gzip          | 2,533 kB  | 2,077 kB   |   541 kB    |
| # chunks emitted         |    1      |    2       |   12        |
| Initial JS gz (index + lib + modules + jsx-runtime) | ~2,533 kB | ~2,077 kB | **~614 kB** |

**~76% reduction in initial-load JS gzipped.**

### Bonus split

Vite auto-extracted a `LevelNavigator` chunk (~4,724 kB raw / 1,459 kB
gzipped) from the module graph when `Project` became lazy — all pillar
navigators now load only when a user opens a level page. This wasn't a
planned phase; it fell out of Phase 3 naturally.

### UX observations

- Route transitions show `RouteSpinner` only on slow connections; on
  localhost the chunk download is fast enough that the spinner never
  flashes for the lazy routes (observed in dev preview).
- Markdown Suspense fallback renders plain text, so subtasks with
  markdown descriptions are always readable even if `react-markdown`
  has not loaded yet.
- Sources tab: `SourcesSkeleton` shows briefly on first open; later
  opens are instant (chunk cached).

### Chunk cacheability

Each split chunk hashes independently. Editing a pillar navigator no
longer busts the main-bundle cache; editing `hadith.js` no longer busts
the Work module cache.

## Alternatives rejected

- **`manualChunks` vendor split** — rejected. Vite's automatic graph
  from dynamic `import()` produced cleaner chunks than a hand-tuned
  vendor split would have. Revisit only if an evidence-driven case
  emerges (e.g. duplicate React copies across chunks).
- **Replacing `react-markdown`** with a lighter alternative (markdown-it,
  marked) — Phase 3 lazy-loads it instead at no behavioral cost.
- **Preloading `<link rel="modulepreload">`** for likely-next routes
  — premature; measure first.
- **Codegen-ing `hadith.js` into smaller per-pillar shards** — would
  save little incremental gzip, high maintenance cost. The single
  lazy boundary already fully defers the data.

## Files touched

- **New:**
  - `src/components/shared/RouteSpinner.jsx`
  - `src/components/shared/LazyMarkdown.jsx`
- **Modified:**
  - `src/App.jsx` — `lazy` + `Suspense` around `<Routes>`; Work /
    Project / SourcesPage converted.
  - `src/components/work/TaskDetailPanel.jsx` — lazy `SubtaskSources`
    + `LazyMarkdown` integrations, plus inline `SourcesSkeleton`.
- **Unchanged:**
  - `vite.config.js` — no `manualChunks` added.
  - `src/components/work/SubtaskSources.jsx`, `HadithCard.jsx`,
    `QuranVerseCard.jsx`, `src/data/hadith.js`, `src/data/quran-wbw.js`
    — no edits; they're imported through the new lazy boundary.

## Verification

- `npm run build` — 2751 modules; clean except the expected >500 KB
  warning on the hadith+quran (lazy) chunk, which is fine since it's
  demand-loaded.
- Dev preview: `/`, `/app`, `/app/work`, `/app/sources` all render;
  Suspense fallbacks transition without console errors. `location.reload`
  on each path confirms lazy chunks fetch on demand.
- HMR: transient "Failed to reload /src/App.jsx" warnings during
  mid-save; all resolve with "hot updated" on next save cycle.

## Commits

- `609fecf` — Phase 1 (SubtaskSources lazy)
- `0798946` — Phases 2 + 3 (SourcesPage + Work subtree + LazyMarkdown)

Supersedes the "deferred — implement when multi-user" stance in
[[2026-04-11-bundle-size-2mb]]'s Alternatives table — code-splitting
landed now, not at multi-user.
