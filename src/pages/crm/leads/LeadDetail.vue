<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import { ArrowLeft, Edit, Mail, Phone, Building2, Globe, Calendar } from '@lucide/vue'

const router = useRouter()
const route = useRoute()

const lead = ref({
  id: Number(route.params.id),
  name: 'Andi Pratama',
  company: 'PT Maju Jaya',
  email: 'andi@majujaya.co.id',
  phone: '+62 812 1111 2222',
  source: 'Website',
  status: 'new',
  createdAt: '2026-06-15',
  notes: 'Interested in our enterprise plan. Follow up next week.',
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseButton
          variant="ghost"
          size="sm"
          :icon="ArrowLeft"
          @click="router.push('/crm/leads')"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ lead.name }}</h1>
          <p class="text-gray-500 mt-1">Lead Detail</p>
        </div>
      </div>
      <BaseButton size="sm" :icon="Edit" @click="router.push(`/crm/leads/${lead.id}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Information</h3>
          </template>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs text-gray-500 mb-1">Full Name</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ lead.name }}</dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Company</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Building2 class="w-3.5 h-3.5 text-gray-400" /> {{ lead.company }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Email</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Mail class="w-3.5 h-3.5 text-gray-400" /> {{ lead.email }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Phone</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Phone class="w-3.5 h-3.5 text-gray-400" /> {{ lead.phone }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Source</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Globe class="w-3.5 h-3.5 text-gray-400" /> {{ lead.source }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Created</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Calendar class="w-3.5 h-3.5 text-gray-400" /> {{ lead.createdAt }}
              </dd>
            </div>
          </dl>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Notes</h3>
          </template>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ lead.notes }}</p>
        </BaseCard>
      </div>

      <div>
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Status</h3>
          </template>
          <div class="flex flex-col items-center gap-3 py-4">
            <BaseBadge variant="info" size="lg" :dot="true">{{ lead.status }}</BaseBadge>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
