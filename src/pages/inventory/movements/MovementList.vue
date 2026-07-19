<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseTable, BaseButton, BaseBadge, BasePagination } from '@purdia/ui'
import { Plus, TrendingUp, TrendingDown, ArrowRight } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'

const router = useRouter()
const currentPage = ref(1)

const columns: TableColumn[] = [
  { key: 'date', label: 'Date', sortable: true },
  { key: 'product', label: 'Product', sortable: true },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'qty', label: 'Qty', align: 'center' },
  { key: 'warehouse', label: 'Warehouse' },
  { key: 'reference', label: 'Reference' },
  { key: 'note', label: 'Note' },
]

const movements = ref([
  {
    id: 1,
    date: '2026-07-12',
    product: 'Laptop Dell XPS 15',
    type: 'in',
    qty: 50,
    warehouse: 'Gudang Utama',
    reference: 'PO-2026-0042',
    note: 'Purchase from PT Tech Indo',
  },
  {
    id: 2,
    date: '2026-07-11',
    product: 'Mouse Logitech MX3',
    type: 'out',
    qty: 25,
    warehouse: 'Gudang Jakarta',
    reference: 'SO-2026-0108',
    note: 'Sales to PT Maju Corp',
  },
  {
    id: 3,
    date: '2026-07-11',
    product: 'Keyboard Mechanical K2',
    type: 'in',
    qty: 100,
    warehouse: 'Gudang Bandung',
    reference: 'PO-2026-0041',
    note: 'Restock',
  },
  {
    id: 4,
    date: '2026-07-10',
    product: 'Monitor LG 27"',
    type: 'out',
    qty: 10,
    warehouse: 'Gudang Utama',
    reference: 'SO-2026-0107',
    note: 'Sold to CV Digital',
  },
  {
    id: 5,
    date: '2026-07-10',
    product: 'USB-C Hub Anker',
    type: 'transfer',
    qty: 30,
    warehouse: 'Gudang Surabaya',
    reference: 'TR-2026-0015',
    note: 'Transfer from Jakarta',
  },
  {
    id: 6,
    date: '2026-07-09',
    product: 'SSD Samsung 1TB',
    type: 'in',
    qty: 60,
    warehouse: 'Gudang Bandung',
    reference: 'PO-2026-0040',
    note: 'Regular restock',
  },
  {
    id: 7,
    date: '2026-07-08',
    product: 'RAM DDR5 32GB',
    type: 'out',
    qty: 15,
    warehouse: 'Gudang Utama',
    reference: 'SO-2026-0106',
    note: 'Assembly order',
  },
  {
    id: 8,
    date: '2026-07-07',
    product: 'Webcam Logitech C920',
    type: 'in',
    qty: 40,
    warehouse: 'Gudang Jakarta',
    reference: 'PO-2026-0039',
    note: 'New stock arrival',
  },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Stock Movements</h1>
        <p class="text-gray-500 mt-1">Track all inventory movements across warehouses.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/inventory/movements/create')"
        >New Movement</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="movements"
        :searchable="true"
        search-placeholder="Search movements..."
      >
        <template #cell-type="{ value }">
          <BaseBadge
            :variant="value === 'in' ? 'success' : value === 'out' ? 'danger' : 'primary'"
            size="sm"
          >
            <template #default>
              <span class="flex items-center gap-1">
                <TrendingUp v-if="value === 'in'" class="w-3 h-3" />
                <TrendingDown v-else-if="value === 'out'" class="w-3 h-3" />
                <ArrowRight v-else class="w-3 h-3" />
                {{ value === 'in' ? 'Stock In' : value === 'out' ? 'Stock Out' : 'Transfer' }}
              </span>
            </template>
          </BaseBadge>
        </template>
        <template #cell-qty="{ row, value }">
          <span
            class="font-medium"
            :class="
              row.type === 'in'
                ? 'text-green-600'
                : row.type === 'out'
                  ? 'text-red-600'
                  : 'text-blue-600'
            "
          >
            {{ row.type === 'in' ? '+' : row.type === 'out' ? '-' : '↔' }}{{ value }}
          </span>
        </template>
        <template #cell-reference="{ value }">
          <span class="font-mono text-xs text-gray-600 dark:text-gray-400">{{ value }}</span>
        </template>
      </BaseTable>
      <div class="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <BasePagination
          v-model:current-page="currentPage"
          :total-pages="3"
          :total-items="24"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>
  </div>
</template>
