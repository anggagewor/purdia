<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const typeOptions: SelectOption[] = [
  { label: 'Stock In', value: 'in' },
  { label: 'Stock Out', value: 'out' },
  { label: 'Transfer', value: 'transfer' },
]

const productOptions: SelectOption[] = [
  { label: 'Laptop Dell XPS 15', value: '1' },
  { label: 'Mouse Logitech MX Master 3', value: '2' },
  { label: 'Keyboard Mechanical K2 Pro', value: '3' },
  { label: 'Monitor LG UltraWide 34"', value: '4' },
  { label: 'USB-C Hub Anker 7-in-1', value: '5' },
]

const warehouseOptions: SelectOption[] = [
  { label: 'Gudang Utama', value: 'gudang-utama' },
  { label: 'Gudang Jakarta', value: 'gudang-jakarta' },
  { label: 'Gudang Bandung', value: 'gudang-bandung' },
  { label: 'Gudang Surabaya', value: 'gudang-surabaya' },
]

const type = ref<string | number>('in')
const product = ref<string | number>('')
const warehouse = ref<string | number>('')
const destinationWarehouse = ref<string | number>('')
const qty = ref('')
const reference = ref('')
const note = ref('')
const date = ref('')

function handleSave() {
  router.push('/inventory/movements')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/inventory/movements')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">New Stock Movement</h1>
        <p class="text-gray-500 mt-1">Record a new stock in, stock out, or transfer.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="type"
            label="Movement Type"
            :options="typeOptions"
            :searchable="false"
          />
          <BaseInput v-model="date" label="Date" type="date" />
        </div>
        <BaseSelect
          v-model="product"
          label="Product"
          :options="productOptions"
          placeholder="Select product..."
        />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="warehouse"
            label="Warehouse (From)"
            :options="warehouseOptions"
            placeholder="Select warehouse..."
          />
          <BaseSelect
            v-if="type === 'transfer'"
            v-model="destinationWarehouse"
            label="Warehouse (To)"
            :options="warehouseOptions"
            placeholder="Destination..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="qty" label="Quantity" type="number" placeholder="0" />
          <BaseInput v-model="reference" label="Reference No." placeholder="e.g. PO-2026-0043" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Note</label
          >
          <textarea
            v-model="note"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Additional notes..."
          />
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/inventory/movements')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Movement</BaseButton>
    </div>
  </div>
</template>
