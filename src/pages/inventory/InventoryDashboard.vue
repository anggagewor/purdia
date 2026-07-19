<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import { StatCard } from '@purdia/ui'
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ShoppingCart,
  Barcode,
  Wrench,
  ShieldCheck,
  ArrowRight,
} from '@lucide/vue'

const router = useRouter()

const stats = ref([
  {
    label: 'Total Products',
    value: '1,248',
    icon: Package,
    trend: 'up' as const,
    trendValue: '+12%',
  },
  {
    label: 'Low Stock Items',
    value: '23',
    icon: AlertTriangle,
    trend: 'down' as const,
    trendValue: '-5%',
  },
  {
    label: 'Pending Purchases',
    value: '8',
    icon: ShoppingCart,
    trend: 'up' as const,
    trendValue: '+3',
  },
  {
    label: 'Quality Checks',
    value: '15',
    icon: ShieldCheck,
    trend: 'neutral' as const,
    trendValue: '98% pass',
  },
])

const recentMovements = ref([
  {
    id: 1,
    product: 'Laptop Dell XPS 15',
    type: 'in',
    qty: 50,
    warehouse: 'Gudang Utama',
    date: '2026-07-12',
  },
  {
    id: 2,
    product: 'Mouse Logitech MX3',
    type: 'out',
    qty: 25,
    warehouse: 'Gudang Jakarta',
    date: '2026-07-11',
  },
  {
    id: 3,
    product: 'Keyboard Mechanical K2',
    type: 'in',
    qty: 100,
    warehouse: 'Gudang Bandung',
    date: '2026-07-11',
  },
  {
    id: 4,
    product: 'Monitor LG 27"',
    type: 'out',
    qty: 10,
    warehouse: 'Gudang Utama',
    date: '2026-07-10',
  },
  {
    id: 5,
    product: 'USB-C Hub Anker',
    type: 'transfer',
    qty: 30,
    warehouse: 'Gudang Surabaya',
    date: '2026-07-10',
  },
])
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Inventory</h1>
        <p class="text-gray-500 mt-1">Overview of your inventory management system.</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        :title="stat.label"
        :value="stat.value"
        :icon="stat.icon"
        :trend="stat.trend"
        :trend-value="stat.trendValue"
      />
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <BaseButton
        variant="outline"
        class="flex-col h-20 gap-2"
        @click="router.push('/inventory/products')"
      >
        <Package class="w-5 h-5" />
        <span class="text-xs">Products</span>
      </BaseButton>
      <BaseButton
        variant="outline"
        class="flex-col h-20 gap-2"
        @click="router.push('/inventory/purchases')"
      >
        <ShoppingCart class="w-5 h-5" />
        <span class="text-xs">Purchases</span>
      </BaseButton>
      <BaseButton
        variant="outline"
        class="flex-col h-20 gap-2"
        @click="router.push('/inventory/barcodes')"
      >
        <Barcode class="w-5 h-5" />
        <span class="text-xs">Barcodes</span>
      </BaseButton>
      <BaseButton
        variant="outline"
        class="flex-col h-20 gap-2"
        @click="router.push('/inventory/maintenance')"
      >
        <Wrench class="w-5 h-5" />
        <span class="text-xs">Maintenance</span>
      </BaseButton>
      <BaseButton
        variant="outline"
        class="flex-col h-20 gap-2"
        @click="router.push('/inventory/quality')"
      >
        <ShieldCheck class="w-5 h-5" />
        <span class="text-xs">Quality</span>
      </BaseButton>
    </div>

    <!-- Recent Movements -->
    <BaseCard>
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-gray-900 dark:text-gray-100">Recent Stock Movements</h3>
        <BaseButton variant="ghost" size="sm" @click="router.push('/inventory/movements')">
          View All <ArrowRight class="w-4 h-4 ml-1" />
        </BaseButton>
      </div>
      <div class="space-y-3">
        <div
          v-for="movement in recentMovements"
          :key="movement.id"
          class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 dark:border-gray-700"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center"
              :class="{
                'bg-green-50 text-green-500': movement.type === 'in',
                'bg-red-50 text-red-500': movement.type === 'out',
                'bg-blue-50 text-blue-500': movement.type === 'transfer',
              }"
            >
              <TrendingUp v-if="movement.type === 'in'" class="w-4 h-4" />
              <TrendingDown v-else-if="movement.type === 'out'" class="w-4 h-4" />
              <ArrowRight v-else class="w-4 h-4" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ movement.product }}
              </p>
              <p class="text-xs text-gray-500">{{ movement.warehouse }}</p>
            </div>
          </div>
          <div class="text-right">
            <BaseBadge
              :variant="
                movement.type === 'in' ? 'success' : movement.type === 'out' ? 'danger' : 'primary'
              "
              size="sm"
            >
              {{ movement.type === 'in' ? '+' : movement.type === 'out' ? '-' : '↔'
              }}{{ movement.qty }}
            </BaseBadge>
            <p class="text-xs text-gray-400 mt-1">{{ movement.date }}</p>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
