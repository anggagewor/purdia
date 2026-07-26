<script setup lang="ts">
import { ref } from 'vue'
import { Printer, Download, Eye } from '@lucide/vue'
import { BaseButton, BaseCard } from '@purdia/ui'

const invoiceData = {
  number: 'INV-2026-0042',
  date: 'July 26, 2026',
  dueDate: 'August 26, 2026',
  from: {
    name: 'Purdia Inc.',
    address: 'Jl. Sudirman No. 123',
    city: 'Jakarta 12190, Indonesia',
    email: 'billing@purdia.dev',
    phone: '+62 21 555 0123',
  },
  to: {
    name: 'TechCorp Solutions',
    address: '456 Innovation Drive',
    city: 'Singapore 049712',
    email: 'accounts@techcorp.sg',
    phone: '+65 6555 0456',
  },
  items: [
    { description: 'UI/UX Design — Dashboard Redesign', qty: 1, rate: 3500, amount: 3500 },
    { description: 'Frontend Development — 40hrs @ $75/hr', qty: 40, rate: 75, amount: 3000 },
    { description: 'API Integration & Testing', qty: 1, rate: 1500, amount: 1500 },
    { description: 'Deployment & DevOps Setup', qty: 1, rate: 800, amount: 800 },
  ],
  subtotal: 8800,
  tax: 880,
  total: 9680,
  notes: 'Payment is due within 30 days. Please include invoice number in your transfer reference.',
  paymentMethod: 'Bank Transfer — BCA 1234567890 (Purdia Inc.)',
}

const showPreview = ref(false)

