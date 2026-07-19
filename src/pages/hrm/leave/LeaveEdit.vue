<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const employeeOptions: SelectOption[] = [
  { label: 'Andi Pratama', value: '1' },
  { label: 'Dewi Lestari', value: '2' },
  { label: 'Rudi Hermawan', value: '3' },
  { label: 'Maya Sari', value: '4' },
  { label: 'Bambang Widodo', value: '5' },
  { label: 'Siska Amelia', value: '6' },
  { label: 'Hendra Gunawan', value: '7' },
  { label: 'Linda Susanti', value: '8' },
  { label: 'Farhan Rizky', value: '9' },
  { label: 'Nadia Putri', value: '10' },
]

const typeOptions: SelectOption[] = [
  { label: 'Annual', value: 'annual' },
  { label: 'Sick', value: 'sick' },
  { label: 'Personal', value: 'personal' },
  { label: 'Maternity', value: 'maternity' },
]

const statusOptions: SelectOption[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
]

const form = ref({
  employee: '3' as string | number,
  type: 'personal' as string | number,
  startDate: '2024-12-10',
  endDate: '2024-12-10',
  reason: 'Keperluan keluarga mendesak.',
  status: 'pending' as string | number,
})

function handleSave() {
  router.push('/hrm/leave')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton variant="ghost" size="sm" :icon="ArrowLeft" @click="router.push('/hrm/leave')" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Leave Request</h1>
        <p class="text-gray-500 mt-1">Update leave application details.</p>
      </div>
    </div>
    <BaseCard>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.employee"
            label="Employee"
            :options="employeeOptions"
            placeholder="Select employee..."
          />
          <BaseSelect
            v-model="form.type"
            label="Leave Type"
            :options="typeOptions"
            placeholder="Select type..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.startDate" label="Start Date" type="date" />
          <BaseInput v-model="form.endDate" label="End Date" type="date" />
        </div>
        <BaseSelect
          v-model="form.status"
          label="Status"
          :options="statusOptions"
          placeholder="Select status..."
        />
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Reason</label
          >
          <textarea
            v-model="form.reason"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            placeholder="Reason for leave request..."
          />
        </div>
      </div>
    </BaseCard>
    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/leave')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
