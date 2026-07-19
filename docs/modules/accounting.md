# 📒 Accounting

Double-entry accounting module with chart of accounts, journal entries, ledger, and financial statements.

## Sub-modules

| Sub-module           | Description                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| Dashboard            | Financial overview with key metrics                                      |
| Chart of Accounts    | Account tree management (assets, liabilities, equity, revenue, expenses) |
| Journal Entries      | Debit/credit journal entries with auto-balancing                         |
| General Ledger       | Account transaction history with running balance                         |
| Financial Statements | Balance sheet, income statement                                          |
| Tax Management       | Tax calculation and reporting                                            |

## Screenshots

<p align="center">
  <img src="../Accounting.png" alt="Accounting Dashboard" width="100%"/>
</p>

## Routes

All accounting routes are prefixed with `/accounting/`:

```
/accounting             → Dashboard
/accounting/coa         → Chart of Accounts
/accounting/journals    → Journal Entries
/accounting/ledger      → General Ledger
/accounting/statements  → Financial Statements
/accounting/tax         → Tax Management
```
