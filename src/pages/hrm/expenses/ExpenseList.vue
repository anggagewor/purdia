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
import { Plus, MoreHorizontal, Edit, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'expenseId', label: 'Expense ID', sortable: true },
  { key: 'employee', label: 'Employee' },
  { key: 'category', label: 'Category' },
  { key: 'amount', label: 'Amount (IDR)', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const expenses = ref([
  {
    id: 1,
    expenseId: 'EXP-001',
    employee: 'Andi Pratama',
    category: 'transport',
    amount: 'Rp 350.000',
    date: '2026-07-10',
    status: 'approved',
  },
  {
    id: 2,
    expenseId: 'EXP-002',
    employee: 'Dewi Lestari',
    category: 'meals',
    amount: 'Rp 125.000',
    date: '2026-07-11',
    status: 'reimbursed',
  },
  {
    id: 3,
    expenseId: 'EXP-003',
    employee: 'Rudi Hermawan',
    category: 'accommodation',
    amount: 'Rp 1.200.000',
    date: '2026-07-08',
    status: 'pending',
  },
  {
    id: 4,
    expenseId: 'EXP-004',
    employee: 'Maya Sari',
    category: 'supplies',
    amount: 'Rp 450.000',
    date: '2026-07-09',
    status: 'approved',
  },
  {
    id: 5,
    expenseId: 'EXP-005',
    employee: 'Bambang Widodo',
    category: 'transport',
    amount: 'Rp 275.000',
    date: '2026-07-12',
    status: 'rejected',
  },
  {
    id: 6,
    expenseId: 'EXP-006',
    employee: 'Siska Amelia',
    category: 'meals',
    amount: 'Rp 85.000',
    date: '2026-07-12',
    status: 'pending',
  },
  {
    id: 7,
    expenseId: 'EXP-007',
    employee: 'Hendra Gunawan',
    category: 'other',
    amount: 'Rp 750.000',
    date: '2026-07-07',
    status: 'reimbursed',
  },
  {
    id: 8,
    expenseId: 'EXP-008',
    employee: 'Linda Susanti',
    category: 'accommodation',
    amount: 'Rp 980.000',
    date: '2026-07-06',
    status: 'approved',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/hrm/expenses/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function categoryVariant(category: string) {
  const map: Record<string, string> = {
    transport: 'info',
    meals: 'warning',
    accommodation: 'primary',
    supplies: 'secondary',
    other: 'secondary',
  }
  return (map[category] || 'secondary') as 'info' | 'warning' | 'primary' | 'secondary'
}

function statusVariant(status: string) {
  const map: Record<string, string> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
    reimbursed: 'info',
  }
  return (map[status] || 'secondary') as 'warning' | 'success' | 'danger' | 'info'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Expenses</h1>
        <p class="text-gray-500 mt-1">Track and manage employee expense claims.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/expenses/create')"
        >Add Expense</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="expenses"
        :searchable="true"
        search-placeholder="Search expenses..."
      >
        <template #cell-category="{ value }">
          <BaseBadge :variant="categoryVariant(value as string)" size="sm">{{ value }}</BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="statusVariant(value as string)" size="sm" :dot="true">{{
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

    <BaseModal v-model="showDeleteModal" title="Delete Expense" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete this expense claim?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
