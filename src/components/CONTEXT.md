# src/components/ — Component Router (Layer 3 Recursive)

11 category folders. Route to the right one before reading source files.

## Component Routing Table

| If your task involves…                                | Folder                      | Read first                                |
|-------------------------------------------------------|-----------------------------|-------------------------------------------|
| Kanban, Gantt, tasks, projects, drag-drop             | `work/`                     | `work/CONTEXT.md`                         |
| Expenses, invoices, income, accounts, assets          | `money/`                    | `money/CONTEXT.md`                        |
| HR, contacts, attendance, recruitment, sales pipeline | `people/`                   | `people/CONTEXT.md`                       |
| Calendar, documents, chat, forum, announcements       | `office/`                   | `office/CONTEXT.md`                       |
| Website monitoring, integrations, email campaigns     | `tech/`                     | `tech/CONTEXT.md`                         |
| CRM contacts, deal pipeline, activity log             | `crm/`                      | `crm/CONTEXT.md`                          |
| App shell, sidebar, topbar, mobile nav, notifications | `layout/`                   | `layout/CONTEXT.md`                       |
| Prayer times, niyyah, ceremony gate, thresholds       | `islamic/`                  | `islamic/CONTEXT.md`                      |
| Search palette, G-labels, Islamic terms, tables       | `shared/`                   | `shared/CONTEXT.md`                       |
| BBOS pipeline header, role badges, task panel         | `bbos/`                     | `bbos/CONTEXT.md`                         |
| Pillar cards, activity chart, health pulse            | `dashboard/`                | `dashboard/CONTEXT.md` |

## Cross-Cutting Patterns
- All components use Lucide React icons (named imports)
- CSS is co-located: `ComponentName.jsx` + `ComponentName.css`
- Portal components (IslamicTerm, SearchPalette, modals) use `createPortal` to escape `overflow:hidden`
- Slide-in panels use `.money-slidein` or `.expense-form-*` CSS class patterns
- Responsive: `useMobile()` hook gates desktop vs mobile UI variants
- Islamic/Universal text switching: check `valuesLayer` from settings-store
