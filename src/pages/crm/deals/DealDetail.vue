<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge, BaseProgress } from '@purdia/ui'
import { ArrowLeft, Edit, Building2, DollarSign, Calendar, User } from '@lucide/vue'

const router = useRouter()
const route = useRoute()

const deal = ref({
  id: Number(route.params.id),
  name: 'Enterprise License',
  company: 'PT Teknologi Maju',
  value: 'Rp 150.000.000',
  stage: 'negotiation',
  probability: 75,
  closeDate: '2026-08-15',
  owner: 'Andi Pratama',
  notes: 'Client interested in annual license. Need to finalize pricing.',
  createdAt: '2026-06-01',
})

function stageVariant(stage: string) {
  const map: Record<string, string> = {
    qualification: 'warning',
    proposal: 'info',
    negotiation: 'primary',
    'closed-won': 'success',
    'closed-lost': 'danger',
  }
  return (map[stage] || 'secondary') as
    | 'warning'
    | 'info'
    | 'primary'
    | 'success'
    | 'danger'
    | 'secondary'
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
          @click="router.push('/crm/deals')"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ deal.name }}</h1>
          <p class="text-gray-500 mt-1">Deal Detail</p>
        </div>
      </div>
      <BaseButton size="sm" :icon="Edit" @click="router.push(`/crm/deals/${deal.id}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Deal Information</h3>
          </template>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs text-gray-500 mb-1">Deal Name</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ deal.name }}</dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Company</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Building2 class="w-3.5 h-3.5 text-gray-400" /> {{ deal.company }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Value</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <DollarSign class="w-3.5 h-3.5 text-gray-400" /> {{ deal.value }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Close Date</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Calendar class="w-3.5 h-3.5 text-gray-400" /> {{ deal.closeDate }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Owner</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <User class="w-3.5 h-3.5 text-gray-400" /> {{ deal.owner }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Created</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ deal.createdAt }}
              </dd>
            </div>
          </dl>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Notes</h3>
          </template>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ deal.notes }}</p>
        </BaseCard>
      </div>

      <div class="space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Stage</h3>
          </template>
          <div class="flex flex-col items-center gap-3 py-4">
            <BaseBadge :variant="stageVariant(deal.stage)" size="lg">{{
              deal.stage.replace('-', ' ')
            }}</BaseBadge>
          </div>
        </BaseCard>
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Probability</h3>
          </template>
          <div class="py-4">
            <BaseProgress :value="deal.probability" :max="100" size="md" :show-label="true" />
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
