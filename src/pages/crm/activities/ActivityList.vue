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
  { key: 'type', label: 'Type' },
  { key: 'subject', label: 'Subject', sortable: true },
  { key: 'contact', label: 'Contact' },
  { key: 'deal', label: 'Related Deal' },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const activities = ref([
  {
    id: 1,
    type: 'Call',
    subject: 'Initial discovery call',
    contact: 'Andi Pratama',
    deal: 'Enterprise License',
    date: '2026-07-12',
    status: 'completed',
  },
  {
    id: 2,
    type: 'Meeting',
    subject: 'Product demo',
    contact: 'Dewi Lestari',
    deal: 'Consulting Project',
    date: '2026-07-11',
    status: 'completed',
  },
  {
    id: 3,
    type: 'Email',
    subject: 'Send proposal document',
    contact: 'Rudi Hermawan',
    deal: 'SaaS Subscription',
    date: '2026-07-13',
    status: 'planned',
  },
  {
    id: 4,
    type: 'Call',
    subject: 'Pricing discussion',
    contact: 'Maya Sari',
    deal: 'Implementation',
    date: '2026-07-14',
    status: 'planned',
  },
  {
    id: 5,
    type: 'Meeting',
    subject: 'Contract review',
    contact: 'Bambang Widodo',
    deal: 'Support Contract',
    date: '2026-07-10',
    status: 'completed',
  },
  {
    id: 6,
    type: 'Email',
    subject: 'Follow up on proposal',
    contact: 'Siska Amelia',
    deal: 'Training Package',
    date: '2026-07-15',
    status: 'planned',
  },
  {
    id: 7,
    type: 'Call',
    subject: 'Technical requirements gathering',
    contact: 'Hendra Gunawan',
    deal: 'Data Migration',
    date: '2026-07-09',
    status: 'completed',
  },
  {
    id: 8,
    type: 'Meeting',
    subject: 'Stakeholder alignment',
    contact: 'Linda Susanti',
    deal: 'Custom Development',
    date: '2026-07-16',
    status: 'cancelled',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/crm/activities/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function typeVariant(type: string) {
  const map: Record<string, string> = { Call: 'info', Meeting: 'primary', Email: 'warning' }
  return (map[type] || 'secondary') as 'info' | 'primary' | 'warning' | 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Activities</h1>
        <p class="text-gray-500 mt-1">Track all sales activities and interactions.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/crm/activities/create')"
        >Log Activity</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="activities"
        :searchable="true"
        search-placeholder="Search activities..."
      >
        <template #cell-type="{ value }">
          <BaseBadge :variant="typeVariant(value as string)" size="sm">{{ value }}</BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="
              value === 'completed' ? 'success' : value === 'cancelled' ? 'danger' : 'warning'
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
          :total-items="24"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Activity" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete this activity?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
