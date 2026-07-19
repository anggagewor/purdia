<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const statusOptions: SelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const name = ref('')
const location = ref('')
const manager = ref('')
const capacity = ref('')
const status = ref<string | number>('active')
const address = ref('')
const phone = ref('')

function handleSave() {
  router.push('/inventory/warehouses')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/inventory/warehouses')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Add Warehouse</h1>
        <p class="text-gray-500 mt-1">Register a new warehouse location.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput v-model="name" label="Warehouse Name" placeholder="e.g. Gudang Utama" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="location" label="City" placeholder="e.g. Jakarta" />
          <BaseInput v-model="manager" label="Manager" placeholder="Person in charge" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="capacity" label="Capacity (m²)" placeholder="e.g. 5000" />
          <BaseSelect
            v-model="status"
            label="Status"
            :options="statusOptions"
            :searchable="false"
          />
        </div>
        <BaseInput v-model="address" label="Full Address" placeholder="Complete address" />
        <BaseInput v-model="phone" label="Phone" placeholder="+62 xxx" />
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/inventory/warehouses')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Warehouse</BaseButton>
    </div>
  </div>
</template>
