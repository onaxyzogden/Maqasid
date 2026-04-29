---
title: "Preview launch fixes + dashboard centering"
type: decision
date: 2026-04-29
project: milos
tags: [windows, preview, animations, layout, dashboard]
---

# 2026-04-29 — MILOS preview launch fixes + dashboard centering

Three Windows / preview / layout root-causes that the operator had hit
"countless times" across past sessions, resolved together.

## 1. Preview UI button silently failed on Windows

`.claude/launch.json` declared `"runtimeExecutable": "npm"`. The MCP
`preview_start` tool happens to spawn with a shell, so it worked when Claude
called it in-session, but the Claude Code preview-window UI button spawns
without a shell — and on Windows the bare `npm` cannot resolve. Click did
nothing, with no surfaced error.

**Fix:** Pin all three configurations to `npm.cmd`. Replaced the em-dashes in
config names (`MAQASID OS — Dev`) with ASCII hyphens to remove a second class
of fragility (cp1252-vs-UTF-8 on Windows). Verified by `preview_stop`
+ `preview_start` round-trip — Vite ready in 580 ms.

## 2. preview_screenshot timed out

The landing page's `.hero-marquee-track` runs `animation: hero-marquee 40s
linear infinite`. The MCP screenshot tool waits for paint to settle before
capturing; an endless animation never lets it. `prefers-reduced-motion: reduce`
already neutralized the marquee, but the Claude preview window is plain
Electron Chromium and does not emulate that media query.

**Fix:** Detect Claude's UA in [src/main.jsx:13](../../src/main.jsx) and tag
`<html>` with `reduce-motion`. Added a global rule in
[src/styles/global.css:4](../../src/styles/global.css) that collapses every
`*`'s `animation-duration` / `transition-duration` to ~0 ms and sets
`animation-iteration-count: 1` under `.reduce-motion`. Real users see no
change; future preview sessions screenshot without hanging.

This is a general escape hatch — any future infinite animation on any route
is now safe under the preview tool.

## 3. Dashboard read off-center on the page

`.app-main` is `grid-column: 3` with `1fr`, so it filled all space right of
the sidebar+edge with no balancing right whitespace. With the Islamic panel
closed (the default), content was visually shifted left of viewport center by
~92 px (sidebar 64 + edge 28). The three `.dash-tier--*::before`
pseudo-elements also painted per-tier gradient panels (gold for Qalb, surface
gray for Amal, green for Barakah), making the dashboard read as three stacked
boxes rather than one continuous surface.

**Fix:**
- New CSS variable `--main-balance-end` set on `.app-shell` in
  [src/components/layout/AppShell.jsx](../../src/components/layout/AppShell.jsx).
  When desktop AND the Islamic panel is closed, it equals `sidebarPx + edgePx`;
  otherwise `0px`. Reactive: it tracks sidebar collapse, sidebar drag-resize,
  and right-panel toggle automatically since it derives from the same state
  that builds `gridTemplateColumns`.
- [src/components/layout/AppShell.css:10](../../src/components/layout/AppShell.css)
  applies it as `padding-inline-end` on `.app-main`, mirroring left chrome on
  the right and centering the column in the viewport.
- [src/pages/Dashboard.css:5](../../src/pages/Dashboard.css) gives `.insight`
  `width: 100%; margin-inline: auto;` (with the existing `max-width: 1200px`)
  so the inner content also centers within the column.
- [src/pages/Dashboard.css:26](../../src/pages/Dashboard.css) replaces all
  three tier `::before` gradients with `.dash-tier::before { content: none; }`.
  Tier identity now reads through the eyebrow tint alone (gold INTENT · نية,
  default ACTION · عمل, green BARAKAH · بركة), so the page reads as one
  continuous surface — the original 2026-04-23 three-tier IA preserved
  semantically without the chrome.

**Live verification:** at viewport 1018 px wide, content sits 116 px from the
left and 122 px from the right (≈ symmetric within the 1200 px max-width
rounding). Tier panels gone; eyebrow colors still convey Qalb/Amal/Barakah.

## Related

- [[milos]] — entity
- [[2026-04-23-dashboard-three-tier-redesign]] — original three-tier IA being
  preserved by this change (chrome stripped, semantics retained).
