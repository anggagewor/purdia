<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard } from '@purdia/ui'

const currentStep = ref(2)
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Steps</h1>
      <p class="text-gray-500 mt-1">Step indicator component for multi-step processes.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Default</h4></template>
      <div class="flex items-center gap-2">
        <div v-for="step in 4" :key="step" class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors"
            :class="
              step <= currentStep
                ? 'bg-primary-500 border-primary-500 text-white'
                : 'border-gray-300 text-gray-500'
            "
          >
            {{ step }}
          </div>
          <div
            v-if="step < 4"
            class="w-12 h-0.5"
            :class="step < currentStep ? 'bg-primary-500' : 'bg-gray-200'"
          ></div>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Dots Variant</h4></template>
      <div class="flex items-center gap-2">
        <div v-for="step in 5" :key="step" class="flex items-center gap-2">
          <div
            class="w-3 h-3 rounded-full transition-colors"
            :class="step <= currentStep ? 'bg-primary-500' : 'bg-gray-300'"
          ></div>
          <div
            v-if="step < 5"
            class="w-8 h-0.5"
            :class="step < currentStep ? 'bg-primary-500' : 'bg-gray-200'"
          ></div>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Numbered with Labels</h4></template>
      <div class="flex items-start gap-4">
        <div
          v-for="(label, idx) in ['Account', 'Profile', 'Review', 'Complete']"
          :key="label"
          class="flex flex-col items-center gap-1 flex-1"
        >
          <div class="flex items-center w-full">
            <div
              class="flex-1 h-0.5"
              :class="
                idx === 0
                  ? 'bg-transparent'
                  : idx <= currentStep - 1
                    ? 'bg-primary-500'
                    : 'bg-gray-200'
              "
            ></div>
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 shrink-0"
              :class="
                idx < currentStep
                  ? 'bg-primary-500 border-primary-500 text-white'
                  : idx === currentStep
                    ? 'border-primary-500 text-primary-500'
                    : 'border-gray-300 text-gray-400'
              "
            >
              {{ idx + 1 }}
            </div>
            <div
              class="flex-1 h-0.5"
              :class="
                idx === 3
                  ? 'bg-transparent'
                  : idx < currentStep - 1
                    ? 'bg-primary-500'
                    : 'bg-gray-200'
              "
            ></div>
          </div>
          <span
            class="text-xs font-medium"
            :class="idx <= currentStep ? 'text-gray-900' : 'text-gray-400'"
            >{{ label }}</span
          >
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Clickable Steps</h4></template>
      <div class="flex items-center gap-2">
        <div v-for="step in 5" :key="step" class="flex items-center gap-2">
          <button
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors cursor-pointer hover:scale-110"
            :class="
              step <= currentStep
                ? 'bg-primary-500 border-primary-500 text-white'
                : 'border-gray-300 text-gray-500 hover:border-primary-300'
            "
            @click="currentStep = step"
          >
            {{ step }}
          </button>
          <div
            v-if="step < 5"
            class="w-12 h-0.5"
            :class="step < currentStep ? 'bg-primary-500' : 'bg-gray-200'"
          ></div>
        </div>
      </div>
      <p class="text-xs text-gray-500 mt-3">Current step: {{ currentStep }} — Click to navigate</p>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;!-- Default steps --&gt;
&lt;div class="flex items-center gap-2"&gt;
  &lt;div v-for="step in 4" class="flex items-center gap-2"&gt;
    &lt;div class="w-8 h-8 rounded-full ..."&gt;{{ step }}&lt;/div&gt;
    &lt;div class="w-12 h-0.5"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- Dots variant --&gt;
&lt;div class="w-3 h-3 rounded-full bg-primary-500"&gt;&lt;/div&gt;</code></pre>
    </BaseCard>
  </div>
</template>
