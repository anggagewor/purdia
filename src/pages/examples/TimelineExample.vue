<script setup lang="ts">
import { BaseCard } from '@purdia/ui'
import { CheckCircle, AlertCircle, Clock, Star } from '@lucide/vue'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Timeline</h1>
      <p class="text-gray-500 mt-1">
        Vertical timeline component for displaying chronological events.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Default</h4></template>
      <div class="relative pl-6 border-l-2 border-gray-200 space-y-6">
        <div class="relative">
          <div
            class="absolute -left-[1.85rem] w-3 h-3 rounded-full bg-primary-500 border-2 border-white"
          ></div>
          <p class="text-sm font-medium text-gray-900">Project started</p>
          <p class="text-xs text-gray-500 mt-0.5">January 15, 2024</p>
        </div>
        <div class="relative">
          <div
            class="absolute -left-[1.85rem] w-3 h-3 rounded-full bg-primary-500 border-2 border-white"
          ></div>
          <p class="text-sm font-medium text-gray-900">Design phase completed</p>
          <p class="text-xs text-gray-500 mt-0.5">February 3, 2024</p>
        </div>
        <div class="relative">
          <div
            class="absolute -left-[1.85rem] w-3 h-3 rounded-full bg-gray-300 border-2 border-white"
          ></div>
          <p class="text-sm font-medium text-gray-900">Development in progress</p>
          <p class="text-xs text-gray-500 mt-0.5">March 10, 2024</p>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Alternate (Left/Right)</h4></template>
      <div class="relative">
        <div class="absolute left-1/2 w-0.5 h-full bg-gray-200 -translate-x-1/2"></div>
        <div class="space-y-8">
          <div class="flex items-center">
            <div class="w-1/2 pr-8 text-right">
              <p class="text-sm font-medium text-gray-900">Phase 1: Research</p>
              <p class="text-xs text-gray-500">Jan 2024</p>
            </div>
            <div
              class="w-3 h-3 rounded-full bg-primary-500 border-2 border-white z-10 shrink-0"
            ></div>
            <div class="w-1/2 pl-8"></div>
          </div>
          <div class="flex items-center">
            <div class="w-1/2 pr-8"></div>
            <div
              class="w-3 h-3 rounded-full bg-green-500 border-2 border-white z-10 shrink-0"
            ></div>
            <div class="w-1/2 pl-8">
              <p class="text-sm font-medium text-gray-900">Phase 2: Development</p>
              <p class="text-xs text-gray-500">Feb 2024</p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-1/2 pr-8 text-right">
              <p class="text-sm font-medium text-gray-900">Phase 3: Testing</p>
              <p class="text-xs text-gray-500">Mar 2024</p>
            </div>
            <div
              class="w-3 h-3 rounded-full bg-yellow-500 border-2 border-white z-10 shrink-0"
            ></div>
            <div class="w-1/2 pl-8"></div>
          </div>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Compact with Icons</h4></template>
      <div class="relative pl-8 border-l-2 border-gray-200 space-y-4">
        <div class="relative">
          <div
            class="absolute -left-[2.35rem] w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"
          >
            <CheckCircle class="w-3.5 h-3.5 text-green-600" />
          </div>
          <p class="text-xs font-medium text-gray-900">Task completed</p>
        </div>
        <div class="relative">
          <div
            class="absolute -left-[2.35rem] w-6 h-6 rounded-full bg-red-100 flex items-center justify-center"
          >
            <AlertCircle class="w-3.5 h-3.5 text-red-600" />
          </div>
          <p class="text-xs font-medium text-gray-900">Bug reported</p>
        </div>
        <div class="relative">
          <div
            class="absolute -left-[2.35rem] w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"
          >
            <Clock class="w-3.5 h-3.5 text-blue-600" />
          </div>
          <p class="text-xs font-medium text-gray-900">Waiting for review</p>
        </div>
        <div class="relative">
          <div
            class="absolute -left-[2.35rem] w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center"
          >
            <Star class="w-3.5 h-3.5 text-yellow-600" />
          </div>
          <p class="text-xs font-medium text-gray-900">Milestone reached</p>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Dashed Line</h4></template>
      <div class="relative pl-6 border-l-2 border-dashed border-gray-300 space-y-6">
        <div class="relative">
          <div
            class="absolute -left-[1.85rem] w-3 h-3 rounded-full bg-indigo-500 border-2 border-white"
          ></div>
          <p class="text-sm font-medium text-gray-900">Order placed</p>
          <p class="text-xs text-gray-500 mt-0.5">2 hours ago</p>
        </div>
        <div class="relative">
          <div
            class="absolute -left-[1.85rem] w-3 h-3 rounded-full bg-indigo-500 border-2 border-white"
          ></div>
          <p class="text-sm font-medium text-gray-900">Payment confirmed</p>
          <p class="text-xs text-gray-500 mt-0.5">1 hour ago</p>
        </div>
        <div class="relative">
          <div
            class="absolute -left-[1.85rem] w-3 h-3 rounded-full bg-gray-300 border-2 border-white"
          ></div>
          <p class="text-sm font-medium text-gray-500">Shipping pending</p>
          <p class="text-xs text-gray-400 mt-0.5">Estimated: Tomorrow</p>
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;!-- Default Timeline --&gt;
&lt;div class="pl-6 border-l-2 border-gray-200 space-y-6"&gt;
  &lt;div class="relative"&gt;
    &lt;div class="absolute -left-[1.85rem] w-3 h-3 rounded-full bg-primary-500"&gt;&lt;/div&gt;
    &lt;p&gt;Event title&lt;/p&gt;
    &lt;p&gt;Date&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- Dashed line variant --&gt;
&lt;div class="pl-6 border-l-2 border-dashed border-gray-300 space-y-6"&gt;...&lt;/div&gt;</code></pre>
    </BaseCard>
  </div>
</template>
