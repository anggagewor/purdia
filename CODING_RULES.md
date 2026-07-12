# CODING RULES

Aturan dan konvensi coding untuk project **Purdia** — Vue 3 ERP/CRM Dashboard.

---

## TECH STACK

| Layer     | Teknologi                                    |
| --------- | -------------------------------------------- |
| Framework | Vue 3.5+ (Composition API, `<script setup>`) |
| Language  | TypeScript 6 (strict)                        |
| State     | Pinia 3 (setup store syntax)                 |
| Router    | Vue Router 5                                 |
| Styling   | Tailwind CSS 4 (via `@tailwindcss/vite`)     |
| HTTP      | Axios (wrapper di `src/lib/http.ts`)         |
| Icons     | Lucide Vue (`@lucide/vue`)                   |
| Build     | Vite 8                                       |
| Formatter | oxfmt                                        |
| Rich Text | Tiptap                                       |
| Charts    | Chart.js + vue-chartjs                       |

---

## STRUKTUR FOLDER

```
src/
├── assets/          → Global CSS (Tailwind config)
├── components/
│   ├── charts/      → Chart wrapper components
│   ├── layout/      → DashboardLayout, SidebarNav, TopBar
│   └── ui/          → Base/reusable UI components
├── composables/     → Reusable logic (useApi, usePagination, useToast)
├── lib/             → Low-level utilities (http, crypto, config)
├── pages/           → Page-level components (route views)
│   ├── auth/        → Login, Register, ForgotPassword
│   ├── clients/     → ClientList, ClientCreate, ClientDetail, ClientEdit
│   ├── crm/         → CRM module pages (nested by entity)
│   ├── hrm/         → HRM module pages
│   ├── accounting/  → Accounting pages
│   └── ...
├── router/
│   ├── index.ts     → Router instance + guards
│   └── routes/      → Route definitions per module (1 file per module)
├── stores/          → Pinia stores
└── main.ts          → App entry point
```

---

## NAMING CONVENTIONS

### FILES

| Tipe              | Format           | Contoh                             |
| ----------------- | ---------------- | ---------------------------------- |
| Vue Component     | `PascalCase.vue` | `BaseButton.vue`, `ClientList.vue` |
| TypeScript Module | `camelCase.ts`   | `useApi.ts`, `http.ts`             |
| Route File        | `camelCase.ts`   | `clients.ts`, `crm.ts`             |
| Store File        | `camelCase.ts`   | `auth.ts`, `toast.ts`              |
| Index/Barrel File | `index.ts`       | `index.ts`                         |

### COMPONENTS

| Kategori         | Prefix/Pattern      | Contoh                                    |
| ---------------- | ------------------- | ----------------------------------------- |
| UI Primitives    | `Base` prefix       | `BaseButton`, `BaseCard`, `BaseInput`     |
| UI Composites    | Descriptive name    | `StatCard`, `DropdownButton`, `TabPanel`  |
| Layout           | Descriptive         | `DashboardLayout`, `SidebarNav`, `TopBar` |
| Page (List)      | `{Entity}List`      | `ClientList`, `LeadList`                  |
| Page (Create)    | `{Entity}Create`    | `ClientCreate`, `LeadCreate`              |
| Page (Detail)    | `{Entity}Detail`    | `ClientDetail`, `LeadDetail`              |
| Page (Edit)      | `{Entity}Edit`      | `ClientEdit`, `LeadEdit`                  |
| Page (Dashboard) | `{Module}Dashboard` | `CrmDashboard`, `AccountingDashboard`     |
| Auth Pages       | `{Action}Page`      | `LoginPage`, `RegisterPage`               |

### VARIABLES & FUNCTIONS

- **camelCase** untuk variables dan functions
- **PascalCase** untuk types, interfaces, dan enums
- **UPPER_SNAKE_CASE** untuk constants
- Prefix `use` untuk composables: `useApi`, `usePagination`, `useToast`
- Prefix `is`/`has` untuk boolean computed: `isAuthenticated`, `isActive`

