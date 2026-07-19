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
  { key: 'name', label: 'Deal', sortable: true },
  { key: 'company', label: 'Company' },
  { key: 'value', label: 'Value', sortable: true },
  { key: 'stage', label: 'Stage', align: 'center' },
  { key: 'probability', label: 'Probability', align: 'center' },
  { key: 'closeDate', label: 'Close Date' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const deals = ref([
  {
    id: 1,
    name: 'Enterprise License',
    company: 'PT Teknologi Maju',
    value: 'Rp 150.000.000',
    stage: 'negotiation',
    probability: 75,
    closeDate: '2026-08-15',
    owner: 'Andi',
  },
  {
    id: 2,
    name: 'Consulting Project',
    company: 'CV Solusi Digital',
    value: 'Rp 85.000.000',
    stage: 'proposal',
    probability: 50,
    closeDate: '2026-08-30',
    owner: 'Dewi',
  },
  {
    id: 3,
    name: 'SaaS Subscription',
    company: 'PT Global Infra',
    value: 'Rp 45.000.000',
    stage: 'qualification',
    probability: 30,
    closeDate: '2026-09-10',
    owner: 'Rudi',
  },
  {
    id: 4,
    name: 'Implementation',
    company: 'PT Nusantara Tech',
    value: 'Rp 200.000.000',
    stage: 'closed-won',
    probability: 100,
    closeDate: '2026-07-01',
    owner: 'Maya',
  },
  {
    id: 5,
    name: 'Support Contract',
    company: 'PT Karya Bersama',
    value: 'Rp 60.000.000',
    stage: 'proposal',
    probability: 60,
    closeDate: '2026-08-20',
    owner: 'Bambang',
  },
  {
    id: 6,
    name: 'Training Package',
    company: 'PT Sentosa Group',
    value: 'Rp 35.000.000',
    stage: 'qualification',
    probability: 25,
    closeDate: '2026-09-30',
    owner: 'Siska',
  },
  {
    id: 7,
    name: 'Data Migration',
    company: 'CV Prima Utama',
    value: 'Rp 120.000.000',
    stage: 'negotiation',
    probability: 80,
    closeDate: '2026-08-05',
    owner: 'Hendra',
  },
  {
    id: 8,
    name: 'Custom Development',
    company: 'PT Indo Digital',
    value: 'Rp 300.000.000',
    stage: 'closed-lost',
    probability: 0,
    closeDate: '2026-06-15',
    owner: 'Linda',
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
  if (item.value === 'view') router.push(`/crm/deals/${row.id}`)
  if (item.value === 'edit') router.push(`/crm/deals/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function stageVariant(stage: string) {
  const map: Record<string, string> = {
    qualification: 'warning',
    proposal: 'info',
    negotiation: 'primary',
    'closed-won': 'success',
    'closed-lost': 'danger',
  }
  return (map[stage] || 'secondary') as
    | 'warning'
    | 'info'
    | 'primary'
    | 'success'
    | 'danger'
    | 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Deals</h1>
        <p class="text-gray-500 mt-1">Track and manage your sales pipeline.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/crm/deals/create')"
        >Add Deal</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="deals"
        :searchable="true"
        search-placeholder="Search deals..."
      >
        <template #cell-stage="{ value }">
          <BaseBadge :variant="stageVariant(value as string)" size="sm">{{
            (value as string).replace('-', ' ')
          }}</BaseBadge>
        </template>
        <template #cell-probability="{ value }">
          <span class="text-sm font-medium">{{ value }}%</span>
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

    <BaseModal v-model="showDeleteModal" title="Delete Deal" size="sm">
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
