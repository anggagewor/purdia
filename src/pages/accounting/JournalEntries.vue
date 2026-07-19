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
  DropdownButton,
} from '@purdia/ui'
import { Plus, MoreHorizontal, Eye, Edit, Trash2, Check } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const showCreateModal = ref(false)
const showDetailModal = ref(false)
const selectedEntry = ref<Record<string, unknown>>({})

const columns: TableColumn[] = [
  { key: 'ref', label: 'Ref #', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'description', label: 'Description' },
  { key: 'debit', label: 'Debit', align: 'right' },
  { key: 'credit', label: 'Credit', align: 'right' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const entries = ref([
  {
    id: 1,
    ref: 'JV-0147',
    date: '2025-07-11',
    description: 'Monthly salary payment - July',
    debit: 45000000,
    credit: 45000000,
    status: 'posted',
    createdBy: 'Angga',
    lines: [
      { account: '5-2000 Salary Expense', debit: 45000000, credit: 0 },
      { account: '1-1100 Bank BCA', debit: 0, credit: 45000000 },
    ],
  },
  {
    id: 2,
    ref: 'JV-0146',
    date: '2025-07-10',
    description: 'Office rent payment Q3 2025',
    debit: 15000000,
    credit: 15000000,
    status: 'posted',
    createdBy: 'Angga',
    lines: [
      { account: '5-2100 Rent Expense', debit: 15000000, credit: 0 },
      { account: '1-1100 Bank BCA', debit: 0, credit: 15000000 },
    ],
  },
  {
    id: 3,
    ref: 'JV-0145',
    date: '2025-07-09',
    description: 'Revenue from PT Teknologi Maju',
    debit: 32000000,
    credit: 32000000,
    status: 'posted',
    createdBy: 'Lisa',
    lines: [
      { account: '1-2000 Accounts Receivable', debit: 32000000, credit: 0 },
      { account: '4-1000 Sales Revenue', debit: 0, credit: 32000000 },
    ],
  },
  {
    id: 4,
    ref: 'JV-0144',
    date: '2025-07-08',
    description: 'Electricity & water bill',
    debit: 3500000,
    credit: 3500000,
    status: 'posted',
    createdBy: 'Angga',
    lines: [
      { account: '5-2200 Utilities Expense', debit: 3500000, credit: 0 },
      { account: '1-1200 Petty Cash', debit: 0, credit: 3500000 },
    ],
  },
  {
    id: 5,
    ref: 'JV-0143',
    date: '2025-07-07',
    description: 'Office supplies purchase',
    debit: 2800000,
    credit: 2800000,
    status: 'draft',
    createdBy: 'Lisa',
    lines: [
      { account: '5-2200 Utilities Expense', debit: 2800000, credit: 0 },
      { account: '1-1200 Petty Cash', debit: 0, credit: 2800000 },
    ],
  },
  {
    id: 6,
    ref: 'JV-0142',
    date: '2025-07-05',
    description: 'Client payment received - CV Solusi',
    debit: 18000000,
    credit: 18000000,
    status: 'posted',
    createdBy: 'Angga',
    lines: [
      { account: '1-1100 Bank BCA', debit: 18000000, credit: 0 },
      { account: '1-2000 Accounts Receivable', debit: 0, credit: 18000000 },
    ],
  },
  {
    id: 7,
    ref: 'JV-0141',
    date: '2025-07-03',
    description: 'PPh 21 tax payment',
    debit: 8500000,
    credit: 8500000,
    status: 'posted',
    createdBy: 'Angga',
    lines: [
      { account: '2-1100 Tax Payable', debit: 8500000, credit: 0 },
      { account: '1-1100 Bank BCA', debit: 0, credit: 8500000 },
    ],
  },
])

// Create form
interface JournalLine {
  account: string
  debit: number
  credit: number
}
const formDate = ref('')
const formDesc = ref('')
const formLines = ref<JournalLine[]>([
  { account: '', debit: 0, credit: 0 },
  { account: '', debit: 0, credit: 0 },
])

const accountOptions: SelectOption[] = [
  { label: '1-1000 Cash & Bank', value: '1-1000' },
  { label: '1-1100 Bank BCA', value: '1-1100' },
  { label: '1-1200 Petty Cash', value: '1-1200' },
  { label: '1-2000 Accounts Receivable', value: '1-2000' },
  { label: '2-1000 Accounts Payable', value: '2-1000' },
  { label: '2-1100 Tax Payable', value: '2-1100' },
  { label: '4-1000 Sales Revenue', value: '4-1000' },
  { label: '5-1000 COGS', value: '5-1000' },
  { label: '5-2000 Salary Expense', value: '5-2000' },
  { label: '5-2100 Rent Expense', value: '5-2100' },
  { label: '5-2200 Utilities Expense', value: '5-2200' },
]

const rowActions: DropdownItem[] = [
  { label: 'View Detail', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  if (item.value === 'view') {
    selectedEntry.value = row
    showDetailModal.value = true
  }
}

function addLine() {
  formLines.value.push({ account: '', debit: 0, credit: 0 })
}
function removeLine(idx: number) {
  formLines.value.splice(idx, 1)
}

function formatRp(n: number) {
  if (n === 0) return '-'
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Journal Entries</h1>
        <p class="text-gray-500 mt-1">Record and manage journal vouchers.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="showCreateModal = true">New Entry</BaseButton>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="entries"
        :searchable="true"
        search-placeholder="Search journals..."
      >
        <template #cell-ref="{ value }">
          <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono font-semibold">{{
            value
          }}</code>
        </template>
        <template #cell-debit="{ value }">
          <span class="font-mono text-sm">{{ formatRp(value as number) }}</span>
        </template>
        <template #cell-credit="{ value }">
          <span class="font-mono text-sm">{{ formatRp(value as number) }}</span>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="value === 'posted' ? 'success' : 'warning'" :dot="true" size="sm">{{
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
    </BaseCard>

    <!-- Create Modal -->
    <BaseModal v-model="showCreateModal" title="Create Journal Entry" size="lg">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="formDate" label="Date" type="date" />
          <BaseInput v-model="formDesc" label="Description" placeholder="Journal description..." />
        </div>
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium text-gray-700">Lines</label>
            <BaseButton variant="ghost" size="sm" :icon="Plus" @click="addLine"
              >Add Line</BaseButton
            >
          </div>
          <div class="border border-gray-200 rounded-lg overflow-hidden">
            <div
              class="grid grid-cols-[2fr_1fr_1fr_auto] gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600"
            >
              <span>Account</span><span class="text-right">Debit</span
              ><span class="text-right">Credit</span><span></span>
            </div>
            <div
              v-for="(line, idx) in formLines"
              :key="idx"
              class="grid grid-cols-[2fr_1fr_1fr_auto] gap-2 px-3 py-2 border-b border-gray-100 items-center"
            >
              <BaseSelect
                v-model="line.account"
                :options="accountOptions"
                size="sm"
                placeholder="Select account..."
              />
              <input
                v-model.number="line.debit"
                type="number"
                class="text-sm border border-gray-200 rounded px-2 py-1.5 text-right outline-none focus:border-primary-500"
                placeholder="0"
              />
              <input
                v-model.number="line.credit"
                type="number"
                class="text-sm border border-gray-200 rounded px-2 py-1.5 text-right outline-none focus:border-primary-500"
                placeholder="0"
              />
              <button
                v-if="formLines.length > 2"
                class="text-gray-400 hover:text-red-500 cursor-pointer p-1"
                @click="removeLine(idx)"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showCreateModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showCreateModal = false">Save as Draft</BaseButton>
        <BaseButton variant="success" size="sm" :icon="Check" @click="showCreateModal = false"
          >Post</BaseButton
        >
      </template>
    </BaseModal>

    <!-- Detail Modal -->
    <BaseModal v-model="showDetailModal" title="Journal Detail" size="md">
      <div v-if="selectedEntry" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-gray-500">Reference</p>
            <p class="text-sm font-mono font-semibold">{{ selectedEntry.ref }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Date</p>
            <p class="text-sm font-medium">{{ selectedEntry.date }}</p>
          </div>
          <div class="col-span-2">
            <p class="text-xs text-gray-500">Description</p>
            <p class="text-sm font-medium">{{ selectedEntry.description }}</p>
          </div>
        </div>
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <div
            class="grid grid-cols-3 gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600"
          >
            <span>Account</span><span class="text-right">Debit</span
            ><span class="text-right">Credit</span>
          </div>
          <div
            v-for="(line, idx) in (selectedEntry.lines as any[]) || []"
            :key="idx"
            class="grid grid-cols-3 gap-2 px-4 py-2 border-b border-gray-100 text-sm"
          >
            <span>{{ line.account }}</span>
            <span class="text-right font-mono">{{ formatRp(line.debit) }}</span>
            <span class="text-right font-mono">{{ formatRp(line.credit) }}</span>
          </div>
          <div class="grid grid-cols-3 gap-2 px-4 py-2 bg-gray-50 text-sm font-semibold">
            <span>Total</span>
            <span class="text-right font-mono">{{
              formatRp((selectedEntry.debit as number) || 0)
            }}</span>
            <span class="text-right font-mono">{{
              formatRp((selectedEntry.credit as number) || 0)
            }}</span>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDetailModal = false">Close</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
