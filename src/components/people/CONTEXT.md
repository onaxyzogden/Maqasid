# People Module — CONTEXT.md

## Purpose
HR, contacts, recruitment, and sales pipeline management. Organized into domain subfolders.

## Routing Table (subdirectories)

| Subdirectory | Content | CONTEXT.md |
|---|---|---|
| `hr/` | Employee CRUD, attendance, clock-in, leave, salary/stats/timesheet/org tabs | `hr/CONTEXT.md` |
| `contacts/` | Contact listing, cards, table view, adding contacts | `contacts/CONTEXT.md` |
| `recruitment/` | Job posting pipeline, sales pipeline | `recruitment/CONTEXT.md` |
| `detail/` | Shared detail panel with tabbed content (DetailPanel, DetailPanelHeader, DetailPanelTabs, EditSidePanel) | `detail/CONTEXT.md` |
| `shared/` | AvatarInitials, TypeBadge, CollapsibleSection (3 files) | — |
| `tabs/` | Detail panel tab content: 11 tabs (Personal, HR, Salary, Skills, Work, Docs, Absence, ClockIns, CompanyInfo, CompanyPeople, CompanyNotes) | `tabs/CONTEXT.md` |

## Architecture
```
People (src/pages/modules/People.jsx)
├── ContactsPage | HRPage | SalesPipelinePage | RecruitmentPage (by section)
└── DetailPanel → DetailPanelHeader + DetailPanelTabs (11 tabs)  — when panelOpen

HRPage (5 tabs: employees, timesheet, salaries, stats, organization)
├── EmployeeCard[] (grid)
└── TimesheetTab / SalariesTab / StatsTab / OrganizationTab

ContactsPage
├── ContactsToolbar (search, filters)
├── ContactCard[] | ContactsTable (toggled by viewMode)
└── FloatingFAB → AddContactModal

RecruitmentPage (kanban with job stages) — uses @store/recruitment-store
SalesPipelinePage (kanban with lead stages)
```

## Store Dependencies
- **people-store**: employees, departments, add/updateEmployee
- **contacts-store**: contacts, companies, selectedContactId, viewMode, panelOpen, selectContact, updateContact, updateCompany
- **recruitment-store**: job postings CRUD (Zustand + localStorage)
- **task-store**: `getTasksByAssignee(contactId)` — used by WorkTab to show assigned tasks across all projects
- **project-store**: project names — used by WorkTab for display
- **auth-store**: user

## Key Patterns
- **Master-detail**: DetailPanel shared across pages, triggered by card/row click
- **Merge pattern**: HRPage merges people-store employees with contacts-store employee-type contacts
- **ViewMode toggle**: ContactsPage supports 'cards' or 'table' view
- **Cross-subfolder imports**: Use relative `../subfolder/Component` paths within people/
- **Skills as tags**: SkillsTab stores free-text skill tags as `skills` array on contact record
- **Company notes**: CompanyNotesTab persists `notes` string on company record via `updateCompany`

## Gotchas
- DetailPanel is rendered ONLY by People.jsx. Do not also render it in ContactsPage/HRPage (children of People) — that stacks two panels and duplicates every field in the a11y tree
- DetailPanel reads BOTH contacts and companies via selectedContactId (polymorphic)
- Two levels of "tabs": page-level (Timesheet, Salaries, etc.) vs detail-panel tabs (Personal, Work, Skills, etc.)
- Dual store merge: people-store employees and contacts-store employee-type contacts are merged in HRPage; people-store takes precedence on ID collision
