<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const assigneeOptions: SelectOption[] = [
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

const statusOptions: SelectOption[] = [
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
]

const form = ref({
  title: '',
  assignee: '' as string | number,
  relatedTo: '',
  dueDate: '',
  priority: 'medium' as string | number,
  status: 'todo' as string | number,
  description: '',
})

function handleSave() {
  router.push('/crm/tasks')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton variant="ghost" size="sm" :icon="ArrowLeft" @click="router.push('/crm/tasks')" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Task</h1>
        <p class="text-gray-500 mt-1">Create a new CRM task.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput v-model="form.title" label="Task Title" placeholder="What needs to be done?" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.assignee"
            label="Assignee"
            :options="assigneeOptions"
            placeholder="Assign to..."
          />
          <BaseInput v-model="form.relatedTo" label="Related To" placeholder="Deal or general" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput v-model="form.dueDate" label="Due Date" type="date" />
          <BaseSelect
            v-model="form.priority"
            label="Priority"
            :options="priorityOptions"
            :searchable="false"
          />
          <BaseSelect
            v-model="form.status"
            label="Status"
            :options="statusOptions"
            :searchable="false"
          />
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
            placeholder="Task description..."
          />
        </div>
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/crm/tasks')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Task</BaseButton>
    </div>
  </div>
</template>
