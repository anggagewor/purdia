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
import type { SelectOption } from '@/components/ui/BaseSelect.vue'
import { productsApi, categoriesApi, brandsApi } from '@/lib/api'
import type { Product, Category, Brand } from '@/lib/api'
import { useToast } from '@/composables'

const toast = useToast()
const tenantId = 1
const loading = ref(false)
const products = ref<Product[]>([])
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const editingProduct = ref<Product | null>(null)
const formError = ref('')
const form = ref({
  name: '',
  slug: '',
  sku: '',
  barcode: '',
  type: 'goods' as 'goods' | 'service' | 'digital' | 'bundle',
  category_id: '' as string | number,
  brand_id: '' as string | number,
  description: '',
  unit: '',
})
const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'sku', label: 'SKU' },
  { key: 'type', label: 'Type' },
  { key: 'category_name', label: 'Category' },
  { key: 'brand_name', label: 'Brand' },
  { key: 'unit', label: 'Unit' },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]
const typeOptions: SelectOption[] = [
  { label: 'Goods', value: 'goods' },
  { label: 'Service', value: 'service' },
  { label: 'Digital', value: 'digital' },
  { label: 'Bundle', value: 'bundle' },
]
const categoryOptions = ref<SelectOption[]>([])
const brandOptions = ref<SelectOption[]>([])
const rowActions: DropdownItem[] = [
  { label: 'View', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

async function fetchProducts() {
  loading.value = true
  try {
    products.value = (await productsApi.list(tenantId)).data
  } catch {
    /* ignore */
  } finally {
    loading.value = false
  }
}

async function fetchOptions() {
  const [catsRes, brsRes] = await Promise.all([
    categoriesApi.list(tenantId),
    brandsApi.list(tenantId),
  ])
  categoryOptions.value = catsRes.data.map((c: Category) => ({ label: c.name, value: c.id }))
  brandOptions.value = brsRes.data.map((b: Brand) => ({ label: b.name, value: b.id }))
}

function openCreate() {
  editingProduct.value = null
  Object.assign(form.value, {
    name: '',
    slug: '',
    sku: '',
    barcode: '',
    type: 'goods',
    category_id: '',
    brand_id: '',
    description: '',
    unit: '',
  })
  formError.value = ''
  showFormModal.value = true
}

function openEdit(p: Product) {
  editingProduct.value = p
  Object.assign(form.value, {
    name: p.name,
    slug: p.slug,
    sku: p.sku || '',
    barcode: p.barcode || '',
    type: p.type,
    category_id: p.category_id || '',
    brand_id: p.brand_id || '',
    description: p.description || '',
    unit: p.unit || '',
  })
  formError.value = ''
  showFormModal.value = true
}

async function saveProduct() {
  formError.value = ''
  try {
    const payload = {
      ...form.value,
      category_id: form.value.category_id ? Number(form.value.category_id) : undefined,
      brand_id: form.value.brand_id ? Number(form.value.brand_id) : undefined,
    }
    await productsApi.create(tenantId, payload)
    toast.success(
      editingProduct.value ? 'Produk berhasil diperbarui.' : 'Produk berhasil ditambahkan.',
    )
    showFormModal.value = false
    fetchProducts()
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
  if (!editingProduct.value) return
  try {
    await productsApi.remove(tenantId, editingProduct.value.id)
    toast.success('Produk berhasil dihapus.')
    showDeleteModal.value = false
    fetchProducts()
  } catch {
    toast.error('Gagal menghapus produk.')
  }
}

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  const product = products.value.find((p) => p.id === row.id)
  if (!product) return
  if (item.value === 'edit') openEdit(product)
  if (item.value === 'delete') {
    editingProduct.value = product
    showDeleteModal.value = true
  }
}

const tableData = () =>
  products.value.map((p) => ({
    ...p,
    category_name: p.category?.name || '-',
    brand_name: p.brand?.name || '-',
  }))
onMounted(() => {
  fetchProducts()
  fetchOptions()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Products</h1>
      <BaseButton size="sm" :icon="Plus" @click="openCreate">Add Product</BaseButton>
    </div>
    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="tableData()"
        :loading="loading"
        searchable
        search-placeholder="Search products..."
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
      :title="editingProduct ? 'Edit Product' : 'Add Product'"
      size="lg"
    >
      <div class="space-y-4">
        <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="form.name" label="Name" placeholder="Product name" />
          <BaseInput v-model="form.slug" label="Slug" placeholder="product-slug" />
          <BaseInput v-model="form.sku" label="SKU" placeholder="SKU code" />
          <BaseInput v-model="form.barcode" label="Barcode" placeholder="Barcode" />
          <BaseSelect v-model="form.type" :options="typeOptions" label="Type" />
          <BaseSelect
            v-model="form.category_id"
            :options="categoryOptions"
            label="Category"
            placeholder="Select category"
          />
          <BaseSelect
            v-model="form.brand_id"
            :options="brandOptions"
            label="Brand"
            placeholder="Select brand"
          />
          <BaseInput v-model="form.unit" label="Unit" placeholder="e.g. pcs, kg" />
        </div>
        <BaseInput v-model="form.description" label="Description" placeholder="Short description" />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showFormModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="saveProduct">Save</BaseButton>
      </template>
    </BaseModal>
    <BaseModal v-model="showDeleteModal" title="Delete Product" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{{ editingProduct?.name }}</strong
        >?
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="confirmDelete">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
