<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect, BaseTabs, TabPanel, BaseTextarea } from '@purdia/ui'
import { ArrowLeft, Plus, Trash2 } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'
import type { TabItem } from '@purdia/ui'

const router = useRouter()
const route = useRoute()
const activeTab = ref('general')

const tabs: TabItem[] = [
  { key: 'general', label: 'General Info' },
  { key: 'address', label: 'Address' },
  { key: 'contacts', label: 'Contacts' },
]

const typeOptions: SelectOption[] = [
  { label: 'Company', value: 'company' },
  { label: 'Individual', value: 'individual' },
]

const statusOptions: SelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const industryOptions: SelectOption[] = [
  { label: 'Technology', value: 'technology' },
  { label: 'Finance', value: 'finance' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Education', value: 'education' },
  { label: 'Manufacturing', value: 'manufacturing' },
  { label: 'Retail', value: 'retail' },
  { label: 'Other', value: 'other' },
]

// Dummy pre-filled data
const clientsData: Record<number, any> = {
  1: {
    type: 'company',
    name: 'PT Teknologi Maju',
    email: 'info@teknomu.co.id',
    phone: '+62 21 5555 1234',
    website: 'https://teknomu.co.id',
    industry: 'technology',
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
  },
  3: {
    type: 'individual',
    name: 'Ahmad Fauzi',
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
  },
}

const clientId = Number(route.params.id)
const data = clientsData[clientId] || clientsData[1]

// Form
const clientType = ref<string | number>(data.type)
const clientName = ref(data.name)
const clientEmail = ref(data.email)
const clientPhone = ref(data.phone)
const clientWebsite = ref(data.website)
const clientIndustry = ref<string | number>(data.industry)
const clientStatus = ref<string | number>(data.status)
const clientTaxId = ref(data.taxId)
const clientNotes = ref(data.notes)

// Address
const addressStreet = ref(data.address.street)
const addressCity = ref(data.address.city)
const addressState = ref(data.address.state)
const addressZip = ref(data.address.zip)
const addressCountry = ref(data.address.country)

// Contacts
interface Contact {
  id: number
  name: string
  email: string
  phone: string
  position: string
  isPrimary: boolean
}

const contacts = ref<Contact[]>(data.contacts.map((c: any) => ({ ...c })))
let contactId = contacts.value.length + 1

function addContact() {
  contacts.value.push({
    id: contactId++,
    name: '',
    email: '',
    phone: '',
    position: '',
    isPrimary: false,
  })
}

function removeContact(id: number) {
  contacts.value = contacts.value.filter((c) => c.id !== id)
}

function setPrimary(id: number) {
  contacts.value.forEach((c) => (c.isPrimary = c.id === id))
}

function handleSave() {
  router.push(`/clients/${clientId}`)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton
        variant="ghost"
        size="sm"
        :icon="ArrowLeft"
        @click="router.push(`/clients/${clientId}`)"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Edit Client</h1>
        <p class="text-gray-500 mt-1">Update information for {{ clientName }}.</p>
      </div>
    </div>

    <BaseCard>
      <BaseTabs v-model="activeTab" :tabs="tabs" variant="underline" size="sm">
        <!-- General -->
        <TabPanel name="general">
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseSelect
                v-model="clientType"
                label="Client Type"
                :options="typeOptions"
                :searchable="false"
              />
              <BaseSelect
                v-model="clientStatus"
                label="Status"
                :options="statusOptions"
                :searchable="false"
              />
            </div>
            <BaseInput
              v-model="clientName"
              :label="clientType === 'company' ? 'Company Name' : 'Full Name'"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="clientEmail" label="Email" type="email" />
              <BaseInput v-model="clientPhone" label="Phone" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-if="clientType === 'company'" v-model="clientWebsite" label="Website" />
              <BaseSelect
                v-if="clientType === 'company'"
                v-model="clientIndustry"
                label="Industry"
                :options="industryOptions"
                placeholder="Select industry..."
              />
            </div>
            <BaseInput
              v-if="clientType === 'company'"
              v-model="clientTaxId"
              label="Tax ID / NPWP"
            />
            <BaseTextarea
              v-model="clientNotes"
              label="Notes"
              :rows="3"
            />
          </div>
        </TabPanel>

        <!-- Address -->
        <TabPanel name="address">
          <div class="space-y-4">
            <BaseInput v-model="addressStreet" label="Street Address" />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="addressCity" label="City" />
              <BaseInput v-model="addressState" label="State / Province" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="addressZip" label="Postal Code" />
              <BaseInput v-model="addressCountry" label="Country" />
            </div>
          </div>
        </TabPanel>

        <!-- Contacts -->
        <TabPanel name="contacts">
          <div class="space-y-4">
            <p class="text-sm text-gray-500">Manage contacts for this client.</p>

            <div
              v-for="(contact, idx) in contacts"
              :key="contact.id"
              class="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-semibold text-gray-700">Contact #{{ idx + 1 }}</span>
                  <span
                    v-if="contact.isPrimary"
                    class="text-[0.6875rem] bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full font-medium"
                    >Primary</span
                  >
                </div>
                <div class="flex items-center gap-2">
                  <button
                    v-if="!contact.isPrimary"
                    class="text-xs text-primary-500 hover:text-primary-700 cursor-pointer font-medium"
                    @click="setPrimary(contact.id)"
                  >
                    Set as Primary
                  </button>
                  <button
                    v-if="contacts.length > 1"
                    class="text-gray-400 hover:text-red-500 cursor-pointer"
                    @click="removeContact(contact.id)"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <BaseInput v-model="contact.name" label="Name" size="sm" />
                <BaseInput v-model="contact.position" label="Position / Title" size="sm" />
                <BaseInput v-model="contact.email" label="Email" type="email" size="sm" />
                <BaseInput v-model="contact.phone" label="Phone" size="sm" />
              </div>
            </div>

            <BaseButton variant="outline" size="sm" :icon="Plus" @click="addContact"
              >Add Contact</BaseButton
            >
          </div>
        </TabPanel>
      </BaseTabs>
    </BaseCard>

    <!-- Actions -->
    <div class="flex justify-end gap-2">
      <BaseButton variant="ghost" @click="router.push(`/clients/${clientId}`)">Cancel</BaseButton>
      <BaseButton @click="handleSave">Save Changes</BaseButton>
    </div>
  </div>
</template>
