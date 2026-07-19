<p align="center">
  <img src="./docs/banner.png" alt="Purdia">
</p>

<h1 align="center">Purdia</h1>

<p align="center">
Modern Vue 3 Admin Dashboard built with TypeScript & Tailwind CSS 4.
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/anggagewor/purdia?style=for-the-badge">
  <img src="https://img.shields.io/github/license/anggagewor/purdia?style=for-the-badge">
  <img src="https://img.shields.io/badge/Vue_3-3.5-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-6.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</p>

---

## ✨ Features

- 🧩 **25+ UI Components** — Built from scratch, no external UI library
- 🌙 **Dark Mode** — Full light/dark theme with per-user persistence
- 🎨 **8 Color Themes** — Switchable primary colors (Indigo, Blue, Emerald, Rose, Amber, Teal, Violet, Slate)
- 🔐 **Secure Storage** — AES-GCM encrypted localStorage via Web Crypto API
- 🌐 **HTTP Helper** — Axios with auto token injection, silent refresh, multi-backend support
- 🔔 **Toast Notifications** — Global system with auto-dismiss, progress bar, API error integration
- 📦 **Composables** — `useApi`, `usePagination`, `useToast` for clean page logic
- 🛡️ **Authentication** — Login, Register, Forgot Password with encrypted token storage
- 📱 **Collapsible Sidebar** — Icon-only mode with flyout popover submenus
- 📲 **QR Self-Order** — Public mobile menu page, customers scan & order from table
- 🏗️ **Monorepo Architecture** — 12 internal packages for maximum reusability

## 🖥️ Demo & Visuals

> **Mock Auth Enabled:** Any email/password combination works.

### 📊 Dashboards Preview

<table width="100%">
  <tr>
    <td width="50%" align="center">
      <b>Main Dashboard</b><br/>
      <img src="./docs/dashboard.png" alt="Main Dashboard" width="100%"/>
    </td>
    <td width="50%" align="center">
      <b>CRM Dashboard</b><br/>
      <img src="./docs/crm_dashboard.png" alt="CRM Dashboard" width="100%"/>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>HRM Dashboard</b><br/>
      <img src="./docs/hrm_dashboard.png" alt="HRM Dashboard" width="100%"/>
    </td>
    <td width="50%" align="center">
      <b>POS Terminal & Dashboard</b><br/>
      <img src="./docs/Pos_dashboard.png" alt="POS Dashboard" width="100%"/>
    </td>
  </tr>
  <tr>
    <td width="50%" align="center">
      <b>Accounting & Ledger</b><br/>
      <img src="./docs/Accounting.png" alt="Accounting Dashboard" width="100%"/>
    </td>
    <td width="50%" align="center">
      <b>UI Component Library Index</b><br/>
      <img src="./docs/component_Index.png" alt="Component Index" width="100%"/>
    </td>
  </tr>
