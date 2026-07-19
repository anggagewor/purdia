<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge, BaseAvatar } from '@purdia/ui'
import { ArrowLeft, Edit, Mail, Phone, Building2, Briefcase } from '@lucide/vue'

const router = useRouter()
const route = useRoute()

const contact = ref({
  id: Number(route.params.id),
  name: 'Andi Pratama',
  company: 'PT Teknologi Maju',
  position: 'CTO',
  email: 'andi@teknomu.co.id',
  phone: '+62 812 1111 2222',
  status: 'active',
  notes: 'Key decision maker for tech purchases.',
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
          @click="router.push('/crm/contacts')"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ contact.name }}</h1>
          <p class="text-gray-500 mt-1">Contact Detail</p>
        </div>
      </div>
      <BaseButton size="sm" :icon="Edit" @click="router.push(`/crm/contacts/${contact.id}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Contact Information</h3>
          </template>
          <div class="flex items-center gap-4 mb-6">
            <BaseAvatar :name="contact.name" size="lg" />
            <div>
              <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ contact.name }}
              </h4>
              <p class="text-sm text-gray-500">{{ contact.position }} at {{ contact.company }}</p>
            </div>
          </div>
          <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt class="text-xs text-gray-500 mb-1">Email</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Mail class="w-3.5 h-3.5 text-gray-400" /> {{ contact.email }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Phone</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Phone class="w-3.5 h-3.5 text-gray-400" /> {{ contact.phone }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Company</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Building2 class="w-3.5 h-3.5 text-gray-400" /> {{ contact.company }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-gray-500 mb-1">Position</dt>
              <dd
                class="text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-1"
              >
                <Briefcase class="w-3.5 h-3.5 text-gray-400" /> {{ contact.position }}
              </dd>
            </div>
          </dl>
        </BaseCard>
      </div>

      <div class="space-y-6">
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Status</h3>
          </template>
          <div class="flex flex-col items-center gap-3 py-4">
            <BaseBadge
              :variant="contact.status === 'active' ? 'success' : 'secondary'"
              size="lg"
              :dot="true"
              >{{ contact.status }}</BaseBadge
            >
          </div>
        </BaseCard>
        <BaseCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">Notes</h3>
          </template>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ contact.notes }}</p>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
