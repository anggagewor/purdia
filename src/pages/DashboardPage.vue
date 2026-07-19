<script setup lang="ts">
import { DollarSign, Users, ShoppingCart, TrendingUp } from '@lucide/vue'
import { StatCard, BaseCard, BaseTable, BaseBadge, BaseAvatar, BaseProgress } from '@purdia/ui'
import { LineChart, BarChart, DoughnutChart } from '@/components/charts'
import type { TableColumn } from '@purdia/ui'

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 15000, 25000, 22000, 30000, 35000],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Expenses',
      data: [8000, 12000, 10000, 14000, 13000, 17000, 20000],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.05)',
      fill: true,
      tension: 0.4,
    },
  ],
}

const ordersData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Orders',
      data: [65, 59, 80, 81, 56, 95, 72],
      backgroundColor: '#6366f1',
      borderRadius: 6,
    },
  ],
}

const categoryData = {
  labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
  datasets: [
    {
      data: [35, 25, 20, 12, 8],
      backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6'],
      borderWidth: 0,
    },
  ],
}

const recentOrderColumns: TableColumn[] = [
  { key: 'customer', label: 'Customer' },
  { key: 'product', label: 'Product' },
  { key: 'amount', label: 'Amount', align: 'right' },
  { key: 'status', label: 'Status', align: 'center' },
]

const recentOrders = [
  { customer: 'Sarah Johnson', product: 'MacBook Pro', amount: '$2,499', status: 'completed' },
  { customer: 'Mike Chen', product: 'iPhone 15 Pro', amount: '$1,199', status: 'processing' },
  { customer: 'Emily Davis', product: 'AirPods Max', amount: '$549', status: 'completed' },
  { customer: 'Alex Turner', product: 'iPad Air', amount: '$799', status: 'pending' },
  { customer: 'Lisa Wang', product: 'Apple Watch', amount: '$399', status: 'completed' },
]

function getStatusVariant(status: string) {
  const map: Record<string, 'success' | 'info' | 'warning' | 'danger' | 'secondary'> = {
    completed: 'success',
    processing: 'info',
    pending: 'warning',
    cancelled: 'danger',
  }
  return map[status] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-500 mt-1">Welcome back, Angga 👋</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Revenue"
        value="$45,231"
        trend="up"
        trendValue="+20.1%"
        subtitle="from last month"
        :icon="DollarSign"
      />
      <StatCard
        title="Total Users"
        value="2,350"
        trend="up"
        trendValue="+15.3%"
        subtitle="from last month"
        :icon="Users"
      />
      <StatCard
        title="Total Orders"
        value="1,234"
        trend="down"
        trendValue="-4.5%"
        subtitle="from last month"
        :icon="ShoppingCart"
      />
      <StatCard
        title="Conversion"
        value="3.24%"
        trend="up"
        trendValue="+0.8%"
        subtitle="from last month"
        :icon="TrendingUp"
      />
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <BaseCard>
        <template #header><h4 class="font-semibold">Revenue Overview</h4></template>
        <LineChart :data="revenueData" :height="280" />
      </BaseCard>

      <BaseCard>
        <template #header><h4 class="font-semibold">Weekly Orders</h4></template>
        <BarChart :data="ordersData" :height="280" />
      </BaseCard>
    </div>

    <!-- Table + Donut -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BaseCard class="lg:col-span-2">
        <template #header><h4 class="font-semibold">Recent Orders</h4></template>
        <BaseTable :columns="recentOrderColumns" :data="recentOrders" :compact="true">
          <template #cell-customer="{ value }">
            <div class="flex items-center gap-2">
              <BaseAvatar :name="value as string" size="xs" />
              <span>{{ value }}</span>
            </div>
          </template>
          <template #cell-status="{ value }">
            <BaseBadge :variant="getStatusVariant(value as string)" size="sm" :dot="true">
              {{ value }}
            </BaseBadge>
          </template>
        </BaseTable>
      </BaseCard>

      <BaseCard>
        <template #header><h4 class="font-semibold">Sales by Category</h4></template>
        <DoughnutChart :data="categoryData" :height="220" />
        <div class="mt-4 space-y-3">
          <div>
            <p class="text-xs text-gray-500">Top Category</p>
            <p class="font-semibold text-gray-800">Electronics</p>
          </div>
          <BaseProgress :value="72" variant="primary" size="sm" :show-label="true" />
        </div>
      </BaseCard>
    </div>
  </div>
</template>
