<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect, BaseTextarea } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()
const route = useRoute()

const companyOptions: SelectOption[] = [
  { label: 'PT Teknologi Maju', value: '1' },
  { label: 'CV Solusi Digital', value: '2' },
  { label: 'PT Global Infra', value: '3' },
  { label: 'PT Nusantara Tech', value: '4' },
  { label: 'PT Karya Bersama', value: '5' },
]

const stageOptions: SelectOption[] = [
  { label: 'Qualification', value: 'qualification' },
  { label: 'Proposal', value: 'proposal' },
  { label: 'Negotiation', value: 'negotiation' },
  { label: 'Closed Won', value: 'closed-won' },
  { label: 'Closed Lost', value: 'closed-lost' },
]

const form = ref({
  name: 'Enterprise License',
  company: '1' as string | number,
  value: '150000000',
  stage: 'negotiation' as string | number,
  probability: '75',
  closeDate: '2026-08-15',
  owner: 'Andi Pratama',
  notes: 'Client interested in annual license. Need to finalize pricing.',
})

function handleSave() {
  router.push(`/crm/deals/${route.params.id}`)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton variant="ghost" size="sm" :icon="ArrowLeft" @click="router.push('/crm/deals')" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Deal</h1>
        <p class="text-gray-500 mt-1">Update deal information.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.name" label="Deal Name" placeholder="e.g. Enterprise License" />
          <BaseSelect
            v-model="form.company"
            label="Company"
            :options="companyOptions"
            placeholder="Select company..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput v-model="form.value" label="Deal Value" placeholder="Rp 0" />
          <BaseSelect
            v-model="form.stage"
            label="Stage"
            :options="stageOptions"
            :searchable="false"
          />
          <BaseInput
            v-model="form.probability"
            label="Probability (%)"
            type="number"
            placeholder="0"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.closeDate" label="Expected Close Date" type="date" />
          <BaseInput v-model="form.owner" label="Deal Owner" placeholder="Assigned person" />
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
      <BaseButton variant="ghost" @click="router.push('/crm/deals')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
