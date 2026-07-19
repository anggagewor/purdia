<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseBadge } from '@purdia/ui'
import { StatCard } from '@purdia/ui'
import {
  Users,
  Building2,
  Clock,
  CalendarDays,
  Wallet,
  UserCheck,
  UserX,
  GraduationCap,
} from '@lucide/vue'

const recentLeave = ref([
  {
    id: 1,
    name: 'Andi Pratama',
    type: 'Annual Leave',
    dates: '15-18 Jul 2026',
    status: 'approved',
  },
  { id: 2, name: 'Dewi Lestari', type: 'Sick Leave', dates: '12 Jul 2026', status: 'approved' },
  {
    id: 3,
    name: 'Rudi Hermawan',
    type: 'Annual Leave',
    dates: '20-24 Jul 2026',
    status: 'pending',
  },
  { id: 4, name: 'Maya Sari', type: 'Personal Leave', dates: '14 Jul 2026', status: 'pending' },
  {
    id: 5,
    name: 'Bambang Widodo',
    type: 'Annual Leave',
    dates: '28-30 Jul 2026',
    status: 'rejected',
  },
])

const upcomingBirthdays = ref([
  { id: 1, name: 'Siska Amelia', date: '14 Jul', department: 'Marketing' },
  { id: 2, name: 'Hendra Gunawan', date: '18 Jul', department: 'Engineering' },
  { id: 3, name: 'Linda Susanti', date: '22 Jul', department: 'Finance' },
  { id: 4, name: 'Farhan Rizky', date: '25 Jul', department: 'HR' },
])

const announcements = ref([
  { id: 1, title: 'Company Outing - August 2026', date: '10 Jul 2026', type: 'event' },
  { id: 2, title: 'New Health Insurance Policy', date: '08 Jul 2026', type: 'policy' },
  { id: 3, title: 'Office Renovation Schedule', date: '05 Jul 2026', type: 'info' },
])
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">HRM Dashboard</h1>
      <p class="text-gray-500 mt-1">Human Resource Management overview.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Employees" value="156" :icon="Users" trend="up" trend-value="+4" />
      <StatCard title="Departments" value="8" :icon="Building2" />
      <StatCard title="On Leave Today" value="5" :icon="CalendarDays" />
      <StatCard title="Open Positions" value="12" :icon="UserCheck" trend="up" trend-value="+3" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Leave Requests -->
      <BaseCard class="lg:col-span-2">
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">Recent Leave Requests</h3>
        </template>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div
            v-for="leave in recentLeave"
            :key="leave.id"
            class="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ leave.name }}</p>
              <p class="text-xs text-gray-500">{{ leave.type }} &middot; {{ leave.dates }}</p>
            </div>
            <BaseBadge
              :variant="
                leave.status === 'approved'
                  ? 'success'
                  : leave.status === 'pending'
                    ? 'warning'
                    : 'danger'
              "
              size="sm"
              >{{ leave.status }}</BaseBadge
            >
          </div>
        </div>
      </BaseCard>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Birthdays -->
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">🎂 Upcoming Birthdays</h3>
          </template>
          <div class="space-y-3">
            <div
              v-for="b in upcomingBirthdays"
              :key="b.id"
              class="flex items-center justify-between"
            >
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ b.name }}</p>
                <p class="text-xs text-gray-500">{{ b.department }}</p>
              </div>
              <span class="text-xs font-medium text-primary-600 dark:text-primary-400">{{
                b.date
              }}</span>
            </div>
          </div>
        </BaseCard>

        <!-- Announcements -->
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Announcements</h3>
          </template>
          <div class="space-y-3">
            <div v-for="a in announcements" :key="a.id">
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ a.title }}</p>
              <p class="text-xs text-gray-500">{{ a.date }}</p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
