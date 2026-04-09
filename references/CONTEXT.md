# references/ — Factory Room (Layer 3 Persistent Reference)

## Purpose
Long-lived reference material that rarely changes. Style guides, voice documents, component library specs, and reusable templates. Read-only during most sessions — the model internalizes these as constraints rather than treating them as working input.

## File Inventory
| File | Description |
|------|-------------|
| style-guide.md | Design tokens, color palette, spacing scale, typography |
| voice-and-tone.md | Islamic terminology standards, Arabic transliteration, UI copy voice |
| component-library.md | Component catalog with props, variants, and usage examples |

## When to Read
- Before creating new components (check style-guide.md)
- Before writing user-facing text (check voice-and-tone.md)
- Before building a new module (check component-library.md for reusable parts)

## When to Update
- After new design tokens are added to `src/styles/tokens.css`
- After new Islamic terminology conventions are established
- After new shared components are created in `src/components/shared/`
