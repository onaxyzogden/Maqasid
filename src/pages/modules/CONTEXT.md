# Modules Pages — CONTEXT.md

## Purpose
Business module pages -- Work, Project, Money, People, Office, Tech, CRM. Each wraps its corresponding component module with CeremonyGate gating, PillarHeader context, and tab navigation for sub-views.

## File Inventory
| File | Description |
|------|-------------|
| Work.jsx | Work module page -- task management, kanban, gantt views |
| Project.jsx | Project module page -- project tracking and milestones |
| Money.jsx | Money module page -- expenses, invoices, financial tracking |
| Money.css | Styles for Money module page |
| People.jsx | People module page -- HR, contacts, team management |
| People.css | Styles for People module page |
| Office.jsx | Office module page -- calendar, chat, internal tools |
| Office.css | Styles for Office module page |
| Tech.jsx | Tech module page -- monitoring, integrations, system health |
| Tech.css | Styles for Tech module page |
| CRM.jsx | CRM module page -- pipeline, deals, client relationships |
| CRM.css | Styles for CRM module page |

## Dependencies
- Stores: `useIslamicStore`, `useWorkStore`, `useMoneyStore`, `usePeopleStore`, `useOfficeStore`, `useTechStore`, `useCrmStore`
- Components: `src/components/islamic/` (CeremonyGate), `src/components/work/`, `src/components/money/`, `src/components/people/`, `src/components/office/`, `src/components/tech/`, `src/components/crm/`
- Data: `src/data/pillar-dashboard-data.js`
