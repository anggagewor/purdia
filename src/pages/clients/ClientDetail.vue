<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseButton, BaseBadge, BaseAvatar, BaseTabs, TabPanel } from '@purdia/ui'
import {
  ArrowLeft,
  Edit,
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  FileText,
  Calendar,
  Hash,
} from '@lucide/vue'
import type { TabItem } from '@purdia/ui'

const router = useRouter()
const route = useRoute()
const activeTab = ref('overview')

const tabs: TabItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'contacts', label: 'Contacts' },
]

// Dummy data
const clientsData: Record<number, any> = {
  1: {
    id: 1,
    name: 'PT Teknologi Maju',
    type: 'company',
    email: 'info@teknomu.co.id',
    phone: '+62 21 5555 1234',
    website: 'https://teknomu.co.id',
    industry: 'Technology',
    status: 'active',
    taxId: '01.234.567.8-012.000',
    notes: 'Major client since 2024. Handles enterprise-level projects.',
    address: {
      street: 'Jl. Sudirman No. 45, Tower A Lt. 12',
      city: 'Jakarta Selatan',
      state: 'DKI Jakarta',
      zip: '12190',
      country: 'Indonesia',
    },
    contacts: [
      {
        id: 1,
        name: 'Rudi Hartono',
        email: 'rudi@teknomu.co.id',
        phone: '+62 812 1111 2222',
        position: 'CEO',
        isPrimary: true,
      },
      {
        id: 2,
        name: 'Diana Sari',
        email: 'diana@teknomu.co.id',
        phone: '+62 813 3333 4444',
        position: 'CTO',
        isPrimary: false,
      },
      {
        id: 3,
        name: 'Eko Prasetyo',
        email: 'eko@teknomu.co.id',
        phone: '+62 856 5555 6666',
        position: 'Finance Manager',
        isPrimary: false,
      },
    ],
    created: '2024-01-15',
  },
  2: {
    id: 2,
    name: 'CV Solusi Digital',
    type: 'company',
    email: 'hello@soldig.com',
    phone: '+62 22 7777 8888',
    website: 'https://soldig.com',
    industry: 'Technology',
    status: 'active',
    taxId: '02.345.678.9-023.000',
    notes: 'Medium-sized agency, reliable partner.',
    address: {
      street: 'Jl. Asia Afrika No. 100',
      city: 'Bandung',
      state: 'Jawa Barat',
      zip: '40111',
      country: 'Indonesia',
    },
    contacts: [
      {
        id: 1,
        name: 'Andi Wijaya',
        email: 'andi@soldig.com',
        phone: '+62 817 1234 5678',
        position: 'Director',
        isPrimary: true,
      },
      {
        id: 2,
        name: 'Maya Putri',
        email: 'maya@soldig.com',
        phone: '+62 821 8765 4321',
        position: 'Project Manager',
        isPrimary: false,
      },
    ],
    created: '2024-02-20',
  },
  3: {
    id: 3,
    name: 'Ahmad Fauzi',
    type: 'individual',
    email: 'ahmad.fauzi@gmail.com',
    phone: '+62 812 3456 7890',
    website: '',
    industry: '',
    status: 'active',
    taxId: '',
    notes: 'Freelance consultant, specializes in fintech.',
    address: {
      street: 'Jl. Diponegoro No. 55',
      city: 'Surabaya',
      state: 'Jawa Timur',
      zip: '60241',
      country: 'Indonesia',
    },
    contacts: [
      {
        id: 1,
        name: 'Ahmad Fauzi',
        email: 'ahmad.fauzi@gmail.com',
        phone: '+62 812 3456 7890',
        position: 'Owner',
        isPrimary: true,
      },
    ],
    created: '2024-03-05',
  },
}

