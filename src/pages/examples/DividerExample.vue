<script setup lang="ts">
import { BaseDivider, BaseCard } from '@purdia/ui'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Divider</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Separator component for visual grouping of content.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Solid (Default)</h4></template>
      <div class="space-y-4">
        <p class="text-sm text-gray-600">Content above</p>
        <BaseDivider />
        <p class="text-sm text-gray-600">Content below</p>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Dashed</h4></template>
      <div class="space-y-4">
        <p class="text-sm text-gray-600">Content above</p>
        <BaseDivider variant="dashed" />
        <p class="text-sm text-gray-600">Content below</p>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Dotted</h4></template>
      <div class="space-y-4">
        <p class="text-sm text-gray-600">Content above</p>
        <BaseDivider variant="dotted" />
        <p class="text-sm text-gray-600">Content below</p>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Label</h4></template>
      <div class="space-y-6">
        <BaseDivider label="OR" position="center" />
        <BaseDivider label="Section" position="left" />
        <BaseDivider label="End" position="right" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Vertical</h4></template>
      <div class="flex items-center gap-4 h-12">
        <span class="text-sm text-gray-600">Left</span>
        <BaseDivider orientation="vertical" />
        <span class="text-sm text-gray-600">Center</span>
        <BaseDivider orientation="vertical" />
        <span class="text-sm text-gray-600">Right</span>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;!-- Solid (default) --&gt;
&lt;BaseDivider /&gt;

&lt;!-- Dashed --&gt;
&lt;BaseDivider variant="dashed" /&gt;

&lt;!-- With label (center) --&gt;
&lt;BaseDivider label="OR" position="center" /&gt;

&lt;!-- Vertical --&gt;
&lt;BaseDivider orientation="vertical" /&gt;</code></pre>
    </BaseCard>
  </div>
</template>