</table>

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Run local development server
npm run dev
```

---

## 📦 Monorepo Packages

Purdia is organized as an npm workspace monorepo. Shared logic lives in `packages/` and is consumed via `@purdia/*` imports.

| Package                                             | Description                                               | Size   |
| --------------------------------------------------- | --------------------------------------------------------- | ------ |
| [`@purdia/ui`](./packages/ui)                       | 22 Vue base components (Button, Card, Table, Modal, etc.) | —      |
| [`@purdia/charts`](./packages/charts)               | Line, Bar, Doughnut chart wrappers (Chart.js)             | 2.5 kB |
| [`@purdia/toast`](./packages/toast)                 | Toast notification store + component + composable         | 5.2 kB |
| [`@purdia/composables`](./packages/composables)     | `useApi` + `usePagination`                                | 2.3 kB |
| [`@purdia/http`](./packages/http)                   | Axios wrapper with token refresh & multi-service          | 4.8 kB |
| [`@purdia/crypto`](./packages/crypto)               | AES-GCM encrypted localStorage (Web Crypto API)           | 2.4 kB |
| [`@purdia/auth`](./packages/auth)                   | Auth store + Vue Router guard                             | 2.8 kB |
| [`@purdia/theme`](./packages/theme)                 | Dark/light mode + primary color switching                 | 2.6 kB |
| [`@purdia/utils`](./packages/utils)                 | Formatting, debounce, throttle, uid helpers               | 1.9 kB |
| [`@purdia/tailwind`](./packages/tailwind)           | Tailwind v4 theme tokens + color presets + dark mode CSS  | —      |
| [`@purdia/tsconfig`](./packages/tsconfig)           | Shared TypeScript configs (base, lib, vue-lib)            | —      |
| [`@purdia/eslint-config`](./packages/eslint-config) | Shared ESLint flat config (Vue 3 + TypeScript)            | —      |

### Usage

```ts
// Components
import { BaseButton, BaseCard, BaseTable } from '@purdia/ui'
import { LineChart, BarChart } from '@purdia/charts'
import { ToastContainer, useToast } from '@purdia/toast'

// Composables
import { useApi, usePagination } from '@purdia/composables'

// HTTP & Auth
import { initHttp, get, post } from '@purdia/http'
import { useAuthStore, createAuthGuard } from '@purdia/auth'

// Utilities
import { formatCurrency, debounce, uid } from '@purdia/utils'
import { secureSet, secureGet } from '@purdia/crypto'

// Theme
import { useThemeStore, colorOptions } from '@purdia/theme'
```

```css
/* Tailwind theme */
@import 'tailwindcss';
@import '@purdia/tailwind/theme';
@import '@purdia/tailwind/colors';
@import '@purdia/tailwind/dark';
```

```jsonc
// tsconfig.json in any package
{ "extends": "@purdia/tsconfig/lib" }       // pure TS
{ "extends": "@purdia/tsconfig/vue-lib" }   // Vue component lib
```

```js
// eslint.config.js
import purdiaConfig from '@purdia/eslint-config'
export default [...purdiaConfig]
```

### Dependency Graph

```
@purdia/tsconfig          ← no deps
@purdia/eslint-config     ← no deps
@purdia/tailwind          ← no deps (pure CSS)
@purdia/utils             ← no deps
@purdia/crypto            ← no deps (Web Crypto API)
@purdia/theme             ← pinia, vue
@purdia/toast             ← pinia, vue, @lucide/vue
@purdia/http              ← axios, @purdia/crypto
@purdia/auth              ← pinia, vue, vue-router, @purdia/crypto
@purdia/composables       ← vue, @purdia/http
@purdia/charts            ← vue, chart.js, vue-chartjs
@purdia/ui                ← vue, vue-router, @lucide/vue, @tiptap/*
```

---

## 🏢 Modules

### 📊 CRM — Customer Relationship Management

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

### 👥 HRM — Human Resource Management

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

### 🏪 Point of Sale

| Sub-module   | Description                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| Dashboard    | Sales overview and stats                                                                             |
| POS Terminal | Product grid, favorites, inline discounts, multi-payment (Cash, Card, E-Wallet), numpad, hold orders |
| Stock        | Product inventory management                                                                         |
| Customers    | Customer database                                                                                    |
| Cash Drawer  | Cash management                                                                                      |
| Discounts    | Discount & promo management                                                                          |
| QR Codes     | Generate & print QR codes per table for customer self-order                                          |
| Reports      | Sales reports and analytics                                                                          |

#### POS Terminal Features

- **Product Variants** — Size, sugar level, temperature, add-ons, spice level per product
- **Numpad** — On-screen numpad bound to active input (cash, card number, phone)
- **Voucher Code** — Apply promo codes with validation and discount stacking
- **Hold Order** — Save current order for later, resume anytime
- **Table/Tab System** — Assign orders to 12 tables, auto-merge items on same table
- **QR Self-Order** — Customers scan QR at table, browse menu, submit order to POS
- **Order Notifications** — Incoming QR orders appear with accept/reject flow

### 📒 Accounting

| Sub-module           | Description                     |
| -------------------- | ------------------------------- |
| Dashboard            | Financial overview              |
| Chart of Accounts    | Account tree management         |
| Journal Entries      | Debit/credit journal entries    |
| General Ledger       | Account transaction history     |
| Financial Statements | Balance sheet, income statement |
| Tax Management       | Tax calculation and reporting   |

### 📦 Inventory

| Sub-module      | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| Dashboard       | Stats overview, quick actions, recent stock movements                        |
| Products        | Full CRUD with SKU, barcode, category, warehouse, stock levels, pricing      |
| Warehouses      | Warehouse locations with manager, capacity, item count                       |
| Stock Movements | Track stock in, stock out, and transfers between warehouses                  |
| Purchases       | Purchase order CRUD with multi-item line items, supplier, status tracking    |
| Barcodes        | Barcode listing, generate & print labels (EAN-13, Code-128, QR), scan/lookup |
| Maintenance     | Equipment maintenance requests with type, priority, scheduling, activity log |
| Quality Control | Quality inspections with checklist, pass/fail results, batch tracking        |

### 🧾 Invoices

| Sub-module   | Description                                   |
| ------------ | --------------------------------------------- |
| All Invoices | Full CRUD with line items and tax calculation |
| Unpaid       | Filtered view for pending payments            |
| Overdue      | Filtered view for overdue invoices            |

### 📋 Other Modules

| Module          | Description                                         |
| --------------- | --------------------------------------------------- |
| Clients         | Client CRUD with company/individual types, contacts |
| Projects        | Kanban board with drag-and-drop, task detail        |
| User Management | Users, Roles, Permissions with CRUD                 |

---

## 🧱 Component Library

All components are published as `@purdia/ui` with full TypeScript props, variants, and sizes.

| Component   | Variants                                                      |
| ----------- | ------------------------------------------------------------- |
| Button      | primary, secondary, success, warning, danger, ghost, outline  |
| Card        | default, bordered, elevated, flat + flush mode                |
| Table       | default, striped, bordered + searchable, sortable, expandable |
| Badge       | primary, secondary, success, warning, danger, info            |
| Input       | default, filled, underlined                                   |
| Select      | single, multiple, remote/ajax, searchable, clearable          |
| Modal       | sm, md, lg, xl, full                                          |
| Alert       | info, success, warning, danger                                |
| Pagination  | default, simple, minimal, jumper                              |
| Tabs        | default, pills, underline, bordered                           |
| Date Picker | date, time, datetime, range                                   |
| Toggle      | sm, md, lg                                                    |
| Progress    | primary, success, warning, danger + striped, animated         |
| Skeleton    | text, circle, rect, button, avatar, badge, input              |
| Avatar      | xs, sm, md, lg, xl + circle, rounded, square                  |
| Dropdown    | 7 color variants + teleported positioning                     |
| Charts      | Line, Bar, Doughnut (Chart.js) — `@purdia/charts`             |
| Breadcrumb  | chevron, slash, dot separators + sm, md, lg sizes + icons     |
| File Upload | dropzone, input, compact + progress, cancel, retry, validate  |
| Editor      | minimal, default, full (Tiptap WYSIWYG) + sm, md, lg sizes    |
| Toast       | success, error, warning, info — `@purdia/toast`               |

---

## 🛠 Tech Stack

| Technology   | Version | Purpose                                         |
| ------------ | ------- | ----------------------------------------------- |
| Vue          | 3.5     | Composition API, `<script setup>`               |
| TypeScript   | 6       | Full type safety                                |
| Tailwind CSS | 4       | Utility-first styling with CSS variable theming |
| Pinia        | 3       | State management (auth, theme, toast, pos)      |
| Vue Router   | 5       | File-based route modules, async guards          |
| Axios        | 1.x     | HTTP client with interceptors                   |
| Chart.js     | 4       | Data visualization                              |
| Tiptap       | 3       | Headless WYSIWYG editor                         |
| Lucide       | 1.x     | 1000+ icons                                     |
| Vite         | 8       | Dev server and build tool                       |

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/anggagewor/purdia.git
cd purdia

# Install dependencies (includes all workspace packages)
npm install

# Start development server
npm run dev

# Type-check and build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
purdia/
├── packages/                    # Shared internal packages
│   ├── ui/                      # @purdia/ui — Vue base components
│   ├── charts/                  # @purdia/charts — Chart.js wrappers
│   ├── toast/                   # @purdia/toast — Notification system
│   ├── composables/             # @purdia/composables — useApi, usePagination
│   ├── http/                    # @purdia/http — Axios wrapper + token refresh
│   ├── crypto/                  # @purdia/crypto — Encrypted localStorage
│   ├── auth/                    # @purdia/auth — Auth store + route guard
│   ├── theme/                   # @purdia/theme — Dark/light + color switching
│   ├── utils/                   # @purdia/utils — Formatting & helper functions
│   ├── tailwind/                # @purdia/tailwind — CSS theme tokens
│   ├── tsconfig/                # @purdia/tsconfig — Shared TS configs
│   └── eslint-config/           # @purdia/eslint-config — Shared lint rules
├── src/
│   ├── assets/                  # Global CSS (imports @purdia/tailwind)
│   ├── components/
│   │   └── layout/              # DashboardLayout, SidebarNav, TopBar
│   ├── lib/
│   │   └── config.ts            # Multi-backend API service configuration
│   ├── pages/                   # All page components per module
│   │   ├── auth/                # Login, Register, Forgot Password
│   │   ├── accounting/          # Chart of Accounts, Journals, Ledger
│   │   ├── clients/             # Client CRUD
│   │   ├── crm/                 # CRM (11 sub-modules, 35 pages)
│   │   ├── hrm/                 # HRM (16 sub-modules, 47 pages)
│   │   ├── inventory/           # Inventory (8 sub-modules, 22 pages)
│   │   ├── invoices/            # Invoice CRUD + filtered views
│   │   ├── pos/                 # POS Terminal, Stock, QR Codes
│   │   ├── projects/            # Kanban board, Task Detail
│   │   ├── public/              # Public QR self-order (no auth)
│   │   ├── users/               # Users, Roles, Permissions
│   │   └── examples/            # Component showcase pages
│   ├── router/                  # Vue Router with route modules
│   └── stores/                  # App-specific Pinia stores (pos)
├── package.json                 # Workspace root
└── tsconfig.json                # Project references
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License — free to use, modify, and distribute.
