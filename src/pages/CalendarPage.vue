<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, X } from '@lucide/vue'
import { BaseButton, BaseCard, BaseBadge } from '@purdia/ui'

interface CalendarEvent {
  id: number
  title: string
  date: string // YYYY-MM-DD
  time: string
  endTime: string
  location?: string
  color: string
  type: 'meeting' | 'deadline' | 'personal' | 'holiday'
}

const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const selectedDate = ref<string | null>(null)
const viewMode = ref<'month' | 'week'>('month')

const events = ref<CalendarEvent[]>([
  {
    id: 1,
    title: 'Sprint Planning',
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
    time: '09:00',
    endTime: '10:00',
    location: 'Conference Room A',
    color: 'bg-blue-500',
    type: 'meeting',
  },
  {
    id: 2,
    title: 'Design Review',
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
    time: '14:00',
    endTime: '15:30',
    location: 'Zoom',
    color: 'bg-purple-500',
    type: 'meeting',
  },
  {
    id: 3,
    title: 'Project Deadline',
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 2).padStart(2, '0')}`,
    time: '23:59',
    endTime: '23:59',
    color: 'bg-red-500',
    type: 'deadline',
  },
  {
    id: 4,
    title: 'Team Lunch',
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 3).padStart(2, '0')}`,
    time: '12:00',
    endTime: '13:00',
    location: 'Thai Garden Restaurant',
    color: 'bg-green-500',
    type: 'personal',
  },
  {
    id: 5,
    title: '1:1 with Manager',
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 1).padStart(2, '0')}`,
    time: '10:00',
    endTime: '10:30',
    location: 'Office',
    color: 'bg-indigo-500',
    type: 'meeting',
  },
  {
    id: 6,
    title: 'Client Presentation',
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 5).padStart(2, '0')}`,
    time: '15:00',
    endTime: '16:00',
    location: 'Google Meet',
    color: 'bg-amber-500',
    type: 'meeting',
  },
  {
    id: 7,
    title: 'Gym Session',
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 1).padStart(2, '0')}`,
    time: '07:00',
    endTime: '08:00',
    color: 'bg-emerald-500',
    type: 'personal',
  },
  {
    id: 8,
    title: 'Code Review',
    date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate() + 4).padStart(2, '0')}`,
    time: '11:00',
    endTime: '12:00',
    location: 'VS Code Live Share',
    color: 'bg-cyan-500',
    type: 'meeting',
  },
])

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const daysInMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate())
const firstDayOfMonth = computed(() => new Date(currentYear.value, currentMonth.value, 1).getDay())

