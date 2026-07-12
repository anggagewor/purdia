<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  BaseCard,
  BaseButton,
  BaseModal,
  BaseInput,
  BaseSelect,
  BaseBadge,
  BaseToggle,
} from '@/components/ui'
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  ChevronRight,
  ChevronDown,
  Eye,
  EyeOff,
  RefreshCw,
} from '@lucide/vue'
import { menusApi } from '@/lib/api'
import type { Menu, MenuPayload } from '@/lib/api'
import { useToast } from '@/composables'
import { useMenuStore } from '@/stores/menu'

const toast = useToast()
const menuStore = useMenuStore()
const tenantId = 1 // TODO: from tenant store

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const menus = ref<Menu[]>([])
const loading = ref(false)
const expandedIds = ref<Set<number>>(new Set())

// Modal state
const showModal = ref(false)
const showDeleteModal = ref(false)
const editMode = ref(false)
const saving = ref(false)
const formError = ref('')
const menuToDelete = ref<Menu | null>(null)

const form = ref<{
  id?: number
  name: string
  slug: string
  path: string
  icon: string
  permission: string
  parent_id: number | string
  sort_order: number
  is_visible: boolean
}>({
  name: '',
  slug: '',
  path: '',
  icon: '',
  permission: '',
  parent_id: '',
  sort_order: 0,
  is_visible: true,
})

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

async function fetchMenus() {
  loading.value = true
  try {
    const res = await menusApi.list(tenantId)
    menus.value = res.data
  } catch {
    toast.error('Gagal memuat menus.')
  } finally {
    loading.value = false
  }
}

// ---------------------------------------------------------------------------
// Tree helpers
// ---------------------------------------------------------------------------

function toggleExpand(id: number) {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
  }
}

/** Flatten menu tree for parent select options */
const parentOptions = computed(() => {
  const options: { label: string; value: number | string }[] = [
    { label: '— Root (no parent)', value: '' },
  ]
  function walk(items: Menu[], prefix = '') {
    for (const item of items) {
      // Exclude current editing item from parent options
      if (editMode.value && form.value.id === item.id) continue
      options.push({ label: `${prefix}${item.name}`, value: item.id })
      if (item.children && item.children.length > 0) {
        walk(item.children, `${prefix}  └ `)
      }
    }
  }
  walk(menus.value)
  return options
})

// ---------------------------------------------------------------------------
// CRUD
// ---------------------------------------------------------------------------

function openCreate(parentId: number | null = null) {
  editMode.value = false
  form.value = {
    name: '',
    slug: '',
    path: '',
    icon: '',
    permission: '',
    parent_id: parentId ?? '',
    sort_order: 0,
    is_visible: true,
  }
  formError.value = ''
  showModal.value = true
}

function openEdit(menu: Menu) {
  editMode.value = true
  form.value = {
    id: menu.id,
    name: menu.name,
    slug: menu.slug,
    path: menu.path ?? '',
    icon: menu.icon ?? '',
    permission: menu.permission ?? '',
    parent_id: '',
    sort_order: menu.sort_order,
    is_visible: menu.is_visible,
  }
  formError.value = ''
  showModal.value = true
}

function openDelete(menu: Menu) {
  menuToDelete.value = menu
  showDeleteModal.value = true
}

async function saveMenu() {
  formError.value = ''
  if (!form.value.name || !form.value.slug) {
    formError.value = 'Name dan slug wajib diisi.'
    return
  }
  saving.value = true
  try {
    const payload: MenuPayload = {
      name: form.value.name,
      slug: form.value.slug,
      path: form.value.path || null,
      icon: form.value.icon || null,
      permission: form.value.permission || null,
      parent_id: form.value.parent_id ? Number(form.value.parent_id) : null,
      sort_order: Number(form.value.sort_order),
      is_visible: form.value.is_visible,
    }

    if (editMode.value && form.value.id) {
      await menusApi.update(tenantId, form.value.id, payload)
      toast.success('Menu berhasil diupdate.')
    } else {
      await menusApi.create(tenantId, payload)
      toast.success('Menu berhasil dibuat.')
    }
    showModal.value = false
    await fetchMenus()
    menuStore.refresh() // Refresh sidebar
  } catch (e: any) {
    if (e.errors) {
      const firstField = Object.keys(e.errors)[0]
      formError.value = firstField ? e.errors[firstField][0] : e.message
    } else {
      formError.value = e.message || 'Gagal menyimpan menu.'
    }
  } finally {
    saving.value = false
  }
}

