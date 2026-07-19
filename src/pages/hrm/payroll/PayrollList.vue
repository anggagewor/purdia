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

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'period', label: 'Period', sortable: true },
  { key: 'employee', label: 'Employee', sortable: true },
  { key: 'baseSalary', label: 'Base Salary' },
  { key: 'allowances', label: 'Allowances' },
  { key: 'deductions', label: 'Deductions' },
  { key: 'netSalary', label: 'Net Salary' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const payrolls = ref([
  {
    id: 1,
    period: 'Desember 2024',
    employee: 'Andi Pratama',
    baseSalary: 'Rp 25.000.000',
    allowances: 'Rp 5.000.000',
    deductions: 'Rp 2.500.000',
    netSalary: 'Rp 27.500.000',
    status: 'paid',
  },
  {
    id: 2,
    period: 'Desember 2024',
    employee: 'Dewi Lestari',
    baseSalary: 'Rp 22.000.000',
    allowances: 'Rp 4.000.000',
    deductions: 'Rp 2.200.000',
    netSalary: 'Rp 23.800.000',
    status: 'paid',
  },
  {
    id: 3,
    period: 'Desember 2024',
    employee: 'Rudi Hermawan',
    baseSalary: 'Rp 15.000.000',
    allowances: 'Rp 3.000.000',
    deductions: 'Rp 1.500.000',
    netSalary: 'Rp 16.500.000',
    status: 'processed',
  },
  {
    id: 4,
    period: 'Desember 2024',
    employee: 'Maya Sari',
    baseSalary: 'Rp 18.000.000',
    allowances: 'Rp 3.500.000',
    deductions: 'Rp 1.800.000',
    netSalary: 'Rp 19.700.000',
    status: 'processed',
  },
  {
    id: 5,
    period: 'Desember 2024',
    employee: 'Bambang Widodo',
    baseSalary: 'Rp 28.000.000',
    allowances: 'Rp 6.000.000',
    deductions: 'Rp 3.000.000',
    netSalary: 'Rp 31.000.000',
    status: 'draft',
  },
  {
    id: 6,
    period: 'Desember 2024',
    employee: 'Siska Amelia',
    baseSalary: 'Rp 14.000.000',
    allowances: 'Rp 2.500.000',
    deductions: 'Rp 1.400.000',
    netSalary: 'Rp 15.100.000',
    status: 'draft',
  },
  {
    id: 7,
    period: 'November 2024',
    employee: 'Hendra Gunawan',
    baseSalary: 'Rp 20.000.000',
    allowances: 'Rp 4.000.000',
    deductions: 'Rp 2.000.000',
    netSalary: 'Rp 22.000.000',
    status: 'paid',
  },
  {
    id: 8,
    period: 'November 2024',
    employee: 'Linda Susanti',
    baseSalary: 'Rp 12.000.000',
    allowances: 'Rp 2.000.000',
    deductions: 'Rp 1.200.000',
    netSalary: 'Rp 12.800.000',
    status: 'paid',
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
  if (item.value === 'view') router.push(`/hrm/payroll/${row.id}`)
  if (item.value === 'edit') router.push(`/hrm/payroll/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Payroll</h1>
        <p class="text-gray-500 mt-1">Manage employee salary and payroll.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/payroll/create')"
        >Create Payroll</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="payrolls"
        :searchable="true"
        search-placeholder="Search payroll..."
      >
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="value === 'paid' ? 'success' : value === 'processed' ? 'info' : 'secondary'"
            size="sm"
            :dot="true"
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
      <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <BasePagination
          v-model:current-page="currentPage"
          :total-pages="2"
          :total-items="8"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Payroll" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete payroll record for
        <strong>{{ selected.employee }}</strong
        >?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
