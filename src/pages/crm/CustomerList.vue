<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseModal,
  BaseInput,
  BaseSelect,
  DropdownButton,
} from '@/components/ui'
import { Plus, MoreHorizontal, Eye, Edit, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@/components/ui/BaseTable.vue'
import type { DropdownItem } from '@/components/ui/DropdownButton.vue'
import { partiesApi } from '@/lib/api'
import type { Party } from '@/lib/api'
import { useToast } from '@/composables'

const toast = useToast()
const tenantId = 1

const loading = ref(false)
const customers = ref<Party[]>([])
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const editingCustomer = ref<Party | null>(null)
const formError = ref('')

const form = ref({
  type: 'person' as 'person' | 'organization',
  first_name: '',
  last_name: '',
  legal_name: '',
  email: '',
  phone: '',
})

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const typeOptions = [
  { label: 'Person', value: 'person' },
  { label: 'Organization', value: 'organization' },
]

const rowActions: DropdownItem[] = [
  { label: 'View', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

async function fetchCustomers() {
  loading.value = true
  try {
    const res = await partiesApi.list(tenantId, { role: 'customer' })
    customers.value = res.data
  } catch {
    toast.error('Gagal memuat customers.')
  } finally {
    loading.value = false
  }
}

function getDisplayName(party: Party): string {
  if (party.type === 'person')
    return [party.person?.first_name, party.person?.last_name].filter(Boolean).join(' ')
  return party.organization?.display_name || party.organization?.legal_name || ''
}

function getPrimaryContact(party: Party, type: string): string {
  return party.contacts?.find((c) => c.type === type)?.value ?? ''
}

const tableData = () =>
  customers.value.map((c) => ({
    ...c,
    name: getDisplayName(c),
    email: getPrimaryContact(c, 'email'),
    phone: getPrimaryContact(c, 'phone'),
  }))

function openCreate() {
  editingCustomer.value = null
  Object.assign(form.value, {
    type: 'person',
    first_name: '',
    last_name: '',
    legal_name: '',
    email: '',
    phone: '',
  })
  formError.value = ''
  showFormModal.value = true
}

async function saveCustomer() {
  formError.value = ''
  try {
    if (form.value.type === 'person') {
      await partiesApi.createPerson(tenantId, {
        first_name: form.value.first_name,
        last_name: form.value.last_name || undefined,
        contacts: [
          ...(form.value.email
            ? [{ type: 'email' as const, value: form.value.email, is_primary: true }]
            : []),
          ...(form.value.phone ? [{ type: 'phone' as const, value: form.value.phone }] : []),
        ],
        roles: ['customer'],
      })
    } else {
      await partiesApi.createOrganization(tenantId, {
        legal_name: form.value.legal_name,
        contacts: [
          ...(form.value.email
            ? [{ type: 'email' as const, value: form.value.email, is_primary: true }]
            : []),
          ...(form.value.phone ? [{ type: 'phone' as const, value: form.value.phone }] : []),
        ],
        roles: ['customer'],
      })
    }
    toast.success('Customer berhasil ditambahkan.')
    showFormModal.value = false
    fetchCustomers()
  } catch (e: any) {
    if (e.errors) {
      const firstField = Object.keys(e.errors)[0]
      formError.value = firstField ? e.errors[firstField][0] : e.message
    } else {
      formError.value = e.message || 'Gagal menyimpan.'
    }
  }
}

async function confirmDelete() {
  if (!editingCustomer.value) return
  try {
    await partiesApi.remove(tenantId, editingCustomer.value.id)
    toast.success('Customer berhasil dihapus.')
    showDeleteModal.value = false
    fetchCustomers()
  } catch {
    toast.error('Gagal menghapus customer.')
  }
}

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  const c = customers.value.find((x) => x.id === row.id)
  if (!c) return
  if (item.value === 'delete') {
    editingCustomer.value = c
    showDeleteModal.value = true
  }
}

onMounted(fetchCustomers)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Customers</h1>
        <p class="text-gray-500 mt-1">Manage your customer database.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="openCreate">Add Customer</BaseButton>
    </div>
    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="tableData()"
        :loading="loading"
        searchable
        search-placeholder="Search customers..."
      >
        <template #cell-type="{ value }">
          <span class="text-xs font-medium capitalize">{{ value }}</span>
        </template>
        <template #cell-actions="{ row }">
          <DropdownButton
            :items="rowActions"
            variant="ghost"
            size="sm"
            align="right"
            :icon="MoreHorizontal"
            @select="(item) => handleAction(item, row)"
          />
        </template>
      </BaseTable>
    </BaseCard>

    <BaseModal v-model="showFormModal" title="Add Customer" size="md">
      <div class="space-y-4">
        <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>
        <BaseSelect v-model="form.type" :options="typeOptions" label="Type" :searchable="false" />
        <template v-if="form.type === 'person'">
          <div class="grid grid-cols-2 gap-4">
            <BaseInput v-model="form.first_name" label="First Name" placeholder="First name" />
            <BaseInput v-model="form.last_name" label="Last Name" placeholder="Last name" />
          </div>
        </template>
        <template v-else>
          <BaseInput v-model="form.legal_name" label="Company Name" placeholder="PT Example" />
        </template>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="email@example.com"
          />
          <BaseInput v-model="form.phone" label="Phone" placeholder="+62 xxx" />
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showFormModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="saveCustomer">Create</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showDeleteModal" title="Delete Customer" size="sm">
      <p class="text-sm text-gray-600">Are you sure you want to delete this customer?</p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="confirmDelete">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
