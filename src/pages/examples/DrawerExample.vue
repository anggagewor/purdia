<script setup lang="ts">
import { ref } from 'vue'
import { BaseDrawer, BaseCard, BaseButton } from '@purdia/ui'

const rightDrawer = ref(false)
const leftDrawer = ref(false)
const smDrawer = ref(false)
const lgDrawer = ref(false)
const xlDrawer = ref(false)
const footerDrawer = ref(false)
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Drawer</h1>
      <p class="text-gray-500 mt-1 dark:text-gray-400">
        Slide-in panel from the side of the screen for secondary content.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Right Drawer (default)</h4></template>
      <div class="flex flex-wrap gap-4">
        <BaseButton @click="rightDrawer = true">Open Right Drawer</BaseButton>
      </div>
      <BaseDrawer v-model="rightDrawer" title="Right Drawer" position="right">
        <p class="text-gray-600 dark:text-gray-400">
          This drawer slides in from the right side. It uses the default medium size.
        </p>
      </BaseDrawer>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Left Drawer</h4></template>
      <div class="flex flex-wrap gap-4">
        <BaseButton variant="secondary" @click="leftDrawer = true">Open Left Drawer</BaseButton>
      </div>
      <BaseDrawer v-model="leftDrawer" title="Left Drawer" position="left">
        <p class="text-gray-600 dark:text-gray-400">This drawer slides in from the left side.</p>
      </BaseDrawer>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="flex flex-wrap gap-4">
        <BaseButton variant="secondary" @click="smDrawer = true">Small (sm)</BaseButton>
        <BaseButton variant="secondary" @click="rightDrawer = true">Medium (md)</BaseButton>
        <BaseButton variant="secondary" @click="lgDrawer = true">Large (lg)</BaseButton>
        <BaseButton variant="secondary" @click="xlDrawer = true">Extra Large (xl)</BaseButton>
      </div>
      <BaseDrawer v-model="smDrawer" title="Small Drawer" size="sm">
        <p class="text-gray-600 dark:text-gray-400">Small drawer (w-72).</p>
      </BaseDrawer>
      <BaseDrawer v-model="lgDrawer" title="Large Drawer" size="lg">
        <p class="text-gray-600 dark:text-gray-400">Large drawer (w-[32rem]).</p>
      </BaseDrawer>
      <BaseDrawer v-model="xlDrawer" title="Extra Large Drawer" size="xl">
        <p class="text-gray-600 dark:text-gray-400">Extra large drawer (w-[42rem]).</p>
      </BaseDrawer>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Footer Slot</h4></template>
      <div class="flex flex-wrap gap-4">
        <BaseButton @click="footerDrawer = true">Open Drawer with Footer</BaseButton>
      </div>
      <BaseDrawer v-model="footerDrawer" title="Edit Profile">
        <div class="space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            Drawer with footer actions for forms or confirmations.
          </p>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="John Doe"
            />
          </div>
        </div>
        <template #footer>
          <BaseButton variant="secondary" @click="footerDrawer = false">Cancel</BaseButton>
          <BaseButton @click="footerDrawer = false">Save</BaseButton>
        </template>
      </BaseDrawer>
    </BaseCard>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;BaseDrawer v-model="isOpen" title="My Drawer" position="right" size="md"&gt;
  &lt;p&gt;Drawer body content&lt;/p&gt;
  &lt;template #footer&gt;
    &lt;BaseButton variant="secondary" @click="isOpen = false"&gt;Cancel&lt;/BaseButton&gt;
    &lt;BaseButton @click="save()"&gt;Save&lt;/BaseButton&gt;
  &lt;/template&gt;
&lt;/BaseDrawer&gt;</code></pre>
    </BaseCard>
  </div>
</template>
