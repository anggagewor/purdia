<script setup lang="ts">
import { BaseAvatarGroup, BaseCard } from '@purdia/ui'

const users = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'Diana' },
  { name: 'Eve' },
  { name: 'Frank' },
  { name: 'Grace' },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Avatar Group</h1>
      <p class="text-gray-500 mt-1">Stacked avatar group for displaying multiple users.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Small</h4></template>
      <BaseAvatarGroup :items="users" :max="4" size="sm" />
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Medium (Default)</h4></template>
      <BaseAvatarGroup :items="users" :max="5" size="md" />
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Large</h4></template>
      <BaseAvatarGroup :items="users" :max="5" size="lg" />
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Different Max Count</h4></template>
      <div class="space-y-4">
        <div>
          <p class="text-xs text-gray-500 mb-2">Max 3:</p>
          <BaseAvatarGroup :items="users" :max="3" size="md" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Max 6:</p>
          <BaseAvatarGroup :items="users" :max="6" size="md" />
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseAvatarGroup :items="users" :max="4" size="md" /&gt;

&lt;!-- Sizes --&gt;
&lt;BaseAvatarGroup :items="users" size="sm" /&gt;
&lt;BaseAvatarGroup :items="users" size="lg" /&gt;</code></pre>
    </BaseCard>
  </div>
</template>
