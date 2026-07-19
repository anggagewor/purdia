<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseInput, BaseSelect } from '@purdia/ui'
import { Plus, Trash2, Save, ArrowLeft } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'

const router = useRouter()
const route = useRoute()

const clientOptions: SelectOption[] = [
  { label: 'PT Maju Jaya', value: 'PT Maju Jaya' },
  { label: 'CV Berkah Sentosa', value: 'CV Berkah Sentosa' },
  { label: 'Toko Sinar Harapan', value: 'Toko Sinar Harapan' },
  { label: 'PT Global Teknik', value: 'PT Global Teknik' },
  { label: 'UD Sejahtera', value: 'UD Sejahtera' },
  { label: 'PT Karya Mandiri', value: 'PT Karya Mandiri' },
]

const statusOptions: SelectOption[] = [
  { label: 'Draft', value: 'draft' },
  { label: 'Sent', value: 'sent' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
]

interface InvoiceItem {
  description: string
  qty: number
  price: number
}

// Mock: pre-fill with existing invoice data
const client = ref<string | number>('PT Maju Jaya')
const status = ref<string | number>('unpaid')
const invoiceDate = ref('2025-07-01')
const dueDate = ref('2025-07-31')
const notes = ref('Payment can be made via bank transfer to BCA 1234567890 a/n PT Purdia')
const items = ref<InvoiceItem[]>([
  { description: 'Website Development', qty: 1, price: 8000000 },
  { description: 'UI/UX Design', qty: 1, price: 4000000 },
  { description: 'Monthly Hosting', qty: 3, price: 500000 },
  { description: 'Domain Registration', qty: 1, price: 150000 },
])

function addItem() {
  items.value.push({ description: '', qty: 1, price: 0 })
}

function removeItem(idx: number) {
  items.value.splice(idx, 1)
}

const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.qty * item.price, 0))
const tax = computed(() => subtotal.value * 0.11)
const total = computed(() => subtotal.value + tax.value)

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

function saveInvoice() {
  router.push({ name: 'invoice-detail', params: { id: route.params.id } })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseButton variant="ghost" size="sm" @click="router.back()">
          <ArrowLeft class="w-4 h-4" />
        </BaseButton>
        <div>
          <h1 class="text-xl font-bold">Edit Invoice</h1>
          <p class="text-sm text-gray-500 mt-1">INV-2025-001</p>
        </div>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="ghost" @click="router.back()">Cancel</BaseButton>
        <BaseButton :icon="Save" @click="saveInvoice">Save Changes</BaseButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left: Form -->
      <div class="lg:col-span-2 space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold">Invoice Details</h3>
          </template>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseSelect
              v-model="client"
              :options="clientOptions"
              label="Client"
              placeholder="Select client..."
            />
            <BaseSelect
              v-model="status"
              :options="statusOptions"
              label="Status"
              :searchable="false"
            />
            <BaseInput v-model="invoiceDate" label="Invoice Date" type="date" />
            <BaseInput v-model="dueDate" label="Due Date" type="date" />
          </div>
          <div class="mt-4">
            <BaseInput v-model="notes" label="Notes" placeholder="Optional notes..." />
          </div>
        </BaseCard>

        <BaseCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Items</h3>
              <BaseButton variant="ghost" size="sm" :icon="Plus" @click="addItem"
                >Add Item</BaseButton
              >
            </div>
          </template>
          <div class="space-y-3">
            <!-- Header -->
            <div
              class="grid grid-cols-12 gap-3 text-xs font-semibold text-gray-500 uppercase tracking-wide"
            >
              <div class="col-span-5">Description</div>
              <div class="col-span-2">Qty</div>
              <div class="col-span-3">Price</div>
              <div class="col-span-1 text-right">Total</div>
              <div class="col-span-1"></div>
            </div>
            <!-- Rows -->
            <div
              v-for="(item, idx) in items"
              :key="idx"
              class="grid grid-cols-12 gap-3 items-center"
            >
              <div class="col-span-5">
                <input
                  v-model="item.description"
                  type="text"
                  placeholder="Item description"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-500"
                />
              </div>
              <div class="col-span-2">
                <input
                  v-model.number="item.qty"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-500"
                />
              </div>
              <div class="col-span-3">
                <input
                  v-model.number="item.price"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-primary-500"
                />
              </div>
              <div class="col-span-1 text-right text-sm font-medium">
                {{ formatRp(item.qty * item.price) }}
              </div>
              <div class="col-span-1 text-center">
                <button
                  v-if="items.length > 1"
                  class="text-gray-400 hover:text-red-500 cursor-pointer"
                  @click="removeItem(idx)"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Right: Summary -->
      <div>
        <BaseCard>
          <template #header>
            <h3 class="font-semibold">Summary</h3>
          </template>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Subtotal</span>
              <span class="font-medium">{{ formatRp(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Tax (11%)</span>
              <span class="font-medium">{{ formatRp(tax) }}</span>
            </div>
            <div class="border-t border-gray-100 pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{{ formatRp(total) }}</span>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
