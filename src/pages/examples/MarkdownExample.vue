<script setup lang="ts">
import { ref, computed } from 'vue'
import { FileText, Eye, Edit3, Copy, Check } from '@lucide/vue'
import { BaseCard, BaseButton } from '@purdia/ui'

const activeView = ref<'preview' | 'split' | 'source'>('split')

const markdownSource = ref(`# Purdia Documentation

Welcome to **Purdia** — a modern Vue 3 admin dashboard template built with TypeScript and Tailwind CSS.

## Features

- 40+ reusable UI components
- Dark mode with 8 color themes
- Monorepo architecture with 11 packages
- Secure encrypted storage via Web Crypto API
- Role-based access control

## Quick Start

Install dependencies and start the dev server:

\`\`\`bash
git clone https://github.com/anggagewor/purdia.git
cd purdia
npm install
npm run dev
\`\`\`

## Component Usage

Here's how to use the \`BaseButton\` component:

\`\`\`vue
<template>
  <BaseButton variant="primary" size="md">
    Click Me
  </BaseButton>
</template>
\`\`\`

Inline code: use \`useApi()\` to fetch data.

## Table Example

| Package | Description | Size |
|---------|-------------|------|
| @purdia/ui | Vue components | 45kB |
| @purdia/http | Axios wrapper | 4.8kB |
| @purdia/crypto | AES-GCM storage | 2.4kB |
| @purdia/auth | Auth store | 2.8kB |

## Links & Images

Visit the [official documentation](https://purdia.dev) for more details.

![Dashboard Screenshot](https://via.placeholder.com/600x300/6366f1/ffffff?text=Dashboard+Preview)

## Blockquotes

> "Good documentation is not optional. If your team cannot understand the code without you, you have a bus factor of 1."
>
> — Anonymous Developer

## Task Lists

- [x] Setup project structure
- [x] Create component library
- [x] Add dark mode support
- [ ] Write unit tests
- [ ] Deploy to production

## Horizontal Rule

---

## Emphasis & Formatting

This is **bold text** and this is *italic text*. You can also use ~~strikethrough~~ for deleted content.

### Ordered List

1. Clone the repository
2. Install dependencies
3. Start development server
4. Build for production

### Unordered List

- Vue 3 Composition API
- TypeScript strict mode
- Tailwind CSS v4
- Vite 8 bundler
`)

// Simple markdown to HTML renderer (no external dep)
function renderMarkdown(md: string): string {
  let html = md

  // Code blocks (must be first to avoid inner processing)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    return `<pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm font-mono my-4"><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`
  })

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-2">$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">$1</h1>')

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="border-gray-200 dark:border-gray-700 my-6" />')

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary-500 pl-4 py-1 my-4 text-gray-600 dark:text-gray-400 italic">$1</blockquote>')

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-4 max-w-full border border-gray-200 dark:border-gray-700" />')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">$1</a>')

  // Tables
  html = html.replace(/^\|(.+)\|\s*\n\|[-| :]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm, (_match, header, body) => {
    const headers = header.split('|').map((h: string) => h.trim()).filter(Boolean)
    const rows = body.trim().split('\n').map((row: string) =>
      row.split('|').map((cell: string) => cell.trim()).filter(Boolean)
    )

    let table = '<div class="overflow-x-auto my-4"><table class="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">'
    table += '<thead class="bg-gray-50 dark:bg-gray-800"><tr>'
    for (const h of headers) {
      table += `<th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">${h}</th>`
    }
    table += '</tr></thead><tbody>'
    for (const row of rows) {
      table += '<tr class="border-b border-gray-100 dark:border-gray-700/50">'
      for (const cell of row) {
        table += `<td class="px-4 py-2 text-gray-600 dark:text-gray-300">${cell}</td>`
      }
      table += '</tr>'
    }
    table += '</tbody></table></div>'
    return table
  })

  // Task lists
  html = html.replace(/^- \[x\] (.+)$/gm, '<div class="flex items-center gap-2 my-1"><input type="checkbox" checked disabled class="rounded border-gray-300 text-primary-600" /><span class="text-sm text-gray-700 dark:text-gray-300 line-through">$1</span></div>')
  html = html.replace(/^- \[ \] (.+)$/gm, '<div class="flex items-center gap-2 my-1"><input type="checkbox" disabled class="rounded border-gray-300" /><span class="text-sm text-gray-700 dark:text-gray-300">$1</span></div>')

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 my-1"><span class="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></span><span class="text-sm text-gray-700 dark:text-gray-300">$1</span></li>')

  // Ordered lists
  html = html.replace(/^(\d+)\. (.+)$/gm, '<li class="flex items-start gap-2 my-1"><span class="text-sm font-medium text-gray-500 dark:text-gray-400 shrink-0">$1.</span><span class="text-sm text-gray-700 dark:text-gray-300">$2</span></li>')

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del class="text-gray-400">$1</del>')

  // Inline code (careful not to match code blocks)
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 text-xs font-mono bg-gray-100 dark:bg-gray-700 text-pink-600 dark:text-pink-400 rounded">$1</code>')

  // Paragraphs (lines that aren't already wrapped)
  html = html.replace(/^(?!<[a-z/]|$)(.+)$/gm, '<p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed my-2">$1</p>')

  return html
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const renderedHtml = computed(() => renderMarkdown(markdownSource.value))

