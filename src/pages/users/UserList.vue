<script setup lang="ts">
import { ref } from 'vue'
import {
  BaseCard,
  BaseTable,
  BaseButton,
  BaseBadge,
  BaseAvatar,
  BaseModal,
  BaseInput,
  BaseSelect,
  BasePagination,
  DropdownButton,
} from '@purdia/ui'
import { Plus, MoreHorizontal, Eye, Edit, Trash2, Upload } from '@lucide/vue'
import type { TableColumn } from '@purdia/ui'
import type { DropdownItem } from '@purdia/ui'
import type { SelectOption } from '@purdia/ui'

const userPage = ref(1)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const showDetailModal = ref(false)
const selectedUser = ref<Record<string, unknown>>({})

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', align: 'center' },
  { key: 'created', label: 'Created', align: 'right', sortable: true },
  { key: 'actions', label: '', align: 'right', width: '60px' },
]

const users = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Admin',
    status: 'active',
    created: '2024-01-15',
    phone: '+1 234 567 890',
  },
  {
    id: 2,
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'Editor',
    status: 'active',
    created: '2024-03-22',
    phone: '+1 345 678 901',
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Viewer',
    status: 'inactive',
    created: '2024-06-10',
    phone: '+1 456 789 012',
  },
  {
    id: 4,
    name: 'Alex Turner',
    email: 'alex@example.com',
    role: 'Editor',
    status: 'active',
    created: '2024-08-05',
    phone: '+1 567 890 123',
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa@example.com',
    role: 'Admin',
    status: 'active',
    created: '2024-10-18',
    phone: '+1 678 901 234',
  },
  {
    id: 6,
    name: 'David Kim',
    email: 'david@example.com',
    role: 'Viewer',
    status: 'inactive',
    created: '2024-11-02',
    phone: '+1 789 012 345',
  },
  {
    id: 7,
    name: 'Rachel Green',
    email: 'rachel@example.com',
    role: 'Editor',
    status: 'active',
    created: '2025-01-08',
    phone: '+1 890 123 456',
  },
  {
    id: 8,
    name: 'Tom Hardy',
    email: 'tom@example.com',
    role: 'Viewer',
    status: 'active',
    created: '2025-02-14',
    phone: '+1 901 234 567',
  },
])

const roleOptions: SelectOption[] = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Editor', value: 'Editor' },
  { label: 'Viewer', value: 'Viewer' },
]

const statusOptions: SelectOption[] = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

// Form state
const formName = ref('')
const formEmail = ref('')
const formRole = ref<string | number>('')
const formStatus = ref<string | number>('active')

const rowActions: DropdownItem[] = [
  { label: 'View Detail', icon: Eye, value: 'view' },
  { label: 'Edit', icon: Edit, value: 'edit' },
  { divider: true, label: '' },
  { label: 'Delete', icon: Trash2, value: 'delete', danger: true },
]

function handleAction(item: DropdownItem, row: Record<string, unknown>) {
  selectedUser.value = row
  if (item.value === 'view') showDetailModal.value = true
  if (item.value === 'edit') {
    formName.value = row.name as string
    formEmail.value = row.email as string
    formRole.value = row.role as string
    formStatus.value = row.status as string
    showEditModal.value = true
  }
  if (item.value === 'delete') showDeleteModal.value = true
}

function openCreate() {
  formName.value = ''
  formEmail.value = ''
  formRole.value = ''
  formStatus.value = 'active'
  showCreateModal.value = true
}

function getStatusVariant(status: string) {
  return status === 'active' ? ('success' as const) : ('secondary' as const)
}

