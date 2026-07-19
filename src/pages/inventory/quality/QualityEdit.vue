<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft, Plus, Trash2 } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()
const route = useRoute()
const qualityId = Number(route.params.id)

const resultOptions: SelectOption[] = [
  { label: 'Pass', value: 'pass' },
  { label: 'Fail', value: 'fail' },
  { label: 'Conditional', value: 'conditional' },
  { label: 'Pending', value: 'pending' },
]

const statusOptions: SelectOption[] = [
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
]

const inspectorOptions: SelectOption[] = [
  { label: 'Siti Aminah', value: 'siti' },
  { label: 'Riko Saputra', value: 'riko' },
  { label: 'Dwi Hartono', value: 'dwi' },
]

// Pre-filled
const product = ref('Laptop Dell XPS 15')
const batch = ref('BTH-2026-042')
const inspector = ref<string | number>('siti')
const date = ref('2026-07-12')
const sampleSize = ref('10')
const result = ref<string | number>('pass')
const status = ref<string | number>('completed')
const note = ref('All units passed inspection. No physical damage or functional issues detected.')

interface CheckItem {
  id: number
  criteria: string
  standard: string
  result: string
}

const checkItems = ref<CheckItem[]>([
  { id: 1, criteria: 'Physical Appearance', standard: 'No scratches or dents', result: 'pass' },
  { id: 2, criteria: 'Screen Display', standard: 'No dead pixels', result: 'pass' },
  { id: 3, criteria: 'Keyboard Function', standard: 'All keys responsive', result: 'pass' },
  { id: 4, criteria: 'Port Connectivity', standard: 'All ports working', result: 'pass' },
  { id: 5, criteria: 'Battery Health', standard: '> 95% capacity', result: 'pass' },
])

let checkId = 6

function addCheckItem() {
  checkItems.value.push({ id: checkId++, criteria: '', standard: '', result: '' })
}

function removeCheckItem(id: number) {
  checkItems.value = checkItems.value.filter((i) => i.id !== id)
}

function handleSave() {
  router.push(`/inventory/quality/${qualityId}`)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push(`/inventory/quality/${qualityId}`)"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Quality Inspection</h1>
        <p class="text-gray-500 mt-1">Update inspection details and results.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput v-model="product" label="Product" disabled />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput v-model="batch" label="Batch Number" />
          <BaseSelect v-model="inspector" label="Inspector" :options="inspectorOptions" />
          <BaseInput v-model="date" label="Inspection Date" type="date" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput v-model="sampleSize" label="Sample Size" type="number" />
          <BaseSelect
            v-model="result"
            label="Overall Result"
            :options="resultOptions"
            :searchable="false"
          />
          <BaseSelect
            v-model="status"
            label="Status"
            :options="statusOptions"
            :searchable="false"
          />
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quality Checklist</h3>
      <div class="space-y-3">
        <div
          v-for="(item, idx) in checkItems"
          :key="item.id"
          class="grid grid-cols-12 gap-3 items-end"
        >
          <div class="col-span-4">
            <BaseInput v-model="item.criteria" :label="idx === 0 ? 'Criteria' : ''" size="sm" />
          </div>
          <div class="col-span-4">
            <BaseInput v-model="item.standard" :label="idx === 0 ? 'Standard' : ''" size="sm" />
          </div>
          <div class="col-span-3">
            <BaseInput v-model="item.result" :label="idx === 0 ? 'Result' : ''" size="sm" />
          </div>
          <div class="col-span-1 flex justify-center">
            <BaseButton
              v-if="checkItems.length > 1"
              variant="ghost"
              size="sm"
              :icon="Trash2"
              @click="removeCheckItem(item.id)"
            />
          </div>
        </div>
      </div>
      <BaseButton variant="outline" size="sm" :icon="Plus" class="mt-4" @click="addCheckItem"
        >Add Criteria</BaseButton
      >
    </BaseCard>

    <BaseCard>
      <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Notes</label>
      <textarea
        v-model="note"
        rows="3"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
      />
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push(`/inventory/quality/${qualityId}`)"
        >Cancel</BaseButton
      >
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
