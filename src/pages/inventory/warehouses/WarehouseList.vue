<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseBadge,
  BaseModal,
  DropdownButton,
} from '@purdia/ui'
import { Plus, MoreHorizontal, Edit, Trash2, MapPin } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})

const columns: TableColumn[] = [
  { key: 'name', label: 'Warehouse', sortable: true },
  { key: 'location', label: 'Location' },
  { key: 'manager', label: 'Manager' },
  { key: 'capacity', label: 'Capacity', align: 'center' },
  { key: 'items', label: 'Items', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const warehouses = ref([
  {
    id: 1,
    name: 'Gudang Utama',
    location: 'Jakarta Selatan',
    manager: 'Budi Santoso',
    capacity: '5,000 m²',
    items: 580,
    status: 'active',
  },
  {
    id: 2,
    name: 'Gudang Jakarta',
    location: 'Jakarta Utara',
    manager: 'Rina Wati',
    capacity: '3,000 m²',
    items: 320,
    status: 'active',
  },
  {
    id: 3,
    name: 'Gudang Bandung',
    location: 'Bandung',
    manager: 'Andi Wijaya',
    capacity: '2,000 m²',
    items: 210,
    status: 'active',
  },
  {
    id: 4,
    name: 'Gudang Surabaya',
    location: 'Surabaya',
    manager: 'Dewi Lestari',
    capacity: '2,500 m²',
    items: 138,
    status: 'active',
  },
  {
    id: 5,
    name: 'Gudang Semarang',
    location: 'Semarang',
    manager: 'Hasan Basri',
    capacity: '1,500 m²',
    items: 0,
    status: 'inactive',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/inventory/warehouses/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Warehouses</h1>
        <p class="text-gray-500 mt-1">Manage your warehouse locations.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/inventory/warehouses/create')"
        >Add Warehouse</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="warehouses"
        :searchable="true"
        search-placeholder="Search warehouses..."
      >
        <template #cell-name="{ row, value }">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"
            >
              <MapPin class="w-4 h-4" />
            </div>
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="value === 'active' ? 'success' : 'secondary'"
            :dot="true"
            size="sm"
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
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Warehouse" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{{ selected.name }}</strong
        >?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
