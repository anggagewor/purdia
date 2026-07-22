<script setup lang="ts">
import { BaseCard } from '@purdia/ui'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Grid System</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Layout grid menggunakan Tailwind CSS grid utilities. Responsive, flexible, dan composable.
      </p>
    </div>

    <!-- 12 Column Grid -->
    <BaseCard>
      <template #header><h4 class="font-semibold">12 Column Grid</h4></template>
      <div class="space-y-3">
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-span-12 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-12
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-span-6 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-6
          </div>
          <div
            class="col-span-6 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-6
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-span-4 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-4
          </div>
          <div
            class="col-span-4 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-4
          </div>
          <div
            class="col-span-4 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-4
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-span-3 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-3
          </div>
          <div
            class="col-span-3 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-3
          </div>
          <div
            class="col-span-3 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-3
          </div>
          <div
            class="col-span-3 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-3
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-span-2 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            2
          </div>
          <div
            class="col-span-2 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            2
          </div>
          <div
            class="col-span-2 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            2
          </div>
          <div
            class="col-span-2 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            2
          </div>
          <div
            class="col-span-2 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            2
          </div>
          <div
            class="col-span-2 bg-primary-100 text-primary-700 text-xs font-medium text-center py-2 rounded"
          >
            2
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div
            v-for="i in 12"
            :key="i"
            class="col-span-1 bg-primary-100 text-primary-700 text-[0.6rem] font-medium text-center py-2 rounded"
          >
            {{ i }}
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Mixed Column Spans -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Mixed Column Spans</h4></template>
      <div class="space-y-3">
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-span-8 bg-emerald-100 text-emerald-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-8
          </div>
          <div
            class="col-span-4 bg-emerald-100 text-emerald-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-4
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-span-3 bg-emerald-100 text-emerald-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-3
          </div>
          <div
            class="col-span-6 bg-emerald-100 text-emerald-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-6
          </div>
          <div
            class="col-span-3 bg-emerald-100 text-emerald-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-3
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-span-2 bg-emerald-100 text-emerald-700 text-xs font-medium text-center py-2 rounded"
          >
            2
          </div>
          <div
            class="col-span-7 bg-emerald-100 text-emerald-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-7
          </div>
          <div
            class="col-span-3 bg-emerald-100 text-emerald-700 text-xs font-medium text-center py-2 rounded"
          >
            3
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-span-9 bg-emerald-100 text-emerald-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-9
          </div>
          <div
            class="col-span-3 bg-emerald-100 text-emerald-700 text-xs font-medium text-center py-2 rounded"
          >
            col-span-3
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Auto-fit Grid -->
    <BaseCard>
      <template #header
        ><h4 class="font-semibold">Auto-fit (grid-cols-[repeat(auto-fit,...)])</h4></template
      >
      <p class="text-sm text-gray-500 mb-4">
        Responsif otomatis tanpa breakpoint. Item wrap sesuai available space.
      </p>
      <div class="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-3">
        <div
          v-for="i in 8"
          :key="i"
          class="bg-amber-100 text-amber-700 text-xs font-medium text-center py-4 rounded"
        >
          Item {{ i }}
        </div>
      </div>
    </BaseCard>

    <!-- Responsive Grid -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Responsive Breakpoints</h4></template>
      <p class="text-sm text-gray-500 mb-4">
        1 kolom di mobile, 2 di tablet, 3 di desktop, 4 di wide.
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <div
          v-for="i in 8"
          :key="i"
          class="bg-cyan-100 text-cyan-700 text-xs font-medium text-center py-4 rounded"
        >
          Item {{ i }}
        </div>
      </div>
    </BaseCard>

    <!-- Gap Sizes -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Gap Sizes</h4></template>
      <div class="space-y-4">
        <div>
          <p class="text-xs text-gray-500 mb-2">gap-1 (0.25rem)</p>
          <div class="grid grid-cols-4 gap-1">
            <div
              v-for="i in 4"
              :key="i"
              class="bg-gray-200 text-gray-600 text-xs font-medium text-center py-2 rounded"
            >
              {{ i }}
            </div>
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">gap-2 (0.5rem)</p>
          <div class="grid grid-cols-4 gap-2">
            <div
              v-for="i in 4"
              :key="i"
              class="bg-gray-200 text-gray-600 text-xs font-medium text-center py-2 rounded"
            >
              {{ i }}
            </div>
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">gap-4 (1rem)</p>
          <div class="grid grid-cols-4 gap-4">
            <div
              v-for="i in 4"
              :key="i"
              class="bg-gray-200 text-gray-600 text-xs font-medium text-center py-2 rounded"
            >
              {{ i }}
            </div>
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">gap-6 (1.5rem)</p>
          <div class="grid grid-cols-4 gap-6">
            <div
              v-for="i in 4"
              :key="i"
              class="bg-gray-200 text-gray-600 text-xs font-medium text-center py-2 rounded"
            >
              {{ i }}
            </div>
          </div>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2">gap-x-8 gap-y-2 (different x/y)</p>
          <div class="grid grid-cols-4 gap-x-8 gap-y-2">
            <div
              v-for="i in 8"
              :key="i"
              class="bg-gray-200 text-gray-600 text-xs font-medium text-center py-2 rounded"
            >
              {{ i }}
            </div>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Column Start/End -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Column Start / End (Offset)</h4></template>
      <div class="space-y-3">
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-start-1 col-span-4 bg-violet-100 text-violet-700 text-xs font-medium text-center py-2 rounded"
          >
            col-start-1 span-4
          </div>
          <div
            class="col-start-6 col-span-4 bg-violet-100 text-violet-700 text-xs font-medium text-center py-2 rounded"
          >
            col-start-6 span-4
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-start-3 col-span-8 bg-violet-100 text-violet-700 text-xs font-medium text-center py-2 rounded"
          >
            col-start-3 col-span-8 (offset 2)
          </div>
        </div>
        <div class="grid grid-cols-12 gap-2">
          <div
            class="col-start-1 col-end-5 bg-violet-100 text-violet-700 text-xs font-medium text-center py-2 rounded"
          >
            col-end-5
          </div>
          <div
            class="col-start-5 col-end-13 bg-violet-100 text-violet-700 text-xs font-medium text-center py-2 rounded"
          >
            col-start-5 col-end-13
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Row Span -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Row Span (Multi-row)</h4></template>
      <div class="grid grid-cols-3 grid-rows-3 gap-3 h-64">
        <div
          class="row-span-3 bg-rose-100 text-rose-700 text-xs font-medium flex items-center justify-center rounded"
        >
          row-span-3
        </div>
        <div
          class="col-span-2 bg-rose-100 text-rose-700 text-xs font-medium flex items-center justify-center rounded"
        >
          col-span-2
        </div>
        <div
          class="row-span-2 bg-rose-100 text-rose-700 text-xs font-medium flex items-center justify-center rounded"
        >
          row-span-2
        </div>
        <div
          class="bg-rose-100 text-rose-700 text-xs font-medium flex items-center justify-center rounded"
        >
          1x1
        </div>
        <div
          class="bg-rose-100 text-rose-700 text-xs font-medium flex items-center justify-center rounded"
        >
          1x1
        </div>
      </div>
    </BaseCard>

    <!-- Dashboard Layout Example -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Real Example — Dashboard Layout</h4></template>
      <div class="space-y-4">
        <!-- Stats row -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="i in 4" :key="i" class="bg-white border border-gray-200 rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700">
            <p class="text-xs text-gray-500">Stat {{ i }}</p>
            <p class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ (i * 1234).toLocaleString() }}</p>
          </div>
        </div>
        <!-- Chart + Sidebar -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div
            class="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-4 h-48 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500"
          >
            Chart Area (2/3)
          </div>
          <div
            class="bg-white border border-gray-200 rounded-lg p-4 h-48 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500"
          >
            Sidebar (1/3)
          </div>
        </div>
        <!-- 3 columns -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white border border-gray-200 rounded-lg p-4 h-32 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500"
          >
            Card {{ i }}
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Form Layout Example -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Real Example — Form Layout</h4></template>
      <div class="space-y-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-500 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400">
            First Name
          </div>
          <div class="bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-500 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400">
            Last Name
          </div>
        </div>
        <div class="grid grid-cols-1">
          <div class="bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-500 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400">
            Email (full width)
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-500 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400">
            City
          </div>
          <div class="bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-500 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400">
            State
          </div>
          <div class="bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-500 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400">
            Zip
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            class="md:col-span-3 bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-500"
          >
            Address (3/4)
          </div>
          <div class="bg-gray-50 border border-gray-200 rounded-md p-3 text-xs text-gray-500 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-400">
            Apt #
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Usage -->
    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;!-- Basic 12-column grid --&gt;
