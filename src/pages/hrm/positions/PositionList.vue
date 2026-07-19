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
import { Plus, MoreHorizontal, Edit, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'name', label: 'Position', sortable: true },
  { key: 'department', label: 'Department' },
  { key: 'level', label: 'Level' },
  { key: 'employees', label: 'Employees', align: 'center' },
  { key: 'salaryRange', label: 'Salary Range' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const positions = ref([
  {
    id: 1,
    name: 'Senior Developer',
    department: 'Engineering',
    level: 'Senior',
    employees: 8,
    salaryRange: 'Rp 18-25 Jt',
    status: 'active',
  },
  {
    id: 2,
    name: 'Marketing Manager',
    department: 'Marketing',
    level: 'Manager',
    employees: 2,
    salaryRange: 'Rp 22-30 Jt',
    status: 'active',
  },
  {
    id: 3,
    name: 'Junior Developer',
    department: 'Engineering',
    level: 'Junior',
    employees: 5,
    salaryRange: 'Rp 8-12 Jt',
    status: 'active',
  },
  {
    id: 4,
    name: 'UI/UX Designer',
    department: 'Product',
    level: 'Mid',
    employees: 3,
    salaryRange: 'Rp 14-20 Jt',
    status: 'active',
  },
  {
    id: 5,
    name: 'HR Specialist',
    department: 'Human Resources',
    level: 'Mid',
    employees: 4,
    salaryRange: 'Rp 12-16 Jt',
    status: 'active',
  },
  {
    id: 6,
    name: 'Finance Lead',
    department: 'Finance',
    level: 'Lead',
    employees: 2,
    salaryRange: 'Rp 20-28 Jt',
    status: 'active',
  },
  {
    id: 7,
    name: 'Sales Executive',
    department: 'Sales',
    level: 'Junior',
    employees: 6,
    salaryRange: 'Rp 7-10 Jt',
    status: 'active',
  },
  {
    id: 8,
    name: 'Operations Director',
    department: 'Operations',
    level: 'Manager',
    employees: 1,
    salaryRange: 'Rp 35-50 Jt',
    status: 'inactive',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/hrm/positions/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Positions</h1>
        <p class="text-gray-500 mt-1">Manage job positions and roles.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/positions/create')"
        >Add Position</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="positions"
        :searchable="true"
        search-placeholder="Search positions..."
      >
        <template #cell-level="{ value }">
          <BaseBadge
            :variant="
              value === 'Manager'
                ? 'info'
                : value === 'Lead'
                  ? 'primary'
                  : value === 'Senior'
                    ? 'success'
                    : value === 'Mid'
                      ? 'warning'
                      : 'secondary'
            "
            size="sm"
            >{{ value }}</BaseBadge
          >
        </template>
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="value === 'active' ? 'success' : 'secondary'"
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
          :total-pages="1"
          :total-items="8"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Position" size="sm">
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
