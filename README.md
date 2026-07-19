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

- 🧩 **40+ UI Components** — Built from scratch, no external UI library
- 🌙 **Dark Mode** — Full light/dark theme with per-user persistence
- 🎨 **8 Color Themes** — Switchable primary colors (Indigo, Blue, Emerald, Rose, Amber, Teal, Violet, Slate)
- 🔐 **Secure Storage** — AES-GCM encrypted localStorage via Web Crypto API
- 🌐 **HTTP Helper** — Axios with auto token injection, silent refresh, multi-backend support
- 🔔 **Toast Notifications** — Global system with auto-dismiss, progress bar, API error integration
- 📦 **Composables** — `useApi`, `usePagination`, `useToast` for clean page logic
- 🛡️ **Authentication** — Login, Register, Forgot Password with encrypted token storage
- 📱 **Collapsible Sidebar** — Icon-only mode with flyout popover submenus
- 📲 **QR Self-Order** — Public mobile menu page, customers scan & order from table
- 🏗️ **Monorepo Architecture** — 11 internal packages for maximum reusability

---

## 🖥️ Demo & Visuals

> **Mock Auth Enabled:** Any email/password combination works.

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
      <b>UI Component Library</b><br/>
      <img src="./docs/component_Index.png" alt="Component Index" width="100%"/>
    </td>
  </tr>
</table>

---

## ⚡ Quick Start

```bash
git clone https://github.com/anggagewor/purdia.git
cd purdia
npm install
npm run dev
```

---

## 🏢 Modules

| Module        | Description                                              | Docs                                                       |
| ------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| 📊 CRM        | Leads, deals, contacts, pipeline, quotations             | [docs/modules/crm.md](./docs/modules/crm.md)               |
| 👥 HRM        | Employees, attendance, payroll, recruitment, performance | [docs/modules/hrm.md](./docs/modules/hrm.md)               |
| 🏪 POS        | Terminal, QR self-order, multi-payment, hold orders      | [docs/modules/pos.md](./docs/modules/pos.md)               |
| 📒 Accounting | Chart of accounts, journals, ledger, statements          | [docs/modules/accounting.md](./docs/modules/accounting.md) |
| 📦 Inventory  | Products, warehouses, stock, barcodes, QC                | [docs/modules/inventory.md](./docs/modules/inventory.md)   |
| 🧾 Invoices   | Invoice CRUD, line items, tax, payment tracking          | [docs/modules/invoices.md](./docs/modules/invoices.md)     |
| 📋 Clients    | Client CRUD with company/individual types                |                                                            |
| 📋 Projects   | Kanban board with drag-and-drop                          |                                                            |
| 👤 Users      | Users, Roles, Permissions CRUD                           |                                                            |

---

## 📦 Packages

Monorepo with 11 internal `@purdia/*` packages. → [Full documentation](./docs/packages.md)

| Package                 | Description                             |
| ----------------------- | --------------------------------------- |
| `@purdia/ui`            | 40+ Vue base components                 |
| `@purdia/charts`        | Chart.js wrappers (Line, Bar, Doughnut) |
| `@purdia/toast`         | Toast notification system               |
| `@purdia/composables`   | `useApi` + `usePagination`              |
| `@purdia/http`          | Axios wrapper + token refresh           |
| `@purdia/crypto`        | AES-GCM encrypted localStorage          |
| `@purdia/auth`          | Auth store + route guard                |
| `@purdia/theme`         | Dark/light + color switching            |
| `@purdia/tailwind`      | Tailwind v4 theme tokens                |
| `@purdia/tsconfig`      | Shared TypeScript configs               |
| `@purdia/eslint-config` | Shared ESLint config                    |

---

## 🧱 Components

40+ components with TypeScript props, variants, and sizes. → [Full list](./docs/components.md)

Highlights: Button, Card, Table, Modal, Tabs, Date Picker, File Upload, Editor (Tiptap), Tree View, Command Palette, Context Menu, Toast, Charts, and more.

---

## 🛠 Tech Stack

| Technology   | Version | Purpose                                         |
| ------------ | ------- | ----------------------------------------------- |
| Vue          | 3.5     | Composition API, `<script setup>`               |
| TypeScript   | 6       | Full type safety                                |
| Tailwind CSS | 4       | Utility-first styling with CSS variable theming |
| Pinia        | 3       | State management                                |
| Vue Router   | 5       | File-based route modules, async guards          |
| Axios        | 1.x     | HTTP client with interceptors                   |
| Chart.js     | 4       | Data visualization                              |
| Tiptap       | 3       | Headless WYSIWYG editor                         |
| Lucide       | 1.x     | 1000+ icons                                     |
| Vite         | 8       | Dev server and build tool                       |

---

## 📁 Project Structure

```
purdia/
├── packages/                    # Shared internal packages (@purdia/*)
│   ├── ui/                      # Vue base components
│   ├── charts/                  # Chart.js wrappers
│   ├── toast/                   # Notification system
│   ├── composables/             # useApi, usePagination
│   ├── http/                    # Axios wrapper + token refresh
│   ├── crypto/                  # Encrypted localStorage
│   ├── auth/                    # Auth store + route guard
│   ├── theme/                   # Dark/light + color switching
│   ├── tailwind/                # CSS theme tokens
│   ├── tsconfig/                # Shared TS configs
│   └── eslint-config/           # Shared lint rules
├── src/
│   ├── components/layout/       # DashboardLayout, SidebarNav, TopBar
│   ├── pages/                   # All page components per module
│   │   ├── auth/                # Login, Register, Forgot Password
│   │   ├── accounting/          # 6 sub-modules
│   │   ├── crm/                 # 11 sub-modules
│   │   ├── hrm/                 # 16 sub-modules
│   │   ├── inventory/           # 8 sub-modules
│   │   ├── invoices/            # Invoice CRUD
│   │   ├── pos/                 # POS Terminal, QR
│   │   ├── projects/            # Kanban board
│   │   ├── public/              # QR self-order (no auth)
│   │   └── examples/            # Component showcase (40+ pages)
│   ├── router/                  # Vue Router with route modules
│   └── stores/                  # Pinia stores
├── docs/                        # Documentation & screenshots
└── package.json                 # Workspace root
```

---

## 🚀 Installation

```bash
# Clone
git clone https://github.com/anggagewor/purdia.git
cd purdia

# Install (includes all workspace packages)
npm install

# Development
npm run dev

# Production build
npm run build

# Preview build
npm run preview
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
