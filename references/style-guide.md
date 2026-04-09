# Style Guide — Maqasid OS V2.1

Source of truth: `src/styles/tokens.css` · Full token documentation: `src/styles/CONTEXT.md`

## Color Palette

### Surfaces
- `--bg` → Base background (light/dark adaptive)
- `--bg2`, `--bg3`, `--bg4` → Progressively deeper surfaces
- `--surface`, `--surface-hover` → Card and interactive surfaces

### Brand Colors
- **Primary (Teal)**: `--primary` (#4ab8a8) — Main action color
  - Variants: `--primary-hover`, `--primary-dark`, `--primary-bg` (8%), `--primary-bg2` (15%), `--primary-border` (30%)
- **Accent (Gold)**: `--accent` (#c9a05a) — BBOS brand, emphasis
  - Variants: `--accent2`, `--accent-bg`, `--accent-border`

### Text
- `--text` (#1a1d21) — Primary text
- `--text2` (#5f6b7a) — Secondary/muted
- `--text3` (#8b95a2) — Tertiary/disabled

### Semantic
- `--success`, `--warning`, `--danger` + `-bg` and `-border` variants
- Kanban: `--col-todo`, `--col-progress` (#3b82f6), `--col-review` (#f59e0b), `--col-done` (#22c55e)
- Priorities: `--pri-urgent` (#ef4444), `--pri-high`, `--pri-medium`, `--pri-low`

### Pillar Colors (7)
`--pillar-faith` through `--pillar-ummah` + `-bg` (8%) and `-border` (25%) variants

### Module Colors (18)
Work, money, people, office, tech, crm, faith pillars, submodules

## Spacing Scale
4px increments: `--space-1` (4px) → `--space-16` (64px)

## Radii
`--radius-xs` (4px) → `--radius-full`

## Shadows
`--shadow-xs` through `--shadow-xl`, `--shadow-teal`

## Layout Constants
- `--topbar-h`: 56px
- `--sidebar-w`: 248px / `--sidebar-w-collapsed`: 64px
- `--islamic-panel-w`: 280px

## Typography
| Font | Usage |
|------|-------|
| DM Sans | Primary UI text |
| Manrope | Headings, emphasis |
| Noto Serif | Body/content areas |
| Space Grotesk | Numeric/data display |
| Amiri | Arabic text |
| JetBrains Mono | Code blocks |

## Glassmorphism
- `--glass` — Semi-transparent background
- `--glass-border` — Subtle border
- `--glass-blur` — 16px backdrop blur

## Rules
1. **Always use CSS custom properties** — never hardcode colors or spacing
2. Light-first design; dark theme via `[data-theme="dark"]` selector
3. Consistent opacity: 8% for `-bg` variants, 25-30% for `-border` in light; higher in dark
4. All component CSS is co-located with its component file
5. Transitions: `--ease` timing function, `--duration` (200ms), `--duration-lg` (300ms)
