<script setup lang="ts">
import { BaseCard } from '@purdia/ui'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Kbd</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Keyboard key indicator for displaying shortcuts and hotkeys.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Single Keys</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <kbd
          class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          >A</kbd
        >
        <kbd
          class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          >Enter</kbd
        >
        <kbd
          class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          >Space</kbd
        >
        <kbd
          class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          >Esc</kbd
        >
        <kbd
          class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          >Tab</kbd
        >
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Combo Keys</h4></template>
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-1">
          <kbd
            class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            >⌘</kbd
          >
          <span class="text-xs text-gray-400">+</span>
          <kbd
            class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            >C</kbd
          >
        </div>
        <div class="flex items-center gap-1">
          <kbd
            class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            >⌘</kbd
          >
          <span class="text-xs text-gray-400">+</span>
          <kbd
            class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            >V</kbd
          >
        </div>
        <div class="flex items-center gap-1">
          <kbd
            class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            >Ctrl</kbd
          >
          <span class="text-xs text-gray-400">+</span>
          <kbd
            class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            >Shift</kbd
          >
          <span class="text-xs text-gray-400">+</span>
          <kbd
            class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
            >P</kbd
          >
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Common Shortcuts</h4></template>
      <div class="space-y-3 max-w-sm">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">Copy</span>
          <div class="flex items-center gap-1">
            <kbd
              class="px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm"
              >⌘</kbd
            >
            <kbd
              class="px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm"
              >C</kbd
            >
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">Paste</span>
          <div class="flex items-center gap-1">
            <kbd
              class="px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm"
              >⌘</kbd
            >
            <kbd
              class="px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm"
              >V</kbd
            >
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">Save</span>
          <div class="flex items-center gap-1">
            <kbd
              class="px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm"
              >⌘</kbd
            >
            <kbd
              class="px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm"
              >S</kbd
            >
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">Find</span>
          <div class="flex items-center gap-1">
            <kbd
              class="px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm"
              >⌘</kbd
            >
            <kbd
              class="px-1.5 py-0.5 text-[10px] font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded shadow-sm"
              >F</kbd
            >
          </div>
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;!-- Single key --&gt;
&lt;kbd class="px-2 py-1 text-xs font-mono font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm"&gt;
  Enter
&lt;/kbd&gt;

&lt;!-- Combo --&gt;
&lt;kbd&gt;⌘&lt;/kbd&gt; + &lt;kbd&gt;C&lt;/kbd&gt;</code></pre>
    </BaseCard>
  </div>
</template>
