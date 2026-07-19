<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import type { BadgeVariant } from '@purdia/ui'
import {
  ArrowLeft,
  Edit,
  ShieldCheck,
  Calendar,
  User,
  Package,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
} from '@lucide/vue'

const router = useRouter()
const route = useRoute()
const qualityId = Number(route.params.id)

const data: Record<number, any> = {
  1: {
    id: 1,
    inspectionNo: 'QC-2026-0051',
    product: 'Laptop Dell XPS 15',
    batch: 'BTH-2026-042',
    inspector: 'Siti Aminah',
    date: '2026-07-12',
    sampleSize: 10,
    result: 'pass',
    status: 'completed',
    note: 'All units passed inspection. No physical damage or functional issues detected.',
    checklist: [
      { criteria: 'Physical Appearance', standard: 'No scratches or dents', result: 'pass' },
      { criteria: 'Screen Display', standard: 'No dead pixels', result: 'pass' },
      { criteria: 'Keyboard Function', standard: 'All keys responsive', result: 'pass' },
      { criteria: 'Port Connectivity', standard: 'All ports working', result: 'pass' },
      { criteria: 'Battery Health', standard: '> 95% capacity', result: 'pass' },
    ],
    passRate: '100%',
    created: '2026-07-12',
  },
  3: {
    id: 3,
    inspectionNo: 'QC-2026-0049',
    product: 'Keyboard Mechanical K2 Pro',
    batch: 'BTH-2026-040',
    inspector: 'Siti Aminah',
    date: '2026-07-10',
    sampleSize: 20,
    result: 'fail',
    status: 'completed',
    note: '3 out of 20 units had non-responsive keys. Returned to supplier for replacement.',
    checklist: [
      { criteria: 'Key Response', standard: 'All keys register on press', result: 'fail' },
      { criteria: 'LED Backlighting', standard: 'All LEDs functional', result: 'pass' },
      { criteria: 'USB Connection', standard: 'Recognized within 2 seconds', result: 'pass' },
      { criteria: 'Physical Build', standard: 'No loose parts', result: 'pass' },
    ],
    passRate: '85%',
    created: '2026-07-10',
  },
}

const item = data[qualityId] || data[1]

function getResultVariant(result: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    pass: 'success',
    fail: 'danger',
    conditional: 'warning',
    pending: 'secondary',
  }
  return map[result] || 'secondary'
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
          @click="router.push('/inventory/quality')"
        />
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center"
          >
            <ShieldCheck class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {{ item.inspectionNo }}
            </h1>
            <div class="flex items-center gap-2 mt-0.5">
              <BaseBadge :variant="getResultVariant(item.result)" :dot="true" size="sm">{{
                item.result
              }}</BaseBadge>
              <BaseBadge variant="secondary" size="sm" :pill="false">{{ item.status }}</BaseBadge>
            </div>
          </div>
        </div>
      </div>
      <BaseButton
        variant="outline"
        size="sm"
        :icon="Edit"
        @click="router.push(`/inventory/quality/${qualityId}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <BaseCard>
        <div class="flex items-center gap-3">
          <Package class="w-4 h-4 text-gray-400" />
          <div>
            <p class="text-xs text-gray-500">Product</p>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.product }}</p>
          </div>
        </div>
      </BaseCard>
      <BaseCard>
        <div class="flex items-center gap-3">
          <Calendar class="w-4 h-4 text-gray-400" />
          <div>
            <p class="text-xs text-gray-500">Date</p>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.date }}</p>
          </div>
        </div>
      </BaseCard>
      <BaseCard>
        <div class="flex items-center gap-3">
          <User class="w-4 h-4 text-gray-400" />
          <div>
            <p class="text-xs text-gray-500">Inspector</p>
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ item.inspector }}</p>
          </div>
        </div>
      </BaseCard>
      <BaseCard>
        <div class="flex items-center gap-3">
          <ShieldCheck class="w-4 h-4 text-gray-400" />
          <div>
            <p class="text-xs text-gray-500">Pass Rate</p>
            <p
              class="text-sm font-bold"
              :class="item.passRate === '100%' ? 'text-green-600' : 'text-amber-600'"
            >
              {{ item.passRate }}
            </p>
          </div>
        </div>
      </BaseCard>
    </div>

    <BaseCard>
      <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Inspection Checklist</h3>
      <div class="space-y-2">
        <div class="grid grid-cols-12 gap-3 pb-2 border-b border-gray-200 dark:border-gray-700">
          <div class="col-span-4 text-xs font-medium text-gray-500">Criteria</div>
          <div class="col-span-5 text-xs font-medium text-gray-500">Standard</div>
          <div class="col-span-3 text-xs font-medium text-gray-500 text-center">Result</div>
        </div>
        <div
          v-for="(check, idx) in item.checklist"
          :key="idx"
          class="grid grid-cols-12 gap-3 py-2 border-b border-gray-50 last:border-0 dark:border-gray-700"
        >
          <div class="col-span-4 text-sm text-gray-900 dark:text-gray-100">
            {{ check.criteria }}
          </div>
          <div class="col-span-5 text-sm text-gray-600 dark:text-gray-400">
            {{ check.standard }}
          </div>
          <div class="col-span-3 flex justify-center">
            <span
              class="flex items-center gap-1 text-sm"
              :class="
                check.result === 'pass'
                  ? 'text-green-600'
                  : check.result === 'fail'
                    ? 'text-red-600'
                    : 'text-amber-600'
              "
            >
              <CheckCircle v-if="check.result === 'pass'" class="w-4 h-4" />
              <XCircle v-else-if="check.result === 'fail'" class="w-4 h-4" />
              <AlertCircle v-else class="w-4 h-4" />
              {{ check.result }}
            </span>
          </div>
        </div>
      </div>
    </BaseCard>

    <BaseCard v-if="item.note">
      <div class="flex items-start gap-3">
        <FileText class="w-4 h-4 text-gray-400 mt-0.5" />
        <div>
          <p class="text-xs text-gray-500 mb-1">Notes</p>
          <p class="text-sm text-gray-700 dark:text-gray-300">{{ item.note }}</p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
