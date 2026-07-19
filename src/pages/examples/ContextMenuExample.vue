<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseContextMenu } from '@purdia/ui'
import type { ContextMenuItem } from '@purdia/ui'
import { Copy, Scissors, Clipboard, Trash2, Edit, Share, Download, Eye } from '@lucide/vue'

const selectedItem = ref('')

const basicItems: ContextMenuItem[] = [
  { id: 'cut', label: 'Cut' },
  { id: 'copy', label: 'Copy' },
  { id: 'paste', label: 'Paste' },
  { id: 'div1', label: '', divider: true },
  { id: 'delete', label: 'Delete' },
]

const iconItems: ContextMenuItem[] = [
  { id: 'cut', label: 'Cut', icon: Scissors },
  { id: 'copy', label: 'Copy', icon: Copy },
  { id: 'paste', label: 'Paste', icon: Clipboard },
  { id: 'div1', label: '', divider: true },
  { id: 'rename', label: 'Rename', icon: Edit },
  { id: 'delete', label: 'Delete', icon: Trash2 },
]

const shortcutItems: ContextMenuItem[] = [
  { id: 'cut', label: 'Cut', icon: Scissors, shortcut: '⌘X' },
  { id: 'copy', label: 'Copy', icon: Copy, shortcut: '⌘C' },
  { id: 'paste', label: 'Paste', icon: Clipboard, shortcut: '⌘V' },
  { id: 'div1', label: '', divider: true },
  { id: 'share', label: 'Share', icon: Share },
  { id: 'download', label: 'Download', icon: Download, shortcut: '⌘D' },
]

const interactiveItems: ContextMenuItem[] = [
  { id: 'view', label: 'View', icon: Eye },
  { id: 'edit', label: 'Edit', icon: Edit },
  { id: 'duplicate', label: 'Duplicate', icon: Copy },
  { id: 'div1', label: '', divider: true },
  { id: 'delete', label: 'Delete', icon: Trash2 },
]

function handleSelect(item: ContextMenuItem) {
  selectedItem.value = item.label
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Context Menu</h1>
      <p class="text-gray-500 mt-1">Right-click context menu component.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Basic</h4></template>
      <BaseContextMenu :items="basicItems" @select="handleSelect">
        <div
          class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-sm text-gray-400 select-none cursor-context-menu"
        >
          Right-click here (basic)
        </div>
      </BaseContextMenu>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Icons</h4></template>
      <BaseContextMenu :items="iconItems" @select="handleSelect">
        <div
          class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-sm text-gray-400 select-none cursor-context-menu"
        >
          Right-click here (with icons)
        </div>
      </BaseContextMenu>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Shortcuts</h4></template>
      <BaseContextMenu :items="shortcutItems" @select="handleSelect">
        <div
          class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-sm text-gray-400 select-none cursor-context-menu"
        >
          Right-click here (with shortcuts)
        </div>
      </BaseContextMenu>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Interactive (Right-click here)</h4></template>
      <BaseContextMenu :items="interactiveItems" @select="handleSelect">
        <div
          class="border-2 border-dashed border-gray-200 rounded-lg p-8 flex items-center justify-center text-sm text-gray-400 select-none cursor-context-menu"
        >
          Right-click anywhere in this area
        </div>
      </BaseContextMenu>
      <p v-if="selectedItem" class="mt-3 text-sm text-gray-600">
        Selected: <span class="font-medium">{{ selectedItem }}</span>
      </p>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseContextMenu :items="menuItems" @select="handleSelect"&gt;
  &lt;div&gt;Right-click target&lt;/div&gt;
&lt;/BaseContextMenu&gt;

// items: ContextMenuItem[]
const menuItems = [
  { id: 'copy', label: 'Copy', icon: Copy, shortcut: '⌘C' },
  { id: 'div', label: '', divider: true },
  { id: 'delete', label: 'Delete', icon: Trash2 },
]</code></pre>
    </BaseCard>
  </div>
</template>
