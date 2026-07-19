<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseBadge,
  BaseModal,
  BasePagination,
  DropdownButton,
} from '@purdia/ui'
import { Plus, MoreHorizontal, Eye, Edit, Trash2, ShoppingCart } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

import type { BadgeVariant } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'poNumber', label: 'PO Number', sortable: true },
  { key: 'supplier', label: 'Supplier', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'items', label: 'Items', align: 'center' },
  { key: 'total', label: 'Total', align: 'right', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const purchases = ref([
  {
    id: 1,
    poNumber: 'PO-2026-0042',
    supplier: 'PT Tech Indo Distributor',
    date: '2026-07-12',
    items: 3,
    total: 'Rp 125.000.000',
    status: 'received',
  },
  {
    id: 2,
    poNumber: 'PO-2026-0041',
    supplier: 'CV Megah Elektronik',
    date: '2026-07-10',
    items: 5,
    total: 'Rp 85.000.000',
    status: 'received',
  },
  {
    id: 3,
    poNumber: 'PO-2026-0040',
    supplier: 'PT Samsung Indonesia',
    date: '2026-07-09',
    items: 2,
    total: 'Rp 45.000.000',
    status: 'shipped',
  },
  {
    id: 4,
    poNumber: 'PO-2026-0039',
    supplier: 'PT Logitech Asia',
    date: '2026-07-07',
    items: 4,
    total: 'Rp 32.000.000',
    status: 'confirmed',
  },
  {
    id: 5,
    poNumber: 'PO-2026-0038',
    supplier: 'PT Anker Official',
    date: '2026-07-05',
    items: 2,
    total: 'Rp 18.500.000',
    status: 'pending',
  },
  {
    id: 6,
    poNumber: 'PO-2026-0037',
    supplier: 'PT Dell Indonesia',
    date: '2026-07-03',
    items: 1,
    total: 'Rp 220.000.000',
    status: 'received',
  },
  {
    id: 7,
    poNumber: 'PO-2026-0036',
    supplier: 'CV Megah Elektronik',
    date: '2026-07-01',
    items: 6,
    total: 'Rp 55.000.000',
    status: 'cancelled',
  },
  {
    id: 8,
    poNumber: 'PO-2026-0035',
    supplier: 'PT Tech Indo Distributor',
    date: '2026-06-28',
    items: 3,
    total: 'Rp 92.000.000',
    status: 'received',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'View Detail', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'view') router.push(`/inventory/purchases/${row.id}`)
  if (item.value === 'edit') router.push(`/inventory/purchases/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function getStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    pending: 'warning',
    confirmed: 'primary',
    shipped: 'info',
    received: 'success',
    cancelled: 'danger',
  }
  return map[status] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Purchase Orders</h1>
        <p class="text-gray-500 mt-1">Manage purchase orders from suppliers.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/inventory/purchases/create')"
        >New Purchase</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="purchases"
        :searchable="true"
        search-placeholder="Search purchases..."
      >
        <template #cell-poNumber="{ row, value }">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg bg-violet-50 text-violet-500 flex items-center justify-center shrink-0"
            >
              <ShoppingCart class="w-4 h-4" />
            </div>
            <span class="font-mono text-sm font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-total="{ value }">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ value }}</span>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" size="sm" :pill="false">{{
            value
          }}</BaseBadge>
        </template>
        <template #cell-actions="{ row }">
          <DropdownButton
            :items="rowActions"
            variant="ghost"
            size="sm"
            align="right"
            :icon="MoreHorizontal"
            @select="(item) => handleAction(item, row)"
          />
        </template>
      </BaseTable>
      <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <BasePagination
          v-model:current-page="currentPage"
          :total-pages="3"
          :total-items="28"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Purchase Order" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{{ selected.poNumber }}</strong
        >?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
