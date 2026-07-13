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
import { Plus, MoreHorizontal, Edit, Trash2 } from '@lucide/vue'
import type { TableColumn } from '@/components/ui/BaseTable.vue'
import type { DropdownItem } from '@/components/ui/DropdownButton.vue'
import type { SelectOption } from '@/components/ui/BaseSelect.vue'
import { categoriesApi } from '@/lib/api'
import type { Category } from '@/lib/api'
import { useToast } from '@/composables'

const toast = useToast()
const tenantId = 1
const loading = ref(false)
const categories = ref<Category[]>([])
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const editingCategory = ref<Category | null>(null)
const formError = ref('')
const form = ref({
  name: '',
  slug: '',
  parent_id: '' as string | number,
  description: '',
  sort_order: 0,
})

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'slug', label: 'Slug' },
  { key: 'description', label: 'Description' },
  { key: 'children_count', label: 'Children', align: 'center' },
  { key: 'sort_order', label: 'Sort Order', align: 'center' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]
const parentOptions = ref<SelectOption[]>([])
const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

async function fetchCategories() {
  loading.value = true
  try {
    categories.value = (await categoriesApi.list(tenantId)).data
    parentOptions.value = categories.value.map((c) => ({ label: c.name, value: c.id }))
  } catch {
    /* ignore */
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingCategory.value = null
  Object.assign(form.value, { name: '', slug: '', parent_id: '', description: '', sort_order: 0 })
  formError.value = ''
  showFormModal.value = true
}

function openEdit(cat: Category) {
  editingCategory.value = cat
  Object.assign(form.value, {
    name: cat.name,
    slug: cat.slug,
    parent_id: cat.parent_id || '',
    description: cat.description || '',
    sort_order: cat.sort_order || 0,
  })
  formError.value = ''
  showFormModal.value = true
}

async function saveCategory() {
  formError.value = ''
  try {
    const payload = {
      name: form.value.name,
      slug: form.value.slug,
      parent_id: form.value.parent_id ? Number(form.value.parent_id) : undefined,
      description: form.value.description || undefined,
      sort_order: form.value.sort_order,
    }
    await categoriesApi.create(tenantId, payload)
    toast.success(
      editingCategory.value ? 'Kategori berhasil diperbarui.' : 'Kategori berhasil ditambahkan.',
    )
    showFormModal.value = false
    fetchCategories()
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
  if (!editingCategory.value) return
  try {
    await categoriesApi.remove(tenantId, editingCategory.value.id)
    toast.success('Kategori berhasil dihapus.')
    showDeleteModal.value = false
    fetchCategories()
  } catch {
    toast.error('Gagal menghapus kategori.')
  }
}

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  const cat = categories.value.find((c) => c.id === row.id)
  if (!cat) return
  if (item.value === 'edit') openEdit(cat)
  if (item.value === 'delete') {
    editingCategory.value = cat
    showDeleteModal.value = true
  }
}

const tableData = () =>
  categories.value.map((c) => ({ ...c, children_count: c.children?.length || 0 }))
onMounted(fetchCategories)
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Categories</h1>
      <BaseButton size="sm" :icon="Plus" @click="openCreate">Add Category</BaseButton>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="tableData()"
        :loading="loading"
        searchable
        search-placeholder="Search categories..."
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

    <BaseModal
      v-model="showFormModal"
      :title="editingCategory ? 'Edit Category' : 'Add Category'"
      size="md"
    >
      <div class="space-y-4">
        <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>
        <BaseInput v-model="form.name" label="Name" placeholder="Category name" />
        <BaseInput v-model="form.slug" label="Slug" placeholder="category-slug" />
        <BaseSelect
          v-model="form.parent_id"
          :options="parentOptions"
          label="Parent Category"
          placeholder="None (root)"
        />
        <BaseInput v-model="form.description" label="Description" placeholder="Short description" />
        <BaseInput v-model="form.sort_order" label="Sort Order" type="number" placeholder="0" />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showFormModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="saveCategory">Save</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showDeleteModal" title="Delete Category" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{{ editingCategory?.name }}</strong
        >? This action cannot be undone.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="confirmDelete">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
