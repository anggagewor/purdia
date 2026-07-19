<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseTable, BaseSelect, BaseBadge } from '@purdia/ui'
import type { TableColumn } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const selectedAccount = ref<string | number>('1-1100')

const accountOptions: SelectOption[] = [
  { label: '1-1000 Cash & Bank', value: '1-1000' },
  { label: '1-1100 Bank BCA', value: '1-1100' },
  { label: '1-1200 Petty Cash', value: '1-1200' },
  { label: '1-2000 Accounts Receivable', value: '1-2000' },
  { label: '2-1000 Accounts Payable', value: '2-1000' },
  { label: '4-1000 Sales Revenue', value: '4-1000' },
  { label: '5-2000 Salary Expense', value: '5-2000' },
  { label: '5-2100 Rent Expense', value: '5-2100' },
]

const columns: TableColumn[] = [
  { key: 'date', label: 'Date', sortable: true },
  { key: 'ref', label: 'Ref #' },
  { key: 'description', label: 'Description' },
  { key: 'debit', label: 'Debit', align: 'right' },
  { key: 'credit', label: 'Credit', align: 'right' },
  { key: 'balance', label: 'Balance', align: 'right' },
]

const ledgerData = ref([
  {
    date: '2025-07-01',
    ref: 'OB',
    description: 'Opening Balance',
    debit: 210000000,
    credit: 0,
    balance: 210000000,
  },
  {
    date: '2025-07-03',
    ref: 'JV-0141',
    description: 'PPh 21 tax payment',
    debit: 0,
    credit: 8500000,
    balance: 201500000,
  },
  {
    date: '2025-07-05',
    ref: 'JV-0142',
    description: 'Client payment - CV Solusi',
    debit: 18000000,
    credit: 0,
    balance: 219500000,
  },
  {
    date: '2025-07-08',
    ref: 'JV-0144',
    description: 'Utilities payment transfer',
    debit: 0,
    credit: 3500000,
    balance: 216000000,
  },
  {
    date: '2025-07-09',
    ref: 'JV-0145',
    description: 'Revenue deposit PT Maju',
    debit: 32000000,
    credit: 0,
    balance: 248000000,
  },
  {
    date: '2025-07-10',
    ref: 'JV-0146',
    description: 'Office rent payment Q3',
    debit: 0,
    credit: 15000000,
    balance: 233000000,
  },
  {
    date: '2025-07-11',
    ref: 'JV-0147',
    description: 'Salary payment July',
    debit: 0,
    credit: 45000000,
    balance: 188000000,
  },
])

function formatRp(n: number) {
  if (n === 0) return '-'
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">General Ledger</h1>
      <p class="text-gray-500 mt-1">Buku besar — view transactions per account.</p>
    </div>

    <BaseCard flush>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h4 class="font-semibold">Account Transactions</h4>
          <div class="w-64">
            <BaseSelect
              v-model="selectedAccount"
              :options="accountOptions"
              size="sm"
              placeholder="Select account..."
            />
          </div>
        </div>
      </template>
      <BaseTable :columns="columns" :data="ledgerData">
        <template #cell-ref="{ value }">
          <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">{{ value }}</code>
        </template>
        <template #cell-debit="{ value }">
          <span
            class="font-mono text-sm"
            :class="(value as number) > 0 ? 'text-emerald-600' : 'text-gray-400'"
            >{{ formatRp(value as number) }}</span
          >
        </template>
        <template #cell-credit="{ value }">
          <span
            class="font-mono text-sm"
            :class="(value as number) > 0 ? 'text-red-600' : 'text-gray-400'"
            >{{ formatRp(value as number) }}</span
          >
        </template>
        <template #cell-balance="{ value }">
          <span class="font-mono text-sm font-semibold">{{ formatRp(value as number) }}</span>
        </template>
      </BaseTable>
    </BaseCard>
  </div>
</template>
