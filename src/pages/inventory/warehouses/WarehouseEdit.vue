<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()
const route = useRoute()
const warehouseId = Number(route.params.id)

const statusOptions: SelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const name = ref('Gudang Utama')
const location = ref('Jakarta Selatan')
const manager = ref('Budi Santoso')
const capacity = ref('5000')
const status = ref<string | number>('active')
const address = ref('Jl. Raya Kebayoran Lama No. 12')
const phone = ref('+62 21 5551234')

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
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Warehouse</h1>
        <p class="text-gray-500 mt-1">Update warehouse information.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <BaseInput v-model="name" label="Warehouse Name" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="location" label="City" />
          <BaseInput v-model="manager" label="Manager" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="capacity" label="Capacity (m²)" type="number" />
          <BaseSelect
            v-model="status"
            label="Status"
            :options="statusOptions"
            :searchable="false"
          />
        </div>
        <BaseInput v-model="address" label="Full Address" />
        <BaseInput v-model="phone" label="Phone" />
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/inventory/warehouses')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