const clientId = Number(route.params.id)
const client = clientsData[clientId] || clientsData[1]
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <BaseButton variant="ghost" size="sm" :icon="ArrowLeft" @click="router.push('/clients')" />
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center"
            :class="
              client.type === 'company'
                ? 'bg-primary-50 text-primary-500'
                : 'bg-emerald-50 text-emerald-500'
            "
          >
            <Building2 v-if="client.type === 'company'" class="w-6 h-6" />
            <User v-else class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ client.name }}</h1>
            <div class="flex items-center gap-2 mt-0.5">
              <BaseBadge
                :variant="client.type === 'company' ? 'primary' : 'success'"
                size="sm"
                :pill="false"
                >{{ client.type === 'company' ? 'Company' : 'Individual' }}</BaseBadge
              >
              <BaseBadge
                :variant="client.status === 'active' ? 'success' : 'secondary'"
                :dot="true"
                size="sm"
                >{{ client.status }}</BaseBadge
              >
            </div>
          </div>
        </div>
      </div>
      <BaseButton
        variant="outline"
        size="sm"
        :icon="Edit"
        @click="router.push(`/clients/${clientId}/edit`)"
        >Edit</BaseButton
      >
    </div>

    <BaseCard>
      <BaseTabs v-model="activeTab" :tabs="tabs" variant="underline" size="sm">
        <!-- Overview -->
        <TabPanel name="overview">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Info -->
            <div class="space-y-4">
              <h5 class="font-semibold text-gray-900 text-sm">Contact Information</h5>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <Mail class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700">{{ client.email }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <Phone class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700">{{ client.phone }}</span>
                </div>
                <div v-if="client.website" class="flex items-center gap-3">
                  <Globe class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-primary-600">{{ client.website }}</span>
                </div>
                <div v-if="client.industry" class="flex items-center gap-3">
                  <Building2 class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700">{{ client.industry }}</span>
                </div>
                <div v-if="client.taxId" class="flex items-center gap-3">
                  <Hash class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700 font-mono">{{ client.taxId }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <Calendar class="w-4 h-4 text-gray-400" />
                  <span class="text-sm text-gray-700">Created {{ client.created }}</span>
                </div>
              </div>
            </div>

            <!-- Address -->
            <div class="space-y-4">
              <h5 class="font-semibold text-gray-900 text-sm">Address</h5>
              <div class="flex items-start gap-3">
                <MapPin class="w-4 h-4 text-gray-400 mt-0.5" />
                <div class="text-sm text-gray-700">
                  <p>{{ client.address.street }}</p>
                  <p>
                    {{ client.address.city }}, {{ client.address.state }} {{ client.address.zip }}
                  </p>
                  <p>{{ client.address.country }}</p>
                </div>
              </div>

              <div v-if="client.notes" class="pt-4">
                <h5 class="font-semibold text-gray-900 text-sm mb-2">Notes</h5>
                <div class="flex items-start gap-3">
                  <FileText class="w-4 h-4 text-gray-400 mt-0.5" />
                  <p class="text-sm text-gray-600">{{ client.notes }}</p>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <!-- Contacts -->
        <TabPanel name="contacts">
          <div class="space-y-3">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm text-gray-500">
                {{ client.contacts.length }} contact{{ client.contacts.length !== 1 ? 's' : '' }}
              </p>
            </div>

            <div
              v-for="contact in client.contacts"
              :key="contact.id"
              class="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
            >
              <BaseAvatar :name="contact.name" size="md" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="font-medium text-sm text-gray-900">{{ contact.name }}</span>
                  <BaseBadge v-if="contact.isPrimary" variant="primary" size="sm"
                    >Primary</BaseBadge
                  >
                </div>
                <p class="text-xs text-gray-500">{{ contact.position }}</p>
                <div class="flex items-center gap-4 mt-1">
                  <span class="text-xs text-gray-500 flex items-center gap-1">
                    <Mail class="w-3 h-3" /> {{ contact.email }}
                  </span>
                  <span class="text-xs text-gray-500 flex items-center gap-1">
                    <Phone class="w-3 h-3" /> {{ contact.phone }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </BaseTabs>
    </BaseCard>
  </div>
</template>
