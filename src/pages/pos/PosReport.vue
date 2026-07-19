<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseTable, BaseBadge, BaseButton, BaseSelect, StatCard } from '@purdia/ui'
import { BarChart } from '@purdia/charts'
import { Download, DollarSign, ShoppingBag, TrendingUp, Receipt } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const period = ref<string | number>('today')
const periodOptions: SelectOption[] = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'Last 30 Days', value: '30days' },
]

const revenueByDay = {
  labels: ['Jul 5', 'Jul 6', 'Jul 7', 'Jul 8', 'Jul 9', 'Jul 10', 'Jul 11'],
  datasets: [
    {
      label: 'Revenue',
      data: [4200000, 3800000, 5100000, 4700000, 6200000, 8500000, 7100000],
      backgroundColor: '#6366f1',
      borderRadius: 6,
    },
  ],
}

const columns: TableColumn[] = [
  { key: 'id', label: '#' },
  { key: 'date', label: 'Date' },
  { key: 'cashier', label: 'Cashier' },
  { key: 'customer', label: 'Customer' },
  { key: 'items', label: 'Items', align: 'center' },
  { key: 'payment', label: 'Payment' },
  { key: 'total', label: 'Total', align: 'right', sortable: true },
]

const transactions = ref([
  {
    id: 'TRX-127',
    date: '2025-07-11 17:15',
    cashier: 'Angga',
    customer: 'Walk-in',
    items: 3,
    payment: 'Cash',
    total: 85000,
  },
  {
    id: 'TRX-126',
    date: '2025-07-11 16:30',
    cashier: 'Angga',
    customer: 'Budi (M001)',
    items: 5,
    payment: 'QRIS',
    total: 150000,
  },
  {
    id: 'TRX-125',
    date: '2025-07-11 15:55',
    cashier: 'Lisa',
    customer: 'Walk-in',
    items: 2,
    payment: 'Cash',
    total: 45000,
  },
  {
    id: 'TRX-124',
    date: '2025-07-11 14:45',
    cashier: 'Angga',
    customer: 'Siti (M002)',
    items: 7,
    payment: 'Debit',
    total: 220000,
  },
  {
    id: 'TRX-123',
    date: '2025-07-11 14:10',
    cashier: 'Lisa',
    customer: 'Walk-in',
    items: 2,
    payment: 'Cash',
    total: 55000,
  },
  {
    id: 'TRX-122',
    date: '2025-07-11 13:30',
    cashier: 'Angga',
    customer: 'Ahmad (M003)',
    items: 4,
    payment: 'Credit',
    total: 128000,
  },
  {
    id: 'TRX-121',
    date: '2025-07-11 12:15',
    cashier: 'Lisa',
    customer: 'Walk-in',
    items: 1,
    payment: 'Cash',
    total: 25000,
  },
  {
    id: 'TRX-120',
    date: '2025-07-11 12:00',
    cashier: 'Angga',
    customer: 'Walk-in',
    items: 6,
    payment: 'QRIS',
    total: 320000,
  },
])

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Sales Report</h1>
        <p class="text-gray-500 mt-1">Transaction history and revenue reports.</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseSelect v-model="period" :options="periodOptions" :searchable="false" size="sm" />
        <BaseButton variant="outline" size="sm" :icon="Download">Export</BaseButton>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Revenue"
        value="Rp 39.600.000"
        trend="up"
        trendValue="+22%"
        subtitle="this week"
        :icon="DollarSign"
      />
      <StatCard
        title="Transactions"
        value="847"
        trend="up"
        trendValue="+15%"
        subtitle="this week"
        :icon="Receipt"
      />
      <StatCard
        title="Avg. Order Value"
        value="Rp 46.753"
        trend="up"
        trendValue="+5%"
        subtitle="per transaction"
        :icon="ShoppingBag"
      />
      <StatCard
        title="Growth"
        value="+22%"
        trend="up"
        trendValue="vs last week"
        :icon="TrendingUp"
      />
    </div>

    <!-- Chart -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Daily Revenue (This Week)</h4></template>
      <BarChart :data="revenueByDay" :height="260" />
    </BaseCard>

    <!-- Transaction List -->
    <BaseCard flush>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h4 class="font-semibold">Transaction History</h4>
        </div>
      </template>
      <BaseTable
        :columns="columns"
        :data="transactions"
        :searchable="true"
        search-placeholder="Search transaction..."
      >
        <template #cell-id="{ value }">
          <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">{{ value }}</code>
        </template>
        <template #cell-payment="{ value }">
          <BaseBadge variant="secondary" size="sm" :pill="false">{{ value }}</BaseBadge>
        </template>
        <template #cell-total="{ value }">
          <span class="font-mono font-semibold text-sm">{{ formatRp(value as number) }}</span>
        </template>
      </BaseTable>
    </BaseCard>
  </div>
</template>
