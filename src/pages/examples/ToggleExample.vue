<script setup lang="ts">
import { ref } from 'vue'
import { BaseToggle, BaseCard } from '@purdia/ui'

const enabled = ref(true)
const disabled = ref(false)
const notifications = ref(true)
const darkMode = ref(false)
const autoSave = ref(true)
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Toggle</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Switch component untuk boolean on/off state.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Basic</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseToggle v-model="enabled" label="Enabled" />
        <BaseToggle v-model="disabled" label="Off" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseToggle v-model="enabled" size="sm" label="Small" />
        <BaseToggle v-model="enabled" size="md" label="Medium" />
        <BaseToggle v-model="enabled" size="lg" label="Large" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Disabled</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseToggle v-model="enabled" :disabled="true" label="Disabled (on)" />
        <BaseToggle v-model="disabled" :disabled="true" label="Disabled (off)" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Real-world Example: Settings</h4></template>
      <div class="space-y-4 max-w-sm">
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div>
            <p class="text-sm font-medium text-gray-800">Notifications</p>
            <p class="text-xs text-gray-500">Receive push notifications</p>
          </div>
          <BaseToggle v-model="notifications" />
        </div>
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div>
            <p class="text-sm font-medium text-gray-800">Dark Mode</p>
            <p class="text-xs text-gray-500">Use dark theme</p>
          </div>
          <BaseToggle v-model="darkMode" />
        </div>
        <div class="flex items-center justify-between py-2">
          <div>
            <p class="text-sm font-medium text-gray-800">Auto Save</p>
            <p class="text-xs text-gray-500">Save changes automatically</p>
          </div>
          <BaseToggle v-model="autoSave" />
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseToggle v-model="isEnabled" label="Enable feature" size="md" /&gt;
&lt;BaseToggle v-model="value" :disabled="true" /&gt;</code></pre>
    </BaseCard>
  </div>
</template>
