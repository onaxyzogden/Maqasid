---
title: "Component Library -- Reusable Component Catalog"
type: source
ingested: 2026-04-09
source_path: "references/component-library.md"
source_type: document
tags: [components, react, ui, patterns, dnd-kit]
---

## Summary

The component library document serves as a cross-reference catalog of all reusable components in [[maqasid-os]] V2.1. It maps shared components, layout primitives, Islamic ceremony surfaces, and dashboard building blocks, along with the recurring UI patterns they implement.

## Key Extractions

### Shared Components
- **SearchPalette** -- global command palette / search overlay
- **IslamicTerm** -- inline component for rendering transliterated Islamic terms with optional tooltip definitions (ties to [[source-voice-and-tone]] conventions)
- **GLabelBadge** -- generic labeled badge used across modules for status, tags, and categories

### Layout Components
- **AppShell** -- top-level layout wrapper (sidebar + topbar + content area)
- **Sidebar** -- collapsible navigation with pillar/module hierarchy
- **TopBar** -- header bar with breadcrumbs, search trigger, and user controls

### Islamic Components
- **CeremonyGate** -- full-screen gate that enforces the [[ceremony-gate-pattern]] before entering sacred workflows
- **ThresholdModal** -- modal variant of the ceremony gate for lighter-weight transitions
- **PrayerOverlay** -- overlay that surfaces during prayer times with contextual reminders
- **ReadinessCheck** -- pre-task self-assessment aligned with the [[amanah-gate]] protocol
- **ResumeOverlay** -- re-entry ceremony shown when returning to the app after extended absence

### Dashboard Components
- **StatCard** -- single-metric display card with icon, value, label, and trend indicator
- **ActivityChart** -- time-series visualization for module activity
- **MetricsPanel** -- grouped metric display with configurable layout

### Recurring Patterns
- **Master-detail** -- list on the left, detail panel on the right (used in People, CRM, BBOS modules)
- **Slide-in panels** -- right-edge panels for editing and detail views
- **View mode toggle** -- switch between card grid and table views
- **Drag-and-drop** -- powered by dnd-kit; used in [[bbos-pipeline]] kanban and task reordering
- **Portal components** -- React portals for overlays, modals, and toasts that render outside the DOM hierarchy

## Notable Claims

- All components consume design tokens from `src/styles/tokens.css` (see [[source-style-guide]]) and never use hardcoded color, spacing, or font values.
- Islamic components are intentionally "heavier" in ceremony than typical UI patterns -- this is by design, not a bug. The friction serves a spiritual purpose aligned with [[covenant-architecture]].
- The dnd-kit integration uses sensors and collision detection strategies tuned for both mouse and touch input, supporting mobile use.

## Connections

- [[maqasid-os]] -- the application these components serve
- [[source-style-guide]] -- design tokens consumed by all components
- [[source-voice-and-tone]] -- copy conventions used in component text
- [[ceremony-gate-pattern]] -- the pattern behind CeremonyGate and ThresholdModal
- [[amanah-gate]] -- the protocol behind ReadinessCheck
- [[bbos-pipeline]] -- primary consumer of drag-and-drop patterns
- [[covenant-architecture]] -- the philosophy that justifies ceremonial friction in Islamic components
