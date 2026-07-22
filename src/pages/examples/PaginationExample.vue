<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BasePagination } from '@purdia/ui'

const page1 = ref(1)
const page2 = ref(3)
const page3 = ref(5)
const page4 = ref(1)
const page5 = ref(1)
const page6 = ref(1)
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold">Pagination</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">Navigate between pages of content.</p>
    </div>

    <!-- Default Variant -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Default</h4></template>
      <div class="space-y-6">
        <BasePagination
          v-model:current-page="page1"
          :total-pages="10"
          :total-items="98"
          :per-page="10"
        />
        <p class="text-xs text-gray-500">Current page: {{ page1 }}</p>
      </div>
    </BaseCard>

    <!-- Many Pages -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Many Pages (with dots)</h4></template>
      <div class="space-y-6">
        <BasePagination
          v-model:current-page="page2"
          :total-pages="50"
          :total-items="500"
          :per-page="10"
        />
        <p class="text-xs text-gray-500">Current page: {{ page2 }}</p>
      </div>
    </BaseCard>

    <!-- Simple Variant -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Simple Variant</h4></template>
      <div class="space-y-6">
        <BasePagination
          v-model:current-page="page3"
          :total-pages="20"
          :total-items="200"
          :per-page="10"
          variant="simple"
        />
        <p class="text-xs text-gray-500">Current page: {{ page3 }}</p>
      </div>
    </BaseCard>

    <!-- Minimal Variant -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Minimal Variant</h4></template>
      <div class="space-y-6">
        <BasePagination
          v-model:current-page="page4"
          :total-pages="15"
          :total-items="150"
          :per-page="10"
          variant="minimal"
        />
        <p class="text-xs text-gray-500">Current page: {{ page4 }}</p>
      </div>
    </BaseCard>

    <!-- Jumper Variant -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Jumper Variant</h4></template>
      <div class="space-y-6">
        <BasePagination
          v-model:current-page="page6"
          :total-pages="100"
          :total-items="1000"
          :per-page="10"
          variant="jumper"
        />
        <p class="text-xs text-gray-500">
          Current page: {{ page6 }} — Type a page number and press Go or Enter to jump directly.
        </p>
      </div>
    </BaseCard>

    <!-- Sizes -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="space-y-6">
        <div>
          <p class="text-xs font-medium text-gray-500 mb-2 uppercase">Small</p>
          <BasePagination
            v-model:current-page="page5"
            :total-pages="8"
            :total-items="80"
            :per-page="10"
            size="sm"
          />
        </div>
        <div>
          <p class="text-xs font-medium text-gray-500 mb-2 uppercase">Medium (default)</p>
          <BasePagination
            v-model:current-page="page5"
            :total-pages="8"
            :total-items="80"
            :per-page="10"
            size="md"
          />
        </div>
        <div>
          <p class="text-xs font-medium text-gray-500 mb-2 uppercase">Large</p>
          <BasePagination
            v-model:current-page="page5"
            :total-pages="8"
            :total-items="80"
            :per-page="10"
            size="lg"
          />
        </div>
      </div>
    </BaseCard>

    <!-- Without info -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Without Info Text</h4></template>
      <div class="space-y-4">
        <BasePagination v-model:current-page="page6" :total-pages="12" :show-info="false" />
      </div>
    </BaseCard>

    <!-- Props Reference -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Props</h4></template>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 pr-4 font-semibold">Prop</th>
              <th class="text-left py-2 pr-4 font-semibold">Type</th>
              <th class="text-left py-2 pr-4 font-semibold">Default</th>
              <th class="text-left py-2 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">currentPage</code>
              </td>
              <td class="py-2 pr-4">number</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Current active page (v-model)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">totalPages</code>
              </td>
              <td class="py-2 pr-4">number</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Total number of pages</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">totalItems</code>
              </td>
              <td class="py-2 pr-4">number</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Total items (for info text)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">perPage</code>
              </td>
              <td class="py-2 pr-4">number</td>
              <td class="py-2 pr-4">10</td>
              <td class="py-2">Items per page (for info text)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">variant</code>
              </td>
              <td class="py-2 pr-4">'default' | 'simple' | 'minimal' | 'jumper'</td>
              <td class="py-2 pr-4">'default'</td>
              <td class="py-2">Visual variant</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">size</code>
              </td>
              <td class="py-2 pr-4">'sm' | 'md' | 'lg'</td>
              <td class="py-2 pr-4">'md'</td>
              <td class="py-2">Size of pagination buttons</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">showInfo</code>
              </td>
              <td class="py-2 pr-4">boolean</td>
              <td class="py-2 pr-4">true</td>
              <td class="py-2">Show "X–Y of Z" text</td>
            </tr>
            <tr>
              <td class="py-2 pr-4">
                <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">siblings</code>
              </td>
              <td class="py-2 pr-4">number</td>
              <td class="py-2 pr-4">1</td>
              <td class="py-2">Number of sibling pages around current</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>
  </div>
</template>
