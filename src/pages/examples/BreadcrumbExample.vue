<script setup lang="ts">
import { BaseCard, BaseBreadcrumb } from '@purdia/ui'
import type { BreadcrumbItem } from '@purdia/ui'
import { Home, Settings, Users, FileText, FolderOpen, ShoppingCart } from '@lucide/vue'

const basicItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Electronics', to: '/products/electronics' },
  { label: 'Smartphones' },
]

const withIconItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Settings', to: '/settings', icon: Settings },
  { label: 'Users', to: '/settings/users', icon: Users },
  { label: 'John Doe' },
]

const shortItems: BreadcrumbItem[] = [{ label: 'Home', to: '/' }, { label: 'Dashboard' }]

const deepItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Documents', to: '/documents', icon: FolderOpen },
  { label: 'Projects', to: '/documents/projects' },
  { label: '2024', to: '/documents/projects/2024' },
  { label: 'Q4 Reports', to: '/documents/projects/2024/q4' },
  { label: 'Final Report' },
]

const ecommerceItems: BreadcrumbItem[] = [
  { label: 'Shop', to: '/shop', icon: ShoppingCart },
  { label: 'Electronics', to: '/shop/electronics' },
  { label: 'Phones', to: '/shop/electronics/phones' },
  { label: 'iPhone 15 Pro' },
]

const invoiceItems: BreadcrumbItem[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Invoices', to: '/invoices', icon: FileText },
  { label: 'INV-2024-001' },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Breadcrumb</h1>
      <p class="text-gray-500 mt-1">
        Navigasi breadcrumb untuk menunjukkan posisi user di dalam hierarki halaman.
      </p>
    </div>

    <!-- Basic -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Basic</h4></template>
      <BaseBreadcrumb :items="basicItems" />
    </BaseCard>

    <!-- With Icons -->
    <BaseCard>
      <template #header><h4 class="font-semibold">With Icons</h4></template>
      <BaseBreadcrumb :items="withIconItems" />
    </BaseCard>

    <!-- Separators -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Separators</h4></template>
      <div class="space-y-4">
        <div>
          <p class="text-xs text-gray-500 mb-2">Chevron (default)</p>
          <BaseBreadcrumb :items="basicItems" separator="chevron" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Slash</p>
          <BaseBreadcrumb :items="basicItems" separator="slash" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Dot</p>
          <BaseBreadcrumb :items="basicItems" separator="dot" />
        </div>
      </div>
    </BaseCard>

    <!-- Sizes -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="space-y-4">
        <div>
          <p class="text-xs text-gray-500 mb-2">Small</p>
          <BaseBreadcrumb :items="basicItems" size="sm" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Medium (default)</p>
          <BaseBreadcrumb :items="basicItems" size="md" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Large</p>
          <BaseBreadcrumb :items="basicItems" size="lg" />
        </div>
      </div>
    </BaseCard>

    <!-- Short Breadcrumb -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Short (2 levels)</h4></template>
      <BaseBreadcrumb :items="shortItems" />
    </BaseCard>

    <!-- Deep Nesting -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Deep Nesting</h4></template>
      <BaseBreadcrumb :items="deepItems" />
    </BaseCard>

    <!-- Real-world Examples -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Real-world Examples</h4></template>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-gray-500 mb-2">E-commerce</p>
          <BaseBreadcrumb :items="ecommerceItems" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Invoice Detail</p>
          <BaseBreadcrumb :items="invoiceItems" />
        </div>
      </div>
    </BaseCard>

    <!-- Combined Variants -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Combined: Icons + Slash + Large</h4></template>
      <BaseBreadcrumb :items="withIconItems" separator="slash" size="lg" />
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import BaseBreadcrumb from '@purdia/ui'
import type { BreadcrumbItem } from '@purdia/ui'
import { Home, FileText } from '@lucide/vue'

const items: BreadcrumbItem[] = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Invoices', to: '/invoices', icon: FileText },
  { label: 'INV-2024-001' },
]
&lt;/script&gt;

&lt;template&gt;
  &lt;BaseBreadcrumb
    :items="items"
    separator="chevron"
    size="md"
  /&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>

    <!-- Props Table -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Props</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-semibold">Prop</th>
              <th class="text-left py-2 pr-4 font-semibold">Type</th>
              <th class="text-left py-2 pr-4 font-semibold">Default</th>
              <th class="text-left py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody class="font-mono">
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">items</td>
              <td class="py-2 pr-4 text-gray-600">BreadcrumbItem[]</td>
              <td class="py-2 pr-4 text-gray-500">—</td>
              <td class="py-2 text-gray-600 font-sans">
                Array of breadcrumb items (label, to, icon)
              </td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4 text-primary-600">separator</td>
              <td class="py-2 pr-4 text-gray-600">'chevron' | 'slash' | 'dot'</td>
              <td class="py-2 pr-4 text-gray-500">'chevron'</td>
              <td class="py-2 text-gray-600 font-sans">Separator style between items</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 text-primary-600">size</td>
              <td class="py-2 pr-4 text-gray-600">'sm' | 'md' | 'lg'</td>
              <td class="py-2 pr-4 text-gray-500">'md'</td>
              <td class="py-2 text-gray-600 font-sans">Size of the breadcrumb text and icons</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
