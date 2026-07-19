<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseTable, BaseBadge, BaseButton } from '@purdia/ui'
import { Eye, Send, AlertTriangle } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'

const router = useRouter()

const columns: TableColumn[] = [
  { key: 'number', label: 'Invoice #', sortable: true },
  { key: 'client', label: 'Client', sortable: true },
  { key: 'dueDate', label: 'Due Date', sortable: true },
  { key: 'amount', label: 'Amount', align: 'right', sortable: true },
  { key: 'overdueDays', label: 'Overdue', align: 'center' },
  { key: 'actions', label: '', width: '120px', align: 'right' },
]

const invoices = ref([
  {
    id: 3,
    number: 'INV-2025-003',
    client: 'Toko Sinar Harapan',
    dueDate: '2025-07-15',
    amount: 3200000,
    overdueDays: 5,
  },
  {
    id: 6,
    number: 'INV-2025-006',
    client: 'PT Karya Mandiri',
    dueDate: '2025-07-10',
    amount: 12300000,
    overdueDays: 10,
  },
  {
    id: 11,
    number: 'INV-2025-011',
    client: 'UD Bahagia',
    dueDate: '2025-06-28',
    amount: 7400000,
    overdueDays: 22,
  },
])

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <AlertTriangle class="w-6 h-6 text-red-500" />
      <div>
        <h1 class="text-xl font-bold">Overdue Invoices</h1>
        <p class="text-sm text-gray-500 mt-1">Invoices that are past their due date</p>
      </div>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="invoices"
        searchable
        search-placeholder="Search overdue invoices..."
      >
        <template #cell-number="{ value }">
          <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono font-semibold">{{
            value
          }}</code>
        </template>
        <template #cell-amount="{ value }">
          <span class="font-semibold">{{ formatRp(value as number) }}</span>
        </template>
        <template #cell-overdueDays="{ value }">
          <BaseBadge variant="danger" size="sm" dot> {{ value }} days overdue </BaseBadge>
        </template>
        <template #cell-actions="{ row }">
          <div class="flex items-center gap-1 justify-end">
            <BaseButton
              variant="ghost"
              size="sm"
              @click="router.push({ name: 'invoice-detail', params: { id: String(row.id) } })"
            >
              <Eye class="w-4 h-4" />
            </BaseButton>
            <BaseButton variant="danger" size="sm"> <Send class="w-3.5 h-3.5" /> Send </BaseButton>
          </div>
        </template>
      </BaseTable>
    </BaseCard>
  </div>
</template>