&lt;div class="grid grid-cols-12 gap-4"&gt;
  &lt;div class="col-span-8"&gt;Main content&lt;/div&gt;
  &lt;div class="col-span-4"&gt;Sidebar&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Responsive grid --&gt;
&lt;div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"&gt;
  &lt;div&gt;Card&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Auto-fit (no breakpoints needed) --&gt;
&lt;div class="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-4"&gt;
  &lt;div&gt;Auto-sized item&lt;/div&gt;
&lt;/div&gt;

&lt;!-- With offset --&gt;
&lt;div class="grid grid-cols-12 gap-4"&gt;
  &lt;div class="col-start-3 col-span-8"&gt;Offset by 2 cols&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Row span --&gt;
&lt;div class="grid grid-cols-3 grid-rows-2 gap-4"&gt;
  &lt;div class="row-span-2"&gt;Tall item&lt;/div&gt;
  &lt;div class="col-span-2"&gt;Wide item&lt;/div&gt;
&lt;/div&gt;</code></pre>
    </BaseCard>

    <!-- Reference Table -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Quick Reference</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-medium text-gray-600">Class</th>
              <th class="text-left py-2 font-medium text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">grid-cols-{n}</code>
              </td>
              <td class="py-1.5">Set n columns (1–12)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">col-span-{n}</code>
              </td>
              <td class="py-1.5">Span n columns</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">col-start-{n}</code>
              </td>
              <td class="py-1.5">Start at column n</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">col-end-{n}</code>
              </td>
              <td class="py-1.5">End at column n</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">row-span-{n}</code>
              </td>
              <td class="py-1.5">Span n rows</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">gap-{n}</code>
              </td>
              <td class="py-1.5">Gap between items</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">gap-x-{n} / gap-y-{n}</code>
              </td>
              <td class="py-1.5">Horizontal / vertical gap separately</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">sm: / md: / lg: / xl:</code>
              </td>
              <td class="py-1.5">Responsive breakpoints (640/768/1024/1280px)</td>
            </tr>
            <tr>
              <td class="py-1.5 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">auto-fit / auto-fill</code>
              </td>
              <td class="py-1.5">Auto-responsive without breakpoints</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
