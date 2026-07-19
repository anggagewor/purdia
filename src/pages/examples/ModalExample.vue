<script setup lang="ts">
import { ref } from 'vue'
import { BaseModal, BaseCard, BaseButton, BaseInput, BaseSelect } from '@purdia/ui'

const showBasic = ref(false)
const showSmall = ref(false)
const showLarge = ref(false)
const showForm = ref(false)
const showPersistent = ref(false)

const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Modal</h1>
      <p class="text-gray-500 mt-1">
        Dialog overlay dengan berbagai size, persistent mode, dan footer actions.
      </p>
    </div>

    <BaseCard>
      <template #header><h4 class="font-semibold">Sizes</h4></template>
      <div class="flex flex-wrap gap-3">
        <BaseButton size="sm" @click="showSmall = true">Small Modal</BaseButton>
        <BaseButton size="sm" @click="showBasic = true">Medium Modal</BaseButton>
        <BaseButton size="sm" @click="showLarge = true">Large Modal</BaseButton>
      </div>
    </BaseCard>

    <BaseCard>
      <template #header><h4 class="font-semibold">With Form</h4></template>
      <BaseButton @click="showForm = true">Open Form Modal</BaseButton>
    </BaseCard>

    <BaseCard>
      <template #header
        ><h4 class="font-semibold">Persistent (no close on overlay click)</h4></template
      >
      <BaseButton variant="warning" @click="showPersistent = true"
        >Open Persistent Modal</BaseButton
      >
    </BaseCard>

    <!-- Modals -->
    <BaseModal v-model="showSmall" title="Small Modal" size="sm">
      <p class="text-sm text-gray-600">This is a small modal. Good for quick confirmations.</p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showSmall = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showSmall = false">OK</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showBasic" title="Medium Modal" size="md">
      <p class="text-sm text-gray-600">
        This is the default medium modal. It works great for most use cases.
      </p>
      <p class="text-sm text-gray-500 mt-2">Click outside or the X button to close.</p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showBasic = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showBasic = false">Confirm</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showLarge" title="Large Modal" size="lg">
      <div class="space-y-4">
        <p class="text-sm text-gray-600">
          Large modals are great for displaying more complex content like forms, tables, or detailed
          information.
        </p>
        <div class="bg-gray-50 rounded-lg p-4">
          <h5 class="font-medium text-sm mb-2">Key Features:</h5>
          <ul class="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Teleported to body for z-index safety</li>
            <li>Transition animations</li>
            <li>Click outside to close</li>
            <li>Multiple sizes (sm, md, lg, xl, full)</li>
            <li>Header, body, and footer slots</li>
          </ul>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showLarge = false">Close</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showForm" title="Create User" size="md">
      <div class="space-y-4">
        <BaseInput label="Full Name" placeholder="Enter full name..." />
        <BaseInput label="Email" type="email" placeholder="user@example.com" />
        <BaseSelect label="Role" :options="roles" />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showForm = false">Cancel</BaseButton>
        <BaseButton variant="success" size="sm" @click="showForm = false">Create User</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showPersistent" title="Are you sure?" size="sm" :persistent="true">
      <p class="text-sm text-gray-600">
        This modal won't close when clicking the overlay. You must click a button.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showPersistent = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showPersistent = false">Delete</BaseButton>
      </template>
    </BaseModal>

    <BaseCard variant="flat">
      <template #header><h4 class="font-semibold">Usage</h4></template>
      <pre
        class="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs leading-relaxed overflow-x-auto"
      ><code>&lt;script setup&gt;
const showModal = ref(false)
&lt;/script&gt;

&lt;BaseButton @click="showModal = true"&gt;Open&lt;/BaseButton&gt;

&lt;BaseModal v-model="showModal" title="My Modal" size="md"&gt;
  &lt;p&gt;Content here&lt;/p&gt;
  &lt;template #footer&gt;
    &lt;BaseButton variant="ghost" @click="showModal = false"&gt;Cancel&lt;/BaseButton&gt;
    &lt;BaseButton @click="handleSave"&gt;Save&lt;/BaseButton&gt;
  &lt;/template&gt;
&lt;/BaseModal&gt;</code></pre>
    </BaseCard>
  </div>
</template>
