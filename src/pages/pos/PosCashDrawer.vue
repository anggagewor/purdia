<script setup lang="ts">
import { ref } from 'vue'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseBadge,
  BaseModal,
  BaseInput,
  BaseSelect,
} from '@purdia/ui'
import { Plus, Minus, DollarSign, ArrowDownLeft, ArrowUpRight } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const showAddModal = ref(false)
const transactionType = ref<string | number>('in')

const typeOptions: SelectOption[] = [
  { label: 'Cash In', value: 'in' },
  { label: 'Cash Out', value: 'out' },
]

const formAmount = ref<number>(0)
const formNote = ref('')

const currentBalance = ref(5750000)
const openingBalance = ref(2000000)

const columns: TableColumn[] = [
  { key: 'time', label: 'Time' },
  { key: 'type', label: 'Type' },
  { key: 'description', label: 'Description' },
  { key: 'amount', label: 'Amount', align: 'right' },
  { key: 'balance', label: 'Balance', align: 'right' },
]

const transactions = ref([
  {
    time: '17:15',
    type: 'in',
    description: 'Sale #127 - Cash payment',
    amount: 85000,
    balance: 5750000,
  },
  {
    time: '16:48',
    type: 'out',
    description: 'Supplier payment - Coffee beans',
    amount: -350000,
    balance: 5665000,
  },
  {
    time: '16:30',
    type: 'in',
    description: 'Sale #126 - Cash payment',
    amount: 150000,
    balance: 6015000,
  },
  {
    time: '15:55',
    type: 'in',
    description: 'Sale #125 - Cash payment',
    amount: 45000,
    balance: 5865000,
  },
  {
    time: '15:20',
    type: 'out',
    description: 'Petty cash - Office supplies',
    amount: -75000,
    balance: 5820000,
  },
  {
    time: '14:45',
    type: 'in',
    description: 'Sale #124 - Cash payment',
    amount: 220000,
    balance: 5895000,
  },
  {
    time: '14:10',
    type: 'in',
    description: 'Sale #123 - Cash payment',
    amount: 55000,
    balance: 5675000,
  },
  {
    time: '13:30',
    type: 'out',
    description: 'Change for customer',
    amount: -50000,
    balance: 5620000,
  },
  {
    time: '12:00',
    type: 'in',
    description: 'Sale #120 - Cash payment',
    amount: 320000,
    balance: 5670000,
  },
  { time: '09:00', type: 'in', description: 'Opening balance', amount: 2000000, balance: 2000000 },
])

function formatRp(n: number) {
  return 'Rp ' + Math.abs(n).toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Cash Drawer</h1>
        <p class="text-gray-500 mt-1">Monitor cash in/out and current drawer balance.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="showAddModal = true">Add Transaction</BaseButton>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <BaseCard>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            <DollarSign class="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <p class="text-xs text-gray-500">Current Balance</p>
            <p class="text-lg font-bold text-gray-900">{{ formatRp(currentBalance) }}</p>
          </div>
        </div>
      </BaseCard>
      <BaseCard>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <ArrowDownLeft class="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <p class="text-xs text-gray-500">Total Cash In</p>
            <p class="text-lg font-bold text-emerald-600">{{ formatRp(4875000) }}</p>
          </div>
        </div>
      </BaseCard>
      <BaseCard>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <ArrowUpRight class="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p class="text-xs text-gray-500">Total Cash Out</p>
            <p class="text-lg font-bold text-red-600">{{ formatRp(475000) }}</p>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Transactions -->
    <BaseCard flush>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h4 class="font-semibold">Transactions Today</h4>
          <span class="text-xs text-gray-500">Opening: {{ formatRp(openingBalance) }}</span>
        </div>
      </template>
      <BaseTable :columns="columns" :data="transactions">
        <template #cell-type="{ value }">
          <BaseBadge :variant="value === 'in' ? 'success' : 'danger'" size="sm">
            {{ value === 'in' ? 'IN' : 'OUT' }}
          </BaseBadge>
        </template>
        <template #cell-amount="{ value }">
          <span
            class="font-mono text-sm"
            :class="(value as number) >= 0 ? 'text-emerald-600' : 'text-red-600'"
          >
            {{ (value as number) >= 0 ? '+' : '-' }}{{ formatRp(value as number) }}
          </span>
        </template>
        <template #cell-balance="{ value }">
          <span class="font-mono text-sm font-medium">{{ formatRp(value as number) }}</span>
        </template>
      </BaseTable>
    </BaseCard>

    <!-- Add Transaction Modal -->
    <BaseModal v-model="showAddModal" title="Add Cash Transaction" size="sm">
      <div class="space-y-4">
        <BaseSelect
          v-model="transactionType"
          label="Type"
          :options="typeOptions"
          :searchable="false"
        />
        <BaseInput v-model.number="formAmount" label="Amount (Rp)" type="number" placeholder="0" />
        <BaseInput v-model="formNote" label="Note / Description" placeholder="Reason..." />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showAddModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showAddModal = false">Add</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
