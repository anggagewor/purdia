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
  { key: 'daysLeft', label: 'Days Left', align: 'center' },
  { key: 'actions', label: '', width: '120px', align: 'right' },
]

const invoices = ref([
  {
    id: 2,
    number: 'INV-2025-002',
    client: 'CV Berkah Sentosa',
    dueDate: '2025-08-02',
    amount: 8500000,
    daysLeft: 22,
  },
  {
    id: 4,
    number: 'INV-2025-004',
    client: 'PT Global Teknik',
    dueDate: '2025-08-04',
    amount: 22000000,
    daysLeft: 24,
  },
  {
    id: 9,
    number: 'INV-2025-009',
    client: 'PT Indah Permata',
    dueDate: '2025-07-25',
    amount: 5600000,
    daysLeft: 14,
  },
  {
    id: 10,
    number: 'INV-2025-010',
    client: 'CV Makmur Jaya',
    dueDate: '2025-07-20',
    amount: 9200000,
    daysLeft: 9,
  },
])

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-bold">Unpaid Invoices</h1>
      <p class="text-sm text-gray-500 mt-1">Invoices that haven't been paid yet</p>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="invoices"
        searchable
        search-placeholder="Search unpaid invoices..."
      >
        <template #cell-number="{ value }">
          <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono font-semibold">{{
            value
          }}</code>
        </template>
        <template #cell-amount="{ value }">
          <span class="font-semibold">{{ formatRp(value as number) }}</span>
        </template>
        <template #cell-daysLeft="{ value }">
          <BaseBadge
            :variant="
              (value as number) <= 7 ? 'danger' : (value as number) <= 14 ? 'warning' : 'info'
            "
            size="sm"
          >
            {{ value }} days
          </BaseBadge>
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
            <BaseButton variant="outline" size="sm">
              <Send class="w-3.5 h-3.5" /> Remind
            </BaseButton>
          </div>
        </template>
      </BaseTable>
    </BaseCard>
  </div>
</template>