### ROUTE NAMES

- Kebab-case: `client-create`, `crm-lead-detail`, `forgot-password`
- Module-prefixed untuk nested features: `crm-leads`, `crm-lead-create`

---

## COMPONENT PATTERNS

### SCRIPT SETUP (WAJIB)

Semua component HARUS pakai `<script setup lang="ts">`. Tidak boleh pakai Options API.

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>
```

### PROPS

- Definisikan interface `Props` untuk type-safe props
- Gunakan `withDefaults()` untuk default values
- Export type aliases dari component jika perlu di-import di luar (e.g., `TableColumn`, `SelectOption`)

### EMITS

- Gunakan typed emits: `defineEmits<{ eventName: [payload: Type] }>()`
- Nama event pakai camelCase: `update:modelValue`, `click`, `select`

### TEMPLATE ORDER

1. Conditional wrappers (`v-if`)
2. Structural elements (container divs)
3. Slot content (`<slot />`)
4. Child components

---

## STATE MANAGEMENT (PINIA)

### SETUP STORE SYNTAX (WAJIB)

```ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useXxxStore = defineStore('xxx', () => {
  // State
  const data = ref<Type | null>(null)

  // Getters
  const computed = computed(() => ...)

  // Actions
  async function doSomething() { ... }

  return { data, computed, doSomething }
})
```

### ATURAN STORE

- 1 file = 1 store
- Nama file sama dengan store id: `auth.ts` → `defineStore('auth', ...)`
- Export interface types yang dibutuhkan di luar store
- Async operations (API calls, crypto) ditangani di actions
- Jangan akses store di luar setup context tanpa `useStore()` call

---

## ROUTING

### FILE PER MODULE

Setiap module punya 1 route file di `src/router/routes/`:

```ts
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/pages/clients/ClientList.vue'),
  },
  // ...
]

export default routes
```

### CONVENTIONS

- Selalu pakai lazy loading: `() => import('@/pages/...')`
- Guest routes (login, register) pakai `meta: { guest: true }`
- CRUD pattern: `/{entity}`, `/{entity}/create`, `/{entity}/:id`, `/{entity}/:id/edit`
- Route names: kebab-case, module-prefixed untuk nested

---

## HTTP & API

### GUNAKAN WRAPPER, BUKAN AXIOS LANGSUNG

```ts
import { get, post, put, del, upload } from '@/lib/http'

// GET
const response = await get<Client[]>('/clients', { params })

// POST
const result = await post<Client>('/clients', payload)

