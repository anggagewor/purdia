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
  BaseProgress,
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
  { key: 'employee', label: 'Employee', sortable: true },
  { key: 'period', label: 'Period' },
  { key: 'rating', label: 'Rating', align: 'center' },
  { key: 'reviewer', label: 'Reviewer' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const reviews = ref([
  {
    id: 1,
    employee: 'Andi Pratama',
    period: 'Q2 2026',
    rating: 4,
    reviewer: 'Bambang Widodo',
    status: 'reviewed',
  },
  {
    id: 2,
    employee: 'Dewi Lestari',
    period: 'Q2 2026',
    rating: 5,
    reviewer: 'Nadia Putri',
    status: 'reviewed',
  },
  {
    id: 3,
    employee: 'Rudi Hermawan',
    period: 'Q2 2026',
    rating: 3,
    reviewer: 'Nadia Putri',
    status: 'submitted',
  },
  {
    id: 4,
    employee: 'Maya Sari',
    period: 'Q1 2026',
    rating: 4,
    reviewer: 'Bambang Widodo',
    status: 'reviewed',
  },
  {
    id: 5,
    employee: 'Hendra Gunawan',
    period: 'Q1 2026',
    rating: 2,
    reviewer: 'Bambang Widodo',
    status: 'draft',
  },
  {
    id: 6,
    employee: 'Linda Susanti',
    period: 'Q2 2026',
    rating: 4,
    reviewer: 'Siska Amelia',
    status: 'submitted',
  },
  {
    id: 7,
    employee: 'Farhan Rizky',
    period: 'Q1 2026',
    rating: 3,
    reviewer: 'Bambang Widodo',
    status: 'reviewed',
  },
  {
    id: 8,
    employee: 'Siska Amelia',
    period: 'Q2 2026',
    rating: 5,
    reviewer: 'Nadia Putri',
    status: 'draft',
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
  if (item.value === 'view') router.push(`/hrm/performance/${row.id}`)
  if (item.value === 'edit') router.push(`/hrm/performance/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function getStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    draft: 'secondary',
    submitted: 'warning',
    reviewed: 'success',
  }
  return map[status] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Performance Reviews</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          Manage employee performance evaluations.
        </p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/performance/create')"
        >Add Review</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="reviews"
        :searchable="true"
        search-placeholder="Search reviews..."
      >
        <template #cell-employee="{ row, value }">
          <div class="flex items-center gap-2">
            <BaseAvatar :name="value as string" size="sm" />
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-rating="{ value }">
          <div class="flex items-center gap-2">
            <BaseProgress
              :value="((value as number) / 5) * 100"
              size="sm"
              :variant="
                (value as number) >= 4 ? 'success' : (value as number) >= 3 ? 'warning' : 'danger'
              "
              class="w-16"
            />
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ value }}/5</span>
          </div>
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

    <BaseModal v-model="showDeleteModal" title="Delete Review" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete the performance review for
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
