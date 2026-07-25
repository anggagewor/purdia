<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Home, ArrowLeft } from '@lucide/vue'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="text-center max-w-lg">
      <!-- Illustration -->
      <div class="relative mx-auto w-64 h-64 mb-8">
        <div
          class="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-full animate-pulse"
        ></div>
        <div class="relative flex items-center justify-center h-full">
          <span class="text-8xl font-black text-primary-600 dark:text-primary-400">404</span>
        </div>
      </div>

      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">Page Not Found</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-8 text-lg">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <div class="flex items-center justify-center gap-3">
        <button
          class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          @click="router.back()"
        >
          <ArrowLeft class="w-4 h-4" />
          Go Back
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
