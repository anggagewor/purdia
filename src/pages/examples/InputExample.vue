<script setup lang="ts">
import { ref } from 'vue'
import { BaseInput, BaseCard } from '@purdia/ui'
import { Search, Mail, Lock, Eye, User } from '@lucide/vue'

const text = ref('')
const email = ref('')
const search = ref('')
const password = ref('')
const errorValue = ref('invalid data')
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Input</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Text input fields dengan variant, icon, validation, dan hint.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseInput v-model="text" variant="default" label="Default" placeholder="Type here..." />
        <BaseInput v-model="text" variant="filled" label="Filled" placeholder="Filled style..." />
        <BaseInput
          v-model="text"
          variant="underlined"
          label="Underlined"
          placeholder="Underlined..."
        />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseInput size="sm" placeholder="Small input" label="Small" />
        <BaseInput size="md" placeholder="Medium input" label="Medium" />
        <BaseInput size="lg" placeholder="Large input" label="Large" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Icons</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput v-model="search" label="Search" placeholder="Search..." :icon="Search" />
        <BaseInput v-model="email" label="Email" placeholder="you@example.com" :icon="Mail" />
        <BaseInput
          v-model="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          :icon="Lock"
          :icon-right="Eye"
        />
        <BaseInput label="Username" placeholder="@username" :icon="User" hint="Must be unique" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">States</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BaseInput label="With Hint" placeholder="Enter value..." hint="This is helper text" />
        <BaseInput v-model="errorValue" label="Error" error="This field is required" />
        <BaseInput label="Disabled" placeholder="Can't edit..." :disabled="true" />
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { BaseInput } from '@purdia/ui'
import { Search, Mail } from '@lucide/vue'

const email = ref('')
&lt;/script&gt;

&lt;template&gt;
  &lt;BaseInput
    v-model="email"
    label="Email"
    placeholder="you@example.com"
    :icon="Mail"
    variant="filled"
    error="Invalid email format"
  /&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>
  </div>
</template>
