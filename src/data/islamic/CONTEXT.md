# Islamic

## Purpose
Core Islamic content — module attributes, glossary, five pillars educational content, pillar classification, and dashboard metrics. Serves as the central Islamic data layer for the entire application.

## File Inventory
| File | Role |
|------|------|
| islamic-data.js | Module-level Islamic attributes — names, icons, colors, descriptions per maqsad |
| islamic-glossary.js | Arabic/Islamic term definitions used across the app |
| five-pillars-content.js | Educational content for the Five Pillars of Islam (Shahada, Salah, Zakat, Sawm, Hajj) |
| pillar-content.js | Seven Maqasid pillar classification — maps each pillar to its category and metadata |
| pillar-dashboard-data.js | Dashboard metrics, KPIs, and display config per pillar |

## Dependencies
- Stores: consumed by pillar dashboard stores and Islamic component state
- Data: none (authoritative source — other modules depend on this)