// DELETE
await del(`/clients/${id}`)
```

### API RESPONSE SHAPE

```ts
interface ApiResponse<T> {
  data: T
  message?: string
  meta?: PaginationMeta
}
```

### ERROR HANDLING

- Error interceptor sudah handle toast notifications otomatis (kecuali 422)
- 401 → silent refresh → fallback logout
- 422 validation errors di-handle manual di component via `error.errors`
- Gunakan `useApi()` composable untuk loading/error state management

---

## COMPOSABLES

### PATTERN

```ts
export function useXxx(params) {
  // reactive state
  // logic
  // return public API
}
```

### YANG SUDAH ADA

| Composable      | Fungsi                                          |
| --------------- | ----------------------------------------------- |
| `useApi`        | Generic API call wrapper (loading, error, data) |
| `usePagination` | Paginated list with search, sort, filter        |
| `useToast`      | Toast notification helper                       |

### BARREL EXPORT

Semua composable di-export via `src/composables/index.ts`. Tambahkan composable baru di situ juga.

---

## STYLING

### TAILWIND ONLY

- Tidak ada custom CSS di component (kecuali edge case)
- Pakai utility classes langsung di template
- Dark mode via `.dark` class toggle (bukan `media` query)
- Dynamic classes via `computed()` yang return array

### THEMING

- Primary color via CSS custom properties (`--primary-50` s/d `--primary-900`)
- Switch theme dengan class di `:root` (e.g., `.theme-blue`, `.theme-emerald`)
- Font: Inter (sans), JetBrains Mono (mono)

### RESPONSIVE

- Mobile-first: `md:` dan `lg:` breakpoints
- Grid layout: `grid grid-cols-1 md:grid-cols-2 gap-4`

### DARK MODE

- Selalu provide dark mode variant di component
- Pattern: `text-gray-900 dark:text-gray-100`, `bg-white dark:bg-gray-800`
- Border: `border-gray-200 dark:border-gray-700`

---

## UI COMPONENT LIBRARY (INTERNAL)

### IMPORT DARI BARREL

```ts
import { BaseButton, BaseCard, BaseInput, BaseSelect } from '@/components/ui'
```

### VARIANT PATTERN

Setiap UI component punya:

- `variant` prop (visual style)
- `size` prop (`sm` | `md` | `lg`)
- Computed classes yang combine variant + size

### SLOT PATTERN

- `<slot />` untuk default content
- Named slots: `header`, `footer`, `cell-{key}` (table)

### JANGAN REINVENT

Kalau ada BaseXxx component, pakai itu. Jangan bikin inline styling yang harusnya pakai component.

---

## ICONS

### LUCIDE ONLY

```ts
import { Plus, Edit, Trash2, Eye } from '@lucide/vue'
```

- Import individual icons, bukan seluruh library
- Ukuran standar: `class="w-4 h-4"` (sm), `class="w-5 h-5"` (md)
- Pass sebagai `:icon` prop ke BaseButton, bukan render manual kecuali perlu

---

## SECURITY

### SECURE STORAGE

- Token dan user data disimpan terenkripsi (AES-GCM) di localStorage via `src/lib/crypto.ts`
- Jangan simpan data sensitif langsung ke localStorage
- Gunakan `secureSet()`, `secureGet()`, `secureRemove()`

### AUTH FLOW

- Token di-attach otomatis via request interceptor
- Silent refresh (refresh token) otomatis saat 401
- Force logout jika refresh gagal

---

## FORM PATTERNS

### LAYOUT

```vue
<div class="space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <BaseInput v-model="field1" label="Label" placeholder="..." />
    <BaseSelect v-model="field2" label="Label" :options="opts" />
  </div>
</div>
```

### VALIDATION

- Tampilkan error per-field via prop `error` di BaseInput/BaseSelect
- Toast otomatis untuk non-422 errors
- 422 errors di-map ke field-level messages manual

---

## PAGE PATTERNS

### LIST PAGE

1. Header (title + description + action buttons)
2. BaseCard (flush) wrapping BaseTable
3. Pagination di footer card
4. Delete confirmation modal

### CREATE/EDIT PAGE

1. Back button + title
2. BaseCard wrapping form (bisa pakai BaseTabs untuk multi-section)
3. Action buttons (Cancel + Save) di luar card

### DETAIL PAGE

1. Back button + title + action buttons (Edit, Delete)
2. Content sections pakai BaseCard

---

## DO'S AND DON'TS

### DO

- ✅ Pakai `<script setup lang="ts">` selalu
- ✅ Pakai composable untuk reusable logic
- ✅ Pakai UI components dari `@/components/ui`
- ✅ Lazy load semua page routes
- ✅ Provide dark mode support
- ✅ Export types yang dibutuhkan
- ✅ Pakai barrel exports (`index.ts`)
- ✅ Tulis JSDoc untuk composables dan lib functions
- ✅ Handle loading & error states

### DON'T

- ❌ Options API
- ❌ Axios langsung tanpa wrapper
- ❌ Inline styles atau `<style>` blocks (kecuali unavoidable)
- ❌ Import seluruh icon library
- ❌ Store data sensitif tanpa enkripsi
- ❌ Hardcode API URLs (pakai config)
- ❌ Skip dark mode variants
- ❌ Bikin component tanpa TypeScript props interface
- ❌ Nested ternary di template (extract ke computed)
