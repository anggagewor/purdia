<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const typeOptions: SelectOption[] = [
  { label: 'Preventive', value: 'preventive' },
  { label: 'Corrective', value: 'corrective' },
  { label: 'Inspection', value: 'inspection' },
]

const priorityOptions: SelectOption[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Critical', value: 'critical' },
]

const assigneeOptions: SelectOption[] = [
  { label: 'Agus Riyadi', value: 'agus' },
  { label: 'Bambang Surya', value: 'bambang' },
  { label: 'Dedi Kurniawan', value: 'dedi' },
  { label: 'Eko Wibowo', value: 'eko' },
  { label: 'Hendra P.', value: 'hendra' },
]

const asset = ref('')
const type = ref<string | number>('preventive')
const priority = ref<string | number>('medium')
const assignedTo = ref<string | number>('')
const scheduledDate = ref('')
const estimatedDuration = ref('')
const description = ref('')

function handleSave() {
  router.push('/inventory/maintenance')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/inventory/maintenance')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">New Maintenance Request</h1>
        <p class="text-gray-500 mt-1">Create a new maintenance or repair request.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput
          v-model="asset"
          label="Asset / Equipment"
          placeholder="e.g. Forklift #3, Conveyor Belt A"
        />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseSelect
            v-model="type"
            label="Maintenance Type"
            :options="typeOptions"
            :searchable="false"
          />
          <BaseSelect
            v-model="priority"
            label="Priority"
            :options="priorityOptions"
            :searchable="false"
          />
          <BaseSelect
            v-model="assignedTo"
            label="Assign To"
            :options="assigneeOptions"
            placeholder="Select technician..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="scheduledDate" label="Scheduled Date" type="date" />
          <BaseInput
            v-model="estimatedDuration"
            label="Estimated Duration (hours)"
            type="number"
            placeholder="e.g. 4"
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Description / Issue</label
          >
          <textarea
            v-model="description"
            rows="4"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            placeholder="Describe the maintenance task or issue..."
          />
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/inventory/maintenance')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Request</BaseButton>
    </div>
  </div>
</template>
