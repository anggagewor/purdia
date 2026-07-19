<script setup lang="ts">
import { ref } from 'vue'
import { BaseRating, BaseCard } from '@purdia/ui'

const rating1 = ref(3)
const rating2 = ref(4)
const rating3 = ref(4)
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Rating</h1>
      <p class="text-gray-500 mt-1">Interactive rating component with star and heart variants.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Star Variant (Default)</h4></template>
      <div class="flex items-center gap-2">
        <BaseRating v-model="rating1" variant="star" size="md" />
        <span class="text-sm text-gray-500">{{ rating1 }}/5</span>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Heart Variant</h4></template>
      <div class="flex items-center gap-2">
        <BaseRating v-model="rating2" variant="heart" size="md" />
        <span class="text-sm text-gray-500">{{ rating2 }}/5</span>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <BaseRating v-model="rating3" variant="star" size="sm" />
          <span class="text-xs text-gray-500">Small</span>
        </div>
        <div class="flex items-center gap-2">
          <BaseRating v-model="rating3" variant="star" size="md" />
          <span class="text-sm text-gray-500">Medium</span>
        </div>
        <div class="flex items-center gap-2">
          <BaseRating v-model="rating3" variant="star" size="lg" />
          <span class="text-sm text-gray-500">Large</span>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Readonly</h4></template>
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <BaseRating :model-value="5" variant="star" size="md" :readonly="true" />
          <span class="text-sm text-gray-600 font-medium">5.0</span>
          <span class="text-xs text-gray-400">(128 reviews)</span>
        </div>
        <div class="flex items-center gap-2">
          <BaseRating :model-value="3" variant="star" size="md" :readonly="true" />
          <span class="text-sm text-gray-600 font-medium">3.0</span>
          <span class="text-xs text-gray-400">(42 reviews)</span>
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseRating v-model="rating" variant="star" size="md" /&gt;

&lt;!-- Heart variant --&gt;
&lt;BaseRating v-model="rating" variant="heart" size="md" /&gt;

&lt;!-- Readonly --&gt;
&lt;BaseRating :model-value="4.5" :readonly="true" /&gt;</code></pre>
    </BaseCard>
  </div>
</template>
