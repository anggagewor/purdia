<script setup lang="ts">
import { ref } from 'vue'
import { BaseAlert, BaseCard } from '@purdia/ui'
import { Info, CheckCircle, AlertTriangle, AlertCircle } from '@lucide/vue'

const showDismissible = ref(true)
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Alert</h1>
      <p class="text-gray-500 mt-1">
        Notification banners untuk info, success, warning, dan error messages.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Variants</h4></template>
      <div class="space-y-3">
        <BaseAlert variant="info" title="Information" :icon="Info">
          This is an informational alert for neutral messages.
        </BaseAlert>
        <BaseAlert variant="success" title="Success" :icon="CheckCircle">
          Operation completed successfully! Your changes have been saved.
        </BaseAlert>
        <BaseAlert variant="warning" title="Warning" :icon="AlertTriangle">
          Please double-check your input before submitting.
        </BaseAlert>
        <BaseAlert variant="danger" title="Error" :icon="AlertCircle">
          Something went wrong. Please try again later.
        </BaseAlert>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Without Title</h4></template>
      <div class="space-y-3">
        <BaseAlert variant="info" :icon="Info"
          >Just a simple info message without a title.</BaseAlert
        >
        <BaseAlert variant="success" :icon="CheckCircle">File uploaded successfully.</BaseAlert>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Without Icon</h4></template>
      <div class="space-y-3">
        <BaseAlert variant="warning" title="Heads up"
          >Alerts work without icons too. Keep it simple.</BaseAlert
        >
        <BaseAlert variant="danger">Connection lost. Retrying in 5 seconds...</BaseAlert>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Dismissible</h4></template>
      <div class="space-y-3">
        <BaseAlert
          v-if="showDismissible"
          variant="info"
          title="Dismissible Alert"
          :icon="Info"
          :dismissible="true"
          @dismiss="showDismissible = false"
        >
          Click the X button to dismiss this alert.
        </BaseAlert>
        <p v-else class="text-sm text-gray-500 italic">
          Alert dismissed! Refresh page to see it again.
        </p>
      </div>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseAlert
  variant="success"
  title="Saved!"
  :icon="CheckCircle"
  :dismissible="true"
  @dismiss="hideAlert"
&gt;
  Your changes have been saved successfully.
&lt;/BaseAlert&gt;</code></pre>
    </BaseCard>
  </div>
</template>
