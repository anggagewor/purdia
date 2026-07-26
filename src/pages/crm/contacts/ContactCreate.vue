<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect, BaseTextarea } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const companyOptions: SelectOption[] = [
  { label: 'PT Teknologi Maju', value: '1' },
  { label: 'CV Solusi Digital', value: '2' },
  { label: 'PT Global Infra', value: '3' },
  { label: 'PT Nusantara Tech', value: '4' },
  { label: 'PT Karya Bersama', value: '5' },
]

const statusOptions: SelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const form = ref({
  name: '',
  company: '' as string | number,
  position: '',
  email: '',
  phone: '',
  status: 'active' as string | number,
  notes: '',
})

function handleSave() {
  router.push('/crm/contacts')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/crm/contacts')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Contact</h1>
        <p class="text-gray-500 mt-1">Create a new contact record.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.name" label="Full Name" placeholder="Contact name" />
          <BaseSelect
            v-model="form.company"
            label="Company"
            :options="companyOptions"
            placeholder="Select company..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.position" label="Position" placeholder="Job title" />
          <BaseSelect
            v-model="form.status"
            label="Status"
            :options="statusOptions"
            :searchable="false"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="email@example.com"
          />
          <BaseInput v-model="form.phone" label="Phone" placeholder="+62 xxx xxxx xxxx" />
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
      <BaseButton variant="ghost" @click="router.push('/crm/contacts')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Contact</BaseButton>
    </div>
  </div>
</template>
