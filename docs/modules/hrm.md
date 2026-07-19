# 👥 HRM — Human Resource Management

Complete HR module covering employees, attendance, payroll, recruitment, and more.

## Sub-modules

| Sub-module    | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| Dashboard     | Employee stats, recent leave requests, birthdays, announcements             |
| Employees     | Tabbed form (personal, employment, bank & salary)                           |
| Departments   | Head, budget, employee count                                                |
| Positions     | Level (junior → manager), salary range                                      |
| Attendance    | Daily clock-in/out, status (present, late, absent, half-day)                |
| Leave         | Type (annual, sick, personal, maternity), approval workflow                 |
| Payroll       | Payslip with earnings/deductions breakdown, IDR currency                    |
| Recruitment   | Job postings, applicant tracking (screening → interview → offered/rejected) |
| Performance   | Quarterly reviews with rating, goals, feedback                              |
| Training      | Programs with participants, schedule, completion status                     |
| Assets        | Company asset tracking (laptops, monitors) with condition & assignment      |
| Documents     | Employee documents (contracts, certificates, IDs) with expiry tracking      |
| Expenses      | Claims with category, receipt, approval workflow                            |
| Announcements | Company-wide with type, priority, expiry                                    |
| Calendar      | Monthly calendar with birthdays, leave, training, holidays                  |
| Reports       | Attendance rate, headcount, leave by type, department budget analytics      |

## Screenshots

<p align="center">
  <img src="../hrm_dashboard.png" alt="HRM Dashboard" width="100%"/>
</p>

## Routes

All HRM routes are prefixed with `/hrm/`:

```
/hrm                → Dashboard
/hrm/employees      → Employee management
/hrm/departments    → Departments
/hrm/positions      → Positions
/hrm/attendance     → Attendance tracking
/hrm/leave          → Leave management
/hrm/payroll        → Payroll & payslips
/hrm/recruitment    → Recruitment pipeline
/hrm/performance    → Performance reviews
/hrm/training       → Training programs
/hrm/assets         → Asset management
/hrm/documents      → Document management
/hrm/expenses       → Expense claims
/hrm/announcements  → Announcements
/hrm/calendar       → HR Calendar
/hrm/reports        → HR Reports
```
