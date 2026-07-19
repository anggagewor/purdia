<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BaseCard,
  BaseTable,
  BaseButton,
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
  { key: 'name', label: 'Department', sortable: true },
  { key: 'head', label: 'Head' },
  { key: 'employees', label: 'Employees', align: 'center' },
  { key: 'budget', label: 'Budget' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const departments = ref([
  { id: 1, name: 'Engineering', head: 'Andi Pratama', employees: 25, budget: 'Rp 500M' },
  { id: 2, name: 'Marketing', head: 'Dewi Lestari', employees: 12, budget: 'Rp 200M' },
  { id: 3, name: 'Finance', head: 'Nadia Putri', employees: 8, budget: 'Rp 150M' },
  { id: 4, name: 'Human Resources', head: 'Siska Amelia', employees: 6, budget: 'Rp 100M' },
  { id: 5, name: 'Operations', head: 'Bambang Widodo', employees: 18, budget: 'Rp 350M' },
  { id: 6, name: 'Sales', head: 'Linda Susanti', employees: 15, budget: 'Rp 250M' },
  { id: 7, name: 'Customer Support', head: 'Farhan Rizky', employees: 10, budget: 'Rp 120M' },
  { id: 8, name: 'Product', head: 'Maya Sari', employees: 8, budget: 'Rp 180M' },
])

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selected.value = row
  if (item.value === 'edit') router.push(`/hrm/departments/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Departments</h1>
        <p class="text-gray-500 mt-1">Manage organizational departments.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/hrm/departments/create')"
        >Add Department</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="departments"
        :searchable="true"
        search-placeholder="Search departments..."
      >
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
          :total-pages="2"
          :total-items="8"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Department" size="sm">
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
