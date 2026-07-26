<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Wrench, Clock } from '@lucide/vue'

// Countdown timer - estimated maintenance end
const targetTime = new Date()
targetTime.setHours(targetTime.getHours() + 2)

const timeLeft = ref({ hours: 0, minutes: 0, seconds: 0 })
let interval: ReturnType<typeof setInterval>

function updateCountdown() {
  const now = new Date()
  const diff = targetTime.getTime() - now.getTime()

  if (diff <= 0) {
    timeLeft.value = { hours: 0, minutes: 0, seconds: 0 }
    clearInterval(interval)
    return
  }

  timeLeft.value = {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

onMounted(() => {
  updateCountdown()
  interval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

function pad(n: number): string {
  return String(n).padStart(2, '0')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="text-center max-w-lg">
      <!-- Illustration -->
      <div class="relative mx-auto w-64 h-64 mb-8">
        <div class="absolute inset-0 bg-amber-100 dark:bg-amber-900/30 rounded-full"></div>
        <div class="relative flex flex-col items-center justify-center h-full">
          <Wrench class="w-20 h-20 text-amber-500 dark:text-amber-400 animate-bounce" />
        </div>
      </div>

      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">Under Maintenance</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-8 text-lg">
        We're performing scheduled maintenance to improve your experience. We'll be back shortly.
      </p>

      <!-- Countdown -->
      <div class="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Clock class="w-4 h-4" />
        <span>Estimated time remaining:</span>
      </div>

      <div class="flex items-center justify-center gap-3 mb-8">
        <div
          class="flex flex-col items-center px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[70px]"
        >
          <span class="text-2xl font-bold text-gray-900 dark:text-white font-mono">
            {{ pad(timeLeft.hours) }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">Hours</span>
        </div>
        <span class="text-2xl font-bold text-gray-400">:</span>
        <div
          class="flex flex-col items-center px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[70px]"
        >
          <span class="text-2xl font-bold text-gray-900 dark:text-white font-mono">
            {{ pad(timeLeft.minutes) }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">Minutes</span>
        </div>
        <span class="text-2xl font-bold text-gray-400">:</span>
        <div
          class="flex flex-col items-center px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[70px]"
        >
          <span class="text-2xl font-bold text-gray-900 dark:text-white font-mono">
            {{ pad(timeLeft.seconds) }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400 mt-1">Seconds</span>
        </div>
      </div>

      <!-- Status updates -->
      <div
        class="text-left bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
      >
        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Status Updates</h3>
        <div class="space-y-2">
          <div class="flex items-start gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">Database migration completed</p>
              <p class="text-xs text-gray-400">10 minutes ago</p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <div class="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0 animate-pulse"></div>
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">
                Application server update in progress
              </p>
              <p class="text-xs text-gray-400">In progress</p>
            </div>
          </div>
          <div class="flex items-start gap-2">
            <div class="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 mt-1.5 shrink-0"></div>
            <div>
              <p class="text-sm text-gray-700 dark:text-gray-300">Cache invalidation & warm-up</p>
              <p class="text-xs text-gray-400">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
