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
const selectedLead = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'company', label: 'Company', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'source', label: 'Source' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const leads = ref([
  {
    id: 1,
    name: 'Andi Pratama',
    company: 'PT Maju Jaya',
    email: 'andi@majujaya.co.id',
    phone: '+62 812 1111 2222',
    source: 'Website',
    status: 'new',
  },
  {
    id: 2,
    name: 'Dewi Lestari',
    company: 'CV Berkah Abadi',
    email: 'dewi@berkah.com',
    phone: '+62 813 3333 4444',
    source: 'Referral',
    status: 'contacted',
  },
  {
    id: 3,
    name: 'Rudi Hermawan',
    company: 'PT Sentosa Group',
    email: 'rudi@sentosa.id',
    phone: '+62 856 5555 6666',
    source: 'LinkedIn',
    status: 'qualified',
  },
  {
    id: 4,
    name: 'Maya Sari',
    company: 'PT Indo Digital',
    email: 'maya@indodigital.com',
    phone: '+62 878 7777 8888',
    source: 'Cold Call',
    status: 'new',
  },
  {
    id: 5,
    name: 'Bambang Widodo',
    company: 'CV Cahaya Mandiri',
    email: 'bambang@cahaya.co.id',
    phone: '+62 821 9999 0000',
    source: 'Trade Show',
    status: 'proposal',
  },
  {
    id: 6,
    name: 'Siska Amelia',
    company: 'PT Tech Solutions',
    email: 'siska@techsol.id',
    phone: '+62 838 1234 5678',
    source: 'Website',
    status: 'contacted',
  },
  {
    id: 7,
    name: 'Hendra Gunawan',
    company: 'PT Nusa Karya',
    email: 'hendra@nusakarya.com',
    phone: '+62 857 8765 4321',
    source: 'Referral',
    status: 'qualified',
  },
  {
    id: 8,
    name: 'Linda Susanti',
    company: 'CV Prima Utama',
    email: 'linda@primautama.id',
    phone: '+62 819 2468 1357',
    source: 'Social Media',
    status: 'lost',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'View Detail', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selectedLead.value = row
  if (item.value === 'view') router.push(`/crm/leads/${row.id}`)
  if (item.value === 'edit') router.push(`/crm/leads/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function statusVariant(status: string) {
  const map: Record<string, string> = {
    new: 'info',
    contacted: 'warning',
    qualified: 'success',
    proposal: 'primary',
    lost: 'danger',
  }
  return (map[status] || 'secondary') as
    | 'info'
    | 'warning'
    | 'success'
    | 'primary'
    | 'danger'
    | 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Leads</h1>
        <p class="text-gray-500 mt-1">Manage and track your sales leads.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/crm/leads/create')"
        >Add Lead</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="leads"
        :searchable="true"
        search-placeholder="Search leads..."
      >
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

    <BaseModal v-model="showDeleteModal" title="Delete Lead" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Are you sure you want to delete <strong>{{ selectedLead.name }}</strong
        >?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
