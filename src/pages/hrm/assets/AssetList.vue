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
import { Plus, MoreHorizontal, Eye, Edit, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'
import type { BadgeVariant } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'assetId', label: 'Asset ID' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'category', label: 'Category' },
  { key: 'assignedTo', label: 'Assigned To' },
  { key: 'purchaseDate', label: 'Purchase Date' },
  { key: 'condition', label: 'Condition', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const assets = ref([
  {
    id: 1,
    assetId: 'AST-001',
    name: 'MacBook Pro 14"',
    category: 'laptop',
    assignedTo: 'Andi Pratama',
    purchaseDate: '2024-03-15',
    condition: 'good',
    status: 'in-use',
  },
  {
    id: 2,
    assetId: 'AST-002',
    name: 'Dell UltraSharp 27"',
    category: 'monitor',
    assignedTo: 'Maya Sari',
    purchaseDate: '2024-05-20',
    condition: 'good',
    status: 'in-use',
  },
  {
    id: 3,
    assetId: 'AST-003',
    name: 'iPhone 15 Pro',
    category: 'phone',
    assignedTo: 'Dewi Lestari',
    purchaseDate: '2024-09-10',
    condition: 'good',
    status: 'in-use',
  },
  {
    id: 4,
    assetId: 'AST-004',
    name: 'Standing Desk Pro',
    category: 'desk',
    assignedTo: '-',
    purchaseDate: '2023-11-08',
    condition: 'fair',
    status: 'available',
  },
  {
    id: 5,
    assetId: 'AST-005',
    name: 'Ergonomic Chair X1',
    category: 'chair',
    assignedTo: 'Rudi Hermawan',
    purchaseDate: '2024-01-22',
    condition: 'good',
    status: 'in-use',
  },
  {
    id: 6,
    assetId: 'AST-006',
    name: 'ThinkPad X1 Carbon',
    category: 'laptop',
    assignedTo: '-',
    purchaseDate: '2023-06-15',
    condition: 'damaged',
    status: 'maintenance',
  },
  {
    id: 7,
    assetId: 'AST-007',
    name: 'Samsung Galaxy S24',
    category: 'phone',
    assignedTo: 'Linda Susanti',
    purchaseDate: '2024-07-01',
    condition: 'good',
    status: 'in-use',
  },
  {
    id: 8,
    assetId: 'AST-008',
    name: 'LG 32" 4K Monitor',
    category: 'monitor',
    assignedTo: '-',
    purchaseDate: '2024-02-10',
    condition: 'fair',
    status: 'available',
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
  if (item.value === 'view') router.push(`/hrm/assets/${row.id}`)
  if (item.value === 'edit') router.push(`/hrm/assets/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function getConditionVariant(condition: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    good: 'success',
    fair: 'warning',
    damaged: 'danger',
  }
  return map[condition] || 'secondary'
}

function getStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    'in-use': 'primary',
    available: 'success',
    maintenance: 'warning',
  }
  return map[status] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Assets</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Manage company assets and equipment.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/assets/create')"
        >Add Asset</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="assets"
        :searchable="true"
        search-placeholder="Search assets..."
      >
        <template #cell-assetId="{ value }">
          <span class="text-sm font-mono text-gray-600 dark:text-gray-300">{{ value }}</span>
        </template>
        <template #cell-category="{ value }">
          <BaseBadge variant="secondary" size="sm" :pill="false">{{ value }}</BaseBadge>
        </template>
        <template #cell-condition="{ value }">
          <BaseBadge :variant="getConditionVariant(value as string)" size="sm">{{
            value
          }}</BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" size="sm" :dot="true">{{
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
          :total-items="24"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Asset" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete <strong>{{ selected.name }}</strong> ({{
          selected.assetId
        }})? This action cannot be undone.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
