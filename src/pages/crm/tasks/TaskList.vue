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
import { Plus, MoreHorizontal, Edit, Trash2, CheckCircle2 } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'title', label: 'Task', sortable: true },
  { key: 'assignee', label: 'Assignee' },
  { key: 'relatedTo', label: 'Related To' },
  { key: 'dueDate', label: 'Due Date', sortable: true },
  { key: 'priority', label: 'Priority', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const tasks = ref([
  {
    id: 1,
    title: 'Prepare quotation document',
    assignee: 'Andi Pratama',
    relatedTo: 'Enterprise License',
    dueDate: '2026-07-14',
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: 2,
    title: 'Update CRM data',
    assignee: 'Dewi Lestari',
    relatedTo: 'General',
    dueDate: '2026-07-15',
    priority: 'medium',
    status: 'todo',
  },
  {
    id: 3,
    title: 'Review contract terms',
    assignee: 'Rudi Hermawan',
    relatedTo: 'SaaS Subscription',
    dueDate: '2026-07-13',
    priority: 'high',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Send onboarding docs',
    assignee: 'Maya Sari',
    relatedTo: 'Implementation',
    dueDate: '2026-07-16',
    priority: 'medium',
    status: 'todo',
  },
  {
    id: 5,
    title: 'Schedule kickoff meeting',
    assignee: 'Bambang Widodo',
    relatedTo: 'Support Contract',
    dueDate: '2026-07-17',
    priority: 'low',
    status: 'todo',
  },
  {
    id: 6,
    title: 'Competitor analysis report',
    assignee: 'Siska Amelia',
    relatedTo: 'General',
    dueDate: '2026-07-18',
    priority: 'medium',
    status: 'in-progress',
  },
  {
    id: 7,
    title: 'Follow up payment reminder',
    assignee: 'Hendra Gunawan',
    relatedTo: 'Data Migration',
    dueDate: '2026-07-12',
    priority: 'high',
    status: 'overdue',
  },
  {
    id: 8,
    title: 'Prepare demo environment',
    assignee: 'Linda Susanti',
    relatedTo: 'Custom Development',
    dueDate: '2026-07-19',
    priority: 'medium',
    status: 'todo',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'Mark Complete', icon: CheckCircle2, value: 'complete' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/crm/tasks/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
  if (item.value === 'complete') {
    const task = tasks.value.find((t) => t.id === row.id)
    if (task) task.status = 'completed'
  }
}

function priorityVariant(p: string) {
  const map: Record<string, string> = { high: 'danger', medium: 'warning', low: 'info' }
  return (map[p] || 'secondary') as 'danger' | 'warning' | 'info' | 'secondary'
}

function statusVariant(s: string) {
  const map: Record<string, string> = {
    todo: 'secondary',
    'in-progress': 'primary',
    completed: 'success',
    overdue: 'danger',
  }
  return (map[s] || 'secondary') as 'secondary' | 'primary' | 'success' | 'danger'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Tasks</h1>
        <p class="text-gray-500 mt-1">Manage CRM-related tasks and to-dos.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/crm/tasks/create')"
        >Add Task</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="tasks"
        :searchable="true"
        search-placeholder="Search tasks..."
      >
        <template #cell-priority="{ value }">
          <BaseBadge :variant="priorityVariant(value as string)" size="sm">{{ value }}</BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="statusVariant(value as string)" size="sm" :dot="true">{{
            (value as string).replace('-', ' ')
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
          :total-pages="2"
          :total-items="16"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Task" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete this task?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
