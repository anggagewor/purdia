<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseBadge } from '@purdia/ui'
import { StatCard } from '@purdia/ui'
import { Users, CalendarCheck, Palmtree, GraduationCap } from '@lucide/vue'
import { BarChart, DoughnutChart, LineChart } from '@purdia/charts'

// Monthly Attendance Rate
const attendanceData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Attendance Rate (%)',
      data: [92, 95, 93, 96, 94, 91, 94],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
})

// Department Headcount
const headcountData = ref({
  labels: ['Engineering', 'Marketing', 'Finance', 'HR', 'Operations', 'Sales', 'Support', 'Legal'],
  datasets: [
    {
      label: 'Employees',
      data: [42, 18, 14, 8, 28, 22, 16, 8],
      backgroundColor: [
        '#3b82f6',
        '#8b5cf6',
        '#f59e0b',
        '#10b981',
        '#06b6d4',
        '#ef4444',
        '#ec4899',
        '#64748b',
      ],
    },
  ],
})

// Leave by Type
const leaveData = ref({
  labels: ['Annual', 'Sick', 'Maternity', 'Unpaid', 'Personal', 'Marriage'],
  datasets: [
    {
      data: [45, 22, 8, 5, 12, 3],
      backgroundColor: ['#3b82f6', '#ef4444', '#8b5cf6', '#64748b', '#f59e0b', '#10b981'],
    },
  ],
})

// Department Budget
const departmentBudget = ref([
  { department: 'Engineering', budget: 'Rp 2.400M', spent: 'Rp 1.680M', remaining: 'Rp 720M' },
  { department: 'Marketing', budget: 'Rp 1.200M', spent: 'Rp 890M', remaining: 'Rp 310M' },
  { department: 'Finance', budget: 'Rp 800M', spent: 'Rp 520M', remaining: 'Rp 280M' },
  { department: 'HR', budget: 'Rp 600M', spent: 'Rp 380M', remaining: 'Rp 220M' },
  { department: 'Operations', budget: 'Rp 1.800M', spent: 'Rp 1.350M', remaining: 'Rp 450M' },
  { department: 'Sales', budget: 'Rp 1.500M', spent: 'Rp 1.120M', remaining: 'Rp 380M' },
  { department: 'Support', budget: 'Rp 900M', spent: 'Rp 620M', remaining: 'Rp 280M' },
  { department: 'Legal', budget: 'Rp 500M', spent: 'Rp 310M', remaining: 'Rp 190M' },
])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">HR Reports</h1>
      <p class="text-gray-500 mt-1">Workforce analytics and insights.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Employees" value="156" :icon="Users" trend="up" trend-value="+8%" />
      <StatCard
        title="Avg Attendance"
        value="94%"
        :icon="CalendarCheck"
        trend="up"
        trend-value="+2%"
      />
      <StatCard
        title="Leave Utilization"
        value="62%"
        :icon="Palmtree"
        trend="up"
        trend-value="+5%"
      />
      <StatCard
        title="Training Hours"
        value="1,240"
        :icon="GraduationCap"
        trend="up"
        trend-value="+18%"
      />
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <BaseCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Monthly Attendance Rate</h3>
        </template>
        <div class="h-64">
          <LineChart :data="attendanceData" />
        </div>
      </BaseCard>

      <BaseCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Department Headcount</h3>
        </template>
        <div class="h-64">
          <BarChart :data="headcountData" />
        </div>
      </BaseCard>
    </div>

    <!-- Bottom Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Leave by Type -->
      <BaseCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Leave by Type</h3>
        </template>
        <div class="h-56 flex items-center justify-center">
          <DoughnutChart :data="leaveData" />
        </div>
      </BaseCard>

      <!-- Department Budget -->
      <BaseCard class="lg:col-span-2">
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Department Budget</h3>
        </template>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-2 font-medium text-gray-500">Department</th>
                <th class="text-right py-2 font-medium text-gray-500">Budget</th>
                <th class="text-right py-2 font-medium text-gray-500">Spent</th>
                <th class="text-right py-2 font-medium text-gray-500">Remaining</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
              <tr v-for="(row, idx) in departmentBudget" :key="row.department">
                <td class="py-2.5">
                  <div class="flex items-center gap-2">
                    <span
                      class="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold"
                      >{{ idx + 1 }}</span
                    >
                    <span class="font-medium text-gray-900 dark:text-gray-100">{{
                      row.department
                    }}</span>
                  </div>
                </td>
                <td class="py-2.5 text-right text-gray-600 dark:text-gray-400">
                  {{ row.budget }}
                </td>
                <td class="py-2.5 text-right font-medium text-gray-900 dark:text-gray-100">
                  {{ row.spent }}
                </td>
                <td class="py-2.5 text-right">
                  <BaseBadge variant="success" size="sm">{{ row.remaining }}</BaseBadge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
