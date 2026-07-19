<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import { ArrowLeft, Pencil, Printer, Send, Download, CheckCircle } from '@lucide/vue'

const router = useRouter()
const route = useRoute()

// Mock invoice data
const invoice = ref({
  id: Number(route.params.id) || 1,
  number: 'INV-2025-001',
  status: 'unpaid',
  client: {
    name: 'PT Maju Jaya',
    address: 'Jl. Sudirman No. 45, Jakarta Selatan',
    email: 'finance@majujaya.co.id',
    phone: '021-5551234',
  },
  date: '2025-07-01',
  dueDate: '2025-07-31',
  items: [
    { description: 'Website Development', qty: 1, price: 8000000 },
    { description: 'UI/UX Design', qty: 1, price: 4000000 },
    { description: 'Monthly Hosting', qty: 3, price: 500000 },
    { description: 'Domain Registration', qty: 1, price: 150000 },
  ],
  notes: 'Payment can be made via bank transfer to BCA 1234567890 a/n PT Purdia',
  taxRate: 11,
})

const subtotal = computed(() =>
  invoice.value.items.reduce((sum, item) => sum + item.qty * item.price, 0),
)
const tax = computed(() => subtotal.value * (invoice.value.taxRate / 100))
const total = computed(() => subtotal.value + tax.value)

const statusVariant: Record<string, 'success' | 'warning' | 'danger' | 'secondary' | 'info'> = {
  paid: 'success',
  unpaid: 'warning',
  overdue: 'danger',
  draft: 'secondary',
  sent: 'info',
}

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

function markAsPaid() {
  invoice.value.status = 'paid'
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseButton variant="ghost" size="sm" @click="router.back()">
          <ArrowLeft class="w-4 h-4" />
        </BaseButton>
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-xl font-bold">{{ invoice.number }}</h1>
            <BaseBadge :variant="statusVariant[invoice.status]">{{ invoice.status }}</BaseBadge>
          </div>
          <p class="text-sm text-gray-500 mt-0.5">{{ invoice.client.name }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="ghost" size="sm" :icon="Printer">Print</BaseButton>
        <BaseButton variant="ghost" size="sm" :icon="Download">PDF</BaseButton>
        <BaseButton variant="outline" size="sm" :icon="Send">Send</BaseButton>
        <BaseButton
          variant="ghost"
          size="sm"
          :icon="Pencil"
          @click="router.push({ name: 'invoice-edit', params: { id: invoice.id } })"
          >Edit</BaseButton
        >
        <BaseButton
          v-if="invoice.status !== 'paid'"
          variant="success"
          size="sm"
          :icon="CheckCircle"
          @click="markAsPaid"
          >Mark Paid</BaseButton
        >
      </div>
    </div>

    <!-- Invoice Content -->
    <BaseCard>
      <div class="space-y-8">
        <!-- Header Info -->
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Bill To</h3>
            <p class="font-semibold text-lg">{{ invoice.client.name }}</p>
            <p class="text-sm text-gray-600 mt-1">{{ invoice.client.address }}</p>
            <p class="text-sm text-gray-600">{{ invoice.client.email }}</p>
            <p class="text-sm text-gray-600">{{ invoice.client.phone }}</p>
          </div>
          <div class="text-right">
            <h3 class="text-sm font-semibold text-gray-500 uppercase mb-2">Invoice Info</h3>
            <p class="text-sm">
              <span class="text-gray-500">Invoice #:</span> <strong>{{ invoice.number }}</strong>
            </p>
            <p class="text-sm mt-1"><span class="text-gray-500">Date:</span> {{ invoice.date }}</p>
            <p class="text-sm mt-1">
              <span class="text-gray-500">Due:</span> {{ invoice.dueDate }}
            </p>
          </div>
        </div>

        <!-- Items Table -->
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <table class="w-full text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th class="text-left px-4 py-3 font-semibold text-gray-600">Description</th>
                <th class="text-center px-4 py-3 font-semibold text-gray-600 w-20">Qty</th>
                <th class="text-right px-4 py-3 font-semibold text-gray-600 w-36">Price</th>
                <th class="text-right px-4 py-3 font-semibold text-gray-600 w-36">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in invoice.items" :key="idx" class="border-t border-gray-100">
                <td class="px-4 py-3">{{ item.description }}</td>
                <td class="px-4 py-3 text-center">{{ item.qty }}</td>
                <td class="px-4 py-3 text-right">{{ formatRp(item.price) }}</td>
                <td class="px-4 py-3 text-right font-medium">
                  {{ formatRp(item.qty * item.price) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Totals -->
        <div class="flex justify-end">
          <div class="w-72 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Subtotal</span>
              <span>{{ formatRp(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Tax ({{ invoice.taxRate }}%)</span>
              <span>{{ formatRp(tax) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{{ formatRp(total) }}</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="invoice.notes" class="border-t border-gray-100 pt-4">
          <h4 class="text-sm font-semibold text-gray-500 mb-1">Notes</h4>
          <p class="text-sm text-gray-600">{{ invoice.notes }}</p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
