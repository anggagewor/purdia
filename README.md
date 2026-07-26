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
  <a href="https://saweria.co/anggagewor"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee"></a>
</p>

---

## ✨ Features

- 🧩 **40+ UI Components** — Built from scratch, no external UI library
- 🌙 **Dark Mode** — Full light/dark theme with per-user persistence
- 🎨 **8 Color Themes** — Switchable primary colors (Indigo, Blue, Emerald, Rose, Amber, Teal, Violet, Slate)
- 🔐 **Secure Storage** — AES-GCM encrypted localStorage via Web Crypto API
- 🌐 **Internationalization (i18n)** — Composable-based multi-language with JSON locale files (EN, ID, JA)
- 🛡️ **RBAC** — Role-based access control with `v-permission` directive and `useRbac()` composable
- 🔔 **Toast Notifications** — Global system with auto-dismiss, progress bar, API error integration
- 📦 **Composables** — `useApi`, `usePagination`, `useToast`, `useI18n`, `useRbac` for clean page logic
- 📱 **Collapsible Sidebar** — Icon-only mode with flyout popover submenus
- 📲 **QR Self-Order** — Public mobile menu page, customers scan & order from table
- 🏗️ **Monorepo Architecture** — 11 internal packages for maximum reusability
- 💬 **App Pages** — Chat, Email Client, Calendar, Timeline/Feed, Profile
- 🎯 **Landing & Marketing** — Landing page, Pricing page with monthly/yearly toggle
- 🚨 **Error Pages** — 404, 403, 500, Maintenance with illustrations and countdown

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

No build step required for packages — Vite resolves workspace sources directly.

---

## 📱 App Pages

Full-featured application pages ready to use as reference or starting point.

| Page | Route | Description |
|------|-------|-------------|
| Chat | `/chat` | WhatsApp-style messaging with contacts, status indicators, message bubbles |
| Email | `/email` | Gmail-style inbox with folders, labels, compose, read/unread, star |
| Calendar | `/calendar` | Month grid with events, click-to-select, event details sidebar |
| Timeline | `/timeline` | Social media feed with posts, likes, comments, tags, milestones |
| Profile | `/profile` | Cover photo, avatar, bio, tabs (Activity, Settings, Security) |
| Pricing | `/pricing` | 3-tier cards with monthly/yearly toggle, feature comparison |
| Landing | `/landing` | Hero, features grid, testimonials, CTA, footer |
| 404 | `/404-demo` | Not Found page with illustration |
| 403 | `/403` | Access Denied page |
| 500 | `/500` | Server Error with retry button |
| Maintenance | `/maintenance` | Countdown timer with status updates |

---

## 🏢 Modules

| Module | Description | Docs |
|--------|-------------|------|
| 📊 CRM | Leads, deals, contacts, pipeline, quotations | [docs/modules/crm.md](./docs/modules/crm.md) |
| 👥 HRM | Employees, attendance, payroll, recruitment, performance | [docs/modules/hrm.md](./docs/modules/hrm.md) |
| 🏪 POS | Terminal, QR self-order, multi-payment, hold orders | [docs/modules/pos.md](./docs/modules/pos.md) |
| 📒 Accounting | Chart of accounts, journals, ledger, statements | [docs/modules/accounting.md](./docs/modules/accounting.md) |
| 📦 Inventory | Products, warehouses, stock, barcodes, QC | [docs/modules/inventory.md](./docs/modules/inventory.md) |
| 🧾 Invoices | Invoice CRUD, line items, tax, payment tracking | [docs/modules/invoices.md](./docs/modules/invoices.md) |
| 📋 Clients | Client CRUD with company/individual types | |
| 📋 Projects | Kanban board with drag-and-drop | |
| 👤 Users | Users, Roles, Permissions CRUD | |

---

## 🧱 Components

40+ components with TypeScript props, variants, and sizes. → [Full list](./docs/components.md)

### Component Categories

| Category | Components |
|----------|-----------|
| **Form** | Input, Select, Toggle, Date Picker, File Upload, Editor, Textarea, Checkbox, Radio, Number Input, Slider, Rating, Color Picker |
| **Display** | Card, Badge, Avatar, Table, Alert, Progress, Stat Card, Skeleton, Charts, Tag, Spinner, Accordion, Timeline, Steps, Empty State, Divider, Kbd, Avatar Group, Notifications |
| **Navigation** | Button, Tabs, Pagination, Breadcrumb |
| **Overlay & Layout** | Modal, Grid, Drawer, Tooltip, Popover, Tree View, Calendar, Command Palette, Context Menu |
| **Patterns** | Wizard Form, Print Layout, Data Table Advanced, Infinite Scroll, Code Block, Markdown Renderer, i18n Demo, RBAC Demo |

