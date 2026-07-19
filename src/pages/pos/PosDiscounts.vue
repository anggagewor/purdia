<script setup lang="ts">
import { ref } from 'vue'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseBadge,
  BaseModal,
  BaseInput,
  BaseSelect,
  BaseToggle,
  BasePagination,
  DropdownButton,
} from '@purdia/ui'
import { Plus, MoreHorizontal, Edit, Trash2, Percent, Tag } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const discPage = ref(1)
const showCreateModal = ref(false)
const showEditModal = ref(false)

const columns: TableColumn[] = [
  { key: 'name', label: 'Discount Name', sortable: true },
  { key: 'type', label: 'Type' },
  { key: 'value', label: 'Value', align: 'right' },
  { key: 'minOrder', label: 'Min. Order', align: 'right' },
  { key: 'validUntil', label: 'Valid Until', sortable: true },
  { key: 'active', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const discounts = ref([
  {
    id: 1,
    name: 'New Member',
    code: 'NEWMEMBER',
    type: 'percent',
    value: 10,
    minOrder: 50000,
    validUntil: '2025-12-31',
    active: true,
    usageCount: 45,
  },
  {
    id: 2,
    name: 'Weekend Special',
    code: 'WEEKEND20',
    type: 'percent',
    value: 20,
    minOrder: 100000,
    validUntil: '2025-08-31',
    active: true,
    usageCount: 128,
  },
  {
    id: 3,
    name: 'Flat 5K Off',
    code: 'FLAT5K',
    type: 'nominal',
    value: 5000,
    minOrder: 25000,
    validUntil: '2025-09-30',
    active: true,
    usageCount: 320,
  },
  {
    id: 4,
    name: 'Loyal Customer',
    code: 'LOYAL15',
    type: 'percent',
    value: 15,
    minOrder: 75000,
    validUntil: '2025-07-31',
    active: false,
    usageCount: 89,
  },
  {
    id: 5,
    name: 'Grand Opening',
    code: 'GRAND50K',
    type: 'nominal',
    value: 50000,
    minOrder: 200000,
    validUntil: '2025-07-15',
    active: false,
    usageCount: 56,
  },
  {
    id: 6,
    name: 'Flash Sale 30%',
    code: 'FLASH30',
    type: 'percent',
    value: 30,
    minOrder: 150000,
    validUntil: '2025-07-20',
    active: true,
    usageCount: 23,
  },
])

const typeOptions: SelectOption[] = [
  { label: 'Percentage (%)', value: 'percent' },
  { label: 'Nominal (Rp)', value: 'nominal' },
]

const formName = ref('')
const formCode = ref('')
const formType = ref<string | number>('percent')
const formValue = ref<number>(0)
const formMinOrder = ref<number>(0)
const formValidUntil = ref('')
const formActive = ref(true)

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  if (item.value === 'edit') {
    formName.value = row.name as string
    formCode.value = row.code as string
    formType.value = row.type as string
    formValue.value = row.value as number
    formMinOrder.value = row.minOrder as number
    formValidUntil.value = row.validUntil as string
    formActive.value = row.active as boolean
    showEditModal.value = true
  }
}

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

function openCreate() {
  formName.value = ''
  formCode.value = ''
  formType.value = 'percent'
  formValue.value = 0
  formMinOrder.value = 0
  formValidUntil.value = ''
  formActive.value = true
  showCreateModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Discounts</h1>
        <p class="text-gray-500 mt-1">Manage discount codes — percentage or nominal.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="openCreate">Add Discount</BaseButton>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="discounts"
        :searchable="true"
        search-placeholder="Search discounts..."
      >
        <template #cell-name="{ row, value }">
          <div>
            <span class="font-medium block">{{ value }}</span>
            <code class="text-[0.625rem] text-gray-400 font-mono">{{ row.code }}</code>
          </div>
        </template>
        <template #cell-type="{ value }">
          <BaseBadge :variant="value === 'percent' ? 'primary' : 'info'" size="sm" :pill="false">
            <Percent v-if="value === 'percent'" class="w-3 h-3" />
            <Tag v-else class="w-3 h-3" />
            {{ value === 'percent' ? 'Percent' : 'Nominal' }}
          </BaseBadge>
        </template>
        <template #cell-value="{ row }">
          <span class="font-semibold text-sm">
            {{ row.type === 'percent' ? `${row.value}%` : formatRp(row.value as number) }}
          </span>
        </template>
        <template #cell-minOrder="{ value }">
          <span class="font-mono text-sm text-gray-600">{{ formatRp(value as number) }}</span>
        </template>
        <template #cell-active="{ value }">
          <BaseBadge :variant="value ? 'success' : 'secondary'" :dot="true" size="sm">
            {{ value ? 'Active' : 'Inactive' }}
          </BaseBadge>
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
          v-model:current-page="discPage"
          :total-pages="2"
          :total-items="15"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <!-- Create Modal -->
    <BaseModal v-model="showCreateModal" title="Create Discount" size="md">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="formName" label="Discount Name" placeholder="e.g. Weekend Special" />
          <BaseInput v-model="formCode" label="Code" placeholder="e.g. WEEKEND20" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseSelect v-model="formType" label="Type" :options="typeOptions" :searchable="false" />
          <BaseInput
            v-model.number="formValue"
            :label="formType === 'percent' ? 'Value (%)' : 'Value (Rp)'"
            type="number"
            placeholder="0"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model.number="formMinOrder"
            label="Min. Order (Rp)"
            type="number"
            placeholder="0"
          />
          <BaseInput v-model="formValidUntil" label="Valid Until" type="date" />
        </div>
        <BaseToggle v-model="formActive" label="Active" />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showCreateModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showCreateModal = false">Create</BaseButton>
      </template>
    </BaseModal>

    <!-- Edit Modal -->
    <BaseModal v-model="showEditModal" title="Edit Discount" size="md">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="formName" label="Discount Name" />
          <BaseInput v-model="formCode" label="Code" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseSelect v-model="formType" label="Type" :options="typeOptions" :searchable="false" />
          <BaseInput
            v-model.number="formValue"
            :label="formType === 'percent' ? 'Value (%)' : 'Value (Rp)'"
            type="number"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model.number="formMinOrder" label="Min. Order (Rp)" type="number" />
          <BaseInput v-model="formValidUntil" label="Valid Until" type="date" />
        </div>
        <BaseToggle v-model="formActive" label="Active" />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showEditModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showEditModal = false">Save</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
