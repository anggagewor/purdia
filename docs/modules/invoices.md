# 🧾 Invoices

Invoice management with line items, tax calculation, and filtered views for payment tracking.

## Sub-modules

| Sub-module     | Description                                       |
| -------------- | ------------------------------------------------- |
| All Invoices   | Full CRUD with line items and tax calculation     |
| Unpaid         | Filtered view for pending payments                |
| Overdue        | Filtered view for overdue invoices                |
| Create Invoice | Multi-item form with auto tax & total calculation |

## Routes

```
/invoices           → All Invoices
/invoices/unpaid    → Unpaid invoices
/invoices/overdue   → Overdue invoices
/invoices/create    → Create new invoice
```
