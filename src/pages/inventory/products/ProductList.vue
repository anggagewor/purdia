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
import { Plus, MoreHorizontal, Eye, Edit, Trash2, Package, Upload } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const showDeleteModal = ref(false)
const selectedProduct = ref<Record<string, unknown>>({})
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'name', label: 'Product', sortable: true },
  { key: 'sku', label: 'SKU', sortable: true },
  { key: 'category', label: 'Category' },
  { key: 'stock', label: 'Stock', align: 'center', sortable: true },
  { key: 'price', label: 'Price', align: 'right', sortable: true },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const products = ref([
  {
    id: 1,
    name: 'Laptop Dell XPS 15',
    sku: 'ELC-001',
    category: 'Electronics',
    stock: 45,
    price: 'Rp 25.000.000',
    status: 'active',
    warehouse: 'Gudang Utama',
  },
  {
    id: 2,
    name: 'Mouse Logitech MX Master 3',
    sku: 'ELC-002',
    category: 'Electronics',
    stock: 120,
    price: 'Rp 1.500.000',
    status: 'active',
    warehouse: 'Gudang Jakarta',
  },
  {
    id: 3,
    name: 'Keyboard Mechanical K2 Pro',
    sku: 'ELC-003',
    category: 'Electronics',
    stock: 5,
    price: 'Rp 2.200.000',
    status: 'low_stock',
    warehouse: 'Gudang Bandung',
  },
  {
    id: 4,
    name: 'Monitor LG UltraWide 34"',
    sku: 'ELC-004',
    category: 'Electronics',
    stock: 30,
    price: 'Rp 8.500.000',
    status: 'active',
    warehouse: 'Gudang Utama',
  },
  {
    id: 5,
    name: 'USB-C Hub Anker 7-in-1',
    sku: 'ACC-001',
    category: 'Accessories',
    stock: 200,
    price: 'Rp 750.000',
    status: 'active',
    warehouse: 'Gudang Surabaya',
  },
  {
    id: 6,
    name: 'Webcam Logitech C920',
    sku: 'ELC-005',
    category: 'Electronics',
    stock: 0,
    price: 'Rp 1.200.000',
    status: 'out_of_stock',
    warehouse: 'Gudang Jakarta',
  },
  {
    id: 7,
    name: 'Headset Sony WH-1000XM5',
    sku: 'ELC-006',
    category: 'Electronics',
    stock: 18,
    price: 'Rp 5.500.000',
    status: 'active',
    warehouse: 'Gudang Utama',
  },
  {
    id: 8,
    name: 'SSD Samsung 1TB',
    sku: 'STR-001',
    category: 'Storage',
    stock: 75,
    price: 'Rp 1.800.000',
    status: 'active',
    warehouse: 'Gudang Bandung',
  },
  {
    id: 9,
    name: 'RAM DDR5 32GB Kit',
    sku: 'CMP-001',
    category: 'Components',
    stock: 3,
    price: 'Rp 3.200.000',
    status: 'low_stock',
    warehouse: 'Gudang Utama',
  },
  {
    id: 10,
    name: 'Cable HDMI 2.1 3M',
    sku: 'ACC-002',
    category: 'Accessories',
    stock: 500,
    price: 'Rp 250.000',
    status: 'active',
    warehouse: 'Gudang Surabaya',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'View Detail', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selectedProduct.value = row
  if (item.value === 'view') router.push(`/inventory/products/${row.id}`)
  if (item.value === 'edit') router.push(`/inventory/products/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}

function getStatusVariant(status: string) {
  if (status === 'active') return 'success'
  if (status === 'low_stock') return 'warning'
  return 'danger'
}

function getStatusLabel(status: string) {
  if (status === 'active') return 'In Stock'
  if (status === 'low_stock') return 'Low Stock'
  return 'Out of Stock'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Products</h1>
        <p class="text-gray-500 mt-1">Manage your inventory products and stock levels.</p>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="outline" size="sm" :icon="Upload">Import</BaseButton>
        <BaseButton size="sm" :icon="Plus" @click="router.push('/inventory/products/create')"
          >Add Product</BaseButton
        >
      </div>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="products"
        :searchable="true"
        search-placeholder="Search products..."
      >
        <template #cell-name="{ row, value }">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center shrink-0"
            >
              <Package class="w-4 h-4" />
            </div>
            <div>
              <span class="font-medium block">{{ value }}</span>
              <span class="text-xs text-gray-400">{{ row.warehouse }}</span>
            </div>
          </div>
        </template>
        <template #cell-sku="{ value }">
          <span class="font-mono text-xs text-gray-600 dark:text-gray-400">{{ value }}</span>
        </template>
        <template #cell-category="{ value }">
          <BaseBadge variant="secondary" size="sm" :pill="false">{{ value }}</BaseBadge>
        </template>
        <template #cell-stock="{ value }">
          <span
            class="text-sm font-medium"
            :class="
              (value as number) <= 5
                ? 'text-red-500'
                : (value as number) <= 20
                  ? 'text-amber-500'
                  : 'text-gray-700 dark:text-gray-300'
            "
          >
            {{ value }}
          </span>
        </template>
        <template #cell-price="{ value }">
          <span class="text-sm text-gray-700 dark:text-gray-300">{{ value }}</span>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" :dot="true" size="sm">{{
            getStatusLabel(value as string)
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
          :total-pages="5"
          :total-items="48"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <BaseModal v-model="showDeleteModal" title="Delete Product" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{{ selectedProduct.name }}</strong
        >? This action cannot be undone.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
