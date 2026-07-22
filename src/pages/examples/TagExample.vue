<script setup lang="ts">
import { ref } from 'vue'
import { BaseTag, BaseCard } from '@purdia/ui'

const tags = ref(['Vue', 'TypeScript', 'Tailwind', 'Vite'])

function removeTag(index: number) {
  tags.value.splice(index, 1)
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Tag</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">Compact labels for categorization and status display.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseTag label="Primary" variant="primary" />
        <BaseTag label="Secondary" variant="secondary" />
        <BaseTag label="Success" variant="success" />
        <BaseTag label="Warning" variant="warning" />
        <BaseTag label="Danger" variant="danger" />
        <BaseTag label="Info" variant="info" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseTag label="Small" size="sm" />
        <BaseTag label="Medium" size="md" />
        <BaseTag label="Large" size="lg" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Removable</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseTag
          v-for="(tag, index) in tags"
          :key="tag"
          :label="tag"
          :removable="true"
          @remove="removeTag(index)"
        />
      </div>
      <p class="text-sm text-gray-500 mt-3">Click × to remove. Remaining: {{ tags.length }}</p>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Rounded vs Square</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseTag label="Rounded (default)" :rounded="true" variant="primary" />
        <BaseTag label="Square" :rounded="false" variant="primary" />
        <BaseTag label="Rounded" :rounded="true" variant="success" />
        <BaseTag label="Square" :rounded="false" variant="success" />
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseTag label="Active" variant="success" /&gt;
&lt;BaseTag label="Draft" variant="secondary" size="sm" /&gt;
&lt;BaseTag label="Removable" :removable="true" @remove="handleRemove" /&gt;
&lt;BaseTag label="Square" :rounded="false" variant="info" /&gt;</code></pre>
    </BaseCard>
  </div>
</template>
