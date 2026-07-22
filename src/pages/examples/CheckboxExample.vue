<script setup lang="ts">
import { ref } from 'vue'
import { BaseCheckbox, BaseCard } from '@purdia/ui'

const single = ref(false)
const fruits = ref<string[]>(['apple'])
const primary = ref(true)
const success = ref(true)
const warning = ref(true)
const danger = ref(true)
const disabled = ref(true)
const indeterminate = ref(false)
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Checkbox</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">Selection control for single or multiple options.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Basic Single</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseCheckbox v-model="single" label="Accept terms and conditions" />
      </div>
      <p class="text-sm text-gray-500 mt-3">Value: {{ single }}</p>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Checkbox Group (Array)</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseCheckbox v-model="fruits" value="apple" label="Apple" />
        <BaseCheckbox v-model="fruits" value="banana" label="Banana" />
        <BaseCheckbox v-model="fruits" value="orange" label="Orange" />
        <BaseCheckbox v-model="fruits" value="grape" label="Grape" />
      </div>
      <p class="text-sm text-gray-500 mt-3">Selected: {{ fruits }}</p>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseCheckbox v-model="primary" variant="primary" label="Primary" />
        <BaseCheckbox v-model="success" variant="success" label="Success" />
        <BaseCheckbox v-model="warning" variant="warning" label="Warning" />
        <BaseCheckbox v-model="danger" variant="danger" label="Danger" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Disabled</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseCheckbox v-model="disabled" :disabled="true" label="Disabled (checked)" />
        <BaseCheckbox :model-value="false" :disabled="true" label="Disabled (unchecked)" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Indeterminate</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseCheckbox
          v-model="indeterminate"
          :indeterminate="true"
          label="Select all (indeterminate)"
        />
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;!-- Single boolean --&gt;
&lt;BaseCheckbox v-model="accepted" label="Accept terms" /&gt;

&lt;!-- Group (array) --&gt;
&lt;BaseCheckbox v-model="selected" value="a" label="Option A" /&gt;
&lt;BaseCheckbox v-model="selected" value="b" label="Option B" /&gt;

&lt;!-- Variants --&gt;
&lt;BaseCheckbox v-model="val" variant="success" label="Success" /&gt;

&lt;!-- Indeterminate --&gt;
&lt;BaseCheckbox v-model="val" :indeterminate="true" label="Select all" /&gt;</code></pre>
    </BaseCard>
  </div>
</template>
