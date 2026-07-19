<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const typeOptions: SelectOption[] = [
  { label: 'General', value: 'general' },
  { label: 'Policy', value: 'policy' },
  { label: 'Event', value: 'event' },
  { label: 'Urgent', value: 'urgent' },
]

const priorityOptions: SelectOption[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]

const form = ref({
  title: '',
  type: '' as string | number,
  content: '',
  expiryDate: '',
  priority: 'medium' as string | number,
})

function handleSave() {
  router.push('/hrm/announcements')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/hrm/announcements')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Announcement</h1>
        <p class="text-gray-500 mt-1">Publish a new company announcement.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput v-model="form.title" label="Title" placeholder="Announcement title" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.type"
            label="Type"
            :options="typeOptions"
            placeholder="Select type..."
          />
          <BaseSelect
            v-model="form.priority"
            label="Priority"
            :options="priorityOptions"
            :searchable="false"
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Content</label
          >
          <textarea
            v-model="form.content"
            rows="6"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            placeholder="Write announcement content..."
          />
        </div>
        <BaseInput v-model="form.expiryDate" label="Expiry Date" type="date" />
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/announcements')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Publish Announcement</BaseButton>
    </div>
  </div>
</template>