---

## 🔧 DX Features

| Feature | Path | Description |
|---------|------|-------------|
| **i18n** | `src/lib/i18n/` | Composable-based internationalization with `useI18n()`, JSON locale files (EN, ID, JA), reactive language switching, string interpolation |
| **RBAC** | `src/lib/rbac/` | `useRbac()` composable + `v-permission` directive, 4 mock roles (Admin, Manager, Editor, Viewer), graduated permissions |
| **Code Block** | `/examples/code-block` | Syntax highlighted display with line numbers, copy button, language tabs |
| **Markdown** | `/examples/markdown` | Zero-dep renderer with live editor, split view, supports tables/code/lists/images |
| **Wizard Form** | `/examples/wizard-form` | Multi-step form with validation, progress indicator, review step |
| **Print Layout** | `/examples/print-layout` | Invoice template with clean print CSS, A4 optimized |
| **Data Table Adv** | `/examples/data-table-advanced` | Column resize, pin, sort, search, inline editing |
| **Infinite Scroll** | `/examples/infinite-scroll` | IntersectionObserver-based lazy loading with progress |

---

## 📦 Packages

Monorepo with 11 internal `@purdia/*` packages. → [Full documentation](./docs/packages.md)

| Package | Description |
|---------|-------------|
| `@purdia/ui` | 40+ Vue base components |
| `@purdia/charts` | Chart.js wrappers (Line, Bar, Doughnut) |
| `@purdia/toast` | Toast notification system |
| `@purdia/composables` | `useApi` + `usePagination` |
| `@purdia/http` | Axios wrapper + token refresh |
| `@purdia/crypto` | AES-GCM encrypted localStorage |
| `@purdia/auth` | Auth store + route guard |
| `@purdia/theme` | Dark/light + color switching |
| `@purdia/tailwind` | Tailwind v4 theme tokens |
| `@purdia/utils` | Shared utility functions |
| `@purdia/tsconfig` | Shared TypeScript configs |
| `@purdia/eslint-config` | Shared ESLint config |

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue | 3.5 | Composition API, `<script setup>` |
| TypeScript | 6 | Full type safety |
| Tailwind CSS | 4 | Utility-first styling with CSS variable theming |
| Pinia | 3 | State management |
| Vue Router | 5 | File-based route modules, async guards |
| Axios | 1.x | HTTP client with interceptors |
| Chart.js | 4 | Data visualization |
| Tiptap | 3 | Headless WYSIWYG editor |
| Lucide | 1.x | 1000+ icons |
| Vite | 8 | Dev server and build tool |

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
│   ├── utils/                   # Shared utilities
│   ├── tsconfig/                # Shared TS configs
│   └── eslint-config/           # Shared lint rules
├── src/
│   ├── components/layout/       # DashboardLayout, SidebarNav, TopBar
│   ├── lib/                     # Internal libraries
│   │   ├── i18n/                # Internationalization system
│   │   └── rbac/                # Role-based access control
│   ├── pages/                   # All page components
│   │   ├── auth/                # Login, Register, Forgot Password
│   │   ├── errors/              # 404, 403, 500, Maintenance
│   │   ├── accounting/          # 6 sub-modules
│   │   ├── crm/                 # 11 sub-modules
│   │   ├── hrm/                 # 16 sub-modules
│   │   ├── inventory/           # 8 sub-modules
│   │   ├── invoices/            # Invoice CRUD
│   │   ├── pos/                 # POS Terminal, QR
│   │   ├── projects/            # Kanban board
│   │   ├── public/              # QR self-order (no auth)
│   │   ├── examples/            # Component showcase (50+ pages)
│   │   ├── ChatPage.vue         # Messaging UI
│   │   ├── EmailPage.vue        # Email client UI
│   │   ├── CalendarPage.vue     # Calendar view
│   │   ├── TimelinePage.vue     # Activity feed
│   │   ├── ProfilePage.vue      # User profile
│   │   ├── PricingPage.vue      # Pricing cards
│   │   └── LandingPage.vue      # Marketing landing
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

# Development — no need to build packages, Vite resolves source directly
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

> **Note:** This is a monorepo with internal `@purdia/*` packages linked via npm workspaces. All packages export their source TypeScript/Vue files directly, so Vite can resolve and bundle them without a separate build step. Just `npm install` and `npm run dev` — that's it.

---

## ⚠️ Disclaimer

This is a weekend/side project that I also use for my own personal tools. Updates are not guaranteed on a fixed schedule, but I actively maintain it since I depend on it myself. Issues and PRs are welcome — I'll review them when I can.

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
