<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseTable, BaseBadge, BaseButton, BasePagination } from '@purdia/ui'
import { DropdownButton } from '@purdia/ui'
import { Plus, Eye, Pencil, Trash2, FileText } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()

const columns: TableColumn[] = [
  { key: 'number', label: 'Invoice #', sortable: true },
  { key: 'client', label: 'Client', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'dueDate', label: 'Due Date', sortable: true },
  { key: 'amount', label: 'Amount', align: 'right', sortable: true },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '', width: '80px', align: 'center' },
]

const invoices = ref([
  {
    id: 1,
    number: 'INV-2025-001',
    client: 'PT Maju Jaya',
    date: '2025-07-01',
    dueDate: '2025-07-31',
    amount: 15000000,
    status: 'paid',
  },
  {
    id: 2,
    number: 'INV-2025-002',
    client: 'CV Berkah Sentosa',
    date: '2025-07-03',
    dueDate: '2025-08-02',
    amount: 8500000,
    status: 'unpaid',
  },
  {
    id: 3,
    number: 'INV-2025-003',
    client: 'Toko Sinar Harapan',
    date: '2025-06-15',
    dueDate: '2025-07-15',
    amount: 3200000,
    status: 'overdue',
  },
  {
    id: 4,
    number: 'INV-2025-004',
    client: 'PT Global Teknik',
    date: '2025-07-05',
    dueDate: '2025-08-04',
    amount: 22000000,
    status: 'unpaid',
  },
  {
    id: 5,
    number: 'INV-2025-005',
    client: 'UD Sejahtera',
    date: '2025-06-20',
    dueDate: '2025-07-20',
    amount: 6750000,
    status: 'paid',
  },
  {
    id: 6,
    number: 'INV-2025-006',
    client: 'PT Karya Mandiri',
    date: '2025-06-10',
    dueDate: '2025-07-10',
    amount: 12300000,
    status: 'overdue',
  },
  {
    id: 7,
    number: 'INV-2025-007',
    client: 'CV Lestari Abadi',
    date: '2025-07-08',
    dueDate: '2025-08-07',
    amount: 4500000,
    status: 'draft',
  },
  {
    id: 8,
    number: 'INV-2025-008',
    client: 'PT Nusantara Digital',
    date: '2025-07-10',
    dueDate: '2025-08-09',
    amount: 18900000,
    status: 'sent',
  },
])

const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'secondary' | 'info'> = {
  paid: 'success',
  unpaid: 'warning',
  overdue: 'danger',
  draft: 'secondary',
  sent: 'info',
}

const statusLabel: Record<string, string> = {
  paid: 'Paid',
  unpaid: 'Unpaid',
  overdue: 'Overdue',
  draft: 'Draft',
  sent: 'Sent',
}

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

const actionItems: DropdownItem[] = [
  { label: 'View', value: 'view', icon: Eye },
  { label: 'Edit', value: 'edit', icon: Pencil },
  { divider: true, label: '' },
  { label: 'Delete', value: 'delete', icon: Trash2, danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  if (item.value === 'view')
    router.push({ name: 'invoice-detail', params: { id: row.id as number } })
  if (item.value === 'edit') router.push({ name: 'invoice-edit', params: { id: row.id as number } })
}

const totalAmount = computed(() => invoices.value.reduce((sum, inv) => sum + inv.amount, 0))
const unpaidCount = computed(
  () => invoices.value.filter((i) => i.status === 'unpaid' || i.status === 'overdue').length,
)
const currentPage = ref(1)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold">Invoices</h1>
        <p class="text-sm text-gray-500 mt-1">Manage all your invoices</p>
      </div>
      <BaseButton :icon="Plus" @click="router.push({ name: 'invoice-create' })">
        New Invoice
      </BaseButton>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <BaseCard>
        <p class="text-sm text-gray-500">Total Invoices</p>
        <p class="text-2xl font-bold mt-1">{{ invoices.length }}</p>
      </BaseCard>
      <BaseCard>
        <p class="text-sm text-gray-500">Total Amount</p>
        <p class="text-2xl font-bold mt-1">{{ formatRp(totalAmount) }}</p>
      </BaseCard>
      <BaseCard>
        <p class="text-sm text-gray-500">Unpaid / Overdue</p>
        <p class="text-2xl font-bold mt-1 text-amber-600">{{ unpaidCount }}</p>
      </BaseCard>
      <BaseCard>
        <p class="text-sm text-gray-500">Paid</p>
        <p class="text-2xl font-bold mt-1 text-emerald-600">
          {{ invoices.filter((i) => i.status === 'paid').length }}
        </p>
      </BaseCard>
    </div>

    <!-- Table -->
    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="invoices"
        searchable
        search-placeholder="Search invoices..."
      >
        <template #cell-number="{ value }">
          <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono font-semibold">{{
            value
          }}</code>
        </template>
        <template #cell-amount="{ value }">
          <span class="font-semibold">{{ formatRp(value as number) }}</span>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="statusVariant[value as string]" size="sm">
            {{ statusLabel[value as string] }}
          </BaseBadge>
        </template>
        <template #cell-actions="{ row }">
          <DropdownButton
            :items="actionItems"
            variant="ghost"
            size="sm"
            align="right"
            @select="(item) => handleAction(item, row)"
          >
            <template #trigger>
              <span class="sr-only">Actions</span>
            </template>
          </DropdownButton>
        </template>
      </BaseTable>
      <div class="px-4 py-3 border-t border-gray-200">
        <BasePagination
          v-model:current-page="currentPage"
          :total-pages="5"
          :total-items="48"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>
  </div>
</template>
