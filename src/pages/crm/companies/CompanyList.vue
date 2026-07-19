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
import { Plus, MoreHorizontal, Eye, Edit, Trash2, Building2 } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selected = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'name', label: 'Company', sortable: true },
  { key: 'industry', label: 'Industry' },
  { key: 'city', label: 'City' },
  { key: 'employees', label: 'Employees', align: 'center' },
  { key: 'revenue', label: 'Annual Revenue' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const companies = ref([
  {
    id: 1,
    name: 'PT Teknologi Maju',
    industry: 'Technology',
    city: 'Jakarta',
    employees: 150,
    revenue: 'Rp 25B',
    status: 'active',
  },
  {
    id: 2,
    name: 'CV Solusi Digital',
    industry: 'IT Services',
    city: 'Bandung',
    employees: 45,
    revenue: 'Rp 8B',
    status: 'active',
  },
  {
    id: 3,
    name: 'PT Global Infra',
    industry: 'Infrastructure',
    city: 'Jakarta',
    employees: 320,
    revenue: 'Rp 50B',
    status: 'active',
  },
  {
    id: 4,
    name: 'PT Nusantara Tech',
    industry: 'Technology',
    city: 'Surabaya',
    employees: 85,
    revenue: 'Rp 12B',
    status: 'active',
  },
  {
    id: 5,
    name: 'PT Karya Bersama',
    industry: 'Manufacturing',
    city: 'Semarang',
    employees: 200,
    revenue: 'Rp 35B',
    status: 'inactive',
  },
  {
    id: 6,
    name: 'CV Prima Utama',
    industry: 'Retail',
    city: 'Yogyakarta',
    employees: 30,
    revenue: 'Rp 5B',
    status: 'active',
  },
  {
    id: 7,
    name: 'PT Sentosa Group',
    industry: 'Finance',
    city: 'Jakarta',
    employees: 500,
    revenue: 'Rp 100B',
    status: 'active',
  },
  {
    id: 8,
    name: 'PT Indo Digital',
    industry: 'Digital Media',
    city: 'Jakarta',
    employees: 60,
    revenue: 'Rp 10B',
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
  if (item.value === 'view') router.push(`/crm/companies/${row.id}`)
  if (item.value === 'edit') router.push(`/crm/companies/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Companies</h1>
        <p class="text-gray-500 mt-1">Manage company records in your CRM.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/crm/companies/create')"
        >Add Company</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="companies"
        :searchable="true"
        search-placeholder="Search companies..."
      >
        <template #cell-name="{ row, value }">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center shrink-0"
            >
              <Building2 class="w-4 h-4" />
            </div>
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

    <BaseModal v-model="showDeleteModal" title="Delete Company" size="sm">
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
