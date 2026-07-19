<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseBadge,
  BaseAvatar,
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
  { key: 'name', label: 'Employee', sortable: true },
  { key: 'employeeId', label: 'ID' },
  { key: 'department', label: 'Department' },
  { key: 'position', label: 'Position' },
  { key: 'joinDate', label: 'Join Date' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const employees = ref([
  {
    id: 1,
    name: 'Andi Pratama',
    employeeId: 'EMP-001',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2022-03-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Dewi Lestari',
    employeeId: 'EMP-002',
    department: 'Marketing',
    position: 'Marketing Manager',
    joinDate: '2021-06-01',
    status: 'active',
  },
  {
    id: 3,
    name: 'Rudi Hermawan',
    employeeId: 'EMP-003',
    department: 'Finance',
    position: 'Accountant',
    joinDate: '2023-01-10',
    status: 'active',
  },
  {
    id: 4,
    name: 'Maya Sari',
    employeeId: 'EMP-004',
    department: 'Engineering',
    position: 'UI/UX Designer',
    joinDate: '2022-08-20',
    status: 'active',
  },
  {
    id: 5,
    name: 'Bambang Widodo',
    employeeId: 'EMP-005',
    department: 'Operations',
    position: 'Operations Lead',
    joinDate: '2020-11-05',
    status: 'active',
  },
  {
    id: 6,
    name: 'Siska Amelia',
    employeeId: 'EMP-006',
    department: 'HR',
    position: 'HR Specialist',
    joinDate: '2023-04-12',
    status: 'active',
  },
  {
    id: 7,
    name: 'Hendra Gunawan',
    employeeId: 'EMP-007',
    department: 'Engineering',
    position: 'Backend Developer',
    joinDate: '2022-09-01',
    status: 'on-leave',
  },
  {
    id: 8,
    name: 'Linda Susanti',
    employeeId: 'EMP-008',
    department: 'Sales',
    position: 'Sales Executive',
    joinDate: '2024-02-15',
    status: 'active',
  },
  {
    id: 9,
    name: 'Farhan Rizky',
    employeeId: 'EMP-009',
    department: 'Engineering',
    position: 'QA Engineer',
    joinDate: '2023-07-20',
    status: 'active',
  },
  {
    id: 10,
    name: 'Nadia Putri',
    employeeId: 'EMP-010',
    department: 'Finance',
    position: 'Finance Manager',
    joinDate: '2019-05-10',
    status: 'resigned',
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
  if (item.value === 'view') router.push(`/hrm/employees/${row.id}`)
  if (item.value === 'edit') router.push(`/hrm/employees/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Employees</h1>
        <p class="text-gray-500 mt-1">Manage employee records.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/employees/create')"
        >Add Employee</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="employees"
        :searchable="true"
        search-placeholder="Search employees..."
      >
        <template #cell-name="{ row, value }">
          <div class="flex items-center gap-2">
            <BaseAvatar :name="value as string" size="sm" />
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="
              value === 'active' ? 'success' : value === 'on-leave' ? 'warning' : 'secondary'
            "
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
          :total-pages="5"
          :total-items="48"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Employee" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete <strong>{{ selected.name }}</strong
        >?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
