<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard } from '@purdia/ui'
import { Minus, Plus } from '@lucide/vue'

const value1 = ref(5)
const value2 = ref(0)
const value3 = ref(10)
const value4 = ref(1)
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Number Input</h1>
      <p class="text-gray-500 mt-1">Numeric input with increment/decrement controls.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="space-y-4 max-w-xs">
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Small</label>
          <div class="inline-flex items-center border border-gray-300 rounded-md">
            <button
              class="px-2 py-1 text-gray-500 hover:bg-gray-50"
              @click="value1 = Math.max(0, value1 - 1)"
            >
              <Minus class="w-3 h-3" />
            </button>
            <input
              type="number"
              v-model="value1"
              class="w-12 text-center text-xs border-x border-gray-300 py-1 focus:outline-none"
            />
            <button class="px-2 py-1 text-gray-500 hover:bg-gray-50" @click="value1++">
              <Plus class="w-3 h-3" />
            </button>
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Medium</label>
          <div class="inline-flex items-center border border-gray-300 rounded-lg">
            <button
              class="px-3 py-2 text-gray-500 hover:bg-gray-50"
              @click="value2 = Math.max(0, value2 - 1)"
            >
              <Minus class="w-4 h-4" />
            </button>
            <input
              type="number"
              v-model="value2"
              class="w-14 text-center text-sm border-x border-gray-300 py-2 focus:outline-none"
            />
            <button class="px-3 py-2 text-gray-500 hover:bg-gray-50" @click="value2++">
              <Plus class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div>
          <label class="text-xs text-gray-500 mb-1 block">Large</label>
          <div class="inline-flex items-center border border-gray-300 rounded-lg">
            <button
              class="px-4 py-3 text-gray-500 hover:bg-gray-50"
              @click="value3 = Math.max(0, value3 - 1)"
            >
              <Minus class="w-5 h-5" />
            </button>
            <input
              type="number"
              v-model="value3"
              class="w-16 text-center text-base border-x border-gray-300 py-3 focus:outline-none"
            />
            <button class="px-4 py-3 text-gray-500 hover:bg-gray-50" @click="value3++">
              <Plus class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Min/Max (1-10)</h4></template>
      <div class="inline-flex items-center border border-gray-300 rounded-lg">
        <button
          class="px-3 py-2 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="value4 <= 1"
          @click="value4 = Math.max(1, value4 - 1)"
        >
          <Minus class="w-4 h-4" />
        </button>
        <input
          type="number"
          v-model="value4"
          min="1"
          max="10"
          class="w-14 text-center text-sm border-x border-gray-300 py-2 focus:outline-none"
        />
        <button
          class="px-3 py-2 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="value4 >= 10"
          @click="value4 = Math.min(10, value4 + 1)"
        >
          <Plus class="w-4 h-4" />
        </button>
      </div>
      <p class="text-xs text-gray-500 mt-2">Min: 1, Max: 10 — Current: {{ value4 }}</p>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Disabled</h4></template>
      <div
        class="inline-flex items-center border border-gray-200 rounded-lg opacity-50 cursor-not-allowed"
      >
        <button class="px-3 py-2 text-gray-400" disabled>
          <Minus class="w-4 h-4" />
        </button>
        <input
          type="number"
          value="3"
          disabled
          class="w-14 text-center text-sm border-x border-gray-200 py-2 bg-gray-50 cursor-not-allowed"
        />
        <button class="px-3 py-2 text-gray-400" disabled>
          <Plus class="w-4 h-4" />
        </button>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;div class="inline-flex items-center border border-gray-300 rounded-lg"&gt;
  &lt;button @click="value--"&gt;&lt;Minus /&gt;&lt;/button&gt;
  &lt;input type="number" v-model="value" class="w-14 text-center border-x" /&gt;
  &lt;button @click="value++"&gt;&lt;Plus /&gt;&lt;/button&gt;
&lt;/div&gt;</code></pre>
    </BaseCard>
  </div>
</template>
