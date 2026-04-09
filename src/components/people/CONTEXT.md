# People Module — CONTEXT.md

## Purpose
HR, contacts, recruitment, and sales pipeline management. Organized into domain subfolders.

## Routing Table (subdirectories)

| Subdirectory | Content | CONTEXT.md |
|---|---|---|
| `hr/` | Employee CRUD, attendance, clock-in, leave, salary/stats/timesheet/org tabs (17 files) | `hr/CONTEXT.md` |
| `contacts/` | Contact listing, cards, table view, adding contacts (8 files) | `contacts/CONTEXT.md` |
| `recruitment/` | Job posting pipeline, sales pipeline (4 files) | `recruitment/CONTEXT.md` |
| `detail/` | Shared detail panel with tabbed content (5 files) | `detail/CONTEXT.md` |
| `shared/` | AvatarInitials, TypeBadge, CollapsibleSection (3 files) | — |
| `tabs/` | Detail panel tab content: Personal, HR, Salary, Skills, etc. (11 files) | `tabs/CONTEXT.md` |

## Architecture
```
HRPage (5 tabs: employees, timesheet, salaries, stats, organization)
├── EmployeeCard[] (grid)
├── DetailPanel → DetailPanelHeader + DetailPanelTabs (11 tabs)
└── TimesheetTab / SalariesTab / StatsTab / OrganizationTab

ContactsPage
├── ContactsToolbar (search, filters)
├── ContactCard[] | ContactsTable (toggled by viewMode)
├── FloatingFAB → AddContactModal
└── DetailPanel

RecruitmentPage (kanban with job stages) — uses @store/recruitment-store
SalesPipelinePage (kanban with lead stages)
```

## Store Dependencies
- **people-store**: employees, departments, add/updateEmployee
- **contacts-store**: contacts, companies, selectedContactId, viewMode, panelOpen, selectContact
- **recruitment-store**: job postings CRUD (Zustand + localStorage)
- **auth-store**: user

## Key Patterns
- **Master-detail**: DetailPanel shared across pages, triggered by card/row click
- **Merge pattern**: HRPage merges people-store employees with contacts-store employee-type contacts
- **ViewMode toggle**: ContactsPage supports 'cards' or 'table' view
- **Cross-subfolder imports**: Use relative `../subfolder/Component` paths within people/

## Gotchas
- DetailPanel reads BOTH contacts and companies via selectedContactId (polymorphic)
- EmployeeForm reuses `.expense-form-*` CSS classes (from money module)
- Two levels of "tabs": page-level (Timesheet, Salaries, etc.) vs detail-panel tabs (Personal, Work, Skills, etc.)
