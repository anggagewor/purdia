<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge, BaseTabs, TabPanel } from '@purdia/ui'
import {
  ArrowLeft,
  Edit,
  Package,
  MapPin,
  DollarSign,
  BarChart3,
  Hash,
  Calendar,
  Layers,
} from '@lucide/vue'
import type { TabItem } from '@purdia/ui'

const router = useRouter()
const route = useRoute()
const activeTab = ref('overview')

const tabs: TabItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'movements', label: 'Stock History' },
]

const productsData: Record<number, any> = {
  1: {
    id: 1,
    name: 'Laptop Dell XPS 15',
    sku: 'ELC-001',
    barcode: '8901234567001',
    category: 'Electronics',
    brand: 'Dell',
    unit: 'Pcs',
    stock: 45,
    minStock: 10,
    buyPrice: 'Rp 22.000.000',
    sellPrice: 'Rp 25.000.000',
    warehouse: 'Gudang Utama',
    weight: '1800g',
    status: 'active',
    description: 'Dell XPS 15 with Intel Core i7, 16GB RAM, 512GB SSD, OLED Display.',
    created: '2025-03-10',
    lastUpdated: '2026-07-05',
    movements: [
      { date: '2026-07-12', type: 'in', qty: 50, note: 'Purchase from supplier PT Tech Indo' },
      { date: '2026-07-08', type: 'out', qty: 5, note: 'Sold to PT Maju Jaya' },
      { date: '2026-06-25', type: 'in', qty: 30, note: 'Purchase from supplier PT Tech Indo' },
      { date: '2026-06-15', type: 'out', qty: 12, note: 'Sold to CV Digital Nusantara' },
    ],
  },
  2: {
    id: 2,
    name: 'Mouse Logitech MX Master 3',
    sku: 'ELC-002',
    barcode: '8901234567002',
    category: 'Electronics',
    brand: 'Logitech',
    unit: 'Pcs',
    stock: 120,
    minStock: 20,
    buyPrice: 'Rp 1.200.000',
    sellPrice: 'Rp 1.500.000',
    warehouse: 'Gudang Jakarta',
    weight: '141g',
    status: 'active',
    description: 'Ergonomic wireless mouse with MagSpeed scroll wheel.',
    created: '2025-04-01',
    lastUpdated: '2026-07-10',
    movements: [
      { date: '2026-07-10', type: 'in', qty: 100, note: 'Restock from distributor' },
      { date: '2026-07-05', type: 'out', qty: 30, note: 'Bulk order - PT Global' },
    ],
  },
}

const productId = Number(route.params.id)
const product = productsData[productId] || productsData[1]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseButton
          variant="ghost"
          size="sm"
          :icon="ArrowLeft"
          @click="router.push('/inventory/products')"
        />
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center"
          >
            <Package class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ product.name }}</h1>
            <div class="flex items-center gap-2 mt-0.5">
              <BaseBadge variant="secondary" size="sm" :pill="false">{{
                product.category
              }}</BaseBadge>
              <BaseBadge
                :variant="product.status === 'active' ? 'success' : 'secondary'"
                :dot="true"
                size="sm"
              >
                {{ product.status === 'active' ? 'In Stock' : 'Inactive' }}
              </BaseBadge>
            </div>
          </div>
        </div>
      </div>
      <BaseButton
        variant="outline"
        size="sm"
        :icon="Edit"
        @click="router.push(`/inventory/products/${productId}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <BaseCard>
      <BaseTabs v-model="activeTab" :tabs="tabs" variant="underline" size="sm">
        <TabPanel name="overview">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h5 class="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                Product Information
              </h5>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <Hash class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700 dark:text-gray-300"
                    >SKU: <span class="font-mono">{{ product.sku }}</span></span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <Hash class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700 dark:text-gray-300"
                    >Barcode: <span class="font-mono">{{ product.barcode }}</span></span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <Layers class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700 dark:text-gray-300"
                    >Brand: {{ product.brand }}</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <Package class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700 dark:text-gray-300"
                    >Unit: {{ product.unit }} | Weight: {{ product.weight }}</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <MapPin class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{{
                    product.warehouse
                  }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <Calendar class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700 dark:text-gray-300"
                    >Created {{ product.created }}</span
                  >
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <h5 class="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                Stock & Pricing
              </h5>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <BarChart3 class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700 dark:text-gray-300"
                    >Current Stock: <strong>{{ product.stock }}</strong> (Min:
                    {{ product.minStock }})</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <DollarSign class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700 dark:text-gray-300"
                    >Buy: {{ product.buyPrice }}</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <DollarSign class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700 dark:text-gray-300"
                    >Sell: {{ product.sellPrice }}</span
                  >
                </div>
              </div>
              <div class="pt-4">
                <h5 class="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-2">
                  Description
                </h5>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ product.description }}</p>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel name="movements">
          <div class="space-y-3">
            <div
              v-for="(m, idx) in product.movements"
              :key="idx"
              class="flex items-center justify-between p-3 border border-gray-100 rounded-lg dark:border-gray-700"
            >
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ m.note }}</p>
                <p class="text-xs text-gray-500">{{ m.date }}</p>
              </div>
              <BaseBadge :variant="m.type === 'in' ? 'success' : 'danger'" size="sm">
                {{ m.type === 'in' ? '+' : '-' }}{{ m.qty }}
              </BaseBadge>
            </div>
          </div>
        </TabPanel>
      </BaseTabs>
    </BaseCard>
  </div>
</template>
