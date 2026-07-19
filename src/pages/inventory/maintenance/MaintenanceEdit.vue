<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()
const route = useRoute()
const maintenanceId = Number(route.params.id)

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

const statusOptions: SelectOption[] = [
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

const assigneeOptions: SelectOption[] = [
  { label: 'Agus Riyadi', value: 'agus' },
  { label: 'Bambang Surya', value: 'bambang' },
  { label: 'Dedi Kurniawan', value: 'dedi' },
  { label: 'Eko Wibowo', value: 'eko' },
  { label: 'Hendra P.', value: 'hendra' },
]

// Pre-filled data
const asset = ref('Forklift #3')
const type = ref<string | number>('preventive')
const priority = ref<string | number>('medium')
const status = ref<string | number>('scheduled')
const assignedTo = ref<string | number>('agus')
const scheduledDate = ref('2026-07-15')
const estimatedDuration = ref('3')
const description = ref(
  'Scheduled preventive maintenance: oil change, brake inspection, hydraulic system check.',
)

function handleSave() {
  router.push(`/inventory/maintenance/${maintenanceId}`)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push(`/inventory/maintenance/${maintenanceId}`)"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Edit Maintenance Request
        </h1>
        <p class="text-gray-500 mt-1">Update maintenance task details.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput v-model="asset" label="Asset / Equipment" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="type"
            label="Maintenance Type"
            :options="typeOptions"
            :searchable="false"
          />
          <BaseSelect
            v-model="status"
            label="Status"
            :options="statusOptions"
            :searchable="false"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="priority"
            label="Priority"
            :options="priorityOptions"
            :searchable="false"
          />
          <BaseSelect v-model="assignedTo" label="Assign To" :options="assigneeOptions" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="scheduledDate" label="Scheduled Date" type="date" />
          <BaseInput v-model="estimatedDuration" label="Estimated Duration (hours)" type="number" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Description</label
          >
          <textarea
            v-model="description"
            rows="4"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push(`/inventory/maintenance/${maintenanceId}`)"
        >Cancel</BaseButton
      >
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
