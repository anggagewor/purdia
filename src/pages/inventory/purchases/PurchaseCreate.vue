<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft, Plus, Trash2 } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const supplierOptions: SelectOption[] = [
  { label: 'PT Tech Indo Distributor', value: '1' },
  { label: 'CV Megah Elektronik', value: '2' },
  { label: 'PT Samsung Indonesia', value: '3' },
  { label: 'PT Logitech Asia', value: '4' },
  { label: 'PT Anker Official', value: '5' },
  { label: 'PT Dell Indonesia', value: '6' },
]

const productOptions: SelectOption[] = [
  { label: 'Laptop Dell XPS 15', value: '1' },
  { label: 'Mouse Logitech MX Master 3', value: '2' },
  { label: 'Keyboard Mechanical K2 Pro', value: '3' },
  { label: 'Monitor LG UltraWide 34"', value: '4' },
  { label: 'USB-C Hub Anker 7-in-1', value: '5' },
  { label: 'SSD Samsung 1TB', value: '6' },
]

const warehouseOptions: SelectOption[] = [
  { label: 'Gudang Utama', value: 'gudang-utama' },
  { label: 'Gudang Jakarta', value: 'gudang-jakarta' },
  { label: 'Gudang Bandung', value: 'gudang-bandung' },
  { label: 'Gudang Surabaya', value: 'gudang-surabaya' },
]

const supplier = ref<string | number>('')
const warehouse = ref<string | number>('')
const date = ref('')
const expectedDate = ref('')
const note = ref('')

interface PurchaseItem {
  id: number
  product: string | number
  qty: string
  price: string
}

const items = ref<PurchaseItem[]>([{ id: 1, product: '', qty: '', price: '' }])

let itemId = 2

function addItem() {
  items.value.push({ id: itemId++, product: '', qty: '', price: '' })
}

function removeItem(id: number) {
  items.value = items.value.filter((i) => i.id !== id)
}

function handleSave() {
  router.push('/inventory/purchases')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/inventory/purchases')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">New Purchase Order</h1>
        <p class="text-gray-500 mt-1">Create a new purchase order to your supplier.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseSelect
          v-model="supplier"
          label="Supplier"
          :options="supplierOptions"
          placeholder="Select supplier..."
        />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput v-model="date" label="Order Date" type="date" />
          <BaseInput v-model="expectedDate" label="Expected Delivery" type="date" />
          <BaseSelect
            v-model="warehouse"
            label="Destination Warehouse"
            :options="warehouseOptions"
            placeholder="Select warehouse..."
          />
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Items</h3>
      <div class="space-y-3">
        <div v-for="(item, idx) in items" :key="item.id" class="grid grid-cols-12 gap-3 items-end">
          <div class="col-span-5">
            <BaseSelect
              v-model="item.product"
              :label="idx === 0 ? 'Product' : ''"
              :options="productOptions"
              placeholder="Select product..."
              size="sm"
            />
          </div>
          <div class="col-span-3">
            <BaseInput
              v-model="item.qty"
              :label="idx === 0 ? 'Qty' : ''"
              type="number"
              placeholder="0"
              size="sm"
            />
          </div>
          <div class="col-span-3">
            <BaseInput
              v-model="item.price"
              :label="idx === 0 ? 'Unit Price (Rp)' : ''"
              type="number"
              placeholder="0"
              size="sm"
            />
          </div>
          <div class="col-span-1 flex justify-center">
            <BaseButton
              v-if="items.length > 1"
              variant="ghost"
              size="sm"
              :icon="Trash2"
              @click="removeItem(item.id)"
            />
          </div>
        </div>
      </div>
      <BaseButton variant="outline" size="sm" :icon="Plus" class="mt-4" @click="addItem"
        >Add Item</BaseButton
      >
    </BaseCard>

    <BaseCard>
      <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Notes</label>
      <textarea
        v-model="note"
        rows="3"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        placeholder="Additional notes for this purchase..."
      />
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/inventory/purchases')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Purchase Order</BaseButton>
    </div>
  </div>
</template>
