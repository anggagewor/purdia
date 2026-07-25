<script setup lang="ts">
import { ref } from 'vue'
import { Copy, Check, Code, Terminal } from '@lucide/vue'
import { BaseCard, BaseBadge } from '@purdia/ui'

interface CodeSample {
  language: string
  label: string
  filename: string
  code: string
}

const samples: CodeSample[] = [
  {
    language: 'typescript',
    label: 'TypeScript',
    filename: 'useApi.ts',
    code: `import { ref } from 'vue'
import { get, post } from '@purdia/http'

export function useApi<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetch(params?: Record<string, unknown>) {
    loading.value = true
    error.value = null
    try {
      const response = await get<T>(url, { params })
      data.value = response.data
    } catch (e: any) {
      error.value = e.message || 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  async function create(payload: Partial<T>) {
    loading.value = true
    try {
      const response = await post<T>(url, payload)
      data.value = response.data
      return response.data
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetch, create }
}`,
  },
  {
    language: 'vue',
    label: 'Vue SFC',
    filename: 'UserList.vue',
    code: `<script setup lang="ts">
import { onMounted } from 'vue'
import { BaseTable, BaseButton, BaseBadge } from '@purdia/ui'
import { useApi } from '@purdia/composables'
import type { TableColumn } from '@purdia/ui'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

const { data: users, loading, fetch } = useApi<User[]>('/api/users')

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', align: 'center' },
]

onMounted(() => fetch())
<\/script>

<template>
  <BaseTable
    :columns="columns"
    :data="users ?? []"
    :loading="loading"
    striped
  >
    <template #cell-status="{ value }">
      <BaseBadge :variant="value === 'active' ? 'success' : 'danger'" dot>
        {{ value }}
      </BaseBadge>
    </template>
  </BaseTable>
</template>`,
  },
  {
    language: 'bash',
    label: 'Shell',
    filename: 'terminal',
    code: `# Clone the repository
git clone https://github.com/anggagewor/purdia.git
cd purdia

# Install dependencies (workspace packages auto-linked)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type-check
npm run type-check`,
  },
  {
    language: 'css',
    label: 'CSS',
    filename: 'theme.css',
    code: `@import 'tailwindcss';
@import '@purdia/tailwind/theme';
@import '@purdia/tailwind/colors';
@import '@purdia/tailwind/dark';

/* Custom theme overrides */
:root {
  --color-primary-50: oklch(0.97 0.02 250);
  --color-primary-500: oklch(0.55 0.2 260);
  --color-primary-600: oklch(0.48 0.22 262);
  --color-primary-700: oklch(0.4 0.2 265);
}

/* Animation utilities */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}`,
  },
  {
    language: 'json',
    label: 'JSON',
    filename: 'package.json',
    code: `{
  "name": "purdia",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "dev": "vite",
    "build": "run-p type-check build-only",
    "type-check": "vue-tsc --build"
  },
  "dependencies": {
    "vue": "^3.5.38",
    "vue-router": "^5.1.0",
    "pinia": "^3.0.4"
  }
}`,
  },
]

const activeTab = ref(0)
const copiedIndex = ref<number | null>(null)

async function copyCode(index: number) {
  const code = samples[index].code
  await navigator.clipboard.writeText(code)
  copiedIndex.value = index
  setTimeout(() => {
    copiedIndex.value = null
  }, 2000)
}

function getLineNumbers(code: string): number[] {
  return Array.from({ length: code.split('\n').length }, (_, i) => i + 1)
}