const calendarDays = computed(() => {
  const days: { date: number; currentMonth: boolean; dateStr: string }[] = []

  // Previous month days
  const prevMonthDays = new Date(currentYear.value, currentMonth.value, 0).getDate()
  for (let i = firstDayOfMonth.value - 1; i >= 0; i--) {
    const d = prevMonthDays - i
    const m = currentMonth.value === 0 ? 12 : currentMonth.value
    const y = currentMonth.value === 0 ? currentYear.value - 1 : currentYear.value
    days.push({
      date: d,
      currentMonth: false,
      dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    })
  }

  // Current month days
  for (let i = 1; i <= daysInMonth.value; i++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    days.push({ date: i, currentMonth: true, dateStr })
  }

  // Next month days
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    const m = currentMonth.value + 2 > 12 ? 1 : currentMonth.value + 2
    const y = currentMonth.value + 2 > 12 ? currentYear.value + 1 : currentYear.value
    days.push({
      date: i,
      currentMonth: false,
      dateStr: `${y}-${String(m).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
    })
  }

  return days
})

function getEventsForDate(dateStr: string) {
  return events.value.filter((e) => e.date === dateStr)
}

function isToday(dateStr: string) {
  const t = today
  const todayStr = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
  return dateStr === todayStr
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function goToday() {
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
}

const selectedDateEvents = computed(() => {
  if (!selectedDate.value) return []
  return getEventsForDate(selectedDate.value)
})

function getTypeLabel(type: string) {
  const map: Record<string, string> = {
    meeting: 'Meeting',
    deadline: 'Deadline',
    personal: 'Personal',
    holiday: 'Holiday',
  }
  return map[type] || type
}

function getTypeVariant(type: string): 'info' | 'danger' | 'success' | 'warning' {
  const map: Record<string, 'info' | 'danger' | 'success' | 'warning'> = {
    meeting: 'info',
    deadline: 'danger',
    personal: 'success',
    holiday: 'warning',
  }
  return map[type] || 'info'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Calendar</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Manage your schedule and events.</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton variant="outline" size="sm" @click="goToday">Today</BaseButton>
        <BaseButton variant="primary" size="sm">
          <template #icon-left><Plus class="w-4 h-4" /></template>
          New Event
        </BaseButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Calendar grid -->
      <div class="lg:col-span-3">
        <BaseCard>
          <!-- Month navigation -->
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ monthNames[currentMonth] }} {{ currentYear }}
            </h2>
            <div class="flex items-center gap-1">
              <button
                class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="prevMonth"
              >
                <ChevronLeft class="w-4 h-4" />
              </button>
              <button
                class="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="nextMonth"
              >
                <ChevronRight class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Day names header -->
          <div class="grid grid-cols-7 mb-2">
            <div
              v-for="day in dayNames"
              :key="day"
              class="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar grid -->
          <div class="grid grid-cols-7 border-t border-l border-gray-200 dark:border-gray-700">
            <div
              v-for="(day, index) in calendarDays"
              :key="index"
              class="min-h-[90px] p-1.5 border-b border-r border-gray-200 dark:border-gray-700 cursor-pointer transition-colors"
              :class="[
                day.currentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50',
                selectedDate === day.dateStr ? 'ring-2 ring-inset ring-primary-500' : '',
                'hover:bg-gray-50 dark:hover:bg-gray-700/50',
              ]"
              @click="selectedDate = day.dateStr"
            >
              <span
                class="inline-flex items-center justify-center w-6 h-6 text-xs rounded-full"
                :class="[
                  isToday(day.dateStr)
                    ? 'bg-primary-600 text-white font-bold'
                    : day.currentMonth
                      ? 'text-gray-700 dark:text-gray-300'
                      : 'text-gray-400 dark:text-gray-600',
                ]"
              >
                {{ day.date }}
              </span>
              <!-- Event dots -->
              <div class="mt-1 space-y-0.5">
                <div
                  v-for="event in getEventsForDate(day.dateStr).slice(0, 2)"
                  :key="event.id"
                  class="flex items-center gap-1 px-1 py-0.5 rounded text-xs truncate"
                  :class="event.color + '/10'"
                >
                  <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="event.color"></span>
                  <span class="truncate text-gray-700 dark:text-gray-300">{{ event.title }}</span>
                </div>
                <div
                  v-if="getEventsForDate(day.dateStr).length > 2"
                  class="text-xs text-gray-400 dark:text-gray-500 px-1"
                >
                  +{{ getEventsForDate(day.dateStr).length - 2 }} more
                </div>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Sidebar: selected date events -->
      <div class="lg:col-span-1">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">
              {{
                selectedDate
                  ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'Select a date'
              }}
            </h3>
          </template>

          <div v-if="selectedDateEvents.length === 0" class="py-8 text-center">
            <Clock class="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p class="text-sm text-gray-400 dark:text-gray-500">No events scheduled</p>
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="event in selectedDateEvents"
              :key="event.id"
              class="p-3 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div class="flex items-start gap-2">
                <span class="w-2 h-2 rounded-full mt-1.5 shrink-0" :class="event.color"></span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ event.title }}</p>
                  <div
                    class="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400"
                  >
                    <Clock class="w-3 h-3" />
                    {{ event.time }} - {{ event.endTime }}
                  </div>
                  <div
                    v-if="event.location"
                    class="flex items-center gap-1 mt-0.5 text-xs text-gray-500 dark:text-gray-400"
                  >
                    <MapPin class="w-3 h-3" />
                    {{ event.location }}
                  </div>
                  <BaseBadge :variant="getTypeVariant(event.type)" size="sm" class="mt-2">
                    {{ getTypeLabel(event.type) }}
                  </BaseBadge>
                </div>
              </div>
            </div>
          </div>
        </BaseCard>

        <!-- Upcoming events -->
        <BaseCard class="mt-4">
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm">Upcoming</h3>
          </template>
          <div class="space-y-2.5">
            <div
              v-for="event in events.slice(0, 5)"
              :key="event.id"
              class="flex items-center gap-2"
            >
              <span class="w-2 h-2 rounded-full shrink-0" :class="event.color"></span>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
                  {{ event.title }}
                </p>
                <p class="text-xs text-gray-400">{{ event.time }}</p>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
