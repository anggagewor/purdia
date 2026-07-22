<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { BaseProgress, BaseCard } from '@purdia/ui'

const animatedValue = ref(0)
let interval: ReturnType<typeof setInterval>

onMounted(() => {
  interval = setInterval(() => {
    animatedValue.value = animatedValue.value >= 100 ? 0 : animatedValue.value + 1
  }, 50)
})

onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Progress</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Progress bar dengan variant warna, sizes, striped, dan animasi.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="space-y-4">
        <BaseProgress :value="40" variant="primary" :show-label="true" />
        <BaseProgress :value="60" variant="success" :show-label="true" />
        <BaseProgress :value="75" variant="warning" :show-label="true" />
        <BaseProgress :value="90" variant="danger" :show-label="true" />
        <BaseProgress :value="55" variant="info" :show-label="true" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="space-y-4">
        <div>
          <p class="text-xs text-gray-500 mb-1">Small</p>
          <BaseProgress :value="50" size="sm" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Medium</p>
          <BaseProgress :value="50" size="md" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Large</p>
          <BaseProgress :value="50" size="lg" />
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Striped</h4></template>
      <div class="space-y-4">
        <BaseProgress :value="65" variant="primary" :striped="true" size="md" :show-label="true" />
        <BaseProgress :value="80" variant="success" :striped="true" size="md" :show-label="true" />
        <BaseProgress :value="45" variant="warning" :striped="true" size="lg" :show-label="true" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Animated Stripes</h4></template>
      <div class="space-y-4">
        <BaseProgress
          :value="70"
          variant="primary"
          :striped="true"
          :animated="true"
          size="md"
          :show-label="true"
        />
        <BaseProgress
          :value="50"
          variant="info"
          :striped="true"
          :animated="true"
          size="lg"
          :show-label="true"
        />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Live Animation</h4></template>
      <p class="text-sm text-gray-500 mb-3">Progress value updating in real-time.</p>
      <BaseProgress :value="animatedValue" variant="primary" size="lg" :show-label="true" />
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseProgress
  :value="75"
  :max="100"
  variant="success"
  size="md"
  :striped="true"
  :animated="true"
  :show-label="true"
/&gt;</code></pre>
    </BaseCard>
  </div>
</template>