function getRoleVariant(role: string) {
  const map: Record<string, 'primary' | 'info' | 'secondary'> = {
    Admin: 'primary',
    Editor: 'info',
    Viewer: 'secondary',
  }
  return map[role] || 'secondary'
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Users</h1>
        <p class="text-gray-500 mt-1">Manage all users in the system.</p>
      </div>
      <div class="flex gap-2">
        <BaseButton variant="outline" size="sm" :icon="Upload">Import</BaseButton>
        <BaseButton size="sm" :icon="Plus" @click="openCreate">Add User</BaseButton>
      </div>
    </div>

    <BaseCard flush>
      <BaseTable
        :columns="columns"
        :data="users"
        :searchable="true"
        search-placeholder="Search users..."
      >
        <template #cell-name="{ value }">
          <div class="flex items-center gap-2">
            <BaseAvatar :name="value as string" size="xs" />
            <span class="font-medium">{{ value }}</span>
          </div>
        </template>
        <template #cell-role="{ value }">
          <BaseBadge :variant="getRoleVariant(value as string)" size="sm">{{ value }}</BaseBadge>
        </template>
        <template #cell-status="{ value }">
          <BaseBadge :variant="getStatusVariant(value as string)" :dot="true" size="sm">{{
            value
          }}</BaseBadge>
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
          v-model:current-page="userPage"
          :total-pages="5"
          :total-items="42"
          :per-page="10"
          size="sm"
        />
      </div>
    </BaseCard>

    <!-- Create Modal -->
    <BaseModal v-model="showCreateModal" title="Add New User" size="md">
      <div class="space-y-4">
        <BaseInput v-model="formName" label="Full Name" placeholder="Enter full name" />
        <BaseInput v-model="formEmail" label="Email" type="email" placeholder="user@example.com" />
        <BaseSelect
          v-model="formRole"
          label="Role"
          :options="roleOptions"
          placeholder="Select role..."
        />
        <BaseSelect
          v-model="formStatus"
          label="Status"
          :options="statusOptions"
          :searchable="false"
        />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showCreateModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showCreateModal = false">Create User</BaseButton>
      </template>
    </BaseModal>

    <!-- Edit Modal -->
    <BaseModal v-model="showEditModal" title="Edit User" size="md">
      <div class="space-y-4">
        <BaseInput v-model="formName" label="Full Name" placeholder="Enter full name" />
        <BaseInput v-model="formEmail" label="Email" type="email" placeholder="user@example.com" />
        <BaseSelect
          v-model="formRole"
          label="Role"
          :options="roleOptions"
          placeholder="Select role..."
        />
        <BaseSelect
          v-model="formStatus"
          label="Status"
          :options="statusOptions"
          :searchable="false"
        />
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showEditModal = false">Cancel</BaseButton>
        <BaseButton size="sm" @click="showEditModal = false">Save Changes</BaseButton>
      </template>
    </BaseModal>

    <!-- Detail Modal -->
    <BaseModal v-model="showDetailModal" title="User Detail" size="md">
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <BaseAvatar :name="selectedUser.name as string" size="lg" />
          <div>
            <h3 class="font-semibold text-gray-900">{{ selectedUser.name }}</h3>
            <p class="text-sm text-gray-500">{{ selectedUser.email }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div>
            <p class="text-xs text-gray-500">Role</p>
            <p class="text-sm font-medium">{{ selectedUser.role }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Status</p>
            <BaseBadge
              :variant="getStatusVariant(selectedUser.status as string)"
              :dot="true"
              size="sm"
              >{{ selectedUser.status }}</BaseBadge
            >
          </div>
          <div>
            <p class="text-xs text-gray-500">Phone</p>
            <p class="text-sm font-medium">{{ selectedUser.phone }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Created</p>
            <p class="text-sm font-medium">{{ selectedUser.created }}</p>
          </div>
        </div>
      </div>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDetailModal = false">Close</BaseButton>
      </template>
    </BaseModal>

    <!-- Delete Modal -->
    <BaseModal v-model="showDeleteModal" title="Delete User" size="sm">
      <p class="text-sm text-gray-600">
        Are you sure you want to delete <strong>{{ selectedUser.name }}</strong
        >? This action cannot be undone.
      </p>
      <template #footer>
        <BaseButton variant="ghost" size="sm" @click="showDeleteModal = false">Cancel</BaseButton>
        <BaseButton variant="danger" size="sm" @click="showDeleteModal = false">Delete</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
