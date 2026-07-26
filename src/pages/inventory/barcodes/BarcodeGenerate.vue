<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect, BaseCheckbox } from '@purdia/ui'
import { ArrowLeft, Printer, Barcode } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const typeOptions: SelectOption[] = [
  { label: 'EAN-13', value: 'ean13' },
  { label: 'Code-128', value: 'code128' },
  { label: 'QR Code', value: 'qr' },
  { label: 'UPC-A', value: 'upca' },
]

const productOptions: SelectOption[] = [
  { label: 'Laptop Dell XPS 15 (ELC-001)', value: '1' },
  { label: 'Mouse Logitech MX Master 3 (ELC-002)', value: '2' },
  { label: 'Keyboard Mechanical K2 Pro (ELC-003)', value: '3' },
  { label: 'Monitor LG UltraWide 34" (ELC-004)', value: '4' },
  { label: 'Webcam Logitech C920 (ELC-005)', value: '6' },
  { label: 'RAM DDR5 32GB Kit (CMP-001)', value: '9' },
]

const sizeOptions: SelectOption[] = [
  { label: 'Small (25x15 mm)', value: 'small' },
  { label: 'Medium (50x30 mm)', value: 'medium' },
  { label: 'Large (70x40 mm)', value: 'large' },
]

const selectedProducts = ref<string | number>('')
const barcodeType = ref<string | number>('ean13')
const labelSize = ref<string | number>('medium')
const copies = ref('1')
const includeProductName = ref(true)
const includePrice = ref(false)

const generated = ref(false)

function handleGenerate() {
  generated.value = true
}

function handlePrint() {
  // In a real app this would trigger print
  alert('Print dialog would open here')
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
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Generate Barcodes</h1>
        <p class="text-gray-500 mt-1">Generate and print barcode labels for products.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BaseCard>
        <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Settings</h3>
        <div class="space-y-4">
          <BaseSelect
            v-model="selectedProducts"
            label="Product"
            :options="productOptions"
            placeholder="Select product to generate barcode..."
          />
          <div class="grid grid-cols-2 gap-4">
            <BaseSelect
              v-model="barcodeType"
              label="Barcode Type"
              :options="typeOptions"
              :searchable="false"
            />
            <BaseSelect
              v-model="labelSize"
              label="Label Size"
              :options="sizeOptions"
              :searchable="false"
            />
          </div>
          <BaseInput v-model="copies" label="Number of Copies" type="number" placeholder="1" />
          <div class="space-y-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <BaseCheckbox v-model="includeProductName" />
              <span class="text-sm text-gray-700 dark:text-gray-300">Include product name</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <BaseCheckbox v-model="includePrice" />
              <span class="text-sm text-gray-700 dark:text-gray-300">Include price</span>
            </label>
          </div>
          <BaseButton @click="handleGenerate" class="w-full">Generate Barcode</BaseButton>
        </div>
      </BaseCard>

      <BaseCard>
        <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Preview</h3>
        <div
          v-if="!generated"
          class="flex flex-col items-center justify-center py-16 text-gray-400"
        >
          <Barcode class="w-16 h-16 mb-3 opacity-30" />
          <p class="text-sm">Select a product and click "Generate" to preview</p>
        </div>
        <div v-else class="space-y-4">
          <div
            class="border border-gray-200 rounded-lg p-6 flex flex-col items-center dark:border-gray-700"
          >
            <!-- Simulated barcode display -->
            <div class="w-48 h-16 bg-gray-900 rounded flex items-center justify-center mb-2">
              <div class="flex gap-[2px]">
                <div
                  v-for="i in 30"
                  :key="i"
                  class="bg-white"
                  :style="{ width: Math.random() > 0.5 ? '2px' : '1px', height: '40px' }"
                />
              </div>
            </div>
            <p class="font-mono text-sm text-gray-600 dark:text-gray-400">8901234567001</p>
            <p v-if="includeProductName" class="text-xs text-gray-500 mt-1">Laptop Dell XPS 15</p>
            <p v-if="includePrice" class="text-xs text-gray-500">Rp 25.000.000</p>
          </div>
          <BaseButton variant="outline" :icon="Printer" @click="handlePrint" class="w-full"
            >Print Labels</BaseButton
          >
        </div>
      </BaseCard>
    </div>
  </div>
</template>
