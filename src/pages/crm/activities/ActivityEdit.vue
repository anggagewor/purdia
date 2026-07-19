<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()
const route = useRoute()

const typeOptions: SelectOption[] = [
  { label: 'Call', value: 'call' },
  { label: 'Meeting', value: 'meeting' },
  { label: 'Email', value: 'email' },
  { label: 'Task', value: 'task' },
]

const contactOptions: SelectOption[] = [
  { label: 'Andi Pratama', value: '1' },
  { label: 'Dewi Lestari', value: '2' },
  { label: 'Rudi Hermawan', value: '3' },
  { label: 'Maya Sari', value: '4' },
  { label: 'Bambang Widodo', value: '5' },
]

const dealOptions: SelectOption[] = [
  { label: 'Enterprise License', value: '1' },
  { label: 'Consulting Project', value: '2' },
  { label: 'SaaS Subscription', value: '3' },
  { label: 'Implementation', value: '4' },
  { label: 'Support Contract', value: '5' },
]

const statusOptions: SelectOption[] = [
  { label: 'Planned', value: 'planned' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

const form = ref({
  type: 'call' as string | number,
  subject: 'Initial discovery call',
  contact: '1' as string | number,
  deal: '1' as string | number,
  date: '2026-07-12',
  status: 'completed' as string | number,
  notes: 'Discussed requirements and timeline.',
})

function handleSave() {
  router.push('/crm/activities')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/crm/activities')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Activity</h1>
        <p class="text-gray-500 mt-1">Update activity details.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.type"
            label="Activity Type"
            :options="typeOptions"
            placeholder="Select type..."
          />
          <BaseSelect
            v-model="form.status"
            label="Status"
            :options="statusOptions"
            :searchable="false"
          />
        </div>
        <BaseInput v-model="form.subject" label="Subject" placeholder="Activity subject" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.contact"
            label="Contact"
            :options="contactOptions"
            placeholder="Select contact..."
          />
          <BaseSelect
            v-model="form.deal"
            label="Related Deal"
            :options="dealOptions"
            placeholder="Select deal..."
          />
        </div>
        <BaseInput v-model="form.date" label="Date" type="date" />
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Notes</label
          >
          <textarea
            v-model="form.notes"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            placeholder="Activity notes..."
          />
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/crm/activities')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
