<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const categoryOptions: SelectOption[] = [
  { label: 'Laptop', value: 'laptop' },
  { label: 'Monitor', value: 'monitor' },
  { label: 'Phone', value: 'phone' },
  { label: 'Desk', value: 'desk' },
  { label: 'Chair', value: 'chair' },
]

const conditionOptions: SelectOption[] = [
  { label: 'Good', value: 'good' },
  { label: 'Fair', value: 'fair' },
  { label: 'Damaged', value: 'damaged' },
]

const employeeOptions: SelectOption[] = [
  { label: 'Andi Pratama', value: 'andi-pratama' },
  { label: 'Dewi Lestari', value: 'dewi-lestari' },
  { label: 'Rudi Hermawan', value: 'rudi-hermawan' },
  { label: 'Maya Sari', value: 'maya-sari' },
  { label: 'Hendra Gunawan', value: 'hendra-gunawan' },
  { label: 'Linda Susanti', value: 'linda-susanti' },
  { label: 'Farhan Rizky', value: 'farhan-rizky' },
  { label: 'Siska Amelia', value: 'siska-amelia' },
]

const form = ref({
  name: '',
  category: '' as string | number,
  serialNumber: '',
  purchaseDate: '',
  purchasePrice: '',
  assignedTo: '' as string | number,
  condition: '' as string | number,
  notes: '',
})

function handleSave() {
  router.push('/hrm/assets')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton variant="ghost" size="sm" :icon="ArrowLeft" @click="router.push('/hrm/assets')" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Asset</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Register a new company asset.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.name" label="Asset Name" placeholder='e.g. MacBook Pro 14"' />
          <BaseSelect
            v-model="form.category"
            label="Category"
            :options="categoryOptions"
            placeholder="Select category..."
            :searchable="false"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="form.serialNumber"
            label="Serial Number"
            placeholder="e.g. SN-12345678"
          />
          <BaseInput v-model="form.purchaseDate" label="Purchase Date" type="date" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="form.purchasePrice"
            label="Purchase Price (Rp)"
            placeholder="e.g. 25000000"
          />
          <BaseSelect
            v-model="form.assignedTo"
            label="Assigned To"
            :options="employeeOptions"
            placeholder="Select employee..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.condition"
            label="Condition"
            :options="conditionOptions"
            placeholder="Select condition..."
            :searchable="false"
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Notes</label
          >
          <textarea
            v-model="form.notes"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Additional notes about this asset..."
          />
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/assets')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Asset</BaseButton>
    </div>
  </div>
</template>
