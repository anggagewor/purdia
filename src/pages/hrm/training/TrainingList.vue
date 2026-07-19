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
  { key: 'title', label: 'Title', sortable: true },
  { key: 'trainer', label: 'Trainer' },
  { key: 'department', label: 'Department' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'endDate', label: 'End Date' },
  { key: 'participants', label: 'Participants', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const trainings = ref([
  {
    id: 1,
    title: 'Vue.js Advanced Patterns',
    trainer: 'Andi Pratama',
    department: 'Engineering',
    startDate: '2026-02-01',
    endDate: '2026-02-03',
    participants: 15,
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Digital Marketing Strategy',
    trainer: 'Dewi Lestari',
    department: 'Marketing',
    startDate: '2026-01-20',
    endDate: '2026-01-22',
    participants: 12,
    status: 'ongoing',
  },
  {
    id: 3,
    title: 'Financial Reporting Standards',
    trainer: 'Rudi Hermawan',
    department: 'Finance',
    startDate: '2025-12-10',
    endDate: '2025-12-12',
    participants: 8,
    status: 'completed',
  },
  {
    id: 4,
    title: 'UI/UX Design Thinking',
    trainer: 'Maya Sari',
    department: 'Engineering',
    startDate: '2026-02-10',
    endDate: '2026-02-12',
    participants: 20,
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Leadership & Team Management',
    trainer: 'Bambang Widodo',
    department: 'HR',
    startDate: '2026-01-15',
    endDate: '2026-01-17',
    participants: 10,
    status: 'ongoing',
  },
  {
    id: 6,
    title: 'Cybersecurity Awareness',
    trainer: 'Hendra Gunawan',
    department: 'Engineering',
    startDate: '2025-11-05',
    endDate: '2025-11-06',
    participants: 25,
    status: 'completed',
  },
  {
    id: 7,
    title: 'Sales Negotiation Techniques',
    trainer: 'Linda Susanti',
    department: 'Sales',
    startDate: '2026-02-15',
    endDate: '2026-02-16',
    participants: 14,
    status: 'upcoming',
  },
  {
    id: 8,
    title: 'Agile Project Management',
    trainer: 'Farhan Rizky',
    department: 'Operations',
    startDate: '2025-12-20',
    endDate: '2025-12-22',
    participants: 18,
    status: 'completed',
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
  if (item.value === 'view') router.push(`/hrm/training/${row.id}`)
  if (item.value === 'edit') router.push(`/hrm/training/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function getStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    upcoming: 'primary',
    ongoing: 'warning',
    completed: 'success',
  }
  return map[status] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Training</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Manage training programs and sessions.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/training/create')"
        >Add Training</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="trainings"
        :searchable="true"
        search-placeholder="Search trainings..."
      >
        <template #cell-participants="{ value }">
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
          :total-items="22"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Training" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete <strong>{{ selected.title }}</strong
        >? This action cannot be undone.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
