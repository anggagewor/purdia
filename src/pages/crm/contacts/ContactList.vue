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
import { Plus, MoreHorizontal, Eye, Edit, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'company', label: 'Company' },
  { key: 'position', label: 'Position' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const contacts = ref([
  {
    id: 1,
    name: 'Andi Pratama',
    company: 'PT Teknologi Maju',
    position: 'CTO',
    email: 'andi@teknomu.co.id',
    phone: '+62 812 1111 2222',
    status: 'active',
  },
  {
    id: 2,
    name: 'Dewi Lestari',
    company: 'CV Solusi Digital',
    position: 'CEO',
    email: 'dewi@soldig.com',
    phone: '+62 813 3333 4444',
    status: 'active',
  },
  {
    id: 3,
    name: 'Rudi Hermawan',
    company: 'PT Global Infra',
    position: 'Procurement Manager',
    email: 'rudi@globalinfra.id',
    phone: '+62 856 5555 6666',
    status: 'active',
  },
  {
    id: 4,
    name: 'Maya Sari',
    company: 'PT Nusantara Tech',
    position: 'VP Engineering',
    email: 'maya@nusatech.io',
    phone: '+62 878 7777 8888',
    status: 'inactive',
  },
  {
    id: 5,
    name: 'Bambang Widodo',
    company: 'PT Karya Bersama',
    position: 'Director',
    email: 'bambang@karyabersama.co.id',
    phone: '+62 821 9999 0000',
    status: 'active',
  },
  {
    id: 6,
    name: 'Siska Amelia',
    company: 'PT Sentosa Group',
    position: 'Finance Manager',
    email: 'siska@sentosa.id',
    phone: '+62 838 1234 5678',
    status: 'active',
  },
  {
    id: 7,
    name: 'Hendra Gunawan',
    company: 'CV Prima Utama',
    position: 'Owner',
    email: 'hendra@primautama.id',
    phone: '+62 857 8765 4321',
    status: 'active',
  },
  {
    id: 8,
    name: 'Linda Susanti',
    company: 'PT Indo Digital',
    position: 'Marketing Head',
    email: 'linda@indodigital.com',
    phone: '+62 819 2468 1357',
    status: 'inactive',
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
  if (item.value === 'view') router.push(`/crm/contacts/${row.id}`)
  if (item.value === 'edit') router.push(`/crm/contacts/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Contacts</h1>
        <p class="text-gray-500 mt-1">Manage your CRM contacts.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/crm/contacts/create')"
        >Add Contact</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="contacts"
        :searchable="true"
        search-placeholder="Search contacts..."
      >
        <template #cell-name="{ row, value }">
          <div class="flex items-center gap-2">
            <BaseAvatar :name="value as string" size="sm" />
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge
            :variant="value === 'active' ? 'success' : 'secondary'"
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

    <BaseModal v-model="showDeleteModal" title="Delete Contact" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
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
