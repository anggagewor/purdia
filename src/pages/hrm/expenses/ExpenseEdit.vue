<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()
const route = useRoute()

const employeeOptions: SelectOption[] = [
  { label: 'Andi Pratama', value: '1' },
  { label: 'Dewi Lestari', value: '2' },
  { label: 'Rudi Hermawan', value: '3' },
  { label: 'Maya Sari', value: '4' },
  { label: 'Bambang Widodo', value: '5' },
  { label: 'Siska Amelia', value: '6' },
  { label: 'Hendra Gunawan', value: '7' },
  { label: 'Linda Susanti', value: '8' },
]

const categoryOptions: SelectOption[] = [
  { label: 'Transport', value: 'transport' },
  { label: 'Meals', value: 'meals' },
  { label: 'Accommodation', value: 'accommodation' },
  { label: 'Supplies', value: 'supplies' },
  { label: 'Other', value: 'other' },
]

const statusOptions: SelectOption[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Reimbursed', value: 'reimbursed' },
]

const form = ref({
  employee: '1' as string | number,
  category: 'transport' as string | number,
  amount: '350000',
  date: '2026-07-10',
  description: 'Biaya transportasi meeting klien di Bandung.',
  receipt: '',
  status: 'approved' as string | number,
})

function handleSave() {
  router.push('/hrm/expenses')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/hrm/expenses')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Expense</h1>
        <p class="text-gray-500 mt-1">Update expense claim details.</p>
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
            v-model="form.category"
            label="Category"
            :options="categoryOptions"
            placeholder="Select category..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.amount" label="Amount (IDR)" placeholder="e.g. 350000" />
          <BaseInput v-model="form.date" label="Date" type="date" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            placeholder="Expense description..."
          />
        </div>
        <BaseInput
          v-model="form.receipt"
          label="Receipt"
          type="file"
          placeholder="Upload receipt..."
        />
        <BaseSelect
          v-model="form.status"
          label="Status"
          :options="statusOptions"
          :searchable="false"
        />
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/expenses')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
