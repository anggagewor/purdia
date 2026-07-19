<script setup lang="ts">
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseBadge,
  BaseModal,
  BasePagination,
  DropdownButton,
} from '@purdia/ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, MoreHorizontal, Eye, Edit, Trash2, Shield } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'

const router = useRouter()
const rolePage = ref(1)
const showDeleteModal = ref(false)
const selectedRole = ref<Record<string, unknown>>({})

const columns: TableColumn[] = [
  { key: 'name', label: 'Role Name', sortable: true },
  { key: 'description', label: 'Description' },
  { key: 'users', label: 'Users', align: 'center' },
  { key: 'permissions', label: 'Permissions', align: 'center' },
  { key: 'created', label: 'Created', align: 'right', sortable: true },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const roles = ref([
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full access to all resources',
    users: 2,
    permissions: 24,
    created: '2024-01-01',
  },
  {
    id: 2,
    name: 'Admin',
    description: 'Manage users and content',
    users: 3,
    permissions: 16,
    created: '2024-01-01',
  },
  {
    id: 3,
    name: 'Editor',
    description: 'Create and edit content',
    users: 5,
    permissions: 8,
    created: '2024-02-15',
  },
  {
    id: 4,
    name: 'Viewer',
    description: 'Read-only access',
    users: 12,
    permissions: 4,
    created: '2024-03-10',
  },
  {
    id: 5,
    name: 'Moderator',
    description: 'Moderate user content',
    users: 4,
    permissions: 10,
    created: '2024-05-20',
  },
])

const rowActions: DropdownItem[] = [
  { label: 'View Detail', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selectedRole.value = row
  if (item.value === 'view') router.push(`/users/roles/${row.id}`)
  if (item.value === 'edit') router.push(`/users/roles/${row.id}/edit`)
  if (item.value === 'delete') showDeleteModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Roles</h1>
        <p class="text-gray-500 mt-1">Manage roles and their permissions.</p>
      </div>
      <BaseButton size="sm" :icon="Plus" @click="router.push('/users/roles/create')"
        >Add Role</BaseButton
      >
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="roles"
        :searchable="true"
        search-placeholder="Search roles..."
      >
        <template #cell-name="{ value }">
          <div class="flex items-center gap-2">
            <Shield class="w-4 h-4 text-primary-500" />
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-users="{ value }">
          <span class="text-sm text-gray-600">{{ value }}</span>
        </template>
        <template #cell-permissions="{ value }">
          <BaseBadge variant="primary" size="sm">{{ value }}</BaseBadge>
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
          v-model:current-page="rolePage"
          :total-pages="2"
          :total-items="12"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <!-- Delete Modal -->
    <BaseModal v-model="showDeleteModal" title="Delete Role" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete role <strong>{{ selectedRole.name }}</strong
        >? Users with this role will lose their permissions.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
