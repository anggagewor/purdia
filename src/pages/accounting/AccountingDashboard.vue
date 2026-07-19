<script setup lang="ts">
import { StatCard, BaseCard } from '@purdia/ui'
import { LineChart, BarChart, DoughnutChart } from '@purdia/charts'
import { DollarSign, TrendingUp, TrendingDown, Wallet } from '@lucide/vue'

const cashFlowData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Income',
      data: [85000000, 92000000, 78000000, 105000000, 98000000, 115000000, 120000000],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Expense',
      data: [62000000, 71000000, 65000000, 80000000, 73000000, 85000000, 88000000],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.05)',
      fill: true,
      tension: 0.4,
    },
  ],
}

const profitData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Net Profit',
      data: [23000000, 21000000, 13000000, 25000000, 25000000, 30000000, 32000000],
      backgroundColor: '#6366f1',
      borderRadius: 6,
    },
  ],
}

const expenseBreakdown = {
  labels: ['Salary', 'Rent', 'Utilities', 'Supplies', 'Marketing', 'Others'],
  datasets: [
    {
      data: [40, 20, 10, 12, 10, 8],
      backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6', '#94a3b8'],
      borderWidth: 0,
    },
  ],
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Accounting Dashboard</h1>
      <p class="text-gray-500 mt-1">Financial overview for current fiscal year.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Revenue"
        value="Rp 693 Jt"
        trend="up"
        trendValue="+18.2%"
        subtitle="YTD"
        :icon="DollarSign"
      />
      <StatCard
        title="Total Expense"
        value="Rp 524 Jt"
        trend="up"
        trendValue="+12.5%"
        subtitle="YTD"
        :icon="TrendingDown"
      />
      <StatCard
        title="Net Profit"
        value="Rp 169 Jt"
        trend="up"
        trendValue="+32%"
        subtitle="YTD"
        :icon="TrendingUp"
      />
      <StatCard
        title="Cash Balance"
        value="Rp 245 Jt"
        trend="up"
        trendValue="+8%"
        subtitle="current"
        :icon="Wallet"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <BaseCard>
        <template #header><h4 class="font-semibold">Cash Flow</h4></template>
        <LineChart :data="cashFlowData" :height="280" />
      </BaseCard>
      <BaseCard>
        <template #header><h4 class="font-semibold">Monthly Net Profit</h4></template>
        <BarChart :data="profitData" :height="280" />
      </BaseCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <BaseCard>
        <template #header><h4 class="font-semibold">Expense Breakdown</h4></template>
        <DoughnutChart :data="expenseBreakdown" :height="220" />
      </BaseCard>
      <BaseCard class="lg:col-span-2">
        <template #header><h4 class="font-semibold">Recent Journal Entries</h4></template>
        <div class="space-y-3">
          <div
            v-for="(item, idx) in [
              {
                date: '2025-07-11',
                ref: 'JV-0147',
                desc: 'Monthly salary payment',
                debit: 45000000,
                credit: 45000000,
              },
              {
                date: '2025-07-10',
                ref: 'JV-0146',
                desc: 'Office rent Q3',
                debit: 15000000,
                credit: 15000000,
              },
              {
                date: '2025-07-09',
                ref: 'JV-0145',
                desc: 'Revenue from client PT Maju',
                debit: 32000000,
                credit: 32000000,
              },
              {
                date: '2025-07-08',
                ref: 'JV-0144',
                desc: 'Utilities payment',
                debit: 3500000,
                credit: 3500000,
              },
              {
                date: '2025-07-07',
                ref: 'JV-0143',
                desc: 'Purchase office supplies',
                debit: 2800000,
                credit: 2800000,
              },
            ]"
            :key="idx"
            class="flex items-center justify-between py-2"
            :class="idx < 4 ? 'border-b border-gray-100' : ''"
          >
            <div>
              <p class="text-sm font-medium text-gray-800">{{ item.desc }}</p>
              <p class="text-xs text-gray-400">{{ item.date }} · {{ item.ref }}</p>
            </div>
            <span class="text-sm font-mono font-semibold text-gray-700"
              >Rp {{ (item.debit / 1000000).toFixed(1) }} Jt</span
            >
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
