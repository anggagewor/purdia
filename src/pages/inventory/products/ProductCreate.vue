<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect, BaseTabs, TabPanel } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'
import type { TabItem } from '@purdia/ui'

const router = useRouter()
const activeTab = ref('general')

const tabs: TabItem[] = [
  { key: 'general', label: 'General Info' },
  { key: 'stock', label: 'Stock & Pricing' },
  { key: 'details', label: 'Additional Details' },
]

const categoryOptions: SelectOption[] = [
  { label: 'Electronics', value: 'electronics' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Storage', value: 'storage' },
  { label: 'Components', value: 'components' },
  { label: 'Furniture', value: 'furniture' },
  { label: 'Office Supplies', value: 'office_supplies' },
]

const warehouseOptions: SelectOption[] = [
  { label: 'Gudang Utama', value: 'gudang-utama' },
  { label: 'Gudang Jakarta', value: 'gudang-jakarta' },
  { label: 'Gudang Bandung', value: 'gudang-bandung' },
  { label: 'Gudang Surabaya', value: 'gudang-surabaya' },
]

const unitOptions: SelectOption[] = [
  { label: 'Pcs', value: 'pcs' },
  { label: 'Box', value: 'box' },
  { label: 'Kg', value: 'kg' },
  { label: 'Meter', value: 'meter' },
  { label: 'Liter', value: 'liter' },
]

const statusOptions: SelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

// Form data
const name = ref('')
const sku = ref('')
const category = ref<string | number>('')
const warehouse = ref<string | number>('')
const unit = ref<string | number>('pcs')
const status = ref<string | number>('active')
const description = ref('')
const buyPrice = ref('')
const sellPrice = ref('')
const stock = ref('')
const minStock = ref('')
const weight = ref('')
const brand = ref('')
const barcode = ref('')

function handleSave() {
  router.push('/inventory/products')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/inventory/products')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Product</h1>
        <p class="text-gray-500 mt-1">Create a new inventory product.</p>
      </div>
    </div>

    <BaseCard>
      <BaseTabs v-model="activeTab" :tabs="tabs" variant="underline" size="sm">
        <TabPanel name="general">
          <div class="space-y-4">
            <BaseInput v-model="name" label="Product Name" placeholder="e.g. Laptop Dell XPS 15" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="sku" label="SKU" placeholder="e.g. ELC-001" />
              <BaseInput v-model="barcode" label="Barcode" placeholder="e.g. 8901234567890" />
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
              <BaseInput v-model="brand" label="Brand" placeholder="e.g. Dell" />
              <BaseSelect v-model="unit" label="Unit" :options="unitOptions" :searchable="false" />
            </div>
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
        </TabPanel>

        <TabPanel name="stock">
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="buyPrice" label="Buy Price (Rp)" type="number" placeholder="0" />
              <BaseInput
                v-model="sellPrice"
                label="Sell Price (Rp)"
                type="number"
                placeholder="0"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="stock" label="Initial Stock" type="number" placeholder="0" />
              <BaseInput
                v-model="minStock"
                label="Minimum Stock Alert"
                type="number"
                placeholder="10"
              />
            </div>
            <BaseSelect
              v-model="warehouse"
              label="Warehouse"
              :options="warehouseOptions"
              placeholder="Select warehouse..."
            />
          </div>
        </TabPanel>

        <TabPanel name="details">
          <div class="space-y-4">
            <BaseInput v-model="weight" label="Weight (gram)" type="number" placeholder="0" />
            <p class="text-sm text-gray-500">
              Additional product attributes can be managed after creation.
            </p>
          </div>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/inventory/products')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Product</BaseButton>
    </div>
  </div>
</template>
