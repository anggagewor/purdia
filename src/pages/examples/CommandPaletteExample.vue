<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { BaseCard, BaseCommandPalette } from '@purdia/ui'
import type { CommandItem } from '@purdia/ui'
import { File, Settings, Users, BarChart3, Plus, LogOut, Search } from '@lucide/vue'

const showBasic = ref(false)
const showGrouped = ref(false)

onBeforeUnmount(() => {
  showBasic.value = false
  showGrouped.value = false
})

const basicItems: CommandItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: File, shortcut: '⌘D' },
  { id: 'users', label: 'Users', icon: Users, shortcut: '⌘U' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, shortcut: '⌘A' },
  { id: 'settings', label: 'Settings', icon: Settings, shortcut: '⌘,' },
]

const groupedItems: CommandItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: File, group: 'Pages', shortcut: '⌘D' },
  { id: 'users', label: 'Users', icon: Users, group: 'Pages', shortcut: '⌘U' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, group: 'Pages', shortcut: '⌘A' },
  { id: 'settings', label: 'Settings', icon: Settings, group: 'Pages', shortcut: '⌘,' },
  { id: 'new-project', label: 'New Project', icon: Plus, group: 'Actions', shortcut: '⌘N' },
  { id: 'sign-out', label: 'Sign Out', icon: LogOut, group: 'Actions', shortcut: '⌘Q' },
]

const selectedItem = ref('')

function handleSelect(item: CommandItem) {
  selectedItem.value = item.label
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Command Palette</h1>
      <p class="text-gray-500 mt-1">
        Quick-access command palette with search and keyboard navigation.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Basic</h4></template>
      <button
        class="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
        @click="showBasic = true"
      >
        Open Command Palette
      </button>
      <p v-if="selectedItem" class="text-sm text-gray-600 mt-3">
        Last selected: <span class="font-medium">{{ selectedItem }}</span>
      </p>
      <BaseCommandPalette
        v-model="showBasic"
        :items="basicItems"
        placeholder="Search commands..."
        @select="handleSelect"
      />
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Groups</h4></template>
      <button
        class="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
        @click="showGrouped = true"
      >
        Open Grouped Palette
      </button>
      <BaseCommandPalette
        v-model="showGrouped"
        :items="groupedItems"
        placeholder="Type a command or search..."
        @select="handleSelect"
      />
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Static Preview</h4></template>
      <div
        class="max-w-md border border-gray-200 rounded-xl shadow-lg overflow-hidden dark:border-gray-700"
      >
        <div
          class="flex items-center gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-700"
        >
          <Search class="w-4 h-4 text-gray-400" />
          <span class="flex-1 text-sm text-gray-400">Type a command or search...</span>
          <kbd
            class="px-1.5 py-0.5 text-[10px] font-mono text-gray-400 bg-gray-100 border border-gray-200 rounded dark:bg-gray-700 dark:border-gray-600"
            >Esc</kbd
          >
        </div>
        <div class="py-2">
          <p class="px-4 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            Pages
          </p>
          <div
            class="flex items-center gap-3 px-4 py-2 text-sm bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
          >
            <File class="w-4 h-4" />
            <span class="flex-1 font-medium">Dashboard</span>
            <kbd class="text-[10px] font-mono text-primary-400">⌘D</kbd>
          </div>
          <div class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
            <Users class="w-4 h-4 text-gray-400" />
            <span class="flex-1">Users</span>
            <kbd class="text-[10px] font-mono text-gray-400">⌘U</kbd>
          </div>
          <div class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
            <BarChart3 class="w-4 h-4 text-gray-400" />
            <span class="flex-1">Analytics</span>
            <kbd class="text-[10px] font-mono text-gray-400">⌘A</kbd>
          </div>
          <div class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
            <Settings class="w-4 h-4 text-gray-400" />
            <span class="flex-1">Settings</span>
            <kbd class="text-[10px] font-mono text-gray-400">⌘,</kbd>
          </div>
        </div>
        <div
          class="px-4 py-2 border-t border-gray-100 flex items-center gap-4 text-[10px] text-gray-400 dark:border-gray-700"
        >
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseCommandPalette } from '@purdia/ui'
import type { CommandItem } from '@purdia/ui'
import { File, Settings, Users } from '@lucide/vue'

const show = ref(false)

const items: CommandItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: File, group: 'Pages', shortcut: '⌘D' },
  { id: 'users', label: 'Users', icon: Users, group: 'Pages' },
  { id: 'settings', label: 'Settings', icon: Settings, group: 'Pages', shortcut: '⌘,' },
]

function handleSelect(item: CommandItem) {
  console.log('Selected:', item.label)
}
&lt;/script&gt;

&lt;template&gt;
  &lt;button @click="show = true"&gt;Open (⌘K)&lt;/button&gt;

  &lt;BaseCommandPalette
    v-model="show"
    :items="items"
    placeholder="Search..."
    @select="handleSelect"
  /&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>
  </div>
</template>
