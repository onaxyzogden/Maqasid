# Ayat

## Purpose
Readiness ayat — Quranic verse lookups keyed to binary readiness strings per pillar. Each pillar file maps a readiness bit-pattern to a relevant ayah with Arabic text, translation, and reference.

## File Inventory
| File | Role |
|------|------|
| readiness-ayat-router.js | Central lookup — resolves pillar + readiness string to the correct ayah entry |
| faith-readiness-ayat.js | Ayat for Faith (Din) readiness states |
| health-readiness-ayat.js | Ayat for Health (Nafs) readiness states |
| intellect-readiness-ayat.js | Ayat for Intellect (Aql) readiness states |
| wealth-readiness-ayat.js | Ayat for Wealth (Mal) readiness states |
| environment-readiness-ayat.js | Ayat for Environment readiness states |
| community-readiness-ayat.js | Ayat for Community (Ummah) readiness states |
| family-readiness-ayat.js | Ayat for Family (Nasl) readiness states |
| people-readiness-ayat.js | Ayat for People readiness states |
| work-readiness-ayat.js | Ayat for Work readiness states |
| spirituality-readiness-ayat.js | Ayat for Spirituality readiness states |
| rest-readiness-ayat.js | Ayat for Rest readiness states |
| learning-readiness-ayat.js | Ayat for Learning readiness states |

## Dependencies
- Stores: none (pure data)
- Data: consumed by `src/components/islamic/ReadinessCheck.jsx`