function printInvoice() {
  window.print()
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page header (hidden in print) -->
    <div class="print:hidden">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Print Layout</h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">
        Invoice and receipt templates with clean print CSS. Click print to see the optimized layout.
      </p>
    </div>

    <!-- Actions (hidden in print) -->
    <div class="flex items-center gap-3 print:hidden">
      <BaseButton variant="primary" @click="printInvoice">
        <template #icon-left><Printer class="w-4 h-4" /></template>
        Print Invoice
      </BaseButton>
      <BaseButton variant="outline">
        <template #icon-left><Download class="w-4 h-4" /></template>
        Download PDF
      </BaseButton>
    </div>

    <!-- Invoice -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 md:p-12 print:border-none print:shadow-none print:p-0 print:rounded-none print:bg-white max-w-4xl"
    >
      <!-- Header -->
      <div class="flex items-start justify-between mb-10">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <div
              class="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center print:bg-black"
            >
              <span class="text-sm font-bold text-white">P</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white print:text-black"
              >Purdia</span
            >
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">
            {{ invoiceData.from.address }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">
            {{ invoiceData.from.city }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">
            {{ invoiceData.from.email }}
          </p>
        </div>
        <div class="text-right">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white print:text-black">INVOICE</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600 mt-1">
            {{ invoiceData.number }}
          </p>
        </div>
      </div>

      <!-- Bill To / Dates -->
      <div class="grid grid-cols-2 gap-8 mb-10">
        <div>
          <p
            class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2 print:text-gray-500"
          >
            Bill To
          </p>
          <p class="text-sm font-medium text-gray-900 dark:text-white print:text-black">
            {{ invoiceData.to.name }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">
            {{ invoiceData.to.address }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">
            {{ invoiceData.to.city }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600">
            {{ invoiceData.to.email }}
          </p>
        </div>
        <div class="text-right">
          <div class="space-y-1.5">
            <div class="flex items-center justify-end gap-4">
              <span
                class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase print:text-gray-500"
                >Issue Date</span
              >
              <span class="text-sm text-gray-900 dark:text-white print:text-black">{{
                invoiceData.date
              }}</span>
            </div>
            <div class="flex items-center justify-end gap-4">
              <span
                class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase print:text-gray-500"
                >Due Date</span
              >
              <span class="text-sm text-gray-900 dark:text-white print:text-black">{{
                invoiceData.dueDate
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Items table -->
      <div class="mb-8">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-200 dark:border-gray-700 print:border-gray-300">
              <th
                class="text-left py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase print:text-gray-600"
              >
                Description
              </th>
              <th
                class="text-center py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase print:text-gray-600 w-20"
              >
                Qty
              </th>
              <th
                class="text-right py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase print:text-gray-600 w-28"
              >
                Rate
              </th>
              <th
                class="text-right py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase print:text-gray-600 w-28"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in invoiceData.items"
              :key="index"
              class="border-b border-gray-100 dark:border-gray-700/50 print:border-gray-200"
            >
              <td class="py-3 text-sm text-gray-900 dark:text-white print:text-black">
                {{ item.description }}
              </td>
              <td
                class="py-3 text-sm text-gray-600 dark:text-gray-400 text-center print:text-gray-700"
              >
                {{ item.qty }}
              </td>
              <td
                class="py-3 text-sm text-gray-600 dark:text-gray-400 text-right print:text-gray-700"
              >
                ${{ item.rate.toLocaleString() }}
              </td>
              <td
                class="py-3 text-sm font-medium text-gray-900 dark:text-white text-right print:text-black"
              >
                ${{ item.amount.toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div class="flex justify-end mb-10">
        <div class="w-64">
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600"
              >Subtotal</span
            >
            <span class="text-sm text-gray-900 dark:text-white print:text-black"
              >${{ invoiceData.subtotal.toLocaleString() }}</span
            >
          </div>
          <div class="flex items-center justify-between py-2">
            <span class="text-sm text-gray-500 dark:text-gray-400 print:text-gray-600"
              >Tax (10%)</span
            >
            <span class="text-sm text-gray-900 dark:text-white print:text-black"
              >${{ invoiceData.tax.toLocaleString() }}</span
            >
          </div>
          <div
            class="flex items-center justify-between py-3 border-t-2 border-gray-200 dark:border-gray-700 print:border-gray-300 mt-2"
          >
            <span class="text-base font-semibold text-gray-900 dark:text-white print:text-black"
              >Total</span
            >
            <span class="text-base font-bold text-gray-900 dark:text-white print:text-black"
              >${{ invoiceData.total.toLocaleString() }}</span
            >
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="border-t border-gray-200 dark:border-gray-700 print:border-gray-300 pt-6 space-y-3"
      >
        <div>
          <p
            class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1 print:text-gray-500"
          >
            Payment Method
          </p>
          <p class="text-sm text-gray-700 dark:text-gray-300 print:text-gray-700">
            {{ invoiceData.paymentMethod }}
          </p>
        </div>
        <div>
          <p
            class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-1 print:text-gray-500"
          >
            Notes
          </p>
          <p class="text-sm text-gray-700 dark:text-gray-300 print:text-gray-700">
            {{ invoiceData.notes }}
          </p>
        </div>
      </div>

      <!-- Thank you -->
      <div class="mt-10 text-center">
        <p class="text-sm text-gray-400 dark:text-gray-500 print:text-gray-500">
          Thank you for your business!
        </p>
      </div>
    </div>
  </div>
</template>

<style>
@media print {
  /* Hide everything except the invoice */
  body * {
    visibility: hidden;
  }

  /* Show only the invoice content */
  .print\\:border-none,
  .print\\:border-none * {
    visibility: visible;
  }

  /* Reset page margins */
  @page {
    margin: 1.5cm;
    size: A4;
  }

  /* Ensure proper colors in print */
  .print\\:text-black {
    color: #000 !important;
  }

  .print\\:text-gray-600 {
    color: #4b5563 !important;
  }

  .print\\:text-gray-500 {
    color: #6b7280 !important;
  }

  .print\\:text-gray-700 {
    color: #374151 !important;
  }

  .print\\:bg-black {
    background-color: #000 !important;
  }
}
</style>
