<script setup lang="ts">
import { ref } from 'vue'
import { BaseRadio, BaseCard } from '@purdia/ui'

const basicChoice = ref('option1')
const variantChoice = ref('primary')
const sizeChoice = ref('md')
const disabledChoice = ref('enabled')
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Radio</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Single-selection control for mutually exclusive options.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Basic Radio Group</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseRadio v-model="basicChoice" value="option1" label="Option 1" />
        <BaseRadio v-model="basicChoice" value="option2" label="Option 2" />
        <BaseRadio v-model="basicChoice" value="option3" label="Option 3" />
      </div>
      <p class="text-sm text-gray-500 mt-3">Selected: {{ basicChoice }}</p>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseRadio v-model="variantChoice" value="primary" variant="primary" label="Primary" />
        <BaseRadio v-model="variantChoice" value="success" variant="success" label="Success" />
        <BaseRadio v-model="variantChoice" value="warning" variant="warning" label="Warning" />
        <BaseRadio v-model="variantChoice" value="danger" variant="danger" label="Danger" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseRadio v-model="sizeChoice" value="sm" size="sm" label="Small" />
        <BaseRadio v-model="sizeChoice" value="md" size="md" label="Medium" />
        <BaseRadio v-model="sizeChoice" value="lg" size="lg" label="Large" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Disabled</h4></template>
      <div class="flex flex-wrap items-center gap-6">
        <BaseRadio v-model="disabledChoice" value="enabled" label="Enabled option" />
        <BaseRadio
          v-model="disabledChoice"
          value="disabled"
          :disabled="true"
          label="Disabled option"
        />
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseRadio v-model="selected" value="a" label="Option A" /&gt;
&lt;BaseRadio v-model="selected" value="b" label="Option B" /&gt;
&lt;BaseRadio v-model="selected" value="c" label="Option C" :disabled="true" /&gt;

&lt;!-- With variant and size --&gt;
&lt;BaseRadio v-model="choice" value="yes" variant="success" size="lg" label="Yes" /&gt;
&lt;BaseRadio v-model="choice" value="no" variant="danger" size="lg" label="No" /&gt;</code></pre>
    </BaseCard>
  </div>
</template>
