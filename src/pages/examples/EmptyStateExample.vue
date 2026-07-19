<script setup lang="ts">
import { BaseCard } from '@purdia/ui'
import { Inbox, Search, FileX, Plus } from '@lucide/vue'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Empty State</h1>
      <p class="text-gray-500 mt-1">Placeholder component for empty data states.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Small</h4></template>
      <div class="flex flex-col items-center justify-center py-6 text-center">
        <Inbox class="w-8 h-8 text-gray-300 mb-2" />
        <p class="text-sm text-gray-500">No items found</p>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Medium (Default)</h4></template>
      <div class="flex flex-col items-center justify-center py-12 text-center">
        <Inbox class="w-12 h-12 text-gray-300 mb-3" />
        <h3 class="text-base font-semibold text-gray-900 mb-1">No projects yet</h3>
        <p class="text-sm text-gray-500 max-w-xs">
          Get started by creating your first project. It only takes a few seconds.
        </p>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Large with Action Button</h4></template>
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <FileX class="w-8 h-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-1">No documents</h3>
        <p class="text-sm text-gray-500 max-w-sm mb-5">
          Upload your first document to get started. We support PDF, Word, and image files.
        </p>
        <button
          class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Plus class="w-4 h-4" />
          Upload document
        </button>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Custom Icon (Search)</h4></template>
      <div class="flex flex-col items-center justify-center py-12 text-center">
        <div class="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <Search class="w-7 h-7 text-blue-400" />
        </div>
        <h3 class="text-base font-semibold text-gray-900 mb-1">No results found</h3>
        <p class="text-sm text-gray-500 max-w-xs">
          Try adjusting your search or filter to find what you're looking for.
        </p>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;!-- Empty state with icon and action --&gt;
&lt;div class="flex flex-col items-center justify-center py-12 text-center"&gt;
  &lt;Inbox class="w-12 h-12 text-gray-300 mb-3" /&gt;
  &lt;h3 class="text-base font-semibold"&gt;No items&lt;/h3&gt;
  &lt;p class="text-sm text-gray-500"&gt;Description text&lt;/p&gt;
  &lt;button class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg"&gt;
    Action
  &lt;/button&gt;
&lt;/div&gt;</code></pre>
    </BaseCard>
  </div>
</template>
