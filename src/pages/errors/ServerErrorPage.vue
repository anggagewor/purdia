<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Home, RefreshCw, ServerCrash } from '@lucide/vue'

const router = useRouter()

function reload() {
  window.location.reload()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="text-center max-w-lg">
      <!-- Illustration -->
      <div class="relative mx-auto w-64 h-64 mb-8">
        <div
          class="absolute inset-0 bg-orange-100 dark:bg-orange-900/30 rounded-full animate-pulse"
        ></div>
        <div class="relative flex flex-col items-center justify-center h-full">
          <ServerCrash class="w-16 h-16 text-orange-500 dark:text-orange-400 mb-2" />
          <span class="text-7xl font-black text-orange-600 dark:text-orange-400">500</span>
        </div>
      </div>

      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">Server Error</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-8 text-lg">
        Something went wrong on our end. Our team has been notified and we're working to fix it.
      </p>

      <div class="flex items-center justify-center gap-3">
        <button
          class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          @click="reload"
        >
          <RefreshCw class="w-4 h-4" />
          Try Again
        </button>
        <router-link
          to="/"
          class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
        >
          <Home class="w-4 h-4" />
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>
