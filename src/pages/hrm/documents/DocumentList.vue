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
  { key: 'title', label: 'Title', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'employee', label: 'Employee' },
  { key: 'uploadDate', label: 'Upload Date', sortable: true },
  { key: 'expiryDate', label: 'Expiry Date' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const documents = ref([
  {
    id: 1,
    title: 'Kontrak Kerja 2026',
    type: 'contract',
    employee: 'Andi Pratama',
    uploadDate: '2026-01-15',
    expiryDate: '2027-01-15',
    status: 'active',
  },
  {
    id: 2,
    title: 'Sertifikat PMP',
    type: 'certificate',
    employee: 'Dewi Lestari',
    uploadDate: '2025-06-10',
    expiryDate: '2028-06-10',
    status: 'active',
  },
  {
    id: 3,
    title: 'KTP Scan',
    type: 'id-card',
    employee: 'Rudi Hermawan',
    uploadDate: '2024-03-20',
    expiryDate: '-',
    status: 'active',
  },
  {
    id: 4,
    title: 'Surat Peringatan',
    type: 'letter',
    employee: 'Bambang Widodo',
    uploadDate: '2025-11-05',
    expiryDate: '-',
    status: 'archived',
  },
  {
    id: 5,
    title: 'Kebijakan Cuti 2026',
    type: 'policy',
    employee: 'Maya Sari',
    uploadDate: '2026-01-02',
    expiryDate: '2026-12-31',
    status: 'active',
  },
  {
    id: 6,
    title: 'Kontrak Magang',
    type: 'contract',
    employee: 'Siska Amelia',
    uploadDate: '2026-02-01',
    expiryDate: '2026-05-31',
    status: 'expired',
  },
  {
    id: 7,
    title: 'Sertifikat AWS',
    type: 'certificate',
    employee: 'Hendra Gunawan',
    uploadDate: '2024-09-12',
    expiryDate: '2025-09-12',
    status: 'expired',
  },
  {
    id: 8,
    title: 'Surat Referensi',
    type: 'letter',
    employee: 'Linda Susanti',
    uploadDate: '2026-03-18',
    expiryDate: '-',
    status: 'active',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/hrm/documents/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function typeVariant(type: string) {
  const map: Record<string, string> = {
    contract: 'primary',
    certificate: 'success',
    'id-card': 'info',
    letter: 'warning',
    policy: 'secondary',
  }
  return (map[type] || 'secondary') as 'primary' | 'success' | 'info' | 'warning' | 'secondary'
}

function statusVariant(status: string) {
  const map: Record<string, string> = {
    active: 'success',
    expired: 'danger',
    archived: 'secondary',
  }
  return (map[status] || 'secondary') as 'success' | 'danger' | 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Documents</h1>
        <p class="text-gray-500 mt-1">Manage employee documents and files.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/documents/create')"
        >Add Document</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="documents"
        :searchable="true"
        search-placeholder="Search documents..."
      >
        <template #cell-type="{ value }">
          <BaseBadge :variant="typeVariant(value as string)" size="sm">{{ value }}</BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="statusVariant(value as string)" size="sm" :dot="true">{{
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
          :total-items="24"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Document" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete this document?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
