<script setup lang="ts">
import { BaseAvatar, BaseCard } from '@purdia/ui'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Avatar</h1>
      <p class="text-gray-500 mt-1">
        User avatar dengan image, auto-generated initials, dan color.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="flex items-end gap-4">
        <div class="text-center space-y-2">
          <BaseAvatar name="John Doe" size="xs" />
          <p class="text-xs text-gray-500">xs</p>
        </div>
        <div class="text-center space-y-2">
          <BaseAvatar name="Jane Smith" size="sm" />
          <p class="text-xs text-gray-500">sm</p>
        </div>
        <div class="text-center space-y-2">
          <BaseAvatar name="Bob Wilson" size="md" />
          <p class="text-xs text-gray-500">md</p>
        </div>
        <div class="text-center space-y-2">
          <BaseAvatar name="Alice Brown" size="lg" />
          <p class="text-xs text-gray-500">lg</p>
        </div>
        <div class="text-center space-y-2">
          <BaseAvatar name="Charlie Davis" size="xl" />
          <p class="text-xs text-gray-500">xl</p>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants (Shape)</h4></template>
      <div class="flex items-center gap-6">
        <div class="text-center space-y-2">
          <BaseAvatar name="Circle" variant="circle" size="lg" />
          <p class="text-xs text-gray-500">circle</p>
        </div>
        <div class="text-center space-y-2">
          <BaseAvatar name="Rounded" variant="rounded" size="lg" />
          <p class="text-xs text-gray-500">rounded</p>
        </div>
        <div class="text-center space-y-2">
          <BaseAvatar name="Square" variant="square" size="lg" />
          <p class="text-xs text-gray-500">square</p>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Auto Color Generation</h4></template>
      <p class="text-sm text-gray-500 mb-4">
        Setiap nama akan generate warna background yang konsisten.
      </p>
      <div class="flex flex-wrap gap-3">
        <BaseAvatar name="Ahmad" size="md" />
        <BaseAvatar name="Budi" size="md" />
        <BaseAvatar name="Citra" size="md" />
        <BaseAvatar name="Dewi" size="md" />
        <BaseAvatar name="Eko" size="md" />
        <BaseAvatar name="Fitri" size="md" />
        <BaseAvatar name="Gani" size="md" />
        <BaseAvatar name="Hana" size="md" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Avatar Group</h4></template>
      <div class="flex -space-x-2">
        <BaseAvatar name="User 1" size="md" class="ring-2 ring-white" />
        <BaseAvatar name="User 2" size="md" class="ring-2 ring-white" />
        <BaseAvatar name="User 3" size="md" class="ring-2 ring-white" />
        <BaseAvatar name="User 4" size="md" class="ring-2 ring-white" />
        <div
          class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 ring-2 ring-white"
        >
          +5
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;!-- With name (auto initials + color) --&gt;
&lt;BaseAvatar name="John Doe" size="md" /&gt;

&lt;!-- With image --&gt;
&lt;BaseAvatar src="/avatar.jpg" alt="John" size="lg" /&gt;

&lt;!-- Different shapes --&gt;
&lt;BaseAvatar name="User" variant="rounded" /&gt;</code></pre>
    </BaseCard>
  </div>
</template>
