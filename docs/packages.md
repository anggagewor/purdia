# 📦 Monorepo Packages

Purdia is organized as an npm workspace monorepo. Shared logic lives in `packages/` and is consumed via `@purdia/*` imports.

## Package List

| Package                                              | Description                                                | Size   |
| ---------------------------------------------------- | ---------------------------------------------------------- | ------ |
| [`@purdia/ui`](../packages/ui)                       | 40+ Vue base components (Button, Card, Table, Modal, etc.) | —      |
| [`@purdia/charts`](../packages/charts)               | Line, Bar, Doughnut chart wrappers (Chart.js)              | 2.5 kB |
| [`@purdia/toast`](../packages/toast)                 | Toast notification store + component + composable          | 5.2 kB |
| [`@purdia/composables`](../packages/composables)     | `useApi` + `usePagination`                                 | 2.3 kB |
| [`@purdia/http`](../packages/http)                   | Axios wrapper with token refresh & multi-service           | 4.8 kB |
| [`@purdia/crypto`](../packages/crypto)               | AES-GCM encrypted localStorage (Web Crypto API)            | 2.4 kB |
| [`@purdia/auth`](../packages/auth)                   | Auth store + Vue Router guard                              | 2.8 kB |
| [`@purdia/theme`](../packages/theme)                 | Dark/light mode + primary color switching                  | 2.6 kB |
| [`@purdia/tailwind`](../packages/tailwind)           | Tailwind v4 theme tokens + color presets + dark mode CSS   | —      |
| [`@purdia/tsconfig`](../packages/tsconfig)           | Shared TypeScript configs (base, lib, vue-lib)             | —      |
| [`@purdia/eslint-config`](../packages/eslint-config) | Shared ESLint flat config (Vue 3 + TypeScript)             | —      |

## Usage

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

## Dependency Graph

```
@purdia/tsconfig          ← no deps
@purdia/eslint-config     ← no deps
@purdia/tailwind          ← no deps (pure CSS)
@purdia/crypto            ← no deps (Web Crypto API)
@purdia/theme             ← pinia, vue
@purdia/toast             ← pinia, vue, @lucide/vue
@purdia/http              ← axios, @purdia/crypto
@purdia/auth              ← pinia, vue, vue-router, @purdia/crypto
@purdia/composables       ← vue, @purdia/http
@purdia/charts            ← vue, chart.js, vue-chartjs
@purdia/ui                ← vue, vue-router, @lucide/vue, @tiptap/*
```
