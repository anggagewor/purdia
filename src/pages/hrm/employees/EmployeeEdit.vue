<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect, BaseTabs, TabPanel } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'
import type { TabItem } from '@purdia/ui'

const router = useRouter()
const route = useRoute()
const activeTab = ref('personal')

const tabs: TabItem[] = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'employment', label: 'Employment' },
  { key: 'bank', label: 'Bank & Salary' },
]

const departmentOptions: SelectOption[] = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
  { label: 'HR', value: 'hr' },
  { label: 'Operations', value: 'operations' },
  { label: 'Sales', value: 'sales' },
]

const positionOptions: SelectOption[] = [
  { label: 'Senior Developer', value: 'senior-developer' },
  { label: 'Junior Developer', value: 'junior-developer' },
  { label: 'UI/UX Designer', value: 'designer' },
  { label: 'Manager', value: 'manager' },
  { label: 'Specialist', value: 'specialist' },
  { label: 'Lead', value: 'lead' },
]

const genderOptions: SelectOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

const employmentTypeOptions: SelectOption[] = [
  { label: 'Full Time', value: 'full-time' },
  { label: 'Part Time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
]

const form = ref({
  name: 'Andi Pratama',
  email: 'andi.pratama@company.com',
  phone: '+62 812 1111 2222',
  gender: 'male' as string | number,
  birthDate: '1992-05-15',
  address: 'Jl. Merdeka No. 45, Jakarta Selatan',
  department: 'engineering' as string | number,
  position: 'senior-developer' as string | number,
  employmentType: 'full-time' as string | number,
  joinDate: '2022-03-15',
  bankName: 'BCA',
  bankAccount: '1234567890',
  salary: '25000000',
})

function handleSave() {
  router.push(`/hrm/employees/${route.params.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/hrm/employees')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Employee</h1>
        <p class="text-gray-500 mt-1">Update employee information.</p>
      </div>
    </div>

    <BaseCard>
      <BaseTabs v-model="activeTab" :tabs="tabs" variant="underline" size="sm">
        <TabPanel name="personal">
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="form.name" label="Full Name" placeholder="Employee name" />
              <BaseSelect
                v-model="form.gender"
                label="Gender"
                :options="genderOptions"
                :searchable="false"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput
                v-model="form.email"
                label="Email"
                type="email"
                placeholder="email@company.com"
              />
              <BaseInput v-model="form.phone" label="Phone" placeholder="+62 xxx xxxx xxxx" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="form.birthDate" label="Date of Birth" type="date" />
            </div>
            <BaseInput v-model="form.address" label="Address" placeholder="Full address" />
          </div>
        </TabPanel>

        <TabPanel name="employment">
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseSelect
                v-model="form.department"
                label="Department"
                :options="departmentOptions"
                placeholder="Select department..."
              />
              <BaseSelect
                v-model="form.position"
                label="Position"
                :options="positionOptions"
                placeholder="Select position..."
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseSelect
                v-model="form.employmentType"
                label="Employment Type"
                :options="employmentTypeOptions"
                :searchable="false"
              />
              <BaseInput v-model="form.joinDate" label="Join Date" type="date" />
            </div>
          </div>
        </TabPanel>

        <TabPanel name="bank">
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput
                v-model="form.bankName"
                label="Bank Name"
                placeholder="e.g. BCA, Mandiri"
              />
              <BaseInput
                v-model="form.bankAccount"
                label="Account Number"
                placeholder="xxxx xxxx xxxx"
              />
            </div>
            <BaseInput v-model="form.salary" label="Base Salary" placeholder="Rp 0" />
          </div>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/employees')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
