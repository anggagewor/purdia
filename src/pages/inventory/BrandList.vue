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
import { Plus, MoreHorizontal, Edit, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@/components/ui/BaseTable.vue'
import type { DropdownItem } from '@/components/ui/DropdownButton.vue'
import { brandsApi } from '@/lib/api'
import type { Brand } from '@/lib/api'
import { useToast } from '@/composables'

const toast = useToast()
const tenantId = 1

const loading = ref(false)
const brands = ref<Brand[]>([])

const showFormModal = ref(false)
const showDeleteModal = ref(false)
const editingBrand = ref<Brand | null>(null)
const formError = ref('')

const form = ref({
  name: '',
  slug: '',
  description: '',
})

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'slug', label: 'Slug' },
  { key: 'description', label: 'Description' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

async function fetchBrands() {
  loading.value = true
  try {
    brands.value = (await brandsApi.list(tenantId)).data
  } catch {
    /* ignore */
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingBrand.value = null
  Object.assign(form.value, { name: '', slug: '', description: '' })
  formError.value = ''
  showFormModal.value = true
}

function openEdit(brand: Brand) {
  editingBrand.value = brand
  Object.assign(form.value, {
    name: brand.name,
    slug: brand.slug,
    description: brand.description || '',
  })
  formError.value = ''
  showFormModal.value = true
}

async function saveBrand() {
  formError.value = ''
  try {
    const payload = {
      name: form.value.name,
      slug: form.value.slug,
      description: form.value.description || undefined,
    }
    await brandsApi.create(tenantId, payload)
    toast.success(editingBrand.value ? 'Brand berhasil diperbarui.' : 'Brand berhasil ditambahkan.')
    showFormModal.value = false
    fetchBrands()
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
  if (!editingBrand.value) return
  try {
    await brandsApi.remove(tenantId, editingBrand.value.id)
    toast.success('Brand berhasil dihapus.')
    showDeleteModal.value = false
    fetchBrands()
  } catch {
    toast.error('Gagal menghapus brand.')
  }
}

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  const brand = brands.value.find((b) => b.id === row.id)
  if (!brand) return
  if (item.value === 'edit') openEdit(brand)
  if (item.value === 'delete') {
    editingBrand.value = brand
    showDeleteModal.value = true
  }
}

onMounted(fetchBrands)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Brands</h1>
      <BaseButton size="sm" :icon="Plus" @click="openCreate">Add Brand</BaseButton>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="brands"
        :loading="loading"
        searchable
        search-placeholder="Search brands..."
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

    <BaseModal v-model="showFormModal" :title="editingBrand ? 'Edit Brand' : 'Add Brand'" size="md">
      <div class="space-y-4">
        <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>
        <BaseInput v-model="form.name" label="Name" placeholder="Brand name" />
        <BaseInput v-model="form.slug" label="Slug" placeholder="brand-slug" />
        <BaseInput v-model="form.description" label="Description" placeholder="Short description" />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showFormModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="saveBrand">Save</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showDeleteModal" title="Delete Brand" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{{ editingBrand?.name }}</strong
        >? This action cannot be undone.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="confirmDelete">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
