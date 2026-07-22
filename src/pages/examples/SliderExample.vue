<script setup lang="ts">
import { ref } from 'vue'
import { BaseSlider, BaseCard } from '@purdia/ui'

const value1 = ref(50)
const value2 = ref(75)
const value3 = ref(30)
const value4 = ref(60)
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Slider</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">Range slider component for numeric value selection.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Default</h4></template>
      <div class="space-y-4 max-w-md">
        <BaseSlider v-model="value1" />
        <p class="text-sm text-gray-500">Value: {{ value1 }}</p>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Value Display</h4></template>
      <div class="space-y-4 max-w-md">
        <BaseSlider v-model="value2" :show-value="true" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Custom Min/Max/Step</h4></template>
      <div class="space-y-4 max-w-md">
        <div>
          <label class="text-xs font-medium text-gray-600 mb-1 block"
            >Temperature (0°C - 50°C, step 5)</label
          >
          <BaseSlider
            v-model="value3"
            :min="0"
            :max="50"
            :step="5"
            variant="warning"
            :show-value="true"
          />
        </div>
        <div>
          <label class="text-xs font-medium text-gray-600 mb-1 block"
            >Volume (0 - 10, step 1)</label
          >
          <BaseSlider
            v-model="value4"
            :min="0"
            :max="10"
            :step="1"
            variant="success"
            :show-value="true"
          />
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Disabled</h4></template>
      <div class="space-y-4 max-w-md">
        <BaseSlider v-model="value1" :disabled="true" />
        <p class="text-xs text-gray-400">Slider is disabled</p>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseSlider v-model="value" variant="primary" :show-value="true" /&gt;

&lt;!-- Custom range --&gt;
&lt;BaseSlider v-model="temp" :min="0" :max="50" :step="5" variant="warning" /&gt;

&lt;!-- Disabled --&gt;
&lt;BaseSlider v-model="value" :disabled="true" /&gt;</code></pre>
    </BaseCard>
  </div>
</template>
