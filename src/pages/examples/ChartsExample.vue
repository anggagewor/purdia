<script setup lang="ts">
import { BaseCard } from '@purdia/ui'
import { LineChart, BarChart, DoughnutChart } from '@/components/charts'

const lineData = {
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

const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'This Week',
      data: [65, 59, 80, 81, 56, 95, 72],
      backgroundColor: '#6366f1',
      borderRadius: 6,
    },
    {
      label: 'Last Week',
      data: [45, 70, 60, 72, 48, 80, 65],
      backgroundColor: '#e2e8f0',
      borderRadius: 6,
    },
  ],
}

const doughnutData = {
  labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
  datasets: [
    {
      data: [45, 35, 15, 5],
      backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#94a3b8'],
      borderWidth: 0,
    },
  ],
}

const singleLineData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      label: 'Users',
      data: [100, 180, 160, 250, 310, 400],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: '#10b981',
    },
  ],
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Charts</h1>
      <p class="text-gray-500 mt-1">
        Chart components menggunakan Chart.js via vue-chartjs. Line, Bar, dan Doughnut.
      </p>
    </div>

    <!-- Line Chart -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Line Chart — Multi Dataset</h4></template>
      <LineChart :data="lineData" :height="300" />
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Line Chart — Single Dataset</h4></template>
      <LineChart :data="singleLineData" :height="250" />
    </BaseCard>

    <!-- Bar Chart -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Bar Chart — Grouped</h4></template>
      <BarChart :data="barData" :height="300" />
    </BaseCard>

    <!-- Doughnut -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseCard>
        <template #header><h4 class="font-semibold">Doughnut Chart</h4></template>
        <DoughnutChart :data="doughnutData" :height="280" />
      </BaseCard>

      <BaseCard>
        <template #header><h4 class="font-semibold">Info</h4></template>
        <div class="space-y-4 text-sm text-gray-600">
          <p>
            Charts use
            <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">vue-chartjs</code> (wrapper) and
            <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">chart.js</code> as the rendering
            engine.
          </p>
          <div>
            <p class="font-medium text-gray-800 mb-2">Available chart components:</p>
            <ul class="space-y-1 list-disc list-inside">
              <li>
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">LineChart</code> — line/area
                charts
              </li>
              <li>
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">BarChart</code> — vertical
                bars
              </li>
              <li>
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">DoughnutChart</code> —
                pie/donut
              </li>
            </ul>
          </div>
          <p>
            Pass <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">:options</code> prop to
            override default chart.js options.
          </p>
        </div>
      </BaseCard>
    </div>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import { LineChart } from '@/components/charts'

const data = {
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [{
    label: 'Revenue',
    data: [1200, 1900, 1500],
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    fill: true,
    tension: 0.4,
  }],
}
&lt;/script&gt;

&lt;template&gt;
  &lt;LineChart :data="data" :height="300" /&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>
  </div>
</template>
