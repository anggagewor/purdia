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
  DropdownButton,
} from '@purdia/ui'
import { Plus, MoreHorizontal, Eye, Edit, Trash2, Building2, User, Upload } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selectedClient = ref<Record<string, unknown>>({})
const clientPage = ref(1)

const columns: TableColumn[] = [
  { key: 'name', label: 'Client', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Phone' },
  { key: 'contacts', label: 'Contacts', align: 'center' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const clients = ref([
  {
    id: 1,
    name: 'PT Teknologi Maju',
    type: 'company',
    email: 'info@teknomu.co.id',
    phone: '+62 21 5555 1234',
    contacts: 3,
    status: 'active',
    city: 'Jakarta',
  },
  {
    id: 2,
    name: 'CV Solusi Digital',
    type: 'company',
    email: 'hello@soldig.com',
    phone: '+62 21 5555 5678',
    contacts: 2,
    status: 'active',
    city: 'Bandung',
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    type: 'individual',
    email: 'ahmad.fauzi@gmail.com',
    phone: '+62 812 3456 7890',
    contacts: 1,
    status: 'active',
    city: 'Surabaya',
  },
  {
    id: 4,
    name: 'PT Global Infra',
    type: 'company',
    email: 'contact@globalinfra.id',
    phone: '+62 21 7777 9999',
    contacts: 5,
    status: 'inactive',
    city: 'Jakarta',
  },
  {
    id: 5,
    name: 'Siti Rahayu',
    type: 'individual',
    email: 'siti.rahayu@outlook.com',
    phone: '+62 856 1234 5678',
    contacts: 1,
    status: 'active',
    city: 'Yogyakarta',
  },
  {
    id: 6,
    name: 'PT Karya Bersama',
    type: 'company',
    email: 'admin@karyabersama.co.id',
    phone: '+62 21 8888 4444',
    contacts: 4,
    status: 'active',
    city: 'Semarang',
  },
  {
    id: 7,
    name: 'Budi Santoso',
    type: 'individual',
    email: 'budi.s@yahoo.com',
    phone: '+62 878 9999 0000',
    contacts: 1,
    status: 'inactive',
    city: 'Medan',
  },
  {
    id: 8,
    name: 'PT Nusantara Tech',
    type: 'company',
    email: 'info@nusatech.io',
    phone: '+62 21 3333 2222',
    contacts: 6,
    status: 'active',
    city: 'Jakarta',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'View Detail', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selectedClient.value = row
  if (item.value === 'view') router.push(`/clients/${row.id}`)
  if (item.value === 'edit') router.push(`/clients/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Clients</h1>
        <p class="text-gray-500 mt-1">Manage company and individual clients.</p>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="outline" size="sm" :icon="Upload">Import</BaseButton>
        <BaseButton size="sm" :icon="Plus" @click="router.push('/clients/create')"
          >Add Client</BaseButton
        >
      </div>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="clients"
        :searchable="true"
        search-placeholder="Search clients..."
      >
        <template #cell-name="{ row, value }">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              :class="
                row.type === 'company'
                  ? 'bg-primary-50 text-primary-500'
                  : 'bg-emerald-50 text-emerald-500'
              "
            >
              <Building2 v-if="row.type === 'company'" class="w-4 h-4" />
              <User v-else class="w-4 h-4" />
            </div>
            <div>
              <span class="font-medium block">{{ value }}</span>
              <span class="text-xs text-gray-400">{{ row.city }}</span>
            </div>
          </div>
        </template>
        <template #cell-type="{ value }">
          <BaseBadge :variant="value === 'company' ? 'primary' : 'success'" size="sm" :pill="false">
            {{ value === 'company' ? 'Company' : 'Individual' }}
          </BaseBadge>
        </template>
        <template #cell-contacts="{ value }">
          <span class="text-sm text-gray-600">{{ value }}</span>
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
      <div class="px-4 py-3 border-t border-gray-200">
        <BasePagination
          v-model:current-page="clientPage"
          :total-pages="4"
          :total-items="36"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <!-- Delete Modal -->
    <BaseModal v-model="showDeleteModal" title="Delete Client" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{{ selectedClient.name }}</strong
        >? All associated contacts will also be removed.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
