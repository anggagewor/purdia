<script setup lang="ts">
import { ref } from 'vue'
import { BaseTextarea, BaseCard } from '@purdia/ui'

const basic = ref('')
const filled = ref('')
const underlined = ref('')
const smVal = ref('')
const mdVal = ref('')
const lgVal = ref('')
const disabled = ref('This is disabled')
const withError = ref('')
const withHint = ref('')
const autosize = ref('')
const maxlength = ref('')
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Textarea</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Multi-line text input component with variants, sizes, and validation.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Basic</h4></template>
      <div class="max-w-md">
        <BaseTextarea v-model="basic" label="Description" placeholder="Enter your text here..." />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="space-y-4 max-w-md">
        <BaseTextarea
          v-model="basic"
          variant="default"
          label="Default"
          placeholder="Default variant"
        />
        <BaseTextarea
          v-model="filled"
          variant="filled"
          label="Filled"
          placeholder="Filled variant"
        />
        <BaseTextarea
          v-model="underlined"
          variant="underlined"
          label="Underlined"
          placeholder="Underlined variant"
        />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="space-y-4 max-w-md">
        <BaseTextarea v-model="smVal" size="sm" label="Small" placeholder="Small size" />
        <BaseTextarea v-model="mdVal" size="md" label="Medium" placeholder="Medium size" />
        <BaseTextarea v-model="lgVal" size="lg" label="Large" placeholder="Large size" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Disabled</h4></template>
      <div class="max-w-md">
        <BaseTextarea v-model="disabled" label="Disabled textarea" :disabled="true" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Error</h4></template>
      <div class="max-w-md">
        <BaseTextarea
          v-model="withError"
          label="Bio"
          placeholder="Tell us about yourself"
          error="This field is required"
        />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Hint</h4></template>
      <div class="max-w-md">
        <BaseTextarea
          v-model="withHint"
          label="Notes"
          placeholder="Add any notes"
          hint="Optional. Max 500 characters."
        />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Autosize</h4></template>
      <div class="max-w-md">
        <BaseTextarea
          v-model="autosize"
          label="Auto-growing textarea"
          placeholder="Type to see it grow..."
          :autosize="true"
        />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Maxlength with Counter</h4></template>
      <div class="max-w-md">
        <BaseTextarea
          v-model="maxlength"
          label="Tweet"
          placeholder="What's happening?"
          :maxlength="280"
        />
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseTextarea v-model="text" label="Description" placeholder="Enter text..." /&gt;
&lt;BaseTextarea v-model="text" variant="filled" size="lg" /&gt;
&lt;BaseTextarea v-model="text" :autosize="true" /&gt;
&lt;BaseTextarea v-model="text" :maxlength="280" /&gt;
&lt;BaseTextarea v-model="text" error="Required field" /&gt;
&lt;BaseTextarea v-model="text" hint="Optional hint text" /&gt;
&lt;BaseTextarea v-model="text" :disabled="true" /&gt;</code></pre>
    </BaseCard>
  </div>
</template>
