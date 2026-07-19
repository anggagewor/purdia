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
import { Plus, MoreHorizontal, Edit, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const showCreateModal = ref(false)
const showEditModal = ref(false)

const columns: TableColumn[] = [
  { key: 'code', label: 'Code', sortable: true },
  { key: 'name', label: 'Account Name', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'category', label: 'Category' },
  { key: 'balance', label: 'Balance', align: 'right', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const accounts = ref([
  {
    id: 1,
    code: '1-1000',
    name: 'Cash & Bank',
    type: 'Asset',
    category: 'Current Asset',
    balance: 245000000,
    status: 'active',
  },
  {
    id: 2,
    code: '1-1100',
    name: 'Bank BCA',
    type: 'Asset',
    category: 'Current Asset',
    balance: 180000000,
    status: 'active',
  },
  {
    id: 3,
    code: '1-1200',
    name: 'Petty Cash',
    type: 'Asset',
    category: 'Current Asset',
    balance: 5000000,
    status: 'active',
  },
  {
    id: 4,
    code: '1-2000',
    name: 'Accounts Receivable',
    type: 'Asset',
    category: 'Current Asset',
    balance: 78000000,
    status: 'active',
  },
  {
    id: 5,
    code: '1-3000',
    name: 'Inventory',
    type: 'Asset',
    category: 'Current Asset',
    balance: 42000000,
    status: 'active',
  },
  {
    id: 6,
    code: '1-5000',
    name: 'Fixed Assets',
    type: 'Asset',
    category: 'Fixed Asset',
    balance: 350000000,
    status: 'active',
  },
  {
    id: 7,
    code: '1-5100',
    name: 'Accumulated Depreciation',
    type: 'Asset',
    category: 'Fixed Asset',
    balance: -75000000,
    status: 'active',
  },
  {
    id: 8,
    code: '2-1000',
    name: 'Accounts Payable',
    type: 'Liability',
    category: 'Current Liability',
    balance: 35000000,
    status: 'active',
  },
  {
    id: 9,
    code: '2-1100',
    name: 'Tax Payable',
    type: 'Liability',
    category: 'Current Liability',
    balance: 12000000,
    status: 'active',
  },
  {
    id: 10,
    code: '2-2000',
    name: 'Bank Loan',
    type: 'Liability',
    category: 'Long-term Liability',
    balance: 150000000,
    status: 'active',
  },
  {
    id: 11,
    code: '3-1000',
    name: 'Owner Equity',
    type: 'Equity',
    category: 'Equity',
    balance: 500000000,
    status: 'active',
  },
  {
    id: 12,
    code: '3-2000',
    name: 'Retained Earnings',
    type: 'Equity',
    category: 'Equity',
    balance: 169000000,
    status: 'active',
  },
  {
    id: 13,
    code: '4-1000',
    name: 'Sales Revenue',
    type: 'Revenue',
    category: 'Operating Revenue',
    balance: 693000000,
    status: 'active',
  },
  {
    id: 14,
    code: '4-2000',
    name: 'Service Revenue',
    type: 'Revenue',
    category: 'Operating Revenue',
    balance: 125000000,
    status: 'active',
  },
  {
    id: 15,
    code: '5-1000',
    name: 'Cost of Goods Sold',
    type: 'Expense',
    category: 'COGS',
    balance: 280000000,
    status: 'active',
  },
  {
    id: 16,
    code: '5-2000',
    name: 'Salary Expense',
    type: 'Expense',
    category: 'Operating Expense',
    balance: 315000000,
    status: 'active',
  },
  {
    id: 17,
    code: '5-2100',
    name: 'Rent Expense',
    type: 'Expense',
    category: 'Operating Expense',
    balance: 90000000,
    status: 'active',
  },
  {
    id: 18,
    code: '5-2200',
    name: 'Utilities Expense',
    type: 'Expense',
    category: 'Operating Expense',
    balance: 24500000,
    status: 'active',
  },
  {
    id: 19,
    code: '5-3000',
    name: 'Depreciation Expense',
    type: 'Expense',
    category: 'Operating Expense',
    balance: 25000000,
    status: 'active',
  },
  {
    id: 20,
    code: '5-4000',
    name: 'Tax Expense',
    type: 'Expense',
    category: 'Tax',
    balance: 42000000,
    status: 'inactive',
  },
])

const typeOptions: SelectOption[] = [
  { label: 'Asset', value: 'Asset' },
  { label: 'Liability', value: 'Liability' },
  { label: 'Equity', value: 'Equity' },
  { label: 'Revenue', value: 'Revenue' },
  { label: 'Expense', value: 'Expense' },
]

const categoryOptions: SelectOption[] = [
  { label: 'Current Asset', value: 'Current Asset' },
  { label: 'Fixed Asset', value: 'Fixed Asset' },
  { label: 'Current Liability', value: 'Current Liability' },
  { label: 'Long-term Liability', value: 'Long-term Liability' },
  { label: 'Equity', value: 'Equity' },
  { label: 'Operating Revenue', value: 'Operating Revenue' },
  { label: 'COGS', value: 'COGS' },
  { label: 'Operating Expense', value: 'Operating Expense' },
  { label: 'Tax', value: 'Tax' },
]

const formCode = ref('')
const formName = ref('')
const formType = ref<string | number>('')
const formCategory = ref<string | number>('')

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  if (item.value === 'edit') {
    formCode.value = row.code as string
    formName.value = row.name as string
    formType.value = row.type as string
    formCategory.value = row.category as string
    showEditModal.value = true
  }
}

function getTypeColor(type: string) {
  const map: Record<string, 'primary' | 'danger' | 'success' | 'info' | 'warning'> = {
    Asset: 'primary',
    Liability: 'danger',
    Equity: 'info',
    Revenue: 'success',
    Expense: 'warning',
  }
  return map[type] || ('secondary' as any)
}

function formatRp(n: number) {
  const abs = Math.abs(n)
  const formatted =
    abs >= 1000000 ? `${(abs / 1000000).toFixed(1)} Jt` : abs.toLocaleString('id-ID')
  return (n < 0 ? '-' : '') + 'Rp ' + formatted
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Chart of Accounts</h1>
        <p class="text-gray-500 mt-1">Manage all ledger accounts (COA).</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="showCreateModal = true">Add Account</BaseButton>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="accounts"
        :searchable="true"
        search-placeholder="Search account code or name..."
      >
        <template #cell-code="{ value }">
          <code
            class="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono font-semibold dark:bg-gray-700 dark:text-gray-300"
            >{{ value }}</code
          >
        </template>
        <template #cell-name="{ value }">
          <span class="font-medium">{{ value }}</span>
        </template>
        <template #cell-type="{ value }">
          <BaseBadge :variant="getTypeColor(value as string)" size="sm" :pill="false">{{
            value
          }}</BaseBadge>
        </template>
        <template #cell-category="{ value }">
          <span class="text-xs text-gray-500">{{ value }}</span>
        </template>
        <template #cell-balance="{ value }">
          <span
            class="font-mono text-sm"
            :class="(value as number) < 0 ? 'text-red-600' : 'text-gray-800'"
            >{{ formatRp(value as number) }}</span
          >
        </template>
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="value === 'active' ? 'success' : 'secondary'"
            :dot="true"
            size="sm"
            >{{ value }}</BaseBadge
          >
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

    <BaseModal v-model="showCreateModal" title="Add Account" size="md">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="formCode" label="Account Code" placeholder="e.g. 1-1300" />
          <BaseInput v-model="formName" label="Account Name" placeholder="e.g. Savings Account" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseSelect
            v-model="formType"
            label="Type"
            :options="typeOptions"
            placeholder="Select type..."
          />
          <BaseSelect
            v-model="formCategory"
            label="Category"
            :options="categoryOptions"
            placeholder="Select category..."
          />
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showCreateModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showCreateModal = false">Add Account</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showEditModal" title="Edit Account" size="md">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="formCode" label="Account Code" />
          <BaseInput v-model="formName" label="Account Name" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseSelect v-model="formType" label="Type" :options="typeOptions" />
          <BaseSelect v-model="formCategory" label="Category" :options="categoryOptions" />
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showEditModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showEditModal = false">Save</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
