<script setup lang="ts">
import { BaseSpinner, BaseCard } from '@purdia/ui'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Spinner</h1>
      <p class="text-gray-500 mt-1">
        Loading indicator for async operations and content loading states.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex flex-col items-center gap-2">
          <BaseSpinner size="xs" />
          <span class="text-xs text-gray-500">xs</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <BaseSpinner size="sm" />
          <span class="text-xs text-gray-500">sm</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <BaseSpinner size="md" />
          <span class="text-xs text-gray-500">md</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <BaseSpinner size="lg" />
          <span class="text-xs text-gray-500">lg</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <BaseSpinner size="xl" />
          <span class="text-xs text-gray-500">xl</span>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex flex-col items-center gap-2">
          <BaseSpinner variant="primary" />
          <span class="text-xs text-gray-500">primary</span>
        </div>
        <div class="flex flex-col items-center gap-2 bg-gray-800 p-4 rounded-lg">
          <BaseSpinner variant="white" />
          <span class="text-xs text-gray-300">white</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <BaseSpinner variant="gray" />
          <span class="text-xs text-gray-500">gray</span>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Inline with Text</h4></template>
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <BaseSpinner size="xs" />
          <span class="text-sm text-gray-600 dark:text-gray-400">Loading data...</span>
        </div>
        <div class="flex items-center gap-2">
          <BaseSpinner size="sm" />
          <span class="text-sm text-gray-600 dark:text-gray-400">Processing your request...</span>
        </div>
        <div class="flex items-center gap-3">
          <BaseSpinner size="md" variant="primary" />
          <span class="text-base text-gray-700 dark:text-gray-300">Saving changes...</span>
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseSpinner size="md" variant="primary" /&gt;
&lt;BaseSpinner size="sm" variant="gray" /&gt;

&lt;!-- Inline with text --&gt;
&lt;div class="flex items-center gap-2"&gt;
  &lt;BaseSpinner size="xs" /&gt;
  &lt;span&gt;Loading...&lt;/span&gt;
&lt;/div&gt;</code></pre>
    </BaseCard>
  </div>
</template>
