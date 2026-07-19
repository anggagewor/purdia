<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft, Plus, Trash2 } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const productOptions: SelectOption[] = [
  { label: 'Laptop Dell XPS 15', value: '1' },
  { label: 'Mouse Logitech MX Master 3', value: '2' },
  { label: 'Keyboard Mechanical K2 Pro', value: '3' },
  { label: 'Monitor LG UltraWide 34"', value: '4' },
  { label: 'USB-C Hub Anker 7-in-1', value: '5' },
  { label: 'SSD Samsung 1TB', value: '6' },
  { label: 'RAM DDR5 32GB Kit', value: '9' },
]

const inspectorOptions: SelectOption[] = [
  { label: 'Siti Aminah', value: 'siti' },
  { label: 'Riko Saputra', value: 'riko' },
  { label: 'Dwi Hartono', value: 'dwi' },
]

const product = ref<string | number>('')
const inspector = ref<string | number>('')
const batch = ref('')
const date = ref('')
const sampleSize = ref('')
const note = ref('')

interface CheckItem {
  id: number
  criteria: string
  standard: string
  result: string
}

const checkItems = ref<CheckItem[]>([{ id: 1, criteria: '', standard: '', result: '' }])

let checkId = 2

function addCheckItem() {
  checkItems.value.push({ id: checkId++, criteria: '', standard: '', result: '' })
}

function removeCheckItem(id: number) {
  checkItems.value = checkItems.value.filter((i) => i.id !== id)
}

function handleSave() {
  router.push('/inventory/quality')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/inventory/quality')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">New Quality Inspection</h1>
        <p class="text-gray-500 mt-1">Create a new quality control inspection record.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseSelect
          v-model="product"
          label="Product"
          :options="productOptions"
          placeholder="Select product to inspect..."
        />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput v-model="batch" label="Batch Number" placeholder="e.g. BTH-2026-043" />
          <BaseSelect
            v-model="inspector"
            label="Inspector"
            :options="inspectorOptions"
            placeholder="Assign inspector..."
          />
          <BaseInput v-model="date" label="Inspection Date" type="date" />
        </div>
        <BaseInput v-model="sampleSize" label="Sample Size" type="number" placeholder="e.g. 10" />
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
            <BaseInput
              v-model="item.criteria"
              :label="idx === 0 ? 'Criteria' : ''"
              placeholder="e.g. Visual defects"
              size="sm"
            />
          </div>
          <div class="col-span-4">
            <BaseInput
              v-model="item.standard"
              :label="idx === 0 ? 'Standard / Threshold' : ''"
              placeholder="e.g. No visible scratches"
              size="sm"
            />
          </div>
          <div class="col-span-3">
            <BaseInput
              v-model="item.result"
              :label="idx === 0 ? 'Result' : ''"
              placeholder="Pass / Fail"
              size="sm"
            />
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
      <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
        >Notes / Remarks</label
      >
      <textarea
        v-model="note"
        rows="3"
        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        placeholder="Additional quality notes..."
      />
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/inventory/quality')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Inspection</BaseButton>
    </div>
  </div>
</template>
