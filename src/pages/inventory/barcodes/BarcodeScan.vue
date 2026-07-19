<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseBadge } from '@purdia/ui'
import { ArrowLeft, ScanLine, Search, Package } from '@lucide/vue'

const router = useRouter()
const searchBarcode = ref('')
const scanResult = ref<any>(null)

const mockResults: Record<string, any> = {
  '8901234567001': {
    id: 1,
    name: 'Laptop Dell XPS 15',
    sku: 'ELC-001',
    stock: 45,
    warehouse: 'Gudang Utama',
    price: 'Rp 25.000.000',
    status: 'active',
  },
  '8901234567002': {
    id: 2,
    name: 'Mouse Logitech MX Master 3',
    sku: 'ELC-002',
    stock: 120,
    warehouse: 'Gudang Jakarta',
    price: 'Rp 1.500.000',
    status: 'active',
  },
  '8901234567003': {
    id: 3,
    name: 'Keyboard Mechanical K2 Pro',
    sku: 'ELC-003',
    stock: 5,
    warehouse: 'Gudang Bandung',
    price: 'Rp 2.200.000',
    status: 'low_stock',
  },
}

function handleSearch() {
  scanResult.value = mockResults[searchBarcode.value] || null
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') handleSearch()
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/inventory/barcodes')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Scan Barcode</h1>
        <p class="text-gray-500 mt-1">Scan or enter a barcode to look up product information.</p>
      </div>
    </div>

    <BaseCard>
      <div class="max-w-lg mx-auto space-y-6">
        <div class="flex flex-col items-center py-8">
          <div
            class="w-24 h-24 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center mb-4"
          >
            <ScanLine class="w-12 h-12" />
          </div>
          <p class="text-sm text-gray-500 text-center mb-6">
            Point your barcode scanner at a product, or manually enter the barcode below.
          </p>
          <div class="w-full flex gap-2">
            <BaseInput
              v-model="searchBarcode"
              placeholder="Enter barcode number (e.g. 8901234567001)"
              class="flex-1"
              @keydown="handleKeydown"
            />
            <BaseButton :icon="Search" @click="handleSearch">Lookup</BaseButton>
          </div>
          <p class="text-xs text-gray-400 mt-2">
            Try: 8901234567001, 8901234567002, or 8901234567003
          </p>
        </div>
      </div>
    </BaseCard>

    <!-- Scan Result -->
    <BaseCard v-if="scanResult">
      <div class="flex items-center gap-4">
        <div
          class="w-14 h-14 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center"
        >
          <Package class="w-7 h-7" />
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">{{ scanResult.name }}</h3>
          <p class="text-sm text-gray-500">
            SKU: {{ scanResult.sku }} | Barcode: {{ searchBarcode }}
          </p>
        </div>
        <BaseButton
          variant="outline"
          size="sm"
          @click="router.push(`/inventory/products/${scanResult.id}`)"
          >View Product</BaseButton
        >
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
      >
        <div>
          <p class="text-xs text-gray-500">Stock</p>
          <p class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ scanResult.stock }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Warehouse</p>
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
            {{ scanResult.warehouse }}
          </p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Price</p>
          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ scanResult.price }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">Status</p>
          <BaseBadge
            :variant="scanResult.status === 'active' ? 'success' : 'warning'"
            :dot="true"
            size="sm"
          >
            {{ scanResult.status === 'active' ? 'In Stock' : 'Low Stock' }}
          </BaseBadge>
        </div>
      </div>
    </BaseCard>

    <BaseCard v-if="searchBarcode && !scanResult && searchBarcode.length >= 5">
      <div class="text-center py-6">
        <p class="text-sm text-gray-500">
          No product found for barcode <strong class="font-mono">{{ searchBarcode }}</strong>
        </p>
        <BaseButton
          variant="outline"
          size="sm"
          class="mt-3"
          @click="router.push('/inventory/products/create')"
          >Register New Product</BaseButton
        >
      </div>
    </BaseCard>
  </div>
</template>
