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
  BasePagination,
  DropdownButton,
} from '@purdia/ui'
import { Plus, MoreHorizontal, Edit, Trash2, Package, ArrowUpDown } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const stockPage = ref(1)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showAdjustModal = ref(false)
const selectedProduct = ref<Record<string, unknown>>({})

const columns: TableColumn[] = [
  { key: 'name', label: 'Product', sortable: true },
  { key: 'sku', label: 'SKU' },
  { key: 'category', label: 'Category' },
  { key: 'price', label: 'Price', align: 'right', sortable: true },
  { key: 'stock', label: 'Stock', align: 'center', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const products = ref([
  {
    id: 1,
    name: 'Kopi Susu Gula Aren',
    sku: 'BEV-001',
    category: 'Beverages',
    price: 25000,
    stock: 50,
    minStock: 10,
    status: 'in-stock',
  },
  {
    id: 2,
    name: 'Americano',
    sku: 'BEV-002',
    category: 'Beverages',
    price: 22000,
    stock: 40,
    minStock: 10,
    status: 'in-stock',
  },
  {
    id: 3,
    name: 'Nasi Goreng Spesial',
    sku: 'FOD-001',
    category: 'Food',
    price: 30000,
    stock: 5,
    minStock: 10,
    status: 'low-stock',
  },
  {
    id: 4,
    name: 'Mie Ayam Bakso',
    sku: 'FOD-002',
    category: 'Food',
    price: 20000,
    stock: 30,
    minStock: 10,
    status: 'in-stock',
  },
  {
    id: 5,
    name: 'French Fries',
    sku: 'SNK-001',
    category: 'Snacks',
    price: 15000,
    stock: 0,
    minStock: 10,
    status: 'out-of-stock',
  },
  {
    id: 6,
    name: 'Es Teh Manis',
    sku: 'BEV-003',
    category: 'Beverages',
    price: 10000,
    stock: 100,
    minStock: 20,
    status: 'in-stock',
  },
  {
    id: 7,
    name: 'Roti Bakar Coklat',
    sku: 'FOD-003',
    category: 'Food',
    price: 18000,
    stock: 3,
    minStock: 5,
    status: 'low-stock',
  },
  {
    id: 8,
    name: 'Chicken Wings',
    sku: 'SNK-002',
    category: 'Snacks',
    price: 28000,
    stock: 18,
    minStock: 5,
    status: 'in-stock',
  },
])

const categoryOptions: SelectOption[] = [
  { label: 'Beverages', value: 'Beverages' },
  { label: 'Food', value: 'Food' },
  { label: 'Snacks', value: 'Snacks' },
]

const formName = ref('')
const formSku = ref('')
const formCategory = ref<string | number>('')
const formPrice = ref<number>(0)
const formStock = ref<number>(0)
const formMinStock = ref<number>(10)
const adjustQty = ref<number>(0)
const adjustNote = ref('')

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { label: 'Adjust Stock', icon: ArrowUpDown, value: 'adjust' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selectedProduct.value = row
  if (item.value === 'edit') {
    formName.value = row.name as string
    formSku.value = row.sku as string
    formCategory.value = row.category as string
    formPrice.value = row.price as number
    formStock.value = row.stock as number
    formMinStock.value = row.minStock as number
    showEditModal.value = true
  }
  if (item.value === 'adjust') {
    adjustQty.value = 0
    adjustNote.value = ''
    showAdjustModal.value = true
  }
}

function getStatusVariant(status: string) {
  const map: Record<string, 'success' | 'warning' | 'danger'> = {
    'in-stock': 'success',
    'low-stock': 'warning',
    'out-of-stock': 'danger',
  }
  return map[status] || ('secondary' as any)
}

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Stock Management</h1>
        <p class="text-gray-500 mt-1">Manage product inventory and stock levels.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="showCreateModal = true">Add Product</BaseButton>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="products"
        :searchable="true"
        search-placeholder="Search products..."
      >
        <template #cell-name="{ value }">
          <div class="flex items-center gap-2">
            <Package class="w-4 h-4 text-gray-400" />
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-sku="{ value }">
          <code
            class="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono dark:bg-gray-700 dark:text-gray-300"
            >{{ value }}</code
          >
        </template>
        <template #cell-category="{ value }">
          <BaseBadge variant="secondary" size="sm" :pill="false">{{ value }}</BaseBadge>
        </template>
        <template #cell-price="{ value }">
          <span class="font-mono text-sm">{{ formatRp(value as number) }}</span>
        </template>
        <template #cell-stock="{ value, row }">
          <span
            class="font-semibold"
            :class="
              (value as number) === 0
                ? 'text-red-500'
                : (value as number) <= (row.minStock as number)
                  ? 'text-amber-500'
                  : 'text-gray-700'
            "
            >{{ value }}</span
          >
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" :dot="true" size="sm">
            {{ (value as string).replace('-', ' ') }}
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
          v-model:current-page="stockPage"
          :total-pages="3"
          :total-items="28"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <!-- Create Modal -->
    <BaseModal v-model="showCreateModal" title="Add Product" size="md">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="formName" label="Product Name" placeholder="e.g. Cappuccino" />
          <BaseInput v-model="formSku" label="SKU" placeholder="e.g. BEV-004" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseSelect
            v-model="formCategory"
            label="Category"
            :options="categoryOptions"
            placeholder="Select..."
          />
          <BaseInput v-model.number="formPrice" label="Price (Rp)" type="number" placeholder="0" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model.number="formStock"
            label="Initial Stock"
            type="number"
            placeholder="0"
          />
          <BaseInput
            v-model.number="formMinStock"
            label="Min Stock Alert"
            type="number"
            placeholder="10"
          />
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showCreateModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showCreateModal = false">Add Product</BaseButton>
      </template>
    </BaseModal>

    <!-- Edit Modal -->
    <BaseModal v-model="showEditModal" title="Edit Product" size="md">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="formName" label="Product Name" />
          <BaseInput v-model="formSku" label="SKU" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseSelect v-model="formCategory" label="Category" :options="categoryOptions" />
          <BaseInput v-model.number="formPrice" label="Price (Rp)" type="number" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model.number="formStock" label="Current Stock" type="number" />
          <BaseInput v-model.number="formMinStock" label="Min Stock Alert" type="number" />
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showEditModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showEditModal = false">Save</BaseButton>
      </template>
    </BaseModal>

    <!-- Adjust Stock Modal -->
    <BaseModal v-model="showAdjustModal" title="Adjust Stock" size="sm">
      <div class="space-y-4">
        <p class="text-sm text-gray-600">
          Adjusting stock for: <strong>{{ selectedProduct.name }}</strong>
        </p>
        <p class="text-sm text-gray-500">
          Current stock: <strong>{{ selectedProduct.stock }}</strong>
        </p>
        <BaseInput
          v-model.number="adjustQty"
          label="Adjustment (+ or -)"
          type="number"
          placeholder="e.g. +10 or -5"
          hint="Positive to add, negative to reduce"
        />
        <BaseInput v-model="adjustNote" label="Note" placeholder="Reason for adjustment..." />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showAdjustModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showAdjustModal = false">Adjust</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
