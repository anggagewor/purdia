<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseTable, BaseButton, BaseBadge, BasePagination } from '@purdia/ui'
import { Printer, ScanLine, Barcode } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'

const router = useRouter()
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'product', label: 'Product', sortable: true },
  { key: 'sku', label: 'SKU' },
  { key: 'barcode', label: 'Barcode' },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'lastPrinted', label: 'Last Printed' },
  { key: 'status', label: 'Status', align: 'center' },
]

const barcodes = ref([
  {
    id: 1,
    product: 'Laptop Dell XPS 15',
    sku: 'ELC-001',
    barcode: '8901234567001',
    type: 'EAN-13',
    lastPrinted: '2026-07-10',
    status: 'active',
  },
  {
    id: 2,
    product: 'Mouse Logitech MX Master 3',
    sku: 'ELC-002',
    barcode: '8901234567002',
    type: 'EAN-13',
    lastPrinted: '2026-07-08',
    status: 'active',
  },
  {
    id: 3,
    product: 'Keyboard Mechanical K2 Pro',
    sku: 'ELC-003',
    barcode: '8901234567003',
    type: 'EAN-13',
    lastPrinted: '2026-07-05',
    status: 'active',
  },
  {
    id: 4,
    product: 'Monitor LG UltraWide 34"',
    sku: 'ELC-004',
    barcode: '8901234567004',
    type: 'EAN-13',
    lastPrinted: '2026-06-28',
    status: 'active',
  },
  {
    id: 5,
    product: 'USB-C Hub Anker 7-in-1',
    sku: 'ACC-001',
    barcode: '8901234567005',
    type: 'Code-128',
    lastPrinted: '2026-07-12',
    status: 'active',
  },
  {
    id: 6,
    product: 'Webcam Logitech C920',
    sku: 'ELC-005',
    barcode: '8901234567006',
    type: 'EAN-13',
    lastPrinted: '—',
    status: 'pending',
  },
  {
    id: 7,
    product: 'Headset Sony WH-1000XM5',
    sku: 'ELC-006',
    barcode: '8901234567007',
    type: 'QR Code',
    lastPrinted: '2026-07-01',
    status: 'active',
  },
  {
    id: 8,
    product: 'SSD Samsung 1TB',
    sku: 'STR-001',
    barcode: '8901234567008',
    type: 'EAN-13',
    lastPrinted: '2026-06-25',
    status: 'active',
  },
  {
    id: 9,
    product: 'RAM DDR5 32GB Kit',
    sku: 'CMP-001',
    barcode: '8901234567009',
    type: 'Code-128',
    lastPrinted: '—',
    status: 'pending',
  },
  {
    id: 10,
    product: 'Cable HDMI 2.1 3M',
    sku: 'ACC-002',
    barcode: '8901234567010',
    type: 'EAN-13',
    lastPrinted: '2026-07-11',
    status: 'active',
  },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Barcode Management</h1>
        <p class="text-gray-500 mt-1">Generate, print, and manage product barcodes.</p>
      </div>
      <div class="flex gap-2">
        <BaseButton
          variant="outline"
          size="sm"
          :icon="ScanLine"
          @click="router.push('/inventory/barcodes/scan')"
          >Scan</BaseButton
        >
        <BaseButton size="sm" :icon="Printer" @click="router.push('/inventory/barcodes/generate')"
          >Generate</BaseButton
        >
      </div>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="barcodes"
        :searchable="true"
        search-placeholder="Search by product or barcode..."
      >
        <template #cell-product="{ row, value }">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center shrink-0 dark:bg-gray-700"
            >
              <Barcode class="w-4 h-4" />
            </div>
            <span class="font-medium text-sm">{{ value }}</span>
          </div>
        </template>
        <template #cell-sku="{ value }">
          <span class="font-mono text-xs text-gray-600 dark:text-gray-400">{{ value }}</span>
        </template>
        <template #cell-barcode="{ value }">
          <span
            class="font-mono text-xs bg-gray-50 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300"
            >{{ value }}</span
          >
        </template>
        <template #cell-type="{ value }">
          <BaseBadge variant="secondary" size="sm" :pill="false">{{ value }}</BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="value === 'active' ? 'success' : 'warning'" :dot="true" size="sm">{{
            value
          }}</BaseBadge>
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
  </div>
</template>
