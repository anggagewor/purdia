# 📊 CRM — Customer Relationship Management

Full-featured CRM module for managing leads, deals, contacts, and sales pipeline.

## Sub-modules

| Sub-module | Description                                                                       |
| ---------- | --------------------------------------------------------------------------------- |
| Dashboard  | Pipeline stats, recent deals, upcoming activities                                 |
| Leads      | Source tracking, status workflow (new → contacted → qualified → proposal → lost)  |
| Companies  | Industry, employee count, revenue tracking                                        |
| Contacts   | Company association, position, avatar                                             |
| Deals      | Pipeline stages, probability, value, close date                                   |
| Activities | Log calls, meetings, emails linked to contacts & deals                            |
| Follow Ups | Priority-based scheduler with due dates                                           |
| Tasks      | Assignee, priority, status (todo → in-progress → completed)                       |
| Quotations | Line items with auto-calculated totals, status (draft → sent → accepted/rejected) |
| Calendar   | Monthly calendar view with CRM events                                             |
| Reports    | Revenue charts, pipeline by stage, lead sources, top performers                   |

## Screenshots

<p align="center">
  <img src="../crm_dashboard.png" alt="CRM Dashboard" width="100%"/>
</p>

## Routes

All CRM routes are prefixed with `/crm/`:

```
/crm              → Dashboard
/crm/leads        → Leads management
/crm/companies    → Companies
/crm/contacts     → Contacts
/crm/deals        → Deals pipeline
/crm/activities   → Activity log
/crm/follow-ups   → Follow ups
/crm/tasks        → Task board
/crm/quotations   → Quotations
/crm/calendar     → Calendar
/crm/reports      → Reports & analytics
```
