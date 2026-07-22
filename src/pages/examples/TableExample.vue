<script setup lang="ts">
import {
  BaseTable,
  BaseCard,
  BaseBadge,
  BaseAvatar,
  BaseButton,
  DropdownButton,
} from '@purdia/ui'
import {
  Plus,
  Download,
  Filter,
  Trash2,
  Edit,
  Eye,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
} from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

// --- Basic table ---
const basicColumns: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'joined', label: 'Joined', align: 'right' },
]

const basicData = [
  {
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Admin',
    status: 'active',
    joined: 'Jan 2024',
  },
  {
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'Editor',
    status: 'active',
    joined: 'Mar 2024',
  },
  {
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Viewer',
    status: 'inactive',
    joined: 'Jun 2024',
  },
  {
    name: 'Alex Turner',
    email: 'alex@example.com',
    role: 'Editor',
    status: 'active',
    joined: 'Aug 2024',
  },
  {
    name: 'Lisa Wang',
    email: 'lisa@example.com',
    role: 'Admin',
    status: 'active',
    joined: 'Oct 2024',
  },
]

// --- Sortable table ---
const sortColumns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'amount', label: 'Amount', align: 'right', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
]

const sortData = [
  {
    name: 'Alice Brown',
    email: 'alice@mail.com',
    amount: 1250,
    date: '2024-12-01',
    status: 'paid',
  },
  { name: 'Bob Smith', email: 'bob@mail.com', amount: 890, date: '2024-11-15', status: 'pending' },
  {
    name: 'Charlie Davis',
    email: 'charlie@mail.com',
    amount: 3400,
    date: '2025-01-05',
    status: 'paid',
  },
  {
    name: 'Diana Ross',
    email: 'diana@mail.com',
    amount: 560,
    date: '2024-10-20',
    status: 'overdue',
  },
  {
    name: 'Edward Kim',
    email: 'edward@mail.com',
    amount: 2100,
    date: '2025-02-10',
    status: 'paid',
  },
  {
    name: 'Fiona Green',
    email: 'fiona@mail.com',
    amount: 1780,
    date: '2024-09-03',
    status: 'pending',
  },
]

// --- Expandable table ---
const expandColumns: TableColumn[] = [
  { key: 'name', label: 'Customer' },
  { key: 'order', label: 'Order ID' },
  { key: 'total', label: 'Total', align: 'right' },
  { key: 'status', label: 'Status', align: 'center' },
]

const expandData = [
  {
    name: 'Sarah Johnson',
    order: '#ORD-001',
    total: '$2,499',
    status: 'delivered',
    email: 'sarah@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, New York, NY',
    items: 'MacBook Pro, USB-C Charger',
  },
  {
    name: 'Mike Chen',
    order: '#ORD-002',
    total: '$1,199',
    status: 'shipped',
    email: 'mike@example.com',
    phone: '+1 345 678 901',
    address: '456 Oak Ave, San Francisco, CA',
    items: 'iPhone 15 Pro, Case, Screen Protector',
  },
  {
    name: 'Emily Davis',
    order: '#ORD-003',
    total: '$549',
    status: 'processing',
    email: 'emily@example.com',
    phone: '+1 456 789 012',
    address: '789 Pine Rd, Austin, TX',
    items: 'AirPods Max',
  },
  {
    name: 'Alex Turner',
    order: '#ORD-004',
    total: '$799',
    status: 'delivered',
    email: 'alex@example.com',
    phone: '+1 567 890 123',
    address: '321 Elm St, Seattle, WA',
    items: 'iPad Air, Apple Pencil',
  },
]

// --- Actions table ---
const actionColumns: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '80px' },
]

