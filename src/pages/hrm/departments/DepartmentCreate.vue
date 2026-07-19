<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const headOptions: SelectOption[] = [
  { label: 'Andi Pratama', value: '1' },
  { label: 'Dewi Lestari', value: '2' },
  { label: 'Nadia Putri', value: '3' },
  { label: 'Siska Amelia', value: '4' },
  { label: 'Bambang Widodo', value: '5' },
]

const form = ref({ name: '', head: '' as string | number, budget: '', description: '' })

function handleSave() {
  router.push('/hrm/departments')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/hrm/departments')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Department</h1>
        <p class="text-gray-500 mt-1">Create a new department.</p>
      </div>
    </div>
    <BaseCard>
      <div class="space-y-4">
        <BaseInput v-model="form.name" label="Department Name" placeholder="e.g. Engineering" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.head"
            label="Department Head"
            :options="headOptions"
            placeholder="Select head..."
          />
          <BaseInput v-model="form.budget" label="Annual Budget" placeholder="Rp 0" />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            placeholder="Department description..."
          />
        </div>
      </div>
    </BaseCard>
    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/hrm/departments')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Department</BaseButton>
    </div>
  </div>
</template>
