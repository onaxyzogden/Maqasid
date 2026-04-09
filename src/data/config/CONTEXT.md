# Config

## Purpose
Domain configuration constants — money categories, contact config, people departments, labels, and recruitment config. Provides static option sets and classification data used by form selectors and filters across modules.

## File Inventory
| File | Role |
|------|------|
| contact-config.js | Contact types, statuses, and field definitions for the contacts module |
| money-categories.js | Expense/income category definitions for the money module |
| people-departments.js | Department list and hierarchy for HR/people management |
| g-labels.js | Global label definitions — colors, names, and groupings for cross-module tagging |
| recruitment-config.js | Recruitment pipeline stages, job posting fields, and candidate status definitions |

## Dependencies
- Stores: consumed by money, people, CRM, and shared stores for dropdown options
- Data: none (pure configuration constants)
