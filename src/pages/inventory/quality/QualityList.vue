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
import { Plus, MoreHorizontal, Eye, Edit, Trash2, ShieldCheck } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'inspectionNo', label: 'Inspection No.', sortable: true },
  { key: 'product', label: 'Product', sortable: true },
  { key: 'batch', label: 'Batch' },
  { key: 'inspector', label: 'Inspector' },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'result', label: 'Result', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const qualityItems = ref([
  {
    id: 1,
    inspectionNo: 'QC-2026-0051',
    product: 'Laptop Dell XPS 15',
    batch: 'BTH-2026-042',
    inspector: 'Siti Aminah',
    date: '2026-07-12',
    result: 'pass',
    status: 'completed',
  },
  {
    id: 2,
    inspectionNo: 'QC-2026-0050',
    product: 'Mouse Logitech MX Master 3',
    batch: 'BTH-2026-041',
    inspector: 'Riko Saputra',
    date: '2026-07-11',
    result: 'pass',
    status: 'completed',
  },
  {
    id: 3,
    inspectionNo: 'QC-2026-0049',
    product: 'Keyboard Mechanical K2 Pro',
    batch: 'BTH-2026-040',
    inspector: 'Siti Aminah',
    date: '2026-07-10',
    result: 'fail',
    status: 'completed',
  },
  {
    id: 4,
    inspectionNo: 'QC-2026-0048',
    product: 'USB-C Hub Anker 7-in-1',
    batch: 'BTH-2026-039',
    inspector: 'Dwi Hartono',
    date: '2026-07-10',
    result: 'pass',
    status: 'completed',
  },
  {
    id: 5,
    inspectionNo: 'QC-2026-0047',
    product: 'Monitor LG UltraWide 34"',
    batch: 'BTH-2026-038',
    inspector: 'Riko Saputra',
    date: '2026-07-09',
    result: 'pass',
    status: 'completed',
  },
  {
    id: 6,
    inspectionNo: 'QC-2026-0046',
    product: 'SSD Samsung 1TB',
    batch: 'BTH-2026-037',
    inspector: 'Dwi Hartono',
    date: '2026-07-08',
    result: 'conditional',
    status: 'completed',
  },
  {
    id: 7,
    inspectionNo: 'QC-2026-0045',
    product: 'RAM DDR5 32GB Kit',
    batch: 'BTH-2026-036',
    inspector: 'Siti Aminah',
    date: '2026-07-12',
    result: 'pending',
    status: 'in_progress',
  },
  {
    id: 8,
    inspectionNo: 'QC-2026-0044',
    product: 'Headset Sony WH-1000XM5',
    batch: 'BTH-2026-035',
    inspector: 'Riko Saputra',
    date: '2026-07-13',
    result: 'pending',
    status: 'scheduled',
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
  if (item.value === 'view') router.push(`/inventory/quality/${row.id}`)
  if (item.value === 'edit') router.push(`/inventory/quality/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function getResultVariant(result: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    pass: 'success',
    fail: 'danger',
    conditional: 'warning',
    pending: 'secondary',
  }
  return map[result] || 'secondary'
}

function getStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    scheduled: 'secondary',
    in_progress: 'primary',
    completed: 'success',
  }
  return map[status] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Quality Control</h1>
        <p class="text-gray-500 mt-1">Manage quality inspections and compliance checks.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/inventory/quality/create')"
        >New Inspection</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="qualityItems"
        :searchable="true"
        search-placeholder="Search inspections..."
      >
        <template #cell-inspectionNo="{ row, value }">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0"
            >
              <ShieldCheck class="w-4 h-4" />
            </div>
            <span class="font-mono text-sm font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-batch="{ value }">
          <span class="font-mono text-xs text-gray-600 dark:text-gray-400">{{ value }}</span>
        </template>
        <template #cell-result="{ value }">
          <BaseBadge :variant="getResultVariant(value as string)" size="sm" :dot="true">{{
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
          :total-pages="3"
          :total-items="25"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Inspection" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{{ selected.inspectionNo }}</strong
        >?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
