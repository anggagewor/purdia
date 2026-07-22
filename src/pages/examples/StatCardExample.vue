<script setup lang="ts">
import { StatCard, BaseCard } from '@purdia/ui'
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Heart,
  Star,
  Eye,
  Download,
} from '@lucide/vue'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Stat Card</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Card untuk menampilkan metric/KPI dengan trend indicator dan icon.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Basic Usage</h4></template>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Revenue"
          value="$45,231"
          trend="up"
          trendValue="+20.1%"
          subtitle="from last month"
          :icon="DollarSign"
        />
        <StatCard
          title="Users"
          value="2,350"
          trend="up"
          trendValue="+15.3%"
          subtitle="new signups"
          :icon="Users"
        />
        <StatCard
          title="Orders"
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
          subtitle="improvement"
          :icon="TrendingUp"
        />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Different Icons</h4></template>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Likes" value="8,420" trend="up" trendValue="+12%" :icon="Heart" />
        <StatCard title="Rating" value="4.8/5" trend="neutral" trendValue="±0" :icon="Star" />
        <StatCard title="Page Views" value="124K" trend="up" trendValue="+32%" :icon="Eye" />
        <StatCard title="Downloads" value="5,672" trend="down" trendValue="-8%" :icon="Download" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Without Icon / Trend</h4></template>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Products" value="342" subtitle="in catalog" />
        <StatCard title="Active Sessions" value="89" trend="up" trendValue="+5" />
        <StatCard title="Bounce Rate" value="32.1%" :icon="TrendingUp" />
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;StatCard
  title="Revenue"
  value="$45,231"
  trend="up"
  trendValue="+20.1%"
  subtitle="from last month"
  :icon="DollarSign"
/&gt;</code></pre>
    </BaseCard>
  </div>
</template>
