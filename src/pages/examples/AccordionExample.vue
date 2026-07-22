<script setup lang="ts">
import { BaseAccordion, BaseCard } from '@purdia/ui'

const defaultItems = [
  {
    title: 'What is Purdia UI?',
    content: 'Purdia UI is a modern component library built with Vue 3 and Tailwind CSS.',
  },
  { title: 'How do I install it?', content: 'You can install it via npm: npm install @purdia/ui' },
  { title: 'Is it open source?', content: 'Yes, Purdia UI is fully open source and free to use.' },
]

const disabledItems = [
  { title: 'Available item', content: 'This item can be toggled.' },
  { title: 'Disabled item', content: 'This content is hidden.', disabled: true },
  { title: 'Another available item', content: 'This item can also be toggled.' },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Accordion</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">Collapsible content sections for organizing information.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Default Variant</h4></template>
      <div class="max-w-lg">
        <BaseAccordion :items="defaultItems" variant="default" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Bordered Variant</h4></template>
      <div class="max-w-lg">
        <BaseAccordion :items="defaultItems" variant="bordered" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Separated Variant</h4></template>
      <div class="max-w-lg">
        <BaseAccordion :items="defaultItems" variant="separated" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Multiple Mode</h4></template>
      <div class="max-w-lg">
        <BaseAccordion :items="defaultItems" :multiple="true" variant="bordered" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Disabled Items</h4></template>
      <div class="max-w-lg">
        <BaseAccordion :items="disabledItems" variant="bordered" />
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseAccordion
  :items="[
    { title: 'Section 1', content: 'Content for section 1' },
    { title: 'Section 2', content: 'Content for section 2' },
    { title: 'Disabled', content: '...', disabled: true },
  ]"
  variant="bordered"
  :multiple="true"
/&gt;</code></pre>
    </BaseCard>
  </div>
</template>
