# People Tabs — CONTEXT.md

## Purpose
Detail panel tab content components — 11 tabs rendered inside DetailPanel for both employee and company records.

## File Inventory
| File | Description |
|------|-------------|
| AbsenceTab.jsx | Vacation/absence management: stats grid, request-time-off form, records table; reads absenceRecords + computeVacationStats from contacts-store |
| ClockInsTab.jsx | Clock-in/clock-out tracking with live elapsed timer, date-range filter, averages row, and history table; reads clockIns from contacts-store |
| CompanyInfoTab.jsx | View/edit company fields (name, description, website, email, phone, address, industries); has "Make Client" CTA; uses updateCompany + makeClient |
| CompanyNotesTab.jsx | Freeform textarea for company notes; persists `notes` field to contacts-store via `updateCompany(companyId, { notes })` |
| CompanyPeopleTab.jsx | Searchable 3-col grid of contacts associated with a company; clicking navigates via selectContact |
| DocsTab.jsx | Employee documents CRUD: add with name + status (pending/approved/expired), inline status toggle, delete; reads docRecords from contacts-store |
| HRTab.jsx | HR employment details (type, hiring date, department, position, office, superior, background check); reads/writes hrRecords; footer stats (years at company, days until birthday) |
| PersonalTab.jsx | Inline-editable personal info (name, gender, DOB, nationality, SSN, marital status, contact info, emergency contact, signature); reads contacts + hrRecords |
| SalaryTab.jsx | Salary history bar chart, base salary CRUD, additional compensation entries; bank details collapsible; reads salaryRecords from contacts-store |
| SkillsTab.jsx | Tag-based skill management: add/remove skill tags, persisted as `skills` array on contact record via `updateContact(contactId, { skills })` |
| WorkTab.jsx | Displays all tasks assigned to this person across all projects; reads from task-store via `getTasksByAssignee(contactId)`; shows task title, project name, priority badge, due date, done/active status |

## Key Patterns
- All employee tabs receive `contactId` prop; company tabs receive `companyId` or `company` object
- All store reads use `useContactsStore` from `../../../store/contacts-store`
- WorkTab also uses `useTaskStore.getTasksByAssignee` and `useProjectStore` for project names
- Uses `CollapsibleSection` from `../shared/CollapsibleSection`
- Uses `ClockInModal` from `../hr/ClockInModal` (cross-subfolder import)
- Config constants (ABSENCE_TYPES, SALARY_TYPES, etc.) from `@data/config/contact-config`

## Gotchas
- SkillsTab skills are free-text tags; no skill taxonomy or auto-detection yet
- WorkTab depends on tasks having `assigneeId` set — tasks without an assignee won't appear
