<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseBadge } from '@purdia/ui'
import { StatCard } from '@purdia/ui'
import {
  Users,
  Building2,
  Handshake,
  TrendingUp,
  DollarSign,
  Target,
  Clock,
  CheckCircle2,
} from '@lucide/vue'

const recentDeals = ref([
  {
    id: 1,
    name: 'Enterprise License',
    company: 'PT Teknologi Maju',
    value: 150000000,
    stage: 'negotiation',
    probability: 75,
  },
  {
    id: 2,
    name: 'Consulting Project',
    company: 'CV Solusi Digital',
    value: 85000000,
    stage: 'proposal',
    probability: 50,
  },
  {
    id: 3,
    name: 'SaaS Subscription',
    company: 'PT Global Infra',
    value: 45000000,
    stage: 'qualification',
    probability: 30,
  },
  {
    id: 4,
    name: 'Implementation',
    company: 'PT Nusantara Tech',
    value: 200000000,
    stage: 'closed-won',
    probability: 100,
  },
  {
    id: 5,
    name: 'Support Contract',
    company: 'PT Karya Bersama',
    value: 60000000,
    stage: 'proposal',
    probability: 60,
  },
])

const upcomingActivities = ref([
  { id: 1, type: 'call', title: 'Follow up call with PT Teknologi', time: '09:00', date: 'Today' },
  {
    id: 2,
    type: 'meeting',
    title: 'Demo presentation for CV Solusi',
    time: '14:00',
    date: 'Today',
  },
  { id: 3, type: 'email', title: 'Send proposal to PT Global', time: '10:00', date: 'Tomorrow' },
  {
    id: 4,
    type: 'task',
    title: 'Prepare quotation for Nusantara',
    time: '11:00',
    date: 'Tomorrow',
  },
])

function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

function stageColor(stage: string) {
  const map: Record<string, string> = {
    qualification: 'warning',
    proposal: 'info',
    negotiation: 'primary',
    'closed-won': 'success',
    'closed-lost': 'danger',
  }
  return (map[stage] || 'secondary') as
    | 'warning'
    | 'info'
    | 'primary'
    | 'success'
    | 'danger'
    | 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">CRM Dashboard</h1>
      <p class="text-gray-500 mt-1">Overview of your sales pipeline and activities.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Leads" value="124" :icon="Target" trend="up" trend-value="+12%" />
      <StatCard title="Active Deals" value="38" :icon="Handshake" trend="up" trend-value="+5%" />
      <StatCard title="Companies" value="67" :icon="Building2" trend="up" trend-value="+3%" />
      <StatCard
        title="Revenue (MTD)"
        value="Rp 540M"
        :icon="DollarSign"
        trend="up"
        trend-value="+18%"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Deals -->
      <BaseCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Recent Deals</h3>
        </template>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div
            v-for="deal in recentDeals"
            :key="deal.id"
            class="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ deal.name }}</p>
              <p class="text-xs text-gray-500">{{ deal.company }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {{ formatCurrency(deal.value) }}
              </p>
              <BaseBadge :variant="stageColor(deal.stage)" size="sm">{{
                deal.stage.replace('-', ' ')
              }}</BaseBadge>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Upcoming Activities -->
      <BaseCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Upcoming Activities</h3>
        </template>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div
            v-for="activity in upcomingActivities"
            :key="activity.id"
            class="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              :class="{
                'bg-blue-50 text-blue-500': activity.type === 'call',
                'bg-purple-50 text-purple-500': activity.type === 'meeting',
                'bg-green-50 text-green-500': activity.type === 'email',
                'bg-orange-50 text-orange-500': activity.type === 'task',
              }"
            >
              <Clock class="w-4 h-4" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {{ activity.title }}
              </p>
              <p class="text-xs text-gray-500">{{ activity.date }} at {{ activity.time }}</p>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
