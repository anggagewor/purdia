<script setup lang="ts">
import { BasePopover, BaseCard, BaseButton } from '@purdia/ui'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Popover</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Floating panel triggered by click or hover with flexible positioning.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Click Trigger (default)</h4></template>
      <div class="flex flex-wrap items-center gap-6 py-8 justify-center">
        <BasePopover trigger="click" position="bottom" align="center">
          <BaseButton>Click me</BaseButton>
          <template #content>
            <div class="p-4">
              <p class="text-sm font-medium text-gray-900 dark:text-gray-100">Popover Title</p>
              <p class="text-sm text-gray-500 mt-1">This popover opens on click.</p>
            </div>
          </template>
        </BasePopover>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Hover Trigger</h4></template>
      <div class="flex flex-wrap items-center gap-6 py-8 justify-center">
        <BasePopover trigger="hover" position="bottom" align="center">
          <BaseButton variant="secondary">Hover me</BaseButton>
          <template #content>
            <div class="p-4">
              <p class="text-sm text-gray-700 dark:text-gray-300">This popover opens on hover.</p>
            </div>
          </template>
        </BasePopover>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Positions</h4></template>
      <div class="flex flex-wrap items-center gap-6 py-12 justify-center">
        <BasePopover position="top" align="center">
          <BaseButton variant="secondary">Top</BaseButton>
          <template #content>
            <div class="p-3 text-sm text-gray-700 dark:text-gray-300">Position: top</div>
          </template>
        </BasePopover>
        <BasePopover position="bottom" align="center">
          <BaseButton variant="secondary">Bottom</BaseButton>
          <template #content>
            <div class="p-3 text-sm text-gray-700 dark:text-gray-300">Position: bottom</div>
          </template>
        </BasePopover>
        <BasePopover position="left" align="center">
          <BaseButton variant="secondary">Left</BaseButton>
          <template #content>
            <div class="p-3 text-sm text-gray-700 dark:text-gray-300">Position: left</div>
          </template>
        </BasePopover>
        <BasePopover position="right" align="center">
          <BaseButton variant="secondary">Right</BaseButton>
          <template #content>
            <div class="p-3 text-sm text-gray-700 dark:text-gray-300">Position: right</div>
          </template>
        </BasePopover>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Alignments</h4></template>
      <div class="flex flex-wrap items-center gap-6 py-8 justify-center">
        <BasePopover position="bottom" align="start">
          <BaseButton variant="secondary">Align Start</BaseButton>
          <template #content>
            <div class="p-3 text-sm text-gray-700 dark:text-gray-300">Aligned to start</div>
          </template>
        </BasePopover>
        <BasePopover position="bottom" align="center">
          <BaseButton variant="secondary">Align Center</BaseButton>
          <template #content>
            <div class="p-3 text-sm text-gray-700 dark:text-gray-300">Aligned to center</div>
          </template>
        </BasePopover>
        <BasePopover position="bottom" align="end">
          <BaseButton variant="secondary">Align End</BaseButton>
          <template #content>
            <div class="p-3 text-sm text-gray-700 dark:text-gray-300">Aligned to end</div>
          </template>
        </BasePopover>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BasePopover trigger="click" position="bottom" align="center"&gt;
  &lt;BaseButton&gt;Open Popover&lt;/BaseButton&gt;
  &lt;template #content&gt;
    &lt;div class="p-4"&gt;Popover content here&lt;/div&gt;
  &lt;/template&gt;
&lt;/BasePopover&gt;

&lt;BasePopover trigger="hover" position="top" align="start"&gt;
  &lt;span&gt;Hover me&lt;/span&gt;
  &lt;template #content&gt;
    &lt;div class="p-4"&gt;Tooltip-like content&lt;/div&gt;
  &lt;/template&gt;
&lt;/BasePopover&gt;</code></pre>
    </BaseCard>
  </div>
</template>
