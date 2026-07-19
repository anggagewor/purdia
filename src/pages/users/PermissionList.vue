<script setup lang="ts">
import { ref } from 'vue'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseBadge,
  BaseModal,
  BaseInput,
  BaseSelect,
  BasePagination,
  DropdownButton,
} from '@purdia/ui'
import { Plus, MoreHorizontal, Edit, Trash2, Key } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const permPage = ref(1)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedPermission = ref<Record<string, unknown>>({})

const columns: TableColumn[] = [
  { key: 'name', label: 'Permission', sortable: true },
  { key: 'group', label: 'Group', sortable: true },
  { key: 'guard', label: 'Guard' },
  { key: 'roles', label: 'Used by Roles', align: 'center' },
  { key: 'created', label: 'Created', align: 'right', sortable: true },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const permissions = ref([
  { id: 1, name: 'users.create', group: 'Users', guard: 'web', roles: 2, created: '2024-01-01' },
  { id: 2, name: 'users.read', group: 'Users', guard: 'web', roles: 5, created: '2024-01-01' },
  { id: 3, name: 'users.update', group: 'Users', guard: 'web', roles: 3, created: '2024-01-01' },
  { id: 4, name: 'users.delete', group: 'Users', guard: 'web', roles: 1, created: '2024-01-01' },
  { id: 5, name: 'roles.create', group: 'Roles', guard: 'web', roles: 1, created: '2024-01-01' },
  { id: 6, name: 'roles.read', group: 'Roles', guard: 'web', roles: 2, created: '2024-01-01' },
  { id: 7, name: 'roles.update', group: 'Roles', guard: 'web', roles: 1, created: '2024-01-01' },
  { id: 8, name: 'roles.delete', group: 'Roles', guard: 'web', roles: 1, created: '2024-01-01' },
  {
    id: 9,
    name: 'content.create',
    group: 'Content',
    guard: 'web',
    roles: 3,
    created: '2024-02-15',
  },
  { id: 10, name: 'content.read', group: 'Content', guard: 'web', roles: 5, created: '2024-02-15' },
  {
    id: 11,
    name: 'content.update',
    group: 'Content',
    guard: 'web',
    roles: 4,
    created: '2024-02-15',
  },
  {
    id: 12,
    name: 'content.delete',
    group: 'Content',
    guard: 'web',
    roles: 2,
    created: '2024-02-15',
  },
  { id: 13, name: 'media.upload', group: 'Media', guard: 'web', roles: 3, created: '2024-03-10' },
  { id: 14, name: 'media.read', group: 'Media', guard: 'web', roles: 4, created: '2024-03-10' },
  { id: 15, name: 'media.delete', group: 'Media', guard: 'web', roles: 1, created: '2024-03-10' },
  { id: 16, name: 'reports.read', group: 'Reports', guard: 'web', roles: 3, created: '2024-05-20' },
  {
    id: 17,
    name: 'reports.export',
    group: 'Reports',
    guard: 'web',
    roles: 2,
    created: '2024-05-20',
  },
  {
    id: 18,
    name: 'settings.manage',
    group: 'Settings',
    guard: 'web',
    roles: 1,
    created: '2024-01-01',
  },
  {
    id: 19,
    name: 'permissions.manage',
    group: 'System',
    guard: 'web',
    roles: 1,
    created: '2024-01-01',
  },
])

const groupOptions: SelectOption[] = [
  { label: 'Users', value: 'Users' },
  { label: 'Roles', value: 'Roles' },
  { label: 'Content', value: 'Content' },
  { label: 'Media', value: 'Media' },
  { label: 'Reports', value: 'Reports' },
  { label: 'Settings', value: 'Settings' },
  { label: 'System', value: 'System' },
]

const guardOptions: SelectOption[] = [
  { label: 'web', value: 'web' },
  { label: 'api', value: 'api' },
]

const formName = ref('')
const formGroup = ref<string | number>('')
const formGuard = ref<string | number>('web')

const rowActions: DropdownItem[] = [
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selectedPermission.value = row
  if (item.value === 'edit') {
    formName.value = row.name as string
    formGroup.value = row.group as string
    formGuard.value = row.guard as string
    showEditModal.value = true
  }
  if (item.value === 'delete') showDeleteModal.value = true
}

function openCreate() {
  formName.value = ''
  formGroup.value = ''
  formGuard.value = 'web'
  showCreateModal.value = true
}

function getGroupColor(group: string) {
  const map: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary'> = {
    Users: 'primary',
    Roles: 'info',
    Content: 'success',
    Media: 'warning',
    Reports: 'secondary',
    Settings: 'danger',
    System: 'danger',
  }
  return map[group] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Permissions</h1>
        <p class="text-gray-500 mt-1">Manage system permissions assigned to roles.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="openCreate">Add Permission</BaseButton>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="permissions"
        :searchable="true"
        search-placeholder="Search permissions..."
      >
        <template #cell-name="{ value }">
          <div class="flex items-center gap-2">
            <Key class="w-3.5 h-3.5 text-gray-400" />
            <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded font-mono">{{ value }}</code>
          </div>
        </template>
        <template #cell-group="{ value }">
          <BaseBadge :variant="getGroupColor(value as string)" size="sm" :pill="false">{{
            value
          }}</BaseBadge>
        </template>
        <template #cell-guard="{ value }">
          <span class="text-xs text-gray-500 font-mono">{{ value }}</span>
        </template>
        <template #cell-roles="{ value }">
          <span class="text-sm text-gray-600">{{ value }}</span>
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
      <div class="px-4 py-3 border-t border-gray-200">
        <BasePagination
          v-model:current-page="permPage"
          :total-pages="3"
          :total-items="24"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <!-- Create Modal -->
    <BaseModal v-model="showCreateModal" title="Create Permission" size="md">
      <div class="space-y-4">
        <BaseInput
          v-model="formName"
          label="Permission Name"
          placeholder="e.g. posts.publish"
          hint="Use dot notation: resource.action"
        />
        <BaseSelect
          v-model="formGroup"
          label="Group"
          :options="groupOptions"
          placeholder="Select group..."
        />
        <BaseSelect v-model="formGuard" label="Guard" :options="guardOptions" :searchable="false" />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showCreateModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showCreateModal = false">Create</BaseButton>
      </template>
    </BaseModal>

    <!-- Edit Modal -->
    <BaseModal v-model="showEditModal" title="Edit Permission" size="md">
      <div class="space-y-4">
        <BaseInput v-model="formName" label="Permission Name" placeholder="e.g. posts.publish" />
        <BaseSelect
          v-model="formGroup"
          label="Group"
          :options="groupOptions"
          placeholder="Select group..."
        />
        <BaseSelect v-model="formGuard" label="Guard" :options="guardOptions" :searchable="false" />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showEditModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showEditModal = false">Save Changes</BaseButton>
      </template>
    </BaseModal>

    <!-- Delete Modal -->
    <BaseModal v-model="showDeleteModal" title="Delete Permission" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete
        <code class="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{{ selectedPermission.name }}</code
        >? Roles using this permission will lose access.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
