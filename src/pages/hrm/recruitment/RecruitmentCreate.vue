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

const employmentTypeOptions: SelectOption[] = [
  { label: 'Full Time', value: 'full-time' },
  { label: 'Part Time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
]

const form = ref({
  position: '',
  department: '' as string | number,
  employmentType: '' as string | number,
  requirements: '',
  salaryMin: '',
  salaryMax: '',
  closingDate: '',
})

function handleSave() {
  router.push('/hrm/recruitment')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/hrm/recruitment')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Job Posting</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Create a new recruitment posting.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput
          v-model="form.position"
          label="Position Title"
          placeholder="e.g. Senior Frontend Developer"
        />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.department"
            label="Department"
            :options="departmentOptions"
            placeholder="Select department..."
          />
          <BaseSelect
            v-model="form.employmentType"
            label="Employment Type"
            :options="employmentTypeOptions"
            placeholder="Select type..."
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Requirements</label
          >
          <textarea
            v-model="form.requirements"
            rows="4"
            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="List the requirements for this position..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.salaryMin" label="Salary Min (Rp)" placeholder="e.g. 10000000" />
          <BaseInput v-model="form.salaryMax" label="Salary Max (Rp)" placeholder="e.g. 20000000" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.closingDate" label="Closing Date" type="date" />
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/recruitment')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Posting</BaseButton>
    </div>
  </div>
</template>
