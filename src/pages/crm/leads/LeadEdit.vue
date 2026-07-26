<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect, BaseTextarea } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()
const route = useRoute()

const sourceOptions: SelectOption[] = [
  { label: 'Website', value: 'website' },
  { label: 'Referral', value: 'referral' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Cold Call', value: 'cold-call' },
  { label: 'Trade Show', value: 'trade-show' },
  { label: 'Social Media', value: 'social-media' },
]

const statusOptions: SelectOption[] = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Proposal', value: 'proposal' },
  { label: 'Lost', value: 'lost' },
]

const form = ref({
  name: 'Andi Pratama',
  company: 'PT Maju Jaya',
  email: 'andi@majujaya.co.id',
  phone: '+62 812 1111 2222',
  source: 'website' as string | number,
  status: 'new' as string | number,
  notes: 'Interested in our enterprise plan. Follow up next week.',
})

function handleSave() {
  router.push(`/crm/leads/${route.params.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton variant="ghost" size="sm" :icon="ArrowLeft" @click="router.push('/crm/leads')" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Lead</h1>
        <p class="text-gray-500 mt-1">Update lead information.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.name" label="Full Name" placeholder="Contact name" />
          <BaseInput v-model="form.company" label="Company" placeholder="Company name" />
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.source"
            label="Lead Source"
            :options="sourceOptions"
            placeholder="Select source..."
          />
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
      <BaseButton variant="ghost" @click="router.push('/crm/leads')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
