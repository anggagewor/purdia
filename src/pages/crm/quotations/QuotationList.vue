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

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'number', label: 'Quote #', sortable: true },
  { key: 'client', label: 'Client' },
  { key: 'subject', label: 'Subject' },
  { key: 'total', label: 'Total', sortable: true },
  { key: 'validUntil', label: 'Valid Until' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const quotations = ref([
  {
    id: 1,
    number: 'QT-2026-001',
    client: 'PT Teknologi Maju',
    subject: 'Enterprise License Package',
    total: 'Rp 150.000.000',
    validUntil: '2026-08-15',
    status: 'sent',
  },
  {
    id: 2,
    number: 'QT-2026-002',
    client: 'CV Solusi Digital',
    subject: 'Consulting Services',
    total: 'Rp 85.000.000',
    validUntil: '2026-08-30',
    status: 'draft',
  },
  {
    id: 3,
    number: 'QT-2026-003',
    client: 'PT Global Infra',
    subject: 'SaaS Annual Plan',
    total: 'Rp 45.000.000',
    validUntil: '2026-09-10',
    status: 'accepted',
  },
  {
    id: 4,
    number: 'QT-2026-004',
    client: 'PT Nusantara Tech',
    subject: 'Full Implementation',
    total: 'Rp 200.000.000',
    validUntil: '2026-07-20',
    status: 'accepted',
  },
  {
    id: 5,
    number: 'QT-2026-005',
    client: 'PT Karya Bersama',
    subject: 'Support & Maintenance',
    total: 'Rp 60.000.000',
    validUntil: '2026-08-25',
    status: 'sent',
  },
  {
    id: 6,
    number: 'QT-2026-006',
    client: 'PT Sentosa Group',
    subject: 'Training Program',
    total: 'Rp 35.000.000',
    validUntil: '2026-09-15',
    status: 'draft',
  },
  {
    id: 7,
    number: 'QT-2026-007',
    client: 'CV Prima Utama',
    subject: 'Data Migration Service',
    total: 'Rp 120.000.000',
    validUntil: '2026-08-10',
    status: 'expired',
  },
  {
    id: 8,
    number: 'QT-2026-008',
    client: 'PT Indo Digital',
    subject: 'Custom App Development',
    total: 'Rp 300.000.000',
    validUntil: '2026-07-05',
    status: 'rejected',
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
  if (item.value === 'view') router.push(`/crm/quotations/${row.id}`)
  if (item.value === 'edit') router.push(`/crm/quotations/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function statusVariant(s: string) {
  const map: Record<string, string> = {
    draft: 'secondary',
    sent: 'info',
    accepted: 'success',
    rejected: 'danger',
    expired: 'warning',
  }
  return (map[s] || 'secondary') as 'secondary' | 'info' | 'success' | 'danger' | 'warning'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Quotations</h1>
        <p class="text-gray-500 mt-1">Create and manage sales quotations.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/crm/quotations/create')"
        >Create Quotation</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="quotations"
        :searchable="true"
        search-placeholder="Search quotations..."
      >
        <template #cell-number="{ value }">
          <span class="font-mono text-sm font-medium">{{ value }}</span>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="statusVariant(value as string)" size="sm">{{ value }}</BaseBadge>
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

    <BaseModal v-model="showDeleteModal" title="Delete Quotation" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete <strong>{{ selected.number }}</strong
        >?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
