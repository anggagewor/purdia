<script setup lang="ts">
import { BaseBadge, BaseCard } from '@purdia/ui'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Badge</h1>
      <p class="text-gray-500 mt-1">Badge untuk label, status indicator, atau counter.</p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseBadge variant="primary">Primary</BaseBadge>
        <BaseBadge variant="secondary">Secondary</BaseBadge>
        <BaseBadge variant="success">Success</BaseBadge>
        <BaseBadge variant="warning">Warning</BaseBadge>
        <BaseBadge variant="danger">Danger</BaseBadge>
        <BaseBadge variant="info">Info</BaseBadge>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseBadge size="sm">Small</BaseBadge>
        <BaseBadge size="md">Medium</BaseBadge>
        <BaseBadge size="lg">Large</BaseBadge>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Dot Indicator</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseBadge variant="success" :dot="true">Active</BaseBadge>
        <BaseBadge variant="danger" :dot="true">Offline</BaseBadge>
        <BaseBadge variant="warning" :dot="true">Pending</BaseBadge>
        <BaseBadge variant="info" :dot="true">In Progress</BaseBadge>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Pill vs Square</h4></template>
      <div class="flex flex-wrap items-center gap-3">
        <BaseBadge variant="primary" :pill="true">Pill (default)</BaseBadge>
        <BaseBadge variant="primary" :pill="false">Square</BaseBadge>
        <BaseBadge variant="success" :pill="false">v2.1.0</BaseBadge>
        <BaseBadge variant="danger" :pill="false">Breaking</BaseBadge>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Real-world Examples</h4></template>
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-700">Order Status:</span>
          <BaseBadge variant="success" :dot="true" size="sm">Delivered</BaseBadge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-700">Role:</span>
          <BaseBadge variant="primary" size="sm">Admin</BaseBadge>
          <BaseBadge variant="secondary" size="sm">Editor</BaseBadge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-700">Notification count:</span>
          <BaseBadge variant="danger" size="sm">5</BaseBadge>
        </div>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseBadge variant="success" :dot="true" size="sm"&gt;
  Active
&lt;/BaseBadge&gt;

&lt;BaseBadge variant="danger" :pill="false"&gt;
  Breaking Change
&lt;/BaseBadge&gt;</code></pre>
    </BaseCard>
  </div>
</template>
