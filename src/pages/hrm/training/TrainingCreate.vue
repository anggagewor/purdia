<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const departmentOptions: SelectOption[] = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
  { label: 'HR', value: 'hr' },
  { label: 'Operations', value: 'operations' },
  { label: 'Sales', value: 'sales' },
]

const form = ref({
  title: '',
  trainer: '',
  department: '' as string | number,
  startDate: '',
  endDate: '',
  maxParticipants: '',
  description: '',
})

function handleSave() {
  router.push('/hrm/training')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/hrm/training')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Training</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Create a new training program.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput v-model="form.title" label="Title" placeholder="e.g. Vue.js Advanced Patterns" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.trainer" label="Trainer" placeholder="Trainer name" />
          <BaseSelect
            v-model="form.department"
            label="Department"
            :options="departmentOptions"
            placeholder="Select department..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.startDate" label="Start Date" type="date" />
          <BaseInput v-model="form.endDate" label="End Date" type="date" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="form.maxParticipants"
            label="Max Participants"
            placeholder="e.g. 20"
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Describe the training program..."
          />
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/training')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Training</BaseButton>
    </div>
  </div>
</template>
