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
  { key: 'subject', label: 'Subject', sortable: true },
  { key: 'contact', label: 'Contact' },
  { key: 'type', label: 'Type' },
  { key: 'dueDate', label: 'Due Date', sortable: true },
  { key: 'priority', label: 'Priority', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const followUps = ref([
  {
    id: 1,
    subject: 'Send revised proposal',
    contact: 'Andi Pratama',
    type: 'Email',
    dueDate: '2026-07-14',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 2,
    subject: 'Schedule demo meeting',
    contact: 'Dewi Lestari',
    type: 'Call',
    dueDate: '2026-07-15',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 3,
    subject: 'Check payment status',
    contact: 'Rudi Hermawan',
    type: 'Call',
    dueDate: '2026-07-13',
    priority: 'high',
    status: 'completed',
  },
  {
    id: 4,
    subject: 'Share case study',
    contact: 'Maya Sari',
    type: 'Email',
    dueDate: '2026-07-16',
    priority: 'low',
    status: 'pending',
  },
  {
    id: 5,
    subject: 'Discuss renewal terms',
    contact: 'Bambang Widodo',
    type: 'Meeting',
    dueDate: '2026-07-17',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 6,
    subject: 'Send training schedule',
    contact: 'Siska Amelia',
    type: 'Email',
    dueDate: '2026-07-12',
    priority: 'medium',
    status: 'overdue',
  },
  {
    id: 7,
    subject: 'Technical Q&A session',
    contact: 'Hendra Gunawan',
    type: 'Meeting',
    dueDate: '2026-07-18',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 8,
    subject: 'Provide references',
    contact: 'Linda Susanti',
    type: 'Email',
    dueDate: '2026-07-11',
    priority: 'low',
    status: 'completed',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/crm/follow-ups/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function priorityVariant(p: string) {
  const map: Record<string, string> = { high: 'danger', medium: 'warning', low: 'info' }
  return (map[p] || 'secondary') as 'danger' | 'warning' | 'info' | 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Follow Ups</h1>
        <p class="text-gray-500 mt-1">Manage your pending follow-up actions.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/crm/follow-ups/create')"
        >Add Follow Up</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="followUps"
        :searchable="true"
        search-placeholder="Search follow ups..."
      >
        <template #cell-priority="{ value }">
          <BaseBadge :variant="priorityVariant(value as string)" size="sm">{{ value }}</BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="
              value === 'completed' ? 'success' : value === 'overdue' ? 'danger' : 'warning'
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
          :total-pages="2"
          :total-items="16"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Follow Up" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete this follow up?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
