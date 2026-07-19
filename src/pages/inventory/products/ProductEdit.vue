<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()
const route = useRoute()
const productId = Number(route.params.id)

const categoryOptions: SelectOption[] = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Storage', value: 'storage' },
  { label: 'Components', value: 'components' },
]

const warehouseOptions: SelectOption[] = [
  { label: 'Gudang Utama', value: 'gudang-utama' },
  { label: 'Gudang Jakarta', value: 'gudang-jakarta' },
  { label: 'Gudang Bandung', value: 'gudang-bandung' },
  { label: 'Gudang Surabaya', value: 'gudang-surabaya' },
]

const statusOptions: SelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

// Pre-filled dummy data
const name = ref('Laptop Dell XPS 15')
const sku = ref('ELC-001')
const barcode = ref('8901234567001')
const category = ref<string | number>('electronics')
const warehouse = ref<string | number>('gudang-utama')
const status = ref<string | number>('active')
const buyPrice = ref('22000000')
const sellPrice = ref('25000000')
const stock = ref('45')
const minStock = ref('10')
const description = ref('Dell XPS 15 with Intel Core i7, 16GB RAM, 512GB SSD, OLED Display.')

function handleSave() {
  router.push(`/inventory/products/${productId}`)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push(`/inventory/products/${productId}`)"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Product</h1>
        <p class="text-gray-500 mt-1">Update product information.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput v-model="name" label="Product Name" placeholder="Product name" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="sku" label="SKU" placeholder="SKU" />
          <BaseInput v-model="barcode" label="Barcode" placeholder="Barcode" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="category"
            label="Category"
            :options="categoryOptions"
            placeholder="Select category..."
          />
          <BaseSelect
            v-model="status"
            label="Status"
            :options="statusOptions"
            :searchable="false"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="buyPrice" label="Buy Price (Rp)" type="number" placeholder="0" />
          <BaseInput v-model="sellPrice" label="Sell Price (Rp)" type="number" placeholder="0" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="stock" label="Stock" type="number" placeholder="0" />
          <BaseInput v-model="minStock" label="Min Stock Alert" type="number" placeholder="0" />
        </div>
        <BaseSelect
          v-model="warehouse"
          label="Warehouse"
          :options="warehouseOptions"
          placeholder="Select warehouse..."
        />
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Description</label
          >
          <textarea
            v-model="description"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Product description..."
          />
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push(`/inventory/products/${productId}`)"
        >Cancel</BaseButton
      >
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