async function deleteMenu() {
  if (!menuToDelete.value) return
  try {
    await menusApi.remove(tenantId, menuToDelete.value.id)
    toast.success('Menu berhasil dihapus.')
    showDeleteModal.value = false
    await fetchMenus()
    menuStore.refresh()
  } catch (e: any) {
    toast.error(e.message || 'Gagal menghapus menu.')
  }
}

async function toggleVisibility(menu: Menu) {
  try {
    await menusApi.update(tenantId, menu.id, { is_visible: !menu.is_visible })
    await fetchMenus()
    menuStore.refresh()
  } catch (e: any) {
    toast.error(e.message || 'Gagal mengubah visibility.')
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

onMounted(() => {
  fetchMenus()
  // Expand all by default
  function expandAll(items: Menu[]) {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        expandedIds.value.add(item.id)
        expandAll(item.children)
      }
    }
  }
  fetchMenus().then(() => expandAll(menus.value))
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Menu Manager</h1>
        <p class="text-gray-500 mt-1">Manage navigation menu structure and permissions.</p>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="outline" size="sm" :icon="RefreshCw" @click="fetchMenus"
          >Refresh</BaseButton
        >
        <BaseButton size="sm" :icon="Plus" @click="openCreate(null)">Add Menu</BaseButton>
      </div>
    </div>

    <BaseCard :padding="false">
      <div v-if="loading" class="p-6">
        <div
          v-for="i in 5"
          :key="i"
          class="h-10 bg-gray-100 rounded-md mb-2 animate-pulse dark:bg-gray-700"
        />
      </div>

      <div v-else-if="menus.length === 0" class="text-center py-12 text-gray-400">
        <p class="text-lg font-medium">No menus</p>
        <p class="text-sm mt-1">Create your first menu item to get started.</p>
      </div>

      <div v-else class="divide-y divide-gray-100 dark:divide-gray-700">
        <div v-for="item in menus" :key="item.id">
          <div class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <GripVertical class="w-4 h-4 text-gray-300 shrink-0" />
            <button
              v-if="item.children && item.children.length > 0"
              class="w-5 h-5 flex items-center justify-center text-gray-400 cursor-pointer"
              @click="toggleExpand(item.id)"
            >
              <ChevronDown v-if="expandedIds.has(item.id)" class="w-4 h-4" />
              <ChevronRight v-else class="w-4 h-4" />
            </button>
            <div v-else class="w-5" />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{
                  item.name
                }}</span>
                <BaseBadge v-if="item.icon" variant="secondary" size="sm">{{
                  item.icon
                }}</BaseBadge>
                <BaseBadge v-if="!item.is_visible" variant="warning" size="sm">hidden</BaseBadge>
              </div>
              <div class="flex items-center gap-3 mt-0.5">
                <span v-if="item.path" class="text-xs text-gray-400">{{ item.path }}</span>
                <span v-if="item.permission" class="text-xs text-primary-500">{{
                  item.permission
                }}</span>
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <button
                class="p-1.5 text-gray-400 hover:text-gray-600 rounded cursor-pointer dark:hover:text-gray-300"
                @click="toggleVisibility(item)"
              >
                <Eye v-if="item.is_visible" class="w-4 h-4" /><EyeOff v-else class="w-4 h-4" />
              </button>
              <button
                class="p-1.5 text-gray-400 hover:text-primary-600 rounded cursor-pointer"
                @click="openCreate(item.id)"
              >
                <Plus class="w-4 h-4" />
              </button>
              <button
                class="p-1.5 text-gray-400 hover:text-primary-600 rounded cursor-pointer"
                @click="openEdit(item)"
              >
                <Edit class="w-4 h-4" />
              </button>
              <button
                class="p-1.5 text-gray-400 hover:text-red-500 rounded cursor-pointer"
                @click="openDelete(item)"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
          <template v-if="item.children && item.children.length > 0 && expandedIds.has(item.id)">
            <div v-for="child in item.children" :key="child.id">
              <div
                class="flex items-center gap-3 px-4 py-2.5 pl-12 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-t border-gray-50 dark:border-gray-800"
              >
                <GripVertical class="w-3.5 h-3.5 text-gray-300 shrink-0" />
                <button
                  v-if="child.children && child.children.length > 0"
                  class="w-4 h-4 flex items-center justify-center text-gray-400 cursor-pointer"
                  @click="toggleExpand(child.id)"
                >
                  <ChevronDown v-if="expandedIds.has(child.id)" class="w-3.5 h-3.5" />
                  <ChevronRight v-else class="w-3.5 h-3.5" />
                </button>
                <div v-else class="w-4" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-700 dark:text-gray-300">{{ child.name }}</span>
                    <BaseBadge v-if="child.icon" variant="secondary" size="sm">{{
                      child.icon
                    }}</BaseBadge>
                    <BaseBadge v-if="!child.is_visible" variant="warning" size="sm"
                      >hidden</BaseBadge
                    >
                  </div>
                  <div class="flex items-center gap-3 mt-0.5">
                    <span v-if="child.path" class="text-xs text-gray-400">{{ child.path }}</span>
                    <span v-if="child.permission" class="text-xs text-primary-500">{{
                      child.permission
                    }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                  <button
                    class="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer dark:hover:text-gray-300"
                    @click="toggleVisibility(child)"
                  >
                    <Eye v-if="child.is_visible" class="w-3.5 h-3.5" /><EyeOff
                      v-else
                      class="w-3.5 h-3.5"
                    />
                  </button>
                  <button
                    class="p-1 text-gray-400 hover:text-primary-600 rounded cursor-pointer"
                    @click="openCreate(child.id)"
                  >
                    <Plus class="w-3.5 h-3.5" />
                  </button>
                  <button
                    class="p-1 text-gray-400 hover:text-primary-600 rounded cursor-pointer"
                    @click="openEdit(child)"
                  >
                    <Edit class="w-3.5 h-3.5" />
                  </button>
                  <button
                    class="p-1 text-gray-400 hover:text-red-500 rounded cursor-pointer"
                    @click="openDelete(child)"
                  >
                    <Trash2 class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <template
                v-if="child.children && child.children.length > 0 && expandedIds.has(child.id)"
              >
                <div
                  v-for="gc in child.children"
                  :key="gc.id"
                  class="flex items-center gap-3 px-4 py-2 pl-20 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-t border-gray-50 dark:border-gray-800"
                >
                  <GripVertical class="w-3 h-3 text-gray-300 shrink-0" />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{{
                        gc.name
                      }}</span>
                      <BaseBadge v-if="!gc.is_visible" variant="warning" size="sm"
                        >hidden</BaseBadge
                      >
                    </div>
                    <span v-if="gc.path" class="text-xs text-gray-400">{{ gc.path }}</span>
                  </div>
                  <div class="flex items-center gap-1 shrink-0">
                    <button
                      class="p-1 text-gray-400 hover:text-gray-600 rounded cursor-pointer dark:hover:text-gray-300"
                      @click="toggleVisibility(gc)"
                    >
                      <Eye v-if="gc.is_visible" class="w-3 h-3" /><EyeOff v-else class="w-3 h-3" />
                    </button>
                    <button
                      class="p-1 text-gray-400 hover:text-primary-600 rounded cursor-pointer"
                      @click="openEdit(gc)"
                    >
                      <Edit class="w-3 h-3" />
                    </button>
                    <button
                      class="p-1 text-gray-400 hover:text-red-500 rounded cursor-pointer"
                      @click="openDelete(gc)"
                    >
                      <Trash2 class="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </BaseCard>

    <BaseModal v-model="showModal" :title="editMode ? 'Edit Menu' : 'Create Menu'" size="md">
      <div class="space-y-4">
        <div
          v-if="formError"
          class="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
        >
          {{ formError }}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="form.name" label="Name" placeholder="e.g. Sales" />
          <BaseInput
            v-model="form.slug"
            label="Slug"
            placeholder="e.g. sales"
            hint="Unique identifier"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="form.path"
            label="Path"
            placeholder="/sales or empty"
            hint="Route path, null for parent-only"
          />
          <BaseInput
            v-model="form.icon"
            label="Icon"
            placeholder="e.g. shopping-cart"
            hint="Lucide icon name (kebab-case)"
          />
        </div>
        <BaseInput
          v-model="form.permission"
          label="Permission"
          placeholder="e.g. sales.page.index.view"
          hint="Required permission to see this menu"
        />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="form.parent_id"
            label="Parent"
            :options="parentOptions"
            placeholder="Select parent..."
          />
          <BaseInput v-model="form.sort_order" label="Sort Order" type="number" placeholder="0" />
        </div>
        <div class="flex items-center gap-3">
          <BaseToggle v-model="form.is_visible" />
          <span class="text-sm text-gray-700 dark:text-gray-300">Visible in sidebar</span>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showModal = false">Cancel</BaseButton>
        <BaseButton size="sm" :loading="saving" @click="saveMenu">{{
          editMode ? 'Update' : 'Create'
        }}</BaseButton>
      </template>
    </BaseModal>

    <BaseModal v-model="showDeleteModal" title="Delete Menu" size="sm">
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Delete <strong>{{ menuToDelete?.name }}</strong
        >?
        <span v-if="menuToDelete?.children?.length" class="text-red-500"
          >This will also delete {{ menuToDelete.children.length }} child menu(s).</span
        >
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="deleteMenu">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
