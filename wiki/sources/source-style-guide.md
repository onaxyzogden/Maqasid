---
title: "Style Guide -- Design Tokens and Visual Standards"
type: source
ingested: 2026-04-09
source_path: "references/style-guide.md"
source_type: document
tags: [design, tokens, css, typography, color]
---

## Summary

The style guide defines the complete visual language for [[maqasid-os]] V2.1. It establishes design tokens for color, typography, spacing, and surface effects, all exposed as CSS custom properties in `src/styles/tokens.css`. The guide enforces a single rule above all others: never hardcode values -- always reference the token system.

## Key Extractions

### Color System
- **Primary:** Teal `#4ab8a8`
- **Accent:** Gold `#c9a05a`
- **7 Pillar Colors:** Each of the Seven [[maqasid-al-shariah]] pillars (Faith, Life, Intellect, Family, Wealth, Environment, Ummah) has a dedicated color token.
- **18 Module Colors:** Finer-grained tokens for individual modules within each pillar.

### Spacing Scale
- Based on 4px increments (4, 8, 12, 16, 20, 24, 32, 40, 48, 64).

### Typography
- **DM Sans** -- primary UI text
- **Manrope** -- headings and emphasis
- **Noto Serif** -- body/long-form content
- **Space Grotesk** -- data and metrics
- **Amiri** -- Arabic script and Quranic references
- **JetBrains Mono** -- code blocks and technical content

### Surface Effects
- Glassmorphism tokens for backdrop blur, transparency, and border luminance.

### Source of Truth
- All tokens live in `src/styles/tokens.css`. Components consume tokens via `var(--token-name)`.

## Notable Claims

- The token system is designed to support future theming (e.g., dark mode, high-contrast) by swapping token values at the root level without touching component styles.
- Pillar and module colors were chosen to be visually distinct at small sizes (badge/icon scale) while maintaining accessible contrast ratios against both light and dark backgrounds.

## Connections

- [[maqasid-os]] -- the application these tokens serve
- [[source-component-library]] -- components that consume these tokens
- [[maqasid-al-shariah]] -- the Seven Pillars that drive the color taxonomy
