<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge, BaseTable } from '@purdia/ui'
import { ArrowLeft, Edit, Printer } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'

const router = useRouter()
const route = useRoute()

const quotation = ref({
  id: Number(route.params.id),
  number: 'QT-2026-001',
  client: 'PT Teknologi Maju',
  subject: 'Enterprise License Package',
  validUntil: '2026-08-15',
  createdAt: '2026-07-01',
  status: 'sent',
  items: [
    { description: 'Enterprise License (Annual)', qty: 1, price: 100000000 },
    { description: 'Implementation & Setup', qty: 1, price: 30000000 },
    { description: 'Training (5 sessions)', qty: 5, price: 4000000 },
  ],
  notes: 'Payment terms: 50% upfront, 50% upon completion. Valid for 30 days.',
})

function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

function total() {
  return quotation.value.items.reduce((sum, i) => sum + i.qty * i.price, 0)
}

function statusVariant(s: string) {
  const map: Record<string, string> = {
    draft: 'secondary',
    sent: 'info',
    accepted: 'success',
    rejected: 'danger',
    expired: 'warning',
  }
  return (map[s] || 'secondary') as 'secondary' | 'info' | 'success' | 'danger' | 'warning'
}

const lineItemColumns: TableColumn[] = [
  { key: 'description', label: 'Description' },
  { key: 'qty', label: 'Qty', align: 'center' },
  { key: 'price', label: 'Unit Price', align: 'right' },
  { key: 'amount', label: 'Amount', align: 'right' },
]

const lineItemData = computed(() =>
  quotation.value.items.map((item) => ({
    description: item.description,
    qty: item.qty,
    price: item.price,
    amount: item.qty * item.price,
  })),
)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseButton
          variant="ghost"
          size="sm"
          :icon="ArrowLeft"
          @click="router.push('/crm/quotations')"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {{ quotation.number }}
          </h1>
          <p class="text-gray-500 mt-1">Quotation Detail</p>
        </div>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="outline" size="sm" :icon="Printer">Print</BaseButton>
        <BaseButton
          size="sm"
          :icon="Edit"
          @click="router.push(`/crm/quotations/${quotation.id}/edit`)"
          >Edit</BaseButton
        >
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Details</h3>
          </template>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <dt class="text-xs text-gray-500 mb-1">Client</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ quotation.client }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Subject</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ quotation.subject }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Created</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ quotation.createdAt }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Valid Until</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ quotation.validUntil }}
              </dd>
            </div>
          </dl>

          <!-- Line Items Table -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <BaseTable :columns="lineItemColumns" :data="lineItemData" :compact="true" :hoverable="false">
              <template #cell-price="{ value }">
                {{ formatCurrency(value as number) }}
              </template>
              <template #cell-amount="{ value }">
                <span class="font-medium text-gray-900 dark:text-gray-100">{{ formatCurrency(value as number) }}</span>
              </template>
              <template #footer>
                <tr>
                  <td
                    colspan="3"
                    class="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Total
                  </td>
                  <td class="px-4 py-2 text-right font-bold text-gray-900 dark:text-gray-100">
                    {{ formatCurrency(total()) }}
                  </td>
                </tr>
              </template>
            </BaseTable>
          </div>
        </BaseCard>

        <BaseCard v-if="quotation.notes">
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Notes & Terms</h3>
          </template>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ quotation.notes }}</p>
        </BaseCard>
      </div>

      <div>
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Status</h3>
          </template>
          <div class="flex flex-col items-center gap-3 py-4">
            <BaseBadge :variant="statusVariant(quotation.status)" size="lg">{{
              quotation.status
            }}</BaseBadge>
            <p class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ formatCurrency(total()) }}
            </p>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
