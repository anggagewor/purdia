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

const statusOptions: SelectOption[] = [
  { label: 'Present', value: 'present' },
  { label: 'Late', value: 'late' },
  { label: 'Absent', value: 'absent' },
  { label: 'Half Day', value: 'half-day' },
]

const form = ref({
  employee: '2' as string | number,
  date: '2024-12-02',
  clockIn: '08:45',
  clockOut: '17:30',
  status: 'late' as string | number,
  notes: 'Terjebak macet di jalan tol.',
})

function handleSave() {
  router.push('/hrm/attendance')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/hrm/attendance')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Attendance</h1>
        <p class="text-gray-500 mt-1">Update attendance record.</p>
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
          <BaseInput v-model="form.date" label="Date" type="date" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput v-model="form.clockIn" label="Clock In" type="time" />
          <BaseInput v-model="form.clockOut" label="Clock Out" type="time" />
          <BaseSelect
            v-model="form.status"
            label="Status"
            :options="statusOptions"
            placeholder="Select status..."
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Notes</label
          >
          <textarea
            v-model="form.notes"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            placeholder="Additional notes..."
          />
        </div>
      </div>
    </BaseCard>
    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/attendance')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
