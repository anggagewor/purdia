<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BaseCard, BaseInput, BaseButton, BaseSelect, BaseTabs, TabPanel, BaseTextarea } from '@purdia/ui'
import { ArrowLeft, Plus, Trash2 } from '@lucide/vue'
import type { SelectOption } from '@purdia/ui'
import type { TabItem } from '@purdia/ui'

const router = useRouter()
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

// Form
const clientType = ref<string | number>('company')
const clientName = ref('')
const clientEmail = ref('')
const clientPhone = ref('')
const clientWebsite = ref('')
const clientIndustry = ref<string | number>('')
const clientStatus = ref<string | number>('active')
const clientTaxId = ref('')
const clientNotes = ref('')

// Address
const addressStreet = ref('')
const addressCity = ref('')
const addressState = ref('')
const addressZip = ref('')
const addressCountry = ref('')

// Contacts
interface Contact {
  id: number
  name: string
  email: string
  phone: string
  position: string
  isPrimary: boolean
}

const contacts = ref<Contact[]>([
  { id: 1, name: '', email: '', phone: '', position: '', isPrimary: true },
])

let contactId = 2

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
  router.push('/clients')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-3">
      <BaseButton variant="ghost" size="sm" :icon="ArrowLeft" @click="router.push('/clients')" />
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Add Client</h1>
        <p class="text-gray-500 mt-1">Create a new client record.</p>
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
              :placeholder="clientType === 'company' ? 'PT Example Corp' : 'John Doe'"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput
                v-model="clientEmail"
                label="Email"
                type="email"
                placeholder="email@example.com"
              />
              <BaseInput v-model="clientPhone" label="Phone" placeholder="+62 xxx xxxx xxxx" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput
                v-if="clientType === 'company'"
                v-model="clientWebsite"
                label="Website"
                placeholder="https://example.com"
              />
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
              placeholder="xx.xxx.xxx.x-xxx.xxx"
            />
            <BaseTextarea
              v-model="clientNotes"
              label="Notes"
              :rows="3"
              placeholder="Additional notes about this client..."
            />
          </div>
        </TabPanel>

        <!-- Address -->
        <TabPanel name="address">
          <div class="space-y-4">
            <BaseInput
              v-model="addressStreet"
              label="Street Address"
              placeholder="Jl. Sudirman No. 123"
            />
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="addressCity" label="City" placeholder="Jakarta" />
              <BaseInput
                v-model="addressState"
                label="State / Province"
                placeholder="DKI Jakarta"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BaseInput v-model="addressZip" label="Postal Code" placeholder="12345" />
              <BaseInput v-model="addressCountry" label="Country" placeholder="Indonesia" />
            </div>
          </div>
        </TabPanel>

        <!-- Contacts -->
        <TabPanel name="contacts">
          <div class="space-y-4">
            <p class="text-sm text-gray-500">
              Add contact persons for this client. At least one primary contact is required.
            </p>

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
                <BaseInput
                  v-model="contact.name"
                  label="Name"
                  placeholder="Contact name"
                  size="sm"
                />
                <BaseInput
                  v-model="contact.position"
                  label="Position / Title"
                  placeholder="e.g. Director"
                  size="sm"
                />
                <BaseInput
                  v-model="contact.email"
                  label="Email"
                  type="email"
                  placeholder="contact@example.com"
                  size="sm"
                />
                <BaseInput v-model="contact.phone" label="Phone" placeholder="+62 xxx" size="sm" />
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
      <BaseButton variant="ghost" @click="router.push('/clients')">Cancel</BaseButton>
      <BaseButton @click="handleSave">Create Client</BaseButton>
    </div>
  </div>
</template>
