<script setup lang="ts">
import { BaseSkeleton, BaseCard } from '@purdia/ui'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Skeleton</h1>
      <p class="text-gray-500 mt-1">
        Placeholder loading state untuk semua component. Tampilkan saat data belum ready.
      </p>
    </div>

    <!-- Basic Variants -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="space-y-4">
        <div>
          <p class="text-xs text-gray-500 mb-2">Text (default)</p>
          <BaseSkeleton variant="text" />
          <div class="h-2" />
          <BaseSkeleton variant="text" width="75%" />
          <div class="h-2" />
          <BaseSkeleton variant="text" width="50%" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Circle</p>
          <div class="flex gap-3">
            <BaseSkeleton variant="circle" width="2rem" height="2rem" />
            <BaseSkeleton variant="circle" width="2.5rem" height="2.5rem" />
            <BaseSkeleton variant="circle" width="3rem" height="3rem" />
            <BaseSkeleton variant="circle" width="4rem" height="4rem" />
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Rectangle</p>
          <BaseSkeleton variant="rect" height="6rem" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Button</p>
          <div class="flex gap-3">
            <BaseSkeleton variant="button" />
            <BaseSkeleton variant="button" width="6rem" />
            <BaseSkeleton variant="button" width="8rem" />
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Input</p>
          <BaseSkeleton variant="input" />
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">Badge</p>
          <div class="flex gap-2">
            <BaseSkeleton variant="badge" />
            <BaseSkeleton variant="badge" width="4rem" />
            <BaseSkeleton variant="badge" width="5rem" />
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Count (multiple lines) -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Multiple Lines (count)</h4></template>
      <BaseSkeleton variant="text" :count="4" />
    </BaseCard>

    <!-- Skeleton: Card -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Skeleton — Card</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="i in 3" :key="i" class="border border-gray-200 rounded-xl p-5 space-y-3">
          <BaseSkeleton variant="rect" height="8rem" />
          <BaseSkeleton variant="text" width="60%" />
          <BaseSkeleton variant="text" />
          <BaseSkeleton variant="text" width="80%" />
          <div class="flex gap-2 pt-2">
            <BaseSkeleton variant="button" />
            <BaseSkeleton variant="button" width="5rem" />
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Skeleton: Stat Cards -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Skeleton — Stat Card</h4></template>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="border border-gray-200 rounded-xl p-5">
          <div class="flex justify-between items-start">
            <div class="space-y-2 flex-1">
              <BaseSkeleton variant="text" width="60%" height="0.75rem" />
              <BaseSkeleton variant="text" width="40%" height="1.5rem" />
            </div>
            <BaseSkeleton variant="rect" width="2.5rem" height="2.5rem" :rounded="true" />
          </div>
          <div class="mt-3">
            <BaseSkeleton variant="text" width="70%" height="0.75rem" />
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Skeleton: Table -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Skeleton — Table</h4></template>
      <div class="space-y-0">
        <!-- Header -->
        <div class="flex gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg">
          <BaseSkeleton variant="text" width="20%" height="0.6rem" />
          <BaseSkeleton variant="text" width="25%" height="0.6rem" />
          <BaseSkeleton variant="text" width="15%" height="0.6rem" />
          <BaseSkeleton variant="text" width="10%" height="0.6rem" />
        </div>
        <!-- Rows -->
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center gap-4 px-4 py-3 border-b border-gray-100"
        >
          <div class="flex items-center gap-2 w-[20%]">
            <BaseSkeleton variant="circle" width="1.5rem" height="1.5rem" />
            <BaseSkeleton variant="text" width="70%" />
          </div>
          <BaseSkeleton variant="text" width="25%" />
          <BaseSkeleton variant="badge" />
          <BaseSkeleton variant="badge" width="3.5rem" />
        </div>
      </div>
    </BaseCard>

    <!-- Skeleton: Profile -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Skeleton — Profile</h4></template>
      <div class="flex items-center gap-5">
        <BaseSkeleton variant="circle" width="4rem" height="4rem" />
        <div class="space-y-2 flex-1">
          <BaseSkeleton variant="text" width="30%" height="1.125rem" />
          <BaseSkeleton variant="text" width="40%" height="0.75rem" />
          <BaseSkeleton variant="text" width="20%" height="0.625rem" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div class="space-y-1">
          <BaseSkeleton variant="text" width="25%" height="0.7rem" />
          <BaseSkeleton variant="input" />
        </div>
        <div class="space-y-1">
          <BaseSkeleton variant="text" width="20%" height="0.7rem" />
          <BaseSkeleton variant="input" />
        </div>
        <div class="space-y-1">
          <BaseSkeleton variant="text" width="30%" height="0.7rem" />
          <BaseSkeleton variant="input" />
        </div>
        <div class="space-y-1">
          <BaseSkeleton variant="text" width="22%" height="0.7rem" />
          <BaseSkeleton variant="input" />
        </div>
      </div>
    </BaseCard>

    <!-- Skeleton: List -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Skeleton — List / Feed</h4></template>
      <div class="space-y-4">
        <div
          v-for="i in 3"
          :key="i"
          class="flex gap-3 pb-4"
          :class="i < 3 ? 'border-b border-gray-100' : ''"
        >
          <BaseSkeleton variant="circle" width="2.5rem" height="2.5rem" />
          <div class="flex-1 space-y-2">
            <div class="flex items-center gap-2">
              <BaseSkeleton variant="text" width="30%" height="0.8rem" />
              <BaseSkeleton variant="text" width="15%" height="0.6rem" />
            </div>
            <BaseSkeleton variant="text" />
            <BaseSkeleton variant="text" width="85%" />
            <div class="flex gap-4 pt-1">
              <BaseSkeleton variant="text" width="3rem" height="0.6rem" />
              <BaseSkeleton variant="text" width="3rem" height="0.6rem" />
              <BaseSkeleton variant="text" width="3rem" height="0.6rem" />
            </div>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Skeleton: Chart -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Skeleton — Chart</h4></template>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="border border-gray-200 rounded-xl p-5 space-y-3">
          <BaseSkeleton variant="text" width="40%" height="0.875rem" />
          <BaseSkeleton variant="rect" height="12rem" />
        </div>
        <div class="border border-gray-200 rounded-xl p-5 space-y-3">
          <BaseSkeleton variant="text" width="35%" height="0.875rem" />
          <div class="flex justify-center">
            <BaseSkeleton variant="circle" width="10rem" height="10rem" />
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Skeleton: Dashboard -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Skeleton — Full Dashboard</h4></template>
      <div class="space-y-4">
        <!-- Stats row -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div v-for="i in 4" :key="i" class="border border-gray-200 rounded-xl p-4 space-y-2">
            <BaseSkeleton variant="text" width="50%" height="0.7rem" />
            <BaseSkeleton variant="text" width="35%" height="1.25rem" />
            <BaseSkeleton variant="text" width="60%" height="0.6rem" />
          </div>
        </div>
        <!-- Chart area -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div class="border border-gray-200 rounded-xl p-4 space-y-2">
            <BaseSkeleton variant="text" width="30%" height="0.8rem" />
            <BaseSkeleton variant="rect" height="10rem" />
          </div>
          <div class="border border-gray-200 rounded-xl p-4 space-y-2">
            <BaseSkeleton variant="text" width="25%" height="0.8rem" />
            <BaseSkeleton variant="rect" height="10rem" />
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup lang="ts"&gt;
import { BaseSkeleton } from '@purdia/ui'
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Basic text lines --&gt;
  &lt;BaseSkeleton variant="text" :count="3" /&gt;

  &lt;!-- Avatar placeholder --&gt;
  &lt;BaseSkeleton variant="circle" width="3rem" height="3rem" /&gt;

  &lt;!-- Custom sized rectangle --&gt;
  &lt;BaseSkeleton variant="rect" height="200px" /&gt;

  &lt;!-- Button placeholder --&gt;
  &lt;BaseSkeleton variant="button" width="8rem" /&gt;

  &lt;!-- Input placeholder --&gt;
  &lt;BaseSkeleton variant="input" /&gt;

  &lt;!-- Conditional rendering --&gt;
  &lt;template v-if="isLoading"&gt;
    &lt;BaseSkeleton variant="text" :count="4" /&gt;
  &lt;/template&gt;
  &lt;template v-else&gt;
    &lt;p&gt;Actual content here&lt;/p&gt;
  &lt;/template&gt;
&lt;/template&gt;</code></pre>
    </BaseCard>

    <!-- Props -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Props</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Prop</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Default</th>
              <th class="text-left py-2 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">variant</code>
              </td>
              <td class="py-2 pr-4">
                'text' | 'circle' | 'rect' | 'button' | 'avatar' | 'input' | 'badge'
              </td>
              <td class="py-2 pr-4">'text'</td>
              <td class="py-2">Shape preset</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">width</code>
              </td>
              <td class="py-2 pr-4">string</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Custom width (CSS value)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">height</code>
              </td>
              <td class="py-2 pr-4">string</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Custom height (CSS value)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">rounded</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">true</td>
              <td class="py-2">Apply border-radius</td>
            </tr>
            <tr>
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">count</code>
              </td>
              <td class="py-2 pr-4">number</td>
              <td class="py-2 pr-4">1</td>
              <td class="py-2">Repeat skeleton N times</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
