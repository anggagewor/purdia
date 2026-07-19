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
import type { BadgeVariant } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'position', label: 'Position', sortable: true },
  { key: 'department', label: 'Department' },
  { key: 'applicants', label: 'Applicants', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'postedDate', label: 'Posted Date' },
  { key: 'closingDate', label: 'Closing Date' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const recruitments = ref([
  {
    id: 1,
    position: 'Senior Frontend Developer',
    department: 'Engineering',
    applicants: 24,
    status: 'open',
    postedDate: '2026-01-10',
    closingDate: '2026-02-10',
  },
  {
    id: 2,
    position: 'Marketing Manager',
    department: 'Marketing',
    applicants: 18,
    status: 'interviewing',
    postedDate: '2026-01-05',
    closingDate: '2026-02-05',
  },
  {
    id: 3,
    position: 'Accountant',
    department: 'Finance',
    applicants: 12,
    status: 'closed',
    postedDate: '2025-11-20',
    closingDate: '2025-12-20',
  },
  {
    id: 4,
    position: 'UI/UX Designer',
    department: 'Engineering',
    applicants: 31,
    status: 'open',
    postedDate: '2026-01-15',
    closingDate: '2026-02-15',
  },
  {
    id: 5,
    position: 'HR Specialist',
    department: 'HR',
    applicants: 9,
    status: 'on-hold',
    postedDate: '2026-01-02',
    closingDate: '2026-01-30',
  },
  {
    id: 6,
    position: 'Backend Developer',
    department: 'Engineering',
    applicants: 27,
    status: 'interviewing',
    postedDate: '2025-12-18',
    closingDate: '2026-01-18',
  },
  {
    id: 7,
    position: 'Sales Executive',
    department: 'Sales',
    applicants: 15,
    status: 'open',
    postedDate: '2026-01-12',
    closingDate: '2026-02-12',
  },
  {
    id: 8,
    position: 'Operations Lead',
    department: 'Operations',
    applicants: 6,
    status: 'closed',
    postedDate: '2025-10-05',
    closingDate: '2025-11-05',
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
  if (item.value === 'view') router.push(`/hrm/recruitment/${row.id}`)
  if (item.value === 'edit') router.push(`/hrm/recruitment/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function getStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    open: 'success',
    interviewing: 'primary',
    closed: 'secondary',
    'on-hold': 'warning',
  }
  return map[status] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Recruitment</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Manage job postings and recruitment process.
        </p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/recruitment/create')"
        >Add Job Posting</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="recruitments"
        :searchable="true"
        search-placeholder="Search job postings..."
      >
        <template #cell-applicants="{ value }">
          <span class="text-sm text-gray-600 dark:text-gray-300">{{ value }}</span>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" size="sm" :dot="true">{{
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
      <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <BasePagination
          v-model:current-page="currentPage"
          :total-pages="3"
          :total-items="24"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Job Posting" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete <strong>{{ selected.position }}</strong
        >? This action cannot be undone.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
