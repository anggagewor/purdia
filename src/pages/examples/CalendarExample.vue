<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard } from '@purdia/ui'
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const selectedDate = ref<number | null>(15)
const currentMonth = ref('March 2024')
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const dates = [
  [0, 0, 0, 0, 0, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, 0, 0, 0, 0, 0, 0],
]
const events: Record<number, string> = { 5: 'Meeting', 12: 'Deadline', 15: 'Launch', 22: 'Review' }
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Calendar</h1>
      <p class="text-gray-500 mt-1">Date calendar component with event indicators.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Default</h4></template>
      <div class="max-w-xs">
        <div class="flex items-center justify-between mb-4">
          <button class="p-1 hover:bg-gray-100 rounded">
            <ChevronLeft class="w-4 h-4 text-gray-600" />
          </button>
          <span class="text-sm font-semibold text-gray-900">{{ currentMonth }}</span>
          <button class="p-1 hover:bg-gray-100 rounded">
            <ChevronRight class="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div
            v-for="day in days"
            :key="day"
            class="text-center text-[10px] font-medium text-gray-400 py-1"
          >
            {{ day }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <template v-for="(week, wi) in dates" :key="wi">
            <button
              v-for="(date, di) in week"
              :key="di"
              class="aspect-square flex items-center justify-center text-xs rounded-md transition-colors"
              :class="
                date === 0
                  ? 'invisible'
                  : date === selectedDate
                    ? 'bg-primary-500 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100'
              "
              :disabled="date === 0"
              @click="date > 0 && (selectedDate = date)"
            >
              {{ date || '' }}
            </button>
          </template>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Compact</h4></template>
      <div class="max-w-[200px]">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-gray-900">Mar 2024</span>
        </div>
        <div class="grid grid-cols-7 gap-0.5">
          <div
            v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']"
            :key="day"
            class="text-center text-[9px] font-medium text-gray-400 py-0.5"
          >
            {{ day }}
          </div>
          <template v-for="(week, wi) in dates" :key="wi">
            <div
              v-for="(date, di) in week"
              :key="di"
              class="aspect-square flex items-center justify-center text-[10px] rounded"
              :class="
                date === 0
                  ? 'invisible'
                  : date === selectedDate
                    ? 'bg-primary-500 text-white font-bold'
                    : 'text-gray-600'
              "
            >
              {{ date || '' }}
            </div>
          </template>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Events</h4></template>
      <div class="max-w-xs">
        <div class="flex items-center justify-between mb-4">
          <span class="text-sm font-semibold text-gray-900">{{ currentMonth }}</span>
        </div>
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div
            v-for="day in days"
            :key="day"
            class="text-center text-[10px] font-medium text-gray-400 py-1"
          >
            {{ day }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <template v-for="(week, wi) in dates" :key="wi">
            <div
              v-for="(date, di) in week"
              :key="di"
              class="aspect-square flex flex-col items-center justify-center text-xs rounded-md relative"
              :class="date === 0 ? 'invisible' : 'text-gray-700'"
            >
              <span>{{ date || '' }}</span>
              <div v-if="events[date]" class="w-1 h-1 rounded-full bg-primary-500 mt-0.5"></div>
            </div>
          </template>
        </div>
        <div class="mt-4 space-y-1">
          <div v-for="(label, day) in events" :key="day" class="flex items-center gap-2 text-xs">
            <div class="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
            <span class="text-gray-600">{{ day }} Mar — {{ label }}</span>
          </div>
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;div class="grid grid-cols-7 gap-1"&gt;
  &lt;button v-for="date in dates"
    :class="date === selected ? 'bg-primary-500 text-white' : 'hover:bg-gray-100'"
    @click="selected = date"&gt;
    {{ date }}
  &lt;/button&gt;
&lt;/div&gt;</code></pre>
    </BaseCard>
  </div>
</template>
