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
import type { BadgeVariant } from '@purdia/ui'
import { Plus, MoreHorizontal, Eye, Edit, Trash2, Wrench } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'ticketNo', label: 'Ticket', sortable: true },
  { key: 'asset', label: 'Asset/Equipment', sortable: true },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'priority', label: 'Priority', align: 'center' },
  { key: 'assignedTo', label: 'Assigned To' },
  { key: 'scheduledDate', label: 'Scheduled', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const maintenanceItems = ref([
  {
    id: 1,
    ticketNo: 'MNT-2026-001',
    asset: 'Forklift #3',
    type: 'preventive',
    priority: 'medium',
    assignedTo: 'Agus Riyadi',
    scheduledDate: '2026-07-15',
    status: 'scheduled',
  },
  {
    id: 2,
    ticketNo: 'MNT-2026-002',
    asset: 'Conveyor Belt A',
    type: 'corrective',
    priority: 'high',
    assignedTo: 'Bambang Surya',
    scheduledDate: '2026-07-12',
    status: 'in_progress',
  },
  {
    id: 3,
    ticketNo: 'MNT-2026-003',
    asset: 'AC Unit - Warehouse 1',
    type: 'preventive',
    priority: 'low',
    assignedTo: 'Hendra P.',
    scheduledDate: '2026-07-20',
    status: 'scheduled',
  },
  {
    id: 4,
    ticketNo: 'MNT-2026-004',
    asset: 'Packing Machine #2',
    type: 'corrective',
    priority: 'critical',
    assignedTo: 'Dedi Kurniawan',
    scheduledDate: '2026-07-11',
    status: 'in_progress',
  },
  {
    id: 5,
    ticketNo: 'MNT-2026-005',
    asset: 'Forklift #1',
    type: 'preventive',
    priority: 'medium',
    assignedTo: 'Agus Riyadi',
    scheduledDate: '2026-07-08',
    status: 'completed',
  },
  {
    id: 6,
    ticketNo: 'MNT-2026-006',
    asset: 'Electric Panel B',
    type: 'corrective',
    priority: 'high',
    assignedTo: 'Eko Wibowo',
    scheduledDate: '2026-07-06',
    status: 'completed',
  },
  {
    id: 7,
    ticketNo: 'MNT-2026-007',
    asset: 'Rack System - Zone C',
    type: 'inspection',
    priority: 'low',
    assignedTo: 'Hendra P.',
    scheduledDate: '2026-07-25',
    status: 'scheduled',
  },
  {
    id: 8,
    ticketNo: 'MNT-2026-008',
    asset: 'CCTV Camera #5',
    type: 'corrective',
    priority: 'medium',
    assignedTo: 'Eko Wibowo',
    scheduledDate: '2026-07-10',
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
  if (item.value === 'view') router.push(`/inventory/maintenance/${row.id}`)
  if (item.value === 'edit') router.push(`/inventory/maintenance/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function getTypeVariant(type: string): BadgeVariant {
  if (type === 'preventive') return 'primary'
  if (type === 'corrective') return 'warning'
  return 'secondary'
}

function getPriorityVariant(priority: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    low: 'secondary',
    medium: 'primary',
    high: 'warning',
    critical: 'danger',
  }
  return map[priority] || 'secondary'
}

function getStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    scheduled: 'secondary',
    in_progress: 'primary',
    completed: 'success',
    cancelled: 'danger',
  }
  return map[status] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Maintenance</h1>
        <p class="text-gray-500 mt-1">Track and schedule equipment maintenance tasks.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/inventory/maintenance/create')"
        >New Request</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="maintenanceItems"
        :searchable="true"
        search-placeholder="Search maintenance..."
      >
        <template #cell-ticketNo="{ row, value }">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0"
            >
              <Wrench class="w-4 h-4" />
            </div>
            <span class="font-mono text-sm font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-type="{ value }">
          <BaseBadge :variant="getTypeVariant(value as string)" size="sm" :pill="false">{{
            value
          }}</BaseBadge>
        </template>
        <template #cell-priority="{ value }">
          <BaseBadge :variant="getPriorityVariant(value as string)" :dot="true" size="sm">{{
            value
          }}</BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" size="sm" :pill="false">
            {{ (value as string).replace('_', ' ') }}
          </BaseBadge>
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
          :total-items="15"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Maintenance Request" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{{ selected.ticketNo }}</strong
        >?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
