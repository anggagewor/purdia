<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseBadge, BaseTable } from '@purdia/ui'
import { StatCard } from '@purdia/ui'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Users,
  Handshake,
  BarChart3,
  PieChart,
} from '@lucide/vue'
import { BarChart, DoughnutChart, LineChart } from '@purdia/charts'

// Pipeline by stage
const pipelineData = ref({
  labels: ['Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
  datasets: [
    {
      label: 'Deals',
      data: [12, 8, 5, 15, 4],
      backgroundColor: ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#ef4444'],
    },
  ],
})

// Monthly revenue
const revenueData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Revenue (Juta)',
      data: [320, 450, 380, 520, 480, 610, 540],
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
})

// Lead sources
const leadSourceData = ref({
  labels: ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Trade Show', 'Social Media'],
  datasets: [
    {
      data: [35, 25, 18, 10, 8, 4],
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
    },
  ],
})

// Top performers
const topPerformers = ref([
  { name: 'Andi Pratama', deals: 12, revenue: 'Rp 450M', conversion: '68%' },
  { name: 'Dewi Lestari', deals: 10, revenue: 'Rp 380M', conversion: '62%' },
  { name: 'Rudi Hermawan', deals: 8, revenue: 'Rp 320M', conversion: '55%' },
  { name: 'Maya Sari', deals: 7, revenue: 'Rp 280M', conversion: '58%' },
  { name: 'Bambang Widodo', deals: 6, revenue: 'Rp 210M', conversion: '50%' },
])

const performerColumns = [
  { key: 'name', label: 'Name' },
  { key: 'deals', label: 'Deals', align: 'center' as const },
  { key: 'revenue', label: 'Revenue', align: 'right' as const },
  { key: 'conversion', label: 'Conversion', align: 'right' as const },
]
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">CRM Reports</h1>
      <p class="text-gray-500 mt-1">Sales performance analytics and insights.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Revenue (YTD)"
        value="Rp 3.3B"
        :icon="DollarSign"
        trend="up"
        trend-value="+22%"
      />
      <StatCard title="Deals Closed" value="44" :icon="Handshake" trend="up" trend-value="+15%" />
      <StatCard title="Conversion Rate" value="58%" :icon="Target" trend="up" trend-value="+5%" />
      <StatCard
        title="Avg Deal Size"
        value="Rp 75M"
        :icon="TrendingUp"
        trend="down"
        trend-value="-3%"
      />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BaseCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Monthly Revenue</h3>
        </template>
        <div class="h-64">
          <LineChart :data="revenueData" />
        </div>
      </BaseCard>

      <BaseCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Pipeline by Stage</h3>
        </template>
        <div class="h-64">
          <BarChart :data="pipelineData" />
        </div>
      </BaseCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Lead Sources -->
      <BaseCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Lead Sources</h3>
        </template>
        <div class="h-56 flex items-center justify-center">
          <DoughnutChart :data="leadSourceData" />
        </div>
      </BaseCard>

      <!-- Top Performers -->
      <BaseCard class="lg:col-span-2">
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Top Performers</h3>
        </template>
        <BaseTable
          :columns="performerColumns"
          :data="topPerformers"
          :compact="true"
          :hoverable="false"
        >
          <template #cell-name="{ value, index }">
            <div class="flex items-center gap-2">
              <span
                class="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold"
                >{{ index + 1 }}</span
              >
              <span class="font-medium text-gray-900 dark:text-gray-100">{{ value }}</span>
            </div>
          </template>
          <template #cell-revenue="{ value }">
            <span class="font-medium text-gray-900 dark:text-gray-100">{{ value }}</span>
          </template>
          <template #cell-conversion="{ value }">
            <BaseBadge
              :variant="parseInt(value as string) >= 60 ? 'success' : 'warning'"
              size="sm"
              >{{ value }}</BaseBadge
            >
          </template>
        </BaseTable>
      </BaseCard>
    </div>
  </div>
</template>
