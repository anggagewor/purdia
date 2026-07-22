<script setup lang="ts">
import { BaseTooltip, BaseCard, BaseButton } from '@purdia/ui'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Tooltip</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Informational popup shown on hover with position and variant options.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Positions</h4></template>
      <div class="flex flex-wrap items-center gap-6 py-8 justify-center">
        <BaseTooltip text="Tooltip on top" position="top">
          <BaseButton>Top</BaseButton>
        </BaseTooltip>
        <BaseTooltip text="Tooltip on bottom" position="bottom">
          <BaseButton>Bottom</BaseButton>
        </BaseTooltip>
        <BaseTooltip text="Tooltip on left" position="left">
          <BaseButton>Left</BaseButton>
        </BaseTooltip>
        <BaseTooltip text="Tooltip on right" position="right">
          <BaseButton>Right</BaseButton>
        </BaseTooltip>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="flex flex-wrap items-center gap-6 py-8 justify-center">
        <BaseTooltip text="Dark variant (default)" variant="dark">
          <BaseButton>Dark</BaseButton>
        </BaseTooltip>
        <BaseTooltip text="Light variant" variant="light">
          <BaseButton variant="secondary">Light</BaseButton>
        </BaseTooltip>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Custom Delay</h4></template>
      <div class="flex flex-wrap items-center gap-6 py-8 justify-center">
        <BaseTooltip text="Instant (0ms)" :delay="0">
          <BaseButton variant="secondary">No delay</BaseButton>
        </BaseTooltip>
        <BaseTooltip text="Default (200ms)" :delay="200">
          <BaseButton variant="secondary">Default delay</BaseButton>
        </BaseTooltip>
        <BaseTooltip text="Slow (800ms)" :delay="800">
          <BaseButton variant="secondary">Slow delay</BaseButton>
        </BaseTooltip>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseTooltip text="Helpful info" position="top" variant="dark"&gt;
  &lt;BaseButton&gt;Hover me&lt;/BaseButton&gt;
&lt;/BaseTooltip&gt;

&lt;BaseTooltip text="Light tooltip" variant="light" :delay="500"&gt;
  &lt;span&gt;Hover for info&lt;/span&gt;
&lt;/BaseTooltip&gt;</code></pre>
    </BaseCard>
  </div>
</template>
