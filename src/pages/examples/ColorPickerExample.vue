<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard } from '@purdia/ui'

const selectedColor = ref('#3b82f6')
const selectedColor2 = ref('#10b981')

const colors = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#64748b',
  '#000000',
  '#ffffff',
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Color Picker</h1>
      <p class="text-gray-500 mt-1">Color selection component with predefined palettes.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Small (4 columns)</h4></template>
      <div class="grid grid-cols-4 gap-1.5 max-w-[120px]">
        <button
          v-for="color in colors.slice(0, 12)"
          :key="color"
          class="w-6 h-6 rounded border border-gray-200 cursor-pointer transition-transform hover:scale-110"
          :class="selectedColor === color ? 'ring-2 ring-primary-500 ring-offset-1' : ''"
          :style="{ backgroundColor: color }"
          @click="selectedColor = color"
        ></button>
      </div>
      <p class="text-xs text-gray-500 mt-2">Selected: {{ selectedColor }}</p>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Medium (5 columns)</h4></template>
      <div class="grid grid-cols-5 gap-2 max-w-[180px]">
        <button
          v-for="color in colors"
          :key="color"
          class="w-8 h-8 rounded-md border border-gray-200 cursor-pointer transition-transform hover:scale-110"
          :class="selectedColor === color ? 'ring-2 ring-primary-500 ring-offset-2' : ''"
          :style="{ backgroundColor: color }"
          @click="selectedColor = color"
        ></button>
      </div>
      <p class="text-xs text-gray-500 mt-3">Selected: {{ selectedColor }}</p>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Large (10 columns)</h4></template>
      <div class="grid grid-cols-10 gap-2.5 max-w-[400px]">
        <button
          v-for="color in colors"
          :key="color"
          class="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer transition-transform hover:scale-110"
          :class="selectedColor2 === color ? 'ring-2 ring-primary-500 ring-offset-2' : ''"
          :style="{ backgroundColor: color }"
          @click="selectedColor2 = color"
        ></button>
      </div>
      <div class="flex items-center gap-3 mt-3">
        <div
          class="w-8 h-8 rounded-lg border border-gray-200"
          :style="{ backgroundColor: selectedColor2 }"
        ></div>
        <span class="text-sm font-mono text-gray-700">{{ selectedColor2 }}</span>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;div class="grid grid-cols-5 gap-2"&gt;
  &lt;button
    v-for="color in colors"
    :key="color"
    class="w-8 h-8 rounded-md border cursor-pointer"
    :class="selected === color ? 'ring-2 ring-primary-500' : ''"
    :style="{ backgroundColor: color }"
    @click="selected = color"
  /&gt;
&lt;/div&gt;</code></pre>
    </BaseCard>
  </div>
</template>
