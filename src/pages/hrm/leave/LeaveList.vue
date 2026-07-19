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
  { key: 'employee', label: 'Employee', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'startDate', label: 'Start Date', sortable: true },
  { key: 'endDate', label: 'End Date' },
  { key: 'days', label: 'Days', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const leaves = ref([
  {
    id: 1,
    employee: 'Andi Pratama',
    type: 'Annual',
    startDate: '2024-12-20',
    endDate: '2024-12-24',
    days: 3,
    status: 'approved',
  },
  {
    id: 2,
    employee: 'Dewi Lestari',
    type: 'Sick',
    startDate: '2024-12-05',
    endDate: '2024-12-06',
    days: 2,
    status: 'approved',
  },
  {
    id: 3,
    employee: 'Rudi Hermawan',
    type: 'Personal',
    startDate: '2024-12-10',
    endDate: '2024-12-10',
    days: 1,
    status: 'pending',
  },
  {
    id: 4,
    employee: 'Maya Sari',
    type: 'Maternity',
    startDate: '2025-01-06',
    endDate: '2025-04-06',
    days: 90,
    status: 'approved',
  },
  {
    id: 5,
    employee: 'Bambang Widodo',
    type: 'Annual',
    startDate: '2024-12-23',
    endDate: '2024-12-27',
    days: 5,
    status: 'pending',
  },
  {
    id: 6,
    employee: 'Siska Amelia',
    type: 'Sick',
    startDate: '2024-11-28',
    endDate: '2024-11-29',
    days: 2,
    status: 'approved',
  },
  {
    id: 7,
    employee: 'Hendra Gunawan',
    type: 'Personal',
    startDate: '2024-12-15',
    endDate: '2024-12-16',
    days: 2,
    status: 'rejected',
  },
  {
    id: 8,
    employee: 'Farhan Rizky',
    type: 'Annual',
    startDate: '2024-12-30',
    endDate: '2025-01-03',
    days: 5,
    status: 'pending',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/hrm/leave/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Leave Requests</h1>
        <p class="text-gray-500 mt-1">Manage employee leave applications.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/leave/create')"
        >New Request</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="leaves"
        :searchable="true"
        search-placeholder="Search leave requests..."
      >
        <template #cell-type="{ value }">
          <BaseBadge
            :variant="
              value === 'Annual'
                ? 'info'
                : value === 'Sick'
                  ? 'danger'
                  : value === 'Maternity'
                    ? 'primary'
                    : 'secondary'
            "
            size="sm"
            >{{ value }}</BaseBadge
          >
        </template>
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="value === 'approved' ? 'success' : value === 'pending' ? 'warning' : 'danger'"
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

    <BaseModal v-model="showDeleteModal" title="Delete Leave Request" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete leave request for
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
