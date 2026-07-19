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
  { key: 'date', label: 'Date', sortable: true },
  { key: 'clockIn', label: 'Clock In' },
  { key: 'clockOut', label: 'Clock Out' },
  { key: 'workHours', label: 'Work Hours', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const attendances = ref([
  {
    id: 1,
    employee: 'Andi Pratama',
    date: '2024-12-02',
    clockIn: '08:00',
    clockOut: '17:05',
    workHours: '9h 5m',
    status: 'present',
  },
  {
    id: 2,
    employee: 'Dewi Lestari',
    date: '2024-12-02',
    clockIn: '08:45',
    clockOut: '17:30',
    workHours: '8h 45m',
    status: 'late',
  },
  {
    id: 3,
    employee: 'Rudi Hermawan',
    date: '2024-12-02',
    clockIn: '-',
    clockOut: '-',
    workHours: '-',
    status: 'absent',
  },
  {
    id: 4,
    employee: 'Maya Sari',
    date: '2024-12-02',
    clockIn: '07:55',
    clockOut: '17:00',
    workHours: '9h 5m',
    status: 'present',
  },
  {
    id: 5,
    employee: 'Bambang Widodo',
    date: '2024-12-02',
    clockIn: '08:10',
    clockOut: '12:15',
    workHours: '4h 5m',
    status: 'half-day',
  },
  {
    id: 6,
    employee: 'Siska Amelia',
    date: '2024-12-02',
    clockIn: '08:00',
    clockOut: '17:10',
    workHours: '9h 10m',
    status: 'present',
  },
  {
    id: 7,
    employee: 'Hendra Gunawan',
    date: '2024-12-02',
    clockIn: '09:15',
    clockOut: '17:45',
    workHours: '8h 30m',
    status: 'late',
  },
  {
    id: 8,
    employee: 'Linda Susanti',
    date: '2024-12-02',
    clockIn: '07:50',
    clockOut: '17:00',
    workHours: '9h 10m',
    status: 'present',
  },
  {
    id: 9,
    employee: 'Farhan Rizky',
    date: '2024-12-02',
    clockIn: '08:05',
    clockOut: '17:20',
    workHours: '9h 15m',
    status: 'present',
  },
  {
    id: 10,
    employee: 'Nadia Putri',
    date: '2024-12-02',
    clockIn: '-',
    clockOut: '-',
    workHours: '-',
    status: 'absent',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/hrm/attendance/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Attendance</h1>
        <p class="text-gray-500 mt-1">Track employee attendance records.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/attendance/create')"
        >Add Record</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="attendances"
        :searchable="true"
        search-placeholder="Search attendance..."
      >
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="
              value === 'present'
                ? 'success'
                : value === 'late'
                  ? 'warning'
                  : value === 'absent'
                    ? 'danger'
                    : 'info'
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
          :total-pages="3"
          :total-items="10"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Record" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete attendance record for
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
