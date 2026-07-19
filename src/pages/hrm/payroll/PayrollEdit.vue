<script setup lang="ts">
import { ref, computed } from 'vue'
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

const periodOptions: SelectOption[] = [
  { label: 'Januari 2025', value: '2025-01' },
  { label: 'Desember 2024', value: '2024-12' },
  { label: 'November 2024', value: '2024-11' },
  { label: 'Oktober 2024', value: '2024-10' },
  { label: 'September 2024', value: '2024-09' },
  { label: 'Agustus 2024', value: '2024-08' },
]

const form = ref({
  employee: '1' as string | number,
  period: '2024-12' as string | number,
  baseSalary: '25000000',
  allowances: '5000000',
  deductions: '2500000',
})

const netSalary = computed(() => {
  const base = parseFloat(form.value.baseSalary.replace(/\D/g, '')) || 0
  const allowance = parseFloat(form.value.allowances.replace(/\D/g, '')) || 0
  const deduction = parseFloat(form.value.deductions.replace(/\D/g, '')) || 0
  const net = base + allowance - deduction
  return net > 0 ? `Rp ${net.toLocaleString('id-ID')}` : 'Rp 0'
})

function handleSave() {
  router.push('/hrm/payroll')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/hrm/payroll')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Payroll</h1>
        <p class="text-gray-500 mt-1">Update payroll entry.</p>
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
            v-model="form.period"
            label="Period"
            :options="periodOptions"
            placeholder="Select period..."
          />
        </div>
        <BaseInput v-model="form.baseSalary" label="Base Salary" placeholder="Rp 0" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.allowances" label="Allowances" placeholder="Rp 0" />
          <BaseInput v-model="form.deductions" label="Deductions" placeholder="Rp 0" />
        </div>
        <div
          class="p-4 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Net Salary</span>
            <span class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ netSalary }}</span>
          </div>
        </div>
      </div>
    </BaseCard>
    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/payroll')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
