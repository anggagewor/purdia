<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect } from '@purdia/ui'
import { ArrowLeft, Plus, Trash2 } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()

const clientOptions: SelectOption[] = [
  { label: 'PT Teknologi Maju', value: '1' },
  { label: 'CV Solusi Digital', value: '2' },
  { label: 'PT Global Infra', value: '3' },
  { label: 'PT Nusantara Tech', value: '4' },
  { label: 'PT Karya Bersama', value: '5' },
]

const form = ref({
  client: '' as string | number,
  subject: '',
  validUntil: '',
  notes: '',
})

interface LineItem {
  id: number
  description: string
  qty: number
  price: number
}

const items = ref<LineItem[]>([{ id: 1, description: '', qty: 1, price: 0 }])

let itemId = 2

function addItem() {
  items.value.push({ id: itemId++, description: '', qty: 1, price: 0 })
}

function removeItem(id: number) {
  items.value = items.value.filter((i) => i.id !== id)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

function total() {
  return items.value.reduce((sum, i) => sum + i.qty * i.price, 0)
}

function handleSave() {
  router.push('/crm/quotations')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push('/crm/quotations')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Create Quotation</h1>
        <p class="text-gray-500 mt-1">Create a new sales quotation.</p>
      </div>
    </div>

    <BaseCard>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.client"
            label="Client"
            :options="clientOptions"
            placeholder="Select client..."
          />
          <BaseInput v-model="form.validUntil" label="Valid Until" type="date" />
        </div>
        <BaseInput v-model="form.subject" label="Subject" placeholder="Quotation subject" />
      </div>
    </BaseCard>

    <BaseCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-gray-100">Line Items</h3>
      </template>
      <div class="space-y-3">
        <div v-for="(item, idx) in items" :key="item.id" class="grid grid-cols-12 gap-3 items-end">
          <div class="col-span-5">
            <BaseInput
              v-model="item.description"
              :label="idx === 0 ? 'Description' : undefined"
              placeholder="Item description"
              size="sm"
            />
          </div>
          <div class="col-span-2">
            <BaseInput
              v-model.number="item.qty"
              :label="idx === 0 ? 'Qty' : undefined"
              type="number"
              placeholder="1"
              size="sm"
            />
          </div>
          <div class="col-span-3">
            <BaseInput
              v-model.number="item.price"
              :label="idx === 0 ? 'Unit Price' : undefined"
              type="number"
              placeholder="0"
              size="sm"
            />
          </div>
          <div class="col-span-2 flex items-center gap-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">{{
              formatCurrency(item.qty * item.price)
            }}</span>
            <button
              v-if="items.length > 1"
              class="text-gray-400 hover:text-red-500 cursor-pointer"
              @click="removeItem(item.id)"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
        <BaseButton variant="outline" size="sm" :icon="Plus" @click="addItem">Add Item</BaseButton>
        <div class="flex justify-end pt-3 border-t border-gray-200 dark:border-gray-700">
          <div class="text-right">
            <span class="text-sm text-gray-500">Total:</span>
            <p class="text-lg font-bold text-gray-900 dark:text-gray-100">
              {{ formatCurrency(total()) }}
            </p>
          </div>
        </div>
      </div>
    </BaseCard>

    <BaseCard>
      <div>
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1"
          >Notes / Terms</label
        >
        <textarea
          v-model="form.notes"
          rows="3"
          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 resize-none placeholder:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
          placeholder="Terms and conditions..."
        />
      </div>
    </BaseCard>

    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push('/crm/quotations')">Cancel</BaseButton>
      <BaseButton variant="outline" @click="handleSave">Save as Draft</BaseButton>
      <BaseButton @click="handleSave">Send Quotation</BaseButton>
    </div>
  </div>
</template>
