# HR

## Purpose
HR management — employee CRUD, attendance tracking, clock-in, leave management, and tabbed views for salary, stats, timesheet, and organization structure.

## File Inventory
| File | Role |
|------|------|
| HRPage.jsx | Main HR page — routes between tabs and manages top-level HR state |
| HRPage.css | Styles for HRPage layout and tab navigation |
| EmployeeCard.jsx | Card component displaying employee summary info |
| EmployeeList.jsx | Scrollable/filterable list of employee cards |
| EmployeeForm.jsx | Form for creating/editing employee records |
| AddEmployeeModal.jsx | Modal wrapper for adding a new employee |
| AddDepartmentModal.jsx | Modal for creating a new department |
| AttendanceView.jsx | Attendance tracking view — daily/weekly attendance grid |
| AttendanceView.css | Styles for attendance grid and status indicators |
| ClockInModal.jsx | Modal for employee clock-in/clock-out actions |
| LeaveManager.jsx | Leave request management — submit, approve, reject leave |
| TimeTracker.jsx | Time tracking interface for logging work hours |
| TeamInsights.jsx | Team-level analytics and insights dashboard |
| SalariesTab.jsx | Salary overview tab — compensation details per employee |
| StatsTab.jsx | HR statistics tab — headcount, turnover, attendance metrics |
| TimesheetTab.jsx | Timesheet tab — aggregated hours per employee/period |
| OrganizationTab.jsx | Organization chart tab — department/team hierarchy view |

## Dependencies
- Stores: people store (employees, departments, attendance)
- Data: `src/data/config/people-departments.js`
