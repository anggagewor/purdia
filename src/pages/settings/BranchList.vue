<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseModal,
  BaseInput,
  BaseSelect,
  BaseBadge,
  DropdownButton,
} from '@/components/ui'
import { Plus, MoreHorizontal, Edit, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@/components/ui/BaseTable.vue'
import type { DropdownItem } from '@/components/ui/DropdownButton.vue'
import { branchesApi } from '@/lib/api'
import type { Branch } from '@/lib/api'
import { useToast } from '@/composables'

const toast = useToast()
const tenantId = 1

const loading = ref(false)
const branches = ref<Branch[]>([])
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const editingBranch = ref<Branch | null>(null)
const formError = ref('')

const form = ref({
  name: '',
  code: '',
  type: 'store' as string,
  address: '',
  phone: '',
  timezone: '',
})

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'code', label: 'Code' },
  { key: 'type', label: 'Type', align: 'center' },
  { key: 'address', label: 'Address' },
  { key: 'phone', label: 'Phone' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const typeOptions = [
  { label: 'Store', value: 'store' },
  { label: 'Warehouse', value: 'warehouse' },
  { label: 'Office', value: 'office' },
  { label: 'Factory', value: 'factory' },
  { label: 'Virtual', value: 'virtual' },
]

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

async function fetchBranches() {
  loading.value = true
  try {
    const res = await branchesApi.list(tenantId)
    branches.value = res.data
  } catch {
    toast.error('Gagal memuat branches.')
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingBranch.value = null
  Object.assign(form.value, {
    name: '',
    code: '',
    type: 'store',
    address: '',
    phone: '',
    timezone: '',
  })
  formError.value = ''
  showFormModal.value = true
}

function openEdit(branch: Branch) {
  editingBranch.value = branch
  Object.assign(form.value, {
    name: branch.name,
    code: branch.code,
    type: branch.type ?? 'store',
    address: branch.address ?? '',
    phone: branch.phone ?? '',
    timezone: branch.timezone ?? '',
  })
  formError.value = ''
  showFormModal.value = true
}

async function saveBranch() {
  formError.value = ''
  if (!form.value.name || !form.value.code) {
    formError.value = 'Name dan code wajib diisi.'
    return
  }
  try {
    await branchesApi.create(tenantId, {
      name: form.value.name,
      code: form.value.code,
      type: form.value.type as Branch['type'],
      address: form.value.address || undefined,
      phone: form.value.phone || undefined,
      timezone: form.value.timezone || undefined,
    })
    toast.success(editingBranch.value ? 'Branch berhasil diupdate.' : 'Branch berhasil dibuat.')
    showFormModal.value = false
    fetchBranches()
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
  if (!editingBranch.value) return
  toast.info('Delete branch belum tersedia via API.')
  showDeleteModal.value = false
}

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  const b = branches.value.find((x) => x.id === row.id)
  if (!b) return
  if (item.value === 'edit') openEdit(b)
  if (item.value === 'delete') {
    editingBranch.value = b
    showDeleteModal.value = true
  }
}

onMounted(fetchBranches)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Branches</h1>
        <p class="text-gray-500 mt-1">Manage company branches and locations.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="openCreate">Add Branch</BaseButton>
    </div>
    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="branches"
        :loading="loading"
        searchable
        search-placeholder="Search branches..."
      >
        <template #cell-type="{ value }">
          <BaseBadge variant="secondary" size="sm" :pill="false">{{ value }}</BaseBadge>
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

    <BaseModal
      v-model="showFormModal"
      :title="editingBranch ? 'Edit Branch' : 'Add Branch'"
      size="md"
    >
      <div class="space-y-4">
        <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="form.name" label="Name" placeholder="Branch name" />
          <BaseInput v-model="form.code" label="Code" placeholder="e.g. BDG" />
        </div>
        <BaseSelect v-model="form.type" :options="typeOptions" label="Type" :searchable="false" />
        <BaseInput v-model="form.address" label="Address" placeholder="Full address" />
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="form.phone" label="Phone" placeholder="+62 xxx" />
          <BaseInput v-model="form.timezone" label="Timezone" placeholder="Asia/Jakarta" />
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showFormModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="saveBranch">{{
          editingBranch ? 'Update' : 'Create'
        }}</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showDeleteModal" title="Delete Branch" size="sm">
      <p class="text-sm text-gray-600">
        Delete <strong>{{ editingBranch?.name }}</strong
        >?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="confirmDelete">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
