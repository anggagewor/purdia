<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseTreeView } from '@purdia/ui'
import type { TreeNode } from '@purdia/ui'
import { Folder, File, FolderOpen } from '@lucide/vue'

const selected = ref<string>('')
const multiSelected = ref<string[]>([])

const fileTree: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: Folder,
    children: [
      {
        id: 'components',
        label: 'components',
        icon: Folder,
        children: [
          { id: 'button', label: 'Button.vue', icon: File },
          { id: 'card', label: 'Card.vue', icon: File },
          { id: 'modal', label: 'Modal.vue', icon: File },
        ],
      },
      {
        id: 'pages',
        label: 'pages',
        icon: Folder,
        children: [
          { id: 'home', label: 'Home.vue', icon: File },
          { id: 'about', label: 'About.vue', icon: File },
        ],
      },
      { id: 'main', label: 'main.ts', icon: File },
    ],
  },
  {
    id: 'public',
    label: 'public',
    icon: FolderOpen,
    children: [{ id: 'favicon', label: 'favicon.ico', icon: File }],
  },
  { id: 'pkg', label: 'package.json', icon: File },
]

const simpleTree: TreeNode[] = [
  {
    id: 'documents',
    label: 'Documents',
    children: [
      { id: 'resume', label: 'Resume.pdf' },
      { id: 'cover', label: 'Cover Letter.pdf' },
    ],
  },
  {
    id: 'photos',
    label: 'Photos',
    children: [
      { id: 'vacation', label: 'Vacation.jpg' },
      { id: 'profile', label: 'Profile.png' },
    ],
  },
  { id: 'notes', label: 'Notes.txt' },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Tree View</h1>
      <p class="text-gray-500 mt-1">Hierarchical tree component for nested data.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Basic</h4></template>
      <BaseTreeView :items="simpleTree" />
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Icons</h4></template>
      <BaseTreeView :items="fileTree" />
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Expand All</h4></template>
      <BaseTreeView :items="fileTree" :expand-all="true" />
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Selectable (single)</h4></template>
      <BaseTreeView :items="fileTree" :expand-all="true" selectable v-model="selected" />
      <p class="text-xs text-gray-500 mt-3">Selected: {{ selected || 'none' }}</p>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Selectable (multiple)</h4></template>
      <BaseTreeView :items="simpleTree" :expand-all="true" selectable v-model="multiSelected" />
      <p class="text-xs text-gray-500 mt-3">
        Selected: {{ multiSelected.length ? multiSelected.join(', ') : 'none' }}
      </p>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Disabled Nodes</h4></template>
      <BaseTreeView
        :items="[
          {
            id: 'a',
            label: 'Enabled node',
            children: [
              { id: 'a1', label: 'Child 1' },
              { id: 'a2', label: 'Child 2 (disabled)', disabled: true },
            ],
          },
          {
            id: 'b',
            label: 'Disabled parent',
            disabled: true,
            children: [{ id: 'b1', label: 'Child' }],
          },
          { id: 'c', label: 'Another enabled' },
        ]"
        :expand-all="true"
      />
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseTreeView } from '@purdia/ui'
import type { TreeNode } from '@purdia/ui'
import { Folder, File } from '@lucide/vue'

const selected = ref('')

const tree: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: Folder,
    children: [
      { id: 'main', label: 'main.ts', icon: File },
    ],
  },
]
&lt;/script&gt;

&lt;template&gt;
  &lt;BaseTreeView
    :items="tree"
    :expand-all="true"
    selectable
    v-model="selected"
  /&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>
  </div>
</template>
