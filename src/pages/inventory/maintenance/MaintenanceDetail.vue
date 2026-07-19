<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import type { BadgeVariant } from '@purdia/ui'
import {
  ArrowLeft,
  Edit,
  Wrench,
  Calendar,
  User,
  Clock,
  AlertTriangle,
  FileText,
} from '@lucide/vue'

const router = useRouter()
const route = useRoute()
const maintenanceId = Number(route.params.id)

const data: Record<number, any> = {
  1: {
    id: 1,
    ticketNo: 'MNT-2026-001',
    asset: 'Forklift #3',
    type: 'preventive',
    priority: 'medium',
    assignedTo: 'Agus Riyadi',
    scheduledDate: '2026-07-15',
    estimatedDuration: '3 hours',
    status: 'scheduled',
    description:
      'Scheduled preventive maintenance: oil change, brake inspection, hydraulic system check.',
    history: [
      { date: '2026-07-10', action: 'Created', by: 'Admin' },
      { date: '2026-07-10', action: 'Assigned to Agus Riyadi', by: 'Admin' },
    ],
    created: '2026-07-10',
  },
  2: {
    id: 2,
    ticketNo: 'MNT-2026-002',
    asset: 'Conveyor Belt A',
    type: 'corrective',
    priority: 'high',
    assignedTo: 'Bambang Surya',
    scheduledDate: '2026-07-12',
    estimatedDuration: '5 hours',
    status: 'in_progress',
    description:
      'Belt showing signs of wear. Unusual noise during operation. Needs immediate replacement of belt segment.',
    history: [
      { date: '2026-07-09', action: 'Created', by: 'Warehouse Manager' },
      { date: '2026-07-09', action: 'Assigned to Bambang Surya', by: 'Admin' },
      { date: '2026-07-12', action: 'Work started', by: 'Bambang Surya' },
    ],
    created: '2026-07-09',
  },
}

const item = data[maintenanceId] || data[1]

function getPriorityVariant(priority: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    low: 'secondary',
    medium: 'primary',
    high: 'warning',
    critical: 'danger',
  }
  return map[priority] || 'secondary'
}

function getStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    scheduled: 'secondary',
    in_progress: 'primary',
    completed: 'success',
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
          @click="router.push('/inventory/maintenance')"
        />
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center"
          >
            <Wrench class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ item.ticketNo }}</h1>
            <div class="flex items-center gap-2 mt-0.5">
              <BaseBadge :variant="getStatusVariant(item.status)" size="sm" :pill="false">{{
                item.status.replace('_', ' ')
              }}</BaseBadge>
              <BaseBadge :variant="getPriorityVariant(item.priority)" :dot="true" size="sm">{{
                item.priority
              }}</BaseBadge>
            </div>
          </div>
        </div>
      </div>
      <BaseButton
        variant="outline"
        size="sm"
        :icon="Edit"
        @click="router.push(`/inventory/maintenance/${maintenanceId}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseCard>
        <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-4">Details</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <Wrench class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-700 dark:text-gray-300"
              >Asset: <strong>{{ item.asset }}</strong></span
            >
          </div>
          <div class="flex items-center gap-3">
            <AlertTriangle class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Type: {{ item.type }}</span>
          </div>
          <div class="flex items-center gap-3">
            <User class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-700 dark:text-gray-300"
              >Assigned: {{ item.assignedTo }}</span
            >
          </div>
          <div class="flex items-center gap-3">
            <Calendar class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-700 dark:text-gray-300"
              >Scheduled: {{ item.scheduledDate }}</span
            >
          </div>
          <div class="flex items-center gap-3">
            <Clock class="w-4 h-4 text-gray-400" />
            <span class="text-sm text-gray-700 dark:text-gray-300"
              >Est. Duration: {{ item.estimatedDuration }}</span
            >
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div class="flex items-start gap-3">
            <FileText class="w-4 h-4 text-gray-400 mt-0.5" />
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <h3 class="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-4">Activity Log</h3>
        <div class="space-y-3">
          <div
            v-for="(log, idx) in item.history"
            :key="idx"
            class="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 dark:border-gray-700"
          >
            <div class="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />
            <div>
              <p class="text-sm text-gray-900 dark:text-gray-100">{{ log.action }}</p>
              <p class="text-xs text-gray-500">{{ log.date }} · {{ log.by }}</p>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
