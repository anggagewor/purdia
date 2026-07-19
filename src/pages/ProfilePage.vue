<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseInput, BaseButton, BaseAvatar, BaseSelect } from '@purdia/ui'
import { Camera, Mail, Phone, MapPin, Briefcase } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const name = ref('Angga Dev')
const email = ref('angga@purdia.com')
const phone = ref('+62 812 3456 7890')
const bio = ref('Full-stack developer passionate about building clean user interfaces.')
const location = ref('Jakarta, Indonesia')
const role = ref('admin')

const roleOptions: SelectOption[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]

function handleSave() {
  console.log('Profile saved')
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">My Profile</h1>
      <p class="text-gray-500 mt-1">Manage your account information.</p>
    </div>

    <!-- Avatar Section -->
    <BaseCard>
      <div class="flex items-center gap-6">
        <div class="relative">
          <BaseAvatar name="Angga Dev" size="xl" />
          <button
            class="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-600 cursor-pointer transition-colors"
          >
            <Camera class="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900">{{ name }}</h3>
          <p class="text-sm text-gray-500">{{ email }}</p>
          <p class="text-xs text-gray-400 mt-1">Member since January 2024</p>
        </div>
      </div>
    </BaseCard>

    <!-- Profile Form -->
    <BaseCard>
      <template #header><h4 class="font-semibold">Personal Information</h4></template>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="name" label="Full Name" placeholder="Your name" :icon="Briefcase" />
          <BaseInput
            v-model="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            :icon="Mail"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="phone" label="Phone" placeholder="+62 xxx" :icon="Phone" />
          <BaseInput
            v-model="location"
            label="Location"
            placeholder="City, Country"
            :icon="MapPin"
          />
        </div>
        <BaseSelect v-model="role" label="Role" :options="roleOptions" :searchable="false" />
        <div>
          <label class="text-sm font-medium text-gray-700 block mb-1">Bio</label>
          <textarea
            v-model="bio"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400"
            placeholder="Tell us about yourself..."
          />
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2 w-full">
          <BaseButton variant="ghost">Cancel</BaseButton>
          <BaseButton @click="handleSave">Save Changes</BaseButton>
        </div>
      </template>
    </BaseCard>
  </div>
</template>
