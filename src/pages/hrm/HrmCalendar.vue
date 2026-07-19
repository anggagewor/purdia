<script setup lang="ts">
import { ref, computed } from 'vue'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import { ChevronLeft, ChevronRight, Plus } from '@lucide/vue'

const currentDate = ref(new Date(2026, 6, 12)) // July 2026

const events = ref([
  { id: 1, title: 'Ulang Tahun: Andi Pratama', date: '2026-07-14', time: '', type: 'birthday' },
  { id: 2, title: 'Cuti: Dewi Lestari', date: '2026-07-14', time: '', type: 'leave' },
  {
    id: 3,
    title: 'Training: Leadership Workshop',
    date: '2026-07-15',
    time: '09:00',
    type: 'training',
  },
  { id: 4, title: 'Cuti: Rudi Hermawan', date: '2026-07-16', time: '', type: 'leave' },
  { id: 5, title: 'Ulang Tahun: Maya Sari', date: '2026-07-18', time: '', type: 'birthday' },
  { id: 6, title: 'Hari Raya Idul Adha', date: '2026-07-07', time: '', type: 'holiday' },
  {
    id: 7,
    title: 'Training: Safety Induction',
    date: '2026-07-21',
    time: '10:00',
    type: 'training',
  },
  { id: 8, title: 'Cuti: Bambang Widodo', date: '2026-07-22', time: '', type: 'leave' },
  { id: 9, title: 'Ulang Tahun: Hendra Gunawan', date: '2026-07-25', time: '', type: 'birthday' },
  {
    id: 10,
    title: 'Training: Excel Advanced',
    date: '2026-07-28',
    time: '13:00',
    type: 'training',
  },
])

const monthYear = computed(() => {
  return currentDate.value.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days: { day: number; isCurrentMonth: boolean; date: string }[] = []

  // Previous month padding
  const prevMonthDays = new Date(year, month, 0).getDate()
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isCurrentMonth: false, date: '' })
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    days.push({ day: i, isCurrentMonth: true, date: dateStr })
  }

  // Next month padding
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isCurrentMonth: false, date: '' })
  }

  return days
})

function getEventsForDate(date: string) {
  return events.value.filter((e) => e.date === date)
}

function prevMonth() {
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() - 1)
  currentDate.value = d
}

function nextMonth() {
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() + 1)
  currentDate.value = d
}

function eventColor(type: string) {
  const map: Record<string, string> = {
    birthday: 'bg-pink-500',
    leave: 'bg-orange-500',
    training: 'bg-blue-500',
    holiday: 'bg-red-500',
  }
  return map[type] || 'bg-gray-500'
}

const today = '2026-07-12'

// Upcoming events
const upcomingEvents = computed(() => {
  return events.value
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">HR Calendar</h1>
        <p class="text-gray-500 mt-1">View birthdays, leave, training, and holidays.</p>
      </div>
      <BaseButton size="sm" :icon="Plus">Add Event</BaseButton>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Calendar Grid -->
      <div class="lg:col-span-3">
        <BaseCard>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
              {{ monthYear }}
            </h3>
            <div class="flex gap-1">
              <BaseButton variant="ghost" size="sm" :icon="ChevronLeft" @click="prevMonth" />
              <BaseButton variant="ghost" size="sm" :icon="ChevronRight" @click="nextMonth" />
            </div>
          </div>

          <!-- Day headers -->
          <div class="grid grid-cols-7 mb-1">
            <div
              v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
              :key="day"
              class="text-center text-xs font-medium text-gray-500 py-2"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar grid -->
          <div class="grid grid-cols-7 border-t border-l border-gray-200 dark:border-gray-700">
            <div
              v-for="(cell, idx) in calendarDays"
              :key="idx"
              class="min-h-[80px] border-r border-b border-gray-200 dark:border-gray-700 p-1"
              :class="{ 'bg-gray-50 dark:bg-gray-800/50': !cell.isCurrentMonth }"
            >
              <span
                class="text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full"
                :class="{
                  'text-gray-400': !cell.isCurrentMonth,
                  'text-gray-700 dark:text-gray-300': cell.isCurrentMonth && cell.date !== today,
                  'bg-primary-500 text-white': cell.date === today,
                }"
                >{{ cell.day }}</span
              >
              <div v-if="cell.isCurrentMonth" class="mt-0.5 space-y-0.5">
                <div
                  v-for="event in getEventsForDate(cell.date).slice(0, 2)"
                  :key="event.id"
                  class="flex items-center gap-1 px-1 py-0.5 rounded text-[0.6rem] leading-tight truncate"
                  :class="eventColor(event.type).replace('bg-', 'bg-') + '/10'"
                >
                  <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="eventColor(event.type)" />
                  <span class="truncate text-gray-700 dark:text-gray-300">{{ event.title }}</span>
                </div>
                <span
                  v-if="getEventsForDate(cell.date).length > 2"
                  class="text-[0.6rem] text-gray-400 px-1"
                >
                  +{{ getEventsForDate(cell.date).length - 2 }} more
                </span>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Sidebar: Upcoming -->
      <div>
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Upcoming Events</h3>
          </template>
          <div class="space-y-3">
            <div v-for="event in upcomingEvents" :key="event.id" class="flex items-start gap-2">
              <span class="w-2 h-2 rounded-full mt-1.5 shrink-0" :class="eventColor(event.type)" />
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ event.title }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ event.date }} {{ event.time ? `at ${event.time}` : '' }}
                </p>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Legend -->
        <BaseCard class="mt-4">
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Legend</h3>
          </template>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-pink-500" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Birthday</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-orange-500" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Leave</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-blue-500" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Training</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Holiday</span>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
