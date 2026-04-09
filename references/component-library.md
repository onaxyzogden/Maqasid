# Component Library — Maqasid OS V2.1

Cross-reference catalog of reusable components. For full props and architecture, read the relevant module CONTEXT.md.

## Shared Components (`src/components/shared/`)
Full inventory: `src/components/shared/CONTEXT.md`

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| SearchPalette | Global search overlay (Cmd+K) | Portal-based, escapes overflow:hidden |
| IslamicTerm | Tooltip for Arabic terms with transliteration | Portal-based |
| GLabelBadge | Colored label badge | label, color |
| GLabelPicker | Label selection dropdown | labels, onSelect |

## Layout Components (`src/components/layout/`)
Full inventory: `src/components/layout/CONTEXT.md`

| Component | Purpose |
|-----------|---------|
| AppShell | Root layout — sidebar + topbar + main content area |
| Sidebar | Navigation sidebar with collapse support |
| TopBar | Top navigation bar with search, notifications |
| MobileNav | Bottom navigation for mobile viewports |

## Islamic Components (`src/components/islamic/`)
Full inventory: `src/components/islamic/CONTEXT.md`

| Component | Purpose |
|-----------|---------|
| CeremonyGate | Entry ceremony overlay before app access |
| ThresholdModal | Confirmation modal for significant actions |
| PrayerOverlay | Prayer time notification overlay |
| ReadinessCheck | Pillar readiness assessment UI |
| ResumeOverlay | Return-to-app ceremony after inactivity |

## Dashboard Components (`src/components/dashboard/`)
Full inventory: `src/components/dashboard/CONTEXT.md`

| Component | Purpose |
|-----------|---------|
| StatCard | Metric display card with icon and trend |
| ActivityChart | Time-series activity visualization |
| MetricsPanel | Aggregated metrics dashboard panel |

## Patterns to Reuse

### Master-Detail
Used in People (contacts, HR) and CRM. Pattern: list view on left, DetailPanel on right with tabbed content.

### Slide-In Panels
Used in Money module. Pattern: `.money-slidein` CSS class, slides from right edge.

### View Mode Toggle
Used in Contacts, People. Pattern: `viewMode` state switching between `card` and `table` layouts.

### Drag-and-Drop
Used in Work module (Kanban). Pattern: dnd-kit with PointerSensor + TouchSensor + pointerWithin collision detection.

### Portal Components
IslamicTerm, SearchPalette use `createPortal` to escape `overflow:hidden` containers.
