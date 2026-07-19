<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge } from '@purdia/ui'
import { ArrowLeft, Edit, Mail, Phone, Building2, Globe, MapPin, Users } from '@lucide/vue'

const router = useRouter()
const route = useRoute()

const company = ref({
  id: Number(route.params.id),
  name: 'PT Teknologi Maju',
  industry: 'Technology',
  email: 'info@teknomu.co.id',
  phone: '+62 21 5555 1234',
  website: 'https://teknomu.co.id',
  city: 'Jakarta',
  address: 'Jl. Sudirman No. 123, Jakarta Selatan',
  employees: 150,
  revenue: 'Rp 25B',
  status: 'active',
  notes: 'Key account - enterprise client since 2023.',
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
          @click="router.push('/crm/companies')"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ company.name }}</h1>
          <p class="text-gray-500 mt-1">Company Detail</p>
        </div>
      </div>
      <BaseButton size="sm" :icon="Edit" @click="router.push(`/crm/companies/${company.id}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Company Information</h3>
          </template>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs text-gray-500 mb-1">Company Name</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Building2 class="w-3.5 h-3.5 text-gray-400" /> {{ company.name }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Industry</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ company.industry }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Email</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Mail class="w-3.5 h-3.5 text-gray-400" /> {{ company.email }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Phone</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Phone class="w-3.5 h-3.5 text-gray-400" /> {{ company.phone }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Website</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Globe class="w-3.5 h-3.5 text-gray-400" /> {{ company.website }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Location</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <MapPin class="w-3.5 h-3.5 text-gray-400" /> {{ company.city }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Employees</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Users class="w-3.5 h-3.5 text-gray-400" /> {{ company.employees }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Annual Revenue</dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ company.revenue }}
              </dd>
            </div>
          </dl>
        </BaseCard>

        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Notes</h3>
          </template>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ company.notes }}</p>
        </BaseCard>
      </div>

      <div>
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Status</h3>
          </template>
          <div class="flex flex-col items-center gap-3 py-4">
            <BaseBadge
              :variant="company.status === 'active' ? 'success' : 'secondary'"
              size="lg"
              :dot="true"
              >{{ company.status }}</BaseBadge
            >
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