// Simple syntax highlighting (no external dep)
function highlight(code: string, language: string): string {
  let html = escapeHtml(code)

  // Comments
  html = html.replace(/(\/\/.*)$/gm, '<span class="text-gray-500 italic">$1</span>')
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 italic">$1</span>')
  html = html.replace(/(#.*)$/gm, '<span class="text-gray-500 italic">$1</span>')

  // Strings
  html = html.replace(/(&#x27;[^&#]*?&#x27;|&quot;[^&]*?&quot;|`[^`]*?`)/g, '<span class="text-green-400">$1</span>')

  // Keywords
  const keywords = ['import', 'export', 'from', 'const', 'let', 'var', 'function', 'return', 'async', 'await', 'try', 'catch', 'finally', 'if', 'else', 'interface', 'type', 'extends', 'default', 'new', 'true', 'false', 'null', 'typeof', 'onMounted']
  for (const kw of keywords) {
    html = html.replace(new RegExp(`\\b(${kw})\\b`, 'g'), '<span class="text-purple-400 font-medium">$1</span>')
  }

  // Types / classes
  html = html.replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="text-yellow-300">$1</span>')

  // Numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-400">$1</span>')

  // CSS specific
  if (language === 'css') {
    html = html.replace(/(--[\w-]+)/g, '<span class="text-cyan-400">$1</span>')
    html = html.replace(/(@[\w-]+)/g, '<span class="text-purple-400 font-medium">$1</span>')
  }

  return html
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Code Block</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Syntax-highlighted code display with line numbers, copy button, and language tabs.
      </p>
    </div>

    <!-- Language tabs -->
    <BaseCard>
      <div class="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 -mx-5 -mt-5 px-4">
        <button
          v-for="(sample, index) in samples"
          :key="index"
          class="px-3 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors"
          :class="
            activeTab === index
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          "
          @click="activeTab = index"
        >
          {{ sample.label }}
        </button>
      </div>

      <!-- Code block -->
      <div class="mt-4 rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-1.5">
              <div class="w-3 h-3 rounded-full bg-red-500"></div>
              <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div class="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span class="text-xs text-gray-400 ml-2 font-mono">
              {{ samples[activeTab].filename }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <BaseBadge variant="secondary" size="sm">
              {{ samples[activeTab].language }}
            </BaseBadge>
            <button
              class="p-1.5 text-gray-400 hover:text-white rounded transition-colors"
              @click="copyCode(activeTab)"
            >
              <Check v-if="copiedIndex === activeTab" class="w-4 h-4 text-green-400" />
              <Copy v-else class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Code content with line numbers -->
        <div class="overflow-x-auto">
          <div class="flex">
            <!-- Line numbers -->
            <div class="shrink-0 py-4 pl-4 pr-3 select-none border-r border-gray-800">
              <div
                v-for="line in getLineNumbers(samples[activeTab].code)"
                :key="line"
                class="text-xs text-gray-600 text-right font-mono leading-6"
              >
                {{ line }}
              </div>
            </div>

            <!-- Code -->
            <pre class="flex-1 py-4 px-4 text-sm text-gray-100 font-mono leading-6 overflow-x-auto"><code v-html="highlight(samples[activeTab].code, samples[activeTab].language)"></code></pre>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Inline code examples -->
    <BaseCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Inline Code Styles</h3>
      </template>

      <div class="space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-300">
          Use the <code class="px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 text-pink-600 dark:text-pink-400 rounded">useApi()</code> composable to fetch data from any endpoint.
          The response is typed via generics like <code class="px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 text-pink-600 dark:text-pink-400 rounded">useApi&lt;User[]&gt;('/api/users')</code>.
        </p>

        <p class="text-sm text-gray-600 dark:text-gray-300">
          Install with <code class="px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 text-pink-600 dark:text-pink-400 rounded">npm install</code> and start the dev server with
          <code class="px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 text-pink-600 dark:text-pink-400 rounded">npm run dev</code>.
        </p>

        <!-- Terminal style -->
        <div class="rounded-lg bg-gray-900 p-4 font-mono text-sm">
          <div class="flex items-center gap-2 text-gray-400 mb-2">
            <Terminal class="w-4 h-4" />
            <span class="text-xs">Terminal</span>
          </div>
          <div class="text-green-400">$ npm run dev</div>
          <div class="text-gray-300 mt-1">VITE v8.1.4 ready in 838 ms</div>
          <div class="text-gray-500 mt-0.5">  ➜ Local: <span class="text-cyan-400">http://localhost:5173/</span></div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
