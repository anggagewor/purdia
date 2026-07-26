<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect, BaseTextarea } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const typeOptions: SelectOption[] = [
  { label: 'Call', value: 'call' },
  { label: 'Email', value: 'email' },
  { label: 'Meeting', value: 'meeting' },
]

const contactOptions: SelectOption[] = [
  { label: 'Andi Pratama', value: '1' },
  { label: 'Dewi Lestari', value: '2' },
  { label: 'Rudi Hermawan', value: '3' },
  { label: 'Maya Sari', value: '4' },
  { label: 'Bambang Widodo', value: '5' },
]

const priorityOptions: SelectOption[] = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]

const form = ref({
  subject: '',
  contact: '' as string | number,
  type: '' as string | number,
  dueDate: '',
  priority: 'medium' as string | number,
  notes: '',
})

function handleSave() {
  router.push('/crm/follow-ups')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/crm/follow-ups')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Follow Up</h1>
        <p class="text-gray-500 mt-1">Schedule a new follow-up action.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput v-model="form.subject" label="Subject" placeholder="Follow up subject" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.contact"
            label="Contact"
            :options="contactOptions"
            placeholder="Select contact..."
          />
          <BaseSelect
            v-model="form.type"
            label="Type"
            :options="typeOptions"
            placeholder="Select type..."
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.dueDate" label="Due Date" type="date" />
          <BaseSelect
            v-model="form.priority"
            label="Priority"
            :options="priorityOptions"
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
      <BaseButton variant="ghost" @click="router.push('/crm/follow-ups')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Follow Up</BaseButton>
    </div>
  </div>
</template>
