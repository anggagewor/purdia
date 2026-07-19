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
  StatCard,
} from '@purdia/ui'
import { Plus, MoreHorizontal, Eye, Edit, Download, FileText, Calculator } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const showCreateModal = ref(false)
const showDetailModal = ref(false)
const selectedTax = ref<Record<string, unknown>>({})

const columns: TableColumn[] = [
  { key: 'period', label: 'Period', sortable: true },
  { key: 'type', label: 'Tax Type' },
  { key: 'taxBase', label: 'Tax Base', align: 'right' },
  { key: 'rate', label: 'Rate', align: 'center' },
  { key: 'amount', label: 'Tax Amount', align: 'right', sortable: true },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const taxes = ref([
  {
    id: 1,
    period: 'July 2025',
    type: 'PPh 21',
    description: 'Employee income tax',
    taxBase: 450000000,
    rate: '5-30%',
    amount: 42500000,
    dueDate: '2025-08-10',
    status: 'pending',
    paidDate: '',
  },
  {
    id: 2,
    period: 'July 2025',
    type: 'PPh 23',
    description: 'Withholding tax - services',
    taxBase: 85000000,
    rate: '2%',
    amount: 1700000,
    dueDate: '2025-08-10',
    status: 'pending',
    paidDate: '',
  },
  {
    id: 3,
    period: 'July 2025',
    type: 'PPN',
    description: 'Value Added Tax',
    taxBase: 693000000,
    rate: '11%',
    amount: 76230000,
    dueDate: '2025-08-31',
    status: 'pending',
    paidDate: '',
  },
  {
    id: 4,
    period: 'June 2025',
    type: 'PPh 21',
    description: 'Employee income tax',
    taxBase: 420000000,
    rate: '5-30%',
    amount: 38500000,
    dueDate: '2025-07-10',
    status: 'paid',
    paidDate: '2025-07-08',
  },
  {
    id: 5,
    period: 'June 2025',
    type: 'PPh 23',
    description: 'Withholding tax - services',
    taxBase: 72000000,
    rate: '2%',
    amount: 1440000,
    dueDate: '2025-07-10',
    status: 'paid',
    paidDate: '2025-07-08',
  },
  {
    id: 6,
    period: 'June 2025',
    type: 'PPN',
    description: 'Value Added Tax',
    taxBase: 580000000,
    rate: '11%',
    amount: 63800000,
    dueDate: '2025-07-31',
    status: 'paid',
    paidDate: '2025-07-25',
  },
  {
    id: 7,
    period: 'Q2 2025',
    type: 'PPh 25',
    description: 'Monthly corporate income tax installment',
    taxBase: 169000000,
    rate: '22%',
    amount: 12366667,
    dueDate: '2025-07-15',
    status: 'paid',
    paidDate: '2025-07-12',
  },
  {
    id: 8,
    period: 'May 2025',
    type: 'PPh 4(2)',
    description: 'Final tax - rental income',
    taxBase: 45000000,
    rate: '10%',
    amount: 4500000,
    dueDate: '2025-06-10',
    status: 'paid',
    paidDate: '2025-06-05',
  },
])

const taxTypeOptions: SelectOption[] = [
  { label: 'PPh 21 - Employee Income Tax', value: 'PPh 21' },
  { label: 'PPh 23 - Withholding Tax', value: 'PPh 23' },
  { label: 'PPh 25 - Corporate Installment', value: 'PPh 25' },
  { label: 'PPh 4(2) - Final Tax', value: 'PPh 4(2)' },
  { label: 'PPN - Value Added Tax', value: 'PPN' },
]

const formPeriod = ref('')
const formType = ref<string | number>('')
const formTaxBase = ref<number>(0)
const formRate = ref('')
const formDueDate = ref('')

const rowActions: DropdownItem[] = [
  { label: 'View Detail', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { label: 'Download SPT', icon: Download, value: 'download' },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  if (item.value === 'view') {
    selectedTax.value = row
    showDetailModal.value = true
  }
}

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Tax Management</h1>
        <p class="text-gray-500 mt-1">Perpajakan — PPh, PPN, dan pelaporan pajak.</p>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="outline" size="sm" :icon="Download">Export SPT</BaseButton>
        <BaseButton size="sm" :icon="Plus" @click="showCreateModal = true"
          >Add Tax Record</BaseButton
        >
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Tax (YTD)"
        value="Rp 241 Jt"
        trend="up"
        trendValue="+15%"
        subtitle="this year"
        :icon="Calculator"
      />
      <StatCard title="Pending Payment" value="Rp 120 Jt" subtitle="3 items" :icon="FileText" />
      <StatCard
        title="PPh Paid"
        value="Rp 97 Jt"
        trend="up"
        trendValue="+12%"
        subtitle="YTD"
        :icon="FileText"
      />
      <StatCard
        title="PPN Paid"
        value="Rp 144 Jt"
        trend="up"
        trendValue="+18%"
        subtitle="YTD"
        :icon="FileText"
      />
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="taxes"
        :searchable="true"
        search-placeholder="Search tax records..."
      >
        <template #cell-type="{ value }">
          <BaseBadge variant="primary" size="sm" :pill="false">{{ value }}</BaseBadge>
        </template>
        <template #cell-taxBase="{ value }">
          <span class="font-mono text-sm">{{ formatRp(value as number) }}</span>
        </template>
        <template #cell-rate="{ value }">
          <span class="text-sm font-medium">{{ value }}</span>
        </template>
        <template #cell-amount="{ value }">
          <span class="font-mono text-sm font-semibold">{{ formatRp(value as number) }}</span>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="value === 'paid' ? 'success' : value === 'pending' ? 'warning' : 'danger'"
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

    <!-- Create Modal -->
    <BaseModal v-model="showCreateModal" title="Add Tax Record" size="md">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="formPeriod" label="Period" placeholder="e.g. July 2025" />
          <BaseSelect
            v-model="formType"
            label="Tax Type"
            :options="taxTypeOptions"
            placeholder="Select..."
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model.number="formTaxBase"
            label="Tax Base (DPP)"
            type="number"
            placeholder="0"
          />
          <BaseInput v-model="formRate" label="Rate" placeholder="e.g. 11% or 5-30%" />
        </div>
        <BaseInput v-model="formDueDate" label="Due Date" type="date" />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showCreateModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showCreateModal = false">Save</BaseButton>
      </template>
    </BaseModal>

    <!-- Detail Modal -->
    <BaseModal v-model="showDetailModal" title="Tax Detail" size="md">
      <div v-if="selectedTax" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-gray-500">Period</p>
            <p class="text-sm font-semibold">{{ selectedTax.period }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Type</p>
            <BaseBadge variant="primary" size="sm" :pill="false">{{ selectedTax.type }}</BaseBadge>
          </div>
          <div>
            <p class="text-xs text-gray-500">Description</p>
            <p class="text-sm">{{ selectedTax.description }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Rate</p>
            <p class="text-sm font-medium">{{ selectedTax.rate }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Tax Base (DPP)</p>
            <p class="text-sm font-mono">{{ formatRp((selectedTax.taxBase as number) || 0) }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Tax Amount</p>
            <p class="text-sm font-mono font-bold">
              {{ formatRp((selectedTax.amount as number) || 0) }}
            </p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Due Date</p>
            <p class="text-sm">{{ selectedTax.dueDate }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Status</p>
            <BaseBadge
              :variant="selectedTax.status === 'paid' ? 'success' : 'warning'"
              :dot="true"
              size="sm"
              >{{ selectedTax.status }}</BaseBadge
            >
          </div>
          <div v-if="selectedTax.paidDate">
            <p class="text-xs text-gray-500">Paid Date</p>
            <p class="text-sm">{{ selectedTax.paidDate }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDetailModal = false">Close</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
