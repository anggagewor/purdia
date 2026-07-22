<script setup lang="ts">
import { BaseButton, ButtonGroup, DropdownButton, BaseCard } from '@purdia/ui'
import {
  Plus,
  Download,
  Trash2,
  Edit,
  ArrowRight,
  Send,
  Copy,
  Share,
  Archive,
  MoreHorizontal,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from '@lucide/vue'
import type { DropdownItem } from '@purdia/ui'

const fileActions: DropdownItem[] = [
  { label: 'New File', icon: Plus, value: 'new' },
  { label: 'Download', icon: Download, value: 'download' },
  { label: 'Copy Link', icon: Copy, value: 'copy' },
  { label: 'Share', icon: Share, value: 'share' },
  { divider: true, label: '' },
  { label: 'Archive', icon: Archive, value: 'archive' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

const simpleActions: DropdownItem[] = [
  { label: 'Edit', value: 'edit' },
  { label: 'Duplicate', value: 'duplicate' },
  { label: 'Move to...', value: 'move' },
  { divider: true, label: '' },
  { label: 'Delete', value: 'delete', danger: true },
]

const disabledActions: DropdownItem[] = [
  { label: 'Available', value: 'available' },
  { label: 'Disabled Item', value: 'disabled', disabled: true },
  { label: 'Also Available', value: 'also' },
]

function handleSelect(item: DropdownItem) {
  console.log('Selected:', item.value)
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Button</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Komponen button dengan berbagai variant, size, icon, state, button group, dan dropdown.
      </p>
    </div>

    <!-- Variants -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="success">Success</BaseButton>
        <BaseButton variant="warning">Warning</BaseButton>
        <BaseButton variant="danger">Danger</BaseButton>
        <BaseButton variant="ghost">Ghost</BaseButton>
        <BaseButton variant="outline">Outline</BaseButton>
      </div>
    </BaseCard>

    <!-- Sizes -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseButton size="sm">Small</BaseButton>
        <BaseButton size="md">Medium</BaseButton>
        <BaseButton size="lg">Large</BaseButton>
      </div>
    </BaseCard>

    <!-- With Icons -->
    <BaseCard>
      <template #header><h4 class="font-semibold">With Icons</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseButton :icon="Plus">Add Item</BaseButton>
        <BaseButton variant="danger" :icon="Trash2">Delete</BaseButton>
        <BaseButton variant="secondary" :icon="Download">Download</BaseButton>
        <BaseButton variant="ghost" :icon="Edit">Edit</BaseButton>
        <BaseButton variant="success" :icon-right="ArrowRight">Next</BaseButton>
        <BaseButton variant="outline" :icon="Send">Send</BaseButton>
      </div>
    </BaseCard>

    <!-- States -->
    <BaseCard>
      <template #header><h4 class="font-semibold">States</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseButton :loading="true">Loading</BaseButton>
        <BaseButton variant="success" :loading="true">Saving...</BaseButton>
        <BaseButton :disabled="true">Disabled</BaseButton>
        <BaseButton variant="outline" :disabled="true">Disabled Outline</BaseButton>
      </div>
    </BaseCard>

    <!-- Block -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Block (Full Width)</h4></template>
      <div class="space-y-3">
        <BaseButton block>Full Width Primary</BaseButton>
        <BaseButton variant="outline" block>Full Width Outline</BaseButton>
      </div>
    </BaseCard>

    <!-- Button Group -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Button Group</h4></template>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-gray-500 mb-3">Attached (default)</p>
          <div class="flex flex-wrap gap-4">
            <ButtonGroup>
              <BaseButton variant="outline">Left</BaseButton>
              <BaseButton variant="outline">Center</BaseButton>
              <BaseButton variant="outline">Right</BaseButton>
            </ButtonGroup>

            <ButtonGroup>
              <BaseButton variant="outline" :icon="Bold" />
              <BaseButton variant="outline" :icon="Italic" />
              <BaseButton variant="outline" :icon="Underline" />
            </ButtonGroup>

            <ButtonGroup>
              <BaseButton variant="outline" :icon="AlignLeft" />
              <BaseButton variant="outline" :icon="AlignCenter" />
              <BaseButton variant="outline" :icon="AlignRight" />
            </ButtonGroup>
          </div>
        </div>

        <div>
          <p class="text-xs text-gray-500 mb-3">With variants</p>
          <div class="flex flex-wrap gap-4">
            <ButtonGroup>
              <BaseButton>Save</BaseButton>
              <BaseButton variant="primary" :icon="ChevronDown" />
            </ButtonGroup>

            <ButtonGroup>
              <BaseButton variant="success">Approve</BaseButton>
              <BaseButton variant="danger">Reject</BaseButton>
            </ButtonGroup>
          </div>
        </div>

        <div>
          <p class="text-xs text-gray-500 mb-3">Detached (gap between)</p>
          <ButtonGroup :attached="false">
            <BaseButton variant="outline" size="sm">Day</BaseButton>
            <BaseButton variant="primary" size="sm">Week</BaseButton>
            <BaseButton variant="outline" size="sm">Month</BaseButton>
            <BaseButton variant="outline" size="sm">Year</BaseButton>
          </ButtonGroup>
        </div>
      </div>
    </BaseCard>

    <!-- Dropdown -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Dropdown Button</h4></template>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-gray-500 mb-3">Variants</p>
          <div class="flex flex-wrap items-center gap-3">
            <DropdownButton :items="simpleActions" variant="primary" @select="handleSelect">
              Actions
            </DropdownButton>
            <DropdownButton :items="simpleActions" variant="secondary" @select="handleSelect">
              Secondary
            </DropdownButton>
            <DropdownButton :items="simpleActions" variant="outline" @select="handleSelect">
              Outline
            </DropdownButton>
            <DropdownButton :items="simpleActions" variant="ghost" @select="handleSelect">
              Ghost
            </DropdownButton>
          </div>
        </div>

        <div>
          <p class="text-xs text-gray-500 mb-3">With icons in items</p>
          <div class="flex flex-wrap items-center gap-3">
            <DropdownButton
              :items="fileActions"
              variant="primary"
              :icon="Plus"
              @select="handleSelect"
            >
              New
            </DropdownButton>
            <DropdownButton :items="fileActions" variant="outline" @select="handleSelect">
              File Actions
            </DropdownButton>
          </div>
        </div>

        <div>
          <p class="text-xs text-gray-500 mb-3">Sizes</p>
          <div class="flex flex-wrap items-center gap-3">
            <DropdownButton :items="simpleActions" size="sm" @select="handleSelect"
              >Small</DropdownButton
            >
            <DropdownButton :items="simpleActions" size="md" @select="handleSelect"
              >Medium</DropdownButton
            >
            <DropdownButton :items="simpleActions" size="lg" @select="handleSelect"
              >Large</DropdownButton
            >
          </div>
        </div>

        <div>
          <p class="text-xs text-gray-500 mb-3">Alignment</p>
          <div class="flex justify-between">
            <DropdownButton
              :items="simpleActions"
              variant="outline"
              align="left"
              @select="handleSelect"
            >
              Left aligned
            </DropdownButton>
            <DropdownButton
              :items="simpleActions"
              variant="outline"
              align="right"
              @select="handleSelect"
            >
              Right aligned
            </DropdownButton>
          </div>
        </div>

        <div>
          <p class="text-xs text-gray-500 mb-3">Disabled items & state</p>
          <div class="flex flex-wrap items-center gap-3">
            <DropdownButton :items="disabledActions" variant="outline" @select="handleSelect">
              Has Disabled Item
            </DropdownButton>
            <DropdownButton
              :items="simpleActions"
              variant="outline"
              :disabled="true"
              @select="handleSelect"
            >
              Disabled
            </DropdownButton>
          </div>
        </div>

        <div>
          <p class="text-xs text-gray-500 mb-3">Icon-only trigger (more menu)</p>
          <DropdownButton
            :items="simpleActions"
            variant="ghost"
            :icon="MoreHorizontal"
            size="sm"
            @select="handleSelect"
          />
        </div>
      </div>
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import { BaseButton, ButtonGroup, DropdownButton } from '@purdia/ui'
import { Plus, Trash2, Bold, Italic } from '@lucide/vue'
import type { DropdownItem } from '@purdia/ui'

const actions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { label: 'Copy', value: 'copy' },
  { divider: true, label: '' },
  { label: 'Delete', value: 'delete', danger: true },
]
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Button Group --&gt;
  &lt;ButtonGroup&gt;
    &lt;BaseButton variant="outline" :icon="Bold" /&gt;
    &lt;BaseButton variant="outline" :icon="Italic" /&gt;
  &lt;/ButtonGroup&gt;

  &lt;!-- Dropdown --&gt;
  &lt;DropdownButton
    :items="actions"
    variant="outline"
    @select="handleSelect"
  &gt;
    Actions
  &lt;/DropdownButton&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>

    <!-- Props -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Button Props</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Prop</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Default</th>
              <th class="text-left py-2 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">variant</code>
              </td>
              <td class="py-2 pr-4">ButtonVariant</td>
              <td class="py-2 pr-4">'primary'</td>
              <td class="py-2">Visual style</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">size</code>
              </td>
              <td class="py-2 pr-4">'sm' | 'md' | 'lg'</td>
              <td class="py-2 pr-4">'md'</td>
              <td class="py-2">Button size</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">icon</code>
              </td>
              <td class="py-2 pr-4">Component</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Left icon</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">iconRight</code>
              </td>
              <td class="py-2 pr-4">Component</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Right icon</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">loading</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Show spinner</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">disabled</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Disable button</td>
            </tr>
            <tr>
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">block</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Full width</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">ButtonGroup Props</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Prop</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Default</th>
              <th class="text-left py-2 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr>
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">attached</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">true</td>
              <td class="py-2">Attach buttons (remove gap, merge borders)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">DropdownButton Props</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Prop</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Default</th>
              <th class="text-left py-2 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">items</code>
              </td>
              <td class="py-2 pr-4">DropdownItem[]</td>
              <td class="py-2 pr-4">required</td>
              <td class="py-2">Menu items array</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">variant</code>
              </td>
              <td class="py-2 pr-4">DropdownVariant</td>
              <td class="py-2 pr-4">'primary'</td>
              <td class="py-2">Trigger button style</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">size</code>
              </td>
              <td class="py-2 pr-4">'sm' | 'md' | 'lg'</td>
              <td class="py-2 pr-4">'md'</td>
              <td class="py-2">Trigger button size</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">align</code>
              </td>
              <td class="py-2 pr-4">'left' | 'right'</td>
              <td class="py-2 pr-4">'left'</td>
              <td class="py-2">Menu alignment</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">icon</code>
              </td>
              <td class="py-2 pr-4">Component</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Icon before label</td>
            </tr>
            <tr>
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">disabled</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Disable trigger</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">DropdownItem Interface</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>interface DropdownItem {
  label: string        // Display text
  value?: string       // Value emitted on select
  icon?: Component     // Optional icon
  disabled?: boolean   // Disable item
  danger?: boolean     // Red text styling
  divider?: boolean    // Render as separator line
}</code></pre>
    </BaseCard>
  </div>
</template>