const copied = ref(false)
async function copySource() {
  await navigator.clipboard.writeText(markdownSource.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Markdown Renderer</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Lightweight markdown-to-HTML renderer with live preview. No external dependencies.
        </p>
      </div>
      <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
          :class="activeView === 'source' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'"
          @click="activeView = 'source'"
        >
          <Edit3 class="w-3.5 h-3.5 inline mr-1" />Source
        </button>
        <button
          class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
          :class="activeView === 'split' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'"
          @click="activeView = 'split'"
        >
          Split
        </button>
        <button
          class="px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
          :class="activeView === 'preview' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'"
          @click="activeView = 'preview'"
        >
          <Eye class="w-3.5 h-3.5 inline mr-1" />Preview
        </button>
      </div>
    </div>

    <!-- Editor area -->
    <div
      class="grid gap-4 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      :class="activeView === 'split' ? 'grid-cols-2' : 'grid-cols-1'"
    >
      <!-- Source -->
      <div
        v-if="activeView !== 'preview'"
        class="flex flex-col"
        :class="activeView === 'split' ? 'border-r border-gray-200 dark:border-gray-700' : ''"
      >
        <div class="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <FileText class="w-3.5 h-3.5" />
            <span>Markdown Source</span>
          </div>
          <button
            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded"
            @click="copySource"
          >
            <Check v-if="copied" class="w-3.5 h-3.5 text-green-500" />
            <Copy v-else class="w-3.5 h-3.5" />
          </button>
        </div>
        <textarea
          v-model="markdownSource"
          class="flex-1 min-h-[600px] p-4 text-sm font-mono bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 resize-none focus:outline-none leading-relaxed"
          spellcheck="false"
        ></textarea>
      </div>

      <!-- Preview -->
      <div v-if="activeView !== 'source'" class="flex flex-col">
        <div class="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <Eye class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
          <span class="text-xs text-gray-500 dark:text-gray-400">Preview</span>
        </div>
        <div
          class="flex-1 min-h-[600px] p-6 bg-white dark:bg-gray-800 overflow-y-auto prose-container"
          v-html="renderedHtml"
        ></div>
      </div>
    </div>

    <!-- Supported syntax -->
    <BaseCard>
      <template #header>
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Supported Syntax</h3>
      </template>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <div
          v-for="item in ['Headings (h1-h3)', 'Bold / Italic', 'Strikethrough', 'Inline Code', 'Code Blocks', 'Links', 'Images', 'Tables', 'Blockquotes', 'Ordered Lists', 'Unordered Lists', 'Task Lists', 'Horizontal Rules']"
          :key="item"
          class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
        >
          <Check class="w-3.5 h-3.5 text-green-500 shrink-0" />
          {{ item }}
        </div>
      </div>
    </BaseCard>
  </div>
</template>
