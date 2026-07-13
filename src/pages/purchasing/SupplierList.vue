<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseModal,
  BaseInput,
  DropdownButton,
} from '@/components/ui'
import { Plus, MoreHorizontal, Eye, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@/components/ui/BaseTable.vue'
import type { DropdownItem } from '@/components/ui/DropdownButton.vue'
import { partiesApi } from '@/lib/api'
import type { Party } from '@/lib/api'
import { useToast } from '@/composables'

const toast = useToast()
const tenantId = 1
const loading = ref(false)
const suppliers = ref<Party[]>([])
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const editingSupplier = ref<Party | null>(null)
const formError = ref('')

const form = ref({ legal_name: '', email: '', phone: '', tax_number: '' })

const columns: TableColumn[] = [
  { key: 'name', label: 'Company', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const rowActions: DropdownItem[] = [
  { label: 'View', icon: Eye, value: 'view' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

async function fetchSuppliers() {
  loading.value = true
  try {
    const res = await partiesApi.list(tenantId, { role: 'supplier' })
    suppliers.value = res.data
  } catch {
    toast.error('Gagal memuat suppliers.')
  } finally {
    loading.value = false
  }
}

const tableData = () =>
  suppliers.value.map((s) => ({
    ...s,
    name: s.organization?.display_name || s.organization?.legal_name || '-',
    email: s.contacts?.find((c) => c.type === 'email')?.value ?? '',
    phone: s.contacts?.find((c) => c.type === 'phone')?.value ?? '',
  }))

function openCreate() {
  Object.assign(form.value, { legal_name: '', email: '', phone: '', tax_number: '' })
  formError.value = ''
  showFormModal.value = true
}

async function saveSupplier() {
  formError.value = ''
  if (!form.value.legal_name) {
    formError.value = 'Company name wajib diisi.'
    return
  }
  try {
    await partiesApi.createOrganization(tenantId, {
      legal_name: form.value.legal_name,
      tax_number: form.value.tax_number || undefined,
      contacts: [
        ...(form.value.email
          ? [{ type: 'email' as const, value: form.value.email, is_primary: true }]
          : []),
        ...(form.value.phone ? [{ type: 'phone' as const, value: form.value.phone }] : []),
      ],
      roles: ['supplier'],
    })
    toast.success('Supplier berhasil ditambahkan.')
    showFormModal.value = false
    fetchSuppliers()
  } catch (e: any) {
    if (e.errors) {
      const f = Object.keys(e.errors)[0]
      formError.value = f ? e.errors[f][0] : e.message
    } else {
      formError.value = e.message || 'Gagal menyimpan.'
    }
  }
}

async function confirmDelete() {
  if (!editingSupplier.value) return
  try {
    await partiesApi.remove(tenantId, editingSupplier.value.id)
    toast.success('Supplier berhasil dihapus.')
    showDeleteModal.value = false
    fetchSuppliers()
  } catch {
    toast.error('Gagal menghapus supplier.')
  }
}

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  const s = suppliers.value.find((x) => x.id === row.id)
  if (!s) return
  if (item.value === 'delete') {
    editingSupplier.value = s
    showDeleteModal.value = true
  }
}

onMounted(fetchSuppliers)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Suppliers</h1>
        <p class="text-gray-500 mt-1">Manage supplier information and contacts.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="openCreate">Add Supplier</BaseButton>
    </div>
    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="tableData()"
        :loading="loading"
        searchable
        search-placeholder="Search suppliers..."
      >
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

    <BaseModal v-model="showFormModal" title="Add Supplier" size="md">
      <div class="space-y-4">
        <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>
        <BaseInput v-model="form.legal_name" label="Company Name" placeholder="PT Supplier" />
        <div class="grid grid-cols-2 gap-4">
          <BaseInput
            v-model="form.email"
            label="Email"
            type="email"
            placeholder="email@supplier.com"
          />
          <BaseInput v-model="form.phone" label="Phone" placeholder="+62 xxx" />
        </div>
        <BaseInput
          v-model="form.tax_number"
          label="Tax Number / NPWP"
          placeholder="xx.xxx.xxx.x-xxx.xxx"
        />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showFormModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="saveSupplier">Create</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showDeleteModal" title="Delete Supplier" size="sm">
      <p class="text-sm text-gray-600">Are you sure you want to remove this supplier?</p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="confirmDelete">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
