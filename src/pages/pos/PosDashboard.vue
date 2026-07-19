<script setup lang="ts">
import { StatCard, BaseCard } from '@purdia/ui'
import { LineChart, BarChart, DoughnutChart } from '@/components/charts'
import { DollarSign, ShoppingBag, Users, TrendingUp } from '@lucide/vue'

const salesData = {
  labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  datasets: [
    {
      label: 'Sales Today',
      data: [120000, 350000, 580000, 920000, 750000, 1100000, 890000, 1250000, 980000],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
}

const weeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Revenue',
      data: [4200000, 3800000, 5100000, 4700000, 6200000, 8500000, 7100000],
      backgroundColor: '#6366f1',
      borderRadius: 6,
    },
  ],
}

const paymentData = {
  labels: ['Cash', 'Debit Card', 'Credit Card', 'E-Wallet', 'Transfer'],
  datasets: [
    {
      data: [35, 25, 20, 15, 5],
      backgroundColor: ['#10b981', '#6366f1', '#f59e0b', '#06b6d4', '#8b5cf6'],
      borderWidth: 0,
    },
  ],
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">POS Dashboard</h1>
      <p class="text-gray-500 mt-1">Ringkasan penjualan hari ini.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Sales Today"
        value="Rp 8.450.000"
        trend="up"
        trendValue="+18%"
        subtitle="vs yesterday"
        :icon="DollarSign"
      />
      <StatCard
        title="Transactions"
        value="127"
        trend="up"
        trendValue="+12"
        subtitle="orders today"
        :icon="ShoppingBag"
      />
      <StatCard
        title="Customers"
        value="89"
        trend="up"
        trendValue="+8"
        subtitle="unique today"
        :icon="Users"
      />
      <StatCard
        title="Avg. Order"
        value="Rp 66.535"
        trend="down"
        trendValue="-3%"
        subtitle="per transaction"
        :icon="TrendingUp"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <BaseCard>
        <template #header><h4 class="font-semibold">Hourly Sales</h4></template>
        <LineChart :data="salesData" :height="260" />
      </BaseCard>
      <BaseCard>
        <template #header><h4 class="font-semibold">Weekly Revenue</h4></template>
        <BarChart :data="weeklyData" :height="260" />
      </BaseCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BaseCard>
        <template #header><h4 class="font-semibold">Payment Methods</h4></template>
        <DoughnutChart :data="paymentData" :height="220" />
      </BaseCard>
      <BaseCard class="lg:col-span-2">
        <template #header><h4 class="font-semibold">Top Products Today</h4></template>
        <div class="space-y-3">
          <div
            v-for="(item, idx) in [
              { name: 'Kopi Susu Gula Aren', qty: 45, revenue: 'Rp 1.125.000' },
              { name: 'Nasi Goreng Spesial', qty: 32, revenue: 'Rp 960.000' },
              { name: 'Es Teh Manis', qty: 67, revenue: 'Rp 670.000' },
              { name: 'Mie Ayam Bakso', qty: 28, revenue: 'Rp 560.000' },
              { name: 'Roti Bakar Coklat', qty: 22, revenue: 'Rp 440.000' },
            ]"
            :key="idx"
            class="flex items-center justify-between py-2"
            :class="idx < 4 ? 'border-b border-gray-100' : ''"
          >
            <div class="flex items-center gap-3">
              <span
                class="w-6 h-6 rounded-full bg-gray-100 text-xs font-semibold flex items-center justify-center text-gray-600"
                >{{ idx + 1 }}</span
              >
              <span class="text-sm font-medium text-gray-800">{{ item.name }}</span>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-900">{{ item.revenue }}</p>
              <p class="text-xs text-gray-400">{{ item.qty }} sold</p>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
