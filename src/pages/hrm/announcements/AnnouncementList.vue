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
  { key: 'postedBy', label: 'Posted By' },
  { key: 'postedDate', label: 'Posted Date', sortable: true },
  { key: 'expiryDate', label: 'Expiry Date' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const announcements = ref([
  {
    id: 1,
    title: 'Jadwal Libur Lebaran 2026',
    type: 'general',
    postedBy: 'HR Admin',
    postedDate: '2026-06-01',
    expiryDate: '2026-07-15',
    status: 'active',
  },
  {
    id: 2,
    title: 'Perubahan Kebijakan Cuti',
    type: 'policy',
    postedBy: 'Andi Pratama',
    postedDate: '2026-06-15',
    expiryDate: '2026-12-31',
    status: 'active',
  },
  {
    id: 3,
    title: 'Family Gathering 2026',
    type: 'event',
    postedBy: 'HR Admin',
    postedDate: '2026-07-01',
    expiryDate: '2026-08-15',
    status: 'active',
  },
  {
    id: 4,
    title: 'Pemadaman Server Maintenance',
    type: 'urgent',
    postedBy: 'IT Department',
    postedDate: '2026-07-10',
    expiryDate: '2026-07-12',
    status: 'expired',
  },
  {
    id: 5,
    title: 'Program Pelatihan Q3',
    type: 'general',
    postedBy: 'Dewi Lestari',
    postedDate: '2026-07-05',
    expiryDate: '2026-09-30',
    status: 'active',
  },
  {
    id: 6,
    title: 'Peraturan Dress Code Baru',
    type: 'policy',
    postedBy: 'HR Admin',
    postedDate: '2026-07-08',
    expiryDate: '2027-01-01',
    status: 'draft',
  },
  {
    id: 7,
    title: 'Lomba HUT RI ke-81',
    type: 'event',
    postedBy: 'Maya Sari',
    postedDate: '2026-07-12',
    expiryDate: '2026-08-17',
    status: 'active',
  },
  {
    id: 8,
    title: 'Pengumuman THR 2025',
    type: 'general',
    postedBy: 'Finance Dept',
    postedDate: '2025-03-15',
    expiryDate: '2025-04-01',
    status: 'expired',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/hrm/announcements/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function typeVariant(type: string) {
  const map: Record<string, string> = {
    general: 'info',
    policy: 'primary',
    event: 'success',
    urgent: 'danger',
  }
  return (map[type] || 'secondary') as 'info' | 'primary' | 'success' | 'danger'
}

function statusVariant(status: string) {
  const map: Record<string, string> = {
    active: 'success',
    expired: 'danger',
    draft: 'warning',
  }
  return (map[status] || 'secondary') as 'success' | 'danger' | 'warning'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Announcements</h1>
        <p class="text-gray-500 mt-1">Manage company-wide announcements.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/announcements/create')"
        >Add Announcement</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="announcements"
        :searchable="true"
        search-placeholder="Search announcements..."
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

    <BaseModal v-model="showDeleteModal" title="Delete Announcement" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete this announcement?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