const actionData = [
  { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Admin', status: 'active' },
  { name: 'Mike Chen', email: 'mike@example.com', role: 'Editor', status: 'active' },
  { name: 'Emily Davis', email: 'emily@example.com', role: 'Viewer', status: 'inactive' },
  { name: 'Alex Turner', email: 'alex@example.com', role: 'Editor', status: 'active' },
]

const rowActions: DropdownItem[] = [
  { label: 'View Details', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function getStatusVariant(status: string) {
  const map: Record<string, 'success' | 'info' | 'warning' | 'danger' | 'secondary'> = {
    active: 'success',
    inactive: 'secondary',
    paid: 'success',
    pending: 'warning',
    overdue: 'danger',
    delivered: 'success',
    shipped: 'info',
    processing: 'warning',
  }
  return map[status] || 'secondary'
}

function handleRowAction(item: DropdownItem, row: Record<string, unknown>) {
  console.log('Action:', item.value, 'Row:', row)
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Table</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Data table dengan search, sorting, accordion (expandable rows), toolbar buttons, dan
        dropdown actions.
      </p>
    </div>

    <!-- Basic with Custom Cells -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Basic — Custom Cell Slots</h4></template>
      <BaseTable :columns="basicColumns" :data="basicData">
        <template #cell-name="{ value }">
          <div class="flex items-center gap-2">
            <BaseAvatar :name="value as string" size="xs" />
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-role="{ value }">
          <BaseBadge
            :variant="value === 'Admin' ? 'primary' : value === 'Editor' ? 'info' : 'secondary'"
            size="sm"
          >
            {{ value }}
          </BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" :dot="true" size="sm">
            {{ value }}
          </BaseBadge>
        </template>
      </BaseTable>
    </BaseCard>

    <!-- Searchable -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Searchable</h4></template>
      <p class="text-sm text-gray-500 mb-4">
        Cari di semua kolom. Realtime filter tanpa perlu submit.
      </p>
      <BaseTable
        :columns="basicColumns"
        :data="basicData"
        :searchable="true"
        search-placeholder="Search by name, email, role..."
      >
        <template #cell-name="{ value }">
          <div class="flex items-center gap-2">
            <BaseAvatar :name="value as string" size="xs" />
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" :dot="true" size="sm">
            {{ value }}
          </BaseBadge>
        </template>
      </BaseTable>
    </BaseCard>

    <!-- Sortable -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Sortable Columns</h4></template>
      <p class="text-sm text-gray-500 mb-4">
        Klik header kolom yang sortable untuk toggle sort asc/desc/none.
      </p>
      <BaseTable :columns="sortColumns" :data="sortData" :searchable="true">
        <template #cell-amount="{ value }">
          <span class="font-mono">${{ (value as number).toLocaleString() }}</span>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" size="sm">
            {{ value }}
          </BaseBadge>
        </template>
      </BaseTable>
    </BaseCard>

    <!-- Expandable Rows (Accordion) -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Expandable Rows (Accordion)</h4></template>
      <p class="text-sm text-gray-500 mb-4">Klik row untuk expand dan lihat detail tambahan.</p>
      <BaseTable :columns="expandColumns" :data="expandData" :expandable="true">
        <template #cell-name="{ value }">
          <div class="flex items-center gap-2">
            <BaseAvatar :name="value as string" size="xs" />
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" :dot="true" size="sm">
            {{ value }}
          </BaseBadge>
        </template>
        <template #expanded="{ row }">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-sm">
                <Mail class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600">{{ row.email }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <Phone class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600">{{ row.phone }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <MapPin class="w-4 h-4 text-gray-400" />
                <span class="text-gray-600">{{ row.address }}</span>
              </div>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Items</p>
              <p class="text-sm text-gray-700">{{ row.items }}</p>
            </div>
          </div>
        </template>
      </BaseTable>
    </BaseCard>

    <!-- With Toolbar & Row Actions -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Toolbar & Row Actions</h4></template>
      <p class="text-sm text-gray-500 mb-4">Search + toolbar buttons + dropdown per row.</p>
      <BaseTable
        :columns="actionColumns"
        :data="actionData"
        :searchable="true"
        search-placeholder="Search users..."
      >
        <template #toolbar>
          <BaseButton variant="outline" size="sm" :icon="Filter">Filter</BaseButton>
          <BaseButton variant="outline" size="sm" :icon="Download">Export</BaseButton>
          <BaseButton size="sm" :icon="Plus">Add User</BaseButton>
        </template>
        <template #cell-name="{ value }">
          <div class="flex items-center gap-2">
            <BaseAvatar :name="value as string" size="xs" />
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-role="{ value }">
          <BaseBadge
            :variant="value === 'Admin' ? 'primary' : value === 'Editor' ? 'info' : 'secondary'"
            size="sm"
          >
            {{ value }}
          </BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" :dot="true" size="sm">
            {{ value }}
          </BaseBadge>
        </template>
        <template #cell-actions="{ row }">
          <DropdownButton
            :items="rowActions"
            variant="ghost"
            size="sm"
            align="right"
            :icon="MoreHorizontal"
            @select="(item) => handleRowAction(item, row)"
          />
        </template>
      </BaseTable>
    </BaseCard>

    <!-- Variants -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="space-y-6">
        <div>
          <p class="text-xs font-medium text-gray-500 mb-2">Striped</p>
          <BaseTable
            :columns="basicColumns"
            :data="basicData.slice(0, 3)"
            variant="striped"
            :compact="true"
          />
        </div>
        <div>
          <p class="text-xs font-medium text-gray-500 mb-2">Bordered</p>
          <BaseTable
            :columns="basicColumns"
            :data="basicData.slice(0, 3)"
            variant="bordered"
            :compact="true"
          />
        </div>
        <div>
          <p class="text-xs font-medium text-gray-500 mb-2">Compact + No Hover</p>
          <BaseTable
            :columns="basicColumns"
            :data="basicData.slice(0, 3)"
            :compact="true"
            :hoverable="false"
          />
        </div>
      </div>
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;!-- Searchable + Sortable + Toolbar --&gt;
&lt;BaseTable
  :columns="columns"
  :data="data"
  :searchable="true"
  search-placeholder="Search..."
&gt;
  &lt;template #toolbar&gt;
    &lt;BaseButton size="sm" :icon="Plus"&gt;Add&lt;/BaseButton&gt;
  &lt;/template&gt;

  &lt;template #cell-actions="{ row }"&gt;
    &lt;DropdownButton :items="actions" variant="ghost" size="sm" /&gt;
  &lt;/template&gt;
&lt;/BaseTable&gt;

&lt;!-- Expandable (Accordion) --&gt;
&lt;BaseTable :columns="columns" :data="data" :expandable="true"&gt;
  &lt;template #expanded="{ row }"&gt;
    &lt;p&gt;Details for &#123;&#123; row.name &#125;&#125;&lt;/p&gt;
  &lt;/template&gt;
&lt;/BaseTable&gt;</code></pre>
    </BaseCard>

    <!-- Props -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Props</h4></template>
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
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">columns</code>
              </td>
              <td class="py-2 pr-4">TableColumn[]</td>
              <td class="py-2 pr-4">required</td>
              <td class="py-2">Column definitions</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">data</code>
              </td>
              <td class="py-2 pr-4">Record[]</td>
              <td class="py-2 pr-4">required</td>
              <td class="py-2">Row data</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">variant</code>
              </td>
              <td class="py-2 pr-4">'default' | 'striped' | 'bordered'</td>
              <td class="py-2 pr-4">'default'</td>
              <td class="py-2">Visual style</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">searchable</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Show search input</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">expandable</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Enable row accordion</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">hoverable</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">true</td>
              <td class="py-2">Hover highlight</td>
            </tr>
            <tr>
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">compact</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Smaller padding</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">TableColumn Interface</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>interface TableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean   // Enable click-to-sort on this column
}</code></pre>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Slots</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Slot</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Props</th>
              <th class="text-left py-2 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">toolbar</code>
              </td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Right side toolbar (buttons, filters)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">#cell-[key]</code>
              </td>
              <td class="py-2 pr-4">{ row, value, index }</td>
              <td class="py-2">Custom cell renderer</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">expanded</code>
              </td>
              <td class="py-2 pr-4">{ row, index }</td>
              <td class="py-2">Expanded row content (accordion)</td>
            </tr>
            <tr>
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">empty</code>
              </td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Empty state when no data/results</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
