<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect, BaseTextarea } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const industryOptions: SelectOption[] = [
  { label: 'Technology', value: 'technology' },
  { label: 'IT Services', value: 'it-services' },
  { label: 'Finance', value: 'finance' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Retail', value: 'retail' },
  { label: 'Infrastructure', value: 'infrastructure' },
  { label: 'Digital Media', value: 'digital-media' },
]

const statusOptions: SelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const form = ref({
  name: '',
  industry: '' as string | number,
  email: '',
  phone: '',
  website: '',
  city: '',
  address: '',
  employees: '',
  revenue: '',
  status: 'active' as string | number,
  notes: '',
})

function handleSave() {
  router.push('/crm/companies')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/crm/companies')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Company</h1>
        <p class="text-gray-500 mt-1">Create a new company record.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.name" label="Company Name" placeholder="PT Example Corp" />
          <BaseSelect
            v-model="form.industry"
            label="Industry"
            :options="industryOptions"
            placeholder="Select industry..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="info@company.com"
          />
          <BaseInput v-model="form.phone" label="Phone" placeholder="+62 21 xxxx xxxx" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.website" label="Website" placeholder="https://company.com" />
          <BaseInput v-model="form.city" label="City" placeholder="Jakarta" />
        </div>
        <BaseInput v-model="form.address" label="Address" placeholder="Full address" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput v-model="form.employees" label="Employees" type="number" placeholder="0" />
          <BaseInput v-model="form.revenue" label="Annual Revenue" placeholder="Rp 0" />
          <BaseSelect
            v-model="form.status"
            label="Status"
            :options="statusOptions"
            :searchable="false"
          />
        </div>
        <BaseTextarea
          v-model="form.notes"
          label="Notes"
          :rows="3"
          placeholder="Additional notes..."
        />
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/crm/companies')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Company</BaseButton>
    </div>
  </div>
</template>
