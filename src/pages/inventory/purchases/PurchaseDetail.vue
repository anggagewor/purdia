<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import { ArrowLeft, Edit, ShoppingCart, Calendar, MapPin, User, FileText } from '@lucide/vue'

import type { BadgeVariant } from '@purdia/ui'

const router = useRouter()
const route = useRoute()
const purchaseId = Number(route.params.id)

const purchaseData: Record<number, any> = {
  1: {
    id: 1,
    poNumber: 'PO-2026-0042',
    supplier: 'PT Tech Indo Distributor',
    date: '2026-07-12',
    expectedDate: '2026-07-18',
    warehouse: 'Gudang Utama',
    status: 'received',
    note: 'Urgent order for Q3 stock replenishment.',
    items: [
      {
        product: 'Laptop Dell XPS 15',
        qty: 20,
        price: 'Rp 22.000.000',
        subtotal: 'Rp 440.000.000',
      },
      {
        product: 'Mouse Logitech MX Master 3',
        qty: 50,
        price: 'Rp 1.200.000',
        subtotal: 'Rp 60.000.000',
      },
      {
        product: 'USB-C Hub Anker 7-in-1',
        qty: 100,
        price: 'Rp 500.000',
        subtotal: 'Rp 50.000.000',
      },
    ],
    total: 'Rp 550.000.000',
    createdBy: 'Admin',
  },
  2: {
    id: 2,
    poNumber: 'PO-2026-0041',
    supplier: 'CV Megah Elektronik',
    date: '2026-07-10',
    expectedDate: '2026-07-15',
    warehouse: 'Gudang Bandung',
    status: 'received',
    note: 'Regular monthly restock.',
    items: [
      {
        product: 'Keyboard Mechanical K2 Pro',
        qty: 100,
        price: 'Rp 1.800.000',
        subtotal: 'Rp 180.000.000',
      },
      {
        product: 'Monitor LG UltraWide 34"',
        qty: 15,
        price: 'Rp 7.000.000',
        subtotal: 'Rp 105.000.000',
      },
    ],
    total: 'Rp 285.000.000',
    createdBy: 'Admin',
  },
}

const purchase = purchaseData[purchaseId] || purchaseData[1]

function getStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    pending: 'warning',
    confirmed: 'primary',
    shipped: 'info',
    received: 'success',
    cancelled: 'danger',
  }
  return map[status] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseButton
          variant="ghost"
          size="sm"
          :icon="ArrowLeft"
          @click="router.push('/inventory/purchases')"
        />
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center"
          >
            <ShoppingCart class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ purchase.poNumber }}
            </h1>
            <div class="flex items-center gap-2 mt-0.5">
              <BaseBadge :variant="getStatusVariant(purchase.status)" size="sm" :pill="false">{{
                purchase.status
              }}</BaseBadge>
            </div>
          </div>
        </div>
      </div>
      <BaseButton
        variant="outline"
        size="sm"
        :icon="Edit"
        @click="router.push(`/inventory/purchases/${purchaseId}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BaseCard>
        <div class="flex items-center gap-3">
          <User class="w-4 h-4 text-gray-400" />
          <div>
            <p class="text-xs text-gray-500">Supplier</p>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ purchase.supplier }}
            </p>
          </div>
        </div>
      </BaseCard>
      <BaseCard>
        <div class="flex items-center gap-3">
          <Calendar class="w-4 h-4 text-gray-400" />
          <div>
            <p class="text-xs text-gray-500">Order Date</p>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ purchase.date }}</p>
          </div>
        </div>
      </BaseCard>
      <BaseCard>
        <div class="flex items-center gap-3">
          <MapPin class="w-4 h-4 text-gray-400" />
          <div>
            <p class="text-xs text-gray-500">Warehouse</p>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ purchase.warehouse }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <BaseCard>
      <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Order Items</h3>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-2 font-medium text-gray-500">Product</th>
            <th class="text-center py-2 font-medium text-gray-500">Qty</th>
            <th class="text-right py-2 font-medium text-gray-500">Unit Price</th>
            <th class="text-right py-2 font-medium text-gray-500">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, idx) in purchase.items"
            :key="idx"
            class="border-b border-gray-100 dark:border-gray-700"
          >
            <td class="py-3 text-gray-900 dark:text-gray-100">{{ item.product }}</td>
            <td class="py-3 text-center text-gray-700 dark:text-gray-300">{{ item.qty }}</td>
            <td class="py-3 text-right text-gray-700 dark:text-gray-300">{{ item.price }}</td>
            <td class="py-3 text-right font-medium text-gray-900 dark:text-gray-100">
              {{ item.subtotal }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="py-3 text-right font-semibold text-gray-900 dark:text-gray-100">
              Total
            </td>
            <td class="py-3 text-right font-bold text-gray-900 dark:text-gray-100">
              {{ purchase.total }}
            </td>
          </tr>
        </tfoot>
      </table>
    </BaseCard>

    <BaseCard v-if="purchase.note">
      <div class="flex items-start gap-3">
        <FileText class="w-4 h-4 text-gray-400 mt-0.5" />
        <div>
          <p class="text-xs text-gray-500 mb-1">Notes</p>
          <p class="text-sm text-gray-700 dark:text-gray-300">{{ purchase.note }}</p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
